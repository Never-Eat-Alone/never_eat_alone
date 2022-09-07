import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';

export function PayPalButton(props: React.ButtonHTMLAttributes<
    HTMLButtonElement>) {
  return (
    <button
        {...props}
        style={{...BUTTON_STYLE, ...props.style}}
        className={css(styles.button)}
    >
      <img
        style={P_ICON_STYLE}
        src='resources/icons/p.svg'
        alt='P Icon'
      />
      <img
        style={PAYPAL_ICON_STYLE}
        src='resources/icons/paypal.svg'
        alt='PayPal Icon'
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
  backgroundColor: '#FFC439',
  width: '310px',
  minWidth: '310px',
  height: '28px',
  minHeight: '28px',
  color: '#000000',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px'
};

const P_ICON_STYLE: React.CSSProperties = {
  width: '12px',
  height: '14px'
};

const PAYPAL_ICON_STYLE: React.CSSProperties = {
  width: '54px',
  height: '14px'
};

const styles = StyleSheet.create({
  button: {
    ':hover': {
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      cursor: 'pointer',
      backgroundColor: '#ffc130'
    },
    ':focus': {
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      cursor: 'pointer',
      backgroundColor: '#ffc130'
    },
    ':focus-within': {
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      cursor: 'pointer',
      backgroundColor: '#ffc130'
    },
    ':active': {
      boxShadow: 'none',
      cursor: 'pointer',
      backgroundColor: '#ffc130'
    },
    ':disabled': {
      backgroundColor: '#CCCCCC',
      cursor: 'default'
    }
  }
});
