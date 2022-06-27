import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';

interface Properties extends React.ButtonHTMLAttributes<HTMLButtonElement> {
}

export function CloseBurgerButton(props: Properties) {
  return (
    <button
        {...props}
        style={BUTTON_STYLE}
        className={css(styles.button)}
    >
      <svg style={IMAGE_STYLE} xmlns='http://www.w3.org/2000/svg' >
        <circle cx='15' cy='15' r='15' fill='inherit' />
        <rect x='9.85742' y='9.1427' width='16' height='1.45455'
          rx='0.727273' transform='rotate(45 9.85742 9.1427)' fill='white'
        />
        <rect x='21.1714' y='10.1711' width='16' height='1.45455'
          rx='0.727273' transform='rotate(135 21.1714 10.1711)' fill='white'
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
  WebkitTouchCallout: 'none',
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
  KhtmlUserSelect: 'none',
  userSelect: 'none',
  fill: 'transparent',
  width: '30px',
  height: '30px',
};

const IMAGE_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  backgroundColor: 'transparent'
};

const styles = StyleSheet.create({
  button: {
    ':hover': {
      fill: '#F24D3D'
    },
    ':focus': {
      fill: '#F24D3D'
    },
    ':focus-within': {
      fill: '#F24D3D'
    },
    ':active': {
      fill: '#AA2F19'
    }
  }
});
