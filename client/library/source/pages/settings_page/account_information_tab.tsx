import * as React from 'react';
import { BackButton, CheckBox, InputField, SecondaryTextButton,
  SecondaryTextLinkButton, 
  PrimaryTextButton} from '../../components';
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

  page: AccountInformationTab.Page;

  isDeleteChecked: boolean;

  deleteAccountPassword: string;

  deleteAccountErrorCode: AccountInformationTab.DeleteAccountErrorCode;

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
  onDeactivateAccountButton: () => void;

  /** Indicates the delete account button is clicked. */
  onDeleteAccountPage: () => void;

  /** Indicates the delete account button is clicked that submits the delete
   * request. */
  onSubmitDeleteAccount: () => void;

  /** Indicates the deactivate/delete account button on initial page is
   * clicked.
   */
  onDeactivateAccountPageClick: () => void;

  /** Indicates the back button is clicked. */
  onBackClick: () => void;

  /** Indicates the checkbox is clicked on the delete account page. */
  onDeleteCheckboxClick: () => void;

  /** Indicates the password value changed in the inputfield. */
  onDeletePasswordChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

interface State {
  isEditDisplayName: boolean;
  isEditEmail: boolean;
  isEditPassword: boolean;
}

/** Dislays the account information tab content on the setting page. */
export class AccountInformationTab extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isEditDisplayName: false,
      isEditEmail: false,
      isEditPassword: false
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
    if (this.props.page === AccountInformationTab.Page.DEACTIVATE_DELETE) {
      return (
        <>
          <div style={DEACTIVE_ROW_CONTAINER_STYLE} >
            <BackButton onClick={this.props.onBackClick} />
            <div style={DEACTIVE_COLUMN_CONTAINER_STYLE} >
              <h1 style={DEACTIVATE_H1_STYLE} >
                Deactivate or Delete Your Account
              </h1>
              <p style={DEACTIVATE_GREY_TEXT_STYLE} >Settings</p>
            </div>
          </div>
          <h2 style={DEACTIVE_H2_STYLE} >Deactivate Account</h2>
          <p style={DEACTIVE_P_STYLE} >
            If you want to take a break from NeverEatAlone, you can 
            deactivate your account. If you deactivate your account:{'\n\n'}
          </p>
          <ul style={UL_STYLE} >
            <li style={LI_STYLE} >
              Your profile will be hidden from public access.
            </li>
            <li style={LI_STYLE} >
              Your seat(s) will be removed from the attendee lists of 
              any upcoming events.
            </li>
            <li style={LI_STYLE} >
              Past events will no longer link to your profile.
            </li>
          </ul>
          <p style={DEACTIVE_P_STYLE} >
            {'\n'}
            Your account will reactivate when you log in again. All links 
            will be restored when you reactivate your account.
          </p>
          <SecondaryTextButton
            style={DEACTIVATE_BUTTON_STYLE}
            label='Deactivate Account'
            onClick={this.props.onDeactivateAccountButton}
          />
          <h2 style={DELETE_H2_STYLE} >Delete Account</h2>
          <p style={DEACTIVE_P_STYLE} >
            Deleting your account is a permanent action and cannot be undone. 
            Your information and account will be completely removed from 
            NeverEatAlone.{'\n\n'}
            If you delete your account:{'\n\n'}
          </p>
          <ul style={UL_STYLE}>
            <li style={LI_STYLE} >
              Your email and handle will be available for new accounts to use.
            </li>
            <li style={LI_STYLE} >
              All socials will be unlinked.
            </li>
            <li style={LI_STYLE} >
              Your seat(s) will be removed from the attendee lists of any 
              upcoming events.
            </li>
            <li style={LI_STYLE} >
              Any mentions of you on your past events will be replaced with 
              “Deleted User.”
            </li>
            <li style={LI_STYLE} >
              Your profile will be removed.
            </li>
          </ul>
          <p style={DEACTIVE_P_STYLE} >
            {'\n'}
            <b>NeverEatAlone will remove your account within 15 days and your 
              account will not be recoverable. </b>If you wish to return to 
              NeverEatAlone, you’ll need to create a new account.
          </p>
          <SecondaryTextLinkButton
            style={DELETE_LINK_STYLE}
            label='Delete Account'
            onClick={this.props.onDeleteAccountPage}
          />
        </>);
    }
    if (this.props.page === AccountInformationTab.Page.DELETE) {
      const errorMessage = (() => {
        if (this.props.deleteAccountErrorCode !==
            AccountInformationTab.DeleteAccountErrorCode.NONE) {
          return 'Something went wrong. Please try again later.';
        }
        return '';
      })();
      return (
        <>
          <div style={DELETE_ROW_CONTAINER_STYLE} >
            <BackButton onClick={this.props.onBackClick} />
            <h1 style={DELETE_H1_STYLE} >DELETE ACCOUNT</h1>
          </div>
          <div style={DELETE_ROW_CONTAINER_STYLE} >
            <div style={WARNING_ICON_CONTAINER_STYLE} >
              <img
                style={WARNING_ICON_STYLE}
                src='resources/icons/warning.svg'
                alt='Warning Icon'
              />
            </div>
            <p style={PINK_TEXT_STYLE} >
              Are you sure you want to delete your account? This is a permanent 
              action and cannot be undone.
            </p>
          </div>
          <div style={DELETE_P_STYLE} >
            If you delete your account, all information associated with your 
            profile will be removed from NeverEatAlone.{'\n\n'}
            Your email and handle will be available for new accounts to use.
          </div>
          <div style={CHECKBOX_ROW_CONTAINER_STYLE} >
            <CheckBox
              label='Yes, I want to permanently remove my account from NeverEatAlone.'
              checked={this.props.isDeleteChecked}
              onBoxClick={this.props.onDeleteCheckboxClick}
            />
          </div>
          <p style={DEACTIVATE_GREY_TEXT_STYLE} >Enter Password</p>
          <InputField
            style={DELETE_INPUT_STYLE}
            type='password'
            value={this.props.deleteAccountPassword}
            onChange={this.props.onDeletePasswordChange}
          />
          <div style={DELETE_BUTTONS_CONTAINER_STYLE} >
            <PrimaryTextButton
              style={SUBMIT_DELETE_BUTTON_STYLE}
              label='Delete Account'
              onClick={this.props.onSubmitDeleteAccount}
              disabled={!this.props.isDeleteChecked ||
                this.props.deleteAccountPassword === ''}
            />
            <SecondaryTextButton
              style={DELETE_CANCEL_BUTTON_STYLE}
              label='Cancel'
              onClick={this.props.onBackClick}
            />
          </div>
          <div style={ERROR_STYLE} >{errorMessage}</div>
        </>);
    }
    if (this.props.page === AccountInformationTab.Page.DEACTIVATE_CONFIRMED) {
      return (
        <>
        </>);
    }
    if (this.props.page === AccountInformationTab.Page.DEACTIVATE_REASON_SENT) {
      return (
        <>
        </>);
    }
    const socialAccountButtons = [];
    if (this.props.linkedSocialAccounts?.length !== 0) {
      let isGoogle, isFacebook = false;
      for (const account of this.props.linkedSocialAccounts) {
        if (account.provider === SocialAccountType.GOOGLE) {
          isGoogle = true;
          socialAccountButtons.push(
            <div
                key={account.email + 'Google'}
                style={linkButtonRowStyle}
            >
              <LinkSocialAccountButton
                style={socialAccountButtonStyle}
                account={account.email}
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
            <div
                key={account.email + 'Facebook'}
                style={linkButtonRowStyle}
            >
              <LinkSocialAccountButton
                style={socialAccountButtonStyle}
                account={account.email}
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
      <>
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
          https://nevereatalone.net/users/profile/
          <InputField
            style={ID_INPUT_STYLE}
            value={this.props.profileId}
            disabled
          />
        </div>
        <SecondaryTextButton
          style={EDIT_DISPLAYNAME_BUTTON_STYLE}
          label='Edit'
          onClick={this.props.onEditDisplayNameClick}
        />
        <h2 style={SUB_HEADING_STYLE} >Email</h2>
        <h3 style={DESCRIPTION_STYLE} >Required.</h3>
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
        <h3 style={DESCRIPTION_STYLE} >Required.</h3>
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
        <h2 style={DEACTIVATE_HEADING_STYLE} >
          Looking To Deactivate or Delete your account?
        </h2>
        <h3 style={DESCRIPTION_STYLE} >
          Click the link below to be redirected.
        </h3>
        <SecondaryTextLinkButton
          labelStyle={DEACTIVE_LINK_STYLE}
          label='Deactivate or Delete your account'
          onClick={this.props.onDeactivateAccountPageClick}
        />
      </>);
  }
}

export namespace AccountInformationTab {
  export enum Page {
    INITIAL,
    DEACTIVATE_DELETE,
    DELETE,
    DEACTIVATE_CONFIRMED,
    DEACTIVATE_REASON_SENT
  }

  export enum DeleteAccountErrorCode {
    NONE,
    NO_CONNECTION,
    WRONG_PASSWORD
  }
}

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
  ...LINK_BUTTON_ROW_STYLE,
  marginBottom: '30px'
};

