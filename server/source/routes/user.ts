import * as fs from 'fs';
import * as Hash from 'hash.js';
import { arrayToJson, Avatar, InviteEmail, User, UserInvitationCode, UserStatus,
  UserProfileImage } from '../../../client/library/source/definitions';
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
    app.post('/api/sign_up/:id', this.setUpPassword);
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

    this.userDatabase = userDatabase;
    this.userProfileImageDatabase = userProfileImageDatabase;
    this.sgmail = sgmail;
  }

  /** Returns the current logged in user. */
  private getCurrentUser = async (request, response) => {
    console.log('Running getCurrentUser');
    if (request.session && request.session.user) {
      let user: User;
      console.log('Calling loadUserBySessionId for sid', request.session.id);
      try {
        user = await this.userDatabase.loadUserBySessionId(
          request.session.id);
        console.log('user', user.id, user.name, user.userStatus as UserStatus);
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
      console.log('user session updated based on loadedUser user: user.toJson()', user.toJson());
      response.status(200).json({ user: user.toJson() });
    } else {
      const guestUser = User.makeGuest();
      console.log('No session or session user found. current user is guest');
      response.status(200).json({ user: guestUser.toJson() });
    }
  }

  /** Registers the user request to join the app. */
  private join = async (request, response) => {
    console.log('Running join');
    const { name, email, referralCode } = request.body;
    let isEmail: boolean;
    console.log(name, email, referralCode);
    console.log('Calling isDuplicateEmail');
    try {
      isEmail = await this.userDatabase.isDuplicateEmail(email);
    } catch (error) {
      console.log('Failed at isDuplicateEmail', error);
      response.status(500).json({ message: 'DATABASE_ERROR' });
      return;
    }
    let user: User;
    console.log('isEmail', isEmail);
    if (isEmail) {
      console.log('Calling loadUserByEmail as found duplicated email');
      try {
        const userByEmail = await this.userDatabase.loadUserByEmail(email);
        console.log('userByEmail status', userByEmail.userStatus);
        if (userByEmail.userStatus === UserStatus.ACTIVE ||
            userByEmail.userStatus === UserStatus.BANNED ||
            userByEmail.userStatus === UserStatus.DEACTIVE) {
          console.log('response status 400 as user status was active, banned or deactive.');
          response.status(400).json({ message: 'DUPLICATE_EMAIL' });
          return;
        }
        if (userByEmail.userStatus === UserStatus.PENDING) {
          user = userByEmail;
          console.log('user status was pending and user value is updated to', user);
        }
      } catch (error) {
        console.log('Failed at loadUserByEmail', error);
        response.status(500).send();
        return;
      }
    }
    if (!user || user.id === -1) {
      console.log('user is guest (new)');
      try {
        console.log('calling the addGuestUserRequest');
        user = await this.userDatabase.addGuestUserRequest(name, email,
          referralCode);
        console.log('addGuestUserRequest success', user.id, user.name, user.userStatus);
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
      console.log('calling getConfirmationToken for user id', user.id);
      token = await this.getConfirmationToken(email, user.id);
      console.log('token created succesfuly', token);
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
      console.log('Calling sendEmail');
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
    console.log('email sent successfully for confirmation');
    request.session.cookie.maxAge = 24 * 60 * 60 * 1000;
    console.log('calling assignUserIdToSid', request.session.id, user.id);
    try {
      const sessionExpiration = new Date(
        Date.now() + request.session.cookie.maxAge);
      await this.userDatabase.assignUserIdToSid(request.session.id, user.id,
        request.session, sessionExpiration);
      console.log('assignUserIdToSid was successful!');
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
    console.log('Updated request.session.user object.', request.session.user);
    console.log('201 response for user', user.toJson());
    response.status(201).json({ user: user.toJson(), message: '' });
  }

  private signUp = async (request, response) => {
    console.log('Running signUp');
    const userId = parseInt(request.params.id);
    let user = User.makeGuest();
    console.log('Calling loadUserById for id', userId);
    try {
      user = await this.userDatabase.loadUserById(userId);
    } catch (error) {
      console.log('Failed at loadUserById', error);
      response.status(500).send();
      return;
    }
    if (!user || user.id === -1 || user.userStatus !== UserStatus.ACTIVE) {
      console.log('Redirect 303 to join page because !user || user.id === -1 || user.userStatus !== UserStatus.ACTIVE');
      response.redirect(303, 'http://nevereatalone.net/join');
      return;
    }
    let hasCredentials = false;
    try {
      console.log('Calling hasCredentials for userId', userId);
      hasCredentials = await this.userDatabase.hasCredentials(userId);
    } catch (error) {
      console.log('Failed at hasCredentials', error);
      response.status(500).send();
      return;
    }
    if (hasCredentials) {
      console.log('redirect 303 to login becasue hasCredentials is true.');
      response.redirect(303, 'http://nevereatalone.net/log_in');
      return;
    }
    let userProfileImage = UserProfileImage.NoImage();
    console.log('Calling loadProfileImageByUserId for userId', userId);
    try {
      userProfileImage = 
        await this.userProfileImageDatabase.loadProfileImageByUserId(userId);
    } catch (error) {
      console.log('Failed at loadProfileImageByUserId', error);
      response.status(500).send();
      return;
    }
    let avatars: Avatar[] = [];
    try {
      console.log('Calling loadAvatars');
      const tempAvatars = await this.userDatabase.loadAvatars();
      avatars = [...tempAvatars];
      console.log('Avatars loaded successfully', avatars.length);
    } catch (error) {
      console.log('Failed at loadAvatars', error);
      response.status(500).send();
      return;
    }
    console.log('200 response signUp', user.email, userProfileImage.toJson(), arrayToJson(avatars));
    response.status(200).json({
      email: user.email,
      userProfileImage: userProfileImage.toJson(),
      avatars: arrayToJson(avatars)
    });
  }

  private setUpProfile = async (request, response) => {
    console.log('Running setUpProfile');
    const displayName = request.body.displayName;
    const image = UserProfileImage.fromJson(request.body.image);
    console.log('Calling saveUserProfile with image', image, 'displayName', displayName);
    try {
      await this.userDatabase.saveUserProfile(image, displayName);
    } catch (error) {
      console.log('Failed at saveUserProfile', error);
      response.status(500).send();
      return;
    }
    console.log('Response 201 as saveUserProfile was successful.');
    response.status(201).send();
  }

  private setUpPassword = async (request, response) => {
    console.log('Running setUpPassword');
    const userId = parseInt(request.params.id);
    const { password } = request.body;
    console.log('Calling addUserCredentials for userId', userId, 'password', password);
    try {
      await this.userDatabase.addUserCredentials(userId, password);
    } catch (error) {
      console.log('Failed at addUserCredentials', error);
      response.status(500).send();
      return;
    }
    console.log('response 200 as addUserCredentials was successful.');
    response.status(200).send();
  }

  /** Checks user credentials for login. */
  private logIn = async (request, response) => {
    console.log('Running logIn');
    const { email, password, rememberMe } = request.body;
    console.log('Calling loadUserByEmail for email', email);
    const user = await this.userDatabase.loadUserByEmail(email);
    if (!email || user.id === -1) {
      console.log('response 401 as !email || user.id === -1');
      response.status(401).json({ message: 'INVALID_CREDENTIALS' });
      return;
    }
    console.log('Calling validatePassword');
    const isValidPassword =
      await this.userDatabase.validatePassword(user.id, password);
    console.log('isValidPassword', isValidPassword);
    if (!isValidPassword) {
      console.log('response 401 as isValidPassword was false');
      response.status(401).json({ message: 'INVALID_CREDENTIALS' });
      return;
    }
    console.log('rememberMe', rememberMe);
    if (rememberMe) {
      request.session.cookie.maxAge = 30 * 365 * 24 * 60 * 60 * 1000;
    } else {
      request.session.cookie.maxAge = 24 * 60 * 60 * 1000;
    }
    console.log('request.session.cookie.maxAge', request.session.cookie.maxAge);
    console.log('Calling assignUserIdToSid for sid', request.session.id, 'userId', user.id, 'session', request.session);
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
    console.log('Successful assignUserIdToSid');
    // Set the user object in the session
    request.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      userName: user.userName,
      userStatus: user.userStatus,
      createdAt: user.createdAt.toISOString()
    };
    console.log('Update user session',user.id, user.name, user.email, user.userName, user.userStatus, user.createdAt.toISOString());
    console.log('response 200 with user', user.toJson());
    response.status(200).json({ user: user.toJson() });
  }

  /**
   * Creates a confirmation token and store it in the
   * user_confirmation_tokens table.
   * @param email - The user email address.
   * @param userId - The user id based on the users table.
   */
  private getConfirmationToken = async (email: string, userId: number) => {
    console.log('Running getConfirmationToken');
    let token = '';
    try {
      console.log('Calling getTokenByUserId');
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
      console.log('Calling addConfirmationToken');
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
      if (error.response && error.response.body && error.response.body.errors) {
        console.error('Error details:', error.response.body.errors);
      }
    }
  }

  /** Logs out the user. */
  private logOut = async (request, response) => {
    console.log('Running logOut');
    if (!request.session) {
      console.log('response 400 as no session found');
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
      console.log('response 200 as user logged out successfully');
      response.status(200).send('Session data cleared');
    });
  }

  /**
   * Identifies if the token is valid or not and displays the confirmation
   * page accordingly.
   */
  private verifyConfirmationToken = async (request, response) => {
    console.log('Running verifyConfirmationToken');
    const token = request.params.id;
    let isTokenValid = false;
    console.log('token', token);
    console.log('Calling isTokenValid');
    try {
      isTokenValid = await this.userDatabase.isTokenValid(token);
    } catch (error) {
      console.log('Failed at isTokenValid', error);
      response.status(500).send();
      return;
    }
    console.log('isTokenValid', isTokenValid);
    if (!isTokenValid) {
      console.log('redirect 303 to invalid token page');
      response.redirect(303,
        'http://nevereatalone.net/confirmation_token_invalid');
      return;
    }
    let userIdByToken: number;
    console.log('Calling getUserIdByToken');
    try {
      userIdByToken = await this.userDatabase.getUserIdByToken(token);
    } catch (error) {
      console.log('Failed at getUserIdByToken', error);
      response.status(500).send();
      return;
    }
    let user: User;
    console.log('Calling loadUserById with is', userIdByToken);
    try {
      user = await this.userDatabase.loadUserById(userIdByToken);
    } catch (error) {
      console.log('Failed at loadUserById', error);
      response.status(500).send();
      return;
    }
    console.log('userId', user.id, 'userStatus', user.userStatus);
    if (user.id === -1) {
      console.log('redirect 303 to join page as user not regiestered');
      response.redirect(303, 'http://nevereatalone.net/join');
      return;
    }
    if (user.userStatus === UserStatus.ACTIVE) {
      let hasCredentials = false;
      console.log('Calling hasCredentials for active user');
      try {
        hasCredentials = await this.userDatabase.hasCredentials(user.id);
      } catch (error) {
        console.log('Failed at hasCredentials', error);
        response.status(500).send();
        return;
      }
      console.log('hasCredentials', hasCredentials);
      if (hasCredentials) {
        console.log('redirect 303 to log in');
        response.redirect(303, 'http://nevereatalone.net/log_in');
      } else {
        console.log('redirect 303 to sign up page/', user.id);
        response.redirect(303, `http://nevereatalone.net/sign_up/${user.id}`);
      }
      return;
    }
    let id: number;
    console.log('Calling updateUserStatusByConfirmationToken');
    try {
      id = await this.userDatabase.updateUserStatusByConfirmationToken(
        token);
    } catch (error) {
      console.log('Failed at updateUserStatusByConfirmationToken', error);
      response.status(500).send();
      return;
    }
    request.session.cookie.maxAge = 24 * 60 * 60 * 1000;
    console.log('Calling assignUserIdToSid');
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
    console.log('Successful assignUserIdToSid');
    // Update the session with the user information
    request.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      userName: user.userName,
      userStatus: user.userStatus,
      createdAt: user.createdAt.toISOString()
    };
    console.log('session user is updated as userstatus is updated', user.id, user.userStatus);
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
    console.log('Calling sendEmail to send email to', user.email);
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
    console.log('Successful sendEmail');
    console.log('response 200 for request.session.user', request.session.user.id, 'user.id', user.id);
    response.status(200).send({ message: 'Email sent.' });
  }

  private getUserInvitationCode = async (request, response) => {
    console.log('Running getUserInvitationCode');
    const userId = parseInt(request.params.userId);
    let userInvitationCode: string = '';
    console.log('Calling loadUserInvitationCode for userId', userId);
    try {
      userInvitationCode = await this.userDatabase.loadUserInvitationCode(
        userId);
    } catch (error) {
      console.log('Failed at loadUserInvitationCode', error);
      response.status(500).send();
      return;
    }
    console.log('response status 200 with userInvitationCode', userInvitationCode);
    response.status(200).json({ userInvitationCode: userInvitationCode });
  }

  private sendInviteEmail = async (request, response) => {
    console.log('Running sendInviteEmail');
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
      console.log('Calling sendEmail to', email, 'from', account.email);
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
    console.log('response 200 as emailes were sent successfully.');
    response.status(200).send();
  }

  private sendPartnerWithUsEmail = async (request, response) => {
    console.log('Running sendPartnerWithUsEmail');
    const { name, email, profileLink, message } = request.body;
    console.log('name', name, 'email', email, 'profileLink', profileLink, 'message', message);
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
    console.log('Calling sendEmail');
    try {
      await this.sendEmail('info@nevereatalone.net', email,
        `${name}, want to partner with NEA`, newHtml);
    } catch (error) {
      console.log('Failed at sendEmail to info@nevereatalone.net', error);
      response.status(500).send();
      return;
    }
    console.log('Calling sendPartnerWithUsRecievedConfirmationEmail to email', email, name);
    try {
      await this.sendPartnerWithUsRecievedConfirmationEmail(email, name);
    } catch (error) {
      console.log('sendPartnerWithUsRecievedConfirmationEmail', error);
      response.status(500).send();
      return;
    }
    console.log('response 200');
    response.status(200).send();
  }

  private sendPartnerWithUsRecievedConfirmationEmail = async (email: string,
      name: string) => {
    console.log('Running sendPartnerWithUsRecievedConfirmationEmail');
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
    console.log('Calling sendEmail');
    try {
      await this.sendEmail(email, 'info@nevereatalone.net',
        'We Appreciate Your Business!', newHtml);
    } catch (error) {
      console.log('Failed at sendEmail', error);
      return error;
    }
  }

  private sendRecoveryEmail = async (request, response) => {
    console.log('Running sendRecoveryEmail');
    const email = request.body.email;
    console.log('Calling loadUserByEmail');
    let user: User;
    try {
      user = await this.userDatabase.loadUserByEmail(email);
    } catch (error) {
      console.log('Failed at loadUserByEmail', error);
      response.status(500).json({ message: 'DATABASE_ERROR' });
      return;
    }
    if (!user || user.id === -1 || user.email == '') {
      console.log('response 400 as no user found.');
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
    console.log('Calling sendEmail');
    try {
      await this.sendEmail(user.email, 'info@nevereatalone.net',
        'Recovery Password Link', newHtml);
    } catch (error) {
      console.log('Failed at sendEmail', error);
      response.status(500).send();
      return;
    }
    console.log('response 200 for user', user.toJson());
    response.status(200).json({ user: user.toJson() });
  }

  private resendRecoveryEmail = async (request, response) => {
    console.log('Running resendRecoveryEmail');
    const email = request.body.email;
    const user = User.fromJson(request.body.user);
    if (!user || user.id === -1) {
      console.log('response 400 as no user found');
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
    console.log('response 200');
    response.status(200).send();
  }

  private userDatabase: UserDatabase;
  private userProfileImageDatabase: UserProfileImageDatabase;

  /** The Sendgrid mailing api. */
  private sgmail: any;
}
