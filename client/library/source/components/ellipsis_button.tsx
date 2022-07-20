import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';

export function EllipsisButton(props: React.ButtonHTMLAttributes<
    HTMLButtonElement>) {
  return (
    <button
        {...props}
        style={{...BUTTON_STYLE, ...props.style}}
        className={css(styles.button)}
        onClick={props.onClick}
    >
      <svg
          width='20' height='20' viewBox='0 0 20 20'
          xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M4 11.5C4.82843 11.5 5.5 10.8284 5.5 10C5.5 9.17157 4.82843 8.5 4 8.5C3.17157 8.5 2.5 9.17157 2.5 10C2.5 10.8284 3.17157 11.5 4 11.5Z'
          fill='inherit'
        />
        <path d='M10 11.5C10.8284 11.5 11.5 10.8284 11.5 10C11.5 9.17157 10.8284 8.5 10 8.5C9.17157 8.5 8.5 9.17157 8.5 10C8.5 10.8284 9.17157 11.5 10 11.5Z'
          fill='inherit'
        />
        <path d='M16 11.5C16.8284 11.5 17.5 10.8284 17.5 10C17.5 9.17157 16.8284 8.5 16 8.5C15.1716 8.5 14.5 9.17157 14.5 10C14.5 10.8284 15.1716 11.5 16 11.5Z'
          fill='inherit'
        />
      </svg>
    </button>);
}

const BUTTON_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  boxSizing: 'border-box',
  backgroundColor: 'transparent',
  margin: '0px',
  padding: '0px',
  cursor: 'pointer',
  border: 'none',
  outline: 'none',
  boxShadow: 'none',
  fill: '#F24D3D',
  overflow: 'hidden',
  borderRadius: '50%'
};

const styles = StyleSheet.create({
  button: {
    ':hover': {
      backgroundColor: '#F24D3D',
      fill: '#FFFFFF'
    },
    ':focus': {
      backgroundColor: '#F24D3D',
      fill: '#FFFFFF'
    },
    ':focus-within': {
      backgroundColor: '#F24D3D',
      fill: '#FFFFFF'
    },
    ':active': {
      backgroundColor: '#AA2F19',
      fill: '#FFFFFF'
    }
  }
});