const MOBILE_INPUT_EDIT_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  gap: '20px',
  marginBottom: '30px'
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
  minHeight: '38px'
};

const MOBILE_INPUT_FIELD_STYLE: React.CSSProperties = {
  ...INPUT_FIELD_STYLE,
  width: '100%',
  minWidth: '100%'
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
  color: '#000000',
  marginTop: '10px'
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
  minHeight: '35px'
};

const DEACTIVATE_HEADING_STYLE: React.CSSProperties = {
  ...SUB_HEADING_STYLE,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  marginTop: '20px'
};

const DEACTIVE_LINK_STYLE: React.CSSProperties = {
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  height: '18px',
  color: '#F26B55'
};

const EDIT_DISPLAYNAME_BUTTON_STYLE: React.CSSProperties = {
  ...EDIT_BUTTON_STYLE,
  marginBottom: '30px'
};

const DEACTIVE_ROW_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '10px',
  width: '100%',
  marginBottom: '30px'
};

const DEACTIVE_COLUMN_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '4px'
};

const DEACTIVATE_H1_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  whiteSpace: 'pre-line',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '26px',
  lineHeight: '39px',
  textTransform: 'capitalize',
  color: '#000000',
  padding: '0px',
  margin: '0px',
  width: '100%'
};

const DEACTIVATE_GREY_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#969696',
  margin: '0px',
  padding: '0px'
};

