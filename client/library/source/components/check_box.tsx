import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';

interface Properties extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hasError?: boolean;
}

export function CheckBox(props: Properties) {
  const color = (props.disabled && '#CCCCCC' || props.hasError && '#FF2C79' ||
    '#000000');
  const label = (props.label &&
    <p style={{...LABEL_STYLE, color: color}} className={css(styles.label)} >
      {props.label}
    </p> || null);
  const errorStyle = props.hasError && { backgroundColor: '#FF2C79',
    boxShadow: 'none', border: 'none' } || {};
  return (
    <div style={CONTAINER_STYLE} >
      <input
        type='checkbox'
        style={{...CHECK_MARK_STYLE, ...errorStyle}}
        className={css(styles.input)}
        disabled={props.disabled}
      />
      {label}
    </div>);
}

const CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: 'transparent'
};

const CHECK_MARK_STYLE: React.CSSProperties = {
  position: 'relative',
  boxSizing: 'border-box',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  appearance: 'none',
  margin: '0px 10px 0px 0px',
  opacity: 0,
  width: '0px',
  height: '0px',
  backgroundColor: '#FFFFFF',
  border: '1px solid #969696',
  borderRadius: '2px',
  boxShadow: 'none',
  outline: 'none',
  padding: '0px',
  cursor: 'pointer'
};

const LABEL_STYLE: React.CSSProperties = {
  height: '18px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  margin: '0px',
  padding: '0px'
};

const styles = StyleSheet.create({
  input: {
    ':hover': {
      border: '1px solid #F26B55',
      backgroundColor: '#FFFFFF',
      boxShadow: 'none'
    },
    ':focus': {
      border: '1px solid #F26B55',
      backgroundColor: '#FFFFFF',
      boxShadow: 'none'
    },
    ':checked p::before': {
      backgroundColor: '#F26B55',
      border: 'none',
      boxShadow: 'none',
      color: '#FFFFFF',
      content: '"\\2713"',
      display: 'block',
      textAlign: 'center',
      position: 'absolute',
      left: '0.7rem',
      top: '0.2rem'
    },
    ':checked:hover': {
      boxShadow: '0px 1px 5px rgba(86, 70, 40, 0.4)',
      border: 'none'
    },
    ':checked:focus': {
      boxShadow: '0px 1px 5px rgba(86, 70, 40, 0.4)',
      border: 'none'
    },
    ':active p::before': {
      backgroundColor: '#AA2F19',
      border: 'none',
      boxShadow: 'none',
      content: '"\\2713"',
      color: '#FFFFFF',
      display: 'block',
      textAlign: 'center',
      position: 'absolute',
      left: '0.7rem',
      top: '0.2rem'
    },
    ':disabled': {
      border: 'none',
      backgroundColor: '#CCCCCC',
      cursor: 'default',
      boxShadow: 'none'
    }
  },
  label: {
    ':disabled': {
      color: '#CCCCCC',
      cursor: 'default'
    }
  }
});
