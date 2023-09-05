import { CoverImage, ProfilePageData, UserProfileImage } from
  '../../definitions';
import { EditProfilePageModel } from './edit_profile_page_model';

export class LocalEditProfilePageModel extends EditProfilePageModel {
  constructor(profilePageData: ProfilePageData) {
    super();
    this._isLoaded = false;
    this._profilePageData = profilePageData;
    this._suggestedLocationList = new Map();
  }

  public async load(): Promise<void> {
    this._isLoaded = true;
  }

  public get profilePageData(): ProfilePageData {
    return this._profilePageData;
  }

  public addSuggestedLocationList(value: string, locationList: string[]
      ): void {
    this._suggestedLocationList.set(value, locationList);
  }

  public async getSuggestedLocationList(value: string): Promise<
      string[]> {
    return this._suggestedLocationList.get(value);
  }

  

  public async uploadProfileImage(newImage: UserProfileImage): Promise<
      UserProfileImage> {
    this.ensureIsLoaded();
    this._profilePageData.updateProfileImage(newImage);
    return newImage;
  }

  public async saveCoverImage(newImage: CoverImage): Promise<void> {
    this.ensureIsLoaded();
    this._coverImageList.push(newImage);
    this._coverImage = newImage;
  }

  public async save(newProfilePageData: ProfilePageData): Promise<void> {
    this.ensureIsLoaded();
    this._profilePageData = newProfilePageData;
  }

  private ensureIsLoaded(): void {
    if (!this._isLoaded) {
      throw new Error('EditProfilePageModel not loaded.');
    }
  }

  private _isLoaded: boolean;
  private _profilePageData: ProfilePageData;
  private _suggestedLocationList: Map<string, string[]>;
}
