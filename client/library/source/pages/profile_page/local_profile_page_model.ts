import { EventCardSummary, ProfilePageData } from '../../definitions';
import { ProfilePageModel } from './profile_page_model';

export class LocalProfilePageModel extends ProfilePageModel {
  constructor(profilePageData: ProfilePageData, name: string, userName: string,
      createdAt: Date, upcomingEventList: EventCardSummary[], pastEventList:
      EventCardSummary[]) {
    super();
    this._isLoaded = false;
    this._profilePageData = profilePageData;
    this._name = name;
    this._userName = userName;
    this._createdAt = createdAt;
    this._upcomingEventList = upcomingEventList;
    this._pastEventList = pastEventList;
  }

  public async load(): Promise<void> {
    this._isLoaded = true;
  }

  public get profilePageData(): ProfilePageData {
    this.ensureIsLoaded();
    return this._profilePageData;
  }

  public get name(): string {
    this.ensureIsLoaded();
    return this._name;
  }

  public get userName(): string {
    this.ensureIsLoaded();
    return this._userName;
  }

  public get createdAt(): Date {
    this.ensureIsLoaded();
    return this._createdAt;
  }

  public get upcomingEventList(): EventCardSummary[] {
    this.ensureIsLoaded();
    return this._upcomingEventList;
  }

  public get pastEventList(): EventCardSummary[] {
    this.ensureIsLoaded();
    return this._pastEventList;
  }

  public async updateUpcomingEventList(): Promise<void> {
    this._isLoaded = true;
  }

  private ensureIsLoaded(): void {
    if (!this._isLoaded) {
      throw new Error('EditProfilePageModel not loaded.');
    }
  }

  private _isLoaded: boolean;
  private _profilePageData: ProfilePageData;
  private _name: string;
  private _userName: string;
  private _createdAt: Date;
  private _upcomingEventList: EventCardSummary[];
  private _pastEventList: EventCardSummary[];
}
