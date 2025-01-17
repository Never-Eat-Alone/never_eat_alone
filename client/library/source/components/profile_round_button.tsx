import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';

interface Properties extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  imageSrc: string;
}

export function ProfileRoundButton({ imageSrc, ...props }: Properties) {
  return (
    <button
        {...props}
        style={{...BUTTON_STYLE, ...props.style}}
        className={css(styles.button)}
        onClick={props.onClick}
    >
      <img
        style={IMAGE_STYLE}
        src={imageSrc}
        alt='Profile Image'
      />
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
  fill: 'transparent',
  width: '34px',
  height: '34px',
  overflow: 'hidden',
  borderRadius: '50%'
};

const IMAGE_STYLE: React.CSSProperties = {
  width: '30px',
  height: '30px',
  objectFit: 'cover',
  backgroundColor: 'transparent',
  borderRadius: '50%'
};

const styles = StyleSheet.create({
  button: {
    ':hover': {
      border: '2px solid #F24D3D'
    },
    ':focus': {
      border: '2px solid #F24D3D'
    },
    ':focus-within': {
      border: '2px solid #F24D3D'
    },
    ':active': {
      border: '2px solid #AA2F19'
    }
  }
});
