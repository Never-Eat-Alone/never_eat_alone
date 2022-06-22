import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';

interface Properties extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  clientId: string;
  label: string;
  onSuccess: (email: string, token: any) => void;
  style?: React.CSSProperties;
}

export class GoogleLogInButton extends React.Component<Properties> {
  constructor(props: Properties) {
    super(props);
    const scripts = document.getElementsByTagName(
      'head')[0].getElementsByTagName('script');
    let isPlatform = false;
    for (let i =0; i< scripts.length; i++) {
      const script = scripts[i];
      if (script.src === 'https://apis.google.com/js/platform.js' ||
          script.src === 'http://apis.google.com/js/platform.js') {
        isPlatform = true;
        break;
      }
    }
    if (!isPlatform) {
      const googlePlatformScript = document.createElement('script');
      googlePlatformScript.type = 'text/javascript';
      googlePlatformScript.src = 'https://apis.google.com/js/platform.js';
      googlePlatformScript.defer = true;
      googlePlatformScript.onload = this.onPlatformLoaded;
      document.getElementsByTagName('head')[0].appendChild(
        googlePlatformScript);
    }
  }

  public render(): JSX.Element {
    const { label, clientId, onSuccess, style, ...rest} = this.props;
    return (
      <button
          {...rest}
          id='gSignInWrapper'
          style={BUTTON_STYLE}
          className={css(styles.button)}
          onClick={this.onGoogleSignIn}
      >
        <div className='customGPlusSignIn' >
          <div style={{...SOCIAL_MEDIA_BUTTON_STYLE, ...style}} >
            <img
              style={SOCIAL_MEDIA_ICON_STYLE}
              alt='Google'
              src='resources/google_log_in_button/icons/google.svg'
            />
            <span>{label}</span>
          </div>
        </div>
      </button>);
  }

  private onGoogleSignIn = () => {
    this._gapiAuth.signIn().then((googleUser: any) => {
      const includeAuthorizationData = true;
      this.props.onSuccess(googleUser.getBasicProfile().getEmail(),
        googleUser.getAuthResponse(includeAuthorizationData));
    }, (error: any) => {
      console.log(error);
    });
  }

  private onPlatformLoaded = () => {
    const gapi = (window as any).gapi;
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: this.props.clientId
      }).then(() => {
        this._gapiAuth = gapi.auth2.getAuthInstance();
      });
    });
  }

  private _gapiAuth: any;
}

const BUTTON_STYLE: React.CSSProperties = {
  outline: 'none',
  border: 'none',
  backgroundColor: '#FFFFFF',
  padding: '0px',
  cursor: 'pointer',
  boxShadow: 'none',
  width: 'fit-content',
  height: 'fit-content',
  borderRadius: '4px',
  overflow: 'hidden'
};

const SOCIAL_MEDIA_BUTTON_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  width: '310px',
  height: '28px',
  color: '#969696',
  backgroundColor: 'transparent',
  border: '1px solid #969696',
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '10px',
  lineHeight: '12px',
  textAlign: 'center',
  textTransform: 'uppercase',
  borderRadius: '4px',
  outline: 'none'
};

const SOCIAL_MEDIA_ICON_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: '6px',
  left: '6px',
  width: '16px',
  height: '16px',
  outline: 'none',
  backgroundColor: 'transparent'
};

const styles = StyleSheet.create({
  button: {
    ':hover': {
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      cursor: 'pointer'
    },
    ':focus': {
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      cursor: 'pointer'
    },
    ':focus-within': {
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      cursor: 'pointer'
    },
    ':active': {
      boxShadow: 'none',
      cursor: 'pointer'
    },
    ':disabled': {
      backgroundColor: '#CCCCCC',
      cursor: 'default'
    }
  }
});