const DEACTIVE_H2_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '18px',
  lineHeight: '23px',
  color: '#000000',
  padding: '0px',
  margin: '0px 0px 10px 0px'
};

const DEACTIVE_P_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 300,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  whiteSpace: 'pre-line',
  padding: '0px',
  margin: '0px'
};

const UL_STYLE: React.CSSProperties = {
  margin: '0px',
  paddingLeft: '25px',
  listStyleType: 'disc',
  listStylePosition: 'outside'
};

const LI_STYLE: React.CSSProperties = {
  ...DEACTIVE_P_STYLE
};

const DEACTIVATE_BUTTON_STYLE: React.CSSProperties = {
  marginTop: '30px',
  minWidth: '187px',
  width: '187px',
  height: '35px',
  minHeight: '35px'
};

const DELETE_H2_STYLE: React.CSSProperties = {
  ...DEACTIVE_H2_STYLE,
  margin: '50px 0px 10px 0px'
};

const DELETE_LINK_STYLE: React.CSSProperties = {
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px',
  color: '#F24D3D',
  height: '15px',
  minHeight: '15px',
  minWidth: '92px',
  marginTop: '30px',
  textTransform: 'uppercase'
};

const DELETE_ROW_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '10px',
  width: '100%',
  marginBottom: '20px'
};

const DELETE_H1_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  whiteSpace: 'pre-line',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '23px',
  lineHeight: '34px',
  textTransform: 'uppercase',
  color: '#000000',
  padding: '0px',
  margin: '0px'
};

const WARNING_ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '20px',
  height: '20px',
  backgroundColor: 'transparent'
};

const WARNING_ICON_STYLE: React.CSSProperties = {
  width: '18px',
  minWidth: '18px',
  height: '16px',
  minHeight: '16px'
};

const PINK_TEXT_STYLE: React.CSSProperties = {
  ...DEACTIVE_P_STYLE,
  fontWeight: 600,
  color: '#FF2C79'
};

const DELETE_P_STYLE: React.CSSProperties = {
  ...DEACTIVE_P_STYLE,
  margin: '20px 0px 30px 0px',
  fontWeight: 400
};

const CHECKBOX_ROW_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '18px',
  minHeight: '18px',
  marginBottom: '30px'
};

const DELETE_INPUT_STYLE: React.CSSProperties = {
  marginTop: '5px',
  width: '297px',
  minWidth: '297px',
  height: '38px',
  minHeight: '38px',
  fontSize: '14px',
  lineHeight: '18px',
  marginBottom: '30px'
}

const DELETE_BUTTONS_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '20px'
};

const SUBMIT_DELETE_BUTTON_STYLE: React.CSSProperties = {
  width: '164px',
  minWidth: '164px',
  height: '35px',
  minHeight: '35px',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px'
};

const DELETE_CANCEL_BUTTON_STYLE: React.CSSProperties = {
  width: '113px',
  minWidth: '113px',
  height: '35px',
  minHeight: '35px',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px'
};

const ERROR_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  whiteSpace: 'pre-line',
  color: '#FF2C79',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  marginTop: '5px'
};
