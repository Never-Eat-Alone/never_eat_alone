import * as EmailValidator from 'email-validator';
import * as React from 'react';
import { EmailInputField, InputField, NameInputField, PrimaryTextButton
} from '../../components';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** The page error code. */
  errorCode: JoinPage.ErrorCode;

  page: JoinPage.Page;

  email: string;

  /** Indicates the Join button is clicked. */
  onJoin: (name: string, email: string, referralCode: string) => void;
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
      name: '',
      email: this.props.email,
      referralCode: '',
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
      if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerStyle: CONTAINER_STYLE,
          imageSection: <div style={{...IMAGE_STYLE, ...TABLET_IMAGE_STYLE}} />
        };
      }
      return {
        containerStyle: CONTAINER_STYLE,
        imageSection: <div style={{...IMAGE_STYLE, ...DESKTOP_IMAGE_STYLE}} />
      };
    })();
    const nameErrorMessage = (() => {
      if (this.state.nameErrorCode === JoinPage.NameErrorCode.EMPTY) {
        return (
          <div style={ERROR_MESSAGE_STYLE} >
            * This field is required.
          </div>);
      }
      return null;
    })();
    const emailErrorMessage = (() => {
      if (this.state.emailErrorCode === JoinPage.EmailErrorCode.EMPTY) {
        return (
          <div style={ERROR_MESSAGE_STYLE} >
            * This field is required.
          </div>);
      }
      if (this.state.emailErrorCode === JoinPage.EmailErrorCode.NOT_AN_EMAIL) {
        return (
          <div style={ERROR_MESSAGE_STYLE} >
            Please enter a valid email address.
          </div>);
      }
      return null;
    })();
    const pageContent = (() => {
      if (this.props.page === JoinPage.Page.REQUEST_SENT) {
        return (
          <div style={containerStyle} >
          
          </div>);
      }
      return (
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
            style={NAME_INPUT_FIELD_STYLE}
            placeholder='Your Name'
            hasError={this.state.nameErrorCode !==
              JoinPage.NameErrorCode.NONE}
            value={this.state.name}
            onChange={this.handleNameChange}
            onBlur={this.checkName}
          />
          <div style={ERROR_CONTAINER_STYLE} >{nameErrorMessage}</div>
          <EmailInputField
            style={EMAIL_INPUT_FIELD_STYLE}
            placeholder='Your Email'
            value={this.state.email}
            hasError={this.state.emailErrorCode !==
              JoinPage.EmailErrorCode.NONE}
            onChange={this.handleEmailChange}
            onBlur={this.checkEmail}
          />
          <div style={ERROR_CONTAINER_STYLE} >{emailErrorMessage}</div>
          <InputField
            style={REFERRAL_INPUT_FIELD_STYLE}
            value={this.state.referralCode}
            placeholder='Name/Username of person who invited you? (optional)'
            onChange={this.handleReferralCodeChange}
          />
          <PrimaryTextButton
            style={REQUEST_BUTTON_STYLE}
            label='Request to join!'
            onClick={this.handleJoin}
            disabled={this.isDisabled()}
          />
        </div>);
    })();
    return (
      <div style={FORM_STYLE} >
        {pageContent}
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
    this.setState({ email: event.target.value.trim() });
  }

  private handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: event.target.value });
  }

  private handleReferralCodeChange = (event: React.ChangeEvent<HTMLInputElement>
      ) => {
    this.setState({ referralCode: event.target.value });
  }

  private handleJoin = () => {
    const isName = this.checkName();
    const isEmail = this.checkEmail();
    if (isEmail && isName) {
      this.props.onJoin(this.state.name, this.state.email,
        this.state.referralCode);
    }
  }

  private isDisabled = () => {
    return (this.state.name.length === 0 || this.state.email.trim().length
      === 0 || !EmailValidator.validate(this.state.email));
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
  backgroundColor: '#FFFFFF',
  overflow: 'initial'
};

const CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '310px',
  minWidth: '310px',
  padding: '50px 80px 60px 30px'
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
  color: '#000000',
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
  fontSize: '12px',
  lineHeight: '18px',
  color: '#FF2C79',
  padding: '0px',
  margin: '0px'
};

const ERROR_CONTAINER_STYLE: React.CSSProperties = {
  ...ERROR_MESSAGE_STYLE,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  width: '100%',
  minHeight: '30px',
  paddingTop: '2px',
  paddingBottom: '10px',
  whiteSpace: 'pre-line'
};

const NAME_INPUT_FIELD_STYLE: React.CSSProperties = {
  marginTop: '20px',
  width: '100%',
  minWidth: '100%',
  minHeight: '38px',
  height: '38px'
};

const EMAIL_INPUT_FIELD_STYLE: React.CSSProperties = {
  width: '100%',
  minWidth: '100%',
  minHeight: '38px',
  height: '38px'
};

const REFERRAL_INPUT_FIELD_STYLE: React.CSSProperties = {
  ...EMAIL_INPUT_FIELD_STYLE
};

const REQUEST_BUTTON_STYLE: React.CSSProperties = {
  minWidth: '100%',
  width: '100%',
  height: '35px',
  minHeight: '35px',
  marginTop: '20px'
};

const IMAGE_STYLE: React.CSSProperties = {
  backgroundImage: 'url(resources/join_page/images/background.jpeg)',
  backgroundSize: 'cover',
  clipPath: 'polygon(0 0, 100% 0, 100% 100%, 128px 100%)',
  height: '100%',
  width: '100%'
};

const DESKTOP_IMAGE_STYLE: React.CSSProperties = {
  minWidth: '750px',
  maxWidth: 'calc(100% - 521px - calc(100% - 1366px) / 2)',
  minHeight: '708px'
};

const TABLET_IMAGE_STYLE: React.CSSProperties = {
  minWidth: '392px',
  maxWidth: '734px',
  minHeight: '708px'
};
