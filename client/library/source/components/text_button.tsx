import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';

interface Properties extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  labelStyle?: React.CSSProperties;
}

export function TextButton(props: Properties) {
  return (
    <button {...props} style={{...BUTTON_STYLE, ...props.style}} >
      <p style={{...LABEL_STYLE, ...props.labelStyle}} >{props.label}</p>
    </button>);
}

export function TextButtonWithArrow(props: Properties) {
  return (
    <button {...props} style={{...BUTTON_STYLE, ...props.style}} >
      <p style={{...LABEL_STYLE, ...props.labelStyle}} >{props.label}</p>
      <div style={ARROW_ICON_CONTAINER_STYLE} >
        <img
          style={ARROW_ICON_STYLE}
          src='resources/icons/arrow.svg'
          alt='Arrow Icon'
        />
      </div>
    </button>);
}

export function InvertedSecondaryTextButton(props: Properties) {
  return (
    <TextButton
      {...props}
      style={{...INVERTED_BUTTON_STYLE, ...props.style}}
      className={css(styles.invertedSecondaryTextButton)}
    />);
}

export function AccentTextButton(props: Properties) {
  return (
    <TextButton
      {...props}
      style={{...ACCENT_BUTTON_STYLE, ...props.style}}
      className={css(styles.accentTextButton)}
    />);
}

export function PrimaryTextButton(props: Properties) {
  return (
    <TextButton
      {...props}
      style={{...PRIMARY_BUTTON_STYLE, ...props.style}}
      labelStyle={{...PRIMARY_LABEL_STYLE, ...props.labelStyle}}
      className={css(styles.primaryTextButton)}
    />);
}

const BUTTON_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '4px',
  outline: 'none',
  margin: '0px',
  padding: '0px',
  cursor: 'pointer',
  overflow: 'hidden',
  boxShadow: 'none'
};

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '10px',
  lineHeight: '13px',
  height: '13px',
  textTransform: 'uppercase',
  color: 'inherit'
};

const INVERTED_BUTTON_STYLE: React.CSSProperties = {
  width: '68px',
  height: '30px',
  backgroundColor: 'transparent',
  border: '1px solid #FFFFFF',
  color: '#FFFFFF'
};

const ACCENT_BUTTON_STYLE: React.CSSProperties = {
  width: '75px',
  height: '30px',
  backgroundColor: '#FFFFFF',
  color: '#F26B55',
  border: 'none'
};

const PRIMARY_BUTTON_STYLE: React.CSSProperties = {
  width: '116px',
  height: '35px',
  backgroundColor: '#F26B55',
  border: 'none',
  color: '#FFFFFF'
};

const PRIMARY_LABEL_STYLE: React.CSSProperties = {
  fontSize: '12px',
  lineHeight: '15px'
};

const ARROW_ICON_CONTAINER_STYLE: React.CSSProperties = {

};

const ARROW_ICON_STYLE: React.CSSProperties = {
  
};

const styles = StyleSheet.create({
  invertedSecondaryTextButton: {
    ':hover': {
      backgroundColor: '#F26B55',
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      color: '#FFFFFF',
      cursor: 'pointer'
    },
    ':focus': {
      backgroundColor: '#F26B55',
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      color: '#FFFFFF',
      cursor: 'pointer'
    },
    ':focus-within': {
      backgroundColor: '#F26B55',
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      color: '#FFFFFF',
      cursor: 'pointer'
    },
    ':active': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      border: '2px solid #FFFFFF',
      color: '#FFFFFF',
      cursor: 'pointer'
    },
    ':disabled': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      border: '1px solid #F6F6F6',
      color: '#F6F6F6',
      cursor: 'default'
    }
  },
  accentTextButton: {
    ':hover': {
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      color: '#F26B55',
      cursor: 'pointer'
    },
    ':focus': {
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      color: '#F26B55',
      cursor: 'pointer'
    },
    ':focus-within': {
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      color: '#F26B55',
      cursor: 'pointer'
    },
    ':active': {
      backgroundColor: '#F6F6F6',
      boxShadow: 'none',
      color: '#F26B55',
      cursor: 'pointer'
    },
    ':disabled': {
      backgroundColor: '#CCCCCC',
      boxShadow: 'none',
      color: '#FFFFFF',
      cursor: 'default'
    }
  },
  primaryTextButton: {
    ':hover': {
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      backgroundColor: '#F26B55',
      cursor: 'pointer'
    },
    ':focus': {
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      backgroundColor: '#F26B55',
      cursor: 'pointer'
    },
    ':focus-within': {
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      backgroundColor: '#F26B55',
      cursor: 'pointer'
    },
    ':active': {
      backgroundColor: '#AA2F19',
      boxShadow: 'none',
      cursor: 'pointer'
    },
    ':disabled': {
      backgroundColor: '#CCCCCC',
      boxShadow: 'none',
      cursor: 'default'
    }
  }
});
