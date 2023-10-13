import { CoverImage, Cuisine, Language, ProfilePageData, UserProfileImage } from
  '../../definitions';

export abstract class EditProfilePageModel {
  public abstract load(): Promise<void>;

  /** Profile page data related to the user. */
  public abstract get profilePageData(): ProfilePageData;

  /** List of all languages user can select from. */
  public abstract get languageList(): Language[];

  /** List of all cuisines user can select from. */
  public abstract get cuisineList(): Cuisine[];

  /** List of cover images user can select from such as template images. */
  public abstract get coverImageList(): CoverImage[];

  public abstract getSuggestedLocationList(value: string): Promise<string[]>;

  public abstract uploadProfileImage(userProfileImageFile: File): Promise<
    UserProfileImage>;
  public abstract updateProfileImage(newImage: UserProfileImage): Promise<void>;
  public abstract saveCoverImage(newImage: CoverImage): Promise<void>;
  public abstract save(profilePageData: ProfilePageData): Promise<void>;
  public abstract update(): Promise<void>;
}
