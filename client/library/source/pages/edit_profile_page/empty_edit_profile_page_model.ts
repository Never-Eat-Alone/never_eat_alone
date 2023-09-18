import { CoverImage, Cuisine, Language, ProfilePageData, UserProfileImage } from
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

  public get profilePageData(): ProfilePageData {
    throw new Error('Unable to load empty model.');
  }

  public get languageList(): Language[] {
    throw new Error('Unable to load empty model.');
  }

  public get cuisineList(): Cuisine[] {
    throw new Error('Unable to load empty model.');
  }

  public get coverImageList(): CoverImage[] {
    throw new Error('Unable to load empty model.');
  }

  public async getSuggestedLocationList(value: string): Promise<string[]> {
    throw new Error('Unable to getSuggestedLocationList empty model.');
  }

  public async uploadProfileImage(userProfileImageFile: File): Promise<
      UserProfileImage> {
    throw new Error('Unable to uploadProfileImage empty model.');
  }

  public async updateProfileImage(newImage: UserProfileImage): Promise<void> {
    throw new Error('Unable to uploadProfileImage empty model.');
  }

  public async saveCoverImage(newImage: CoverImage): Promise<void> {
    throw new Error('Unable to saveCoverImage empty model.');
  }

  public async save(profilePageData: ProfilePageData): Promise<void> {
    throw new Error('Unable to save empty model.');
  }
}
