import * as fs from 'fs';
import * as Hash from 'hash.js';
import * as path from 'path';
import { arrayToJson, CoverImage, Cuisine, EventCardSummary, InviteEmail,
  Language, NotificationSettings, PaymentCard, PaymentRecord, SocialAccount,
  User, UserInvitationCode, UserProfileImage, UserProfileSocialAccount,
  UserStatus } from '../../../client/library/source/definitions';
import { UserCoverImageDatabase } from
  '../postgres/queries/user_cover_image_database';
import { UserDatabase } from '../postgres/queries/user_database';
import { AttendeeDatabase, UserProfileImageDatabase } from
  '../postgres/queries';

/** User Routes class. */
export class UserRoutes {
  /**
   * @param app - Express app.
   * @param userDatabase - The user related table manipulation class instance.
   * @param userProfileImageDatabase
   * @param sgmail - SendGrid api.
   */
  constructor(app: any, userDatabase: UserDatabase, attendeeDatabase:
      AttendeeDatabase, userProfileImageDatabase: UserProfileImageDatabase,
      userCoverImageDatabase: UserCoverImageDatabase, sgmail: any) {
    /** Route to get the current logged in user. */
    app.get('/api/current_user', this.getCurrentUser);

    /** Route for guest user requesting to join the app. */
    app.post('/api/join', this.join);

    /** Route for the guest user to set up an account. */
    app.get('/api/sign_up/:id', this.signUp);
    app.post('/api/set_up_password/:id', this.setUpPassword);
    app.post('/api/set_up_profile/:id', this.setUpProfile);

    /** Route for the user log in. */
    app.post('/api/log_in', this.logIn);

    /** Route to log out the user. */
    app.get('/api/log_out', this.logOut);

    /** Route to the confirmation token page. */
    app.get('/api/confirmation_tokens/:id', this.verifyConfirmationToken);
    app.get('/api/user_invitation_code/:userId', this.getUserInvitationCode);

    app.post('/api/send_invite_email', this.sendInviteEmail);
    app.post('/api/send_partner_with_us_email', this.sendPartnerWithUsEmail);
    app.post('/api/request-password-reset', this.handleRequestPasswordReset);

    app.get('/api/profile_page/:profileId', this.getProfilePage);
    app.get('/api/edit_profile_page/:profileId', this.getEditProfilePage);
    app.post('/api/save_cover_image', this.saveProfileCoverImage);

    app.get('/api/settings/:userId', this.getSettingsPage);

    app.post('/api/reset-password', this.getResetPasswordPage);
    app.post('/api/update-password', this.updatePassword);

    this.userDatabase = userDatabase;
    this.attendeeDatabase = attendeeDatabase;
    this.userProfileImageDatabase = userProfileImageDatabase;
    this.userCoverImageDatabase = userCoverImageDatabase;
    this.sgmail = sgmail;
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
    let isEmail: boolean;
    try {
      isEmail = await this.userDatabase.isDuplicateEmail(email);
    } catch (error) {
      console.error('Failed at isDuplicateEmail', error);
      response.status(500).json({ message: 'DATABASE_ERROR' });
      return;
    }
    let user: User;
    if (isEmail) {
      try {
        const userByEmail = await this.userDatabase.loadUserByEmail(email);
        if (userByEmail.userStatus === UserStatus.ACTIVE ||
            userByEmail.userStatus === UserStatus.BANNED ||
            userByEmail.userStatus === UserStatus.DEACTIVE) {
          response.status(400).json({ message: 'DUPLICATE_EMAIL' });
          return;
        }
        if (userByEmail.userStatus === UserStatus.PENDING) {
          user = userByEmail;
        }
      } catch (error) {
        console.error('Failed at loadUserByEmail', error);
        response.status(500).send();
        return;
      }
    }
    if (!user || user.id === -1) {
      try {
        user = await this.userDatabase.addGuestUserRequest(name, email,
          referralCode);
      } catch (error) {
        response.status(500).json({ message: 'DATABASE_ERROR' });
        console.error('Failed to addGuestUserRequest:', error);
        return;
      }
    }
    const confirmationHtml = await new Promise<string>((resolve, reject) => {
      fs.readFile('public/resources/confirmation_email/email.html', 'utf8',
        (error, html) => {
          if (error) {
            reject(error);
          } else {
            resolve(html);
          }
        });
    });
    let token: string;
    try {
      token = await this.getConfirmationToken(email, user.id);
    } catch (error) {
      console.error('CONFIRMATION_TOKEN_ERROR in Database:', error);
      response.status(201).json({
        user: user.toJson(),
        message: 'CONFIRMATION_TOKEN_ERROR'
      });
      return;
    }
    const newHtml = confirmationHtml.replace('{{name}}', name).replace(
      '{{token}}', token);
    try {
      await this.sendEmail(email, 'info@nevereatalone.net',
        'NEA Account: Registration Request', newHtml);
    } catch (error) {
      console.error('EMAIL_NOT_SENT', error);
      response.status(201).json({
        user: user.toJson(),
        message: 'EMAIL_NOT_SENT'
      });
      return;
    }
    request.session.cookie.maxAge = 24 * 60 * 60 * 1000;
    try {
      const sessionExpiration = new Date(
        Date.now() + request.session.cookie.maxAge);
      await this.userDatabase.assignUserIdToSid(request.session.id, user.id,
        request.session, sessionExpiration);
    } catch (error) {
      console.error('Failed at assignUserIdToSid:', error);
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
    response.status(201).json({ user: user.toJson(), message: '' });
  }

  private signUp = async (request, response) => {
    const userId = parseInt(request.params.id);
    if (userId === -1) {
      response.redirect(303, 'https://nevereatalone.net/join');
      return;
    }
    let user = User.makeGuest();
    try {
      user = await this.userDatabase.loadUserById(userId);
    } catch (error) {
      console.error('Failed at loadUserById', error);
      response.status(500).send();
      return;
    }
    if (user.id === -1 || user.userStatus !== UserStatus.ACTIVE) {
      response.redirect(303, 'https://nevereatalone.net/join');
      return;
    }
    let hasCredentials = false;
    try {
      hasCredentials = await this.userDatabase.hasCredentials(userId);
    } catch (error) {
      console.error('Failed at hasCredentials', error);
      response.status(500).send();
      return;
    }
    if (hasCredentials) {
      response.redirect(303, 'https://nevereatalone.net/log_in');
      return;
    }
    response.status(200).send();
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
    const { password } = request.body;
    try {
      await this.userDatabase.addUserCredentials(userId, password);
    } catch (error) {
      console.error('Failed at addUserCredentials', error);
      response.status(500).send();
      return;
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
      subject: string, content: string) => {
    const message = {
      to: toEmail,
      from: `NeverEatAlone <${fromEmail}>`,
      subject: subject,
      html: content
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
      response.status(400).json({ message: 'NO_SESSION_FOUND' });
      return;
    }
    request.session.destroy((err) => {
      if (err) {
        console.error('Failed at request.session.destroy', err);
        response.status(500).json({ message: 'SESSION_DESTROY_FAILED' });
        return;
      }
      response.clearCookie('connect.sid');
      response.status(200).send('Session data cleared');
    });
  }

  /**
   * Identifies if the token is valid or not and displays the confirmation
   * page accordingly.
   */
  private verifyConfirmationToken = async (request, response) => {
    const token = request.params.id;
    let isTokenValid = false;
    try {
      isTokenValid = await this.userDatabase.isTokenValid(token);
    } catch (error) {
      console.error('Failed at isTokenValid', error);
      response.status(500).send();
      return;
    }
    if (!isTokenValid) {
      response.redirect(303,
        'https://nevereatalone.net/confirmation_token_invalid');
      return;
    }
    let userIdByToken: number;
    try {
      userIdByToken = await this.userDatabase.getUserIdByToken(token);
    } catch (error) {
      console.error('Failed at getUserIdByToken', error);
      response.status(500).send();
      return;
    }
    let user: User;
    try {
      user = await this.userDatabase.loadUserById(userIdByToken);
    } catch (error) {
      console.error('Failed at loadUserById', error);
      response.status(500).send();
      return;
    }
    if (user.id === -1) {
      response.redirect(303, 'https://nevereatalone.net/join');
      return;
    }
    if (user.userStatus as UserStatus === UserStatus.ACTIVE) {
      let hasCredentials = false;
      try {
        hasCredentials = await this.userDatabase.hasCredentials(user.id);
      } catch (error) {
        console.error('Failed at hasCredentials', error);
        response.status(500).send();
        return;
      }
      if (hasCredentials) {
        response.redirect(303, 'https://nevereatalone.net/log_in');
      } else {
        response.redirect(303, `https://nevereatalone.net/sign_up/${user.id}`);
      }
      return;
    }
    let id: number;
    try {
      id = await this.userDatabase.updateUserStatusByConfirmationToken(
        token);
    } catch (error) {
      console.error('Failed at updateUserStatusByConfirmationToken', error);
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
    const signUpHtml = await new Promise<string>((resolve, reject) => {
      fs.readFile('public/resources/sign_up_email/email.html', 'utf8',
        (error, html) => {
          if (error) {
            reject(error);
          } else {
            resolve(html);
          }
        });
    });
    const newHtml = signUpHtml.replace('{{name}}', user.name).replace('{{id}}',
      user.id.toString());
    try {
      await this.sendEmail(user.email, 'info@nevereatalone.net',
        'NEA Account: Sign Up', newHtml);
    } catch (error) {
      const message = "Your account is verified but we weren't able to send \
        you the sign up email. Contact info@nevereatalone.net to get help.";
      console.error(error, message);
      response.status(200).json({
        message: message
      });
      return;
    }
    response.status(200).json({ message: 'Email sent.', user: user.toJson() });
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
    const newHtml = invitationHtml.replace('{{user_name}}',
      user.name).replace('{{contest}}', inviteEmail.contest);
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
    const newHtml = partnerWithUsHtml.replace('{{name}}', name).replace(
      '{{link}}', profileLink).replace('{{contest}}', message);
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
    const newHtml = partnerWithUsRecievedConfirmationHtml.replace('{{name}}',
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
    const newHtml = recoveryHtml.replace('{{name}}', name).replace(
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
      profileImageSrc: profileImage.src,
      name: profileUser.name,
      userName: profileUser.userName,
      createdAt: profileUser.createdAt.toISOString(),
      biography: biography,
      address: address,
      languageList: arrayToJson(languageList),
      socialAccounts: arrayToJson(socialAccounts),
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
    let languageList: Language[] = [];
    let favoriteCuisineList: Cuisine[] = [];
    let coverImage = CoverImage.noImage();
    let coverImageList = [];
    let profileImage = UserProfileImage.default();
    let selectedLocation = '';
    let isUpcomingEventsPrivate = true;
    let isPastEventsPrivate = true;
    let isLocationPrivate = true;
    let isLanguagePrivate = true;
    let biographyValue = '';
    let isBiographyPrivate = true;
    let selectedLanguageList: Language[] = [];
    let selectedCuisineList: Cuisine[] = [];
    let isCuisinePrivate = true;
    let userProfileSocialAccountList: UserProfileSocialAccount[] = [];
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
      languageList = await this.userDatabase.loadUserLanguagesByUserId(
        profileId);
    } catch (error) {
      console.error('Failed at loadUserLanguagesByUserId', error);
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
    response.status(200).json({
      languageList: arrayToJson(languageList),
      favoriteCuisineList: arrayToJson(favoriteCuisineList),
      coverImage: coverImage.toJson(),
      coverImageList: arrayToJson(coverImageList),
      profileImage: profileImage.toJson(),
      selectedLocation: selectedLocation,
      isUpcomingEventsPrivate: isUpcomingEventsPrivate,
      isPastEventsPrivate: isPastEventsPrivate,
      isLocationPrivate: isLocationPrivate,
      isLanguagePrivate: isLanguagePrivate,
      biographyValue: biographyValue,
      isBiographyPrivate: isBiographyPrivate,
      selectedLanguageList: arrayToJson(selectedLanguageList),
      selectedCuisineList: arrayToJson(selectedCuisineList),
      isCuisinePrivate: isCuisinePrivate,
      userProfileSocialAccountList: arrayToJson(userProfileSocialAccountList)
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

  private getSettingsPage = async (request, response) => {
    const userId = parseInt(request.params.userId);
    let user: User;
    if (request.session?.user) {
      try {
        user = await this.userDatabase.loadUserBySessionId(
          request.session.id);
        if (user.id === -1 || user.id !== userId) {
          response.status(401).send();
          return;
        }
      } catch (error) {
        console.error('Failed at loadUserBySessionId', error);
        response.status(500).send();
        return;
      }
    }
    let linkedSocialAccounts: SocialAccount[] = [];
    let hashedPassword = '12';
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
      linkedSocialAccounts: arrayToJson(linkedSocialAccounts),
      hashedPassword: hashedPassword,
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

  private userDatabase: UserDatabase;
  private attendeeDatabase: AttendeeDatabase;
  private userProfileImageDatabase: UserProfileImageDatabase;
  private userCoverImageDatabase: UserCoverImageDatabase;

  /** The Sendgrid mailing api. */
  private sgmail: any;
}
