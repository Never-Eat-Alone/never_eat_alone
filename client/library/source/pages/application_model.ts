import { User } from '../definitions';
import { HeaderModel } from '../components';
import { InviteAFoodieModel } from '../modals/invite_a_foodie_modal';
import { JoinModel } from '../modals/join_modal';
import { LogInModel } from '../modals/log_in_modal';
import { DiningEventPageModel } from './dining_event_page';
import { HomePageModel } from './home_page';
import { PartnerWithUsModel } from './partner_with_us_page';

export abstract class ApplicationModel {
  public abstract load(): Promise<void>;
  public abstract getHeaderModel(): HeaderModel;
  public abstract getHomePageModel(): HomePageModel;
  public abstract getDiningEventPageModel(id: number): DiningEventPageModel;
  public abstract getInviteAFoodieModel(): InviteAFoodieModel;
  public abstract getJoinModel(): JoinModel;
  public abstract getPartnerWithUsModel(): PartnerWithUsModel;
  public abstract getLogInModel(): LogInModel;
}
