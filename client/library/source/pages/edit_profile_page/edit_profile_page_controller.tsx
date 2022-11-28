import * as React from 'react';
import * as Router from 'react-router-dom';
import { CityProvince, Cuisine, DisplayMode, Language, User
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
  coverImageSrc: string;
  profileImageSrc: string;
  locationValue: string;
  languageValue: string;
  selectedLocation: CityProvince;
  suggestedLocationList: CityProvince[];
  selectedLanguageList: Language[];
  biographyValue: string;
  isUpcomingEventsPrivate: boolean;
  isPastEventsPrivate: boolean;
  isLanguagePrivate: boolean;
  isLocationPrivate: boolean;
  isBiographyPrivate: boolean;
  suggestedLanguageList: Language[];
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
      coverImageSrc: '',
      profileImageSrc: '',
      locationValue: '',
      languageValue: '',
      selectedLocation: CityProvince.empty(),
      selectedLanguageList: [],
      suggestedLocationList: [],
      biographyValue: '',
      isUpcomingEventsPrivate: false,
      isPastEventsPrivate: false,
      isLanguagePrivate: false,
      isLocationPrivate: false,
      isBiographyPrivate: false,
      suggestedLanguageList: [],
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
      profileUserId={this.props.model.profileUserId}
      coverImageSrc={this.state.coverImageSrc}
      profileImageSrc={this.state.profileImageSrc}
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
      onChangeBanner={this.handleChangeBanner}
      onUpcomingEventPrivacyClick={this.handleUpcomingEventPrivacyClick}
      onPastEventPrivacyClick={this.handlePastEventPrivacyClick}
      onLanguagePrivacyClick={this.handleLanguagePrivacyClick}
      onLanguageInputChange={this.handleLanguageInputChange}
      onBiographyPrivacyClick={this.handleBiographyPrivacyClick}
      onBiographyInputChange={this.handleBiographyInputChange}
      onCuisinePrivacyClick={this.handleCuisinePrivacyClick}
      onCuisineInputChange={this.handleCuisineInputChange}
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
        coverImageSrc: this.props.model.coverImageSrc,
        profileImageSrc: this.props.model.profileImageSrc,
        biographyValue: this.props.model.biographyValue,
        isPastEventsPrivate: this.props.model.isPastEventsPrivate,
        isUpcomingEventsPrivate: this.props.model.isUpcomingEventsPrivate,
        isLocationPrivate: this.props.model.isLocationPrivate,
        isBiographyPrivate: this.props.model.isBiographyPrivate,
        isLanguagePrivate: this.props.model.isLanguagePrivate,
        selectedLanguageList: this.props.model.selectedLanguageList,
        selectedCuisineList: this.props.model.selectedCuisineList,
        isFacebookPrivate: this.props.model.isFacebookPrivate,
        isTwitterPrivate: this.props.model.isTwitterPrivate,
        isInstagramPrivate: this.props.model.isInstagramPrivate,
        facebookLink: this.props.model.facebookLink,
        twitterLink: this.props.model.twitterLink,
        instagramLink: this.props.model.instagramLink
      });
    } catch {
      this.setState({ isLoaded: true, hasError: true });
    }
  }

  private handleLocationInputChange = async (newValue: string) => {
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
    try {
      const response = await this.props.model.getSuggestedCuisineList(newValue);
      this.setState({
        cuisineValue: newValue,
        suggestedCuisineList: response
      });
    } catch {
      this.setState({ cuisineValue: newValue, suggestedCuisineList: [] });
    }
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

  private handleLocationDropdownClick = (selectedLocation: CityProvince) => {
    this.setState({
      selectedLocation: selectedLocation,
      locationValue: `${selectedLocation.city}, ${selectedLocation.province}, 
        ${selectedLocation.country}`
    });
  }

  private handleChangeProfileImageClick = async () => {
    try {
      const profileImageSrc = await this.props.model.uploadProfileImage();
      this.setState({ profileImageSrc: profileImageSrc });
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

  private handleChangeBanner = async () => {
    try {
      const coverImageSrc = await this.props.model.uploadCoverImage();
      this.setState({ coverImageSrc: coverImageSrc });
    } catch {
      //pass
    }
  }

  private handleCancel = () => {
    this.setState({
      redirect: `/users/profile/${this.props.model.profileUserId}`
    });
  }

  private handleSave = async () => {
    try {
      await this.props.model.save(this.state.coverImageSrc,
        this.state.profileImageSrc, this.state.isUpcomingEventsPrivate,
        this.state.isPastEventsPrivate, this.state.isLocationPrivate,
        this.state.isLanguagePrivate, this.state.biographyValue,
        this.state.isBiographyPrivate, this.state.selectedLanguageList,
        this.state.selectedCuisineList, this.state.isCuisinePrivate,
        this.state.isFacebookPrivate, this.state.isTwitterPrivate,
        this.state.isInstagramPrivate, this.state.facebookLink,
        this.state.twitterLink, this.state.instagramLink);
      this.setState({
        redirect: `/users/profile/${this.props.model.profileUserId}`
      });
    } catch {
      this.setState({ hasError: true });
    }
  }
}
