import { AccountDeletedSurvey } from '../../definitions';

export abstract class DeactivateAccountSurveyModel {
  public abstract submit(survey: AccountDeletedSurvey): Promise<void>; 
}
