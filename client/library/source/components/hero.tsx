import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import { DisplayMode } from '../definitions';

interface Properties {
  displayMode: DisplayMode;
  onJoinButton: () => void;
}

export class Hero extends React.Component<Properties> {
  public render(): JSX.Element {
    const paragraph = 'Are you feeling adventurous and want to try something \
      entirely new, but know no one to recommend you? We’re here for you.';
    return (
      <div style={HERO_SECTION_STYLE} >
        <div style={DETAILS_STYLE} >
          <h1 style={HERO_HEADLINE_STYLE} >
            FIND YOUR FAVOURITE RESTAURANTS
            WITH YOUR FAVOURITE PEOPLE.
          </h1>
          <p style={HERO_PARAGRAPH_STYLE} >{paragraph}</p>
          <button
              style={HERO_BUTTON_STYLE}
              className={css(styles.heroJoinButton)}
              onClick={this.props.onJoinButton}
          >
            JOIN THE FUN
          </button>
        </div>
      </div>);
  }
}

const HERO_SECTION_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  height: '615px',
  backgroundImage: 'url(resources/home_page/illustrations/background-hero-big.jpg)',
  backgroundSize: 'cover',
  backgroundColor: '#F24D3D',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left center'
};

const DETAILS_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '1160px',
  height: '239px',
  marginTop: '86px',
  backgroundColor: 'transparent',
  color: '#FFFFFF'
};

const HERO_HEADLINE_STYLE: React.CSSProperties = {
  width: '358px',
  height: '78px',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '26px',
  lineHeight: '39px',
  textTransform: 'uppercase',
  textShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
  margin: '0',
  padding: '0'
};

const HERO_PARAGRAPH_STYLE: React.CSSProperties = {
  width: '400px',
  height: '80px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '20px',
  lineHeight: '28px',
  overflowWrap: 'break-word',
  marginTop: '23px',
  marginBottom: '0',
  marginRight: '0',
  marginLeft: '0',
  padding: '0',
  textShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)'
};

const HERO_BUTTON_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 36px',
  width: '145px',
  height: '35px',
  borderRadius: '4px',
  backgroundColor: '#FFFFFF',
  marginTop: '23px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px',
  textTransform: 'uppercase',
  color: '#F26B55',
  border: 'none',
  textDecoration: 'none',
  cursor: 'pointer',
  marginBottom: '0'
};

const styles = StyleSheet.create({
  heroJoinButton: {
    ':hover': {
      backgroundColor: '#FFFFFF'
    },
    ':active': {
      backgroundColor: '#FFFFFF'
    }
  }
});
