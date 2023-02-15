import { HeaderModel, HttpHeaderModel } from '../components';
import { User } from '../definitions';
import { InviteAFoodieModel } from '../modals';
import { JoinModel } from '../modals/join_modal';
import { LogInModel } from '../modals/log_in_modal';
import { ApplicationModel } from './application_model';
import { DeactivateAccountSurveyModel } from './deactivate_account_survey_page';
import { DeletedAccountSurveyModel } from './deleted_account_survey_page';
import { DiningEventPageModel } from './dining_event_page';
import { EditProfilePageModel } from './edit_profile_page';
import { ForgotPasswordPageModel } from './forgot_password_page';
import { HomePageModel, HttpHomePageModel } from './home_page';
import { LocalApplicationModel } from './local_application_model';
import { PartnerWithUsModel } from './partner_with_us_page';
import { ProfilePageModel } from './profile_page';
import { SettingsPageModel } from './settings_page';
import { SignUpPageModel } from './sign_up_page';

export class HttpApplicationModel extends ApplicationModel {
  public async load(): Promise<void> {
    const accountResponse = await fetch('/api/current_user');
    let account = User.makeGuest();
    if (accountResponse.status === 200) {
      const accountJson = await accountResponse.json();
      account = User.fromJson(accountJson);
    }
    const headerModel = new HttpHeaderModel(account);
    const homePageModel = new HttpHomePageModel(account);
    const inviteAFoodieModel: InviteAFoodieModel;
    const joinModel: JoinModel;
    const partnerWithUsModel: PartnerWithUsModel;
    const logInModel: LogInModel;
    const deletedAccountSurveyModel: DeletedAccountSurveyModel;
    const deactivateAccountSurveyModel: DeactivateAccountSurveyModel;
    const forgotPasswordPageModel: ForgotPasswordPageModel;
    this._model = new LocalApplicationModel(headerModel, homePageModel,
      inviteAFoodieModel, joinModel, partnerWithUsModel, logInModel,
      deletedAccountSurveyModel, deactivateAccountSurveyModel,
      forgotPasswordPageModel);
    await this._model.load();
  }

  public get headerModel(): HeaderModel {
    return this._model.headerModel;
  }

  public get homePageModel(): HomePageModel {
    return this._model.homePageModel;
  }

  public getDiningEventPageModel(id: number): DiningEventPageModel {
    return this._model.getDiningEventPageModel(id);
  }

  public get inviteAFoodieModel(): InviteAFoodieModel {
    return this._model.inviteAFoodieModel;
  }

  public get joinModel(): JoinModel {
    return this._model.joinModel;
  }

  public get partnerWithUsModel(): PartnerWithUsModel {
    return this._model.partnerWithUsModel;
  }

  public get logInModel(): LogInModel {
    return this._model.logInModel;
  }

  public getProfilePageModel(id: number): ProfilePageModel {
    return this._model.getProfilePageModel(id);
  }

  public getEditProfilePageModel(id: number): EditProfilePageModel {
    return this._model.getEditProfilePageModel(id);
  }

  public getSettingsPageModel(id: number): SettingsPageModel {
    return this._model.getSettingsPageModel(id);
  }

  public get deletedAccountSurveyModel(): DeletedAccountSurveyModel {
    return this._model.deletedAccountSurveyModel;
  }

  public get deactivateAccountSurveyModel(): DeactivateAccountSurveyModel {
    return this._model.deactivateAccountSurveyModel;
  }

  public get forgotPasswordPageModel(): ForgotPasswordPageModel {
    return this._model.forgotPasswordPageModel;
  }

  public getSignUpPageModel(id: number): SignUpPageModel {
    return this._model.getSignUpPageModel(id);
  }

  private _model: ApplicationModel;
}
