import * as React from 'react';
import * as Router from 'react-router-dom';
import { CoverImage, Cuisine, DisplayMode, Language, ProfilePageData, User }
  from '../../definitions';
import { EditProfilePage } from './edit_profile_page';
import { EditProfilePageModel } from './edit_profile_page_model';

interface Properties {
  displayMode: DisplayMode;
  account: User;
  model: EditProfilePageModel;
  onSave: () => void;
}

interface State {
  isLoaded: boolean;
  hasError: boolean;
  redirect: string;
  locationValue: string;
  suggestedLocationList: string[];
  biographyValue: string;
  languageValue: string;
  suggestedLanguageList: Language[];
  cuisineValue: string;
  suggestedCuisineList: Cuisine[];
  facebookInputIsValid: boolean;
  twitterInputIsValid: boolean;
  instagramInputIsValid: boolean;
  uploadProfileImageHasError: boolean;
  updateCoverImageHasError: boolean;
  profilePageData: ProfilePageData;
}

export class EditProfilePageController extends React.Component<Properties,
    State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isLoaded: false,
      hasError: false,
      redirect: null,
      locationValue: '',
      suggestedLocationList: [],
      biographyValue: '',
      languageValue: '',
      suggestedLanguageList: [],
      cuisineValue: '',
      suggestedCuisineList: [],
      facebookInputIsValid: true,
      twitterInputIsValid: true,
      instagramInputIsValid: true,
      uploadProfileImageHasError: false,
      updateCoverImageHasError: false,
      profilePageData: ProfilePageData.default(this.props.account.id)
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
      displayName={this.props.account.name}
      userName={this.props.account.userName}
      profileId={this.props.account.id}
      coverImage={this.state.profilePageData.coverImage}
      coverImageList={this.props.model.coverImageList}
      profileImage={this.state.profilePageData.profileImage}
      isUpcomingEventsPrivate={
        this.state.profilePageData.isUpcomingEventsPrivate}
      isPastEventsPrivate={this.state.profilePageData.isPastEventsPrivate}
      isLocationPrivate={this.state.profilePageData.isLocationPrivate}
      locationValue={this.state.locationValue}
      suggestedLocationList={this.state.suggestedLocationList}
      isLanguagePrivate={this.state.profilePageData.isLanguagePrivate}
      languageValue={this.state.languageValue}
      suggestedLanguageList={this.state.suggestedLanguageList}
      selectedLanguageList={this.state.profilePageData.selectedLanguageList}
      biographyValue={this.state.biographyValue}
      isBiographyPrivate={this.state.profilePageData.isBiographyPrivate}
      cuisineValue={this.state.cuisineValue}
      suggestedCuisineList={this.state.suggestedCuisineList}
      selectedCuisineList={this.state.profilePageData.selectedCuisineList}
      isCuisinePrivate={this.state.profilePageData.isCuisinePrivate}
      isFacebookPrivate={this.state.profilePageData.isFacebookPrivate}
      isTwitterPrivate={this.state.profilePageData.isTwitterPrivate}
      isInstagramPrivate={this.state.profilePageData.isInstagramPrivate}
      facebookLink={this.state.profilePageData.facebookLink}
      twitterLink={this.state.profilePageData.twitterLink}
      instagramLink={this.state.profilePageData.instagramLink}
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
        profilePageData: this.props.model.profilePageData,
        locationValue: this.props.model.profilePageData.selectedLocation,
        biographyValue: this.props.model.profilePageData.biographyValue,
        suggestedLocationList: [],
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
        suggestedLocationList: []
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

  private handleLanguageInputChange = (newValue: string) => {
    if (newValue.trim().length === 0) {
      this.setState({
        languageValue: newValue.trim(),
        suggestedLanguageList: this.props.model.languageList
      });
    } else {
      const lowerCasedNewValue = newValue.toLowerCase();
      this.setState({
        languageValue: newValue,
        suggestedLanguageList: this.props.model.languageList.filter(l =>
          l.name.toLowerCase().includes(lowerCasedNewValue))
      });
    }
  }  

  private handleBiographyPrivacyClick = () => {
    this.props.model.profilePageData.updateIsBiographyPrivate(
      !this.state.profilePageData.isBiographyPrivate);
    this.setState((prevState) => ({
      profilePageData: this.props.model.profilePageData
    }));
  }

  private handleBiographyInputChange = (newBio: string) => {
    this.setState({ biographyValue: newBio });
  }

  private handleLanguagePrivacyClick = () => {
    this.props.model.profilePageData.updateIsLanguagePrivate(
      !this.state.profilePageData.isLanguagePrivate);
    this.setState((prevState) => ({
      profilePageData: this.props.model.profilePageData
    }));
  }

  private handlePastEventPrivacyClick = () => {
    this.props.model.profilePageData.updateIsPastEventsPrivate(
      !this.state.profilePageData.isPastEventsPrivate);
    this.setState((prevState) => ({
      profilePageData: this.props.model.profilePageData
    }));
  }

  private handleCuisinePrivacyClick = () => {
    this.props.model.profilePageData.updateIsCuisinePrivate(
      !this.state.profilePageData.isCuisinePrivate);
    this.setState((prevState) => ({
      profilePageData: this.props.model.profilePageData
    }));
  }

  private handleCuisineInputChange = (newValue: string) => {
    if (newValue.trim().length === 0) {
      this.setState({
        cuisineValue: newValue.trim(),
        suggestedCuisineList: this.props.model.cuisineList
      });
    } else {
      const lowerCasedNewValue = newValue.toLowerCase();
      this.setState({
        cuisineValue: newValue,
        suggestedCuisineList: this.props.model.cuisineList.filter(c =>
          c.label.toLowerCase().includes(lowerCasedNewValue))
      });
    }
  }

  private handleLocationPrivacyClick = () => {
    this.props.model.profilePageData.updateIsLocationPrivate(
      !this.state.profilePageData.isLocationPrivate);
    this.setState((prevState) => ({
      profilePageData: this.props.model.profilePageData
    }));
  }

  private handleUpcomingEventPrivacyClick = () => {
    this.props.model.profilePageData.updateIsUpcomingEventsPrivate(
      !this.state.profilePageData.isUpcomingEventsPrivate);
    this.setState((prevState) => ({
      profilePageData: this.props.model.profilePageData
    }));
  }

  private handleLocationDropdownClick = (selectedLocation: string) => {
    this.props.model.profilePageData.updateSelectedLocation(selectedLocation);
    this.setState({
      profilePageData: this.props.model.profilePageData,
      locationValue: selectedLocation,
      suggestedLocationList: [selectedLocation]
    });
  }

  private handleLanguageDropdownClick = (selectedLanguage: Language) => {
    const temp = [selectedLanguage];
    
    for (const language of this.state.profilePageData.selectedLanguageList) {
      if (language.id !== selectedLanguage.id) {
        temp.push(language);
      }
    }
    this.props.model.profilePageData.updateSelectedLanguageList(temp);
    this.setState({
      languageValue: '',
      profilePageData: this.props.model.profilePageData,
      suggestedLanguageList: this.props.model.languageList
    });
  }

  private handleRemoveLanguageClick = (id: number) => {
    const temp = [];
    const selectedLanguageList = [
      ...this.state.profilePageData.selectedLanguageList];
    for (const language of selectedLanguageList) {
      if (language.id !== id) {
        temp.push(language);
      }
    }
    this.props.model.profilePageData.updateSelectedLanguageList(temp);
    this.setState({ profilePageData: this.props.model.profilePageData });
  }

  private handleCuisineDropdownClick = (selectedCuisine: Cuisine) => {
    const temp = [selectedCuisine];
    for (const cuisine of this.state.profilePageData.selectedCuisineList) {
      if (cuisine.id !== selectedCuisine.id) {
        temp.push(cuisine);
      }
    }
    this.props.model.profilePageData.updateSelectedCuisineList(temp);
    this.setState({
      cuisineValue: '',
      profilePageData: this.props.model.profilePageData,
      suggestedCuisineList: []
    });
  }

  private handleRemoveCuisineClick = (id: number) => {
    const temp = [];
    const selectedCuisineList = [
      ...this.state.profilePageData.selectedCuisineList];
    for (const cuisine of selectedCuisineList) {
      if (cuisine.id !== id) {
        temp.push(cuisine);
      }
    }
    this.props.model.profilePageData.updateSelectedCuisineList(temp);
    this.setState({ profilePageData: this.props.model.profilePageData });
  }

  private handleChangeProfileImageClick = async (newImageFile: File) => {
    try {
      await this.props.model.uploadProfileImage(newImageFile);
      this.setState({ profilePageData: this.props.model.profilePageData });
    } catch {
      this.setState({ uploadProfileImageHasError: true });
    }
  }

  private handleFacebookPrivacyClick = () => {
    this.props.model.profilePageData.updateIsFacebookPrivate(
      !this.state.profilePageData.isFacebookPrivate);
    this.setState({ profilePageData: this.props.model.profilePageData });
  }

  private handleFacebookInputChange = (newValue: string) => {
    this.props.model.profilePageData.updateFacebookLink(newValue);
    this.setState({
      profilePageData: this.props.model.profilePageData
    });
  }

  private handleInstagramPrivacyClick = () => {
    this.props.model.profilePageData.updateIsInstagramPrivate(
      !this.state.profilePageData.isInstagramPrivate);
    this.setState({ profilePageData: this.props.model.profilePageData });
  }

  private handleInstagramInputChange = (newValue: string) => {
    this.props.model.profilePageData.updateInstagramLink(newValue);
    this.setState({ profilePageData: this.props.model.profilePageData });
  }

  private handleTwitterPrivacyClick = () => {
    this.props.model.profilePageData.updateIsTwitterPrivate(
      !this.state.profilePageData.isTwitterPrivate);
    this.setState({ profilePageData: this.props.model.profilePageData });
  }

  private handleTwitterInputChange = (newValue: string) => {
    this.props.model.profilePageData.updateTwitterLink(newValue);
    this.setState({ profilePageData: this.props.model.profilePageData });
  }

  private handleChangeBannerDone = async (newImage: CoverImage) => {
    try {
      await this.props.model.saveCoverImage(newImage);
      this.setState({ profilePageData: this.props.model.profilePageData });
    } catch {
      this.setState({ updateCoverImageHasError: true });
    }
  }

  private handleCancel = () => {
    this.setState({ redirect: `/users/profile/${this.props.account.id}` });
  }

  private handleSave = async () => {
    try {
      await this.props.model.save(this.state.profilePageData);
      this.setState({ redirect: `/users/profile/${this.props.account.id}` });
    } catch {
      this.setState({ hasError: true });
    }
  }
}
