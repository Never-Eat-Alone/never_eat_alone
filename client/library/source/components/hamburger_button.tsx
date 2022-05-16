import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';

interface Properties {
  onClick: () => void;
}

export class HamburgerButton extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <button
          style={BUTTON_STYLE}
          className={css(styles.button)}
          onClick={this.props.onClick}
      >
        <svg
            style={IMAGE_STYLE}
            xmlns='http://www.w3.org/2000/svg'
        >
          <circle cx='15' cy='15' r='15' fill='inherit' />
          <line
            x1='7'
            y1='9.5'
            x2='23'
            y2='9.5'
            stroke='white'
            strokeWidth='3'
          />
          <line
            x1='7'
            y1='15.5'
            x2='23'
            y2='15.5'
            stroke='white'
            strokeWidth='3'
          />
          <line
            x1='7'
            y1='21.5'
            x2='23'
            y2='21.5'
            stroke='white'
            strokeWidth='3'
          />
        </svg>
      </button>);
  }
}

const BUTTON_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  boxSizing: 'border-box',
  backgroundColor: 'transparent',
  margin: '0px',
  padding: '0px',
  cursor: 'pointer',
  border: 'none',
  outline: 'none',
  boxShadow: 'none',
  WebkitTouchCallout: 'none',
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
  KhtmlUserSelect: 'none',
  userSelect: 'none',
  fill: 'transparent',
  width: '30px',
  height: '30px',
};

const IMAGE_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  backgroundColor: 'transparent'
};

const styles = StyleSheet.create({
  button: {
    ':hover': {
      fill: '#F24D3D'
    },
    ':focus': {
      fill: '#F24D3D'
    },
    ':focus-within': {
      fill: '#F24D3D'
    },
    ':active': {
      fill: '#AA2F19'
    }
  }
});
