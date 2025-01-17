import * as React from 'react';
import { PasswordAnalyzer, PasswordInputField, PrimaryTextButton, RedNavLink
} from '../../components';
import { DisplayMode } from '../../definitions';
import { getPasswordChecks, getPasswordChecksScore } from '../../utilities';

interface Properties {
  displayMode: DisplayMode;

  /** The email user requested an account for. */
  email: string;

  password: string;

  /** The error code on the sign up page. */
  errorCode: SignUpPage.ErrorCode;

  /** Indicates the sign up button is clicked. */
  onSignUp: (password: string) => void;
}

interface State {
  password: string;
  confirmPassword: string;
  hasChanged: boolean;
}

export class SignUpPage extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      password: this.props.password,
      confirmPassword: this.props.password,
      hasChanged: false
    };
  }

  public render(): JSX.Element {
    const contentContainerStyle = (this.props.displayMode ===
      DisplayMode.MOBILE && MOBILE_CONTAINER_STYLE || CONTENT_CONTAINER_STYLE);
    const contentStyle = (this.props.displayMode === DisplayMode.MOBILE &&
      MOBILE_CONTENT_STYLE || CONTENT_STYLE);
    const checks = getPasswordChecks(this.state.password,
      this.state.confirmPassword);
    const score = getPasswordChecksScore(checks);
    const errorMessage = (() => {
      if (this.props.errorCode === SignUpPage.ErrorCode.NO_CONNECTION) {
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
    const content = ((contentContainerStyle: React.CSSProperties,
        contentStyle: React.CSSProperties) => {
      return (
        <div style={contentContainerStyle} >
          <div style={contentStyle} >
            <div style={ICON_CONTAINER_STYLE} >
              <img
                style={EMAIL_ICON_STYLE}
                src='resources/sign_up_page/icons/welcome_envelope.svg'
                alt='Welcome Icon'
              />
            </div>
            <div style={TITLE_STYLE} >Welcome to NEA!</div>
            <div style={DESCRIPTION_TEXT} >
              Your email for login is: {this.props.email}<br /><br />
              You’re almost done! Just set a password to create your account.
            </div>
            <div style={PASSWORD_CONTAINER_STYLE} >
              <div style={PASSWORD_TITLE_STYLE} >Your Password:</div>
              <PasswordInputField
                style={INPUT_FIELD_STYLE}
                placeholder='Your Password (8 characters min.)'
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
              <div style={CONFIRM_TITLE_STYLE} >Confirm Password:</div>
              <PasswordInputField
                style={INPUT_FIELD_STYLE}
                placeholder='Confirm Password'
                onChange={this.handleConfirmChange}
                hasError={(this.state.confirmPassword.length === 0 ||
                  !checks.doesConfirmationMatch) && this.state.hasChanged}
              />
            </div>
            <div style={ERROR_MESSAGE_STYLE} >{errorMessage}</div>
            <PrimaryTextButton
              style={SIGN_UP_BUTTON_STYLE}
              label='Sign Up'
              onClick={() => this.props.onSignUp(this.state.password)}
              disabled={this.props.errorCode ===
                SignUpPage.ErrorCode.NO_CONNECTION ||
                this.state.password.length < 8 ||
                this.state.confirmPassword.length === 0 ||
                !checks.doesConfirmationMatch}
            />
            <div style={TERMS_CONTAINER_STYLE} >
              By clicking “Sign Up,” you agree to NeverEatAlone’s&nbsp;
              <RedNavLink
                style={LINK_STYLE}
                to='/terms_of_use'
                label='Terms of Use'
              />
              &nbsp;and&nbsp;
              <RedNavLink
                style={LINK_STYLE}
                to='/privacy_policy'
                label='Privacy Policy'
              />.
            </div>
          </div>
        </div>);
    })(contentContainerStyle, contentStyle);
    if (this.props.displayMode === DisplayMode.MOBILE) {
      return content;
    }
    return (
      <div style={CONTAINER_STYLE} >
        {content}
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

export namespace SignUpPage {
  export enum ErrorCode {
    NO_CONNECTION,
    NONE
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  backgroundImage: 'url(resources/illustrations/wave.svg)',
  backgroundSize: 'cover',
  backgroundColor: '#F6F6F6',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left center',
  padding: '50px 100px'
};

const CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  borderRadius: '4px',
  padding: '50px 100px'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  borderRadius: '4px',
  width: '100%',
  padding: '50px 30px'
};

const CONTENT_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '310px'
};

const MOBILE_CONTENT_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%'
};

const ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '60px',
  height: '60px'
};

const EMAIL_ICON_STYLE: React.CSSProperties = {
  backgroundColor: 'transparent',
  objectFit: 'cover',
  minWidth: '60px'
};

const TITLE_STYLE: React.CSSProperties = {
  marginTop: '15px',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '26px',
  lineHeight: '39px',
  height: '39px',
  color: '#000000',
  textTransform: 'uppercase'
};

const DESCRIPTION_TEXT: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  textAlign: 'center',
  color: '#000000',
  marginTop: '15px'
};

const PASSWORD_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  marginBottom: '20px'
};

const PASSWORD_TITLE_STYLE: React.CSSProperties = {
  marginTop: '20px',
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

const SIGN_UP_BUTTON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '35px',
  marginTop: '5px'
};

const TERMS_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '100%',
  height: '26px',
  marginTop: '20px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '10px',
  lineHeight: '13px',
  textAlign: 'center',
  color: '#000000',
  whiteSpace: 'pre-wrap'
};

const LINK_STYLE: React.CSSProperties = {
  height: '13px',
  lineHeight: '13px',
  fontWeight: 400,
  width: 'auto',
  fontSize: '10px'
};
