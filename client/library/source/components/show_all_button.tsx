import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';

interface Properties extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The label of the button. */
  label: string;
}

/** Displays the ShowAll Button. */
export function ShowAllButton({ label, ...props }: Properties) {
  return (
    <button
        {...props}
        style={{...BUTTON_STYLE, ...props.style}}
        className={css(styles.button)}
    >
      <div style={BUTTON_TEXT_STYLE} >{label}</div>
      <svg
        width='10' height='6' viewBox='0 0 10 6' fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M1 1L5 5L9 1' stroke='currentColor' strokeMiterlimit='10'
          strokeLinecap='round' strokeLinejoin='round'
        />
      </svg>
    </button>);
}

const BUTTON_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  height: '18px',
  backgroundColor: 'transparent',
  outline: 'none',
  border: 'none',
  textDecoration: 'none',
  boxShadow: 'none',
  cursor: 'pointer',
  width: 'fit-content',
  padding: '10px 20px',
  color: '#000000'
};

const BUTTON_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '18px',
  textAlign: 'center',
  color: 'inherit',
  marginRight: '7px'
};

const styles = StyleSheet.create({
  button: {
    ':hover': {
      color: '#000000',
      textDecorationLine: 'underline'
    },
    ':focus': {
      color: '#000000',
      textDecorationLine: 'underline'
    },
    ':focus-within': {
      color: '#000000',
      textDecorationLine: 'underline'
    },
    ':active': {
      color: 'rgba(0, 0, 0, 0.6)',
      textDecorationLine: 'underline'
    }
  }
});
