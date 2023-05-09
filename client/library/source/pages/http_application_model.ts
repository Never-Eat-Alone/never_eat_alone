import { HeaderModel, HttpHeaderModel } from '../components';
import { User } from '../definitions';
import { HttpInviteAFoodieModel, InviteAFoodieModel
} from '../modals/invite_a_foodie_modal';
import { HttpJoinModel, JoinModel } from '../modals/join_modal';
import { HttpLogInModel, LogInModel } from '../modals/log_in_modal';
import { ApplicationModel } from './application_model';
import { DeactivateAccountSurveyModel, HttpDeactivateAccountSurveyModel
} from './deactivate_account_survey_page';
import { DeletedAccountSurveyModel, HttpDeletedAccountSurveyModel
} from './deleted_account_survey_page';
import { DiningEventPageModel, HttpDiningEventPageModel
} from './dining_event_page';
import { EditProfilePageModel, HttpEditProfilePageModel
} from './edit_profile_page';
import { EmailConfirmationPageModel, HttpEmailConfirmationPageModel
} from './email_confirmation_page';
import { ForgotPasswordPageModel, HttpForgotPasswordPageModel
} from './forgot_password_page';
import { HomePageModel, HttpHomePageModel } from './home_page';
import { LocalApplicationModel } from './local_application_model';
import { HttpPartnerWithUsModel, PartnerWithUsModel
} from './partner_with_us_page';
import { ProfilePageModel, HttpProfilePageModel } from './profile_page';
import { HttpSettingsPageModel, SettingsPageModel } from './settings_page';
import { HttpSignUpPageModel, SignUpPageModel } from './sign_up_page';

export class HttpApplicationModel extends ApplicationModel {
  public async load(): Promise<void> {
    const response = await fetch('/api/current_user');
    let account = User.makeGuest();
    if (response.status === 200) {
      const responseObject = await response.json();
      account = User.fromJson(responseObject.user);
    }
    this._account = account;
    console.log('acount', account, this._account, account.id);
    const googleClientIdResponse = await fetch('/api/google_client_id');
    const googleClientIdObject = await googleClientIdResponse.json();
    const googleClientId = googleClientIdObject.google_client_id;
    const headerModel = new HttpHeaderModel(account);
    const homePageModel = new HttpHomePageModel(account);
    const inviteAFoodieModel = new HttpInviteAFoodieModel(account);
    const joinModel = new HttpJoinModel();
    const partnerWithUsModel = new HttpPartnerWithUsModel();
    const logInModel = new HttpLogInModel();
    const deletedAccountSurveyModel = new HttpDeletedAccountSurveyModel();
    const deactivateAccountSurveyModel = new HttpDeactivateAccountSurveyModel();
    const forgotPasswordPageModel = new HttpForgotPasswordPageModel();
    this._model = new LocalApplicationModel(headerModel, homePageModel,
      inviteAFoodieModel, joinModel, partnerWithUsModel, logInModel,
      deletedAccountSurveyModel, deactivateAccountSurveyModel,
      forgotPasswordPageModel, googleClientId);
    await this._model.load();
  }

  public get headerModel(): HeaderModel {
    return this._model.headerModel;
  }

  public get homePageModel(): HomePageModel {
    return this._model.homePageModel;
  }

  public addDiningEventPageModel(id: number,
      diningEventPageModel: DiningEventPageModel): void {
    this._model.addDiningEventPageModel(id, diningEventPageModel);
  }

  public getDiningEventPageModel(id: number): DiningEventPageModel {
    let diningEventPageModel = this._model.getDiningEventPageModel(id);
    if (!diningEventPageModel) {
      diningEventPageModel = new HttpDiningEventPageModel(id);
      this._model.addDiningEventPageModel(id, diningEventPageModel);
    }
    return diningEventPageModel;
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
      signUpPageModel = new HttpSignUpPageModel(this._account);
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

  public getEmailConfirmationPageModel(tokenId: string
      ): EmailConfirmationPageModel {
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
  private _account: User;
}
