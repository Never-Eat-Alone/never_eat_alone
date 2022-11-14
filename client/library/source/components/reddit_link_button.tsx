import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';

export class RedditLinkButton extends React.Component<React.LinkHTMLAttributes<
    HTMLLinkElement>> {
  public render(): JSX.Element {
    return (
      <a
          style={{...ICON_CONTAINER_STYLE, ...this.props.style}}
          className={css(styles.link)}
          href='https://www.reddit.com/user/nevereataloneapp'
          target='_blank'
      >
        <svg
            style={ICON_STYLE}
            viewBox='0 0 28 28'
            xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M17.6875 20.0442C17.5 19.9192 17.25 19.9192 17.125 20.0442C15.875 21.2942 12 21.2317 10.8125 20.0442C10.6875 19.9192 10.4375 19.9192 10.25 20.0442C10.125 20.2317 10.125 20.4817 10.25 20.6067C11.8125 22.1692 16.125 22.1692 17.6875 20.6067C17.8125 20.4817 17.8125 20.2317 17.6875 20.0442ZM11.9375 16.6692C11.9375 15.7317 11.25 14.9817 10.3125 14.9817C9.375 14.9817 8.625 15.7317 8.625 16.6692C8.625 17.6067 9.375 18.3567 10.3125 18.3567C11.25 18.3567 11.9375 17.6067 11.9375 16.6692ZM17.625 14.9817C16.75 14.9817 16 15.7317 16 16.6692C16 17.6067 16.75 18.3567 17.625 18.3567C18.5625 18.3567 19.3125 17.6067 19.3125 16.6692C19.3125 15.7317 18.5625 14.9817 17.625 14.9817ZM28 3.41919C28 1.79419 26.625 0.419189 25 0.419189H3C1.3125 0.419189 0 1.79419 0 3.41919V25.4192C0 27.1067 1.3125 28.4192 3 28.4192H25C26.625 28.4192 28 27.1067 28 25.4192V3.41919ZM21.75 12.2317C24.0625 12.2317 24.875 15.3567 22.75 16.4192C22.8125 16.7942 22.875 17.1692 22.875 17.4817C22.875 21.0442 18.875 23.9192 14 23.9192C9.125 23.9192 5.125 21.0442 5.125 17.4817C5.125 17.1692 5.1875 16.7942 5.25 16.4817C3.0625 15.3567 3.875 12.2317 6.1875 12.2317C6.8125 12.2317 7.4375 12.4817 7.8125 12.9192C9.3125 11.8567 11.3125 11.2317 13.5625 11.1067L14.875 5.29419C14.875 5.10669 15.125 4.98169 15.3125 5.04419L19.4375 5.91919C19.6875 5.35669 20.25 4.98169 20.875 4.98169C21.8125 4.98169 22.5625 5.73169 22.5625 6.66919C22.5625 7.60669 21.8125 8.35669 20.875 8.35669C20 8.35669 19.25 7.60669 19.25 6.66919L15.5 5.85669L14.375 11.1067C16.625 11.1692 18.625 11.8567 20.125 12.9192C20.5625 12.4817 21.125 12.2317 21.75 12.2317Z'
            fill='inherit'
          />
        </svg>
      </a>);
  }
}

const ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '28px',
  height: '28px',
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  padding: '0px',
  cursor: 'pointer',
  textDecoration: 'none',
  fill: '#F26B55',
  boxShadow: 'none'
};

const ICON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%'
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
