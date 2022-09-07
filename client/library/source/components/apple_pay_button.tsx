import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';

export function ApplePayButton(props: React.ButtonHTMLAttributes<
    HTMLButtonElement>) {
  return (
    <button
        {...props}
        style={{...BUTTON_STYLE, ...props.style}}
        className={css(styles.button)}
    >
      <img
        style={APPLE_PAY_ICON_STYLE}
        src='resources/icons/apple_pay.svg'
        alt='Apple Pay Icon'
      />
    </button>);
}

const BUTTON_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  outline: 'none',
  padding: '0px',
  cursor: 'pointer',
  boxShadow: 'none',
  border: 'none',
  borderRadius: '4px',
  overflow: 'hidden',
  backgroundColor: '#000000',
  width: '310px',
  minWidth: '310px',
  height: '28px',
  minHeight: '28px',
  color: '#FFFFFF',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px'
};

const APPLE_PAY_ICON_STYLE: React.CSSProperties = {
  width: '43px',
  height: '18px'
};

const styles = StyleSheet.create({
  button: {
    ':hover': {
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      cursor: 'pointer',
      backgroundColor: '#1f1e1e'
    },
    ':focus': {
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      cursor: 'pointer',
      backgroundColor: '#1f1e1e'
    },
    ':focus-within': {
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      cursor: 'pointer',
      backgroundColor: '#1f1e1e'
    },
    ':active': {
      boxShadow: 'none',
      cursor: 'pointer',
      backgroundColor: '#1f1e1e'
    },
    ':disabled': {
      backgroundColor: '#CCCCCC',
      cursor: 'default'
    }
  }
});
