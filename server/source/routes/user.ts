import * as fs from 'fs';
import * as Hash from 'hash.js';
import { LoginTicket, OAuth2Client } from 'google-auth-library';
import { User } from '../../../client/library/source/definitions';
import { UserDatabase } from '../postgres/queries/user_database';

/** User Routes class. */
export class UserRoutes {
  /**
   * @param app - Express app.
   * @param userDatabase - The user related table manipulation class instance.
   * @param sgmail - SendGrid api.
   * @param googleClientId - Google client id number.
   */
  constructor(app: any, userDatabase: UserDatabase, sgmail: any,
      googleClientId: string) {

    /** Route to get the current logged in user. */
    app.get('/api/current_user', this.getCurrentUser);

    /** Route for the guest user sign up. */
    app.post('/api/sign_up', this.guestSignUp);

    /** Route for the user log in. */
    app.post('/api/log_in', this.logIn);

    /** Route for the guest user login with a Google account. */
    app.post('/api/google_log_in', this.googleLogIn);

    /** Route for the guest user sign up with a Google account. */
    app.post('/api/guest_google_sign_up', this.guestGoogleSignUp);

    /** Route to log out the user. */
    app.get('/api/log_out', this.logOut);

    /** Route to send a confirm email to the user. */
    app.post('/api/send_confirmation_email', this.sendConfirmationEmail);

    /** Route to the confirmation token page. */
    app.get('/api/confirmation_tokens/:id', this.verifyConfirmationToken);

    this.userDatabase = userDatabase;
    this.sgmail = sgmail;
    this.googleClientId = googleClientId;
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

  /** Checks user credentials for login using Google account. */
  private googleLogIn = async (request, response) => {
    const { email, token } = request.body;
    const user = await this.userDatabase.loadUserByEmail(email);
    if (user === null) {
      response.status(400).json({ message: 'EMAIL_NOT_FOUND' });
      return;
    }
    let ticket: LoginTicket;
    try {
      const googleClient = new OAuth2Client(this.googleClientId);
      ticket = await googleClient.verifyIdToken({
        idToken: token.id_token,
        audience: this.googleClientId
      });
    } catch (error) {
      response.status(400).json({ message: 'GOOGLE_SERVICE_ERROR' });
      return;
    }
    const googleCredentials =
      await this.userDatabase.loadGoogleCredentials(user.id);
    if (googleCredentials !== ticket.getPayload()['sub']) {
      response.status(400).json({ message: 'SOCIAL_LOGIN_FAILED' });
      return;
    }
    try {
      await this.userDatabase.assignUserIdToSid(request.session.id, user.id);
    } catch (error) {
      response.status(400).json({ message: 'DATABASE_ERROR' });
      return;
    }
    response.status(200).json({ user: user.toJson() });
  }

  /** Registers guest user. */
  private guestSignUp = async (request, response) => {
    const { name, email, userName, password } = request.body;
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
    let isUserName: boolean;
    try {
      isUserName = await this.userDatabase.isDuplicateUserName(userName);
    } catch (error) {
      response.status(400).json({ message: 'DATABASE_ERROR' });
      return;
    }
    if (isUserName) {
      response.status(400).json({ message: 'DUPLICATE_USERNAME' });
      return;
    }
    let user: User;
    try {
      user = await this.userDatabase.addGuestUser(name, email, userName,
        password);
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
        'Welcome to Never Eat Alone', 'Welcome to NEA', newHtml);
    } catch (error) {
      response.status(201).json({
        user: user.toJson(),
        message: 'EMAIL_NOT_SENT'
      });
      return;
    }
    response.status(201).json({ user: user.toJson(), message: '' });
  }

  /** Registers guest user using her gmail account. */
  private guestGoogleSignUp = async (request, response) => {
    const { authToken, email, name } = request.body;
    let ticket: LoginTicket;
    try {
      const googleClient = new OAuth2Client(this.googleClientId);
      ticket = await googleClient.verifyIdToken({
        idToken: authToken,
        audience: this.googleClientId
      });
    } catch (error) {
      response.status(400).json({ message: 'DATABASE_ERROR' });
      return;
    }
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
      user = await this.userDatabase.addGoogleUser(name, email, ticket);
    } catch (error) {
      response.status(400).json({ message: 'DATABASE_ERROR' });
      return;
    }
    response.status(201).json({ user: user.toJson() });
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

  private userDatabase: UserDatabase;

  /** The Sendgrid mailing api. */
  private sgmail: any;

  /** The Google CliendId. */
  private googleClientId: string;
}
