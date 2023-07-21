import { CoverImage, Cuisine, EventCardSummary, Language } from
  '../../definitions';
import { ProfilePageModel } from './profile_page_model';

export class LocalProfilePageModel extends ProfilePageModel {
  constructor(profileId: number, coverImage: CoverImage, profileImageSrc:
      string, name: string, userName: string, createdAt: Date, biography:
      string, address: string, languageList: Language[], facebookLink:
      string, twitterLink: string, instagramLink: string, favoriteCuisineList:
      Cuisine[], upcomingEventList: EventCardSummary[], pastEventList:
      EventCardSummary[]) {
    super();
    this._isLoaded = false;
    this._profileId = profileId;
    this._coverImage = coverImage;
    this._profileImageSrc = profileImageSrc;
    this._name = name;
    this._userName = userName;
    this._createdAt = createdAt;
    this._biography = biography;
    this._address = address;
    this._languageList = languageList;
    this._facebookLink = facebookLink;
    this._twitterLink = twitterLink;
    this._instagramLink = instagramLink;
    this._favoriteCuisineList = favoriteCuisineList;
    this._upcomingEventList = upcomingEventList;
    this._pastEventList = pastEventList;
  }

  public async load(): Promise<void> {
    this._isLoaded = true;
  }

  public get profileId(): number {
    this.ensureIsLoaded();
    return this._profileId;
  }

  public get coverImage(): CoverImage {
    this.ensureIsLoaded();
    return this._coverImage;
  }

  public get profileImageSrc(): string {
    this.ensureIsLoaded();
    return this._profileImageSrc;
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

  public get biography(): string {
    this.ensureIsLoaded();
    return this._biography;
  }

  public get address(): string {
    this.ensureIsLoaded();
    return this._address;
  }

  public get languageList(): Language[] {
    this.ensureIsLoaded();
    return this._languageList;
  }

  public get facebookLink(): string {
    this.ensureIsLoaded();
    return this._facebookLink;
  }

  public get twitterLink(): string {
    this.ensureIsLoaded();
    return this._twitterLink;
  }

  public get instagramLink(): string {
    this.ensureIsLoaded();
    return this._instagramLink;
  }

  public get favoriteCuisineList(): Cuisine[] {
    this.ensureIsLoaded();
    return this._favoriteCuisineList;
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
    this.ensureIsLoaded();
  }

  private ensureIsLoaded(): void {
    if (!this._isLoaded) {
      throw new Error('EditProfilePageModel not loaded.');
    }
  }

  private _isLoaded: boolean;
  private _profileId: number;
  private _coverImage: CoverImage;
  private _profileImageSrc: string;
  private _name: string;
  private _userName: string;
  private _createdAt: Date;
  private _biography: string;
  private _address: string;
  private _languageList: Language[];
  private _facebookLink: string;
  private _twitterLink: string;
  private _instagramLink: string;
  private _favoriteCuisineList: Cuisine[];
  private _upcomingEventList: EventCardSummary[];
  private _pastEventList: EventCardSummary[];
}
