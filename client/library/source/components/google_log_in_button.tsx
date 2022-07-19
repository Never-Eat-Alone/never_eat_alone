import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';

interface Properties extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export function GoogleLogInButton(props: Properties) {
  return (
    <button
        {...props}
        style={{...BUTTON_STYLE, ...props.style}}
        className={css(styles.button)}
    >
      <div className='customGPlusSignIn' style={CUSTOM_DIV_STYLE} >
        <div style={SOCIAL_MEDIA_BUTTON_STYLE} >
          <img
            style={SOCIAL_MEDIA_ICON_STYLE}
            alt='Google'
            src='resources/google_log_in_button/icons/google.svg'
          />
          <span>{props.label}</span>
        </div>
      </div>
    </button>);
}

const BUTTON_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  outline: 'none',
  backgroundColor: '#FFFFFF',
  padding: '0px',
  cursor: 'pointer',
  boxShadow: 'none',
  borderRadius: '4px',
  overflow: 'hidden',
  width: '310px',
  height: '28px',
  minHeight: '28px',
  minWidth: '310px',
  color: '#969696',
  border: '1px solid #969696',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '15px',
  textAlign: 'center',
  textTransform: 'uppercase',
};

const CUSTOM_DIV_STYLE: React.CSSProperties = {
  width: 'inherit',
  height: 'inherit'
};

const SOCIAL_MEDIA_BUTTON_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  width: 'inherit',
  height: 'inherit',
  backgroundColor: 'transparent'
};

const SOCIAL_MEDIA_ICON_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: '6px',
  left: '6px',
  width: '16px',
  height: '16px',
  minWidth: '16px',
  minHeight: '16px',
  outline: 'none',
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
