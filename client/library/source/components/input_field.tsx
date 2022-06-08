import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';

interface InputFieldProperties extends React.InputHTMLAttributes<
    HTMLInputElement> {
  hasError: boolean;
}

export function InputField(props: InputFieldProperties) {
  const { hasError, style, ...rest } = props;
  return (
    <input
      style={{...INPUT_STYLE, ...CONTAINER_STYLE, ...CONTAINER_NO_ICON_STYLE,
        ...style}}
      className={rest.disabled && css(styles.disabled) ||
        hasError && css(styles.hasError) || css(styles.container, styles.input)}
      {...rest}
    />);
}

interface InputFieldWithIconProperties extends InputFieldProperties {
  iconSrc: string;
  iconAlt: string;
}

export function InputFieldWithIcon(props: InputFieldWithIconProperties) {
  const { hasError, iconSrc, iconAlt, style, ...rest } = props;
  return (
    <div
        style={{...CONTAINER_STYLE, ...CONTAINER_WITH_ICON_STYLE, ...style}}
        className={rest.disabled && css(styles.disabled) ||
          hasError && css(styles.hasError) || css(styles.container)}
    >
      <div style={ICON_CONTAINER_STYLE} >
        <img
          style={ICON_STYLE}
          src={iconSrc}
          alt={iconAlt}
        />
      </div>
      <input style={INPUT_STYLE} className={css(styles.input)} {...rest} />
    </div>);
}

export function EmailInputField(props: InputFieldWithIconProperties) {
  return (
    <InputFieldWithIcon
      {...props}
      type='email'
      name='email'
      iconSrc='resources/input_field/icons/email.svg'
      iconAlt='Email Icon'
    />);
}

export function NameInputField(props: InputFieldWithIconProperties) {
  return (
    <InputFieldWithIcon
      {...props}
      type='text'
      name='name'
      iconSrc='resources/input_field/icons/name.svg'
      iconAlt='Name Icon'
    />);
}

const CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  borderRadius: '4px',
  border: '1px solid #CCCCCC',
  width: '310px',
  height: '38px',
  color: '#969696'
};

const CONTAINER_NO_ICON_STYLE: React.CSSProperties = {
  padding: '0px 10px 0px 10px'
};

const CONTAINER_WITH_ICON_STYLE: React.CSSProperties = {
  padding: '0px 10px 0px 0px'
};

const INPUT_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
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
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  minWidth: '39px'
};

const ICON_STYLE: React.CSSProperties = {
  width: '20px',
  height: '20px',
  backgroundColor: 'transparent',
  overflow: 'hidden'
};

const styles = StyleSheet.create({
  container: {
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
    boxShadow: 'none',
    backgroundColor: '#EFEFEF'
  },
  hasError: {
    borderColor: '#FF2C79'
  },
  input: {
    ':placeholder': {
      color: '#969696',
      fontWeight: 400
    }
  }
});
