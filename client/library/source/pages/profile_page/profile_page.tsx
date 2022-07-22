import * as React from 'react';
import { CityProvince, Cuisine, DisplayMode, EventCardSummary
} from '../../definitions';
import { ProfileBox } from './profile_box';
import { ProfileUpcomingEvents } from './profile_upcoming_events';
import { ProfilePastEvents } from './profile_past_events';

interface Properties {
  displayMode: DisplayMode;

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
  biography?: string;

  isBiographyDisplayed?: boolean;

  /** The user's location. */
  location?: CityProvince;

  isLocationDisplayed?: boolean;

  /** List of the languages the user can speak. */
  languageList?: string[];

  isLanguageDisplayed?: boolean;

  /** The url to user's profile on Facebook social platform. */
  facebookLink?: string;

  isFacebookLinkDisplayed?: boolean;

  /** The url to user's profile on Twitter social platform. */
  twitterLink?: string;

  isTwitterLinkDisplayed?: boolean;

  /** The url to user's profile on Instagram social platform. */
  instagramLink?: string;

  isInstagramLinkDisplayed?: boolean;

  /** The list of the user's favorite cuisines. */
  favoriteCuisineList?: Cuisine[];

  isCuisineDisplayed?: boolean;

  /** Whether the edit button is displayed on user profile or not. */
  isEditButton?: boolean;

  /** Whether Action button is displayed on the user profile or not. */
  isActionButton?: boolean;

  /** Whether the user is logged in or not. */
  isLoggedIn: boolean;

  /** List of the user upcoming events. */
  upcomingEventList: EventCardSummary[];

  /** List of the user attended events. */
  pastEventList: EventCardSummary[];

  /** Indicates the report option was clicked. */
  onReportClick?: () => void;

  /** Indicates the Edit button is clicked. */
  onEditClick?: () => void;
}

/** Displays the user's profile page. */
export class ProfilePage extends React.Component<Properties> {
  public render(): JSX.Element {
    const { coverImageStyle, profileBoxStyle } = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          coverImageStyle: DESKTOP_COVER_IMAGE_STYLE,
          profileBoxStyle: DESKTOP_PROFILE_BOX_STYLE
        };
      }
      return {
        coverImageStyle: MOBILE_TABLET_COVER_IMAGE_STYLE,
        profileBoxStyle: MOBILE_TABLET_PROFILE_BOX_STYLE
      };
    })();
    return (
      <div style={CONTAINER_STYLE} >
        <div
          style={{...COVER_IMAGE_STYLE,
            backgroundImage: `url(${this.props.coverImageSrc})`,
            ...coverImageStyle
          }}
        />
        <div style={profileBoxStyle} >
          <ProfileBox {...this.props} />
        </div>
        <div style={EVENTS_CONTAINER_STYLE} >
          <ProfileUpcomingEvents
            displayMode={this.props.displayMode}
            eventList={this.props.upcomingEventList}
            isLoggedIn={this.props.isLoggedIn}
          />
          <ProfilePastEvents
            displayMode={this.props.displayMode}
            eventList={this.props.pastEventList}
            isLoggedIn={this.props.isLoggedIn}
          />
        </div>
      </div>);
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  backgroundColor: '#FFFFFF'
};

const COVER_IMAGE_STYLE: React.CSSProperties = {
  backgroundSize: 'cover',
  backgroundColor: '#C4C4C4',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left center',
  width: '100%'
};

const DESKTOP_COVER_IMAGE_STYLE: React.CSSProperties = {
  height: '120px'
};

const MOBILE_TABLET_COVER_IMAGE_STYLE: React.CSSProperties = {
  height: '200px'
};

const DESKTOP_PROFILE_BOX_STYLE: React.CSSProperties = {
  marginTop: '-100px'
};

const MOBILE_TABLET_PROFILE_BOX_STYLE: React.CSSProperties = {
  marginTop: '-180px'
};

const EVENTS_CONTAINER_STYLE: React.CSSProperties = {
  marginTop: '60px'
};
