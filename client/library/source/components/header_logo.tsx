import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import * as Router from 'react-router-dom';

interface Properties {
  color: string;
  imageSrc: string;
  className: React.CSSProperties;
  style?: React.CSSProperties;
}

export class HeaderLogo extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <Router.Link
          to='/'
          style={{...CONTAINER_STYLE, ...this.props.style}}
          className={css(this.props.className)}
          draggable={false}
      >
        <img
          style={LOGO_STYLE}
          src={this.props.imageSrc}
          alt='NEA Logo'
          draggable={false}
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
  return (<HeaderLogo
    color='#FFFFFF'
    imageSrc='resources/guest_header/icons/logo_white.svg'
    className={styles.whiteTextContainer}
    {...props}
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
  }
});
