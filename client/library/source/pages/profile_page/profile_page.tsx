import * as React from 'react';
import { PrimaryButtonNavLink } from '../../components';
import { Cuisine, DisplayMode, EventCardSummary, Language, User } from
  '../../definitions';
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

  /** The date of the user's account creation. */
  memberSince: Date;

  /** The biography on user's profile written by the user. */
  biography: string;

  isBiographyPrivate: boolean;

  /** The user's location. */
  address: string;

  isLocationPrivate: boolean;

  /** List of the languages the user can speak. */
  languageList: Language[];

  isLanguagePrivate: boolean;

  /** The url to user's profile on Facebook social platform. */
  facebookLink: string;

  isFacebookPrivate: boolean;

  /** The url to user's profile on Twitter social platform. */
  twitterLink: string;

  isTwitterPrivate: boolean;

  /** The url to user's profile on Instagram social platform. */
  instagramLink: string;

  isInstagramPrivate: boolean;

  /** The list of the user's favorite cuisines. */
  favoriteCuisineList: Cuisine[];

  isCuisinePrivate: boolean;

  /** List of the user upcoming events. */
  upcomingEventList: EventCardSummary[];

  isUpcomingEventsPrivate: boolean;

  /** List of the user attended events. */
  pastEventList: EventCardSummary[];

  isPastEventsPrivate: boolean;

  /** Indicates the report option was clicked. */
  onReportClick: () => void;
}

/** Displays the user's profile page. */
export class ProfilePage extends React.Component<Properties> {
  public render(): JSX.Element {
    const isAccountProfile = (this.props.account.id !== -1 &&
      this.props.account.id === this.props.profileId);
    const isNoEventsToSee = (() => {
      if ((!this.props.upcomingEventList || this.props.upcomingEventList.length
          === 0) && (!this.props.pastEventList ||
          this.props.pastEventList.length === 0)) {
        return true;
      }
      if (!isAccountProfile && this.props.isUpcomingEventsPrivate &&
          this.props.isPastEventsPrivate) {
        return true;
      }
      return false;
    })();
    const events = (() => {
      if (isNoEventsToSee) {
        if (isAccountProfile) {
          return (
            <div style={NO_EVENT_CONTAINER_STYLE} >
              <h1 style={NO_EVENT_TITLE_STYLE} >
                Upcoming And Past Events
              </h1>
              <div style={EVENT_CONTAINER_STYLE} >
                <div style={NO_EVENT_IMAGE_CONTAINER_STYLE} >
                  <img
                    style={NO_EVENT_IMAGE_STYLE}
                    src='resources/profile_page/icons/no_event.png'
                    alt='No Events Icon'
                  />
                </div>
                <p style={NO_EVENT_BOLD_TEXT_STYLE} >Nothing here yet</p>
                <p style={NO_EVENT_DESCRIPTION_STYLE} >
                  You haven’t attended any events yet, why not check out some?
                </p>
                <PrimaryButtonNavLink
                  style={EXPLORE_EVENTS_BUTTON_STYLE}
                  to='/'
                  label='Explore Events'
                />
              </div>
            </div>);
        }
        return (
          <div style={NO_EVENT_CONTAINER_STYLE} >
            <h1 style={NO_EVENT_TITLE_STYLE} >
              Upcoming And Past Events
            </h1>
            <div style={EVENT_CONTAINER_STYLE} >
              <div style={NO_EVENT_IMAGE_CONTAINER_STYLE} >
                <img
                  style={NO_EVENT_IMAGE_STYLE}
                  src='resources/profile_page/icons/no_see.png'
                  alt='No Events Icon'
                />
              </div>
              <p style={NO_EVENT_BOLD_TEXT_STYLE} >Nothing to see</p>
              <p style={NO_EVENT_DESCRIPTION_STYLE} >
                Either this user has not attended any events yet, or their 
                events are hidden.
              </p>
            </div>
          </div>);
      }
      return null;
    })();
    const upcomingEvents = (!isNoEventsToSee && (isAccountProfile ||
        !this.props.isUpcomingEventsPrivate) &&
      <ProfileUpcomingEvents
        displayMode={this.props.displayMode}
        eventList={this.props.upcomingEventList}
        isLoggedIn={isAccountProfile}
      /> || null);
    const pastEvents = (!isNoEventsToSee && (isAccountProfile ||
        !this.props.isPastEventsPrivate) &&
      <ProfilePastEvents
        displayMode={this.props.displayMode}
        eventList={this.props.pastEventList}
        isLoggedIn={isAccountProfile}
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
          {events}
          {upcomingEvents}
          {pastEvents}
        </div>
      </div>);
  }
}

const DESKTOP_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  width: '100%',
  height: 'max-content',
  backgroundColor: '#FFFFFF',
  gap: '58px',
  paddingBottom: '81px',
  overflow: 'initial'
};

const TABLET_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  height: 'max-content',
  backgroundColor: '#FFFFFF',
  gap: '60px',
  paddingBottom: '75px',
  overflow: 'initial'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  height: 'max-content',
  backgroundColor: '#FFFFFF',
  gap: '60px',
  paddingBottom: '55px',
  overflow: 'initial'
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

const NO_EVENT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  backgroundColor: 'transparent'
};

const NO_EVENT_TITLE_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '23px',
  lineHeight: '34px',
  textTransform: 'capitalize',
  color: '#000000',
  padding: '0px',
  margin: '0px 0px 40px 0px'
};

const EVENT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '10px',
  width: '100%'
};

const NO_EVENT_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '200px',
  height: '150px',
  backgroundColor: 'transparent',
  marginTop: '30px'
};

const NO_EVENT_IMAGE_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minWidth: '200px',
  objectFit: 'cover'
};

const NO_EVENT_BOLD_TEXT_STYLE: React.CSSProperties = {
  color: 'var(--grey-black, #000)',
  textAlign: 'center',
  fontFamily: 'Oswald',
  fontSize: '23px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: 'normal'
};

const NO_EVENT_DESCRIPTION_STYLE: React.CSSProperties = {
  color: '#000',
  textAlign: 'center',
  fontFamily: 'Source Sans Pro',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 300,
  lineHeight: '18px',
  whiteSpace: 'pre-line'
};

const EXPLORE_EVENTS_BUTTON_STYLE: React.CSSProperties = {
  marginBottom: '50px'
};
