import * as React from 'react';
import { DisplayMode } from '../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** The email user requested an account for. */
  email: string;
}

export class SignUpPage extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <div style={CONTAINER_STYLE} >
        <div style={CONTENT_CONTAINER_STYLE} >
          <div style={CONTENT_STYLE} >
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
            <div style={PASSWORD_TITLE_STYLE} >Your Password:</div>
            <div>Password input field</div>
            <div style={CONFIRM_TITLE_STYLE} >Confirm Password:</div>
          </div>
        </div>
      </div>);
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
  width: '100%',
  height: '100%',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  borderRadius: '4px'
};

const CONTENT_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '370px'
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
  textTransform: 'capitalize'
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

const PASSWORD_TITLE_STYLE: React.CSSProperties = {
  marginTop: '20px'
};

const CONFIRM_TITLE_STYLE: React.CSSProperties = {
  marginTop: '30px'
};
