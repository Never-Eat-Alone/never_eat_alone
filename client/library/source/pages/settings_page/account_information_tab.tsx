import * as React from 'react';
import { InputField, SecondaryTextButton } from '../../components';
import { DisplayMode, SocialAccount, SocialAccountType
} from '../../definitions';
import { LinkSocialAccountButton } from './link_social_account_button';

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
  isEditDisplayName: boolean;
  isEditEmail: boolean;
  isEditPassword: boolean;
  isDeactivate: boolean;
}

/** Dislays the account information tab content on the setting page. */
export class AccountInformationTab extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isEditDisplayName: false,
      isEditEmail: false,
      isEditPassword: false,
      isDeactivate: false
    };
  }

  public render(): JSX.Element {
    const { linkButtonRowStyle, socialButtonsColumnStyle,
        socialAccountButtonStyle, inputFieldStyle, idRowStyle,
        inputEditRowStyle } = (() => {
      if (this.props.displayMode === DisplayMode.MOBILE) {
        return {
          linkButtonRowStyle: MOBILE_LINK_BUTTON_ROW_STYLE,
          socialButtonsColumnStyle: MOBILE_SOCIAL_BUTTONS_COLUMN_STYLE,
          socialAccountButtonStyle: MOBILE_SOCIAL_ACCOUNT_BUTTON_STYLE,
          inputFieldStyle: MOBILE_INPUT_FIELD_STYLE,
          idRowStyle: MOBILE_ID_ROW_STYLE,
          inputEditRowStyle: MOBILE_INPUT_EDIT_ROW_STYLE
        };
      } else if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          linkButtonRowStyle: LINK_BUTTON_ROW_STYLE,
          socialButtonsColumnStyle: SOCIAL_BUTTONS_COLUMN_STYLE,
          socialAccountButtonStyle: SOCIAL_ACCOUNT_BUTTON_STYLE,
          inputFieldStyle: INPUT_FIELD_STYLE,
          idRowStyle: ID_ROW_STYLE,
          inputEditRowStyle: INPUT_EDIT_ROW_STYLE
        };
      }
      return {
        linkButtonRowStyle: LINK_BUTTON_ROW_STYLE,
        socialButtonsColumnStyle: SOCIAL_BUTTONS_COLUMN_STYLE,
        socialAccountButtonStyle: SOCIAL_ACCOUNT_BUTTON_STYLE,
        inputFieldStyle: INPUT_FIELD_STYLE,
        idRowStyle: ID_ROW_STYLE,
        inputEditRowStyle: INPUT_EDIT_ROW_STYLE
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
        <SecondaryTextButton
          style={EDIT_BUTTON_STYLE}
          label='Edit'
          onClick={this.props.onEditDisplayNameClick}
        />
        <h2 style={SUB_HEADING_STYLE} >Email</h2>
        <div style={inputEditRowStyle} >
          <InputField
            style={inputFieldStyle}
            type='email'
            value={this.props.email}
            disabled
          />
          <SecondaryTextButton
            style={EDIT_BUTTON_STYLE}
            label='Edit'
            onClick={this.props.onEditEmailClick}
          />
        </div>
        <h2 style={SUB_HEADING_STYLE} >Password</h2>
        <div style={inputEditRowStyle} >
          <InputField
            style={inputFieldStyle}
            type='password'
            value={this.props.password}
            disabled
          />
          <SecondaryTextButton
          style={EDIT_BUTTON_STYLE}
          label='Edit'
          onClick={this.props.onEditPasswordClick}
        />
        </div>
      </div>);
  }
}

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

const INPUT_EDIT_ROW_STYLE: React.CSSProperties = {
  ...LINK_BUTTON_ROW_STYLE
};

const MOBILE_INPUT_EDIT_ROW_STYLE: React.CSSProperties = {
  ...MOBILE_LINK_BUTTON_ROW_STYLE,
  gap: '20px'
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
  width: '100%'
};

const ID_INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  marginLeft: '10px'
};

const EDIT_BUTTON_STYLE: React.CSSProperties = {
  width: '96px',
  minWidth: '96px',
  height: '35px',
  minHeight: '35px',
  marginBottom: '30px'
};
