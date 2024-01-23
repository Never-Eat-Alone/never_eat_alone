import * as fs from 'fs';
import * as Hash from 'hash.js';
import * as path from 'path';
import { Pool } from 'pg';
import { arrayToJson, CoverImage, Cuisine, EventCardSummary, InviteEmail,
  Language, NotificationSettings, PaymentCard, PaymentRecord, ProfilePageData,
  SocialAccount, SocialAccountType, User, UserInvitationCode, UserProfileImage,
  UserProfilePrivacyPreference, UserProfileSocialAccount, UserStatus } from
  '../../../client/library/source/definitions';
import { AttendeeDatabase } from '../postgres/queries/attendee_database';
import { CuisineDatabase } from '../postgres/queries/cuisine_database';
import { UserCoverImageDatabase } from
  '../postgres/queries/user_cover_image_database';
import { LanguageDatabase } from '../postgres/queries/language_database';
import { UserDatabase } from '../postgres/queries/user_database';
import { UserProfileImageDatabase } from
  '../postgres/queries/user_profile_image_database';

/** User Routes class. */
export class UserRoutes {
  /**
   * @param app - Express app.
   * @param userDatabase - The user related table manipulation class instance.
   * @param userProfileImageDatabase
   * @param cuisineDatabase
   * @param languageDatabase
   * @param sgmail - SendGrid api.
   * @param baseURL - The url based on the code environment
   * @param pool - The pool connection to the postgres database.
   */
  constructor(app: any, userDatabase: UserDatabase, attendeeDatabase:
      AttendeeDatabase, userProfileImageDatabase: UserProfileImageDatabase,
      userCoverImageDatabase: UserCoverImageDatabase, cuisineDatabase:
      CuisineDatabase, languageDatabase: LanguageDatabase, sgmail: any,
      baseURL: string, pool: Pool) {
    /** Route to get the current logged in user. */
    app.get('/api/current_user', this.getCurrentUser);

    /** Route for guest user requesting to join the app. */
    app.post('/api/join', this.join);

    /** Route for the guest user to set up an account. */
    app.get('/api/sign-up/:id', this.signUp);
    app.post('/api/set-up-password/:id', this.setUpPassword);
    app.post('/api/set_up_profile/:id', this.setUpProfile);

    /** Route for the user log in. */
    app.post('/api/log_in', this.logIn);

    /** Route to log out the user. */
    app.get('/api/log_out', this.logOut);

    /** Route to the confirmation token page. */
    app.get('/api/user_invitation_code/:userId', this.getUserInvitationCode);

    app.post('/api/send_invite_email', this.sendInviteEmail);
    app.post('/api/send_partner_with_us_email', this.sendPartnerWithUsEmail);
    app.post('/api/request-password-reset', this.handleRequestPasswordReset);

    /** User Profile page and edit page related routes. */
    app.get('/api/profile_page/:profileId', this.getProfilePage);
    app.get('/api/users/:profileId/edit', this.getEditProfilePage);
    app.post('/api/users/:profileId/cover-image', this.saveProfileCoverImage);
    app.post('/api/users/:profileId/profile-image', this.uploadProfileImage);
    app.put('/api/users/:profileId/update', this.updateUserProfile);

    /** Settings related routes. */
    app.get('/api/settings/:profileId', this.getSettingsPage);

    /** Reset Password related routes. */
    app.post('/api/reset-password', this.getResetPasswordPage);
    app.post('/api/update-password', this.updatePassword);
    app.post('/api/update-user-display-name', this.updateUserDisplayName);
    app.post('/api/update-user-email/:profileId', this.updateUserEmail);
    app.post('/api/update-user-password/:profileId', this.updateUserPassword);
    app.post('/api/confirm-user-email-update-token/:profileId',
      this.confirmEmailUpdateRequest);

    this.userDatabase = userDatabase;
    this.attendeeDatabase = attendeeDatabase;
    this.userProfileImageDatabase = userProfileImageDatabase;
    this.userCoverImageDatabase = userCoverImageDatabase;
    this.cuisineDatabase = cuisineDatabase;
    this.languageDatabase = languageDatabase;
    this.sgmail = sgmail;
    this.baseURL = baseURL;
    this.pool = pool;
  }

