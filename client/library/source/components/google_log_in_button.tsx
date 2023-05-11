import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';

interface Properties extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  clientId: string;
  onSuccess: (email: string, token: any) => void;
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
        googlePlatformScript
      );
    }
  }

  public render(): JSX.Element {
    const { label, clientId, onSuccess, ...buttonProps } = this.props;
    return (
      <button
          {...buttonProps}
          style={{...BUTTON_STYLE, ...buttonProps.style}}
          className={css(styles.button)}
          onClick={this.onGoogleSignIn}
      >
        <div className='customGPlusSignIn' style={CUSTOM_DIV_STYLE} >
          <div style={SOCIAL_MEDIA_BUTTON_STYLE} >
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
  boxSizing: 'border-box',
  outline: 'none',
  backgroundColor: '#FFFFFF',
  padding: '0px',
  cursor: 'pointer',
  boxShadow: 'none',
  borderRadius: '4px',
  overflow: 'hidden',
  width: '310px',
  height: '28px',
  minHeight: '28px',
  minWidth: '310px',
  color: '#969696',
  border: '1px solid #969696',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '15px',
  textAlign: 'center',
  textTransform: 'uppercase',
};

const CUSTOM_DIV_STYLE: React.CSSProperties = {
  width: 'inherit',
  height: 'inherit'
};

const SOCIAL_MEDIA_BUTTON_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  width: 'inherit',
  height: 'inherit',
  backgroundColor: 'transparent'
};

const SOCIAL_MEDIA_ICON_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: '6px',
  left: '6px',
  width: '16px',
  height: '16px',
  minWidth: '16px',
  minHeight: '16px',
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
      cursor: 'pointer',
      backgroundColor: '#F6F6F6'
    },
    ':disabled': {
      backgroundColor: '#CCCCCC',
      cursor: 'default'
    }
  }
});
