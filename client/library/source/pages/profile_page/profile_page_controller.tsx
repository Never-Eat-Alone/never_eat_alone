import * as React from 'react';
import { DisplayMode, User } from '../../definitions';
import { ProfilePage } from './profile_page';
import { ProfilePageModel } from './profile_page_model';

interface Properties {
  displayMode: DisplayMode;

  /** The current logged user. */
  account: User;

  /** The profile page id. */
  profileId: number;

  /** The profilepage model. */
  model: ProfilePageModel;

  /** Indicates the report button is clicked. */
  onReportClick: () => void;
}

interface State {
  isLoaded: boolean;
  hasError: boolean;
}

export class ProfilePageController extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isLoaded: false,
      hasError: false
    };
  }

  public render(): JSX.Element {
    if (!this.state.isLoaded || this.state.hasError) {
      return <div />;
    }
    return <ProfilePage
      account={this.props.account}
      displayMode={this.props.displayMode}
      profileId={this.props.model.profilePageData.accountId}
      coverImageSrc={this.props.model.profilePageData.coverImage.src}
      profileImageSrc={this.props.model.profilePageData.profileImage.src}
      displayName={this.props.model.name}
      userName={this.props.model.userName}
      memberSince={this.props.model.createdAt}
      isBiographyPrivate={this.props.model.profilePageData.isBiographyPrivate}
      biography={this.props.model.profilePageData.biographyValue}
      address={this.props.model.profilePageData.selectedLocation}
      isLocationPrivate={this.props.model.profilePageData.isLocationPrivate}
      languageList={this.props.model.profilePageData.selectedLanguageList}
      isLanguagePrivate={this.props.model.profilePageData.isLanguagePrivate}
      facebookLink={this.props.model.profilePageData.facebookLink}
      isFacebookPrivate={this.props.model.profilePageData.isFacebookPrivate}
      twitterLink={this.props.model.profilePageData.twitterLink}
      isTwitterPrivate={this.props.model.profilePageData.isTwitterPrivate}
      instagramLink={this.props.model.profilePageData.instagramLink}
      isInstagramPrivate={this.props.model.profilePageData.isInstagramPrivate}
      favoriteCuisineList={this.props.model.profilePageData.selectedCuisineList}
      isCuisinePrivate={this.props.model.profilePageData.isCuisinePrivate}
      upcomingEventList={this.props.model.upcomingEventList}
      isUpcomingEventsPrivate={
        this.props.model.profilePageData.isUpcomingEventsPrivate}
      pastEventList={this.props.model.pastEventList}
      isPastEventsPrivate={this.props.model.profilePageData.isPastEventsPrivate}
      onReportClick={this.props.onReportClick}
    />;
  }

  public async componentDidMount(): Promise<void> {
    try {
      await this.props.model.load();
      this.setState({ isLoaded: true });
    } catch {
      this.setState({ isLoaded: true, hasError: true });
    }
  }
}
