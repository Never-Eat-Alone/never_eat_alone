import * as React from 'react';
import { PrimaryButtonNavLink } from '../../components';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;
}

export class ErrorPage403 extends React.Component<Properties> {
  public render(): JSX.Element {
    const { containerStyle, imageStyle } = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          containerStyle: DESKTOP_CONTAINER_STYLE,
          imageStyle: IMAGE_STYLE
        };
      }
      if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerStyle: TABLET_CONTAINER_STYLE,
          imageStyle: IMAGE_STYLE
        };
      }
      return {
        containerStyle: MOBILE_CONTAINER_STYLE,
        imageStyle: MOBILE_IMAGE_STYLE
      };
    })();
    return (
      <div style={PAGE_CONTAINER_STYLE} >
        <div style={containerStyle} >
          <h1 style={H1_STYLE} >403 Error</h1>
          <h2 style={H2_STYLE} >
            Sorry! You do not have permission to access this page
          </h2>
          <p style={P_STYLE} >Let’s head back to the home.</p>
          <PrimaryButtonNavLink to='/' label='Home' style={BUTTON_STYLE} />
          <img
            style={imageStyle}
            src='resources/error_page/images/403.jpg'
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
  overflow: 'initial'
};

const TABLET_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  minWidth: '678px',
  maxWidth: '1060px',
  width: '100%',
  marginLeft: '25px',
  marginRight: '25px',
  overflow: 'initial'
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
  color: '#000000'
};

const BUTTON_STYLE: React.CSSProperties = {
  width: '104px',
  minWidth: '104px',
  height: '35px',
  minHeight: '35px',
  fontSize: '12px',
  lineHeight: '15px'
};

const MOBILE_IMAGE_STYLE: React.CSSProperties = {
  width: '100%',
  objectFit: 'cover',
  height: '394px'
};

const IMAGE_STYLE: React.CSSProperties = {
  width: '600px',
  height: '491px',
  objectFit: 'cover'
};
