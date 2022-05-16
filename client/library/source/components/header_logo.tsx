import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import * as Router from 'react-router-dom';

interface Properties {
  color: string;
  imageSrc: string;
  style?: React.CSSProperties;
  className?: string;
}

export class HeaderLogo extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <Router.Link
          to='/'
          style={{...CONTAINER_STYLE, ...this.props.style}}
          className={this.props.className}
      >
        <img
          style={LOGO_STYLE}
          src={this.props.imageSrc}
          alt='NEA Logo'
        />
        <p style={{...LOGO_TEXT_STYLE, color: this.props.color}} >
          NeverEatAlone
        </p>
      </Router.Link>);
  }
}

interface ColoredHeaderLogoProperties {
  style?: React.CSSProperties;
}

export function WhiteTextHeaderLogo(props: ColoredHeaderLogoProperties) {
  return (
    <HeaderLogo
      {...props}
      color='#FFFFFF'
      imageSrc='resources/header/icons/logo_white.svg'
      className={css(styles.whiteTextContainer)}
    />);
}

export function OrangeTextHeaderLogo(props: ColoredHeaderLogoProperties) {
  return (
    <HeaderLogo
      {...props}
      color='#F24D3D'
      imageSrc='resources/header/icons/logo_orange.svg'
      className={css(styles.orangeTextContainer)}
    />);
}

const CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '30px',
  width: '137px',
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
  whiteTextContainer: {
    ':focus': {
      textDecoration: 'underline solid #FFFFFF 1px',
      color: '#FFFFFF'
    },
    ':focus-within': {
      textDecoration: 'underline solid #FFFFFF 1px',
      color: '#FFFFFF'
    }
  },
  orangeTextContainer: {
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
