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

export function PrimaryButtonNavLink(props: Properties) {
  return (
    <NavLink
      {...props}
      style={{...PRIMARY_BUTTON_STYLE, ...props.style}}
      className={css(styles.primaryButton)}
    />);
}

export function SecondaryButtonNavLink(props: Properties) {
  return (
    <NavLink
      {...props}
      style={{...SECONDARY_BUTTON_STYLE, ...props.style}}
      className={css(styles.secondaryButton)}
    />);
}

export function RedNavLinkWithArrow(props: Properties) {
  return (
    <Router.Link
        {...props}
        style={{...LINK_STYLE, ...NAVLINK_WITH_ARROW_CONTAINER_STYLE,
          ...REDLINK_WITH_ARROW_STYLE, ...props.style}}
        className={css(styles.redNavLink)}
    >
      <p style={LABEL_STYLE} >{props.label}</p>
      <svg
          style={ARROW_ICON_STYLE}
          width='8' height='8'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0_1443_22362)' >
        <path
          d='M3.66211 0.521566L7.38279 3.99512L3.66211 7.47852'
          stroke='currentColor' strokeWidth='1.5' strokeMiterlimit='10'
        />
        <path
          d='M6.82411 3.99512L0.5 3.99512' stroke='currentColor'
          strokeWidth='1.5' strokeMiterlimit='10'
        />
        </g>
        <defs>
          <clipPath id='clip0_1443_22362' >
          <rect
            width='8' height='8' fill='white'
            transform='translate(0.5 8) rotate(-90)'
          />
          </clipPath>
        </defs>
      </svg>
    </Router.Link>);
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
  textDecoration: 'none',
  textTransform: 'capitalize'
};

const LABEL_STYLE: React.CSSProperties = {
  margin: '0px',
  padding: '0px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  textTransform: 'inherit',
  fontSize: 'inherit',
  lineHeight: 'inherit',
  color: 'inherit'
};

const REDLINK_WITH_ARROW_STYLE: React.CSSProperties = {
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#F26B55'
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

const PRIMARY_BUTTON_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '116px',
  height: '35px',
  backgroundColor: '#F26B55',
  borderRadius: '4px',
  textTransform: 'uppercase',
  border: 'none',
  color: '#FFFFFF',
  cursor: 'pointer',
  fontSize: '12px',
  lineHeight: '15px'
};

const SECONDARY_BUTTON_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid #F26B55',
  width: '178px',
  height: '35px',
  fontSize: '12px',
  lineHeight: '15px',
  backgroundColor: 'transparent',
  borderRadius: '4px',
  textTransform: 'uppercase',
  color: '#F26B55',
  cursor: 'pointer'
};

const NAVLINK_WITH_ARROW_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '5px',
  backgroundColor: 'transparent'
};

const ARROW_ICON_STYLE: React.CSSProperties = {
  width: '8px',
  height: '8px',
  backgroundColor: 'transparent',
  color: 'inherit'
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
  },
  primaryButton: {
    ':hover': {
      boxShadow: '0px 1px 5px rgba(86, 70, 40, 0.4)',
      backgroundColor: '#F26B55',
      cursor: 'pointer'
    },
    ':focus': {
      boxShadow: '0px 1px 5px rgba(86, 70, 40, 0.4)',
      backgroundColor: '#F26B55',
      cursor: 'pointer'
    },
    ':focus-within': {
      boxShadow: '0px 1px 5px rgba(86, 70, 40, 0.4)',
      backgroundColor: '#F26B55',
      cursor: 'pointer'
    },
    ':active': {
      backgroundColor: '#AA2F19',
      boxShadow: 'none',
      cursor: 'pointer'
    },
    ':disabled': {
      backgroundColor: '#CCCCCC',
      boxShadow: 'none',
      cursor: 'default'
    }
  },
  secondaryButton: {
    ':hover': {
      backgroundColor: '#FFFFFF',
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      color: '#F26B55',
      cursor: 'pointer'
    },
    ':focus': {
      backgroundColor: '#FFFFFF',
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      color: '#F26B55',
      cursor: 'pointer'
    },
    ':focus-within': {
      backgroundColor: '#FFFFFF',
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      color: '#F26B55',
      cursor: 'pointer'
    },
    ':active': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      border: '2px solid #AA2F19',
      color: '#AA2F19',
      cursor: 'pointer'
    },
    ':disabled': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      border: '1px solid #969696',
      color: '#969696',
      cursor: 'default'
    }
  }
});
