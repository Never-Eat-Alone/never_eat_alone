import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';

interface Properties extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError: boolean;
}

export function LocationInputField({ hasError, ...props }: Properties) {
  const containerClass = (props.disabled && styles.disabled || hasError
    && styles.error || styles.container);
  return (
    <div
        style={{...CONTAINER_STYLE, ...props.style}}
        className={css(containerClass)}
    >
      <div style={LOCATION_ICON_CONTAINER_STYLE} >
        <img
          style={LOCATION_ICON_STYLE}
          src='resources/location_input_field/icons/location.svg'
          alt='Location Icon'
        />
      </div>
      <input
        {...props}
        style={INPUT_STYLE}
        className={css(styles.input)}
      />
      <div style={DROPDOWN_ICON_CONTAINER_STYLE} >
        <img
          style={DROPDOWN_ICON_STYLE}
          src='resources/location_input_field/icons/dropdown.svg'
          alt='Dropdown Icon'
        />
      </div>
    </div>);
}

const CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  width: '100%',
  minWidth: '100%',
  height: '38px',
  border: '1px solid #CCCCCC',
  borderRadius: '4px',
  padding: '8px 10px 8px 9px',
  boxShadow: 'none',
  cursor: 'pointer'
};

const LOCATION_ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '20px',
  backgroundColor: 'transparent',
  marginRight: '10px'
};

const LOCATION_ICON_STYLE: React.CSSProperties = {
  height: '20px',
  minHeight: '20px',
  width: '14px'
};

const DROPDOWN_ICON_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '15px 12px 14px 13px'
};

const DROPDOWN_ICON_STYLE: React.CSSProperties = {
  height: '7px',
  minHeight: '7px',
  width: '14px'
};

const INPUT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  height: '18px',
  color: '#000000',
  width: '100%',
  outline: 'none',
  border: 'none',
  margin: '0px',
  padding: '0px',
  cursor: 'auto'
};

const styles = StyleSheet.create({
  container: {
    ':hover': {
      border: '1px solid #969696',
      boxShadow: 'none'
    },
    ':focus': {
      border: '1px solid #CCCCCC',
      boxShadow: '0px 1px 5px rgba(86, 70, 40, 0.4)'
    },
    ':focus-within': {
      border: '1px solid #CCCCCC',
      boxShadow: '0px 1px 5px rgba(86, 70, 40, 0.4)'
    },
    ':active': {
      border: '1px solid #969696',
      boxShadow: 'none'
    }
  },
  disabled: {
    backgroundColor: '#F6F6F6',
    border: '1px solid #F6F6F6',
    boxShadow: 'none'
  },
  error: {
    border: '1px solid #FF2C79'
  },
  input: {
    ':placeholder': {
      color: '#969696'
    }
  }
});
