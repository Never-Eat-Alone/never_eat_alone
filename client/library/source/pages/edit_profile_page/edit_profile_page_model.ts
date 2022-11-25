import { CityProvince, Language } from '../../definitions';

export abstract class EditProfilePageModel {
  public abstract load(): Promise<void>;
  public abstract get coverImageSrc(): string;
  public abstract get profileImageSrc(): string;
  public abstract get displayName(): string;
  public abstract get userName(): string;
  public abstract get profileUserId(): number;
  public abstract get isUpcomingEventsPrivate(): boolean;
  public abstract get isPastEventsPrivate(): boolean;
  public abstract get isLocationPrivate(): boolean;
  public abstract getSuggestedLocationList(value: string): Promise<
    CityProvince[]>;
  public abstract get isLanguagePrivate(): boolean;
  public abstract getSuggestedLanguageList(value: string): Promise<Language[]>;
  public abstract get biographyValue(): string;
  public abstract get isPastEventsPrivate(): boolean;
  public abstract get isPastEventsPrivate(): boolean;
  public abstract get isPastEventsPrivate(): boolean;
  public abstract get isPastEventsPrivate(): boolean;


  public abstract save(): Promise<void>;
}
