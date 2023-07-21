import { User, UserProfileImage } from '../definitions';
import { InviteAFoodieModel } from '../modals/invite_a_foodie_modal';
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
  constructor(account: User, accountProfileImage: UserProfileImage,
      homePageModel: HomePageModel, inviteAFoodieModel: InviteAFoodieModel,
      joinModel: JoinModel, partnerWithUsModel: PartnerWithUsModel,
      logInModel: LogInModel, deletedAccountSurveyModel:
      DeletedAccountSurveyModel, deactivateAccountSurveyModel:
      DeactivateAccountSurveyModel, forgotPasswordPageModel:
      ForgotPasswordPageModel, googleClientId: string, diningEventPageModelMap:
      Map<number, DiningEventPageModel>, editProfilePageModelMap: Map<number,
      EditProfilePageModel>, signUpPageModelMap: Map<number, SignUpPageModel>,
      profilePageModelMap: Map<number, ProfilePageModel>, settingsPageModelMap:
      Map<number, SettingsPageModel>, emailConfirmationPageModelMap: Map<string,
      EmailConfirmationPageModel>) {
    super();
    this._account = account;
    this._accountProfileImage = accountProfileImage;
    this._homePageModel = homePageModel;
    this._inviteAFoodieModel = inviteAFoodieModel;
    this._joinModel = joinModel;
    this._partnerWithUsModel = partnerWithUsModel;
    this._logInModel = logInModel;
    this._deletedAccountSurveyModel = deletedAccountSurveyModel;
    this._deactivateAccountSurveyModel = deactivateAccountSurveyModel;
    this._forgotPasswordPageModel = forgotPasswordPageModel;
    this._googleClientId = googleClientId;
    this._diningEventPageModelMap = diningEventPageModelMap;
    this._editProfilePageModelMap = editProfilePageModelMap;
    this._signUpPageModelMap = signUpPageModelMap;
    this._profilePageModelMap = profilePageModelMap;
    this._settingsPageModelMap = settingsPageModelMap;
    this._emailConfirmationPageModelMap = emailConfirmationPageModelMap;
  }

  public async load(): Promise<void> {
    await Promise.all([this._homePageModel.load(),
      this._inviteAFoodieModel.load()]);
  }

  public async setAccount(newAccount: User): Promise<void> {
    this._account = newAccount;
  }

  public updateAccountProfileImage(newImage: UserProfileImage): void {
    this._accountProfileImage = newImage;
  }

  public get account(): User {
    return this._account;
  }

  public get accountProfileImage(): UserProfileImage {
    return this._accountProfileImage;
  }

  public get homePageModel(): HomePageModel {
    return this._homePageModel;
  }

  public async updateHomePageModel(newModel: HomePageModel): Promise<void> {
    this._homePageModel = newModel;
    await this.homePageModel.load();
  }

  public addDiningEventPageModel(id: number, diningEventPageModel:
      DiningEventPageModel): void {
    this._diningEventPageModelMap.set(id, diningEventPageModel);
  }

  public getDiningEventPageModel(id: number): DiningEventPageModel {
    return this._diningEventPageModelMap.get(id);
  }

  public async updateDiningEventPageModel(id: number, updatedModel:
      DiningEventPageModel): Promise<void> {
    this._diningEventPageModelMap.set(id, updatedModel);
  }

  public get inviteAFoodieModel(): InviteAFoodieModel {
    return this._inviteAFoodieModel;
  }

  public async updateInviteAFoodieModel(newModel: InviteAFoodieModel): Promise<
      void> {
    this._inviteAFoodieModel = newModel;
    await this._inviteAFoodieModel.load();
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
  private _accountProfileImage: UserProfileImage;
  private _homePageModel: HomePageModel;
  private _inviteAFoodieModel: InviteAFoodieModel;
  private _joinModel: JoinModel;
  private _partnerWithUsModel: PartnerWithUsModel;
  private _logInModel: LogInModel;
  private _deletedAccountSurveyModel: DeletedAccountSurveyModel;
  private _deactivateAccountSurveyModel: DeactivateAccountSurveyModel;
  private _forgotPasswordPageModel: ForgotPasswordPageModel;
  private _googleClientId: string;
  private _diningEventPageModelMap: Map<number, DiningEventPageModel>;
  private _profilePageModelMap: Map<number, ProfilePageModel>;
  private _editProfilePageModelMap: Map<number, EditProfilePageModel>;
  private _settingsPageModelMap: Map<number, SettingsPageModel>;
  private _signUpPageModelMap: Map<number, SignUpPageModel>;
  private _emailConfirmationPageModelMap: Map<string,
    EmailConfirmationPageModel>;
}
