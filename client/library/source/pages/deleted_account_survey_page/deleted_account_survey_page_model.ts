import { AccountDeletedSurvey } from '../../definitions';

export abstract class DeletedAccountSurveyPageModel {
  public abstract submit(survey: AccountDeletedSurvey): Promise<
    void>; 
}
