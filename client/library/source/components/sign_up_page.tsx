import * as React from 'react';
import { PrimaryTextButton } from '../components';
import { DisplayMode } from '../definitions';
import { RedNavLink } from './nav_link';
import { PasswordInputField } from './input_field';
import { PasswordAnalyzer } from './password_analyzer';

interface Properties {
  displayMode: DisplayMode;

  /** The email user requested an account for. */
  email: string;

  /** The password user entered. */
  password: string;

  /** Indicates the sign up button is clicked. */
  onSignUp: () => void;
}

interface State {
  password: string;
}

export class SignUpPage extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      password: this.props.password || ''
    };
  }

  public render(): JSX.Element {
    const containerStyle = (this.props.displayMode === DisplayMode.MOBILE &&
      MOBILE_CONTENT_CONTAINER_STYLE || CONTENT_CONTAINER_STYLE);
    const contentStyle = (this.props.displayMode === DisplayMode.MOBILE &&
      MOBILE_CONTENT_STYLE || CONTENT_STYLE);
    const content = ((containerStyle: React.CSSProperties,
        contentStyle: React.CSSProperties) => {
      return (
        <div style={containerStyle} >
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
                placeholder='Your Password (8 characters min.)'
                onChange={this.handlePasswordChange}
              />
              <PasswordAnalyzer password={this.state.password}
                style={PASSWORD_ANALYZER_STYLE}
              />
              <div style={CONFIRM_TITLE_STYLE} >Confirm Password:</div>
              <PasswordInputField placeholder='Confirm Password' />
            </div>
            <PrimaryTextButton
              style={SIGN_UP_BUTTON_STYLE}
              label='Sign Up'
              onClick={this.props.onSignUp}
            />
            <div style={TERMS_CONTAINER_STYLE} >
              By clicking “Sign Up,” you agree to NeverEatAlone’s&nbsp;
              <RedNavLink style={LINK_STYLE} to='/terms_of_service'
                label='Terms of Service' />
              &nbsp;and&nbsp;
              <RedNavLink style={LINK_STYLE} to='/privacy_policy'
                label='Privacy Policy' />.
            </div>
          </div>
        </div>);
    })(containerStyle, contentStyle);
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
    this.setState({ password: event.target.value });
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backgroundImage: 'url(resources/sign_up_page/illustrations/wave.svg)',
  backgroundSize: 'cover',
  backgroundColor: '#F6F6F6',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left center'
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

const MOBILE_CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  borderRadius: '4px',
  width: '100%',
  height: '100%',
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
  width: '100%'
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

const SIGN_UP_BUTTON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '35px',
  marginTop: '20px'
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

const PASSWORD_ANALYZER_STYLE: React.CSSProperties = {
  marginTop: '7px',
  marginBottom: '30px'
};
