import { HeaderModel } from '../components';
import { InviteAFoodieModel } from '../modals';
import { JoinModel } from '../modals/join_modal';
import { LogInModel } from '../modals/log_in_modal';
import { ApplicationModel } from './application_model';
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

export class LocalApplicationModel extends ApplicationModel {
  public async load(): Promise<void> {

  }

  public get headerModel(): HeaderModel {
    return;
  }

  public get homePageModel(): HomePageModel {
    return;
  }

  public getDiningEventPageModel(id: number): DiningEventPageModel {
    return;
  }

  public get inviteAFoodieModel(): InviteAFoodieModel {
    return;
  }

  public get joinModel(): JoinModel {
    return;
  }

  public get partnerWithUsModel(): PartnerWithUsModel {
    return;
  }

  public get logInModel(): LogInModel {
    return;
  }

  public getProfilePageModel(id: number): ProfilePageModel {
    return;
  }

  public getEditProfilePageModel(id: number): EditProfilePageModel {
    return;
  }

  public getSettingsPageModel(id: number): SettingsPageModel {
    return;
  }

  public get deletedAccountSurveyModel(): DeletedAccountSurveyModel {
    return;
  }

  public get deactivateAccountSurveyModel(): DeactivateAccountSurveyModel {
    return;
  }

  public get forgotPasswordPageModel(): ForgotPasswordPageModel {
    return;
  }

  public getSignUpPageModel(id: number): SignUpPageModel {
    return this._signUpPageModel;
  }

  private _headerModel: HeaderModel;
  private _homepageModel: HomePageModel;
  private _signUpPageModel: SignUpPageModel;
}
