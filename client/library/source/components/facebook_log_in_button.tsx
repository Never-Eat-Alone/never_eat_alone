import * as React from 'react';

interface Properties extends React.HtmlHTMLAttributes<HTMLDivElement> {
  appId: string;
  nonce: string;
}

export class FacebookLogInButton extends React.Component<Properties> {
  constructor(props: Properties) {
    super(props);
    const scripts = document.getElementsByTagName(
      'body')[0].getElementsByTagName('script');
    let isPlatform = false;
    for (let i =0; i< scripts.length; i++) {
      const script = scripts[i];
      const scriptSrc: string = script.src;
      if (scriptSrc.indexOf('https://connect.facebook.net') !== -1) {
        isPlatform = true;
        break;
      }
    }
    if (!isPlatform) {
      const facebookPlatformScript = document.createElement('script');
      facebookPlatformScript.type = 'text/javascript';
      facebookPlatformScript.src = `https://connect.facebook.net/en_US/sdk.js`;
      facebookPlatformScript.defer = true;
      facebookPlatformScript.nonce = this.props.nonce;
      facebookPlatformScript.onload = this.onPlatformLoaded;
      document.getElementsByTagName('body')[0].appendChild(
        facebookPlatformScript);
    }
  }

  public render(): JSX.Element {
    const { appId, nonce, style, ...rest} = this.props;
    return (
      <div
        {...rest}
        className='fb-login-button' style={{...BUTTON_STYLE,
        ...this.props.style}}
        data-size='medium' data-button-type='login_with' data-layout='default'
        data-auto-logout-link='true' data-use-continue-as='false'
      />);
  }

  private onPlatformLoaded = () => {
    const FBapi = (window as any).FB;
    FBapi.init({
      appId: this.props.appId,
      cookie: true,
      status: true,
      xfbml: true,
      version: 'v14.0',
      autoLogAppEvents: true
    })();
  }
}

const BUTTON_STYLE: React.CSSProperties = {
  display: 'flex',
  width: '310px',
  height: '28px'
};
