import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import * as Router from 'react-router-dom';
import { DisplayMode, EventTag, User } from '../definitions';

interface Properties {

  account: User;

  displayMode: DisplayMode;

  /** List of event tags related to the user previously attended events. */
  pastEventList: EventTag[];

  /** Indicates the style. */
  style?: any;
}

/** Displays the dining event card. */
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

      </div>);
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: 'transparent',
  marginTop: '83px',
  boxSizing: 'border-box'
};

const DESKTOP_CONTAINER_STYLE: React.CSSProperties = {
  width: '681px',
  height: '215px'
};

const TABLET_CONTAINER_STYLE: React.CSSProperties = {
  width: '681px',
  height: '215px'  
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  width: '330px',
  height: '286px'
};
