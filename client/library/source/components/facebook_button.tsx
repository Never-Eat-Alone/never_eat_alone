import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';

export function FacebookButton(props: React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) {
  return (
    <a
        {...props}
        style={{...SOCIAL_MEDIA_ICON_CONTAINER_STYLE, ...props.style}}
        className={css(styles.link)}
        target='_blank'
    >
      <svg
          style={SOCIAL_MEDIA_ICON_STYLE}
          viewBox='0 0 28 28'
          xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M25 0.419189H3C1.3125 0.419189 0 1.79419 0 3.41919V25.4192C0 
          27.1067 1.3125 28.4192 3 
          28.4192H11.5625V18.9192H7.625V14.4192H11.5625V11.0442C11.5625 
          7.16919 13.875 4.98169 17.375 4.98169C19.125 4.98169 20.875 5.29419 
          20.875 5.29419V9.10669H18.9375C17 9.10669 16.375 10.2942 16.375 
          11.5442V14.4192H20.6875L20 18.9192H16.375V28.4192H25C26.625 28.4192 
          28 27.1067 28 25.4192V3.41919C28 1.79419 26.625 0.419189 25 
          0.419189Z'
          fill='inherit'
        />
      </svg>
    </a>);
}

const SOCIAL_MEDIA_ICON_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  padding: '0px',
  cursor: 'pointer',
  textDecoration: 'none',
  boxShadow: 'none',
  width: '28px',
  height: '28px',
  fill: '#F26B55',
  borderRadius: '4px'
};

const SOCIAL_MEDIA_ICON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  backgroundColor: 'transparent',
  fill: 'inherit'
};

const styles = StyleSheet.create({
  link: {
    ':hover': {
      fill: '#F26B55',
      boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)'
    },
    ':focus': {
      fill: '#F26B55',
      boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)'
    },
    ':focus-within': {
      fill: '#F26B55',
      boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)'
    },
    ':active': {
      fill: '#AA2F19',
      boxShadow: 'none'
    }
  }
});
