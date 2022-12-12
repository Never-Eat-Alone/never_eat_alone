import * as NeverEatAlone from 'never_eat_alone';

export class DemoDeactivateAccountSurveyModel extends
    NeverEatAlone.DeactivateAccountSurveyModel {
  public async submit(survey: NeverEatAlone.AccountDeletedSurvey): Promise<
      void> {
    return;
  }
}
