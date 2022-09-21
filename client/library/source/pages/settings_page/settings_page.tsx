import * as React from 'react';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;
}

interface State {
  page: SettingsPage.Page
}

/** Displays the Settings Page. */
export class SettingsPage extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      page: SettingsPage.Page.ACCOUNT_INFORMATION
    };
  }

  render(): JSX.Element {
    const { containerStyle, contentStyle } = (() => {
      if (this.props.displayMode === DisplayMode.MOBILE) {
        return {
          containerStyle: MOBILE_CONTAINER_STYLE,
          contentStyle: MOBILE_CONTENT_STYLE
        };
      } else if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerStyle: CONTAINER_STYLE,
          contentStyle: TABLET_CONTENT_STYLE
        };
      }
      return {
        containerStyle: CONTAINER_STYLE,
        contentStyle: DESKTOP_CONTENT_STYLE
      };
    })();
    const tabs = [];

    return (
      <div style={containerStyle} >
        <div style={contentStyle} >
          <h1 style={HEADING_STYLE} >Settings</h1>
          <div style={TABS_ROW_STYLE} >

          </div>
        </div>
      </div>);
  }
}

export namespace SettingsPage {
  export enum Page {
    ACCOUNT_INFORMATION,
    NOTIFICATIONS,
    PAYMENT_METHODS,
    PAYMENT_HISTORY
  }
}

interface tabProperties {
  label: string;
}

export function tab(props: tabProperties) {
  
}

const CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  overflow: 'initial',
  padding: '50px 33px 20px 33px'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTAINER_STYLE,
  alignItems: 'flex-start'
};

const CONTENT_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start'
};

const DESKTOP_CONTENT_STYLE: React.CSSProperties = {
  ...CONTENT_STYLE,
  width: '900px'
};

const TABLET_CONTENT_STYLE: React.CSSProperties = {
  ...CONTENT_STYLE,
  width: '100%'
};

const MOBILE_CONTENT_STYLE: React.CSSProperties = {
  ...CONTENT_STYLE,
  width: '100%'
};

const HEADING_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '26px',
  lineHeight: '39px',
  textTransform: 'uppercase',
  color: '#969696',
  padding: '0px',
  margin: '0px'
};

const TABS_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  height: '45px'
};
