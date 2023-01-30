import * as EmailValidator from 'email-validator';
import * as React from 'react';
import { EmailInputField, PrimaryTextButton } from '../../components';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;
  email: string;
  name: string;
  referralCode: string;

  /** The page error code. */
  errorCode: JoinPage.ErrorCode;

  emailErrorCode: JoinPage.EmailErrorCode;
  nameErrorCode: JoinPage.NameErrorCode;

  onNameChange: (newName: string) => void;

  onEmailChange: (newEmail: string) => void;

  onReferralChange: (newValue: string) => void;

  /** Indicates the Join button is clicked. */
  onJoin: () => void;
}

interface State {
  email: string;
  name: string;
  referralCode: string;
  emailErrorCode: JoinPage.EmailErrorCode;
  nameErrorCode: JoinPage.NameErrorCode;
}

/** Displays the Join Page. */
export class JoinPage extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      name: this.props.name,
      email: this.props.email,
      referralCode: this.props.referralCode,
      nameErrorCode: JoinPage.NameErrorCode.NONE,
      emailErrorCode: JoinPage.EmailErrorCode.NONE
    };
  }

  public render(): JSX.Element {
    const { containerStyle, imageSection } = (() => {
      if (this.props.displayMode === DisplayMode.MOBILE) {
        return {
          containerStyle: MOBILE_CONTAINER_STYLE,
          imageSection: null
        };
      }
      return {
        containerStyle: CONTAINER_STYLE,
        imageSection: <div style={{...IMAGE_STYLE, ...DESKTOP_IMAGE_STYLE}} />,
      };
    })();
    const nameErrorMessage = (() => {
      if (this.props.nameErrorCode === JoinPage.NameErrorCode.EMPTY) {
        return (
          <div style={ERROR_MESSAGE_STYLE} >
            * This field is required.
          </div>);
      }
      return null;
    })();
    const emailErrorMessage = (() => {
      if (this.props.emailErrorCode === JoinPage.EmailErrorCode.EMPTY) {
        return (
          <div style={ERROR_MESSAGE_STYLE} >
            * This field is required.
          </div>);
      }
      if (this.props.emailErrorCode === JoinPage.EmailErrorCode.NOT_AN_EMAIL) {
        return (
          <div style={ERROR_MESSAGE_STYLE} >
            Please enter a valid email address.
          </div>);
      }
      return null;
    })();
    return (
      <div style={FORM_STYLE} >
        <div style={containerStyle} >
          <div style={LOGO_CONTAINER_STYLE} >
            <img
              style={LOGO_STYLE}
              src='resources/join_page/icons/logo.svg'
              alt='NEA Logo'
            />
          </div>
          <h1 style={HEADING_TEXT_STYLE} >Join NeverEatAlone!</h1>
          <p style={TEXT_STYLE} >
            Fill in the form below to request your account.
          </p>
          <NameInputField
            style={nameFieldStyle}
            placeholder='Your Name'
            hasError={this.state.nameErrorCode !==
              JoinPage.NameErrorCode.NONE}
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
              JoinPage.EmailErrorCode.NONE}
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
            onClick={this.handleJoin}
          />
        </div>
        {imageSection}
      </div>);
  }

  private checkEmail = () => {
    if (this.state.email.length === 0) {
      this.setState({ emailErrorCode: JoinPage.EmailErrorCode.EMPTY });
      return false;
    } else if (!EmailValidator.validate(this.state.email)) {
      this.setState({ emailErrorCode: JoinPage.EmailErrorCode.NOT_AN_EMAIL });
      return false;
    } else {
      this.setState({ emailErrorCode: JoinPage.EmailErrorCode.NONE });
      return true;
    }
  }

  private checkName = () => {
    if (this.state.name.trim().length === 0) {
      this.setState({
        nameErrorCode: JoinPage.NameErrorCode.EMPTY,
        name: this.state.name.trim()
      });
      return false;
    } else {
      this.setState({
        nameErrorCode: JoinPage.NameErrorCode.NONE,
        name: this.state.name.trim()
      });
      return true;
    }
  }

  private handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onEmailChange(event.target.value.trim());
  }

  private handleJoin = () => {
    const isName = this.checkName();
    const isEmail = this.checkEmail();
    if (isEmail && isName) {
      this.props.onJoin(this.state.email, this.state.name,
        this.state.referralCode);
    }
  }

  private isDisabled = () => {
    return (this.props.name.length === 0 || this.props.email.trim().length
      === 0 || !EmailValidator.validate(this.props.email));
  }
}

