import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';

interface Properties extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export function TextButton(props: Properties) {
  return (
    <button {...props} style={{...BUTTON_STYLE, ...props.style}} >
      <p style={LABEL_STYLE} >{props.label}</p>
    </button>);
}

export function InvertedSecondaryTextButton(props: Properties) {
  return (
    <TextButton
      {...props}
      style={INVERTED_BUTTON_STYLE}
      className={css(styles.invertedSecondaryTextButton)}
    />);
}

export function AccentTextButton(props: Properties) {
  return (
    <TextButton
      {...props}
      style={ACCENT_BUTTON_STYLE}
      className={css(styles.accentTextButton)}
    />);
}

const BUTTON_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '4px',
  outline: 'none',
  margin: '0px',
  padding: '0px',
  cursor: 'pointer',
  overflow: 'hidden',
  boxShadow: 'none'
};

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '10px',
  lineHeight: '13px',
  height: '13px',
  textTransform: 'uppercase',
  color: 'inherit'
};

const INVERTED_BUTTON_STYLE: React.CSSProperties = {
  width: '68px',
  height: '30px',
  backgroundColor: 'transparent',
  border: '1px solid #FFFFFF',
  color: '#FFFFFF'
};

const ACCENT_BUTTON_STYLE: React.CSSProperties = {
  width: '75px',
  height: '30px',
  backgroundColor: '#FFFFFF',
  color: '#F26B55',
  border: 'none'
};

const styles = StyleSheet.create({
  invertedSecondaryTextButton: {
    ':hover': {
      backgroundColor: '#F26B55',
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      color: '#FFFFFF'
    },
    ':focus': {
      backgroundColor: '#F26B55',
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      color: '#FFFFFF'
    },
    ':focus-within': {
      backgroundColor: '#F26B55',
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      color: '#FFFFFF'
    },
    ':active': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      border: '2px solid #FFFFFF',
      color: '#FFFFFF'
    },
    ':disabled': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      border: '1px solid #F6F6F6',
      color: '#F6F6F6'
    }
  },
  accentTextButton: {
    ':hover': {
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      color: '#F26B55'
    },
    ':focus': {
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      color: '#F26B55'
    },
    ':focus-within': {
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      color: '#F26B55'
    },
    ':active': {
      backgroundColor: '#F6F6F6',
      boxShadow: 'none',
      color: '#F26B55'
    },
    ':disabled': {
      backgroundColor: '#CCCCCC',
      boxShadow: 'none',
      color: '#FFFFFF'
    }
  }
});
