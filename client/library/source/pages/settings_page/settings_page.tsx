import * as React from 'react';
import { InputField, SecondaryTextButton } from '../../components';
import { DisplayMode, SocialAccount, SocialAccountType
} from '../../definitions';
import { LinkSocialAccountButton } from './link_social_account_button';
import { Tab } from './tab';

interface Properties {
  displayMode: DisplayMode;

  /** User's linked social acounts. */
  linkedSocialAccounts: SocialAccount[];

  /** User's displayname. */
  displayName: string;

  /** User's profile id number. */
  profileId: number;

  /** Indicates link Google account button is clicked. */
  onGoogleClick: () => void;

  /** Indicates link Facebook account button is clicked. */
  onFacebookClick: () => void;

  /** Indicates the remove social account button is clicked. */
  onRemoveLinkedAccount: (account: SocialAccount) => void;
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
    const { containerStyle, contentStyle, linkButtonRowStyle,
        socialButtonsColumnStyle, socialAccountButtonStyle, inputFieldStyle,
        idRowStyle } = (() => {
      if (this.props.displayMode === DisplayMode.MOBILE) {
        return {
          containerStyle: MOBILE_CONTAINER_STYLE,
          contentStyle: MOBILE_CONTENT_STYLE,
          linkButtonRowStyle: MOBILE_LINK_BUTTON_ROW_STYLE,
          socialButtonsColumnStyle: MOBILE_SOCIAL_BUTTONS_COLUMN_STYLE,
          socialAccountButtonStyle: MOBILE_SOCIAL_ACCOUNT_BUTTON_STYLE,
          inputFieldStyle: MOBILE_INPUT_FIELD_STYLE,
          idRowStyle: MOBILE_ID_ROW_STYLE
        };
      } else if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerStyle: CONTAINER_STYLE,
          contentStyle: TABLET_CONTENT_STYLE,
          linkButtonRowStyle: LINK_BUTTON_ROW_STYLE,
          socialButtonsColumnStyle: SOCIAL_BUTTONS_COLUMN_STYLE,
          socialAccountButtonStyle: SOCIAL_ACCOUNT_BUTTON_STYLE,
          inputFieldStyle: INPUT_FIELD_STYLE,
          idRowStyle: ID_ROW_STYLE
        };
      }
      return {
        containerStyle: CONTAINER_STYLE,
        contentStyle: DESKTOP_CONTENT_STYLE,
        linkButtonRowStyle: LINK_BUTTON_ROW_STYLE,
        socialButtonsColumnStyle: SOCIAL_BUTTONS_COLUMN_STYLE,
        socialAccountButtonStyle: SOCIAL_ACCOUNT_BUTTON_STYLE,
        inputFieldStyle: INPUT_FIELD_STYLE,
        idRowStyle: ID_INPUT_STYLE
      };
    })();
    const socialAccountButtons = [];
    if (this.props.linkedSocialAccounts &&
        this.props.linkedSocialAccounts.length !== 0) {
      let isGoogle, isFacebook = false;
      for (const account of this.props.linkedSocialAccounts) {
        if (account.accountType === SocialAccountType.GOOGLE) {
          isGoogle = true;
          socialAccountButtons.push(
            <div style={linkButtonRowStyle} >
              <LinkSocialAccountButton
                key={account.socialAccountEmail}
                style={socialAccountButtonStyle}
                account={account.socialAccountEmail}
                accountType={SocialAccountType.GOOGLE}
                onClick={this.props.onGoogleClick}
                disabled
              />
              <SecondaryTextButton
                style={REMOVE_BUTTON_STYLE}
                label='Remove'
                onClick={() => this.props.onRemoveLinkedAccount(account)}
              />
            </div>);
        } else {
          isFacebook = true;
          socialAccountButtons.push(
            <div style={linkButtonRowStyle} >
              <LinkSocialAccountButton
                key={account.socialAccountEmail}
                style={socialAccountButtonStyle}
                account={account.socialAccountEmail}
                accountType={SocialAccountType.FACEBOOK}
                onClick={this.props.onFacebookClick}
                disabled
              />
              <SecondaryTextButton
                style={REMOVE_BUTTON_STYLE}
                label='Remove'
                onClick={() => this.props.onRemoveLinkedAccount(account)}
              />
            </div>);
        }
      }
      if (!isGoogle) {
        socialAccountButtons.push(
          <LinkSocialAccountButton
            key='link_google'
            style={socialAccountButtonStyle}
            account=''
            accountType={SocialAccountType.GOOGLE}
            onClick={this.props.onGoogleClick}
            disabled={false}
          />);
      }
      if (!isFacebook) {
        socialAccountButtons.push(
          <LinkSocialAccountButton
            key='link_facebook'
            style={socialAccountButtonStyle}
            account=''
            accountType={SocialAccountType.FACEBOOK}
            onClick={this.props.onFacebookClick}
            disabled={false}
          />);
      }
    } else {
      socialAccountButtons.push(
        <LinkSocialAccountButton
          key='link_google'
          style={socialAccountButtonStyle}
          account=''
          accountType={SocialAccountType.GOOGLE}
          onClick={this.props.onGoogleClick}
          disabled={false}
        />);
      socialAccountButtons.push(
        <LinkSocialAccountButton
          key='link_facebook'
          style={socialAccountButtonStyle}
          account=''
          accountType={SocialAccountType.FACEBOOK}
          onClick={this.props.onFacebookClick}
          disabled={false}
        />);
    }
    const tabContent = (() => {
      switch (this.state.activeTab) {
        case SettingsPage.Tab.ACCOUNT_INFORMATION:
          return (
            <div style={PAGE_CONTAINER_STYLE} >
              <h1 style={PAGE_HEADING_STYLE} >Account Information</h1>
              <h2 style={SUB_HEADING_STYLE} >Linked Accounts</h2>
              <h3 style={DESCRIPTION_STYLE} >
                You can use these accounts to log in to NeverEatAlone.
              </h3>
              <div style={socialButtonsColumnStyle} >
                {socialAccountButtons}
              </div>
              <h2 style={SUB_HEADING_STYLE} >Display Name</h2>
              <h3 style={DESCRIPTION_STYLE} >Required.</h3>
              <InputField
                style={inputFieldStyle}
                type='text'
                value={this.props.displayName}
                disabled
              />
              <div style={idRowStyle} >
                www.nevereatalone.net/users/
                <InputField
                  style={ID_INPUT_STYLE}
                  value={this.props.profileId}
                  disabled
                />
              </div>
            </div>);
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

const SUB_HEADING_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '18px',
  lineHeight: '23px',
  textTransform: 'capitalize',
  color: '#000000',
  padding: '0px',
  margin: '0px 0px 2px 0px'
};

const DESCRIPTION_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  width: '100%',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '15px',
  color: '#969696',
  padding: '0px',
  margin: '0px 0px 20px 0px'
};

const SOCIAL_ACCOUNT_BUTTON_STYLE: React.CSSProperties = {
  width: '335px',
  height: '38px',
  minHeight: '38px'
};

const MOBILE_SOCIAL_ACCOUNT_BUTTON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '38px',
  minHeight: '38px'
};

