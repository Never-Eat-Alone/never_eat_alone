import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';

export function PublicButton(props:
    React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
        {...props}
        style={{...BUTTON_STYLE, ...props.style}}
        className={css(styles.button)}
    >
      <svg
          width='20' height='20' viewBox='0 0 20 20' fill='none'
          xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0_9_9779)' >
        <path
          d='M19.2999 9.37C17.6399 7.74 14.2299 5 9.99992 5C5.76992 5 2.35992 7.74 0.709921 9.37C0.485125 9.57785 0.305752 9.82996 0.183075 10.1105C0.0603983 10.391 -0.00292969 10.6938 -0.00292969 11C-0.00292969 11.3062 0.0603983 11.609 0.183075 11.8895C0.305752 12.17 0.485125 12.4221 0.709921 12.63C2.35992 14.26 5.76992 17 9.99992 17C14.2299 17 17.6399 14.26 19.2999 12.63C19.5208 12.4198 19.6966 12.167 19.8168 11.8868C19.937 11.6066 19.9989 11.3049 19.9989 11C19.9989 10.6951 19.937 10.3934 19.8168 10.1132C19.6966 9.83302 19.5208 9.58016 19.2999 9.37ZM9.99992 15C9.2088 15 8.43544 14.7654 7.77764 14.3259C7.11984 13.8864 6.60715 13.2616 6.3044 12.5307C6.00165 11.7998 5.92244 10.9956 6.07678 10.2196C6.23112 9.44371 6.61208 8.73098 7.17149 8.17157C7.7309 7.61216 8.44364 7.2312 9.21956 7.07686C9.99548 6.92252 10.7997 7.00173 11.5307 7.30448C12.2616 7.60723 12.8863 8.11992 13.3258 8.77772C13.7653 9.43552 13.9999 10.2089 13.9999 11C13.9999 12.0609 13.5785 13.0783 12.8283 13.8284C12.0782 14.5786 11.0608 15 9.99992 15Z'
          fill='currentColor'
        />
        <path d='M13 3L12.5 5.32' stroke='currentColor' strokeWidth='2'
          strokeLinecap='round' strokeLinejoin='round'
        />
        <path d='M17.21 7.60001L18.46 5.98001' stroke='currentColor'
          strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'
        />
        <path d='M7.5 5.32L7 3' stroke='currentColor' strokeWidth='2'
          strokeLinecap='round' strokeLinejoin='round'
        />
        <path d='M1.54004 5.98001L2.79004 7.60001' stroke='currentColor'
          strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'
        />
        </g>
        <defs>
        <clipPath id='clip0_9_9779' >
        <rect width='20' height='15' fill='transparent'
          transform='translate(0 2)'
        />
        </clipPath>
        </defs>
      </svg>
    </button>);
}

export function PrivateButton(props:
    React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
        {...props}
        style={{...BUTTON_STYLE, ...props.style}}
        className={css(styles.button)}
    >
      <svg
          width='20' height='20' viewBox='0 0 20 20'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip0_9_9782)' >
        <path
          d='M1 10C2.6 11.58 5.91 14.24 10 14.24C14.09 14.24 17.4 11.58 19 10'
          stroke='currentColor' strokeWidth='2' strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path d='M7 17.37L7.5 15.05' stroke='currentColor' strokeWidth='2'
          strokeLinecap='round' strokeLinejoin='round'
        />
        <path d='M2.79004 12.77L1.54004 14.4' stroke='currentColor'
          strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'
        />
        <path d='M12.5 15.05L13 17.37' stroke='currentColor' strokeWidth='2'
          strokeLinecap='round' strokeLinejoin='round'
        />
        <path d='M18.46 14.4L17.21 12.77' stroke='currentColor' strokeWidth='2'
          strokeLinecap='round' strokeLinejoin='round'
        />
        </g>
        <defs>
        <clipPath id='clip0_9_9782' >
        <rect width='20' height='9.37' fill='transparent'
          transform='translate(0 9)'
        />
        </clipPath>
        </defs>
      </svg>
    </button>);
}

const BUTTON_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'transparent',
  outline: 'none',
  border: 'none',
  margin: '0px',
  padding: '0px',
  boxShadow: 'none',
  filter: 'none',
  textDecoration: 'none',
  color: '#F26B55'
};

const styles = StyleSheet.create({
  button: {
    ':hover': {
      filter: 'drop-shadow(0px 1px 5px rgba(86, 70, 40, 0.4))',
      color: '#F26B55'
    },
    ':focus': {
      filter: 'drop-shadow(0px 1px 5px rgba(86, 70, 40, 0.4))',
      color: '#F26B55'
    },
    ':focus-within': {
      filter: 'drop-shadow(0px 1px 5px rgba(86, 70, 40, 0.4))',
      color: '#F26B55'
    },
    ':active': {
      color: '#AA2F19',
      filter: 'none'
    }
  }
});
