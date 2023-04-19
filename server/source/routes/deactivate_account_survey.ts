import * as fs from 'fs';
import { AccountDeletedSurvey
} from '../../../client/library/source/definitions';
import { DeactivateAccountSurveyDatabase
} from '../postgres/queries/deactivate_account_survey_database';
import { UserDatabase } from '../postgres/queries/user_database';

/** Deactivate Account Survey Routes class. */
export class DeactivateAccountSurveyRoutes {
  /**
   * @param app - Express app.
   * @param deactivateAccountSurveyDatabase - The deactivate account survey 
   * related table manipulation class instance.
   * @param userDatabase - The user related table manipulation class instance.
   * @param sgmail - SendGrid api.
   */
  constructor(app: any, deactivateAccountSurveyDatabase:
      DeactivateAccountSurveyDatabase, userDatabase: UserDatabase, sgmail: any
      ) {
    app.post('/api/submit_deactivate_account_survey',
      this.submitDeactivateAccountSurvey);
    this.deactivateAccountSurveyDatabase = deactivateAccountSurveyDatabase;
    this.userDatabase = userDatabase;
    this.sgmail = sgmail;
  }

  private submitDeactivateAccountSurvey = async (request, response) => {
    const survey = AccountDeletedSurvey.fromJson(request.body);
    try {
      await this.deactivateAccountSurveyDatabase.saveSurvey(survey);
    } catch {
      response.status(500).send();
    }
    const user = await this.userDatabase.loadUserById(survey.userId);
    if (!user) {
      response.status(404).send();
      return;
    }
    const confirmationHtml = await new Promise<string>((resolve, reject) => {
      fs.readFile('public/resources/deactivate_account_survey_email/email.html',
        'utf8', (error, html) => {
          if (error) {
            reject(error);
          } else {
            resolve(html);
          }
        });
    });
    const newHtml = confirmationHtml.replace('$name', user.name);
    try {
      await this.sendEmail(user.email, 'info@nevereatalone.net',
        'NEA Account Deactivated', '', newHtml);
    } catch (error) {
      response.status(201).json({
        message: 'EMAIL_NOT_SENT'
      });
      return;
    }
    response.status(201).send();
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

  private deactivateAccountSurveyDatabase: DeactivateAccountSurveyDatabase;

  /** The user related table manipulation class instance. */
  private userDatabase: UserDatabase;

  /** The Sendgrid mailing api. */
  private sgmail: any;
}
