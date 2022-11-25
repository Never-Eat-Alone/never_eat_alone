import { HeaderModel } from '../components';
import { InviteAFoodieModel } from '../modals/invite_a_foodie_modal';
import { JoinModel } from '../modals/join_modal';
import { LogInModel } from '../modals/log_in_modal';
import { DiningEventPageModel } from './dining_event_page';
import { HomePageModel } from './home_page';
import { PartnerWithUsModel } from './partner_with_us_page';
import { ProfilePageModel } from './profile_page';

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
}