  /** Returns the current logged in user. */
  private getCurrentUser = async (request, response) => {
    if (request.session?.user) {
      let user: User;
      try {
        user = await this.userDatabase.loadUserBySessionId(
          request.session.id);
      } catch (error) {
        console.error('Failed at loadUserBySessionId', error);
        response.status(500).send();
        return;
      }
      request.session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        userName: user.userName,
        userStatus: user.userStatus.toString(),
        createdAt: user.createdAt.toISOString()
      };
      response.status(200).json({ user: user.toJson() });
    } else {
      const guestUser = User.makeGuest();
      response.status(200).json({ user: guestUser.toJson() });
    }
  }

  /** Registers the user request to join the app. */
  private join = async (request, response) => {
    const { name, email, referralCode } = request.body;
    try {
      const userByEmail = await this.userDatabase.loadUserByEmail(email);
      
      // user already exists
      if (userByEmail && userByEmail.userStatus !== 'GUEST' &&
          userByEmail.userStatus !== 'DELETED') {
        if (userByEmail.userStatus === 'ACTIVE' || userByEmail.userStatus ===
            'DEACTIVE') {
          return response.status(409).send();
        } else if (userByEmail.userStatus === 'PENDING') {
          return this.sendAccountSetupEmail(name, email, userByEmail.id,
            response);
        } else if (userByEmail.userStatus === 'BANNED') {
          return response.status(423).send();
        }
      } else {
        // New user registration
        await this.pool.query('BEGIN');
        const newUser = await this.userDatabase.addGuestUserRequest(name, email,
          referralCode);
        await this.pool.query('COMMIT');
        return this.sendAccountSetupEmail(name, email, newUser.id, response);
      }
    } catch (error) {
      console.error('Error during user registration:', error);
      await this.pool.query('ROLLBACK');
      response.status(500).send();
    }
  }

  private sendAccountSetupEmail = async (name: string, email: string, userId:
      number, response) => {
    const token = await this.getConfirmationToken(email, userId);
    const signUpHtml = await fs.promises.readFile(
      'public/resources/sign_up_email/email.html', 'utf8');
    const newHtml = signUpHtml.replaceAll('{{baseURL}}', this.baseURL)
                              .replaceAll('{{name}}', name)
                              .replaceAll('{{id}}', userId.toString())
                              .replace('{{token}}', token);
    await this.sendEmail(email, 'info@nevereatalone.net',
      'NEA Account: Registration Request', newHtml);
    response.status(201).send();
  }

  private signUp = async (request, response) => {
    console.log('Full URL:', request.url);

    console.log('Query parameters:', request.query);
    const userId = parseInt(request.params.id);
    const token = request.query.token;
    console.log('signUp userid=', userId, 'token=', token);
    if (!userId || userId === -1) {
      return response.redirect(303, `${this.baseURL}/join`);
    }

    try {
      const user = await this.userDatabase.loadUserById(userId);
      console.log(user.userStatus);
      if (user.id === -1 || user.userStatus !== UserStatus.PENDING) {
        return response.redirect(303, `${this.baseURL}/join`);
      }
      const isTokenValid = await this.userDatabase.isTokenValid(token);
      console.log('istokenvalid', isTokenValid);
      if (!isTokenValid) {
        return response.redirect(303,
          `${this.baseURL}/invalid-confirmation-token`);
      }
      await this.userDatabase.updateUserStatusByConfirmationToken(
        token);
      console.log('user sign up', userId);
      response.status(200).json({ displayName: user.name, email: user.email });
    } catch (error) {
      console.error('Failed at loadUserById', error);
      return response.status(500).send();
    }
  }

  private setUpProfile = async (request, response) => {
    const userId = parseInt(request.params.id);
    const displayName = request.body.displayName;
    const accountProfileImage = UserProfileImage.fromJson(
      request.body.accountProfileImage);
    if (userId === -1) {
      response.status(400).send();
      return;
    }
    try {
      const result = await this.userDatabase.saveUserProfile(userId,
        accountProfileImage.src, displayName);
      response.status(200).json({
        account: result.account.toJson(),
        accountProfileImage: result.accountProfileImage.toJson()
      });
    } catch (error) {
      console.error('Failed at saveUserProfile', error);
      response.status(500).send();
    }
  }

  private setUpPassword = async (request, response) => {
    const userId = parseInt(request.params.id);
    console.log('userId', userId);
    const { password } = request.body;
    try {
      await this.userDatabase.addUserCredentials(userId, password);
    } catch (error) {
      console.error('Failed at addUserCredentials', error);
      return response.status(500).send();
    }
    response.status(200).send();
  }

  /** Checks user credentials for login. */
  private logIn = async (request, response) => {
    const { email, password, rememberMe } = request.body;
    const user = await this.userDatabase.loadUserByEmail(email);
    if (!email || user.id === -1) {
      response.status(401).json({ message: 'INVALID_CREDENTIALS' });
      return;
    }
    const isValidPassword =
      await this.userDatabase.validatePassword(user.id, password);
    if (!isValidPassword) {
      response.status(401).json({ message: 'INVALID_CREDENTIALS' });
      return;
    }
    if (rememberMe) {
      request.session.cookie.maxAge = 30 * 365 * 24 * 60 * 60 * 1000;
    } else {
      request.session.cookie.maxAge = 24 * 60 * 60 * 1000;
    }
    try {
      const sessionExpiration = new Date(
        Date.now() + request.session.cookie.maxAge);
      await this.userDatabase.assignUserIdToSid(request.session.id, user.id,
        request.session, sessionExpiration);
    } catch (error) {
      console.error('Failed at assignUserIdToSid', error);
      response.status(500).json({ message: 'DATABASE_ERROR' });
      return;
    }
    request.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      userName: user.userName,
      userStatus: user.userStatus.toString(),
      createdAt: user.createdAt.toISOString()
    };
    response.status(200).json({ user: user.toJson() });
  }

  /**
   * Creates a confirmation token and store it in the
   * user_confirmation_tokens table.
   * @param email - The user email address.
   * @param userId - The user id based on the users table.
   */
  private getConfirmationToken = async (email: string, userId: number) => {
    let token = '';
    try {
      token = await this.userDatabase.getTokenByUserId(userId);
    } catch (error) {
      console.error('Database failed at getTokenByUserId', error);
      throw error;
    }
    if (token) {
      return token;
    }
    const confirmationTokenId = Hash.sha256().update(
      email + Date.now() + userId).digest('hex');
    try {
      const expiresAt = new Date();

      /** The token expires in 24 hours. */
      expiresAt.setDate(expiresAt.getDate() + 1);
      await this.userDatabase.addConfirmationToken(confirmationTokenId,
        expiresAt, userId);
    } catch (error) {
      console.error('Database failed at addConfirmationToken.', error);
      throw error;
    }
    return confirmationTokenId;
  }

  /** Sends an email using Sendgrid api.
   * @param to - Receiver email.
   * @param from - Sender email.
   * @param subject - Subject of the email.
   * @param text - Context of the email.
   * @param html - The html representation of the email.
   */
  private sendEmail = async (toEmail: string, fromEmail: string,
      subject: string, content: string, attachments: Array<{content: string,
      filename: string, type: string, disposition: string}> = []) => {
    const message = {
      to: toEmail,
      from: `NeverEatAlone <${fromEmail}>`,
      subject: subject,
      html: content,
      attachments: attachments.map(attachment => ({
        content: attachment.content,
        filename: attachment.filename,
        type: attachment.type,
        disposition: attachment.disposition,
        content_id: attachment.filename,
      })),
    };
    try {
      await this.sgmail.send(message);
    } catch (error) {
      console.error(`Error sending email: ${error}`);
      if (error.response?.body?.errors) {
        console.error('Error details:', error.response.body.errors);
      }
    }
  }

  /** Logs out the user. */
  private logOut = async (request, response) => {
    if (!request.session) {
      return response.status(400).json({ message: 'NO_SESSION_FOUND' });
    }
    request.session.destroy((err) => {
      if (err) {
        console.error('Failed at request.session.destroy', err);
        return response.status(500).json({ message: 'SESSION_DESTROY_FAILED' });
      }
      response.clearCookie('connect.sid');
      response.status(200).send('Session data cleared');
    });
  }

  private getUserInvitationCode = async (request, response) => {
    const userId = parseInt(request.params.userId);
    let userInvitationCode: UserInvitationCode;
    try {
      userInvitationCode = await this.userDatabase.loadUserInvitationCode(
        userId);
    } catch (error) {
      console.error('Failed at loadUserInvitationCode', error);
      response.status(500).send();
      return;
    }
    response.status(200).json({
      userInvitationCode: userInvitationCode.toJson()
    });
  }

  private sendInviteEmail = async (request, response) => {
    const userInvitationCode = UserInvitationCode.fromJson(
      request.body.userInvitationCode);
    const inviteEmail = InviteEmail.fromJson(request.body.inviteEmail);
    let user: User;
    if (request.session?.user) {
      try {
        user = await this.userDatabase.loadUserBySessionId(request.session.id);
        if (user.id === -1 || user.id !== userInvitationCode.userId) {
          response.status(401).send();
          return;
        }
      } catch (error) {
        console.error('Failed at loadUserBySessionId', error);
        response.status(500).send();
        return;
      }
    } else {
      response.status(401).send();
      return;
    }
    const invitationHtml = await new Promise<string>((resolve, reject) => {
      fs.readFile('public/resources/invitation_email/email.html', 'utf8',
        (error, html) => {
          if (error) {
            reject(error);
          } else {
            resolve(html);
          }
        });
    });
    const newHtml = invitationHtml.replaceAll('{{baseURL}}', this.baseURL)
      .replace('{{invitationCode}}', userInvitationCode.invitationCode)
      .replaceAll('{{user_name}}', user.name).replace('{{contest}}',
      inviteEmail.contest);
    for (const email of inviteEmail.emailList) {
      try {
        await this.sendEmail(email, 'noreply@nevereatalone.net',
          `Your friend, ${user.name}, invited you to check out NEA`, newHtml);
      } catch (error) {
        console.error('Failed at sendEmail', error);
        response.status(500).send();
        return;
      }
    }
    response.status(200).send();
  }

  private sendPartnerWithUsEmail = async (request, response) => {
    const { name, email, profileLink, message } = request.body;
    const partnerWithUsHtml = await new Promise<string>((resolve, reject) => {
      fs.readFile('public/resources/partner_with_us_email/email.html', 'utf8',
        (error, html) => {
          if (error) {
            reject(error);
          } else {
            resolve(html);
          }
        });
    });
    const newHtml = partnerWithUsHtml.replaceAll('{{name}}', name)
      .replaceAll('{{email}}', email).replaceAll('{{link}}', profileLink)
      .replace('{{message}}', message);
    try {
      await this.sendEmail('info@nevereatalone.net', email,
        `${name}, want to partner with NEA`, newHtml);
    } catch (error) {
      console.error('Failed at sendEmail to info@nevereatalone.net', error);
      response.status(500).send();
      return;
    }
    try {
      await this.sendPartnerWithUsRecievedConfirmationEmail(email, name);
    } catch (error) {
      console.error('Failed at sendPartnerWithUsRecievedConfirmationEmail',
        error);
      response.status(500).send();
      return;
    }
    response.status(200).send();
  }

  private sendPartnerWithUsRecievedConfirmationEmail = async (email: string,
      name: string) => {
    const partnerWithUsRecievedConfirmationHtml = await new Promise<string>((
        resolve, reject) => {
      fs.readFile(
        'public/resources/partner_with_us_email/confirmation_email.html',
        'utf8', (error, html) => {
          if (error) {
            reject(error);
          } else {
            resolve(html);
          }
        });
    });
    const newHtml = partnerWithUsRecievedConfirmationHtml.replaceAll('{{name}}',
      name);
    try {
      await this.sendEmail(email, 'info@nevereatalone.net',
        'We Appreciate Your Business!', newHtml);
    } catch (error) {
      console.error('Failed at sendEmail', error);
      return error;
    }
  }

  private handleRequestPasswordReset = async (request, response) => {
    const email = request.body.email;
    let user: User;
    try {
      user = await this.userDatabase.loadUserByEmail(email);
    } catch (error) {
      console.error('Failed at loadUserByEmail', error);
      response.status(500).json({ message: 'DATABASE_ERROR' });
      return;
    }
    if (!user || user.id === -1 || user.email == '') {
      response.status(400).json({ message: 'EMAIL_NOT_FOUND' });
      return;
    }
    const recoveryHtml = await new Promise<string>((resolve, reject) => {
      fs.readFile('public/resources/recovery_password_email/email.html', 'utf8',
        (error, html) => {
          if (error) {
            reject(error);
          } else {
            resolve(html);
          }
        });
    });

    /** Create a token for this user and add it to the database. */
    let token = '';
    try {
      token = await this.userDatabase.assingResetTokenToUserId(user.id);
    } catch (error) {
      console.error('Failed at assingResetTokenToUserId', error);
      response.status(500).send();
      return;
    }
    const name = user.name || 'NeverEatAlone Member';
    const newHtml = recoveryHtml.replaceAll('{{name}}', name).replace(
      '{{token}}', token);
    try {
      await this.sendEmail(user.email, 'noreply@nevereatalone.net',
        'Recovery Password Link', newHtml);
    } catch (error) {
      console.error('Failed at sendEmail', error);
      response.status(500).send();
      return;
    }
    response.status(200).send();
  }

  private getProfilePage = async (request, response) => {
    const profileId = parseInt(request.params.profileId);
    let profileUser: User = User.makeGuest();
    let coverImage = CoverImage.default(profileId);
    let profileImage = UserProfileImage.default(profileId);
    let biography = '';
    let address = '';
    let languageList: Language[] = [];
    let socialAccounts: UserProfileSocialAccount[] = [];
    let favoriteCuisineList: Cuisine[] = [];
    let upcomingEventList: EventCardSummary[] = [];
    let pastEventList: EventCardSummary[] = [];
    try {
      profileUser = await this.userDatabase.loadUserById(profileId);
    } catch (error) {
      console.error('Failed at loadUserById', error);
      response.status(500).send();
      return;
    }
    if (profileUser?.id === -1) {
      response.status(400).send();
      return;
    }
    try {
      coverImage = await this.userCoverImageDatabase.loadCoverImageByUserId(
        profileId);
    } catch (error) {
      console.error('Failed at loadUserById', error);
      response.status(500).send();
      return;
    }
    try {
      profileImage =
        await this.userProfileImageDatabase.loadProfileImageByUserId(profileId);
    } catch (error) {
      console.error('Failed at loadProfileImageByUserId', error);
      response.status(500).send();
      return;
    }
    try {
      biography = await this.userDatabase.loadBiographyByUserId(profileId);
    } catch (error) {
      console.error('Failed at loadBiographyByUserId', error);
      response.status(500).send();
      return;
    }
    let userPrivacyPreference: UserProfilePrivacyPreference;
    try {
      userPrivacyPreference =
        await this.userDatabase.getUserPrivacyPreferencesByUserId(profileId);
    } catch (error) {
      console.error('Failed at getUserPrivacyPreferencesByUserId', error);
      response.status(500).send();
      return;
    }
    try {
      address = await this.userDatabase.loadAddressByUserId(profileId);
    } catch (error) {
      console.error('Failed at loadAddressByUserId', error);
      response.status(500).send();
      return;
    }
    try {
      languageList = await this.userDatabase.loadUserLanguagesByUserId(
        profileId);
    } catch (error) {
      console.error('Failed at loadUserLanguagesByUserId', error);
      response.status(500).send();
      return;
    }
    try {
      socialAccounts =
        await this.userDatabase.loadUserProfileSocialAccountsByUserId(
          profileId);
    } catch (error) {
      console.error('Failed at loadUserProfileSocialAccountsByUserId', error);
      response.status(500).send();
      return;
    }
    try {
      favoriteCuisineList =
        await this.userDatabase.loadUserFavouriteCuisinesByUserId(profileId);
    } catch (error) {
      console.error('Failed at loadUserSelectedCuisinesByUserId', error);
      response.status(500).send();
      return;
    }
    try {
      upcomingEventList =
        await this.attendeeDatabase.loadUserUpcomingEventsByUserId(profileId);
    } catch (error) {
      console.error('Failed at loadUserUpcomingEventsByUserId', error);
      response.status(500).send();
      return;
    }
    try {
      pastEventList =
        await this.attendeeDatabase.loadUserPastEventsByUserId(profileId);
    } catch (error) {
      console.error('Failed at loadUserPastEventsByUserId', error);
      response.status(500).send();
      return;
    }
    response.status(200).json({
      coverImage: coverImage.toJson(),
      profileImage: profileImage.toJson(),
      name: profileUser.name,
      userName: profileUser.userName,
      createdAt: profileUser.createdAt.toISOString(),
      biography: biography,
      isBiographyPrivate: userPrivacyPreference.isBioPrivate,
      address: address,
      languageList: arrayToJson(languageList),
      isUpcomingEventsPrivate: userPrivacyPreference.isUpcomingEventsPrivate,
      isPastEventsPrivate: userPrivacyPreference.isPastEventsPrivate,
      isLocationPrivate: userPrivacyPreference.isProfileAddressPrivate,
      isLanguagePrivate: userPrivacyPreference.isLanguagePrivate,
      socialAccounts: arrayToJson(socialAccounts),
      isCuisinePrivate: userPrivacyPreference.isCuisinePrivate,
      favoriteCuisineList: arrayToJson(favoriteCuisineList),
      upcomingEventList: arrayToJson(upcomingEventList),
      pastEventList: arrayToJson(pastEventList)
    });
  }

  private getEditProfilePage = async (request, response) => {
    const profileId = parseInt(request.params.profileId);
    if (request.session?.user) {
      let user: User;
      try {
        user = await this.userDatabase.loadUserBySessionId(
          request.session.id);
        if (user.id === -1 || user.id !== profileId) {
          response.status(401).send();
          return;
        }
      } catch (error) {
        console.error('Failed at loadUserBySessionId', error);
        response.status(500).send();
        return;
      }
    } else {
      response.status(401).send();
      return;
    }
    let profilePageData = ProfilePageData.default(profileId);
    let coverImage: CoverImage;
    let profileImage: UserProfileImage;
    let userPrivacyPreference: UserProfilePrivacyPreference;
    let biographyValue: string;
    let selectedLocation: string;
    let selectedLanguageList: Language[];
    let selectedCuisineList: Cuisine[];
    let languageList: Language[] = [];
    let cuisineList: Cuisine[] = [];
    let coverImageList: CoverImage[] = [];
    let socialAccounts: UserProfileSocialAccount[];
    try {
      const profileUser = await this.userDatabase.loadUserById(profileId);
      if (profileUser?.id === -1) {
        response.status(400).send();
        return;
      }
    } catch (error) {
      console.error('Failed at loadUserById', error);
      response.status(500).send();
      return;
    }
    try {
      coverImage = await this.userCoverImageDatabase.loadCoverImageByUserId(
        profileId);
    } catch (error) {
      console.error('Failed at loadUserById', error);
      response.status(500).send();
      return;
    }
    const dirPath = path.join(__dirname, 'public/resources/profile_page/images'
      );
    try {
      let coverSrcList = fs.readdirSync(dirPath);
      coverImageList = coverSrcList.map(coverSrc => new CoverImage(
        profileId, `resources/profile_page/images/${coverSrc}`));
    } catch (err) {
        console.error(`Unable to scan resources/profile_page/images directory:
          ${err}`);
    }
    try {
      profileImage =
        await this.userProfileImageDatabase.loadProfileImageByUserId(profileId);
    } catch (error) {
      console.error('Failed at loadProfileImageByUserId', error);
      response.status(500).send();
      return;
    }
    try {
      userPrivacyPreference =
        await this.userDatabase.getUserPrivacyPreferencesByUserId(profileId);
    } catch (error) {
      console.error('Failed at getUserPrivacyPreferencesByUserId', error);
      response.status(500).send();
      return;
    }
    try {
      biographyValue = await this.userDatabase.loadBiographyByUserId(profileId);
    } catch (error) {
      console.error('Failed at loadBiographyByUserId', error);
      response.status(500).send();
      return;
    }
    try {
      selectedLocation = await this.userDatabase.loadAddressByUserId(profileId);
    } catch (error) {
      console.error('Failed at loadAddressByUserId', error);
      response.status(500).send();
      return;
    }
    try {
      selectedLanguageList = await this.userDatabase.loadUserLanguagesByUserId(
        profileId);
    } catch (error) {
      console.error('Failed at loadUserLanguagesByUserId', error);
      response.status(500).send();
      return;
    }
    try {
      selectedCuisineList =
        await this.userDatabase.loadUserFavouriteCuisinesByUserId(profileId);
    } catch (error) {
      console.error('Failed at loadUserSelectedCuisinesByUserId', error);
      response.status(500).send();
      return;
    }
    try {
      socialAccounts =
        await this.userDatabase.loadUserProfileSocialAccountsByUserId(
          profileId);
    } catch (error) {
      console.error('Failed at loadUserProfileSocialAccountsByUserId', error);
      response.status(500).send();
      return;
    }
    const { facebookLink, isFacebookPrivate, twitterLink, isTwitterPrivate,
        instagramLink, isInstagramPrivate } = (() => {
      let facebookLink = '', twitterLink = '', instagramLink = '';
      let isFacebookPrivate = true, isTwitterPrivate = true,
        isInstagramPrivate = true;
      if (socialAccounts && socialAccounts.length > 0) {
        const facebookAccount = socialAccounts.find((account) =>
          account.platform === SocialAccountType.FACEBOOK);
        if (facebookAccount) {
          facebookLink = facebookAccount.link;
          isFacebookPrivate = facebookAccount.isPrivate;
        }
        const twitterAccount = socialAccounts.find((account) =>
          account.platform === SocialAccountType.TWITTER);
        if (twitterAccount) {
          twitterLink = twitterAccount.link;
          isTwitterPrivate = twitterAccount.isPrivate;
        }
        const instagramAccount = socialAccounts.find((account) =>
          account.platform === SocialAccountType.INSTAGRAM);
        if (instagramAccount) {
            instagramLink = instagramAccount.link;
            isInstagramPrivate = instagramAccount.isPrivate;
        }
      }
      return {
        facebookLink: facebookLink,
        isFacebookPrivate: isFacebookPrivate,
        twitterLink: twitterLink,
        isTwitterPrivate: isTwitterPrivate,
        instagramLink: instagramLink,
        isInstagramPrivate: isInstagramPrivate
      };
    })();
    profilePageData = new ProfilePageData(profileId, coverImage,
      profileImage, userPrivacyPreference.isUpcomingEventsPrivate,
      userPrivacyPreference.isPastEventsPrivate,
      userPrivacyPreference.isProfileAddressPrivate, selectedLocation,
      userPrivacyPreference.isLanguagePrivate, selectedLanguageList,
      userPrivacyPreference.isBioPrivate, biographyValue,
      isFacebookPrivate, facebookLink, isTwitterPrivate, twitterLink,
      isInstagramPrivate, instagramLink, userPrivacyPreference.isCuisinePrivate,
      selectedCuisineList);
    try {
      cuisineList = await this.cuisineDatabase.loadCuisineList();
    } catch (error) {
      console.error('Failed at loadCuisineList', error);
    }
    try {
      languageList = await this.languageDatabase.loadLanguageList();
    } catch (error) {
      console.error('Failed at loadLanguageList', error);
    }

    response.status(200).json({
      profilePageData: profilePageData.toJson(),
      coverImageList: arrayToJson(coverImageList),
      languageList: arrayToJson(languageList),
      cuisineList: arrayToJson(cuisineList)
    });
  }

  private saveProfileCoverImage = async (request, response) => {
    const image = CoverImage.fromJson(request.body.image);
    let user: User;
    if (request.session?.user) {
      try {
        user = await this.userDatabase.loadUserBySessionId(
          request.session.id);
        if (user.id === -1 || user.id !== image.profileId) {
          response.status(401).send();
          return;
        }
      } catch (error) {
        console.error('Failed at loadUserBySessionId', error);
        response.status(500).send();
        return;
      }
    } else {
      response.status(401).send();
      return;
    }
    try {
      await this.userCoverImageDatabase.saveCoverImage(image);
    } catch (error) {
      console.error('Failed at isDuplicateEmail', error);
      response.status(500).json({ message: 'DATABASE_ERROR' });
      return;
    }
    response.status(200).send();
  }

  private uploadProfileImage = async (request, response) => {
    const image = UserProfileImage.fromJson(request.body.accountProfileImage);
    let user: User;
    if (request.session?.user) {
      try {
        user = await this.userDatabase.loadUserBySessionId(
          request.session.id);
        if (user.id === -1 || user.id !== image.userId) {
          response.status(401).send();
          return;
        }
      } catch (error) {
        console.error('Failed at loadUserBySessionId', error);
        response.status(500).send();
        return;
      }
    } else {
      response.status(401).send();
      return;
    }
    
    const userProfileImageFile = request.file;
    let uploadedImage: UserProfileImage;
    try {
      uploadedImage = await this.userProfileImageDatabase.uploadProfileImage(
        user.id, userProfileImageFile);
    } catch (error) {
      console.error('Failed at uploadUserProfileImage.', error);
      response.status(500).json({ message: 'DATABASE_ERROR' });
      return;
    }
    response.status(201).json({ accountProfileImage: uploadedImage.toJson() });
  }

  private updateUserProfile = async (request, response) => {
    const profilePageData = ProfilePageData.fromJson(
      request.body.profilePageData);
    const profileId = parseInt(request.params.profileId);
    let user: User;
    if (request.session?.user) {
      try {
        user = await this.userDatabase.loadUserBySessionId(
          request.session.id);
        if (user.id === -1 || user.id !== profileId) {
          response.status(401).send();
          return;
        }
      } catch (error) {
        console.error('Failed at loadUserBySessionId', error);
        response.status(500).send();
        return;
      }
    }
    try {
      await this.userCoverImageDatabase.saveCoverImage(
        profilePageData.coverImage);
    } catch (error) {
      console.error('Error saveCoverImage:', error);
      response.status(500).send();
    }
    try {
      await this.userProfileImageDatabase.saveProfileImage(
        profilePageData.profileImage);
    } catch (error) {
      console.error('Error saveProfileImage:', error);
      response.status(500).send();
    }
    try {
      await this.userDatabase.updateUserProfile(profilePageData);
      response.status(200).send();
    } catch (error) {
      console.error('Error updating user profile:', error);
      response.status(500).send();
    }
  }

  private getSettingsPage = async (request, response) => {
    const profileId = parseInt(request.params.profileId);
    let loggedUser: User;
    if (request.session?.user) {
      try {
        loggedUser = await this.userDatabase.loadUserBySessionId(
          request.session.id);
        if (loggedUser.id === -1 || loggedUser.id !== profileId) {
          response.status(401).send();
          return;
        }
      } catch (error) {
        console.error('Failed at loadUserBySessionId', error);
        response.status(500).send();
        return;
      }
    }
    let pageAccount: User;
    try {
      pageAccount = await this.userDatabase.loadUserById(profileId);
    } catch (error) {
      console.error('Failed at loadUserById', error);
      response.status(500).send();
      return;
    }
    let linkedSocialAccounts: SocialAccount[] = [];
    let isNewEventsNotificationOn = false;
    let isEventJoinedNotificationOn = false;
    let isEventRemindersNotificationOn = false;
    let isChangesNotificationOn = false;
    let isSomeoneJoinedNotificationOn = false;
    let isFoodieAcceptedInviteNotificationOn = false;
    let isAnnouncementNotificationOn = false;
    let notificationSettings: NotificationSettings = new NotificationSettings(
      isNewEventsNotificationOn, isEventJoinedNotificationOn,
      isEventRemindersNotificationOn, isChangesNotificationOn,
      isSomeoneJoinedNotificationOn, isFoodieAcceptedInviteNotificationOn,
      isAnnouncementNotificationOn);
    let defaultCard = PaymentCard.noCard();
    let paymentCards: PaymentCard[] = [];
    let paymentRecords: PaymentRecord[] = [];
    response.status(200).json({
      displayName: pageAccount.name,
      email: pageAccount.email,
      linkedSocialAccounts: arrayToJson(linkedSocialAccounts),
      notificationSettings: notificationSettings.toJson(),
      defaultCard: defaultCard.toJson(),
      paymentCards: arrayToJson(paymentCards),
      paymentRecords: arrayToJson(paymentRecords)
    });
  }

  private getResetPasswordPage = async (request, response) => {
    const token = request.body.token;
    if (!token) {
      response.status(400).json({ message: 'Token is required.' });
      return;
    }
    let user: User;
    try {
      user = await this.userDatabase.loadUserByPasswordResetToken(token);
    } catch (error) {
      console.error('Failed at loadUserByResetToken', error);
      response.status(500).send();
      return;
    }
    if (!user || user.id === -1) {
      response.status(500).send();
      return;
    }
    let profileImageSrc: string;
    try {
      profileImageSrc = (await
        this.userProfileImageDatabase.loadProfileImageByUserId(user.id)).src;
    } catch {
      response.status(200).json({
        user: user.toJson(),
        profileImageSrc: UserProfileImage.default().src
      });
      return;
    }
    response.status(200).json({
      user: user.toJson(),
      profileImageSrc: profileImageSrc
    });
  }

  private updatePassword = async (request, response) => {
    const password = request.body.password;
    const account = User.fromJson(request.body.account);
    if (!password) {
      response.status(400).json({ message: 'password is required.' });
      return;
    }
    if (!account || account.id === -1) {
      response.status(400).json({ message: 'account is required.' });
      return;
    }
    try {
      await this.userDatabase.updatePassword(account.id, password);
    } catch (error) {
      console.error('Failed at updatePassword', error);
      response.status(500).send();
      return;
    }
    request.session.cookie.maxAge = 24 * 60 * 60 * 1000;
    try {
      const sessionExpiration = new Date(
        Date.now() + request.session.cookie.maxAge);
      await this.userDatabase.assignUserIdToSid(request.session.id, account.id,
        request.session, sessionExpiration);
    } catch (error) {
      console.error('Failed at assignUserIdToSid', error);
      response.status(500).json({ message: 'DATABASE_ERROR' });
      return;
    }
    request.session.user = {
      id: account.id,
      name: account.name,
      email: account.email,
      userName: account.userName,
      userStatus: account.userStatus.toString(),
      createdAt: account.createdAt.toISOString()
    };
    response.status(200).send();
  }

  private updateUserDisplayName = async (request, response) => {
    const { name } = request.body;
    if (!request.session?.user) {
      response.status(401).send();
      return;
    }
    let user: User;
    try {
      user = await this.userDatabase.loadUserBySessionId(request.session.id);
      if (user.id === -1) {
        response.status(401).send();
        return;
      }
    } catch (error) {
      console.error('Failed at loadUserBySessionId', error);
      response.status(500).send();
      return;
    }
    try {
      const updatedUser = await this.userDatabase.updateDisplayName(user.id,
        name);
      request.session.user = {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        userName: updatedUser.userName,
        userStatus: updatedUser.userStatus.toString(),
        createdAt: updatedUser.createdAt.toISOString()
      };
      response.status(200).send({ user: updatedUser.toJson() });
    } catch (error) {
      console.error('Failed at updateDisplayName', error);
      response.status(500).send();
      return;
    }
  }

  private updateUserEmail = async (request, response) => {
    const profileId = parseInt(request.params.profileId);
    const { email, password } = request.body;
    if (!request.session?.user) {
      response.status(401).send();
      return;
    }
    let user: User;
    try {
      user = await this.userDatabase.loadUserBySessionId(request.session.id);
      if (user.id === -1 || user.id !== profileId) {
        response.status(401).send();
        return;
      }
    } catch (error) {
      console.error('Failed at loadUserBySessionId', error);
      response.status(500).send();
      return;
    }
    if (!email || !password) {
      response.status(400).json({
        message: 'Email and password are required.'
      });
      return;
    }
    try {
      const isValid = await this.userDatabase.validatePassword(user.id,
        password);
      if (!isValid) {
        response.status(401).json({ message: 'Password authentication failed.'
          });
        return;
      }
    } catch (error) {
      console.error('Failed at validatePassword', error);
      response.status(500).send();
      return;
    }
    let tokenId: number;
    try {
      tokenId = await this.userDatabase.addEmailUpdateRequest(user.id, email);
    } catch (error) {
      console.error('Failed at addEmailUpdateRequest', error);
      response.status(500).send();
      return;
    }

    /** Send an email to the user's current email address to let the user know 
     * of this request.
     */
    const emailUpdateRequestHtml = await new Promise<string>((resolve,
        reject) => {
      fs.readFile('public/resources/update_email/current_email.html', 'utf8',
        (error, html) => {
          if (error) {
            reject(error);
          } else {
            resolve(html);
          }
        });
    });
    const newHtml = emailUpdateRequestHtml.replaceAll('{{name}}', user.name)
      .replace('{{tokenId}}', tokenId.toString());
    try {
      await this.sendEmail(user.email, 'info@nevereatalone.net',
        'NEA Account: Update Email Request', newHtml);
    } catch (error) {
      console.error('EMAIL_NOT_SENT', error);
      response.status(200).json({
        message: 'Failed to send the email to current user email.' });
      return;
    }
    response.status(200).send();
  }

  private confirmEmailUpdateRequest = async (request, response) => {
    const profileId = parseInt(request.params.profileId);
    const token = request.body.token;
    if (!request.session?.user) {
      response.status(401).send();
      return;
    }
    let user: User;
    try {
      user = await this.userDatabase.loadUserBySessionId(request.session.id);
      if (user.id === -1 || user.id !== profileId) {
        response.status(401).send();
        return;
      }
    } catch (error) {
      console.error('Failed at loadUserBySessionId', error);
      response.status(500).send();
      return;
    }
    let updatedUser: User;
    try {
      const newEmail = await this.userDatabase.verifyEmailUpdateRequestToken(
        user.id, token);
      if (!newEmail) {
        response.status(410).json({ message: 'Invalid link.' });
        return;
      }
      updatedUser = await this.userDatabase.updateEmail(user.id, newEmail);
    } catch (error) {
      console.error('Failed at verifyEmailUpdateRequestToken', error);
      response.status(500).send();
      return;
    }
    request.session.cookie.maxAge = 24 * 60 * 60 * 1000;
    try {
      const sessionExpiration = new Date(
        Date.now() + request.session.cookie.maxAge);
      await this.userDatabase.assignUserIdToSid(request.session.id, user.id,
        request.session, sessionExpiration);
    } catch (error) {
      console.error('Failed at assignUserIdToSid', error);
      response.status(500).json({ message: 'DATABASE_ERROR' });
      return;
    }
    request.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      userName: user.userName,
      userStatus: user.userStatus.toString(),
      createdAt: user.createdAt.toISOString()
    };
    response.status(200).json({ user: updatedUser.toJson() });
  }

  private updateUserPassword = async (request, response) => {
    const profileId = parseInt(request.params.profileId);
    const { currentPassword, newPassword } = request.body;
    if (!request.session?.user) {
      response.status(401).send();
      return;
    }
    let user: User;
    try {
      user = await this.userDatabase.loadUserBySessionId(request.session.id);
      if (user.id === -1 || user.id !== profileId) {
        response.status(401).send();
        return;
      }
    } catch (error) {
      console.error('Failed at loadUserBySessionId', error);
      response.status(500).send();
      return;
    }
    if (!currentPassword || !newPassword) {
      response.status(400).json({ message: 'password is required.' });
      return;
    }
    try {
      const isValid = await this.userDatabase.validatePassword(user.id,
        currentPassword);
      if (!isValid) {
        response.status(401).send();
        return;
      }
    } catch (error) {
      console.error('Failed at validatePassword', error);
      response.status(500).send();
      return;
    }
    try {
      await this.userDatabase.updatePassword(user.id, newPassword);
    } catch (error) {
      console.error('Failed at updatePassword', error);
      response.status(500).send();
      return;
    }
    request.session.cookie.maxAge = 24 * 60 * 60 * 1000;
    try {
      const sessionExpiration = new Date(
        Date.now() + request.session.cookie.maxAge);
      await this.userDatabase.assignUserIdToSid(request.session.id, user.id,
        request.session, sessionExpiration);
    } catch (error) {
      console.error('Failed at assignUserIdToSid', error);
      response.status(500).json({ message: 'DATABASE_ERROR' });
      return;
    }
    request.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      userName: user.userName,
      userStatus: user.userStatus.toString(),
      createdAt: user.createdAt.toISOString()
    };
    response.status(200).send();
  }

  private userDatabase: UserDatabase;
  private attendeeDatabase: AttendeeDatabase;
  private userProfileImageDatabase: UserProfileImageDatabase;
  private userCoverImageDatabase: UserCoverImageDatabase;
  private cuisineDatabase: CuisineDatabase;
  private languageDatabase: LanguageDatabase;

  /** The Sendgrid mailing api. */
  private sgmail: any;
  private baseURL: string;
  private pool: Pool;
}
