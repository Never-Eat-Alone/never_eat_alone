import * as EmailValidator from 'email-validator';
import * as React from 'react';
import * as Router from 'react-router-dom';
import { CheckBox, CloseButton, EmailInputField, FacebookLogInButton,
  GoogleLogInButton, PasswordInputField, PrimaryTextButton,
  SecondaryTextLinkButton } from '../../components';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;
  email: string;
  password: string;
  rememberMe: boolean;

  /** The modal error code. */
  errorCode: LogInModal.ErrorCode;

  /** Indicates the close button is clicked. */
  onClose: () => void;

  /** Indicates the Log In button is clicked. */
  onLogIn: (email: string, password: string, rememberMe: boolean) => void;

  /** Indicates the google login button is clicked. */
  onGoogleLogIn: () => void;

  /** Indicates the facebook login button is clicked. */
  onFacebookLogIn: () => void;
}

interface State {
  email: string;
  password: string;
  isRememberMe: boolean;
  emailErrorCode: LogInModal.EmailErrorCode;
  passwordErrorCode: LogInModal.PasswordErrorCode;
  redirect: string;
}

/** Displays the Log In Modal. */
export class LogInModal extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      email: this.props.email,
      password: this.props.password,
      isRememberMe: this.props.rememberMe,
      emailErrorCode: LogInModal.EmailErrorCode.NONE,
      passwordErrorCode: LogInModal.PasswordErrorCode.NONE,
      redirect: null
    };
    this._containerRef = React.createRef();
  }

  public render(): JSX.Element {
    if (this.state.redirect) {
      return <Router.Redirect to={this.state.redirect} />;
    }
    const formErrorMessage = (() => {
      if (this.props.errorCode === LogInModal.ErrorCode.LOGIN_FAILED) {
        return "Your credentials didn't match our records or your account is \
          not active.";
      } else if (this.state.emailErrorCode ===
          LogInModal.EmailErrorCode.NOT_AN_EMAIL) {
        return 'Enter a valid email.';
      } else if (this.state.emailErrorCode === LogInModal.EmailErrorCode.EMPTY
          ) {
        return 'Email is required.';
      } else if (this.state.passwordErrorCode ===
          LogInModal.PasswordErrorCode.EMPTY) {
        return 'Password is required.';
      } else {
        return '';
      }
    })();
    const modalErrorMessage = (() => {
      if (this.props.errorCode === LogInModal.ErrorCode.NO_CONNECTION) {
        return 'Somethign went wrong. Please try again later.';
      }
      return '';
    })();
    const googleErrorMessage = (() => {
      if (this.props.errorCode === LogInModal.ErrorCode.GOOGLE_LOGIN_FAILED) {
        return (
          <>
            Google login failed. Please log in using your email.&nbsp;
            <SecondaryTextLinkButton
              labelStyle={FORGOT_LINK_STYLE}
              label='Learn more...'
              onClick={() => this.handleRedirect('/help')}
            />
          </>);
      }
      return null;
    })();
    const facebookErrorMessage = (() => {
      if (this.props.errorCode === LogInModal.ErrorCode.FACEBOOK_LOGIN_FAILED) {
        return (
          <>
            Facebook login failed. Please log in using your email.&nbsp;
            <SecondaryTextLinkButton
              labelStyle={FORGOT_LINK_STYLE}
              label='Learn more...'
              onClick={() => this.handleRedirect('/help')}
            />
          </>);
      }
      return '';
    })();
    const containerStyle = (this.props.displayMode === DisplayMode.MOBILE &&
      MOBILE_CONTAINER_STYLE || CONTAINER_STYLE);
    const closeButtonStyle = (this.props.displayMode === DisplayMode.MOBILE &&
      MOBILE_CLOSE_BUTTON_STYLE || CLOSE_BUTTON_STYLE);
    return (
      <div style={FORM_STYLE} >
        <div ref={this._containerRef} style={containerStyle} >
          <CloseButton
            style={closeButtonStyle}
            displayMode={this.props.displayMode}
            onClick={this.props.onClose}
          />
          <div style={LOGO_CONTAINER_STYLE} >
            <img
              style={LOGO_STYLE}
              src='resources/log_in_modal/icons/logo.svg'
              alt='NEA Logo'
            />
          </div>
          <div style={TITLE_STYLE} >LOG IN</div>
          <EmailInputField
            style={INPUT_FIELD_STYLE}
            placeholder='Your Email'
            value={this.state.email}
            hasError={this.state.emailErrorCode !==
              LogInModal.EmailErrorCode.NONE}
            onChange={this.handleEmailChange}
            onBlur={this.checkEmail}
          />
          <PasswordInputField
            style={INPUT_FIELD_STYLE}
            placeholder='Your Password'
            value={this.state.password}
            hasError={this.state.passwordErrorCode !==
              LogInModal.PasswordErrorCode.NONE}
            onChange={this.handlePasswordChange}
            onBlur={this.checkPasswordField}
          />
          <div style={ROW_CONTAINER_STYLE} >
            <CheckBox
              label='Remember Me'
              checked={this.state.isRememberMe}
              onBoxClick={this.handleRememberMe}
            />
            <SecondaryTextLinkButton
              label='Forgot password?'
              labelStyle={FORGOT_LINK_STYLE}
              onClick={() => this.handleRedirect('/forgot_password')}
            />
          </div>
          <div style={ERROR_CONTAINER_STYLE} >{formErrorMessage}</div>
          <PrimaryTextButton
            style={LOG_IN_BUTTON_STYLE}
            label='LOG IN'
            onClick={this.handleLogIn}
            disabled={this.isDisabled()}
          />
          {modalErrorMessage}
          <div style={OR_LINE_CONTAINER_STYLE} >
            <div style={OR_LINE_STYLE} >
              <span style={OR_SPAN_STYLE} >or</span>
            </div>
          </div>
          <GoogleLogInButton
            label='Log in with Google'
            onClick={this.props.onGoogleLogIn}
          />
          <div style={ERROR_CONTAINER_STYLE} >{googleErrorMessage}</div>
          <FacebookLogInButton
            label='Log in with Facebook'
            onClick={this.props.onFacebookLogIn}
          />
          <div style={ERROR_CONTAINER_STYLE} >
            {facebookErrorMessage}
          </div>
          <div style={REQUEST_ACCOUNT_ROW_STYLE} >
            Haven’t joined yet? Let’s fix this and&nbsp;
            <SecondaryTextLinkButton
              label='Request Your Account'
              labelStyle={JOIN_LINK_STYLE}
              onClick={() => this.handleRedirect('/sign_up')}
            />
          </div>
        </div>
      </div>);
  }

  public componentDidMount(): void {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  public componentDidUpdate(): void {
    if (this.state.redirect) {
      this.props.onClose();
    }
  }

  public componentWillUnmount(): void {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  private handleClickOutside: { (event: any): void } = (
      event: React.MouseEvent) => {
    if (!this._containerRef.current.contains(event.target as Node)) {
      event.preventDefault();
      event.stopPropagation();
      this.props.onClose();
    }
  }

  private handleRedirect = (path: string) => {
    this.setState({ redirect: path });
    //this.props.onClose();
  }

  private handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.target.value.trim() });
  }

  private handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>
      ) => {
    this.setState({ password: event.target.value });
  }

  private handleRememberMe = () => {
    this.setState((prevState) => ({ isRememberMe: !prevState.isRememberMe }));
  }

  private checkEmail = () => {
    if (this.state.email.length === 0) {
      this.setState({ emailErrorCode: LogInModal.EmailErrorCode.EMPTY });
      return false;
    } else if (!EmailValidator.validate(this.state.email)) {
      this.setState({ emailErrorCode: LogInModal.EmailErrorCode.NOT_AN_EMAIL});
      return false;
    } else {
      this.setState({ emailErrorCode: LogInModal.EmailErrorCode.NONE});
      return true;
    }
  }

  private checkPasswordField = () => {
    if (this.state.password.length === 0) {
      this.setState({ passwordErrorCode: LogInModal.PasswordErrorCode.EMPTY });
      return false;
    } else {
      this.setState({ passwordErrorCode: LogInModal.PasswordErrorCode.NONE });
      return true;
    }
  }

  private handleLogIn = () => {
    const isPass = this.checkPasswordField();
    const isEmail = this.checkEmail();
    if (isEmail && isPass) {
      this.props.onLogIn(this.state.email, this.state.password,
        this.state.isRememberMe);
    }
  }

  private isDisabled = () => {
    if (this.state.password.length === 0) {
      return true;
    }
    if (this.state.email.trim().length === 0) {
      return true;
    }
    if (!EmailValidator.validate(this.state.email)) {
      return true;
    }
    return false;
  }

  private _containerRef: React.RefObject<HTMLDivElement>;
}

