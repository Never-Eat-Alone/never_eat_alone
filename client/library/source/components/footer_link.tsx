import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import * as Router from 'react-router-dom';
import { DisplayMode } from '../definitions';

interface Properties {
  displayMode: DisplayMode;
  label: string;
  to: string;
  style?: React.CSSProperties;
}

export class FooterLink extends React.Component<Properties> {
  public render(): JSX.Element {
    const lineHeight = (this.props.displayMode === DisplayMode.MOBILE &&
      '22px') || '15px';
    return (
      <Router.Link
          to={this.props.to}
          style={{...LINK_STYLE, ...this.props.style}}
          className={css(styles.link)}
          draggable={false}
      >
        <p style={{...LABEL_STYLE, lineHeight: lineHeight}} >
          {this.props.label}
        </p>
      </Router.Link>);
  }
}

const LINK_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  boxSizing: 'border-box',
  backgroundColor: 'transparent',
  borderRadius: '4px',
  margin: '0px',
  padding: '0px',
  cursor: 'pointer',
  overflow: 'hidden',
  border: 'none',
  outline: 'none',
  textDecoration: 'none'
};

const LABEL_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '12px',
  textAlign: 'center',
  color: '#F26B55',
  margin: '0px',
  padding: '0px'
};

const styles = StyleSheet.create({
  link: {
    ':hover': {
      textDecoration: 'underline solid #F26B55 1px'
    },
    ':focus': {
      textDecoration: 'underline solid #F26B55 1px'
    },
    ':active': {
      textDecoration: 'underline solid #F26B55 1px'
    }
  }
});
