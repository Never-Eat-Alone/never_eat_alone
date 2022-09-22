import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';

interface Properties extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  accountType: Type;
  account: string;
}

/** Displays a social account linking button. */
export function LinkSocialAccountButton(props: Properties) {
  const { iconSrc, label }= (() => {
    switch (props.accountType) {
      case Type.FACEBOOK:
        return {
          iconSrc: 'resources/icons/facebook.svg',
          label: 'Facebook'
      };
      case Type.GOOGLE:
        return {
          iconSrc: 'resources/icons/google.svg',
          label: 'Google'
        };
      case Type.INSTAGRAM:
        return {
          iconSrc: 'resources/icons/instagram.svg',
          label: 'Instagram'
        };
      case Type.LINKEDIN:
        return {
          iconSrc: 'resources/icons/linkedin.svg',
          label: 'LinkedIn'
        };
    }
  })();
  const buttonText = (() => {
    if (props.disabled) {
      return <div style={LABEL_STYLE} >{label}: {props.account}</div>
    }
  })();
  return (
    <button {...props} style={{...BUTTON_STYLE, ...props.style}} >
      <img
        style={ICON_STYLE}
        src={iconSrc}
        alt='Icon'
      />
      {buttonText}
    </button>);
}

enum Type {
  FACEBOOK,
  GOOGLE,
  LINKEDIN,
  INSTAGRAM
}

const BUTTON_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  backgroundColor: '#FFFFFF',
  borderRadius: '4px',
  padding: '9px 10px',
  width: '100%'
};

const LABEL_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000'
};

const ICON_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '20px',
  height: '20px',
  backgroundColor: 'transparent'
};
