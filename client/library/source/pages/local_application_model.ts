import { HeaderModel } from '../components';
import { User, UserStatus } from '../definitions';
import { InviteAFoodieModel } from '../modals';
import { JoinModel } from '../modals/join_modal';
import { LogInModel } from '../modals/log_in_modal';
import { ApplicationModel } from './application_model';
import { DeactivateAccountSurveyModel } from './deactivate_account_survey_page';
import { DeletedAccountSurveyModel } from './deleted_account_survey_page';
import { DiningEventPageModel } from './dining_event_page';
import { EditProfilePageModel } from './edit_profile_page';
import { EmailConfirmationPageModel } from './email_confirmation_page';
import { ForgotPasswordPageModel } from './forgot_password_page';
import { HomePageModel } from './home_page';
import { PartnerWithUsModel } from './partner_with_us_page';
import { ProfilePageModel } from './profile_page';
import { SettingsPageModel } from './settings_page';
import { SignUpPageModel } from './sign_up_page';

export class LocalApplicationModel extends ApplicationModel {
  constructor(account: User, headerModel: HeaderModel,
      homePageModel: HomePageModel, inviteAFoodieModel: InviteAFoodieModel,
      joinModel: JoinModel, partnerWithUsModel: PartnerWithUsModel,
      logInModel: LogInModel,
      deletedAccountSurveyModel: DeletedAccountSurveyModel,
      deactivateAccountSurveyModel: DeactivateAccountSurveyModel,
      forgotPasswordPageModel: ForgotPasswordPageModel,
      googleClientId: string) {
    super();
    this._account = account;
    this._headerModel = headerModel;
    this._homepageModel = homePageModel;
    this._inviteAFoodieModel = inviteAFoodieModel;
    this._joinModel = joinModel;
    this._partnerWithUsModel = partnerWithUsModel;
    this._logInModel = logInModel;
    this._deletedAccountSurveyModel = deletedAccountSurveyModel;
    this._deactivateAccountSurveyModel = deactivateAccountSurveyModel;
    this._forgotPasswordPageModel = forgotPasswordPageModel;
    this._googleClientId = googleClientId;
    this._diningEventPageModelMap = new Map<number, DiningEventPageModel>();
    this._profilePageModelMap = new Map<number, ProfilePageModel>();
    this._editProfilePageModelMap = new Map<number, EditProfilePageModel>();
    this._settingsPageModelMap = new Map<number, SettingsPageModel>();
    this._signUpPageModelMap = new Map<number, SignUpPageModel>();
    this._emailConfirmationPageModelMap = new Map<string,
      EmailConfirmationPageModel>();
  }

  public async load(): Promise<void> {
    await Promise.all([this._headerModel.load(), this._homepageModel.load(),
      this._inviteAFoodieModel.load()]);
  }

  public get account(): User {
    return this._account;;
  }

  public get headerModel(): HeaderModel {
    return this._headerModel;
  }

  public get homePageModel(): HomePageModel {
    return this._homepageModel;
  }

  public addDiningEventPageModel(id: number, diningEventPageModel:
      DiningEventPageModel): void {
    this._diningEventPageModelMap.set(id, diningEventPageModel);
  }

  public getDiningEventPageModel(id: number): DiningEventPageModel {
    return this._diningEventPageModelMap.get(id);
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

  public addProfilePageModel(id: number, profilePageModel:
      ProfilePageModel): void {
    this._profilePageModelMap.set(id, profilePageModel);
  }

  public getProfilePageModel(id: number): ProfilePageModel {
    return this._profilePageModelMap.get(id);
  }

  public addEditProfilePageModel(id: number, editProfilePageModel:
      EditProfilePageModel): void {
    this._editProfilePageModelMap.set(id, editProfilePageModel);
  }

  public getEditProfilePageModel(id: number): EditProfilePageModel {
    return this._editProfilePageModelMap.get(id);
  }

  public addSettingsPageModel(id: number, settingsPageModel: SettingsPageModel
      ): void {
    this._settingsPageModelMap.set(id, settingsPageModel);
  }

  public getSettingsPageModel(id: number): SettingsPageModel {
    return this._settingsPageModelMap.get(id);
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

  public addSignUpPageModel(id: number, signUpPageModel: SignUpPageModel):
      void {
    this._signUpPageModelMap.set(id, signUpPageModel);
  }

  public getSignUpPageModel(id: number): SignUpPageModel {
    return this._signUpPageModelMap.get(id);
  }

  public get googleClientId(): string {
    return this._googleClientId;
  }

  public addEmailConfirmationPageModel(id: string,
      emailConfirmationPageModel: EmailConfirmationPageModel): void {
    this._emailConfirmationPageModelMap.set(id, emailConfirmationPageModel);
  }

  public getEmailConfirmationPageModel(id: string): EmailConfirmationPageModel {
    return this._emailConfirmationPageModelMap.get(id);
  }

  private _account: User;
  private _headerModel: HeaderModel;
  private _homepageModel: HomePageModel;
  private _inviteAFoodieModel: InviteAFoodieModel;
  private _joinModel: JoinModel;
  private _partnerWithUsModel: PartnerWithUsModel;
  private _logInModel: LogInModel;
  private _deletedAccountSurveyModel: DeletedAccountSurveyModel;
  private _deactivateAccountSurveyModel: DeactivateAccountSurveyModel;
  private _forgotPasswordPageModel: ForgotPasswordPageModel;
  private _diningEventPageModelMap: Map<number, DiningEventPageModel>;
  private _profilePageModelMap: Map<number, ProfilePageModel>;
  private _editProfilePageModelMap: Map<number, EditProfilePageModel>;
  private _settingsPageModelMap: Map<number, SettingsPageModel>;
  private _signUpPageModelMap: Map<number, SignUpPageModel>;
  private _googleClientId: string;
  private _emailConfirmationPageModelMap: Map<string,
    EmailConfirmationPageModel>;
}
