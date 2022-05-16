import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';

interface Properties {
  style?: React.CSSProperties;
}

export class TwitterButton extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <a
          style={{...SOCIAL_MEDIA_ICON_CONTAINER_STYLE, ...this.props.style}}
          className={css(styles.link)}
          href='https://twitter.com/NEA_Toronto'
          target='_blank'
      >
        <svg
            style={SOCIAL_MEDIA_ICON_STYLE}
            viewBox='0 0 28 28'
            xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M25 0.419189H3C1.3125 0.419189 0 1.79419 0 3.41919V25.4192C0 27.1067 1.3125 28.4192 3 28.4192H25C26.625 28.4192 28 27.1067 28 25.4192V3.41919C28 1.79419 26.625 0.419189 25 0.419189ZM21.9375 10.3567C21.9375 10.5442 21.9375 10.7317 21.9375 10.9192C21.9375 16.2942 17.8125 22.5442 10.25 22.5442C7.9375 22.5442 5.8125 21.9192 4 20.7317C4.3125 20.7942 4.625 20.7942 4.9375 20.7942C6.875 20.7942 8.625 20.1067 10.0625 19.0442C8.25 18.9817 6.75 17.7942 6.1875 16.1692C6.875 16.2942 7.4375 16.2942 8.0625 16.1067C6.1875 15.7317 4.8125 14.1067 4.8125 12.1067V12.0442C5.3125 12.3567 5.9375 12.5442 6.625 12.5442C5.5 11.7942 4.8125 10.5442 4.8125 9.16919C4.8125 8.35669 5 7.66919 5.375 7.04419C7.375 9.54419 10.4375 11.1692 13.8125 11.3567C13.25 8.60669 15.3125 6.29419 17.8125 6.29419C19 6.29419 20.0625 6.79419 20.8125 7.60669C21.75 7.41919 22.625 7.10669 23.4375 6.60669C23.125 7.60669 22.4375 8.35669 21.625 8.85669C22.4375 8.79419 23.25 8.54419 24 8.23169C23.4375 9.04419 22.6875 9.79419 21.9375 10.3567Z'
            fill='inherit'
          />
        </svg>
      </a>);
  }
}

const SOCIAL_MEDIA_ICON_CONTAINER_STYLE: React.CSSProperties = {
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

const SOCIAL_MEDIA_ICON_STYLE: React.CSSProperties = {
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
    ':active': {
      fill: '#AA2F19',
      boxShadow: 'none'
    }
  }
});
