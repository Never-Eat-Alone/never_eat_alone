import * as React from 'react';
import * as Router from 'react-router-dom';
import { CoverImage, Cuisine, DisplayMode, Language, User, UserProfileImage
} from '../../definitions';
import { EditProfilePage } from './edit_profile_page';
import { EditProfilePageModel } from './edit_profile_page_model';

interface Properties {
  displayMode: DisplayMode;
  account: User;
  model: EditProfilePageModel;
}

interface State {
  isLoaded: boolean;
  hasError: boolean;
  redirect: string;
  coverImage: CoverImage;
  profileImage: UserProfileImage;
  locationValue: string;
  selectedLocation: string;
  suggestedLocationList: string[];
  isLocationPrivate: boolean;
  biographyValue: string;
  isUpcomingEventsPrivate: boolean;
  isPastEventsPrivate: boolean;
  languageValue: string;
  selectedLanguageList: Language[];
  suggestedLanguageList: Language[];
  isLanguagePrivate: boolean;
  isBiographyPrivate: boolean;
  cuisineValue: string;
  suggestedCuisineList: Cuisine[];
  selectedCuisineList: Cuisine[];
  isCuisinePrivate: boolean;
  isFacebookPrivate: boolean;
  isTwitterPrivate: boolean;
  isInstagramPrivate: boolean;
  facebookLink: string;
  twitterLink: string;
  instagramLink: string;
  facebookInputIsValid: boolean;
  twitterInputIsValid: boolean;
  instagramInputIsValid: boolean;
}

