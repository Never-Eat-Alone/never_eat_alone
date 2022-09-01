import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import { DisplayMode } from '../definitions';

interface Properties extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  displayMode: DisplayMode;
}

export function CloseButton(props: Properties) {
  if (props.displayMode === DisplayMode.MOBILE) {
    return (
      <button {...props} style={{...MOBILE_BUTTON_STYLE, ...props.style}} >
        <svg style={MOBILE_ICON_STYLE} className={css(styles.mobileIcon)}
            xmlns='http://www.w3.org/2000/svg'
        >
          <circle opacity='inherit' cx='12' cy='12' r='12' fill='currentColor'
          />
          <path d='M6 6L18 18' stroke='#FFFFFF' strokeWidth='2'
            strokeMiterlimit='10' strokeLinecap='round'
          />
          <path d='M18 6L6 18' stroke='#FFFFFF' strokeWidth='2'
            strokeMiterlimit='10' strokeLinecap='round'
          />
        </svg>
      </button>);
  }
  return (
    <button {...props} style={{...BUTTON_STYLE, ...props.style}} >
      <svg style={ICON_STYLE} xmlns='http://www.w3.org/2000/svg'
          className={css(styles.icon)}
      >
        <path d='M1.6001 1.59998L14.4001 14.4' stroke='currentColor'
          strokeWidth='2' strokeMiterlimit='10' strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path d='M14.4001 1.59998L1.6001 14.4' stroke='currentColor'
          strokeWidth='2' strokeMiterlimit='10' strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    </button>);
}

const BUTTON_STYLE: React.CSSProperties = {
  border: 'none',
  boxShadow: 'none',
  outline: 'none',
  margin: '0px',
  padding: '0px',
  backgroundColor: 'transparent',
  width: '16px',
  height: '16px'
};

const MOBILE_BUTTON_STYLE: React.CSSProperties = {
  border: 'none',
  boxShadow: 'none',
  outline: 'none',
  margin: '0px',
  padding: '0px',
  backgroundColor: 'transparent',
  width: '24px',
  height: '24px'
};

const ICON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minWidth: '16px',
  objectFit: 'cover',
  color: '#CCCCCC'
};

const MOBILE_ICON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minWidth: '24px',
  objectFit: 'cover',
  color: '#000000',
  opacity: 0.5
};

const styles = StyleSheet.create({
  icon: {
    ':hover': {
      color: '#4A4A4A'
    },
    ':focus': {
      color: '#4A4A4A'
    },
    ':focus-within': {
      color: '#4A4A4A'
    },
    ':active': {
      color: '#969696'
    }
  },
  mobileIcon: {
    ':hover': {
      color: '#000000',
      opacity: 0.75
    },
    ':focus': {
      color: '#000000',
      opacity: 0.75
    },
    ':focus-within': {
      color: '#000000',
      opacity: 0.75
    },
    ':active': {
      color: '#000000',
      opacity: 0.4
    }
  }
});
