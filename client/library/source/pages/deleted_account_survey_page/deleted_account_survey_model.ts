import { AccountDeletedSurvey } from '../../definitions';

export abstract class DeletedAccountSurveyModel {
  public abstract submit(survey: AccountDeletedSurvey): Promise<
    void>; 
}
