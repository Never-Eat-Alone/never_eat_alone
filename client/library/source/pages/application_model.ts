import { HeaderModel } from '../components';
import { InviteAFoodieModel } from '../modals';
import { JoinModel } from '../modals/join_modal';
import { LogInModel } from '../modals/log_in_modal';
import { DeactivateAccountSurveyModel } from './deactivate_account_survey_page';
import { DeletedAccountSurveyModel } from './deleted_account_survey_page';
import { DiningEventPageModel } from './dining_event_page';
import { EditProfilePageModel } from './edit_profile_page';
import { ForgotPasswordPageModel } from './forgot_password_page';
import { HomePageModel } from './home_page';
import { PartnerWithUsModel } from './partner_with_us_page';
import { ProfilePageModel } from './profile_page';
import { SettingsPageModel } from './settings_page';
import { SignUpPageModel } from './sign_up_page';

export abstract class ApplicationModel {
  public abstract load(): Promise<void>;
  public abstract get headerModel(): HeaderModel;
  public abstract get homePageModel(): HomePageModel;
  public abstract getDiningEventPageModel(id: number): DiningEventPageModel;
  public abstract get inviteAFoodieModel(): InviteAFoodieModel;
  public abstract get joinModel(): JoinModel;
  public abstract get partnerWithUsModel(): PartnerWithUsModel;
  public abstract get logInModel(): LogInModel;
  public abstract getProfilePageModel(id: number): ProfilePageModel;
  public abstract getEditProfilePageModel(id: number): EditProfilePageModel;
  public abstract getSettingsPageModel(id: number): SettingsPageModel;
  public abstract get deletedAccountSurveyModel(): DeletedAccountSurveyModel;
  public abstract get deactivateAccountSurveyModel():
    DeactivateAccountSurveyModel;
  public abstract get forgotPasswordPageModel(): ForgotPasswordPageModel;
  public abstract get signUpPageModel(): SignUpPageModel;
}
