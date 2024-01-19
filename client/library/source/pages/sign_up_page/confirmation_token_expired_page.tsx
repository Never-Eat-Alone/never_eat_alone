import * as React from 'react';
import { SecondaryButtonNavLink } from '../../components';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;
}

export class ConfirmationTokenExpiredPage extends React.Component<Properties> {
  public render(): JSX.Element {
    const contentStyle = ((this.props.displayMode === DisplayMode.MOBILE &&
      MOBILE_CONTENT_STYLE) || CONTENT_STYLE);
    return (
      <div style={CONTAINER_STYLE} >
        <div style={{...CONTENT_CONTAINER_STYLE, ...contentStyle}} >
          <div style={TITLE_ROW_STYLE} >
            <img
              style={IMAGE_STYLE}
              src='resources/sign_up_page/icons/broken-link.png'
              alt='Invalid token icon'
            />
            <h1 style={TITLE_STYLE} >Link sent!</h1>
          </div>
          <p style={P_STYLE} >
            Link expired! Please request join again.
          </p>
          <SecondaryButtonNavLink
            style={BACK_TO_HOMEPAGE_BUTTON_STYLE}
            to='/'
            label='back to homepage'
          />
        </div>
      </div>);
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: '#FFFFFF',
  padding: '60px 10px 60px 10px'
};

const CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  backgroundColor: '#F6F6F6',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  borderRadius: '4px'
};

const CONTENT_STYLE: React.CSSProperties = {
  width: '410px',
  padding: '50px'
};

const MOBILE_CONTENT_STYLE: React.CSSProperties = {
  width: '350px',
  padding: '20px'
};

const TITLE_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  height: 'fit-content'
};

const IMAGE_STYLE: React.CSSProperties = {
  width: '30px',
  minWidth: '30px',
  height: '30px',
  marginRight: '15px',
  backgroundColor: 'transparent'
};

const TITLE_STYLE: React.CSSProperties = {
  width: '100%',
  height: '53px',
  minHeight: '53px',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '36px',
  lineHeight: '53px',
  textTransform: 'uppercase',
  color: '#000000',
  margin: '0px',
  padding: '0px'
};

const P_STYLE: React.CSSProperties = {
  width: '100%',
  height: '36px',
  minHeight: '36px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  padding: '0px',
  margin: '30px 0px 0px 0px',
  whiteSpace: 'pre-line'
};

const BACK_TO_HOMEPAGE_BUTTON_STYLE: React.CSSProperties = {
  width: '100%'
};
