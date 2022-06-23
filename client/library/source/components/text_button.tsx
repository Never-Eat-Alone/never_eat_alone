import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';

interface Properties extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  labelStyle?: React.CSSProperties;
}

export function TextButton(props: Properties) {
  const { label, labelStyle, ...rest } = props;
  return (
    <button {...rest} style={{...BUTTON_STYLE, ...props.style}} >
      <p style={{...LABEL_STYLE, ...labelStyle}} >{label}</p>
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
  const { labelStyle, ...rest } = props;
  return (
    <TextButton
      {...rest}
      style={{...PRIMARY_BUTTON_STYLE, ...props.style}}
      labelStyle={{...PRIMARY_LABEL_STYLE, ...labelStyle}}
      className={css(styles.primaryTextButton)}
    />);
}

interface WithIconProperties extends Properties {
  iconSrc?: string;
  iconStyle?: React.CSSProperties;
  iconContainerStyle?: React.CSSProperties;
  iconAlt?: string;
}

export function TextButtonWithArrow(props: WithIconProperties) {
  const { label, labelStyle, iconContainerStyle, iconStyle, iconSrc, iconAlt,
    ...rest } = props;
  return (
    <button {...rest} style={{...BUTTON_STYLE, ...props.style}} >
      <p style={{...LABEL_STYLE, ...labelStyle}} >{label}</p>
      <div style={{...ARROW_ICON_CONTAINER_STYLE, ...iconContainerStyle}} >
        <img
          style={{...ARROW_ICON_STYLE, ...iconStyle}}
          src={iconSrc}
          alt={iconAlt}
        />
      </div>
    </button>);
}

export function PrimaryTextButtonWithArrow(props: WithIconProperties) {
  return (
    <TextButtonWithArrow
      {...props}
      style={{...BUTTON_WITH_ARROW_STYLE , ...props.style}}
      iconSrc={props.iconSrc || 'resources/text_button/icons/arrow.svg'}
      iconAlt={props.iconAlt || 'Arrow Icon'}
      iconStyle={{...PRIMARY_BUTTON_ICON_STYLE, ...props.iconStyle}}
      iconContainerStyle={{...PRIMARY_BUTTON_ICON_CONTAINER_STYLE,
        ...props.iconContainerStyle}}
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

const BUTTON_WITH_ARROW_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  border: 'none',
  outline: 'none',
  backgroundColor: '#F26B55',
  borderRadius: '4px',
  height: '35px',
  width: '161px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
};

const PRIMARY_BUTTON_ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '10px',
  height: '10px'
};

const PRIMARY_BUTTON_ICON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minWidth: '10px',
  minHeight: '10px',
  objectFit: 'cover',
  backgroundColor: 'transparent'
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
  lineHeight: '15px',
  color: '#FFFFFF'
};

const ARROW_ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '10px',
  height: '10px',
  marginLeft: '5px'
};

const ARROW_ICON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minWidth: '10px',
  minHeight: '10px',
  objectFit: 'cover',
  backgroundColor: 'transparent',
  color: '#FFFFFF'
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
      boxShadow: '0px 1px 5px rgba(86, 70, 40, 0.4)',
      color: '#F26B55',
      backgroundColor: '#FFFFFF',
      cursor: 'pointer'
    },
    ':focus': {
      boxShadow: '0px 1px 5px rgba(86, 70, 40, 0.4)',
      color: '#F26B55',
      backgroundColor: '#FFFFFF',
      cursor: 'pointer'
    },
    ':focus-within': {
      boxShadow: '0px 1px 5px rgba(86, 70, 40, 0.4)',
      color: '#F26B55',
      backgroundColor: '#FFFFFF',
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
      boxShadow: '0px 1px 5px rgba(86, 70, 40, 0.4)',
      backgroundColor: '#F26B55',
      cursor: 'pointer'
    },
    ':focus': {
      boxShadow: '0px 1px 5px rgba(86, 70, 40, 0.4)',
      backgroundColor: '#F26B55',
      cursor: 'pointer'
    },
    ':focus-within': {
      boxShadow: '0px 1px 5px rgba(86, 70, 40, 0.4)',
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
