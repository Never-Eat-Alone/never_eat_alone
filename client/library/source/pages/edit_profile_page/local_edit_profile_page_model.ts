import { CoverImage, Cuisine, Language, ProfilePageData, UserProfileImage } from
  '../../definitions';
import { EditProfilePageModel } from './edit_profile_page_model';

export class LocalEditProfilePageModel extends EditProfilePageModel {
  constructor(profilePageData: ProfilePageData, coverImageList: CoverImage[],
      languageList: Language[], cuisineList: Cuisine[]) {
    super();
    this._isLoaded = false;
    this._profilePageData = profilePageData;
    this._coverImageList = coverImageList;
    this._languageList = languageList;
    this._cuisineList = cuisineList;
    this._suggestedLocationList = new Map();
  }

  public async load(): Promise<void> {
    this._isLoaded = true;
  }

  public get profilePageData(): ProfilePageData {
    this.ensureIsLoaded();
    return this._profilePageData;
  }

  public get coverImageList(): CoverImage[] {
    this.ensureIsLoaded();
    return this._coverImageList;
  }

  public get languageList(): Language[] {
    this.ensureIsLoaded();
    return this._languageList;
  }

  public get cuisineList(): Cuisine[] {
    this.ensureIsLoaded();
    return this._cuisineList;
  }

  public addSuggestedLocationList(value: string, locationList: string[]
      ): void {
    this.ensureIsLoaded();
    this._suggestedLocationList.set(value, locationList);
  }

  public async getSuggestedLocationList(value: string): Promise<
      string[]> {
    this.ensureIsLoaded();
    return this._suggestedLocationList.get(value);
  }

  public async uploadProfileImage(userProfileImageFile: File): Promise<
      UserProfileImage> {
    this.ensureIsLoaded();
    return this._profilePageData.profileImage;
  }

  public async updateProfileImage(newImage: UserProfileImage): Promise<void> {
    this.ensureIsLoaded();
    this._profilePageData.updateProfileImage(newImage);
  }

  public async saveCoverImage(newImage: CoverImage): Promise<void> {
    this.ensureIsLoaded();
    this._coverImageList.push(newImage);
    this._profilePageData.updateCoverImage(newImage);
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
  private _coverImageList: CoverImage[];
  private _languageList: Language[];
  private _cuisineList: Cuisine[];
  private _suggestedLocationList: Map<string, string[]>;
}