const LINK_BUTTON_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  gap: '50px',
  height: '38px'
};

const MOBILE_LINK_BUTTON_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  gap: '10px'
};

const REMOVE_BUTTON_STYLE: React.CSSProperties = {
  height: '35px',
  minHeight: '35px',
  width: '116px',
  minWidth: '116px'
};

const SOCIAL_BUTTONS_COLUMN_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  gap: '10px',
  marginBottom: '30px'
};

const MOBILE_SOCIAL_BUTTONS_COLUMN_STYLE: React.CSSProperties = {
  ...SOCIAL_BUTTONS_COLUMN_STYLE,
  gap: '20px'
};

const INPUT_FIELD_STYLE: React.CSSProperties = {
  width: '335px',
  minWidth: '335px',
  height: '38px',
  minHeight: '38px',
  marginBottom: '10px'
};

const MOBILE_INPUT_FIELD_STYLE: React.CSSProperties = {
  ...INPUT_FIELD_STYLE,
  width: '100%',
  minWidth: 'auto'
};

const ID_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '335px',
  height: '38px',
  marginBottom: '20px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000'
};

const MOBILE_ID_ROW_STYLE: React.CSSProperties = {
  ...ID_ROW_STYLE,
  width: '100%',
  minWidth: 'auto'
};

const ID_INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  marginLeft: '10px'
};