export namespace JoinPage {
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
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: '#FFFFFF'
};

const CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '310px',
  minWidth: '310px',
  padding: '50px 80px 60px 30px',
  overflow: 'hidden'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTAINER_STYLE,
  boxSizing: 'border-box',
  width: '100%',
  padding: '50px 30px'
};

const LOGO_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '60px',
  height: '52px',
  marginBottom: '15px'
};

const LOGO_STYLE: React.CSSProperties = {
  backgroundColor: 'transparent',
  minWidth: '60px',
  minHeight: '52px',
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};

const HEADING_TEXT_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '26px',
  lineHeight: '39px',
  color: '#FFFFFF',
  maxWidth: '100%',
  margin: '0px 0px 15px 0px',
  padding: '0px'
};

const TEXT_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  maxWidth: '100%',
  padding: '0px'
};

const ERROR_MESSAGE_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#FF2C79',
  textAlign: 'center',
  padding: '0px',
  margin: '0px'
};

const ERROR_CONTAINER_STYLE: React.CSSProperties = {
  ...ERROR_MESSAGE_STYLE,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  width: '100%',
  minHeight: '40px',
  paddingTop: '17px',
  paddingBottom: '5px',
  whiteSpace: 'pre-line'
};

const INPUT_FIELD_STYLE: React.CSSProperties = {
  marginTop: '20px',
  width: '100%',
  minWidth: '100%',
  minHeight: '38px',
  height: '38px'
};

const ROW_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '20px',
  minHeight: '20px',
  marginTop: '20px'
};

const FORGOT_LINK_STYLE: React.CSSProperties = {
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  minHeight: '18px',
  height: '100%',
  width: 'fit-content',
  minWidth: '104px'
};

const REQUEST_ACCOUNT_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '100%',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '15px',
  textAlign: 'center',
  color: '#000000',
  margin: '0px'
};

const JOIN_LINK_STYLE: React.CSSProperties = {
  fontSize: '12px',
  lineHeight: '15px',
  fontWeight: 400,
  minHeight: '15px',
  width: 'fit-content',
  minWidth: 'fit-content'
};

const OR_LINE_CONTAINER_STYLE: React.CSSProperties = {
  width: '100%',
  height: '6px',
  minHeight: '6px',
  margin: '0px 0px 27px 0px'
};

const OR_LINE_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  width: '100%',
  height: '100%',
  borderBottom: '1px solid #CCCCCC',
  textAlign: 'center',
  fontFamily: 'Roboto',
  fontSize: '11px',
  lineHeight: '13px',
  fontStyle: 'normal',
  fontWeight: 400,
  color: '#000000',
  marginLeft: '0px',
  marginRight: '0px'
};

const OR_SPAN_STYLE: React.CSSProperties = {
  position: 'absolute',
  color: '#000000',
  padding: '0px 4px',
  top: '0px',
  backgroundColor: '#FFFFFF',
  cursor: 'default'
};

const IMAGE_STYLE: React.CSSProperties = {
  backgroundImage: 'url(resources/log_in_page/images/background.jpeg)',
  backgroundSize: 'cover',
  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 128px 100%)',
  height: '100%',
  width: '100%'
};

const DESKTOP_IMAGE_STYLE: React.CSSProperties = {
  minWidth: '750px',
  maxWidth: 'calc(100% - 521px - calc(100% - 1366px) / 2)'
};

const TABLET_IMAGE_STYLE: React.CSSProperties = {
  minWidth: '348px',
  maxWidth: '730px'
};

const SOCIAL_BUTTON_STYLE: React.CSSProperties = {
  width: '100%',
  minWidth: '100%',
  height: '28px',
  minHeight: '28px'
};
