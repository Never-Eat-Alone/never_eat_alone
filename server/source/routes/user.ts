import * as fs from 'fs';
import * as Hash from 'hash.js';
import { InviteEmail, User, UserInvitationCode
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

    /** Route for the user log in. */
    app.post('/api/log_in', this.logIn);

    /** Route to log out the user. */
    app.get('/api/log_out', this.logOut);

    /** Route to send a confirm email to the user. */
    app.post('/api/send_confirmation_email', this.sendConfirmationEmail);

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
    const newHtml = confirmationHtml.replace('$name', name).replace('$token',
      token);
    try {
      await this.sendEmail(email, 'info@nevereatalone.net',
        'NEA Account: Registration Request', '', newHtml);
    } catch (error) {
      response.status(201).json({
        user: user.toJson(),
        message: 'EMAIL_NOT_SENT'
      });
      return;
    }
    response.status(201).json({ user: user.toJson(), message: '' });
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
  private sendEmail = async (to: string, from: string, subject: string,
      text: string, html: string) => {
    const message = {
      to: to,
      from: from,
      subject: subject,
      text: text,
      html: html,
    };
    await this.sgmail.send(message);
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
  }

  /** Sends a confirmstion email to the user via Sendgrid api. */
  private sendConfirmationEmail = async (request, response) => {
    const { userId } = request.body;
    let user: User;
    try {
      user = await this.userDatabase.loadUserById(parseInt(userId));
    } catch (error) {
      response.status(400).send();
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
      token = await this.getConfirmationToken(user.email, user.id);
    } catch (error) {
      response.status(400).json({ message: 'CONFIRMATION_TOKEN_ERROR' });
      return;
    }
    const newHtml = confirmationHtml.replace('$name', user.name).replace(
      '$token', token);
    try {
      await this.sendEmail(user.email, 'info@nevereatalone.net',
        'Welcome to Never Eat Alone', 'Welcome to NEA', newHtml);
    } catch (error) {
      response.status(400).send();
      return;
    }
    response.status(200).send();
  }

  /**
   * Identifies if the token is valid or not and displays the confirmation
   * page accordingly.
   */
  private verifyConfirmationToken = async (request, response) => {
    const token = request.params.id;
    let userId: number;
    try {
      userId = await this.userDatabase.updateUserStatusByConfirmationToken(
        token);
    } catch (error) {
      response.status(500).send();
      return;
    }
    if (!userId) {
      response.status(500).send();
      return;
    }
    request.session.cookie.maxAge = 24 * 60 * 60 * 1000;
    try {
      await this.userDatabase.assignUserIdToSid(request.session.id, userId);
    } catch (error) {
      response.status(400).json({ message: 'DATABASE_ERROR' });
      return;
    }
    response.redirect(303, 'https://www.nevereatalone.net');
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
    const newHtml = invitationHtml.replace('$user_name',
      account.userName).replace('$contest', inviteEmail.contest);
    for (const email of inviteEmail.emailList) {
      try {
        await this.sendEmail(email, account.email,
          `Your friend, ${account.name}, invited you to check out NEA`,
          inviteEmail.contest, newHtml);
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
    const newHtml = partnerWithUsHtml.replace('$name', name).replace('$link',
      profileLink).replace('$contest', message);
    try {
      await this.sendEmail('info@nevereatalone.net', email,
        `${name}, want to partner with NEA`, message, newHtml);
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
    const newHtml = partnerWithUsRecievedConfirmationHtml.replace('$name',
      name);
    try {
      await this.sendEmail(email, 'info@nevereatalone.net',
        'We Appreciate Your Business!', "This is a confirmation that we got \
        your message! We’re excited you registered to be a partner of \
        NeverEatAlone! Currently we are developing the backend for our \
        partners so hang tight and we will notify you to share any news or \
        updates.", newHtml);
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
    const newHtml = recoveryHtml.replace('$name', user.name);
    try {
      await this.sendEmail(user.email, 'info@nevereatalone.net',
        'Recovery Password Link', 'You are receiving this email because \
        requested a password recovery from NEA. Click on the button below to \
        proceed to reset your password. ', newHtml);
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
    const newHtml = recoveryHtml.replace('$name', user.name);
    try {
      await this.sendEmail(user.email, 'info@nevereatalone.net',
        'Recovery Password Link', 'You are receiving this email because \
        requested a password recovery from NEA. Click on the button below to \
        proceed to reset your password. ', newHtml);
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
