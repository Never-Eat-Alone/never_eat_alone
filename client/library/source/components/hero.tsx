import * as React from 'react';
import { DisplayMode, EventTag, User } from '../definitions';
import { AttendanceRecord } from './attendance_record';
import { AccentTextButton } from './text_button';

interface Properties {
  account: User;
  displayMode: DisplayMode;
  eventTagList: EventTag[];
  totalEventsThisMonth: number;
  onJoinButton: () => void;
}

export class Hero extends React.Component<Properties> {
  public render(): JSX.Element {
    if (!this.props.account || this.props.account.id === -1) {
      const paragraph = 'We’re here to pair the experiences you love with the \
        people who love them. Want to go out but don’t know when and where? \
        There’s an event for that.';
      const { containerStyle, detailsContainerStyle } = (() => {
        if (this.props.displayMode === DisplayMode.DESKTOP) {
          return {
            containerStyle: DESKTOP_CONTAINER_STYLE,
            detailsContainerStyle: DESKTOP_DETAILS_CONTAINER_STYLE
          };
        }
        if (this.props.displayMode === DisplayMode.TABLET) {
          return {
            containerStyle: TABLET_CONTAINER_STYLE,
            detailsContainerStyle: TABLET_DETAILS_CONTAINER_STYLE
          };
        }
        return {
          containerStyle: MOBILE_CONTAINER_STYLE,
          detailsContainerStyle: MOBILE_DETAILS_CONTAINER_STYLE
        };
      })();
      return (
        <div style={{...CONTAINER_STYLE, ...containerStyle}} >
          <div style={{...DETAILS_CONTAINER_STYLE, ...detailsContainerStyle}} >
            <h1 style={HEADLINE_STYLE} >
              FIND YOUR FAVOURITE EVENTS.
            </h1>
            <p style={PARAGRAPH_STYLE} >{paragraph}</p>
            <AccentTextButton
              style={JOIN_BUTTON_STYLE}
              label='Become a member'
              labelStyle={JOIN_BUTTON_LABEL_STYLE}
              onClick={this.props.onJoinButton}
            />
          </div>
        </div>);
    } else {
      const { loggedContainerStyle, detailsNoEventsContainerStyle } = (() => {
        if (this.props.displayMode === DisplayMode.DESKTOP) {
          return {
            loggedContainerStyle: DESKTOP_LOGGED_CONTAINER_STYLE,
            detailsNoEventsContainerStyle: DESKTOP_DETAILS_NO_EVENTS_CONTAINER_STYLE
          };
        }
        if (this.props.displayMode === DisplayMode.TABLET) {
          return {
            loggedContainerStyle: TABLET_LOGGED_CONTAINER_STYLE,
            detailsNoEventsContainerStyle: TABLET_DETAILS_NO_EVENTS_CONTAINER_STYLE
          };
        }
        return {
          loggedContainerStyle: MOBILE_LOGGED_CONTAINER_STYLE,
          detailsNoEventsContainerStyle: MOBILE_DETAILS_NO_EVENTS_CONTAINER_STYLE
        };
      })();
      if (!this.props.eventTagList || this.props.eventTagList.length === 0) {
        return (
          <div style={{...LOGGED_CONTAINER_STYLE, ...CONTAINER_NO_EVENTS}} >
            <div
                style={{...DETAILS_NO_EVENTS_CONTAINER_STYLE,
                  ...detailsNoEventsContainerStyle}}
            >
              Welcome Back, {this.props.account.userName}!
            </div>
          </div>);
      }
      return (
        <div style={{...LOGGED_CONTAINER_STYLE, ...loggedContainerStyle}} >
          <AttendanceRecord
            account={this.props.account}
            displayMode={this.props.displayMode}
            pastEventList={this.props.eventTagList}
            totalNumberOfEvents={this.props.totalEventsThisMonth}
          />
        </div>);
    }
  }
}

// Loggedin related styles
const LOGGED_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  backgroundImage: 'url(resources/home_page/illustrations/background-hero-wave.svg)',
  backgroundSize: 'cover',
  backgroundColor: '#F26B55',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left center'
};

const DESKTOP_LOGGED_CONTAINER_STYLE: React.CSSProperties = {
  minHeight: '367px'
};

const TABLET_LOGGED_CONTAINER_STYLE: React.CSSProperties = {
  minHeight: '367px'
};

const MOBILE_LOGGED_CONTAINER_STYLE: React.CSSProperties = {
  minHeight: '400px'
};

// Logged in but no events styles
const CONTAINER_NO_EVENTS: React.CSSProperties = {
  height: '151px'
};

const DETAILS_NO_EVENTS_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: 'transparent',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '32px',
  lineHeight: '47px',
  textAlign: 'center',
  color: '#FFFFFF',
  height: '47px',
  marginTop: '74px'
};

const DESKTOP_DETAILS_NO_EVENTS_CONTAINER_STYLE: React.CSSProperties = {
  width: '1030px',
  marginLeft: '20px',
  marginRight: '20px'
};

const TABLET_DETAILS_NO_EVENTS_CONTAINER_STYLE: React.CSSProperties = {
  width: '702px',
  marginLeft: '33px',
  marginRight: '33px'
};

const MOBILE_DETAILS_NO_EVENTS_CONTAINER_STYLE: React.CSSProperties = {
  width: '335px',
  marginLeft: '20px',
  marginRight: '20px'
};

// Not Loggedin related styles
const CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  backgroundImage: 'url(resources/home_page/illustrations/background-hero-big.jpg)',
  backgroundSize: 'cover',
  backgroundColor: '#F24D3D',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left center'
};

const DESKTOP_CONTAINER_STYLE: React.CSSProperties = {
  height: '615px'
};

const TABLET_CONTAINER_STYLE: React.CSSProperties = {
  height: '615px'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  height: '575px'
};

const DETAILS_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  backgroundColor: 'transparent',
  color: '#FFFFFF'
};

const DESKTOP_DETAILS_CONTAINER_STYLE: React.CSSProperties = {
  width: '1032px',
  marginLeft: '20px',
  marginRight: '20px',
  marginTop: '271px',
  gap: '20px'
};

const TABLET_DETAILS_CONTAINER_STYLE: React.CSSProperties = {
  width: '702px',
  marginLeft: '33px',
  marginRight: '33px',
  marginTop: '302px',
  gap: '23px'
};

const MOBILE_DETAILS_CONTAINER_STYLE: React.CSSProperties = {
  width: '335px',
  marginLeft: '20px',
  marginRight: '20px',
  marginTop: '299px',
  gap: '15px'
};

const HEADLINE_STYLE: React.CSSProperties = {
  maxWidth: '362px',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '26px',
  lineHeight: '39px',
  textTransform: 'uppercase',
  textShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
  margin: '0',
  padding: '0'
};

const PARAGRAPH_STYLE: React.CSSProperties = {
  maxWidth: '400px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '20px',
  lineHeight: '25px',
  overflowWrap: 'break-word',
  margin: '0px',
  padding: '0px',
  textShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)'
};

const JOIN_BUTTON_STYLE: React.CSSProperties = {
  width: '173px',
  height: '35px'
};

const JOIN_BUTTON_LABEL_STYLE: React.CSSProperties = {
  fontSize: '12px',
  lineHeight: '15px',
  height: '15px'
};
