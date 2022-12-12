import * as EmailValidator from 'email-validator';
import * as React from 'react';
import { CloseButton, EmailInputField, InputField, NameInputField,
  PrimaryTextButton } from '../../components';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** Represents the name inputfield value. */
  name: string;

  /** Represents the email input field value. */
  email: string;

  /** Represents a member's name, username or referral link. */
  referralCode: string;

  errorCode: JoinModal.ErrorCode;

  /** Indicates the close button is clicked. */
  onClose: () => void;

  /** Indicates the Request Join button is clicked. */
  onRequestJoin: (name: string, email: string, referralCode: string) => void;
}

interface State {
  name: string;
  email: string;
  referralCode: string;
  nameErrorCode: JoinModal.NameErrorCode;
  emailErrorCode: JoinModal.EmailErrorCode;
}

/** Displays the Join Modal. */
export class JoinModal extends React.Component<Properties , State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      name: this.props.name,
      email: this.props.email,
      referralCode: this.props.referralCode,
      nameErrorCode: JoinModal.NameErrorCode.NONE,
      emailErrorCode: JoinModal.EmailErrorCode.NONE
    };
    this._containerRef = React.createRef();
  }

  public render(): JSX.Element {
    const nameErrorMessage = (() => {
      if (this.state.nameErrorCode === JoinModal.NameErrorCode.EMPTY) {
        return (
          <div style={ERROR_MESSAGE_STYLE} >
            * This field is required.
          </div>);
      }
      return null;
    })();
    const emailErrorMessage = (() => {
      if (this.state.emailErrorCode === JoinModal.EmailErrorCode.EMPTY) {
        return (
          <div style={ERROR_MESSAGE_STYLE} >
            * This field is required.
          </div>);
      }
      if (this.state.emailErrorCode === JoinModal.EmailErrorCode.NOT_AN_EMAIL) {
        return (
          <div style={ERROR_MESSAGE_STYLE} >
            Please enter a valid email address.
          </div>);
      }
      return null;
    })();
    const imageSection = (() => {
      if (this.props.displayMode === DisplayMode.MOBILE) {
        return (
          <div style={MOBILE_IMAGE_SECTION_STYLE} >
            <div style={MOBILE_LOGO_CONTAINER_STYLE} >
              <img
                style={MOBILE_LOGO_STYLE}
                src='resources/join_modal/icons/mobile_logo.svg'
                alt='NEA Logo'
              />
            </div>
            <div style={MOBILE_LOGO_TEXT_STYLE} >Join NeverEatAlone</div>
          </div>);
      }
      return (
        <div style={IMAGE_SECTION_STYLE} >
          <div style={LOGO_CONTAINER_STYLE} >
            <img
              style={LOGO_STYLE}
              src='resources/join_modal/icons/logo.svg'
              alt='NEA Logo'
            />
          </div>
        </div>);
    })();
    const heading = (this.props.displayMode !== DisplayMode.MOBILE && (
      <div style={HEADING_STYLE} > Join NeverEatAlone!</div>) || null);
    const { containerStyle, formContainerStyle, textStyle, nameFieldStyle,
        requestButtonStyle } = (() => {
      if (this.props.displayMode === DisplayMode.MOBILE) {
        return {
          containerStyle: MOBILE_CONTAINER_STYLE,
          formContainerStyle: MOBILE_FORM_CONTAINER_STYLE,
          textStyle: MOBILE_TEXT_STYLE,
          nameFieldStyle: MOBILE_NAME_FIELD_STYLE,
          requestButtonStyle: MOBILE_REQUEST_BUTTON_STYLE
        };
      }
      return {
        containerStyle: CONTAINER_STYLE,
        formContainerStyle: FORM_CONTAINER_STYLE,
        textStyle: TEXT_STYLE,
        nameFieldStyle: NAME_FIELD_STYLE,
        requestButtonStyle: REQUEST_BUTTON_STYLE
      };
    })();
    return (
      <div style={FORM_STYLE} >
        <div ref={this._containerRef} style={containerStyle} >
          <CloseButton
            style={CLOSE_BUTTON_STYLE}
            displayMode={this.props.displayMode}
            onClick={this.props.onClose}
          />
          {imageSection}
          <div style={formContainerStyle} >
            {heading}
            <div style={textStyle} >
              Fill in the form below to request your account.
            </div>
            <NameInputField
              style={nameFieldStyle}
              placeholder='Your Name'
              hasError={this.state.nameErrorCode !==
                JoinModal.NameErrorCode.NONE}
              value={this.state.name}
              onChange={this.handleNameChange}
              onBlur={this.checkName}
            />
            <div style={ERROR_CONTAINER_STYLE} >{nameErrorMessage}</div>
            <EmailInputField
              style={INPUT_STYLE}
              placeholder='Your Email'
              value={this.state.email}
              hasError={this.state.emailErrorCode !==
                JoinModal.EmailErrorCode.NONE}
              onChange={this.handleEmailChange}
              onBlur={this.checkEmail}
            />
            <div style={ERROR_CONTAINER_STYLE} >{emailErrorMessage}</div>
            <InputField
              style={INPUT_STYLE}
              value={this.state.referralCode}
              placeholder='Name/Username of person who invited you? (optional)'
              onChange={this.handleReferralCodeChange}
            />
            <PrimaryTextButton
              style={requestButtonStyle}
              label='Request to join!'
              onClick={this.handleRequestClick}
            />
          </div>
        </div>
      </div>);
  }

  public componentDidMount(): void {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  public componentWillUnmount(): void {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  private handleClickOutside: { (event: any): void } = (
      event: React.MouseEvent) => {
    if (!this._containerRef.current.contains(event.target as Node)) {
      event.preventDefault();
      event.stopPropagation();
      this.props.onClose();
    }
  }

  private handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: event.target.value });
  }

  private handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.target.value.trim() });
  }

  private handleReferralCodeChange = (event: React.ChangeEvent<
      HTMLInputElement>) => {
    this.setState({ referralCode: event.target.value.trim() });
  }

  private checkEmail = () => {
    if (this.state.email.length === 0) {
      this.setState({ emailErrorCode: JoinModal.EmailErrorCode.EMPTY });
      return false;
    } else if (!EmailValidator.validate(this.state.email)) {
      this.setState({ emailErrorCode: JoinModal.EmailErrorCode.NOT_AN_EMAIL});
      return false;
    } else {
      this.setState({ emailErrorCode: JoinModal.EmailErrorCode.NONE});
      return true;
    }
  }

  private checkName = () => {
    if (this.state.name.trim().length === 0) {
      this.setState({
        nameErrorCode: JoinModal.NameErrorCode.EMPTY,
        name: this.state.name.trim()
      });
      return false;
    } else {
      this.setState({
        nameErrorCode: JoinModal.NameErrorCode.NONE,
        name: this.state.name.trim()
      });
      return true;
    }
  }

  private handleRequestClick = () => {
    const isNameValid = this.checkName();
    const isEmailValid = this.checkEmail();
    if (isNameValid && isEmailValid) {
      this.props.onRequestJoin(this.state.name, this.state.email,
        this.state.referralCode);
    }
  }

  private _containerRef: React.RefObject<HTMLDivElement>;
}