export namespace LogInModal {
  export enum ErrorCode {
    NONE,
    NO_CONNECTION,
    LOGIN_FAILED,
    GOOGLE_LOGIN_FAILED,
    FACEBOOK_LOGIN_FAILED
  }

  export enum PasswordErrorCode {
    EMPTY,
    NONE
  }

  export enum EmailErrorCode {
    EMPTY,
    NOT_AN_EMAIL,
    NONE
  }
}

const FORM_STYLE: React.CSSProperties = {
  position: 'fixed',
  top: '0px',
  left: '0px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgb(150, 150, 150, 0.5)',
  zIndex: 1000
};

const CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '490px',
  minWidth: '490px',
  padding: '60px 90px 70px 90px',
  borderRadius: '4px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  overflow: 'hidden'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTAINER_STYLE,
  maxWidth: '375px',
  minWidth: 'auto',
  width: '100%',
  padding: '50px 33px 60px 32px'
};

const CLOSE_BUTTON_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: '20px',
  right: '20px'
};

const MOBILE_CLOSE_BUTTON_STYLE: React.CSSProperties = {
  ...CLOSE_BUTTON_STYLE,
  right: '8px'
};

const LOGO_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '50px',
  height: '43px'
};

const LOGO_STYLE: React.CSSProperties = {
  backgroundColor: 'transparent',
  minWidth: '50px',
  minHeight: '43px',
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};

