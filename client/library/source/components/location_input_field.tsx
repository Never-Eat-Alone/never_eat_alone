import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';

export function LocationInputField(props: React.InputHTMLAttributes<
    HTMLInputElement>) {
  return (
    <div
        style={{...CONTAINER_STYLE, ...props.style}}
        className={css(styles.container)}
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
  width: '530px',
  minWidth: '530px',
  height: '38px',
  border: '1px solid #CCCCCC',
  borderRadius: '4px',
  padding: '8px 10px 8px 9px'
};

const LOCATION_ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '20px',
  backgroundColor: 'transparent'
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
  color: '#969696'
};

const styles = StyleSheet.create({
  container: {
    ':hover': {
      
    },
    ':focus': {

    },
    ':focus-within': {

    },
    ':active': {

    },
    ':disabled': {

    }
  }
});
