import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import { CircularCounterWithCounterInside } from
'./circular_counter_with_counter_inside';

interface InputFieldProperties extends React.InputHTMLAttributes<
    HTMLInputElement> {
  hasError?: boolean;
}

export function InputField(props: InputFieldProperties) {
  const { hasError, style, ...rest } = props;
  return (
    <input
      style={{...INPUT_STYLE, ...CONTAINER_STYLE, ...CONTAINER_NO_ICON_STYLE,
        ...style}}
      className={rest.disabled && css(styles.disabled) ||
        hasError && css(styles.hasError) || css(styles.container, styles.input)}
      placeholder={rest.placeholder}
      {...rest}
    />);
}

interface InputFieldWithIconProperties extends InputFieldProperties {
  iconSrc?: string;
  iconAlt?: string;
}

export function InputFieldWithIcon(props: InputFieldWithIconProperties) {
  const { hasError, iconSrc, iconAlt, style, ...rest } = props;
  return (
    <div
        style={{...CONTAINER_STYLE, ...CONTAINER_WITH_ICON_STYLE, ...style}}
        className={rest.disabled && css(styles.disabled) ||
          hasError && css(styles.hasError) || css(styles.container)}
    >
      <div style={ICON_CONTAINER_STYLE} >
        <img
          style={ICON_STYLE}
          src={iconSrc}
          alt={iconAlt}
        />
      </div>
      <input style={INPUT_STYLE} className={css(styles.input)} {...rest} />
    </div>);
}

export function EmailInputField(props: InputFieldWithIconProperties) {
  return (
    <InputFieldWithIcon
      {...props}
      type='email'
      name='email'
      iconSrc='resources/input_field/icons/email.svg'
      iconAlt='Email Icon'
    />);
}

export function NameInputField(props: InputFieldWithIconProperties) {
  return (
    <InputFieldWithIcon
      {...props}
      type='text'
      name='name'
      iconSrc='resources/input_field/icons/name.svg'
      iconAlt='Name Icon'
    />);
}

interface InputFieldWithCounter extends InputFieldWithIconProperties {
  counterValue: number;
  maxValue: number;
}

export function NameInputFieldWithCounterInside(props: InputFieldWithCounter) {
  const { hasError, style, counterValue, maxValue, ...rest } = props;
  return (
    <div
        style={{...CONTAINER_STYLE, ...CONTAINER_WITH_ICON_STYLE, ...style}}
        className={rest.disabled && css(styles.disabled) ||
          hasError && css(styles.hasError) || css(styles.container)}
    >
      <div style={ICON_CONTAINER_STYLE} >
        <img
          style={ICON_STYLE}
          src='resources/input_field/icons/name.svg'
          alt='Name Icon'
        />
      </div>
      <input style={INPUT_STYLE} className={css(styles.input)}
        name='name' type='text' {...rest}
      />
      <div style={COUNTER_CONTAINER_STYLE} >
        <CircularCounterWithCounterInside
          value={counterValue}
          maxValue={maxValue}
        />
      </div>
    </div>);
}

interface PasswordState {
  isPasswordHidden: boolean;
  isCapsOn: boolean;
}

export class PasswordInputField extends React.Component<InputFieldProperties,
    PasswordState> {
  public constructor(props: InputFieldProperties) {
    super(props);
    this.state = {
      isPasswordHidden: true,
      isCapsOn: false
    };
  }

  public render(): JSX.Element {
    const { hasError, style, ...rest } = this.props;
    const type = this.state.isPasswordHidden && 'password' || 'text';
    const eyeIconSrc = (this.state.isPasswordHidden &&
      'resources/input_field/icons/hide.svg' ||
      'resources/input_field/icons/show.svg');
    const icons = (() => {
      if (this.state.isCapsOn) {
        return (
          <div style={TWO_ICON_CONTAINER_STYLE} >
            <img
              style={ICON_STYLE}
              src='resources/input_field/icons/caps_lock.svg'
              alt='Capslock Icon'
            />
            <img
              style={ICON_STYLE}
              src={eyeIconSrc}
              alt='Hide Icon'
              onClick={this.handleEyeIconClick}
            />
          </div>);
      }
      return (
        <div style={ICON_CONTAINER_STYLE} onClick={this.handleEyeIconClick} >
          <img
            style={ICON_STYLE}
            src={eyeIconSrc}
            alt='Hide Icon'
          />
        </div>);
    })();
    return (
      <div
          style={{...CONTAINER_STYLE, ...CONTAINER_WITH_ICON_STYLE, ...style}}
          className={rest.disabled && css(styles.disabled) ||
            hasError && css(styles.hasError) || css(styles.container)}
      >
        <div style={ICON_CONTAINER_STYLE} >
          <img
            style={ICON_STYLE}
            src='resources/input_field/icons/password.svg'
            alt='Password Icon'
          />
        </div>
        <input name='password' type={type} style={INPUT_STYLE}
          className={css(styles.input)} {...rest} onKeyUp={this.handleKeyUp}
          onKeyDown={this.handleKeyDown}
        />
        {icons}
      </div>);
  }

  private handleEyeIconClick = () => {
    this.setState({
      isPasswordHidden: !this.state.isPasswordHidden
    });
  }

  private handleKeyUp = (event: React.KeyboardEvent) => {
    if (event.nativeEvent.code === 'CapsLock') {
      this.setState({ isCapsOn: false });
    }
  }

  private handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.nativeEvent.code === 'CapsLock' ||
        event.getModifierState('CapsLock')) {
      this.setState({ isCapsOn: true });
    }
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  borderRadius: '4px',
  border: '1px solid #CCCCCC',
  width: '310px',
  height: '38px',
  color: '#969696'
};

const CONTAINER_NO_ICON_STYLE: React.CSSProperties = {
  padding: '0px 10px 0px 10px'
};

const CONTAINER_WITH_ICON_STYLE: React.CSSProperties = {
  padding: '0px 10px 0px 0px'
};

const INPUT_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '18px',
  height: '18px',
  width: '100%',
  color: 'inherit',
  outline: 'none',
  border: 'none',
  margin: '0px',
  padding: '0px',
  cursor: 'auto',
  backgroundColor: 'transparent'
};

const ICON_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  minWidth: '39px'
};

const ICON_STYLE: React.CSSProperties = {
  width: '20px',
  height: '20px',
  backgroundColor: 'transparent',
  overflow: 'hidden'
};

const TWO_ICON_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  minWidth: '69px',
  gap: '10px'
};

const COUNTER_CONTAINER_STYLE: React.CSSProperties = {
  marginLeft: '5px'
};

const styles = StyleSheet.create({
  container: {
    ':hover': {
      border: '1px solid #969696',
      color: '#000000',
      boxShadow: '0px 1px 5px rgba(86, 70, 40, 0.4)'
    },
    ':focus': {
      border: '1px solid #969696',
      color: '#000000',
      boxShadow: '0px 1px 5px rgba(86, 70, 40, 0.4)'
    },
    ':focus-whitin': {
      border: '1px solid #969696',
      color: '#000000',
      boxShadow: '0px 1px 5px rgba(86, 70, 40, 0.4)'
    },
    ':active': {
      border: '1px solid #969696',
      boxShadow: 'none'
    }
  },
  disabled: {
    border: '1px solid #CCCCCC',
    boxShadow: 'none',
    backgroundColor: '#EFEFEF'
  },
  hasError: {
    borderColor: '#FF2C79'
  },
  input: {
    ':placeholder': {
      color: '#969696',
      fontWeight: 400
    }
  }
});
