import * as React from 'react';
import { CloseButton, EmailInputField, InputField, NameInputField,
  PrimaryTextButton } from '../components';
import { DisplayMode } from '../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** Represents the name inputfield value. */
  name?: string;

  /** Represents the email input field value. */
  email?: string;

  /** Represents a member's name, username or referral link. */
  referralCode?: string;

  /** represents the name inputfield error message. */
  nameErrorMessage?: string;

  /** represents the email inputfield error message. */
  emailErrorMessage?: string;

  /** Indicates whether the name inputfield has an error or not. */
  nameHasError: boolean;

  /** Indicates whether the email inputfield has an error or not. */
  emailHasError: boolean;

  /** Indicates the close button is clicked. */
  onClose: () => void;

  /** Indicates the Request Join button is clicked. */
  onRequestJoin: () => void;
}

interface State {
  name: string;
  email: string;
  referralCode: string;
}

/** Displays the Join Modal. */
export class JoinModal extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      name: this.props.name || '',
      email: this.props.email || '',
      referralCode: this.props.referralCode || ''
    };
  }

  public render(): JSX.Element {
    const nameErrorMessage = (() => {
      if (!this.props.nameErrorMessage) {
        return null;
      }
      return (
        <div style={ERROR_MESSAGE_STYLE} >
          {this.props.nameErrorMessage}
        </div>);
    })();
    const emailErrorMessage = (() => {
      if (!this.props.emailErrorMessage) {
        return null;
      }
      return (
        <div style={ERROR_MESSAGE_STYLE} >
          {this.props.emailErrorMessage}
        </div>);
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
        requestButtonStyle, errorContainerStyle } = (() => {
      if (this.props.displayMode === DisplayMode.MOBILE) {
        return {
          containerStyle: MOBILE_CONTAINER_STYLE,
          formContainerStyle: MOBILE_FORM_CONTAINER_STYLE,
          textStyle: MOBILE_TEXT_STYLE,
          nameFieldStyle: MOBILE_NAME_FIELD_STYLE,
          requestButtonStyle: MOBILE_REQUEST_BUTTON_STYLE,
          errorContainerStyle: MOBILE_ERROR_CONTAINER_STYLE
        };
      }
      return {
        containerStyle: CONTAINER_STYLE,
        formContainerStyle: FORM_CONTAINER_STYLE,
        textStyle: TEXT_STYLE,
        nameFieldStyle: NAME_FIELD_STYLE,
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
          <NameInputField
            style={nameFieldStyle}
            placeholder='Your Name'
            hasError={this.props.nameHasError}
            value={this.state.name}
            onChange={this.handleNameChange}
          />
          <div style={errorContainerStyle} >{nameErrorMessage}</div>
          <EmailInputField
            placeholder='Your Email'
            value={this.state.email}
            hasError={this.props.emailHasError}
            onChange={this.handleEmailChange}
          />
          <div style={errorContainerStyle} >{emailErrorMessage}</div>
          <InputField
            value={this.state.referralCode}
            placeholder='Name/Username of person who invited you? (optional)'
            onChange={this.handleReferralCodeChange}
          />
          <PrimaryTextButton style={requestButtonStyle}
            label='Request to join!' onClick={this.props.onRequestJoin} />
        </div>
      </div>);
  }

  private handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: event.target.value });
  }

  private handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.target.value });
  }

  private handleReferralCodeChange = (event: React.ChangeEvent<
      HTMLInputElement>) => {
    this.setState({ referralCode: event.target.value });
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

const NAME_FIELD_STYLE: React.CSSProperties = {
  marginTop: '40px'
};

const MOBILE_NAME_FIELD_STYLE: React.CSSProperties = {
  marginTop: '30px'
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
