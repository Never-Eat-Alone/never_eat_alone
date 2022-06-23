import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';

interface Properties extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick: () => void;
  style?: React.CSSProperties;
}

export class GoogleLogInButton extends React.Component<Properties> {
  public render(): JSX.Element {
    const { label, style, ...rest} = this.props;
    return (
      <button
          {...rest}
          id='gSignInWrapper'
          style={BUTTON_STYLE}
          className={css(styles.button)}
          onClick={this.props.onClick}
      >
        <div className='customGPlusSignIn' >
          <div style={{...SOCIAL_MEDIA_BUTTON_STYLE, ...style}} >
            <img
              style={SOCIAL_MEDIA_ICON_STYLE}
              alt='Google'
              src='resources/google_log_in_button/icons/google.svg'
            />
            <span>{label}</span>
          </div>
        </div>
      </button>);
  }
}

const BUTTON_STYLE: React.CSSProperties = {
  outline: 'none',
  border: 'none',
  backgroundColor: '#FFFFFF',
  padding: '0px',
  cursor: 'pointer',
  boxShadow: 'none',
  width: 'fit-content',
  height: 'fit-content',
  borderRadius: '4px',
  overflow: 'hidden'
};

const SOCIAL_MEDIA_BUTTON_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  width: '310px',
  height: '28px',
  color: '#969696',
  backgroundColor: 'transparent',
  border: '1px solid #969696',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '15px',
  textAlign: 'center',
  textTransform: 'uppercase',
  borderRadius: '4px',
  outline: 'none'
};

const SOCIAL_MEDIA_ICON_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: '6px',
  left: '6px',
  width: '16px',
  height: '16px',
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
