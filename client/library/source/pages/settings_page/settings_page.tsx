import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import { DisplayMode } from '../../definitions';
import { Tab } from './tab';

interface Properties {
  displayMode: DisplayMode;
}

interface State {
  activeTab: SettingsPage.Tab
}

/** Displays the Settings Page. */
export class SettingsPage extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      activeTab: SettingsPage.Tab.ACCOUNT_INFORMATION
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
    const tabContent = (() => {
      switch (this.state.activeTab) {
        case SettingsPage.Tab.ACCOUNT_INFORMATION:
          return (
            <div>
              Account Info
            </div>);
        case SettingsPage.Tab.NOTIFICATIONS:
          return (
            <div>
              Notifications
            </div>);
        case SettingsPage.Tab.PAYMENT_METHODS:
          return (
            <div>
              Payment method
            </div>);
        case SettingsPage.Tab.PAYMENT_HISTORY:
          return (
            <div>
              Payment history
            </div>);
      }
    })();
    return (
      <div style={containerStyle} >
        <div style={contentStyle} >
          <h1 style={HEADING_STYLE} >Settings</h1>
          <div style={TABS_ROW_STYLE} >
            <Tab
              key='Account_Information'
              label='Account Information'
              imgSrc='resources/icons/account.svg'
              style={ACCOUNT_TAB_STYLE}
              isActive={this.state.activeTab ===
                SettingsPage.Tab.ACCOUNT_INFORMATION}
              onClick={() => this.handleTabClick(
                SettingsPage.Tab.ACCOUNT_INFORMATION)}
            />
            <Tab
              key='Notifications'
              label='Notifications'
              imgSrc='resources/icons/notifications.svg'
              style={GREY_BORDER_STYLE}
              isActive={this.state.activeTab ===
                SettingsPage.Tab.NOTIFICATIONS}
              onClick={() => this.handleTabClick(
                SettingsPage.Tab.NOTIFICATIONS)}
            />
            <Tab
              key='Payment_Method'
              label='Payment Method'
              imgSrc='resources/icons/payment_method.svg'
              style={GREY_BORDER_STYLE}
              isActive={this.state.activeTab ===
                SettingsPage.Tab.PAYMENT_METHODS}
              onClick={() => this.handleTabClick(
                SettingsPage.Tab.PAYMENT_METHODS)}
            />
            <Tab
              key='Payment_History'
              label='Payment History'
              imgSrc='resources/icons/payment_history.svg'
              style={PAYMENY_HISTORY_TAB_STYLE}
              isActive={this.state.activeTab ===
                SettingsPage.Tab.PAYMENT_HISTORY}
              onClick={() => this.handleTabClick(
                SettingsPage.Tab.PAYMENT_HISTORY)}
            />
          </div>
          {tabContent}
        </div>
      </div>);
  }

  private handleTabClick = (tab: SettingsPage.Tab) => {
    this.setState({ activeTab: tab });
  }
}

export namespace SettingsPage {
  export enum Tab {
    ACCOUNT_INFORMATION,
    NOTIFICATIONS,
    PAYMENT_METHODS,
    PAYMENT_HISTORY
  }
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
  height: '45px',
  marginTop: '50px'
};

const ACCOUNT_TAB_STYLE: React.CSSProperties = {
  borderRadius: '4px 0px 0px 4px'
};

const GREY_BORDER_STYLE: React.CSSProperties = {
  borderLeft: '1px solid #EFEFEF'
};

const PAYMENY_HISTORY_TAB_STYLE: React.CSSProperties = {
  ...GREY_BORDER_STYLE,
  borderRadius: '0px 4px 4px 0px'
};
