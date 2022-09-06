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

export function SecondaryTextLinkButton(props: Properties) {
  return (
    <TextButton
      {...props}
      labelStyle={{...SECONDARY_LINK_LABEL_STYLE, ...props.labelStyle}}
      style={{...SECONDARY_LINK_BUTTON_STYLE, ...props.style}}
      className={css(styles.secondaryTextLinkButton)}
    />);
}

export function SecondaryTextButton(props: Properties) {
  return (
    <TextButton
      {...props}
      labelStyle={props.labelStyle}
      style={{...SECONDARY_BUTTON_STYLE, ...props.style}}
      className={css(styles.secondaryTextButton)}
    />);
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

interface WithIconProperties extends Properties {
  iconSrc?: string;
  iconStyle?: React.CSSProperties;
  iconContainerStyle?: React.CSSProperties;
  iconAlt?: string;
}

export function TextButtonWithArrow(props: WithIconProperties) {
  return (
    <button {...props} style={{...BUTTON_STYLE, ...props.style}} >
      <p style={{...LABEL_STYLE, ...props.labelStyle}} >{props.label}</p>
      <div
          style={{...ARROW_ICON_CONTAINER_STYLE, ...props.iconContainerStyle}}
      >
        <img
          style={{...ARROW_ICON_STYLE, ...props.iconStyle}}
          src={props.iconSrc}
          alt={props.iconAlt}
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
      iconStyle={{...BUTTON_ICON_STYLE, ...props.iconStyle}}
      iconContainerStyle={{...BUTTON_ICON_CONTAINER_STYLE,
        ...props.iconContainerStyle}}
      labelStyle={{...PRIMARY_LABEL_STYLE, ...props.labelStyle}}
      className={css(styles.primaryTextButton)}
    />);
}

export function SecondaryTextButtonWithArrow(props: WithIconProperties) {
  return (
    <TextButtonWithArrow
      {...props}
      style={{...BUTTON_WITH_ARROW_STYLE, ...SECONDARY_BUTTON_STYLE,
        ...props.style}}
      iconSrc={props.iconSrc || 'resources/text_button/icons/arrow_orange.svg'}
      iconAlt={props.iconAlt || 'Arrow Icon'}
      iconStyle={{...BUTTON_ICON_STYLE, ...props.iconStyle}}
      iconContainerStyle={{...BUTTON_ICON_CONTAINER_STYLE,
        ...props.iconContainerStyle}}
      labelStyle={{...SECONDARY_LABEL_STYLE, ...props.labelStyle}}
      className={css(styles.secondaryTextButton)}
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

const BUTTON_ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '10px',
  height: '10px',
  color: 'inherit'
};

const BUTTON_ICON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minWidth: '10px',
  minHeight: '10px',
  objectFit: 'cover',
  color: 'inherit',
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

const SECONDARY_LINK_BUTTON_STYLE: React.CSSProperties = {
  width: 'fit-content',
  height: '18px',
  backgroundColor: 'transparent',
  color: '#F26B55',
  border: 'none'
};

const SECONDARY_BUTTON_STYLE: React.CSSProperties = {
  ...SECONDARY_LINK_BUTTON_STYLE,
  border: '1px solid #F26B55'
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

const SECONDARY_LINK_LABEL_STYLE: React.CSSProperties = {
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '18px',
  textTransform: 'capitalize'
};

const PRIMARY_LABEL_STYLE: React.CSSProperties = {
  fontSize: '12px',
  lineHeight: '15px',
  color: '#FFFFFF'
};

const SECONDARY_LABEL_STYLE: React.CSSProperties = {
  fontSize: '12px',
  lineHeight: '15px',
  color: 'inherit'
};

const ARROW_ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '10px',
  height: '10px',
  marginLeft: '5px',
  color: 'inherit'
};

const ARROW_ICON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minWidth: '10px',
  minHeight: '10px',
  objectFit: 'cover',
  backgroundColor: 'transparent',
  color: 'inherit'
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
  },
  secondaryTextLinkButton: {
    ':hover': {
      textDecoration: 'underline solid #F26B55 1px',
      color: '#F26B55'
    },
    ':focus': {
      textDecoration: 'underline solid #F26B55 1px',
      color: '#F26B55'
    },
    ':focus-within': {
      textDecoration: 'underline solid #F26B55 1px',
      color: '#F26B55'
    },
    ':active': {
      textDecoration: 'underline solid #AA2F19 1px',
      color: '#AA2F19'
    }
  },
  secondaryTextButton: {
    ':hover': {
      backgroundColor: '#FFFFFF',
      color: '#F26B55',
      border: '1px solid #F26B55',
      boxShadow: '0px 1px 5px rgba(86, 70, 40, 0.4)'
    },
    ':focus': {
      backgroundColor: '#FFFFFF',
      color: '#F26B55',
      border: '1px solid #F26B55',
      boxShadow: '0px 1px 5px rgba(86, 70, 40, 0.4)'
    },
    ':focus-within': {
      backgroundColor: '#FFFFFF',
      color: '#F26B55',
      border: '1px solid #F26B55',
      boxShadow: '0px 1px 5px rgba(86, 70, 40, 0.4)'
    },
    ':active': {
      backgroundColor: 'transparent',
      color: '#AA2F19',
      border: '2px solid #AA2F19',
      boxShadow: 'none'
    },
    ':disabled': {
      backgroundColor: 'transparent',
      color: '#969696',
      border: '1px solid #969696',
      boxShadow: 'none'
    }
  }
});
