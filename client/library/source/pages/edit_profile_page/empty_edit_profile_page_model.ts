import { CoverImage, Cuisine, Language, UserProfileImage } from
  '../../definitions';
import { EditProfilePageModel } from './edit_profile_page_model';

/**
 * Implements a EditProfilePageModel that always fails. Can be used as the
 * initial state of a model prior to being loaded.
 */
export class EmptyEditProfilePageModel extends EditProfilePageModel {
  public async load(): Promise<void> {
    throw new Error('Unable to load empty model.');
  }

  public get languageList(): Language[] {
    throw new Error('Unable to load empty model.');
  }

  public get cuisineList(): Cuisine[] {
    throw new Error('Unable to load empty model.');
  }

  public get coverImage(): CoverImage {
    throw new Error('Unable to load empty model.');
  }

  public get coverImageList(): CoverImage[] {
    throw new Error('Unable to load empty model.');
  }

  public get profileImage(): UserProfileImage {
    throw new Error('Unable to load empty model.');
  }

  public get selectedLocation(): string {
    throw new Error('Unable to load empty model.');
  }

  public get isUpcomingEventsPrivate(): boolean {
    throw new Error('Unable to load empty model.');
  }

  public get isPastEventsPrivate(): boolean {
    throw new Error('Unable to load empty model.');
  }

  public get isLocationPrivate(): boolean {
    throw new Error('Unable to load empty model.');
  }

  public async getSuggestedLocationList(value: string): Promise<string[]> {
    throw new Error('Unable to getSuggestedLocationList empty model.');
  }

  public get isLanguagePrivate(): boolean {
    throw new Error('Unable to load empty model.');
  }

  public get biographyValue(): string {
    throw new Error('Unable to load empty model.');
  }

  public get isBiographyPrivate(): boolean {
    throw new Error('Unable to load empty model.');
  }

  public get selectedLanguageList(): Language[] {
    throw new Error('Unable to load empty model.');
  }

  public get selectedCuisineList(): Cuisine[] {
    throw new Error('Unable to load empty model.');
  }

  public get isCuisinePrivate(): boolean {
    throw new Error('Unable to load empty model.');
  }

  public get isFacebookPrivate(): boolean {
    throw new Error('Unable to load empty model.');
  }

  public get isTwitterPrivate(): boolean {
    throw new Error('Unable to load empty model.');
  }

  public get isInstagramPrivate(): boolean {
    throw new Error('Unable to load empty model.');
  }

  public get facebookLink(): string {
    throw new Error('Unable to load empty model.');
  }

  public get twitterLink(): string {
    throw new Error('Unable to load empty model.');
  }

  public get instagramLink(): string {
    throw new Error('Unable to load empty model.');
  }

  public async uploadProfileImage(newImage: UserProfileImage): Promise<
      UserProfileImage> {
    throw new Error('Unable to uploadProfileImage empty model.');
  }

  public async saveCoverImage(newImage: CoverImage): Promise<void> {
    throw new Error('Unable to saveCoverImage empty model.');
  }

  public async save(coverImage: CoverImage, profileImage: UserProfileImage,
      isUpcomingEventsPrivate: boolean, isPastEventsPrivate: boolean,
      isLocationPrivate: boolean, selectedLocation: string, isLanguagePrivate:
      boolean, selectedLanguageList: Language[], isBiographyPrivate: boolean,
      biographyValue: string, isFacebookPrivate: boolean, facebookLink: string,
      isTwitterPrivate: boolean, twitterLink: string, isInstagramPrivate:
      boolean, instagramLink: string, isCuisinePrivate: boolean,
      selectedCuisineList: Cuisine[]): Promise<boolean> {
    throw new Error('Unable to save empty model.');
  }
}
