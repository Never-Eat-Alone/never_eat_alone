import { User, UserProfileImage } from '../definitions';
import { HttpInviteAFoodieModel, InviteAFoodieModel } from
  '../modals/invite_a_foodie_modal';
import { HttpJoinModel, JoinModel } from '../modals/join_modal';
import { HttpLogInModel, LogInModel } from '../modals/log_in_modal';
import { ApplicationModel } from './application_model';
import { DeactivateAccountSurveyModel, HttpDeactivateAccountSurveyModel } from
  './deactivate_account_survey_page';
import { DeletedAccountSurveyModel, HttpDeletedAccountSurveyModel } from
  './deleted_account_survey_page';
import { DiningEventPageModel, HttpDiningEventPageModel } from
  './dining_event_page';
import { EditProfilePageModel, HttpEditProfilePageModel } from
  './edit_profile_page';
import { EmailConfirmationPageModel, HttpEmailConfirmationPageModel } from
  './email_confirmation_page';
import { ForgotPasswordPageModel, HttpForgotPasswordPageModel } from
  './forgot_password_page';
import { HomePageModel, HttpHomePageModel } from './home_page';
import { LocalApplicationModel } from './local_application_model';
import { HttpPartnerWithUsModel, PartnerWithUsModel } from
  './partner_with_us_page';
import { ProfilePageModel, HttpProfilePageModel } from './profile_page';
import { HttpSettingsPageModel, SettingsPageModel } from './settings_page';
import { HttpSignUpPageModel, SignUpPageModel } from './sign_up_page';

export class HttpApplicationModel extends ApplicationModel {
  public async load(): Promise<void> {
    if (this._model) {
      return;
    }
    const account = await (async () => {
      const response = await fetch('/api/current_user');
      if (response.status !== 200) {
        return User.makeGuest();  
      }
      const responseObject = await response.json();
      return User.fromJson(responseObject.user);
    })();
    const accountProfileImage = await (async () => {
      if (account?.id !== -1) {
        const imageResponse = await fetch(
          `/api/user_profile_image/${account.id}`);
        if (imageResponse.status === 200) {
          const responseObject = await imageResponse.json();
          return UserProfileImage.fromJson(
            responseObject.accountProfileImage);
        }
        return UserProfileImage.default(account.id);
      }
      return UserProfileImage.default();
    })();
    const googleClientIdResponse = await fetch('/api/google_client_id');
    const googleClientIdObject = await googleClientIdResponse.json();
    const googleClientId = googleClientIdObject.google_client_id;
    const homePageModel = new HttpHomePageModel(account);
    const inviteAFoodieModel = new HttpInviteAFoodieModel(account);
    const joinModel = new HttpJoinModel();
    const partnerWithUsModel = new HttpPartnerWithUsModel();
    const logInModel = new HttpLogInModel();
    const deletedAccountSurveyModel = new HttpDeletedAccountSurveyModel();
    const deactivateAccountSurveyModel = new HttpDeactivateAccountSurveyModel();
    const forgotPasswordPageModel = new HttpForgotPasswordPageModel();
    const diningEventPageModelMap = new Map<number, DiningEventPageModel>();
    const profilePageModelMap = new Map<number, ProfilePageModel>();
    const editProfilePageModelMap = new Map<number, EditProfilePageModel>();
    const settingsPageModelMap = new Map<number, SettingsPageModel>();
    const signUpPageModelMap = new Map<number, SignUpPageModel>();
    const emailConfirmationPageModelMap = new Map<string,
      EmailConfirmationPageModel>();
    this._model = new LocalApplicationModel(account, accountProfileImage,
      homePageModel, inviteAFoodieModel, joinModel, partnerWithUsModel,
      logInModel, deletedAccountSurveyModel, deactivateAccountSurveyModel,
      forgotPasswordPageModel, googleClientId, diningEventPageModelMap,
      editProfilePageModelMap, signUpPageModelMap, profilePageModelMap,
      settingsPageModelMap, emailConfirmationPageModelMap);
    await this._model.load();
  }

  public async setAccount(account: User): Promise<void> {
    await this._model.setAccount(account);
    const newAccountImage = await (async () => {
      const response = await fetch(`/api/user_profile_image/${account.id}`);
      if (response.status === 200) {
        const jasonResponse = await response.json();
        return UserProfileImage.fromJson(jasonResponse.accountProfileImage);
      }
      return UserProfileImage.default(account.id);
    })();
    this._model.updateAccountProfileImage(newAccountImage);
    await this._model.updateHomePageModel(new HttpHomePageModel(account));
    console.log('updated homepage model');
    await this._model.updateInviteAFoodieModel(new HttpInviteAFoodieModel(
      account));
  }

