import { User, UserProfileImage } from '../definitions';
import { InviteAFoodieModel } from '../modals';
import { JoinModel } from '../modals/join_modal';
import { LogInModel } from '../modals/log_in_modal';
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

export abstract class ApplicationModel {
  public abstract load(): Promise<void>;
  public abstract setAccount(account: User): Promise<void>;
  public abstract get account(): User;
  public abstract get accountProfileImage(): UserProfileImage;
  public abstract updateAccountProfileImage(newImage: UserProfileImage): void;
  public abstract get homePageModel(): HomePageModel;
  public abstract get diningEventPageModel(): DiningEventPageModel;
  public abstract get inviteAFoodieModel(): InviteAFoodieModel;
  public abstract get joinModel(): JoinModel;
  public abstract get partnerWithUsModel(): PartnerWithUsModel;
  public abstract get logInModel(): LogInModel;
  public abstract addProfilePageModel(id: number,
    profilePageModel: ProfilePageModel): void;
  public abstract getProfilePageModel(id: number): ProfilePageModel;
  public abstract addEditProfilePageModel(id: number,
    editProfilePageModel: EditProfilePageModel): void;
  public abstract getEditProfilePageModel(id: number): EditProfilePageModel;
  public abstract addSettingsPageModel(id: number,
    settingsPageModel: SettingsPageModel): void;
  public abstract getSettingsPageModel(id: number): SettingsPageModel;
  public abstract get deletedAccountSurveyModel(): DeletedAccountSurveyModel;
  public abstract get deactivateAccountSurveyModel():
    DeactivateAccountSurveyModel;
  public abstract get forgotPasswordPageModel(): ForgotPasswordPageModel;
  public abstract addSignUpPageModel(id: number,
    signUpPageModel: SignUpPageModel): void;
  public abstract getSignUpPageModel(id: number): SignUpPageModel;
  public abstract get googleClientId(): string;
  public abstract addEmailConfirmationPageModel(id: string,
    emailConfirmationPageModel: EmailConfirmationPageModel): void;
  public abstract getEmailConfirmationPageModel(id: string):
    EmailConfirmationPageModel;
}
