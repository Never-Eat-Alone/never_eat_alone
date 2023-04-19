import { AccountDeletedSurvey } from '../../definitions';
import { DeactivateAccountSurveyModel
} from './deactivate_account_survey_model';

export class HttpDeactivateAccountSurveyModel extends
    DeactivateAccountSurveyModel {
  public async submit(survey: AccountDeletedSurvey): Promise<boolean> {
    const response = await fetch('/api/submit_deactivate_account_survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'survey': survey.toJson()
      })
    });
    if (response.status === 200 || response.status === 201) {
      return true;
    }
    return false;
  }
}
