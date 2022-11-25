import * as React from 'react';
import { DisplayMode } from '../../definitions';
import { ProfilePage } from './profile_page';
import { ProfilePageModel } from './profile_page_model';

interface Properties {
  displayMode: DisplayMode;

  /** The profile page id. */
  profileId: number;

  /** The profilepage model. */
  model: ProfilePageModel;

  /** Indicates if the user is logged in. */
  isLoggedIn: boolean;

  /** Indicates the profile page belongs to the current logged in account. */
  isAccountProfile: boolean;

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
      displayMode={this.props.displayMode}
      profileId={this.props.model.profileId}
      coverImageSrc={this.props.model.coverImageSrc}
      profileImageSrc={this.props.model.profileImageSrc}
      displayName={this.props.model.name}
      userName={this.props.model.userName}
      memberSince={this.props.model.createdAt}
      biography={this.props.model.biography}
      location={this.props.model.location}
      languageList={this.props.model.languageList}
      facebookLink={this.props.model.facebookLink}
      twitterLink={this.props.model.twitterLink}
      instagramLink={this.props.model.instagramLink}
      favoriteCuisineList={this.props.model.favoriteCuisineList}
      isLoggedIn={this.props.isLoggedIn}
      isAccountProfile={this.props.isAccountProfile}
      upcomingEventList={this.props.model.upcomingEventList}
      pastEventList={this.props.model.pastEventList}
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
    return;
  }
}