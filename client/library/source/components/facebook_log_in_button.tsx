import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';

interface Properties extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  style?: React.CSSProperties;
  onClick: () => void;
}

export function FacebookLogInButton(props: Properties) {
  const { label, style, ...rest } = props;
  return (
    <button
        {...rest}
        style={{...BUTTON_STYLE, ...style}}
        className={css(styles.button)}
    >
      <img
        style={FACEBOOK_ICON_STYLE}
        src='resources/facebook_log_in_button/icons/facebook.svg'
        alt='Facebook Icon'
      />
      <span>{label}</span>
    </button>);
}

const BUTTON_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '310px',
  height: '28px',
  textDecoration: 'none',
  outline: 'none',
  boxShadow: 'none',
  border: '1px solid #969696',
  backgroundColor: '#FFFFFF',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '15px',
  color: '#969696',
  borderRadius: '4px',
  overflow: 'hidden',
  textAlign: 'center',
  textTransform: 'uppercase',
  cursor: 'pointer',
  padding: '0px',
  margin: '0px'
};

const FACEBOOK_ICON_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: '4px',
  left: '8px',
  width: '9px',
  height: '18px',
  backgroundColor: 'transparent'
};

const styles = StyleSheet.create({
  button: {
    ':hover': {
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      cursor: 'pointer'
    },
    ':focus': {
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      cursor: 'pointer'
    },
    ':focus-within': {
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      cursor: 'pointer'
    },
    ':active': {
      boxShadow: 'none',
      cursor: 'pointer',
      backgroundColor: '#F6F6F6'
    },
    ':disabled': {
      backgroundColor: '#CCCCCC',
      cursor: 'default'
    }
  }
});
