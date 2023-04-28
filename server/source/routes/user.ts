import * as fs from 'fs';
import * as Hash from 'hash.js';
import { InviteEmail, User, UserInvitationCode, UserStatus
} from '../../../client/library/source/definitions';
import { UserDatabase } from '../postgres/queries/user_database';

/** User Routes class. */
export class UserRoutes {
  /**
   * @param app - Express app.
   * @param userDatabase - The user related table manipulation class instance.
   * @param sgmail - SendGrid api.
   */
  constructor(app: any, userDatabase: UserDatabase, sgmail: any) {
    /** Route to get the current logged in user. */
    app.get('/api/current_user', this.getCurrentUser);

    /** Route for guest user requesting to join the app. */
    app.post('/api/join', this.join);

    /** Route for the guest user to set up an account. */
    app.get('/api/sign_up', this.signUp);

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
    this.sgmail = sgmail;
  }

  /** Returns the current logged in user. */
  private getCurrentUser = async (request, response) => {
    let user: User;
    try {
      user = await this.userDatabase.loadUserBySessionId(request.session.id);
    } catch (error) {
      response.status(400).json({ message: 'DATABASE_ERROR' });
      return;
    }
    if (!user) {
      response.status(200).json({ user: User.makeGuest().toJson() });
      return;
    }
    response.status(200).json({ user: user.toJson() });
  }

  /** Registers the user request to join the app. */
  private join = async (request, response) => {
    const { name, email, referralCode } = request.body;
    let isEmail: boolean;
    try {
      isEmail = await this.userDatabase.isDuplicateEmail(email);
    } catch (error) {
      response.status(400).json({ message: 'DATABASE_ERROR' });
      return;
    }
    if (isEmail) {
      response.status(400).json({ message: 'DUPLICATE_EMAIL' });
      return;
    }
    let user: User;
    try {
      user = await this.userDatabase.addGuestUserRequest(name, email,
        referralCode);
    } catch (error) {
      response.status(400).json({ message: 'DATABASE_ERROR' });
      return;
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
      response.status(201).json({
        user: user.toJson(),
        message: 'EMAIL_NOT_SENT'
      });
      return;
    }
    response.status(201).json({ user: user.toJson(), message: '' });
  }

  private signUp = async (request, response) => {
    let user: User;
    try {
      user = await this.userDatabase.loadUserBySessionId(request.session.id);
    } catch (error) {
      response.status(400).json({ message: 'DATABASE_ERROR' });
      return;
    }
    if (!user || user.id === -1 || user.userStatus !== UserStatus.ACTIVE) {
      response.status(400).json({ user: User.makeGuest().toJson() });
      return;
    }
    let hasCredentials = false;
    try {
      hasCredentials = await this.userDatabase.hasCredentials(user.id);
    } catch {
      response.status(400).json({ message: 'DATABASE_ERROR' });
      return;
    }
    if (hasCredentials) {
      response.redirect(303, 'http://nevereatalone.net');
    }
    response.status(200).json({ user: user.toJson() });
  }

  /** Checks user credentials for login. */
  private logIn = async (request, response) => {
    const { email, password, rememberMe } = request.body;
    const user = await this.userDatabase.loadUserByEmail(email);
    if (user === null) {
      response.status(400).json({ message: 'EMAIL_NOT_FOUND' });
      return;
    }
    const isValidPassword =
      await this.userDatabase.validatePassword(user.id, password);
    if (!isValidPassword) {
      response.status(400).json({ message: 'INVALID_CREDENTIALS' });
      return;
    }
    if (rememberMe) {
      request.session.cookie.maxAge = 30 * 365 * 24 * 60 * 60 * 1000;
    } else {
      request.session.cookie.maxAge = 24 * 60 * 60 * 1000;
    }
    try {
      await this.userDatabase.assignUserIdToSid(request.session.id, user.id);
    } catch (error) {
      response.status(400).json({ message: 'DATABASE_ERROR' });
      return;
    }
    response.status(200).json({ user: user.toJson() });
  }

