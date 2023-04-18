import { AccountDeletedSurvey } from '../../definitions';
import { DeletedAccountSurveyModel } from './deleted_account_survey_model';

export class HttpDeletedAccountSurveyModel extends DeletedAccountSurveyModel {
  public async submit(survey: AccountDeletedSurvey): Promise<boolean> {
    const response = await fetch('/api/submit_deleted_account_survey', {
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
