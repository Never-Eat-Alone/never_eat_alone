import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';

export function BackButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>
    ) {
  return (
    <button
        {...props}
        style={{...BUTTON_STYLE, ...props.style}}
        className={css(styles.button)} >
      <svg
          style={BACK_ICON_STYLE}
          xmlns='http://www.w3.org/2000/svg' >
        <path
          d='M9.69388 0.3125C10.2857 0.3125 10.8776 0.544079 11.3265 1.00724C12.2245 1.93355 12.2245 3.43882 11.3265 4.37566L5.57143 10.3125L11.3265 16.2493C12.2245 17.1757 12.2245 18.6809 11.3265 19.6178C10.4286 20.5441 8.96939 20.5441 8.06122 19.6178L0.673469 11.9967C-0.224489 11.0704 -0.224489 9.56513 0.67347 8.62829L8.06123 1.00724C8.51021 0.544079 9.10204 0.3125 9.69388 0.3125Z'
          fill='currentColor'
        />
      </svg>
    </button>);
}

const BUTTON_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'transparent',
  color: '#F26B55',
  borderRadius: '50%',
  border: '3.5px solid #F26B55',
  width: '36px',
  minWidth: '36px',
  height: '36px',
  minHeight: '36px',
  filter: 'none',
  margin: '0px',
  padding: '0px'
};

const BACK_ICON_STYLE: React.CSSProperties = {
  width: '12px',
  height: '20px',
  minWidth: '12px',
  minHeight: '20px',
  backgroundColor: 'transparent'
};

const styles = StyleSheet.create({
  button: {
    ':hover': {
      filter: 'drop-shadow(0px 1px 5px rgba(86, 70, 40, 0.4))',
      border: '3.5px solid #F26B55',
      color: '#F26B55'
    },
    ':focus': {
      filter: 'drop-shadow(0px 1px 5px rgba(86, 70, 40, 0.4))',
      border: '3.5px solid #F26B55',
      color: '#F26B55'
    },
    ':focus-within': {
      filter: 'drop-shadow(0px 1px 5px rgba(86, 70, 40, 0.4))',
      border: '3.5px solid #F26B55',
      color: '#F26B55'
    },
    ':active': {
      border: '3.5px solid #AA2F19',
      color: '#AA2F19'
    },
    ':disabled': {
      border: '3.5px solid #969696',
      color: '#969696'
    }
  }
});
