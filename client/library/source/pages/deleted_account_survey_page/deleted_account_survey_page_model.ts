import { SurveyAnswers } from './deleted_account_survey_page';

export abstract class DeletedAccountSurveyPageModel {
  public abstract submit(surveyAnswers: SurveyAnswers): Promise<void>; 
}
