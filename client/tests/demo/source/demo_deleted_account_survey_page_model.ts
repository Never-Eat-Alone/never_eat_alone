import * as NeverEatAlone from 'never_eat_alone';

export class DemoDeletedAccountSurveyPageModel extends
    NeverEatAlone.DeletedAccountSurveyPageModel {
  public async submit(survey: NeverEatAlone.AccountDeletedSurvey): Promise<
      void> {
    return;
  }
}
