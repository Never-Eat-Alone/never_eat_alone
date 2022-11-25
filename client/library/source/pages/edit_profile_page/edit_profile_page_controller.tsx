import * as React from 'react';
import * as Router from 'react-router-dom';
import { CityProvince, DisplayMode, Language, User } from '../../definitions';
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
  locationValue: string;
  languageValue: string;
  selectedLocation: CityProvince;
  selectedLanguageList: Language[];
  biographyValue: string;
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
      languageValue: '',
      selectedLocation: CityProvince.empty(),
      selectedLanguageList: [],
      biographyValue: ''
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
      coverImageSrc={this.props.model.coverImageSrc}
      profileImageSrc={this.props.model.profileImageSrc}
      displayName={this.props.model.displayName}
      userName={this.props.model.userName}
      prodileUserId={this.props.model.profileUserId}
      isUpcomingEventsPrivate={this.props.model.isUpcomingEventsPrivate}
      isPastEventsPrivate={this.props.model.isPastEventsPrivate}
      isLocationPrivate={this.props.model.isLocationPrivate}
      locationValue={this.state.locationValue}
      suggestedLocationList={this.props.model.getSuggestedLocationList(
        this.state.locationValue)}
      isLanguagePrivate={this.props.model.isLanguagePrivate}
      languageValue={this.state.languageValue}
      suggestedLanguageList={this.props.model.getSuggestedLanguageList(
        this.state.languageValue)}
      selectedLanguageList={this.state.selectedLanguageList}
      biographyValue={this.state.biographyValue}
      isBiographyPrivate={}
      cuisineValue={}
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
        biographyValue: this.props.model.biographyValue
      });
    } catch {
      this.setState({ isLoaded: true, hasError: true });
    }
  }

  private handleCancel = () => {
    this.setState({
      redirect: `/users/profile/${this.props.model.profileUserId}`
    });
  }

  private handleSave = () => {
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
