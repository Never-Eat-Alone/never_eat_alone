import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import * as Router from 'react-router-dom';

interface Properties {
  style?: React.CSSProperties;
}

export class HeaderLogoWithWhiteText extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <Router.Link
          to='/'
          style={{...CONTAINER_STYLE, ...this.props.style}}
          className={css(styles.container)}
          draggable={false}
      >
        <img
          style={LOGO_STYLE}
          src='/resources/guest_header/icons/logo_white.svg'
          alt='NEA Logo'
          draggable={false}
        />
        <p style={LOGO_TEXT_STYLE} >NeverEatAlone</p>
      </Router.Link>);
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '30px',
  backgroundColor: 'transparent',
  textDecoration: 'none',
  cursor: 'pointer',
  outline: 'none'
};

const LOGO_STYLE: React.CSSProperties = {
  height: '100%',
  width: '35px',
  backgroundColor: 'transparent',
  WebkitTouchCallout: 'none',
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
  KhtmlUserSelect: 'none',
  userSelect: 'none',
  outline: 'none',
  border: 'none',
  overflow: 'hidden',
  marginRight: '10px'
};

const LOGO_TEXT_STYLE: React.CSSProperties = {
  transform: 'translate(64.395 35.728)',
  color: '#FFFFFF',
  fontSize: '17px',
  lineHeight: '19px',
  fontWeight: 400,
  fontFamily: 'Oswald',
  verticalAlign: 'center',
  margin: '0',
  padding: '0',
  textRendering: 'optimizeLegibility'
};

const styles = StyleSheet.create({
  container: {
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
