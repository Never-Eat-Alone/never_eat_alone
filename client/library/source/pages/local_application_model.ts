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
  constructor(headerModel: HeaderModel, homePageModel: HomePageModel,
      inviteAFoodieModel: InviteAFoodieModel, joinModel: JoinModel,
      partnerWithUsModel: PartnerWithUsModel, logInModel: LogInModel,
      deletedAccountSurveyModel: DeletedAccountSurveyModel,
      deactivateAccountSurveyModel: DeactivateAccountSurveyModel,
      forgotPasswordPageModel: ForgotPasswordPageModel) {
    super();
    this._headerModel = headerModel;
    this._homepageModel = homePageModel;
    this._inviteAFoodieModel = inviteAFoodieModel;
    this._joinModel = joinModel;
    this._partnerWithUsModel = partnerWithUsModel;
    this._logInModel = logInModel;
    this._deletedAccountSurveyModel = deletedAccountSurveyModel;
    this._deactivateAccountSurveyModel = deactivateAccountSurveyModel;
    this._forgotPasswordPageModel = forgotPasswordPageModel;
  }

  public async load(): Promise<void> {
    await Promise.all([this._headerModel.load(), this._homepageModel.load(),
      this._inviteAFoodieModel.load(), this._partnerWithUsModel.load()]);
  }

  public get headerModel(): HeaderModel {
    return this._headerModel;
  }

  public get homePageModel(): HomePageModel {
    return this._homepageModel;
  }

  public getDiningEventPageModel(id: number): DiningEventPageModel {
    return this._diningEventPageModelMap.get(id);
  }

  public addDiningEventPageModel(id: number, diningEventPageModel:
      DiningEventPageModel): void {
    this._diningEventPageModelMap.set(id, diningEventPageModel);
  }

  public get inviteAFoodieModel(): InviteAFoodieModel {
    return this._inviteAFoodieModel;
  }

  public get joinModel(): JoinModel {
    return this._joinModel;
  }

  public get partnerWithUsModel(): PartnerWithUsModel {
    return this._partnerWithUsModel;
  }

  public get logInModel(): LogInModel {
    return this._logInModel;
  }

  public getProfilePageModel(id: number): ProfilePageModel {
    return this._profilePageModelMap.get(id);
  }

  public addProfilePageModel(id: number, profilePageModel:
      ProfilePageModel): void {
    this._profilePageModelMap.set(id, profilePageModel);
  }

  public getEditProfilePageModel(id: number): EditProfilePageModel {
    return this._editProfilePageModelMap.get(id);
  }

  public addEditProfilePageModel(id: number, editProfilePageModel:
      EditProfilePageModel): void {
    this._editProfilePageModelMap.set(id, editProfilePageModel);
  }

  public getSettingsPageModel(id: number): SettingsPageModel {
    return this._settingsPageModelMap.get(id);
  }

  public addSettingsPageModel(id: number, settingsPageModel: SettingsPageModel
      ): void {
    this._settingsPageModelMap.set(id, settingsPageModel);
  }

  public get deletedAccountSurveyModel(): DeletedAccountSurveyModel {
    return this._deletedAccountSurveyModel;
  }

  public get deactivateAccountSurveyModel(): DeactivateAccountSurveyModel {
    return this._deactivateAccountSurveyModel;
  }

  public get forgotPasswordPageModel(): ForgotPasswordPageModel {
    return this._forgotPasswordPageModel;
  }

  public getSignUpPageModel(id: number): SignUpPageModel {
    return this._signUpPageModelMap.get(id);
  }

  public addSignUpPageModel(id: number, signUpPageModel: SignUpPageModel):
      void {
    this._signUpPageModelMap.set(id, signUpPageModel);
  }

  private _headerModel: HeaderModel;
  private _homepageModel: HomePageModel;
  private _inviteAFoodieModel: InviteAFoodieModel;
  private _joinModel: JoinModel;
  private _partnerWithUsModel: PartnerWithUsModel;
  private _logInModel: LogInModel;
  private _deletedAccountSurveyModel: DeletedAccountSurveyModel;
  private _deactivateAccountSurveyModel: DeactivateAccountSurveyModel;
  private _forgotPasswordPageModel: ForgotPasswordPageModel;
  private _signUpPageModel: SignUpPageModel;
  private _diningEventPageModelMap: Map<number, DiningEventPageModel>;
  private _profilePageModelMap: Map<number, ProfilePageModel>;
  private _editProfilePageModelMap: Map<number, EditProfilePageModel>;
  private _settingsPageModelMap: Map<number, SettingsPageModel>;
  private _signUpPageModelMap: Map<number, SignUpPageModel>;
}