export namespace JoinModal {
  export enum ErrorCode {
    NO_CONNECTION,
    NONE
  }

  export enum EmailErrorCode {
    NOT_AN_EMAIL,
    EMPTY,
    NONE
  }

  export enum NameErrorCode {
    EMPTY,
    NONE
  }

  export enum Page {
    INITIAL,
    REQUEST_SENT
  }
}

const FORM_STYLE: React.CSSProperties = {
  position: 'fixed',
  top: '0px',
  left: '0px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgb(150, 150, 150, 0.5)',
  zIndex: 1000
};

const CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  position: 'relative',
  height: '486px',
  minHeight: '486px',
  width: '687px',
  minWidth: '687px',
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
  width: '100%',
  maxWidth: '375px',
  minHeight: '482px',
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
  backgroundImage: 'url(resources/join_modal/illustrations/wave.svg)',
  backgroundSize: 'cover',
  backgroundColor: '#F26B55',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left center',
  minHeight: '486px'
};

const MOBILE_IMAGE_SECTION_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  height: '145px',
  backgroundImage: 'url(resources/join_modal/illustrations/wave.svg)',
  backgroundSize: 'cover',
  backgroundColor: '#F26B55',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left center',
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
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minWidth: '46px',
  minHeight: '40px',
  marginTop: '30px'
};

const MOBILE_LOGO_STYLE: React.CSSProperties = {
  backgroundColor: 'transparent',
  objectFit: 'cover',
  minWidth: '46px'
};

const MOBILE_LOGO_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '26px',
  lineHeight: '39px',
  color: '#FFFFFF',
  marginTop: '15px'
};

const FORM_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '100%',
  width: 'calc(100% - 277px)',
  backgroundColor: '#FFFFFF',
  padding: '70px 50px 50px 50px'
};

const MOBILE_FORM_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  height: 'calc(100% - 145px)',
  backgroundColor: '#FFFFFF',
  padding: '20px 20px 30px 20px'
};

const HEADING_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '30px',
  lineHeight: '44px',
  color: '#000000'
};

const TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  marginTop: '5px'
};

const MOBILE_TEXT_STYLE: React.CSSProperties = {
  ...TEXT_STYLE,
  marginTop: '0px'
};

const NAME_FIELD_STYLE: React.CSSProperties = {
  marginTop: '40px'
};

const MOBILE_NAME_FIELD_STYLE: React.CSSProperties = {
  marginTop: '30px',
  width: '100%',
  minWidth: '100%'
};

const REQUEST_BUTTON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '35px',
  minHeight: '35px',
  marginTop: '50px'
};

const MOBILE_REQUEST_BUTTON_STYLE: React.CSSProperties = {
  ...REQUEST_BUTTON_STYLE,
  marginTop: '30px'
};

const ERROR_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  width: '100%',
  minWidth: '100%',
  minHeight: '30px'
};

const ERROR_MESSAGE_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '18px',
  color: '#FF2C79',
  marginTop: '2px',
  whiteSpace: 'pre-line'
};

const INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  minWidth: '100%'
};
