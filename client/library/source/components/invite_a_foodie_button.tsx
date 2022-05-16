import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';

interface Properties {
  onInviteAFoodie: () => void;
  style?: React.CSSProperties;
}

export class InviteAFoodieButton extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <button
          style={{...INVITE_TEXT_STYLE, ...this.props.style}}
          className={css(styles.link)}
          onClick={this.props.onInviteAFoodie}
      >
        Invite a foodie
      </button>);
  }
}

const INVITE_TEXT_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '18px',
  lineHeight: '22px',
  height: '23px',
  minWidth: '131px',
  color: '#F26B55',
  textTransform: 'uppercase',
  margin: '0px',
  padding: '0px',
  cursor: 'pointer',
  border: 'none',
  outline: 'none',
  textDecoration: 'none',
  backgroundColor: 'transparent'
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
