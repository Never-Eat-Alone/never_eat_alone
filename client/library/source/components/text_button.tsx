import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';

interface Properties {
  label: string;
  backgroundColor: string;
  width: string;
  height: string;
  border: string;
  className: React.CSSProperties;
  isDisabled?: boolean;
  style?: React.CSSProperties;
  onClick: () => void;
}

export class TextButton extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <button
          style={{...BUTTON_STYLE,
            backgroundColor: this.props.backgroundColor,
            width: this.props.width,
            height: this.props.height,
            border: this.props.border,
            ...this.props.style
          }}
          className={css(this.props.className)}
          disabled={this.props.isDisabled}
          onClick={this.props.onClick}
      >
        <p style={LABEL_STYLE} >{this.props.label}</p>
      </button>);
  }
}

interface TextButtonInterface {
  label: string;
  isDisabled?: boolean;
  style?: React.CSSProperties;
  onClick: () => void;
}

export function InvertedSecondaryTextButton(props: TextButtonInterface) {
  return (<TextButton
    backgroundColor='transparent'
    width='68px'
    height='30px'
    border='1px solid #FFFFFF'
    className={styles.invertedSecondaryTextButton}
    {...props}
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
  color: '#FFFFFF'
};

const styles = StyleSheet.create({
  invertedSecondaryTextButton: {
    ':hover': {
      backgroundColor: '#F26B55',
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      color: '#FFFFFF'
    },
    ':focus': {
      backgroundColor: '#F26B55',
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      color: '#FFFFFF'
    },
    ':focus-within': {
      backgroundColor: '#F26B55',
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)',
      color: '#FFFFFF'
    },
    ':active': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      border: '2px solid #FFFFFF',
      color: '#FFFFFF'
    },
    ':disabled': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
      border: '1px solid #F6F6F6',
      color: '#F6F6F6'
    }
  }
});
