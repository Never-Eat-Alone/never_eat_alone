import * as React from 'react';
import { PasswordAnalyzer, PasswordInputField, PrimaryTextButton } from
  '../../components';
import { DisplayMode } from '../../definitions';
import { getPasswordChecks, getPasswordChecksScore } from '../../utilities';

interface Properties {
  displayMode: DisplayMode;

  /** the user display name. */
  displayName: string;

  /** The source address of the user profile image. */
  profileImageSrc: string;

  /** The error code on the Reset Password Page. */
  errorCode: ResetPasswordPage.ErrorCode;

  /** Indicates the save and login button is clicked. */
  onSaveClick: (newPAssword: string) => void;
}

interface State {
  password: string;
  confirmPassword: string;
  hasChanged: boolean;
}

/** The page that users can enter their new password in and save it. */
export class ResetPasswordPage extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      password: '',
      confirmPassword: '',
      hasChanged: false
    };
  }

  public render(): JSX.Element {
    const contentSize = this.props.displayMode === DisplayMode.MOBILE &&
      MOBILE_CONTENT_SIZE_STYLE || CONTENT_SIZE_STYLE;
    const checks = getPasswordChecks(this.state.password,
      this.state.confirmPassword);
    const score = getPasswordChecksScore(checks);
    const errorMessage = (() => {
      if (this.props.errorCode === ResetPasswordPage.ErrorCode.NO_CONNECTION) {
        return 'Looks like our server is offline. Please try again later.';
      }
      if (!this.state.hasChanged) {
        return '';
      }
      if (this.state.password.length === 0 ||
          this.state.confirmPassword.length === 0) {
        return 'Fill the required field.';
      }
      if (!checks.doesConfirmationMatch) {
        return 'Please make sure your passwords match.';
      }
      return '';
    })();
    return (
      <div style={CONTAINER_STYLE} >
        <div style={{...CONTENT_STYLE, ...contentSize}} >
          <h1 style={HEADING_STYLE} >Reset Password</h1>
          <div style={PROFILE_IMAGE_CONTAINER_STYLE} >
            <img
              style={PROFILE_IMAGE_STYLE}
              src={this.props.profileImageSrc}
              alt='Profile Image'
            />
          </div>
          <div style={DISPLAY_NAME_STYLE} >{this.props.displayName}</div>
          <div style={DESCRIPTION_STYLE} >
            Hi {this.props.displayName}! Let’s help you set up a new password:
          </div>
          <PasswordInputField
            style={INPUT_FIELD_STYLE}
            placeholder='Your New Password (8 characters min.)'
            onChange={this.handlePasswordChange}
            hasError={this.state.password.length === 0 &&
              this.state.hasChanged}
          />
          <PasswordAnalyzer
            score={score}
            hasUpperCase={checks.isMixedCase}
            hasLowerCase={checks.hasLowerCase}
            hasNumber={checks.hasNumbers}
            hasMin8Character={checks.hasMinCharacters}
            hasSpecialCharacter={checks.hasSpecialCharacter}
            style={PASSWORD_ANALYZER_STYLE}
          />
          <div style={CONFIRM_TITLE_STYLE} >Confirm New Password:</div>
          <PasswordInputField
            style={INPUT_FIELD_STYLE}
            placeholder='Confirm New Password'
            onChange={this.handleConfirmChange}
            hasError={(this.state.confirmPassword.length === 0 ||
              !checks.doesConfirmationMatch) && this.state.hasChanged}
          />
          <div style={ERROR_MESSAGE_STYLE} >{errorMessage}</div>
          <PrimaryTextButton
            style={SAVE_BUTTON_STYLE}
            label='Save and Log in'
            onClick={() => this.props.onSaveClick(this.state.password)}
            disabled={this.props.errorCode ===
              ResetPasswordPage.ErrorCode.NO_CONNECTION ||
              this.state.password.length < 9 ||
              this.state.confirmPassword.length === 0 ||
              !checks.doesConfirmationMatch}
          />
        </div>
      </div>);
  }

  private handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>
    ) => {
  this.setState({ password: event.target.value, hasChanged: true });
  }

  private handleConfirmChange = (event: React.ChangeEvent<HTMLInputElement>
    ) => {
  this.setState({ confirmPassword: event.target.value, hasChanged: true });
  }
}

export namespace ResetPasswordPage {
  export enum ErrorCode {
    NO_CONNECTION,
    NONE
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#FFFFFF',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '60px 10px 60px 10px'
};

const CONTENT_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  backgroundColor: '#F6F6F6',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  borderRadius: '4px'
};

const CONTENT_SIZE_STYLE: React.CSSProperties = {
  width: '410px',
  padding: '50px'
};

const MOBILE_CONTENT_SIZE_STYLE: React.CSSProperties = {
  width: '351px',
  padding: '20px'
};

const HEADING_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0px',
  margin: '0px',
  height: '53px',
  width: '100%',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '36px',
  lineHeight: '53px',
  textTransform: 'uppercase',
  color: '#000000'
};

const PROFILE_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '68px',
  marginTop: '30px'
};

const PROFILE_IMAGE_STYLE: React.CSSProperties = {
  width: '68px',
  height: '100%',
  minHeight: '68px',
  backgroundColor: 'transparent',
  borderRadius: '50%',
  overflow: 'hidden',
  objectFit: 'cover'
};

const DISPLAY_NAME_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '18px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#C67E14',
  marginTop: '10px'
};

const DESCRIPTION_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  height: '18px',
  color: '#000000',
  width: '100%',
  marginTop: '30px',
  marginBottom: '30px'
};

const INPUT_FIELD_STYLE: React.CSSProperties = {
  width: '100%'
};

const PASSWORD_ANALYZER_STYLE: React.CSSProperties = {
  marginTop: '7px'
};

const CONFIRM_TITLE_STYLE: React.CSSProperties = {
  marginTop: '30px',
  height: '18px',
  width: '100%',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  marginBottom: '5px'
};

const ERROR_MESSAGE_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '18px',
  width: '100%',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  textAlign: 'center',
  color: '#FF2C79'
};

const SAVE_BUTTON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '35px',
  marginTop: '5px'
};
