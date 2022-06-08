import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';

interface InputFieldProperties extends React.InputHTMLAttributes<
    HTMLInputElement> {
  hasError: boolean;
  disabled: boolean;
  iconSrc: string;
  iconAlt: string;
  iconStyle: React.CSSProperties;
  iconContainerStyle: React.CSSProperties;
}

export function InputField(props: InputFieldProperties) {
  const { hasError, iconSrc, iconAlt, iconStyle, iconContainerStyle, style,
    ...rest } = props;
  return (
    <div
        style={{...CONTAINER_STYLE,
          borderColor: props.hasError && '#FF2C79' || '#CCCCCC',
          backgroundColor: rest.disabled && '#EFEFEF' || '#FFFFFF',
          ...style}}
        className={rest.disabled && css(styles.disabled) ||
          css(styles.inputContainer)}
    >
      <div style={{...ICON_CONTAINER_STYLE, ...iconContainerStyle}} >
        <img
          style={iconStyle}
          src={iconSrc}
          alt={iconAlt}
        />
      </div>
      <input style={INPUT_STYLE} className={css(styles.input)} {...rest} />
    </div>);
}

export function EmailInputField(props: InputFieldProperties) {
  return (
    <InputField
      {...props}
      type='email'
      name='email'
      iconSrc='resources/input_field/icons/email.svg'
      iconAlt='Email Icon'
      iconStyle={EMAIL_ICON_STYLE}
      iconContainerStyle={EMAIL_ICON_CONTAINER_STYLE}
    />);
}

export function NameInputField(props: InputFieldProperties) {
  return (
    <InputField
      {...props}
      type='text'
      name='name'
      iconSrc='resources/input_field/icons/name.svg'
      iconAlt='Name Icon'
      iconStyle={NAME_ICON_STYLE}
      iconContainerStyle={NAME_ICON_CONTAINER_STYLE}
    />);
}

const CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  boxSizing: 'border-box',
  backgroundColor: '#FFFFFF',
  borderRadius: '4px',
  border: '1px solid #CCCCCC',
  padding: '0px 10px 0px 0px',
  width: '310px',
  height: '38px',
  color: '#969696'
};

const INPUT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '18px',
  height: '18px',
  width: '100%',
  color: 'inherit',
  outline: 'none',
  border: 'none',
  margin: '0px',
  padding: '0px',
  cursor: 'auto',
  backgroundColor: 'transparent'
};

const ICON_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'felx',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '40px',
  height: '100%'
};

const EMAIL_ICON_CONTAINER_STYLE: React.CSSProperties = {
  padding: '8px 10px'
};

const EMAIL_ICON_STYLE: React.CSSProperties = {
  width: '20px',
  height: '20px',
  minWidth: '20px',
  backgroundColor: 'transparent'
};

const NAME_ICON_CONTAINER_STYLE: React.CSSProperties = {
  padding: '9px 10px'
};

const NAME_ICON_STYLE: React.CSSProperties = {
  width: '20px',
  height: '20px',
  minWidth: '20px',
  backgroundColor: 'transparent'
};

const styles = StyleSheet.create({
  inputContainer: {
    ':hover': {
      border: '1px solid #969696',
      color: '#000000',
      boxShadow: '0px 1px 5px rgba(86, 70, 40, 0.4)'
    },
    ':focus': {
      border: '1px solid #969696',
      color: '#000000',
      boxShadow: '0px 1px 5px rgba(86, 70, 40, 0.4)'
    },
    ':focus-whitin': {
      border: '1px solid #969696',
      color: '#000000',
      boxShadow: '0px 1px 5px rgba(86, 70, 40, 0.4)'
    },
    ':active': {
      border: '1px solid #969696',
      boxShadow: 'none'
    }
  },
  disabled: {
    border: '1px solid #CCCCCC',
    boxShadow: 'none'
  },
  input: {
    ':placeholder': {
      color: '#969696',
      fontWeight: 400
    }
  }
});
