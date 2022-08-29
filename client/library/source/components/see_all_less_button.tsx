import * as React from 'react';
import { css, StyleSheet } from 'aphrodite';

/** Displays the SeeAll Button. */
export function SeeAllButton(props: React.ButtonHTMLAttributes<
    HTMLButtonElement>) {
  return (
    <button
        {...props}
        style={{...BUTTON_STYLE, ...props.style}}
        className={css(styles.text)}
    >
      <div style={IMAGE_CONTAINER_STYLE} >
        <img
          style={IMAGE_STYLE}
          src='resources/icons/see_all.svg'
          alt='See All Icon'
        />
      </div>
      <p style={TEXT_STYLE} >See All</p>
    </button>);
}

/** Displays the SeeLess Button. */
export function SeeLessButton(props: React.ButtonHTMLAttributes<
    HTMLButtonElement>) {
  return (
    <button
        {...props}
        style={{...BUTTON_STYLE, ...props.style}}
        className={css(styles.text)}
    >
      <div style={IMAGE_CONTAINER_STYLE} >
        <img
          style={IMAGE_STYLE}
          src='resources/icons/see_less.svg'
          alt='See Less Icon'
        />
      </div>
      <p style={TEXT_STYLE} >See Less</p>
    </button>);
}

const BUTTON_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '68px',
  gap: '10px',
  backgroundColor: 'transparent',
  outline: 'none',
  border: 'none',
  textDecoration: 'none',
  boxShadow: 'none',
  cursor: 'pointer',
  color: '#EFEFEF',
  margin: '0px',
  padding: '0px'
};

const IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '68px',
  backgroundColor: 'currentColor',
  borderRadius: '50%'
};

const IMAGE_STYLE: React.CSSProperties = {
  backgroundColor: 'transparent',
  width: '20px',
  height: '12px'
};

const TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  textAlign: 'center',
  color: '#000000',
  textDecoration: 'inherit',
  textTransform: 'capitalize'
};

const styles = StyleSheet.create({
  text: {
    ':hover': {
      textDecorationLine: 'underline',
      color: '#E9E9E9'
    },
    ':focus': {
      textDecorationLine: 'underline',
      color: '#E9E9E9'
    },
    ':focus-within': {
      textDecorationLine: 'underline',
      color: '#E9E9E9'
    },
    ':active': {
      textDecorationLine: 'underline',
      color: '#CCCCCC'
    }
  }
});
