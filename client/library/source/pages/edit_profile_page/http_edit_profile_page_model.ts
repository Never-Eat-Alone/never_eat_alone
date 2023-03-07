import { CityProvince, CoverImage, Cuisine, Language, UserProfileImage
} from '../../definitions';
import { EditProfilePageModel } from './edit_profile_page_model';
import { LocalEditProfilePageModel } from './local_edit_profile_page_model';

export class HttpEditProfilePageModel extends EditProfilePageModel {
  constructor(profileId: number) {
    super();
    this._profileId = profileId;
  }

  public async load(): Promise<void> {
    const response = await fetch(`/api/edit_profile_page/${this._profileId}`);
    if (response.status !== 200) {
      return;
    }
    const responseObject = await response.json();
    const locationList: CityProvince[] = [];
    for (const location of responseObject.locationList) {
      locationList.push(CityProvince.fromJson(location));
    }
    const languageList: Language[] = [];
    for (const language of responseObject.languageList) {
      languageList.push(Language.fromJson(language));
    }
    const cuisineList: Cuisine[] = [];
    for (const cuisine of responseObject.cuisineList) {
      cuisineList.push(Cuisine.fromJson(cuisine));
    }
    const coverImage = CoverImage.fromJson(responseObject.coverImage);
    const coverImageList: CoverImage[] = [];
    for (const cover of responseObject.coverImageList) {
      coverImageList.push(CoverImage.fromJson(cover));
    }
    const profileImage = UserProfileImage.fromJson(responseObject.profileImage);
    const displayName = responseObject.displayName;
    const userName = responseObject.userName;
    const selectedLocation = CityProvince.fromJson(
      responseObject.selectedLocation);
    const isUpcomingEventsPrivate = responseObject.isUpcomingEventsPrivate;
    const isPastEventsPrivate = responseObject.isPastEventsPrivate;
    const isLocationPrivate = responseObject.isLocationPrivate;
    const isLanguagePrivate = responseObject.isLanguagePrivate;
    const biographyValue = responseObject.biographyValue;
    const isBiographyPrivate = responseObject.isBiographyPrivate;
    const selectedLanguageList: Language[] = [];
    for (const language of responseObject.selectedLanguageList) {
      selectedLanguageList.push(Language.fromJson(language));
    }
    const selectedCuisineList: Cuisine[] = [];
    for (const cuisine of responseObject.selectedCuisineList) {
      selectedCuisineList.push(Cuisine.fromJson(cuisine));
    }
    const isCuisinePrivate = responseObject.isCuisinePrivate;
    const isFacebookPrivate = responseObject.isFacebookPrivate;
    const isTwitterPrivate = responseObject.isTwitterPrivate;
    const isInstagramPrivate = responseObject.isInstagramPrivate;
    const facebookLink = responseObject.facebookLink;
    const twitterLink = responseObject.twitterLink;
    const instagramLink = responseObject.instagramLink;
    this._model = new LocalEditProfilePageModel(locationList, languageList,
      cuisineList, coverImage, coverImageList, profileImage, displayName,
      userName, selectedLocation, this._profileId, isUpcomingEventsPrivate,
      isPastEventsPrivate, isLocationPrivate, isLanguagePrivate, biographyValue,
      isBiographyPrivate, selectedLanguageList, selectedCuisineList,
      isCuisinePrivate, isFacebookPrivate, isTwitterPrivate, isInstagramPrivate,
      facebookLink, twitterLink, instagramLink);
    this._model.load();
  }

  public get locationList(): CityProvince[] {
    return this._model.locationList;
  }

  public get languageList(): Language[] {
    return this._model.languageList;
  }

  public get cuisineList(): Cuisine[] {
    return this._model.cuisineList;
  }

  public get coverImage(): CoverImage {
    return this._model.coverImage;
  }

  public get coverImageList(): CoverImage[] {
    return this._model.coverImageList;
  }

  public get profileImage(): UserProfileImage {
    return this._model.profileImage;
  }

  public get displayName(): string {
    return this._model.displayName;
  }

  public get userName(): string {
    return this._model.userName;
  }

  public get selectedLocation(): CityProvince {
    return this._model.selectedLocation;
  }

  public get profileId(): number {
    return this._model.profileId;
  }

  public get isUpcomingEventsPrivate(): boolean {
    return this._model.isUpcomingEventsPrivate;
  }

  public get isPastEventsPrivate(): boolean {
    return this._model.isPastEventsPrivate;
  }

  public get isLocationPrivate(): boolean {
    return this._model.isLocationPrivate;
  }

