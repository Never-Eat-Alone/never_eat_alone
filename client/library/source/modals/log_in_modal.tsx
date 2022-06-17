import * as React from 'react';
import { CloseButton, EmailInputField, PrimaryTextButton } from '../components';
import { DisplayMode } from '../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** Represents the email input field value. */
  email?: string;

  /** represents the form error message. */
  formErrorMessage?: string;

  /** Indicates whether the inputfields have an error or not. */
  inputFieldHasError: boolean;

  /** Indicates the close button is clicked. */
  onClose: () => void;

  /** Indicates the Log In button is clicked. */
  onLogIn: () => void;

  /** Indicates the Forgot password button is clicked. */
  onForgotPassword: () => void;
}

interface State {
  email: string;
  password: string;
}

/** Displays the Log In Modal. */
export class LogInModal extends React.Component<Properties , State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      email: this.props.email || '',
      password: ''
    };
  }

  public render(): JSX.Element {
    const emailErrorMessage = (() => {
      if (!this.props.formErrorMessage) {
        return null;
      }
      return (
        <div style={ERROR_MESSAGE_STYLE} >
          {this.props.formErrorMessage}
        </div>);
    })();
    const imageSection = (() => {
      if (this.props.displayMode === DisplayMode.MOBILE) {
        return (
          <div style={MOBILE_IMAGE_SECTION_STYLE} >
            <div style={MOBILE_LOGO_CONTAINER_STYLE} >
              <img
                style={MOBILE_LOGO_STYLE}
                src='resources/log_in_modal/icons/mobile_logo.svg'
                alt='NEA Logo'
              />
            </div>
            <div style={MOBILE_LOGO_TEXT_STYLE} >LOG IN</div>
          </div>);
      }
      return (
        <div style={IMAGE_SECTION_STYLE} >
          <div style={LOGO_CONTAINER_STYLE} >
            <img
              style={LOGO_STYLE}
              src='resources/log_in_modal/icons/logo.svg'
              alt='NEA Logo'
            />
          </div>
        </div>);
    })();
    const heading = (this.props.displayMode !== DisplayMode.MOBILE && (
      <div style={HEADING_STYLE} > LOG IN</div>) || null);
    const { containerStyle, formContainerStyle, textStyle, requestButtonStyle,
        errorContainerStyle } = (() => {
      if (this.props.displayMode === DisplayMode.MOBILE) {
        return {
          containerStyle: MOBILE_CONTAINER_STYLE,
          formContainerStyle: MOBILE_FORM_CONTAINER_STYLE,
          textStyle: MOBILE_TEXT_STYLE,
          requestButtonStyle: MOBILE_REQUEST_BUTTON_STYLE,
          errorContainerStyle: MOBILE_ERROR_CONTAINER_STYLE
        };
      }
      return {
        containerStyle: CONTAINER_STYLE,
        formContainerStyle: FORM_CONTAINER_STYLE,
        textStyle: TEXT_STYLE,
        requestButtonStyle: REQUEST_BUTTON_STYLE,
        errorContainerStyle: ERROR_CONTAINER_STYLE
      };
    })();
    return (
      <div style={containerStyle} >
        <CloseButton style={CLOSE_BUTTON_STYLE}
          displayMode={this.props.displayMode} onClick={this.props.onClose}
        />
        {imageSection}
        <div style={formContainerStyle} >
          {heading}
          <div style={textStyle} >
            Fill in the form below to request your account.
          </div>
          <EmailInputField
            placeholder='Your Email'
            value={this.state.email}
            hasError={this.props.inputFieldHasError}
            onChange={this.handleEmailChange}
          />
          <div style={errorContainerStyle} >{emailErrorMessage}</div>
          <PrimaryTextButton style={requestButtonStyle}
            label='LOG IN' onClick={this.props.onLogIn} />
        </div>
      </div>);
  }

  private handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.target.value });
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  position: 'relative',
  height: '486px',
  width: '687px',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  borderRadius: '4px',
  overflow: 'hidden'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  position: 'relative',
  width: '335px',
  height: '482px',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  borderRadius: '4px',
  overflow: 'hidden'
};

const CLOSE_BUTTON_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: '20px',
  right: '20px'
};

const IMAGE_SECTION_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '100%',
  width: '277px',
  backgroundSize: 'cover',
  backgroundColor: '#F26B55',
  minHeight: '486px'
};

const MOBILE_IMAGE_SECTION_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  height: '145px',
  backgroundColor: '#F26B55',
  minWidth: '335px'
};

const LOGO_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '174px',
  height: '100px',
  marginLeft: '51px'
};

const LOGO_STYLE: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: '#FFFFFF',
  objectFit: 'cover'
};

const MOBILE_LOGO_CONTAINER_STYLE: React.CSSProperties = {
  marginTop: '30px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '46px',
  minHeight: '40px'
};

const MOBILE_LOGO_STYLE: React.CSSProperties = {
  backgroundColor: 'transparent',
  objectFit: 'cover',
  minWidth: '46px'
};

const MOBILE_LOGO_TEXT_STYLE: React.CSSProperties = {
  marginTop: '15px',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '26px',
  lineHeight: '39px',
  color: '#FFFFFF'
};

const FORM_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '100%',
  width: 'calc(100% - 277px)',
  backgroundColor: '#FFFFFF'
};

const MOBILE_FORM_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  height: 'calc(100% - 145px)',
  backgroundColor: '#FFFFFF'
};

const HEADING_STYLE: React.CSSProperties = {
  marginTop: '70px',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '30px',
  lineHeight: '44px',
  height: '44px',
  color: '#000000'
};

const TEXT_STYLE: React.CSSProperties = {
  marginTop: '5px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000'
};

const MOBILE_TEXT_STYLE: React.CSSProperties = {
  marginTop: '20px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000'
};

const REQUEST_BUTTON_STYLE: React.CSSProperties = {
  marginTop: '50px',
  width: '170px',
  height: '35px'
};

const MOBILE_REQUEST_BUTTON_STYLE: React.CSSProperties = {
  marginTop: '30px',
  width: '170px',
  height: '35px'
};

const ERROR_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  minWidth: '310px',
  width: '310px',
  minHeight: '30px',
  height: '30px'
};

const MOBILE_ERROR_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  minWidth: '295px',
  width: '295px',
  minHeight: '30px',
  height: '30px'
};

const ERROR_MESSAGE_STYLE: React.CSSProperties = {
  height: '18px',
  marginTop: '2px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '18px',
  color: '#FF2C79'
};