  /**
   * Creates a confirmation token and store it in the
   * user_confirmation_tokens table.
   * @param email - The user email address.
   * @param userId - The user id based on the users table.
   */
  private getConfirmationToken = async (email: string, userId: number) => {
    const confirmationTokenId = Hash.sha256().update(
      email + Date.now() + userId).digest('hex');
    try {
      const expiresAt = new Date();
      // The token expires in 24 hours.
      expiresAt.setDate(expiresAt.getDate() + 1);
      await this.userDatabase.addConfirmationToken(confirmationTokenId,
        expiresAt, userId);
    } catch (error) {
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
    if (!request.session) {
      return;
    }
    const sid = request.session.id;
    try {
      await request.session.destroy();
    } catch (error) {
      response.status(500).json({ message: 'SESSION_DESTROY_FAILED' });
      return;
    }
    try {
      await this.userDatabase.assignUserIdToSid(sid, User.makeGuest().id);
    } catch (error) {
      response.status(400).json({ message: 'SESSIONS_DATABASE_ERROR' });
    }
    response.status(200).send();
  }

  /**
   * Identifies if the token is valid or not and displays the confirmation
   * page accordingly.
   */
  private verifyConfirmationToken = async (request, response) => {
    const token = request.params.id;
    console.log('token', token);
    let isTokenValid = false;
    try {
      isTokenValid = await this.userDatabase.isTokenValid(token);
    } catch (error) {
      response.status(500).send({ error: error });
      return;
    }
    if (!isTokenValid) {
      response.redirect(303,
        'http://nevereatalone.net/confirmation_token_invalid');
      return;
    }
    console.log('token is valid');
    let userIdByToken: number;
    try {
      userIdByToken = await this.userDatabase.getUserIdByToken(token);
    } catch (error) {
      response.status(500).send({ error: error });
      return;
    }
    console.log('useIDByToken', userIdByToken);
    let user = User.makeGuest();
    try {
      user = await this.userDatabase.loadUserById(userIdByToken);
    } catch {
      response.redirect(303, 'http://nevereatalone.net/join');
      return;
    }
    if (user.userStatus === UserStatus.ACTIVE) {
      console.log('user is already verified');
      let hasCredentials = false;
      try {
        hasCredentials = await this.userDatabase.hasCredentials(user.id);
      } catch (error) {
        response.status(500).send({ error: error });
        return;
      }
      console.log('hasCredentials', hasCredentials);
      if (hasCredentials) {
        response.redirect(303, 'http://nevereatalone.net');
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
      response.status(500).send();
      return;
    }
    console.log('useId after status update to ACTIVE', id);
    request.session.cookie.maxAge = 24 * 60 * 60 * 1000;
    try {
      await this.userDatabase.assignUserIdToSid(request.session.id, user.id);
    } catch (error) {
      response.status(500).json({ message: 'DATABASE_ERROR' });
      return;
    }
    console.log('sign up email loading');
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
      response.status(200).json({
        message: "Your account is verified but we weren't able to send you the \
        sign up email. Contact info@nevereatalone.net to get help."
      });
      return;
    }
    console.log('sign up email sent');
    response.status(200).send({ message: 'Email sent.' });
  }

  private getUserInvitationCode = async (request, response) => {
    const userId = request.params.userId;
    let userInvitationCode: string = '';
    try {
      userInvitationCode = await this.userDatabase.loadUserInvitationCode(
        userId);
    } catch {
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
        response.status(400).send();
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
      await this.sendPartnerWithUsRecievedConfirmationEmail(email, name);
    } catch (error) {
      response.status(400).send();
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
      return error;
    }
  }

  private sendRecoveryEmail = async (request, response) => {
    const email = request.body.email;
    const user = await this.userDatabase.loadUserByEmail(email);
    if (user === null) {
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
    const newHtml = recoveryHtml.replace('{{name}}', user.name);
    try {
      await this.sendEmail(user.email, 'info@nevereatalone.net',
        'Recovery Password Link', newHtml);
    } catch (error) {
      response.status(400).send();
      return;
    }
    response.status(200).json({ user: user.toJson() });
  }

  private resendRecoveryEmail = async (request, response) => {
    const email = request.body.email;
    const user = User.fromJson(request.body.user);
    if (user === null) {
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
      response.status(400).send();
      return;
    }
    response.status(200).send();
  }

  private userDatabase: UserDatabase;

  /** The Sendgrid mailing api. */
  private sgmail: any;
}