  public get account(): User {
    return this._model.account;
  }

  public get accountProfileImage(): UserProfileImage {
    return this._model.accountProfileImage;
  }

  public updateAccountProfileImage(newImage: UserProfileImage): void {
    this._model.updateAccountProfileImage(newImage);
  }

  public get homePageModel(): HomePageModel {
    return this._model.homePageModel;
  }

  public async updateHomePageModel(newModel: HomePageModel): Promise<void> {
    await this._model.updateHomePageModel(newModel);
  }

  public getDiningEventPageModel(id: number): DiningEventPageModel {
    let diningEventPageModel = this._model.getDiningEventPageModel(id);
    if (!diningEventPageModel) {
      diningEventPageModel = new HttpDiningEventPageModel(id);
      this._model.addDiningEventPageModel(id, diningEventPageModel);
    }
    return diningEventPageModel;
  }

  public addDiningEventPageModel(id: number, newModel: DiningEventPageModel):
      void {
    this._model.addDiningEventPageModel(id, newModel);
  }

  public get inviteAFoodieModel(): InviteAFoodieModel {
    return this._model.inviteAFoodieModel;
  }

  public async updateInviteAFoodieModel(newModel: InviteAFoodieModel): Promise<
      void> {
    await this.updateInviteAFoodieModel(newModel);
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

  public addProfilePageModel(id: number, profilePageModel: ProfilePageModel
      ): void {
    this._model.addProfilePageModel(id, profilePageModel);
  }

  public getProfilePageModel(id: number): ProfilePageModel {
    let profilePageModel = this._model.getProfilePageModel(id);
    if (!profilePageModel) {
      profilePageModel = new HttpProfilePageModel(id);
      this._model.addProfilePageModel(id, profilePageModel);
    }
    return profilePageModel;
  }

  public addEditProfilePageModel(id: number,
      editProfilePageModel: EditProfilePageModel): void {
    this._model.addEditProfilePageModel(id, editProfilePageModel);
  }

  public getEditProfilePageModel(id: number): EditProfilePageModel {
    let editProfilePageModel = this._model.getEditProfilePageModel(id);
    if (!editProfilePageModel) {
      editProfilePageModel = new HttpEditProfilePageModel(id);
      this._model.addEditProfilePageModel(id, editProfilePageModel);
    }
    return editProfilePageModel;
  }

  public addSettingsPageModel(id: number,
      settingsPageModel: SettingsPageModel): void {
    this._model.addSettingsPageModel(id, settingsPageModel);
  }

  public getSettingsPageModel(id: number): SettingsPageModel {
    let settingsPageModel = this._model.getSettingsPageModel(id);
    if (!settingsPageModel) {
      settingsPageModel = new HttpSettingsPageModel(id);
      this._model.addSettingsPageModel(id, settingsPageModel);
    }
    return settingsPageModel;
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

  public addSignUpPageModel(id: number, signUpPageModel: SignUpPageModel
      ): void {
    this._model.addSignUpPageModel(id, signUpPageModel);
  }

  public getSignUpPageModel(id: number): SignUpPageModel {
    let signUpPageModel = this._model.getSignUpPageModel(id);
    if (!signUpPageModel) {
      signUpPageModel = new HttpSignUpPageModel(this._model.account,
        this._model.accountProfileImage);
      this.addSignUpPageModel(id, signUpPageModel);
    }
    return signUpPageModel;
  }

  public get googleClientId(): string {
    return this._model.googleClientId;
  }

  public addEmailConfirmationPageModel(id: string,
      emailConfirmationPageModel: EmailConfirmationPageModel): void {
    this._model.addEmailConfirmationPageModel(id, emailConfirmationPageModel);
  }

  public getEmailConfirmationPageModel(tokenId: string):
      EmailConfirmationPageModel {
    let emailConfirmationPageModel = this._model.getEmailConfirmationPageModel(
      tokenId);
    if (!emailConfirmationPageModel) {
      emailConfirmationPageModel = new HttpEmailConfirmationPageModel(tokenId);
      this._model.addEmailConfirmationPageModel(tokenId,
        emailConfirmationPageModel);
    }
    return emailConfirmationPageModel;
  }

  private _model: ApplicationModel;
}
