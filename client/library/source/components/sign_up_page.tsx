import * as React from 'react';
import { DisplayMode } from '../definitions';

interface Properties {
  displayMode: DisplayMode;
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
  alignItems: 'center'
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
  color: '#000000'
};

