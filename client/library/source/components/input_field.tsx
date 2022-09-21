import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import { CircularCounterWithCounterInside } from
'./circular_counter_with_counter_inside';

interface InputFieldProperties extends React.InputHTMLAttributes<
    HTMLInputElement> {
  hasError?: boolean;
}

export function InputField(props: InputFieldProperties) {
  return (
    <input
      {...props}
      style={{...INPUT_STYLE, ...CONTAINER_STYLE, ...CONTAINER_NO_ICON_STYLE,
        ...props.style}}
      className={props.disabled && css(styles.disabled) ||
        props.hasError && css(styles.hasError) ||
        css(styles.container, styles.input)}
    />);
}

interface InputFieldWithIconProperties extends InputFieldProperties {
  iconSrc?: string;
  iconAlt?: string;
  iconContainerStyle?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
}

export function InputFieldWithIcon(props: InputFieldWithIconProperties) {
  const { hasError, iconSrc, iconAlt, style, ...rest } = props;
  return (
    <div
        style={{...CONTAINER_STYLE, ...CONTAINER_WITH_ICON_STYLE, ...style}}
        className={rest.disabled && css(styles.disabled) ||
          hasError && css(styles.hasError) || css(styles.container)}
    >
      <div style={{...ICON_CONTAINER_STYLE, ...props.iconContainerStyle}} >
        <img
          style={{...ICON_STYLE, ...props.iconStyle}}
          src={iconSrc}
          alt={iconAlt}
        />
      </div>
      <input {...rest} style={INPUT_STYLE} className={css(styles.input)} />
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

export function PaymentCardInputField(props: InputFieldWithIconProperties) {
  return (
    <InputFieldWithIcon
      {...props}
      type='text'
      name='card'
      iconSrc='resources/icons/card.svg'
      iconAlt='Card Icon'
      style={{...PAYMENT_CARD_CONTAINER_STYLE, ...props.style}}
      iconContainerStyle={CARD_ICON_CONTAINER_STYLE}
      iconStyle={CARD_ICON_STYLE}
    />);
}

export function SecurityCodeInputField(props: InputFieldWithIconProperties) {
  return (
    <InputFieldWithIcon
      {...props}
      type='text'
      name='card'
      iconSrc='resources/icons/cvs.svg'
      iconAlt='Card Code Icon'
      style={{...PAYMENT_CARD_CONTAINER_STYLE, ...props.style}}
      iconContainerStyle={CVS_ICON_CONTAINER_STYLE}
      iconStyle={CVS_ICON_STYLE}
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
      <input {...rest} style={INPUT_STYLE} className={css(styles.input)}
        name='name' type='text'
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
  minHeight: '38px',
  color: '#969696'
};

const CONTAINER_NO_ICON_STYLE: React.CSSProperties = {
  padding: '0px 10px 0px 10px'
};

const CONTAINER_WITH_ICON_STYLE: React.CSSProperties = {
  padding: '0px 10px 0px 0px'
};

const PAYMENT_CARD_CONTAINER_STYLE: React.CSSProperties = {
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
  padding: '9px',
  gap: '10px'
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

const CARD_ICON_CONTAINER_STYLE: React.CSSProperties = {
  width: '27px',
  minWidth: '27px',
  height: '18px',
  minHeight: '18px'
};

const CVS_ICON_CONTAINER_STYLE: React.CSSProperties = {
  width: '21px',
  minWidth: '21px',
  height: '18px',
  minHeight: '18px'
};

const ICON_STYLE: React.CSSProperties = {
  width: '20px',
  height: '20px',
  minWidth: '20px',
  minHeight: '20px',
  backgroundColor: 'transparent',
  overflow: 'hidden'
};

const CARD_ICON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minWidth: '27px',
  minHeight: '18px'
};

const CVS_ICON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minWidth: '21px',
  minHeight: '18px'
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
    ':focus-within': {
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
