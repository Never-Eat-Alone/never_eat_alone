import * as React from 'react';
import * as Router from 'react-router-dom';
import { CityProvince, DisplayMode, Language, User } from '../../definitions';
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
  isLocationPrivate: boolean;
  isBiographyPrivate: boolean;
  cuisineValue: string;
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
      isLocationPrivate: false,
      isBiographyPrivate: false,
      cuisineValue: ''
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
      coverImageSrc={this.state.coverImageSrc}
      profileImageSrc={this.state.profileImageSrc}
      displayName={this.props.model.displayName}
      userName={this.props.model.userName}
      prodileUserId={this.props.model.profileUserId}
      isUpcomingEventsPrivate={this.state.isUpcomingEventsPrivate}
      isPastEventsPrivate={this.state.isPastEventsPrivate}
      isLocationPrivate={this.state.isLocationPrivate}
      locationValue={this.state.locationValue}
      suggestedLocationList={this.handleSuggestedLocationList}
      isLanguagePrivate={this.props.model.isLanguagePrivate}
      languageValue={this.state.languageValue}
      suggestedLanguageList={this.props.model.getSuggestedLanguageList(
        this.state.languageValue)}
      selectedLanguageList={this.state.selectedLanguageList}
      biographyValue={this.state.biographyValue}
      isBiographyPrivate={this.state.isBiographyPrivate}
      cuisineValue={this.state.cuisineValue}
      suggestedCuisineList={}
      selectedCuisineList={}
      isCuisinePrivate={}
      isFacebookPrivate={}
      isTwitterPrivate={}
      isInstagramPrivate={}
      facebookLink={}
      twitterLink={}
      instagramLink={}
      facebookInputIsValid={}
      twitterInputIsValid={}
      instagramInputIsValid={}
      onLocationInputChange={}
      onLocationPrivacyClick={}
      onLocationDropdownClick={}
      onChangeProfileImageClick={}
      onChangeBanner={}
      onUpcomingEventPrivacyClick={}
      onPastEventPrivacyClick={}
      onLanguagePrivacyClick={}
      onLanguageInputChange={}
      onBiographyPrivacyClick={}
      onBiographyInputChange={}
      onCuisinePrivacyClick={}
      onCuisineInputChange={}
      onFacebookPrivacyClick={}
      onFacebookInputChange={}
      onTwitterPrivacyClick={}
      onTwitterInputChange={}
      onInstagramPrivacyClick={}
      onInstagramInputChange={}
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

      });
    } catch {
      this.setState({ isLoaded: true, hasError: true });
    }
  }

  private handleSuggestedLocationList = async (value: string) => {
    if (!value || value.trim().length === 0) {
      return;
    }
    try {
      const response = await this.props.model.getSuggestedLocationList(
        this.state.locationValue);
      this.setState({ suggestedLocationList: response });
    }
  }

  private handleCancel = () => {
    this.setState({
      redirect: `/users/profile/${this.props.model.profileUserId}`
    });
  }

  private handleSave = async () => {
    try {
      await this.props.model.save();
      this.setState({
        redirect: `/users/profile/${this.props.model.profileUserId}`
      });
    } catch {
      this.setState({ hasError: true });
    }
  }
}
