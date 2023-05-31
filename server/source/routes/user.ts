import * as fs from 'fs';
import * as Hash from 'hash.js';
import { InviteEmail, User, UserInvitationCode, UserStatus, UserProfileImage, CoverImage
} from '../../../client/library/source/definitions';
import { UserDatabase } from '../postgres/queries/user_database';
import { UserProfileImageDatabase } from '../postgres/queries';

/** User Routes class. */
export class UserRoutes {
  /**
   * @param app - Express app.
   * @param userDatabase - The user related table manipulation class instance.
   * @param userProfileImageDatabase
   * @param sgmail - SendGrid api.
   */
  constructor(app: any, userDatabase: UserDatabase,
      userProfileImageDatabase: UserProfileImageDatabase, sgmail: any) {
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
    app.post('/api/send_recovery_email', this.sendRecoveryEmail);
    app.post('/api/resend_recovery_email', this.resendRecoveryEmail);

    app.get('/api/profile_page/:id', this.getProfilePage);

    this.userDatabase = userDatabase;
    this.userProfileImageDatabase = userProfileImageDatabase;
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
        console.log('Failed at loadUserBySessionId', error);
        response.status(500).send();
      }
      request.session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        userName: user.userName,
        userStatus: user.userStatus,
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
      console.log('Failed at isDuplicateEmail', error);
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
        console.log('Failed at loadUserByEmail', error);
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
        console.log('Failed to addGuestUserRequest:', error);
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
      console.log('CONFIRMATION_TOKEN_ERROR in Database:', error);
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
      console.log('EMAIL_NOT_SENT', error);
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
      console.log('Failed at assignUserIdToSid:', error);
      response.status(500).json({ message: 'DATABASE_ERROR' });
      return;
    }
    request.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      userName: user.userName,
      userStatus: user.userStatus,
      createdAt: user.createdAt.toISOString()
    };
    response.status(201).json({ user: user.toJson(), message: '' });
  }

  private signUp = async (request, response) => {
    const userId = parseInt(request.params.id);
    if (userId === -1) {
      response.redirect(303, 'http://nevereatalone.net/join');
      return;
    }
    let user = User.makeGuest();
    try {
      user = await this.userDatabase.loadUserById(userId);
    } catch (error) {
      console.log('Failed at loadUserById', error);
      response.status(500).send();
      return;
    }
    if (user?.id === -1 || user.userStatus !== UserStatus.ACTIVE) {
      response.redirect(303, 'http://nevereatalone.net/join');
      return;
    }
    let hasCredentials = false;
    try {
      hasCredentials = await this.userDatabase.hasCredentials(userId);
    } catch (error) {
      console.log('Failed at hasCredentials', error);
      response.status(500).send();
      return;
    }
    if (hasCredentials) {
      response.redirect(303, 'http://nevereatalone.net/log_in');
      return;
    }
    response.status(200).send();
  }

  private setUpProfile = async (request, response) => {
    const userId = parseInt(request.params.id);
    const displayName = request.body.displayName;
    const accountProfileImage = request.body.accountProfileImage;
    console.log('setUpProfile for userID', userId, 'displayName', displayName, accountProfileImage.src);
    if (userId === -1) {
      response.status(400).send();
    }
    try {
      console.log('Running saveUserProfile');
      const result = await this.userDatabase.saveUserProfile(userId,
        accountProfileImage.src, displayName);
      console.log('result account', result.account, result.accountProfileImage);
      response.status(200).json({
        account: result.account.toJson(),
        accountProfileImage: result.accountProfileImage.toJson()
      });
    } catch (error) {
      console.log('Failed at saveUserProfile', error);
      response.status(500).send();
    }
  }

  private setUpPassword = async (request, response) => {
    const userId = parseInt(request.params.id);
    const { password } = request.body;
    try {
      await this.userDatabase.addUserCredentials(userId, password);
    } catch (error) {
      console.log('Failed at addUserCredentials', error);
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
      console.log('Failed at assignUserIdToSid', error);
      response.status(500).json({ message: 'DATABASE_ERROR' });
      return;
    }
    // Set the user object in the session
    request.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      userName: user.userName,
      userStatus: user.userStatus,
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
      console.log('Database failed at getTokenByUserId', error);
      throw error;
    }
    if (token) {
      return token;
    }
    const confirmationTokenId = Hash.sha256().update(
      email + Date.now() + userId).digest('hex');
    try {
      const expiresAt = new Date();
      // The token expires in 24 hours.
      expiresAt.setDate(expiresAt.getDate() + 1);
      await this.userDatabase.addConfirmationToken(confirmationTokenId,
        expiresAt, userId);
    } catch (error) {
      console.log('Database failed at addConfirmationToken.', error);
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
      from: fromEmail,
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
        console.log('Failed at request.session.destroy', err);
        response.status(500).json({ message: 'SESSION_DESTROY_FAILED' });
        return;
      }
      response.clearCookie('connect.sid'); // Clear the session cookie
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
      console.log('Failed at isTokenValid', error);
      response.status(500).send();
      return;
    }
    if (!isTokenValid) {
      response.redirect(303,
        'http://nevereatalone.net/confirmation_token_invalid');
      return;
    }
    let userIdByToken: number;
    try {
      userIdByToken = await this.userDatabase.getUserIdByToken(token);
    } catch (error) {
      console.log('Failed at getUserIdByToken', error);
      response.status(500).send();
      return;
    }
    let user: User;
    try {
      user = await this.userDatabase.loadUserById(userIdByToken);
    } catch (error) {
      console.log('Failed at loadUserById', error);
      response.status(500).send();
      return;
    }
    if (user.id === -1) {
      response.redirect(303, 'http://nevereatalone.net/join');
      return;
    }
    if (user.userStatus === UserStatus.ACTIVE) {
      let hasCredentials = false;
      try {
        hasCredentials = await this.userDatabase.hasCredentials(user.id);
      } catch (error) {
        console.log('Failed at hasCredentials', error);
        response.status(500).send();
        return;
      }
      if (hasCredentials) {
        response.redirect(303, 'http://nevereatalone.net/log_in');
      } else {
        response.redirect(303, `http://nevereatalone.net/sign_up/${user.id}`);
      }
      return;
    }
    let id: number;
    try {
      id = await this.userDatabase.updateUserStatusByConfirmationToken(
        token);
    } catch (error) {
      console.log('Failed at updateUserStatusByConfirmationToken', error);
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
      console.log('Failed at assignUserIdToSid', error);
      response.status(500).json({ message: 'DATABASE_ERROR' });
      return;
    }
    // Update the session with the user information
    request.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      userName: user.userName,
      userStatus: user.userStatus,
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
      console.log(error, message);
      response.status(200).json({
        message: message
      });
      return;
    }
    response.status(200).send({ message: 'Email sent.' });
  }

  private getUserInvitationCode = async (request, response) => {
    const userId = parseInt(request.params.userId);
    let userInvitationCode: string = '';
    try {
      userInvitationCode = await this.userDatabase.loadUserInvitationCode(
        userId);
    } catch (error) {
      console.log('Failed at loadUserInvitationCode', error);
      response.status(500).send();
      return;
    }
    response.status(200).json({ userInvitationCode: userInvitationCode });
  }

  private sendInviteEmail = async (request, response) => {
    const userInvitationCode = UserInvitationCode.fromJson(
      request.body.userInvitationCode);
    const inviteEmail = InviteEmail.fromJson(request.body.inviteEmail);
    const account = User.fromJson(request.body.account);
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
      account.userName).replace('{{contest}}', inviteEmail.contest);
    for (const email of inviteEmail.emailList) {
      try {
        await this.sendEmail(email, account.email,
          `Your friend, ${account.name}, invited you to check out NEA`,
          newHtml);
      } catch (error) {
        console.log('Failed at sendEmail', error);
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
      console.log('Failed at sendEmail to info@nevereatalone.net', error);
      response.status(500).send();
      return;
    }
    try {
      await this.sendPartnerWithUsRecievedConfirmationEmail(email, name);
    } catch (error) {
      console.log('Failed at sendPartnerWithUsRecievedConfirmationEmail',
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
      console.log('Failed at sendEmail', error);
      return error;
    }
  }

  private sendRecoveryEmail = async (request, response) => {
    const email = request.body.email;
    let user: User;
    try {
      user = await this.userDatabase.loadUserByEmail(email);
    } catch (error) {
      console.log('Failed at loadUserByEmail', error);
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
    const name = user.name || 'NeverEatAlone Member';
    const newHtml = recoveryHtml.replace('{{name}}', name);
    try {
      await this.sendEmail(user.email, 'info@nevereatalone.net',
        'Recovery Password Link', newHtml);
    } catch (error) {
      console.log('Failed at sendEmail', error);
      response.status(500).send();
      return;
    }
    response.status(200).json({ user: user.toJson() });
  }

  private resendRecoveryEmail = async (request, response) => {
    const email = request.body.email;
    const user = User.fromJson(request.body.user);
    if (!user || user.id === -1) {
      response.status(400).json({ message: 'USER_NOT_FOUND' });
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
    const newHtml = recoveryHtml.replace('{{name}}', user.name);
    try {
      await this.sendEmail(user.email, 'info@nevereatalone.net',
        'Recovery Password Link', newHtml);
    } catch (error) {
      console.log('Failed at sendEmail', error);
      response.status(500).send();
      return;
    }
    response.status(200).send();
  }

  private getProfilePage = async (request, response) => {
    const userId = parseInt(request.params.id);
    let user: User;
    try {
      user = await this.userDatabase.loadUserById(userId);
    } catch (error) {
      console.log('Failed at loadUserById', error);
      response.status(500).send();
      return;
    }
    if (user?.id === -1) {
      // User doesn't exist
      response.status(400).send();
      return;
    }
    const coverImage = new CoverImage();
    response.status(200).json({
      coverImage: '',
      profileImageSrc: '',
      name: user.name,
      userName: user.userName,
      createdAt: user.createdAt,
      biography: '',
      location: '',
      languageList: [],
      facebookLink: '',
      twitterLink: '',
      instagramLink: '',
      favoriteCuisineList: [],
      upcomingEventList: [],
      pastEventList: []
    });
  }

  private userDatabase: UserDatabase;
  private userProfileImageDatabase: UserProfileImageDatabase;

  /** The Sendgrid mailing api. */
  private sgmail: any;
}