  public async getSuggestedLocationList(value: string): Promise<
      CityProvince[]> {
    const response = await fetch(`/api/suggested_location_list/${value}`);
    if (response.status !== 200) {
      return [];
    }
    const responseObject = await response.json();
    const suggestedLocationList: CityProvince[] = [];
    for (const location of responseObject.suggestedLocationList) {
      suggestedLocationList.push(CityProvince.fromJson(location));
    }
    return suggestedLocationList;
  }

  public get isLanguagePrivate(): boolean {
    return this._model.isLanguagePrivate;
  }

  public async getSuggestedLanguageList(value: string): Promise<Language[]> {
    const response = await fetch(`/api/suggested_language_list/${value}`);
    if (response.status !== 200) {
      return [];
    }
    const responseObject = await response.json();
    const suggestedLanguageList: Language[] = [];
    for (const language of responseObject.languageList) {
      suggestedLanguageList.push(Language.fromJson(language));
    }
    return suggestedLanguageList;
  }

  public async getSuggestedCuisineList(value: string): Promise<Cuisine[]> {
    const response = await fetch(`/api/suggested_cuisine_list/${value}`);
    if (response.status !== 200) {
      return [];
    }
    const responseObject = await response.json();
    const suggestedCuisineList: Cuisine[] = [];
    for (const cuisine of responseObject.cuisineList) {
      suggestedCuisineList.push(Cuisine.fromJson(cuisine));
    }
    return suggestedCuisineList;
  }

  public get biographyValue(): string {
    return this._model.biographyValue;
  }

  public get isBiographyPrivate(): boolean {
    return this._model.isBiographyPrivate;
  }

  public get selectedLanguageList(): Language[] {
    return this._model.selectedLanguageList;
  }

  public get selectedCuisineList(): Cuisine[] {
    return this._model.selectedCuisineList;
  }

  public get isCuisinePrivate(): boolean {
    return this._model.isCuisinePrivate;
  }

  public get isFacebookPrivate(): boolean {
    return this._model.isFacebookPrivate;
  }

  public get isTwitterPrivate(): boolean {
    return this._model.isTwitterPrivate;
  }

  public get isInstagramPrivate(): boolean {
    return this._model.isInstagramPrivate;
  }

  public get facebookLink(): string {
    return this._model.facebookLink;
  }

  public get twitterLink(): string {
    return this._model.twitterLink;
  }

  public get instagramLink(): string {
    return this._model.instagramLink;
  }

  public async uploadProfileImage(newImage: UserProfileImage): Promise<
      UserProfileImage> {
    const response = await fetch('/api/upload_profile_image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'image': newImage.toJson(),
      })
    });
    if (response.status !== 201) {
      return UserProfileImage.NoImage();
    }
    const responseObject = await response.json();
    return UserProfileImage.fromJson(responseObject.profileImage);
  }

  public async saveCoverImage(newImage: CoverImage): Promise<CoverImage> {
    const response = await fetch('/api/save_cover_image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'image': newImage.toJson(),
      })
    });
    if (response.status !== 201 && response.status !== 200) {
      return CoverImage.NoImage();
    }
    const responseObject = await response.json();
    return CoverImage.fromJson(responseObject.coverImage);
  }

  public async save(coverImage: CoverImage, profileImage: UserProfileImage,
      isUpcomingEventsPrivate: boolean, isPastEventsPrivate: boolean,
      isLocationPrivate: boolean, isLanguagePrivate: boolean,
      biographyValue: string, isBiographyPrivate: boolean,
      selectedLanguageList: Language[], selectedCuisineList: Cuisine[],
      isCuisinePrivate: boolean, isFacebookPrivate: boolean,
      isTwitterPrivate: boolean, isInstagramPrivate: boolean,
      facebookLink: string, twitterLink: string, instagramLink: string
      ): Promise<boolean> {
    const response = await fetch(`/api/edit_profile_page/${this._profileId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'coverImage': coverImage,
        'profileImage': profileImage,
        'isUpcomingEventsPrivate': isUpcomingEventsPrivate,
        'isPastEventsPrivate': isPastEventsPrivate,
        'isLocationPrivate': isLocationPrivate,
        'isLanguagePrivate': isLanguagePrivate,
        'biographyValue': biographyValue,
        'isBiographyPrivate': isBiographyPrivate,
        'selectedLanguageList': selectedLanguageList,
        'selectedCuisineList': selectedCuisineList,
        'isCuisinePrivate': isCuisinePrivate,
        'isFacebookPrivate': isFacebookPrivate,
        'isTwitterPrivate': isTwitterPrivate,
        'isInstagramPrivate': isInstagramPrivate,
        'facebookLink': facebookLink,
        'twitterLink': twitterLink,
        'instagramLink': instagramLink
      })
    });
    if (!response.ok) {
      return false;
    }
    return true;
  }

  private _model: EditProfilePageModel;
  private _profileId: number;
}
