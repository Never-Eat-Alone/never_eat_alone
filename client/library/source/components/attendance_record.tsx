import * as React from 'react';
import { DisplayMode, EventTag, User } from '../definitions';

interface Properties {

  account: User;

  displayMode: DisplayMode;

  /** List of event tags related to the user previously attended events. */
  pastEventList: EventTag[];

  /** Indicates the style. */
  style?: React.CSSProperties;
}

/** Displays the Attendance record of the user in the current month. */
export class AttendanceRecord extends React.Component<Properties> {
  public render(): JSX.Element {
    const { containerStyle } = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          containerStyle: DESKTOP_CONTAINER_STYLE,
          
        };
      }
      if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerStyle: TABLET_CONTAINER_STYLE,
          
        };
      }
      return {
        containerStyle: MOBILE_CONTAINER_STYLE,
        
      };
    })();
    return (
      <div style={{...CONTAINER_STYLE, ...containerStyle}} >
        <div style={WELCOME_ROW_STYLE} >
          <div style={FOX_IMAGE_CONTAINER_STYLE} >
            <img
              src='resources/home_page/illustrations/fox.svg'
              alt='Fox Icon'
            />
          </div>
          <div style={WELCOME_TEXT_STYLE} >Welcome back!</div>
        </div>
        <div style={TAGS_DETAILS_ROW_STYLE} >

        </div>
      </div>);
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: 'transparent',
  boxSizing: 'border-box'
};

const DESKTOP_CONTAINER_STYLE: React.CSSProperties = {
  marginTop: '83px',
  height: '215px'
};

const TABLET_CONTAINER_STYLE: React.CSSProperties = {
  marginTop: '84px',
  height: '215px'  
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  marginTop: '84px',
  width: '330px'
};

const WELCOME_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-end',
  backgroundColor: 'transparent',
  width: '100%'
};

const DESKTOP_WELCOME_ROW_STYLE: React.CSSProperties = {
  height: '88px'
};

const DESKTOP_WELCOME_ROW_STYLE: React.CSSProperties = {
  height: '88px'
};

const DESKTOP_WELCOME_ROW_STYLE: React.CSSProperties = {
  height: '88px'
};

const FOX_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '115px',
  height: '123px',
  backgroundColor: 'transparent'
};

const FOX_IMAGE_STYLE: React.CSSProperties = {
  
};

const WELCOME_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '26px',
  lineHeight: '39px',
  color: '#FFFFFF'
};

const TAGS_DETAILS_ROW_STYLE: React.CSSProperties = {
  backgroundColor: '#FFFFFF',
  height: '127px',
  width: '100%',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  borderRadius: '4px'
};
