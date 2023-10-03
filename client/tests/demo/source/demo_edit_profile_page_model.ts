import * as NeverEatAlone from 'never_eat_alone';

export class DemoEditProfilePageModel extends
    NeverEatAlone.EditProfilePageModel {
  constructor(profilePageData: NeverEatAlone.ProfilePageData, coverImageList:
      NeverEatAlone.CoverImage[], languageList: NeverEatAlone.Language[],
      cuisineList: NeverEatAlone.Cuisine[]) {
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

  public get profilePageData(): NeverEatAlone.ProfilePageData {
    this.ensureIsLoaded();
    return this._profilePageData;
  }

  public get coverImageList(): NeverEatAlone.CoverImage[] {
    this.ensureIsLoaded();
    return this._coverImageList;
  }

  public get languageList(): NeverEatAlone.Language[] {
    this.ensureIsLoaded();
    return this._languageList;
  }

  public get cuisineList(): NeverEatAlone.Cuisine[] {
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

  public async uploadProfileImage(userProfileImageFile: File):
      Promise<NeverEatAlone.UserProfileImage> {
    this.ensureIsLoaded();
    return this._profilePageData.profileImage;
  }

  public async updateProfileImage(newImage: NeverEatAlone.UserProfileImage):
      Promise<void> {
    this.ensureIsLoaded();
    this._profilePageData.updateProfileImage(newImage);
  }

  public async saveCoverImage(newImage: NeverEatAlone.CoverImage): Promise<
      void> {
    this.ensureIsLoaded();
    this._coverImageList.push(newImage);
    this._profilePageData.updateCoverImage(newImage);
  }

  public async save(newProfilePageData: NeverEatAlone.ProfilePageData): Promise<
      void> {
    this.ensureIsLoaded();
    this._profilePageData = newProfilePageData;
  }

  private ensureIsLoaded(): void {
    if (!this._isLoaded) {
      throw new Error('EditProfilePageModel not loaded.');
    }
  }

  private _isLoaded: boolean;
  private _profilePageData: NeverEatAlone.ProfilePageData;
  private _coverImageList: NeverEatAlone.CoverImage[];
  private _languageList: NeverEatAlone.Language[];
  private _cuisineList: NeverEatAlone.Cuisine[];
  private _suggestedLocationList: Map<string, string[]>;
}
