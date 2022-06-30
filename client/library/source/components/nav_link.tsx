import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import * as Router from 'react-router-dom';

interface Properties extends Router.LinkProps {
  label: string;
  style?: React.CSSProperties;
  className?: string;
}

export function NavLink(props: Properties) {
  return (
    <Router.Link
        {...props}
        style={{...LINK_STYLE, ...props.style}}
        className={props.className}
    >
      <p style={LABEL_STYLE} >{props.label}</p>
    </Router.Link>);
}

export function WhiteNavLink(props: Properties) {
  return (
    <NavLink
      {...props}
      style={{...WHITE_LINK_STYLE, ...props.style}}
      className={css(styles.whiteNavLink)}
    />);
}

export function RedNavLink(props: Properties) {
  return (
    <NavLink
      {...props}
      style={{...RED_LINK_STYLE, ...props.style}}
      className={css(styles.redNavLink)}
    />);
}

const LINK_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  borderRadius: '4px',
  margin: '0px',
  padding: '0px',
  cursor: 'pointer',
  overflow: 'hidden',
  border: 'none',
  outline: 'none',
  textDecoration: 'none'
};

const LABEL_STYLE: React.CSSProperties = {
  margin: '0px',
  padding: '0px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  textTransform: 'capitalize',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  color: 'inherit'
};

const WHITE_LINK_STYLE: React.CSSProperties = {
  fontSize: '14px',
  lineHeight: '14px',
  color: '#FFFFFF',
  backgroundColor: 'transparent',
  height: '17px'
};

const RED_LINK_STYLE: React.CSSProperties = {
  width: '74px',
  height: '15px',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '15px',
  color: '#F26B55'
};

const styles = StyleSheet.create({
  whiteNavLink: {
    ':hover': {
      textDecoration: 'underline solid #FFFFFF 1px',
      color: '#FFFFFF'
    },
    ':focus': {
      textDecoration: 'underline solid #FFFFFF 1px',
      color: '#FFFFFF'
    },
    ':focus-within': {
      textDecoration: 'underline solid #FFFFFF 1px',
      color: '#FFFFFF'
    },
    ':active': {
      textDecoration: 'underline solid #EFEFEF 1px',
      color: '#EFEFEF'
    }
  },
  redNavLink: {
    ':hover': {
      textDecoration: 'underline solid #F26B55 1px',
      color: '#F26B55'
    },
    ':focus': {
      textDecoration: 'underline solid #F26B55 1px',
      color: '#F26B55'
    },
    ':focus-within': {
      textDecoration: 'underline solid #F26B55 1px',
      color: '#F26B55'
    },
    ':active': {
      textDecoration: 'underline solid #AA2F19 1px',
      color: '#AA2F19'
    }
  }
});
