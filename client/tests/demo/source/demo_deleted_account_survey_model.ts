import * as NeverEatAlone from 'never_eat_alone';

export class DemoDeletedAccountSurveyModel extends
    NeverEatAlone.DeletedAccountSurveyModel {
  public async submit(survey: NeverEatAlone.AccountDeletedSurvey): Promise<
      void> {
    return;
  }
}
