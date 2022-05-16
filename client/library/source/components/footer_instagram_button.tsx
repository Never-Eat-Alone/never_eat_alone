import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';

interface Properties {
  style?: React.CSSProperties;
}

export class FooterInstagramButton extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <a
          style={{...SOCIAL_MEDIA_ICON_CONTAINER_STYLE, ...this.props.style}}
          className={css(styles.link)}
          href='https://www.instagram.com/nevereatalonetoronto'
          target='_blank'
      >
        <svg
            style={SOCIAL_MEDIA_ICON_STYLE}
            viewBox='0 0 28 28'
            xmlns='http://www.w3.org/2000/svg'
        >
          <path d='M14.0313 6.78125C10.0313 6.78125 6.84375 10.0313 6.84375 13.9688C6.84375 17.9688 10.0313 21.1562 14.0313 21.1562C17.9688 21.1562 21.2188 17.9688 21.2188 13.9688C21.2188 10.0313 17.9688 6.78125 14.0313 6.78125ZM14.0313 18.6562C11.4688 18.6562 9.34375 16.5938 9.34375 13.9688C9.34375 11.4063 11.4063 9.34375 14.0313 9.34375C16.5938 9.34375 18.6562 11.4063 18.6562 13.9688C18.6562 16.5938 16.5938 18.6562 14.0313 18.6562ZM23.1563 6.53125C23.1563 5.59375 22.4063 4.84375 21.4688 4.84375C20.5313 4.84375 19.7812 5.59375 19.7812 6.53125C19.7812 7.46875 20.5313 8.21875 21.4688 8.21875C22.4063 8.21875 23.1563 7.46875 23.1563 6.53125ZM27.9063 8.21875C27.7813 5.96875 27.2813 3.96875 25.6563 2.34375C24.0313 0.71875 22.0312 0.21875 19.7812 0.09375C17.4688 -0.03125 10.5312 -0.03125 8.21875 0.09375C5.96875 0.21875 4.03125 0.71875 2.34375 2.34375C0.71875 3.96875 0.21875 5.96875 0.09375 8.21875C-0.03125 10.5312 -0.03125 17.4688 0.09375 19.7812C0.21875 22.0312 0.71875 23.9688 2.34375 25.6563C4.03125 27.2813 5.96875 27.7813 8.21875 27.9063C10.5312 28.0313 17.4688 28.0313 19.7812 27.9063C22.0312 27.7813 24.0313 27.2813 25.6563 25.6563C27.2813 23.9688 27.7813 22.0312 27.9063 19.7812C28.0313 17.4688 28.0313 10.5312 27.9063 8.21875ZM24.9063 22.2188C24.4688 23.4688 23.4688 24.4063 22.2813 24.9063C20.4063 25.6563 16.0313 25.4688 14.0313 25.4688C11.9688 25.4688 7.59375 25.6563 5.78125 24.9063C4.53125 24.4063 3.59375 23.4688 3.09375 22.2188C2.34375 20.4063 2.53125 16.0313 2.53125 13.9688C2.53125 11.9688 2.34375 7.59375 3.09375 5.71875C3.59375 4.53125 4.53125 3.59375 5.78125 3.09375C7.59375 2.34375 11.9688 2.53125 14.0313 2.53125C16.0313 2.53125 20.4063 2.34375 22.2813 3.09375C23.4688 3.53125 24.4063 4.53125 24.9063 5.71875C25.6563 7.59375 25.4688 11.9688 25.4688 13.9688C25.4688 16.0313 25.6563 20.4063 24.9063 22.2188Z'
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