const TITLE_STYLE: React.CSSProperties = {
  marginTop: '15px',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '26px',
  lineHeight: '39px',
  color: '#000000'
};

const LOG_IN_BUTTON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '35px',
  minHeight: '35px',
  marginBottom: '20px'
};

const ERROR_MESSAGE_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#FF2C79',
  textAlign: 'center',
  padding: '0px',
  margin: '0px'
};

const ERROR_CONTAINER_STYLE: React.CSSProperties = {
  ...ERROR_MESSAGE_STYLE,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  width: '100%',
  minHeight: '40px',
  paddingTop: '17px',
  paddingBottom: '5px',
  whiteSpace: 'pre-line'
};

const INPUT_FIELD_STYLE: React.CSSProperties = {
  marginTop: '20px'
};

const ROW_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '20px',
  minHeight: '20px',
  marginTop: '20px'
};

const FORGOT_LINK_STYLE: React.CSSProperties = {
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  minHeight: '18px',
  height: '100%',
  width: 'fit-content',
  minWidth: '104px'
};

const TEXT_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  height: '15px',
  width: '100%',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '15px',
  textAlign: 'center',
  color: '#000000',
  marginTop: '20px'
};

const REQUEST_ACCOUNT_ROW_STYLE: React.CSSProperties = {
  ...TEXT_STYLE,
  margin: '0px'
};

const JOIN_LINK_STYLE: React.CSSProperties = {
  fontSize: '12px',
  lineHeight: '15px',
  fontWeight: 400,
  minHeight: '15px',
  width: 'fit-content',
  minWidth: 'fit-content'
};

const OR_LINE_CONTAINER_STYLE: React.CSSProperties = {
  width: '100%',
  height: '6px',
  minHeight: '6px',
  margin: '0px 0px 27px 0px'
};

const OR_LINE_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  width: '100%',
  height: '100%',
  borderBottom: '1px solid #CCCCCC',
  textAlign: 'center',
  fontFamily: 'Roboto',
  fontSize: '11px',
  lineHeight: '13px',
  fontStyle: 'normal',
  fontWeight: 400,
  color: '#000000',
  marginLeft: '0px',
  marginRight: '0px'
};

const OR_SPAN_STYLE: React.CSSProperties = {
  position: 'absolute',
  color: '#000000',
  padding: '0px 4px',
  top: '0px',
  backgroundColor: '#FFFFFF',
  cursor: 'default'
};
