import * as React from 'react';
import { CheckBox, CloseButton, EmailInputField, FacebookLogInButton,
  GoogleLogInButton, PasswordInputField, PrimaryTextButton, RedNavLink
} from '../../components';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;

  errorCode: LogInModal.ErrorCode;

  /** Indicates the close button is clicked. */
  onClose: () => void;

  /** Indicates the Log In button is clicked. */
  onLogIn: () => void;

  /** Indicates the google login button is clicked. */
  onGoogleLogInClick: () => void;

  /** Indicates the facebook login button is clicked. */
  onFacebookLogInClick: () => void;
}

interface State {
  email: string;
  password: string;
  isRememberMe: boolean;
}

/** Displays the Log In Modal. */
export class LogInModal extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isRememberMe: true
    };
  }

  public render(): JSX.Element {
    const formErrorMessage = (() => {
      if (this.props.errorCode === LogInModal.ErrorCode.LOGIN_FAILED) {
        return "Your credentials didn't match our records.";
      }
      return '';
    })();
    const modalErrorMessage = (() => {
      if (this.props.errorCode === LogInModal.ErrorCode.NO_CONNECTION) {
        return 'Somethign went wrong. Please try again later.';
      }
      return '';
    })();
    const googleErrorMessage = (() => {
      if (this.props.errorCode === LogInModal.ErrorCode.GOOGLE_LOGIN_FAILED) {
        return `Google login failed. Please log in using your email. ${
          <RedNavLink to='/help' label='Learn more...' />}`;
      }
      return '';
    })();
    const facebookErrorMessage = (() => {
      if (this.props.errorCode === LogInModal.ErrorCode.FACEBOOK_LOGIN_FAILED) {
        return `Facebook login failed. Please log in using your email. ${
          <RedNavLink to='/help' label='Learn more...' />}`;
      }
      return '';
    })();
    const containerStyle = (this.props.displayMode === DisplayMode.MOBILE &&
      MOBILE_CONTAINER_STYLE || CONTAINER_STYLE);
    return (
      <div style={containerStyle} >
        <CloseButton
          style={CLOSE_BUTTON_STYLE}
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
          onChange={this.handleEmailChange}
        />
        <PasswordInputField
          style={INPUT_FIELD_STYLE}
          placeholder='Your Password'
          value={this.state.password}
          onChange={this.handlePasswordChange}
        />
        <div style={ROW_CONTAINER_STYLE} >
          <CheckBox
            label='Remember Me'
            checked={this.state.isRememberMe}
            onBoxClick={this.handleRememberMe}
          />
          <RedNavLink
            {...this.props}
            label='Forgot password?'
            to='/forgot_password'
            style={FORGOT_LINK_STYLE}
          />
        </div>
        <div style={ERROR_CONTAINER_STYLE} >{formErrorMessage}</div>
        <PrimaryTextButton
          style={LOG_IN_BUTTON_STYLE}
          label='LOG IN'
          onClick={this.props.onLogIn}
        />
        {modalErrorMessage}
        <div style={OR_LINE_CONTAINER_STYLE} >
          <div style={OR_LINE_STYLE} >
            <span style={OR_SPAN_STYLE} >or</span>
          </div>
        </div>
        <GoogleLogInButton
          label='Log in with Google'
          onClick={this.props.onGoogleLogInClick}
        />
        <div style={SOCIAL_ERROR_CONTAINER_STYLE} >{googleErrorMessage}</div>
        <FacebookLogInButton
          label='Log in with Facebook'
          onClick={this.props.onFacebookLogInClick}
        />
        <div style={SOCIAL_ERROR_CONTAINER_STYLE} >{facebookErrorMessage}</div>
        <div style={REQUEST_ACCOUNT_ROW_STYLE} >
          Haven’t joined yet? Let’s fix this and&nbsp;
          <RedNavLink
            {...this.props}
            to='/join'
            label='Request Your Account'
            style={JOIN_LINK_STYLE}
          />
        </div>
      </div>);
  }

  private handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.target.value });
  }

  private handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>
      ) => {
    this.setState({ password: event.target.value });
  }

  private handleRememberMe = () => {
    this.setState((prevState) => ({ isRememberMe: !prevState.isRememberMe }));
  }
}

export namespace LogInModal {
  export enum ErrorCode {
    NONE,
    NO_CONNECTION,
    LOGIN_FAILED,
    GOOGLE_LOGIN_FAILED,
    FACEBOOK_LOGIN_FAILED
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '490px',
  padding: '60px 90px 70px 90px',
  borderRadius: '4px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  overflow: 'hidden'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '375px',
  padding: '50px 33px 60px 32px',
  backgroundColor: '#FFFFFF',
  borderRadius: '4px',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  overflow: 'hidden'
};

const CLOSE_BUTTON_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: '20px',
  right: '20px'
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

const MODAL_ERROR_MESSAGE_STYLE: React.CSSProperties = {
  ...ERROR_CONTAINER_STYLE,
  ...ERROR_MESSAGE_STYLE,
  margin: '0px 0px 20px 0px',
  minHeight: '18px'
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
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  width: 'fit-content',
  height: '18px'
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
  height: '100%',
  width: 'fit-content'
};

const SOCIAL_ERROR_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '100%',
  minHeight: '20px'
};

const MEDIA_ERROR_MESSAGE_STYLE: React.CSSProperties = {
  minHeight: '18px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#FF2C79',
  width: '100%',
  textAlign: 'center'
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
