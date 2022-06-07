import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import { DisplayMode } from '../definitions';

interface InputFieldProperties extends React.InputHTMLAttributes<
    HTMLInputElement> {
  displayMode: DisplayMode;
  hasError: boolean;
  iconSrc: string;
  iconAlt: string;
  iconStyle: React.CSSProperties;
  iconContainerStyle: React.CSSProperties;
  style?: React.CSSProperties;
  className?: string;
}

export function InputField(props: InputFieldProperties) {
  const { displayMode, hasError, iconSrc, iconAlt, iconStyle,
    iconContainerStyle, style, className, ...rest } = props;
  return (
    <div style={{...CONTAINER_STYLE, ...style}} className={className} >
      <div style={iconContainerStyle} >
        <img
          style={iconStyle}
          src={iconSrc}
          alt={iconAlt}
        />
      </div>
      <input style={INPUT_STYLE} {...rest} />
    </div>);
}

interface EmailInputProperties extends InputFieldProperties {
  emailList: string;
}

export function EmailInputField(props: EmailInputProperties) {
    const { type, name, iconSrc, iconAlt, iconStyle, iconContainerStyle, style,
      className, ...rest} = props;
    return (
      <InputField
        {...rest}
        type='email'
        name='email'
        style={EMAIL_INPUT_CONTAINER_STYLE}
        className={css(styles.emailInputContainer)}
        iconSrc=''
        iconAlt='Email Icon'
        iconStyle={{}}
        iconContainerStyle={{}}
      />);
  }

const EMAIL_INPUT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  boxSizing: 'border-box',
  backgroundColor: '#FFFFFF',
  borderRadius: '4px',
  border: '1px solid #CCCCCC',
  padding: '0px 10px 0px 40px',
  background: 'url(resources/invite_a_foodie_modal/icons/email.svg) no-repeat scroll 20px 20px',
  backgroundPosition: 'left 10px center',
  width: '100%',
  height: '38px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '18px',
  color: '#969696',
  outline: 'none',
  margin: '0',
  cursor: 'auto'
};

const styles = StyleSheet.create({
  emailInputContainer: {
    ':focus': {
      border: '1px solid #969696',
      color: '#000000',
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)'
    },
    ':active': {
      border: '1px solid #969696',
      boxShadow: 'none'
    },
    ':placeholder': {
      color: '#969696'
    }
  }
});
