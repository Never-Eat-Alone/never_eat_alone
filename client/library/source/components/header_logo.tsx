import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import * as Router from 'react-router-dom';
import { DisplayMode } from '../definitions';

interface Properties {
  displayMode: DisplayMode;
  style?: React.CSSProperties
}

export function HeaderLogo(props: Properties) {
  const text = (() => {
    if (props.displayMode === DisplayMode.MOBILE) {
      return null;
    }
    return <p style={LOGO_TEXT_STYLE} >NeverEatAlone</p>;
  })();
  return (
    <Router.Link
        to='/'
        style={{...CONTAINER_STYLE, ...props.style}}
        className={css(styles.whiteTextContainer)}
    >
      <img
        style={LOGO_STYLE}
        src='resources/header/icons/logo_white.svg'
        alt='NEA Logo'
      />
      {text}
    </Router.Link>);
}

const CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: 'transparent',
  textDecoration: 'none',
  cursor: 'pointer',
  outline: 'none',
  height: '30px',
  width: 'fit-content'
};

const LOGO_STYLE: React.CSSProperties = {
  height: '100%',
  width: '35px',
  backgroundColor: 'transparent',
  outline: 'none',
  border: 'none',
  overflow: 'hidden',
  marginRight: '10px',
  color: '#FFFFFF'
};

const LOGO_TEXT_STYLE: React.CSSProperties = {
  transform: 'translate(64.395 35.728)',
  fontSize: '17px',
  lineHeight: '19px',
  fontWeight: 400,
  fontFamily: 'Oswald',
  verticalAlign: 'center',
  margin: '0',
  padding: '0',
  textRendering: 'optimizeLegibility',
  width: '92px',
  color: '#FFFFFF'
};

const styles = StyleSheet.create({
  whiteTextContainer: {
    ':focus': {
      textDecoration: 'underline solid #FFFFFF 1px',
      color: '#FFFFFF'
    },
    ':focus-within': {
      textDecoration: 'underline solid #FFFFFF 1px',
      color: '#FFFFFF'
    }
  }
});
