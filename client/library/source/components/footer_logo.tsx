import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import * as Router from 'react-router-dom';

interface Properties {
  style?: React.CSSProperties;
}

export class FooterLogo extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <Router.Link
          to='/'
          style={{...CONTAINER_STYLE, ...this.props.style}}
          className={css(styles.container)}
      >
        <img
          style={LOGO_STYLE}
          src='resources/footer/icons/logo.svg'
          alt='NEA Logo'
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
  height: '45px',
  width: '204px',
  backgroundColor: 'transparent',
  textDecoration: 'none',
  cursor: 'pointer',
  outline: 'none'
};

const LOGO_STYLE: React.CSSProperties = {
  height: '100%',
  width: '52px',
  backgroundColor: 'transparent',
  WebkitTouchCallout: 'none',
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
  KhtmlUserSelect: 'none',
  userSelect: 'none',
  outline: 'none',
  border: 'none',
  overflow: 'hidden',
  marginRight: '15px'
};

const LOGO_TEXT_STYLE: React.CSSProperties = {
  transform: 'translate(64.395 35.728)',
  color: '#F24D3D',
  fontSize: '26px',
  lineHeight: '23px',
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
      textDecoration: 'underline solid #F24D3D 1px',
      color: '#F24D3D'
    },
    ':focus-within': {
      textDecoration: 'underline solid #F24D3D 1px',
      color: '#F24D3D'
    }
  }
});
