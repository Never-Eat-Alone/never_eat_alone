import { ProfilePageModel } from './profile_page_model';
import { EventCardSummary, CoverImage, Cuisine, CityProvince
} from '../../definitions';

export class LocalProfilePageModel extends ProfilePageModel {
  constructor(profileId: number, coverImage: CoverImage, profileImageSrc:
      string, name: string, userName: string, createdAt: Date, biography:
      string, location: CityProvince, languageList: string[], facebookLink:
      string, twitterLink: string, instagramLink: string, favoriteCuisineList:
      Cuisine[], upcomingEventList: EventCardSummary[], pastEventList:
      EventCardSummary[]) {
    super();
    this._profileId = profileId;
    this._coverImage = coverImage;
    this._profileImageSrc = profileImageSrc;
    this._name = name;
    this._userName = userName;
    this._createdAt = createdAt;
    this._biography = biography;
    this._location = location;
    this._languageList = languageList;
    this._facebookLink = facebookLink;
    this._twitterLink = twitterLink;
    this._instagramLink = instagramLink;
    this._favoriteCuisineList = favoriteCuisineList;
    this._upcomingEventList = upcomingEventList;
    this._pastEventList = pastEventList;
  }

  public async load(): Promise<void> {
    return;
  }

  public get profileId(): number {
    return this._profileId;
  }

  public get coverImage(): CoverImage {
    return this._coverImage;
  }

  public get profileImageSrc(): string {
    return this._profileImageSrc;
  }

  public get name(): string {
    return this._name;
  }

  public get userName(): string {
    return this._userName;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get biography(): string {
    return this._biography;
  }

  public get location(): CityProvince {
    return this._location;
  }

  public get languageList(): string[] {
    return this._languageList;
  }

  public get facebookLink(): string {
    return this._facebookLink;
  }

  public get twitterLink(): string {
    return this._twitterLink;
  }

  public get instagramLink(): string {
    return this._instagramLink;
  }

  public get favoriteCuisineList(): Cuisine[] {
    return this._favoriteCuisineList;
  }

  public get upcomingEventList(): EventCardSummary[] {
    return this._upcomingEventList;
  }

  public get pastEventList(): EventCardSummary[] {
    return this._pastEventList;
  }

  private _profileId: number;
  private _coverImage: CoverImage;
  private _profileImageSrc: string;
  private _name: string;
  private _userName: string;
  private _createdAt: Date;
  private _biography: string;
  private _location: CityProvince;
  private _languageList: string[];
  private _facebookLink: string;
  private _twitterLink: string;
  private _instagramLink: string;
  private _favoriteCuisineList: Cuisine[];
  private _upcomingEventList: EventCardSummary[];
  private _pastEventList: EventCardSummary[];
}
