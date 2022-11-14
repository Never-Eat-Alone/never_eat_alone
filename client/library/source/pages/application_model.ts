import { User } from '../definitions';
import { HeaderModel } from '../components';
import { InviteAFoodieModel } from '../modals/invite_a_foodie_modal';
import { DiningEventPageModel } from './dining_event_page';
import { HomePageModel } from './home_page';

export abstract class ApplicationModel {
  public abstract load(): Promise<void>;
  public abstract getAccount(): User;
  public abstract getHeaderModel(): HeaderModel;
  public abstract getHomePageModel(): HomePageModel;
  public abstract getDiningEventPageModel(id: number): DiningEventPageModel;
  public abstract getInviteAFoodieModel(): InviteAFoodieModel;
}
