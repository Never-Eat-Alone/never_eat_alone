import * as React from 'react';
import { DisplayMode, SocialAccount } from '../../definitions';
import { AccountInformationTab } from './account_information_tab';
import { Tab } from './tab';

interface Properties {
  displayMode: DisplayMode;

  /** User's linked social acounts. */
  linkedSocialAccounts: SocialAccount[];

  /** User's displayname. */
  displayName: string;

  /** User's profile id number. */
  profileId: number;

  /** User's email. */
  email: string;

  /** User's password. */
  password: string;

  /** Indicates link Google account button is clicked. */
  onGoogleClick: () => void;

  /** Indicates link Facebook account button is clicked. */
  onFacebookClick: () => void;

  /** Indicates the remove social account button is clicked. */
  onRemoveLinkedAccount: (account: SocialAccount) => void;

  /** Indicates the edit button regarding the displayname section is clicked. */
  onEditDisplayNameClick: () => void;

  /** Indicates the edit button regarding the email is clicked. */
  onEditEmailClick: () => void;

  /** Indicates the edit button regarding the password is clicked. */
  onEditPasswordClick: () => void;

  /** Indicates the deactivate account button is clicked. */
  onDeactivateAccount: () => void;

  /** Indicates the delete account button is clicked. */
  onDeleteAccount: () => void;
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
          return <AccountInformationTab {...this.props} />;
        case SettingsPage.Tab.NOTIFICATIONS:
          return (
            <div style={PAGE_CONTAINER_STYLE} >
              <h1 style={PAGE_HEADING_STYLE} >Notifications</h1>
            </div>);
        case SettingsPage.Tab.PAYMENT_METHODS:
          return (
            <div style={PAGE_CONTAINER_STYLE} >
              <h1 style={PAGE_HEADING_STYLE} >Payment Method</h1>
            </div>);
        case SettingsPage.Tab.PAYMENT_HISTORY:
          return (
            <div style={PAGE_CONTAINER_STYLE} >
              <h1 style={PAGE_HEADING_STYLE} >Payment History</h1>
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

const PAGE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  paddingTop: '50px',
  paddingBottom: '90px',
  backgroundColor: '#FFFFFF'
};

const PAGE_HEADING_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '23px',
  lineHeight: '34px',
  height: '34px',
  textTransform: 'capitalize',
  color: '#000000',
  margin: '0px 0px 30px 0px',
  padding: '0px'
};
