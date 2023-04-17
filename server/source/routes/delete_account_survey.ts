import { AccountDeletedSurvey
} from '../../../client/library/source/definitions';
import { DeleteAccountSurveyDatabase
} from '../postgres/queries/delete_account_survey_database';

/** Delete Account Survey Routes class. */
export class DeleteAccountSurveyRoutes {
  private submitDeleteAccount = async (request, response) => {
    const survey = AccountDeletedSurvey.fromJson(request.body);
    try {
      await this.saveDeleteSurvey(survey);
    } catch {
      response.status(500).send();
    }
    response.status(201).send();
  }
}