export class EditProfilePageController extends React.Component<Properties,
    State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isLoaded: false,
      hasError: false,
      redirect: null,
      coverImage: CoverImage.default(),
      profileImage: null,
      locationValue: '',
      suggestedLocationList: [],
      selectedLocation: '',
      isLocationPrivate: false,
      languageValue: '',
      selectedLanguageList: [],
      suggestedLanguageList: [],
      isLanguagePrivate: false,
      biographyValue: '',
      isUpcomingEventsPrivate: false,
      isPastEventsPrivate: false,
      isBiographyPrivate: false,
      cuisineValue: '',
      suggestedCuisineList: [],
      selectedCuisineList: [],
      isCuisinePrivate: false,
      isFacebookPrivate: false,
      isTwitterPrivate: false,
      isInstagramPrivate: false,
      facebookLink: '',
      twitterLink: '',
      instagramLink: '',
      facebookInputIsValid: true,
      twitterInputIsValid: true,
      instagramInputIsValid: true
    };
  }

  public render(): JSX.Element {
    if (this.state.redirect) {
      return <Router.Redirect to={this.state.redirect} />;
    }
    if (!this.state.isLoaded || this.state.hasError) {
      return <div />;
    }
    return <EditProfilePage
      displayMode={this.props.displayMode}
      displayName={this.props.model.displayName}
      userName={this.props.model.userName}
      profileId={this.props.model.profileId}
      coverImage={this.state.coverImage}
      coverImageList={this.props.model.coverImageList}
      profileImage={this.state.profileImage}
      isUpcomingEventsPrivate={this.state.isUpcomingEventsPrivate}
      isPastEventsPrivate={this.state.isPastEventsPrivate}
      isLocationPrivate={this.state.isLocationPrivate}
      locationValue={this.state.locationValue}
      suggestedLocationList={this.state.suggestedLocationList}
      isLanguagePrivate={this.state.isLanguagePrivate}
      languageValue={this.state.languageValue}
      suggestedLanguageList={this.state.suggestedLanguageList}
      selectedLanguageList={this.state.selectedLanguageList}
      biographyValue={this.state.biographyValue}
      isBiographyPrivate={this.state.isBiographyPrivate}
      cuisineValue={this.state.cuisineValue}
      suggestedCuisineList={this.state.suggestedCuisineList}
      selectedCuisineList={this.state.selectedCuisineList}
      isCuisinePrivate={this.state.isCuisinePrivate}
      isFacebookPrivate={this.state.isFacebookPrivate}
      isTwitterPrivate={this.state.isTwitterPrivate}
      isInstagramPrivate={this.state.isInstagramPrivate}
      facebookLink={this.state.facebookLink}
      twitterLink={this.state.twitterLink}
      instagramLink={this.state.instagramLink}
      facebookInputIsValid={this.state.facebookInputIsValid}
      twitterInputIsValid={this.state.twitterInputIsValid}
      instagramInputIsValid={this.state.instagramInputIsValid}
      onLocationInputChange={this.handleLocationInputChange}
      onLocationPrivacyClick={this.handleLocationPrivacyClick}
      onLocationDropdownClick={this.handleLocationDropdownClick}
      onChangeProfileImageClick={this.handleChangeProfileImageClick}
      onChangeBannerDone={this.handleChangeBannerDone}
      onUpcomingEventPrivacyClick={this.handleUpcomingEventPrivacyClick}
      onPastEventPrivacyClick={this.handlePastEventPrivacyClick}
      onLanguagePrivacyClick={this.handleLanguagePrivacyClick}
      onLanguageInputChange={this.handleLanguageInputChange}
      onLanguageDropdownClick={this.handleLanguageDropdownClick}
      onRemoveLanguageClick={this.handleRemoveLanguageClick}
      onBiographyPrivacyClick={this.handleBiographyPrivacyClick}
      onBiographyInputChange={this.handleBiographyInputChange}
      onCuisinePrivacyClick={this.handleCuisinePrivacyClick}
      onCuisineInputChange={this.handleCuisineInputChange}
      onCuisineDropdownClick={this.handleCuisineDropdownClick}
      onRemoveCuisineClick={this.handleRemoveCuisineClick}
      onFacebookPrivacyClick={this.handleFacebookPrivacyClick}
      onFacebookInputChange={this.handleFacebookInputChange}
      onTwitterPrivacyClick={this.handleTwitterPrivacyClick}
      onTwitterInputChange={this.handleTwitterInputChange}
      onInstagramPrivacyClick={this.handleInstagramPrivacyClick}
      onInstagramInputChange={this.handleInstagramInputChange}
      onSaveClick={this.handleSave}
      onCancelClick={this.handleCancel}
    />;
  }

  public async componentDidMount(): Promise<void> {
    try {
      await this.props.model.load();
      this.setState({
        isLoaded: true,
        coverImage: this.props.model.coverImage,
        profileImage: this.props.model.profileImage,
        locationValue: this.props.model.selectedLocation,
        biographyValue: this.props.model.biographyValue,
        isPastEventsPrivate: this.props.model.isPastEventsPrivate,
        isUpcomingEventsPrivate: this.props.model.isUpcomingEventsPrivate,
        isLocationPrivate: this.props.model.isLocationPrivate,
        isBiographyPrivate: this.props.model.isBiographyPrivate,
        isLanguagePrivate: this.props.model.isLanguagePrivate,
        selectedLanguageList: this.props.model.selectedLanguageList,
        isCuisinePrivate: this.props.model.isCuisinePrivate,
        selectedCuisineList: this.props.model.favouriteCuisineList,
        isFacebookPrivate: this.props.model.isFacebookPrivate,
        isTwitterPrivate: this.props.model.isTwitterPrivate,
        isInstagramPrivate: this.props.model.isInstagramPrivate,
        facebookLink: this.props.model.facebookLink,
        twitterLink: this.props.model.twitterLink,
        instagramLink: this.props.model.instagramLink,
        suggestedLocationList: this.props.model.locationList,
        suggestedLanguageList: this.props.model.languageList,
        suggestedCuisineList: this.props.model.cuisineList
      });
    } catch {
      this.setState({ isLoaded: true, hasError: true });
    }
  }

  private handleLocationInputChange = async (newValue: string) => {
    if (newValue.trim().length === 0) {
      this.setState({
        locationValue: newValue.trim(),
        suggestedLocationList: this.props.model.locationList
      });
      return;
    }
    try {
      const response = await this.props.model.getSuggestedLocationList(
        newValue);
      this.setState({
        locationValue: newValue,
        suggestedLocationList: response
      });
    } catch {
      this.setState({ locationValue: newValue, suggestedLocationList: [] });
    }
  }

  private handleLanguageInputChange = async (newValue: string) => {
    if (newValue.trim().length === 0) {
      this.setState({
        languageValue: newValue.trim(),
        suggestedLanguageList: this.props.model.languageList
      });
      return;
    }
    try {
      const response = await this.props.model.getSuggestedLanguageList(
        newValue);
      this.setState({
        languageValue: newValue,
        suggestedLanguageList: response
      });
    } catch {
      this.setState({ languageValue: newValue, suggestedLanguageList: [] });
    }
  }

  private handleBiographyPrivacyClick = () => {
    this.setState((prevState) => ({
      isBiographyPrivate: !prevState.isBiographyPrivate
    }));
  }

  private handleBiographyInputChange = (newBio: string) => {
    this.setState({ biographyValue: newBio });
  }

  private handleLanguagePrivacyClick = () => {
    this.setState((prevState) => ({
      isLanguagePrivate: !prevState.isLanguagePrivate
    }));
  }

  private handlePastEventPrivacyClick = () => {
    this.setState((prevState) => ({
      isPastEventsPrivate: !prevState.isPastEventsPrivate
    }));
  }

  private handleCuisinePrivacyClick = () => {
    this.setState((prevState) => ({
      isCuisinePrivate: !prevState.isCuisinePrivate
    }));
  }

  private handleCuisineInputChange = async (newValue: string) => {
    if (newValue.trim().length === 0) {
      this.setState({
        cuisineValue: newValue.trim(),
        suggestedCuisineList: this.props.model.cuisineList
      });
      return;
    }
    this.setState({
      cuisineValue: newValue,
      suggestedCuisineList: this.props.model.cuisineList.filter((c) =>
      c.label.includes(newValue))
    });
  }

  private handleLocationPrivacyClick = () => {
    this.setState((prevState) => ({
      isLocationPrivate: !prevState.isLocationPrivate
    }));
  }

  private handleUpcomingEventPrivacyClick = () => {
    this.setState((prevState) => ({
      isUpcomingEventsPrivate: !prevState.isUpcomingEventsPrivate
    }));
  }

  private handleLocationDropdownClick = (selectedLocation: string) => {
    this.setState({
      selectedLocation: selectedLocation,
      locationValue: selectedLocation,
      suggestedLocationList: [selectedLocation]
    });
  }

  private handleLanguageDropdownClick = (selectedLanguage: Language) => {
    const temp = [selectedLanguage];
    for (const language of this.state.selectedLanguageList) {
      if (language.id !== selectedLanguage.id) {
        temp.push(language);
      }
    }
    this.setState({
      languageValue: '',
      selectedLanguageList: temp,
      suggestedLanguageList: this.props.model.languageList
    });
  }

  private handleRemoveLanguageClick = (id: number) => {
    const temp = [];
    const selectedLanguageList = [...this.state.selectedLanguageList];
    for (const language of selectedLanguageList) {
      if (language.id !== id) {
        temp.push(language);
      }
    }
    this.setState({ selectedLanguageList: temp });
  }

  private handleCuisineDropdownClick = (selectedCuisine: Cuisine) => {
    const temp = [selectedCuisine];
    for (const cuisine of this.state.selectedCuisineList) {
      if (cuisine.id !== selectedCuisine.id) {
        temp.push(cuisine);
      }
    }
    this.setState({
      cuisineValue: '',
      selectedCuisineList: temp,
      suggestedCuisineList: this.props.model.favouriteCuisineList
    });
  }

  private handleRemoveCuisineClick = (id: number) => {
    const temp = [];
    const selectedCuisineList = [...this.state.selectedCuisineList];
    for (const cuisine of selectedCuisineList) {
      if (cuisine.id !== id) {
        temp.push(cuisine);
      }
    }
    this.setState({ selectedCuisineList: temp });
  }

  private handleChangeProfileImageClick = async (newImage: UserProfileImage
      ) => {
    try {
      await this.props.model.uploadProfileImage(newImage);
    } catch {
      //pass
    }
  }

  private handleFacebookPrivacyClick = () => {
    this.setState((prevState) => ({
      isFacebookPrivate: !prevState.isFacebookPrivate
    }));
  }

  private handleFacebookInputChange = (newValue: string) => {
    this.setState({ facebookLink: newValue });
  }

  private handleInstagramPrivacyClick = () => {
    this.setState((prevState) => ({
      isInstagramPrivate: !prevState.isInstagramPrivate
    }));
  }

  private handleInstagramInputChange = (newValue: string) => {
    this.setState({ instagramLink: newValue });
  }

  private handleTwitterPrivacyClick = () => {
    this.setState((prevState) => ({
      isTwitterPrivate: !prevState.isTwitterPrivate
    }));
  }

  private handleTwitterInputChange = (newValue: string) => {
    this.setState({ twitterLink: newValue });
  }

  private handleChangeBannerDone = async (newImage: CoverImage) => {
    try {
      await this.props.model.saveCoverImage(newImage);
      this.setState({ coverImage: newImage });
    } catch {
      // pass
    }
  }

  private handleCancel = () => {
    this.setState({
      redirect: `/users/profile/${this.props.model.profileId}`
    });
  }

  private handleSave = async () => {
    try {
      const isSaved = await this.props.model.save(this.state.coverImage,
        this.state.profileImage, this.state.isUpcomingEventsPrivate,
        this.state.isPastEventsPrivate, this.state.isLocationPrivate,
        this.state.isLanguagePrivate, this.state.biographyValue,
        this.state.isBiographyPrivate, this.state.selectedLanguageList,
        this.state.selectedCuisineList, this.state.isCuisinePrivate,
        this.state.isFacebookPrivate, this.state.isTwitterPrivate,
        this.state.isInstagramPrivate, this.state.facebookLink,
        this.state.twitterLink, this.state.instagramLink);
      if (isSaved) {
        this.setState({
          redirect: `/users/profile/${this.props.model.profileId}`
        });
      } else {
        this.setState({ hasError: true });
      }
    } catch {
      this.setState({ hasError: true });
    }
  }
}
