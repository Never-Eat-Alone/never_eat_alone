import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import { SocialAccountType } from '../../definitions';

interface Properties extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  accountType: SocialAccountType;
  account: string;
}

/** Displays a social account linking button. */
export function LinkSocialAccountButton(props: Properties) {
  const { iconSrc, label }= (() => {
    switch (props.accountType) {
      case SocialAccountType.FACEBOOK:
        return {
          iconSrc: 'resources/icons/facebook.svg',
          label: 'Facebook'
      };
      case SocialAccountType.GOOGLE:
        return {
          iconSrc: 'resources/icons/google.svg',
          label: 'Google'
        };
    }
  })();
  const buttonText = (() => {
    if (props.disabled) {
      return <div style={LABEL_STYLE} >{label}: {props.account}</div>
    }
    return (
      <div style={LABEL_STYLE} >
        {label}:&nbsp;
        <span style={ORANGE_TEXT_STYLE} >
          Link&nbsp;{label}&nbsp;Account
        </span>
      </div>);
  })();
  return (
    <button
        {...props}
        style={{...BUTTON_STYLE, ...props.style}}
        className={css(styles.button)}
    >
      <img
        style={ICON_STYLE}
        src={iconSrc}
        alt='Icon'
      />
      {buttonText}
    </button>);
}

const BUTTON_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  borderRadius: '4px',
  padding: '9px 10px',
  width: '100%',
  textDecoration: 'none',
  border: '1px solid #CCCCCC',
  outline: 'none',
  minHeight: '38px',
  gap: '10px'
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
  color: '#000000',
  whiteSpace: 'pre-line'
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

const ORANGE_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#F26B55'
};

const styles = StyleSheet.create({
  button: {
    ':hover span': {
      textDecoration: 'solid underline #F26B55 1px'
    },
    ':focus span': {
      textDecoration: 'solid underline #F26B55 1px'
    },
    ':focus-within span': {
      textDecoration: 'solid underline #F26B55 1px'
    },
    ':active span': {
      textDecoration: 'solid underline #AA2F19 1px',
      color: '#AA2F19'
    },
    ':disabled': {
      backgroundColor: '#EFEFEF',
      textDecoration: 'none'
    }
  }
});
