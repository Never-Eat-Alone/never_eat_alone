import * as React from 'react';
import { CityProvince, Cuisine, DisplayMode, EventCardSummary, Language, User
} from '../../definitions';
import { ProfileBox } from './profile_box';
import { ProfilePastEvents } from './profile_past_events';
import { ProfileUpcomingEvents } from './profile_upcoming_events';

interface Properties {
  displayMode: DisplayMode;

  /** the user logged in user. */
  account: User;

  /** The profile page id. */
  profileId: number;

  /** The source address of the user's cover image. */
  coverImageSrc: string;

  /** The source address of the user's profile image. */
  profileImageSrc: string;

  /** User's display name. */
  displayName: string;

  /** The username of the user. */
  userName: string;

  /** The date of the user's account creation. */
  memberSince: Date;

  /** The biography on user's profile written by the user. */
  biography: string;

  /** The user's location. */
  location: CityProvince;

  /** List of the languages the user can speak. */
  languageList: Language[];

  /** The url to user's profile on Facebook social platform. */
  facebookLink: string;

  /** The url to user's profile on Twitter social platform. */
  twitterLink: string;

  /** The url to user's profile on Instagram social platform. */
  instagramLink: string;

  /** The list of the user's favorite cuisines. */
  favoriteCuisineList: Cuisine[];

  /** List of the user upcoming events. */
  upcomingEventList: EventCardSummary[];

  /** List of the user attended events. */
  pastEventList: EventCardSummary[];

  /** Indicates the report option was clicked. */
  onReportClick: () => void;
}

/** Displays the user's profile page. */
export class ProfilePage extends React.Component<Properties> {
  public render(): JSX.Element {
    const pastEvents = (this.props.pastEventList &&
      this.props.pastEventList.length !== 0 &&
      <ProfilePastEvents
        displayMode={this.props.displayMode}
        eventList={this.props.pastEventList}
        isLoggedIn={this.props.account && this.props.account.id !== -1}
      /> || null);
    const upcomingEvents = (this.props.upcomingEventList &&
      this.props.upcomingEventList.length !== 0 &&
      <ProfileUpcomingEvents
        displayMode={this.props.displayMode}
        eventList={this.props.upcomingEventList}
        isLoggedIn={this.props.account && this.props.account.id !== -1}
      /> || null);
    const { containerStyle, coverImageStyle, profileBoxStyle,
        eventsContainerStyle } = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          containerStyle: DESKTOP_CONTAINER_STYLE,
          coverImageStyle: DESKTOP_COVER_IMAGE_STYLE,
          profileBoxStyle: DESKTOP_PROFILE_BOX_STYLE,
          eventsContainerStyle: DESKTOP_EVENTS_CONTAINER_STYLE
        };
      } else if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerStyle: TABLET_CONTAINER_STYLE,
          coverImageStyle: MOBILE_TABLET_COVER_IMAGE_STYLE,
          profileBoxStyle: MOBILE_TABLET_PROFILE_BOX_STYLE,
          eventsContainerStyle: TABLET_EVENTS_CONTAINER_STYLE
        };
      } else {
        return {
          containerStyle: MOBILE_CONTAINER_STYLE,
          coverImageStyle: MOBILE_TABLET_COVER_IMAGE_STYLE,
          profileBoxStyle: MOBILE_TABLET_PROFILE_BOX_STYLE,
          eventsContainerStyle: MOBILE_EVENTS_CONTAINER_STYLE
        };
      }
    })();
    return (
      <div style={containerStyle} >
        <div
          style={{...COVER_IMAGE_STYLE,
            backgroundImage: `url(${this.props.coverImageSrc})`,
            ...coverImageStyle
          }}
        />
        <div style={profileBoxStyle} >
          <ProfileBox {...this.props} />
        </div>
        <div style={eventsContainerStyle} >
          {upcomingEvents}
          {pastEvents}
        </div>
      </div>);
  }
}

const DESKTOP_CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  width: '100%',
  backgroundColor: '#FFFFFF',
  gap: '58px',
  paddingBottom: '81px'
};

const TABLET_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  backgroundColor: '#FFFFFF',
  gap: '60px',
  paddingBottom: '75px'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  backgroundColor: '#FFFFFF',
  gap: '60px',
  paddingBottom: '55px'
};

const COVER_IMAGE_STYLE: React.CSSProperties = {
  backgroundSize: 'cover',
  backgroundColor: '#C4C4C4',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left center',
  width: '100%'
};

const DESKTOP_COVER_IMAGE_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  height: '120px'
};

const MOBILE_TABLET_COVER_IMAGE_STYLE: React.CSSProperties = {
  height: '200px'
};

const DESKTOP_PROFILE_BOX_STYLE: React.CSSProperties = {
  marginTop: '20px'
};

const MOBILE_TABLET_PROFILE_BOX_STYLE: React.CSSProperties = {
  marginTop: '-180px'
};

const DESKTOP_EVENTS_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '768px',
  gap: '60px',
  marginRight: '20px',
  marginTop: '150px'
};

const TABLET_EVENTS_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '684px',
  gap: '60px',
  marginRight: '10px',
  marginLeft: '10px'
};

const MOBILE_EVENTS_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '335px',
  gap: '60px',
  marginRight: '10px',
  marginLeft: '10px'
};
