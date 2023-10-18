import * as React from 'react';
import { PrimaryButtonNavLink } from '../../components';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;
  errorCode: number;
}

export class ErrorPage extends React.Component<Properties> {
  public render(): JSX.Element {
    const { containerStyle, imageStyle, buttonStyle, buttonLabel } = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          containerStyle: DESKTOP_CONTAINER_STYLE,
          imageStyle: IMAGE_STYLE,
          buttonStyle: DESKTOP_BUTTON_STYLE,
          buttonLabel: 'Back to Homepage'
        };
      }
      if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerStyle: TABLET_CONTAINER_STYLE,
          imageStyle: IMAGE_STYLE,
          buttonStyle: BUTTON_STYLE,
          buttonLabel: 'Home'
        };
      }
      return {
        containerStyle: MOBILE_CONTAINER_STYLE,
        imageStyle: MOBILE_IMAGE_STYLE,
        buttonStyle: BUTTON_STYLE,
        buttonLabel: 'Home'
      };
    })();
    return (
      <div style={PAGE_CONTAINER_STYLE} >
        <div style={containerStyle} >
          <h1 style={H1_STYLE} >500 Error</h1>
          <h2 style={H2_STYLE} >Oops! something went wrong with this page.</h2>
          <p style={P_STYLE} >
            It looks like there was an internal server error. We’re working 
            hard to fix the problem.{'\n\n'}
            Try refreshing this page or try again later.
          </p>
          <PrimaryButtonNavLink
            to='/'
            label={buttonLabel}
            style={buttonStyle}
          />
          <img
            style={imageStyle}
            src='resources/error_page/images/404.jpg'
            alt='Image'
          />
        </div>
      </div>);
  }
}

const PAGE_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  width: '100%',
  overflow: 'initial',
  padding: '50px 20px 80px 20px'
};

const DESKTOP_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '1060px',
  minHeight: '863px',
  overflow: 'initial',
  gap: '30px'
};

const TABLET_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  minWidth: '678px',
  maxWidth: '1060px',
  width: '100%',
  paddingLeft: '50px',
  paddingRight: '50px',
  overflow: 'initial',
  gap: '30px'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '30px',
  width: '100%',
  overflow: 'initial'
};

const H1_STYLE: React.CSSProperties = {
  padding: '0px',
  margin: '0px',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '26px',
  lineHeight: '39px',
  textTransform: 'uppercase',
  color: '#969696'
};

const H2_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  whiteSpace: 'pre-line',
  padding: '0px',
  margin: '0px',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '20px',
  lineHeight: '30px',
  textTransform: 'uppercase',
  color: '#969696'
};

const P_STYLE: React.CSSProperties = {
  padding: '0px',
  margin: '0px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  whiteSpace: 'pre-line'
};

const BUTTON_STYLE: React.CSSProperties = {
  width: '104px',
  minWidth: '104px',
  height: '35px',
  minHeight: '35px',
  fontSize: '12px',
  lineHeight: '15px',
  textTransform: 'uppercase'
};

const DESKTOP_BUTTON_STYLE: React.CSSProperties = {
  ...BUTTON_STYLE,
  width: '178px',
  minWidth: '178px'
};

const MOBILE_IMAGE_STYLE: React.CSSProperties = {
  width: '100%',
  objectFit: 'contain',
  height: '403px'
};

const IMAGE_STYLE: React.CSSProperties = {
  width: '600px',
  height: '403px',
  objectFit: 'contain'
};
