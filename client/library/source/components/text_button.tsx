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

export function PrimaryTextLinkButton(props: Properties) {
  return (
    <TextButton
      {...props}
      labelStyle={{...PRIMARY_LINK_LABEL_STYLE, ...props.labelStyle}}
      style={{...PRIMARY_LINK_BUTTON_STYLE, ...props.style}}
      className={css(styles.primaryTextLinkButton)}
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
  iconStyle?: React.CSSProperties;
}

export function TextButtonWithArrow(props: WithIconProperties) {
  return (
    <button {...props} style={{...BUTTON_STYLE, ...props.style}} >
      <p style={{...LABEL_STYLE, ...props.labelStyle}} >{props.label}</p>
      <svg
          style={{...ARROW_ICON_STYLE, ...props.iconStyle}}
          width='11px' height='10px' viewBox='0 0 11 10'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0_2250_58471)' >
          <path
            d='M4.45251 0.651959L9.10337 4.9939L4.45251 9.34814'
            stroke='currentColor' strokeWidth='1.5' strokeMiterlimit='10'
          />
          <path
            d='M8.40514 4.99365L0.5 4.99365' stroke='currentColor'
            strokeWidth='1.5' strokeMiterlimit='10'
          />
        </g>
        <defs>
        <clipPath id='clip0_2250_58471' >
          <rect
            width='10px' height='10px' fill='white'
            transform='translate(0.5 10) rotate(-90)'
          />
        </clipPath>
        </defs>
      </svg>
    </button>);
}

export function PrimaryTextButtonWithArrow(props: WithIconProperties) {
  return (
    <TextButtonWithArrow
      {...props}
      style={{...PRIMARY_BUTTON_STYLE, ...BUTTON_WITH_ARROW_STYLE,
        ...props.style}}
      iconStyle={{...BUTTON_ICON_STYLE, ...props.iconStyle}}
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
      iconStyle={{...BUTTON_ICON_STYLE, ...props.iconStyle}}
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
  ...BUTTON_STYLE,
  backgroundColor: '#F26B55',
  height: '35px',
  minHeight: '35px',
  width: '161px'
};

const BUTTON_ICON_STYLE: React.CSSProperties = {
  width: '10px',
  height: '10px',
  minWidth: '10px',
  minHeight: '10px',
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
  margin: '0px',
  padding: '0px',
  color: 'inherit'
};

const SECONDARY_LINK_BUTTON_STYLE: React.CSSProperties = {
  width: 'fit-content',
  height: '18px',
  minHeight: '18px',
  backgroundColor: 'transparent',
  color: '#F26B55',
  border: 'none'
};

const PRIMARY_LINK_BUTTON_STYLE: React.CSSProperties = {
  width: 'fit-content',
  height: '23px',
  minHeight: '23px',
  backgroundColor: 'transparent',
  color: '#FFFFFF',
  border: 'none'
};

const SECONDARY_BUTTON_STYLE: React.CSSProperties = {
  ...SECONDARY_LINK_BUTTON_STYLE,
  border: '1px solid #F26B55',
  height: '38px',
  minHeight: '38px',
  width: '200px'
};

const INVERTED_BUTTON_STYLE: React.CSSProperties = {
  ...BUTTON_STYLE,
  width: '68px',
  height: '30px',
  minHeight: '30px',
  backgroundColor: 'transparent',
  border: '1px solid #FFFFFF',
  color: '#FFFFFF'
};

const ACCENT_BUTTON_STYLE: React.CSSProperties = {
  ...BUTTON_STYLE,
  width: '75px',
  height: '30px',
  minHeight: '30px',
  backgroundColor: '#FFFFFF',
  color: '#F26B55',
  border: 'none'
};

const PRIMARY_BUTTON_STYLE: React.CSSProperties = {
  ...BUTTON_STYLE,
  width: '116px',
  height: '35px',
  minHeight: '35px',
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

const PRIMARY_LINK_LABEL_STYLE: React.CSSProperties = {
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '18px',
  lineHeight: '23px',
  height: '23px',
  minHeight: '23px',
  textTransform: 'capitalize'
};

const PRIMARY_LABEL_STYLE: React.CSSProperties = {
  ...LABEL_STYLE,
  fontSize: '12px',
  lineHeight: '15px',
  color: 'inherit'
};

const SECONDARY_LABEL_STYLE: React.CSSProperties = {
  ...LABEL_STYLE,
  fontSize: '12px',
  lineHeight: '15px',
  color: 'inherit'
};

const ARROW_ICON_STYLE: React.CSSProperties = {
  width: '10px',
  height: '10px',
  minWidth: '10px',
  minHeight: '10px',
  backgroundColor: 'transparent',
  color: 'inherit',
  marginLeft: '5px'
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
  primaryTextLinkButton: {
    ':hover': {
      textDecoration: 'underline solid #FFFFFF 1px',
      color: '#FFFFFF'
    },
    ':focus': {
      textDecoration: 'underline solid #FFFFFF 1px',
      color: '#FFFFFF'
    },
    ':focus-within': {
      textDecoration: 'underline solid #FFFFFF 1px',
      color: '#FFFFFF'
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
