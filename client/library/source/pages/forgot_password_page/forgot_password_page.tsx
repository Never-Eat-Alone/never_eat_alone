import * as React from 'react';
import { EmailInputField, PrimaryTextButton } from '../../components';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;
  errorCode: ForgotPasswordPage.ErrorCode;
  onSendLinkClick: (email: string) => void;
}

interface State {
  email: string;
}

export class ForgotPasswordPage extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      email: ''
    };
  }

  public render(): JSX.Element {
    const contentStyle = ((this.props.displayMode === DisplayMode.MOBILE &&
      MOBILE_CONTENT_STYLE) || CONTENT_STYLE);
    const errorMessage = (() => {
      if (this.props.errorCode === ForgotPasswordPage.ErrorCode.EMPTY_FIELD) {
        return 'This field is required.';
      }
      if (this.props.errorCode === ForgotPasswordPage.ErrorCode.NOT_AN_EMAIL) {
        return 'Enter a valid email address.';
      }
      return '';
    })();
    const emailHasError = (this.props.errorCode ===
      ForgotPasswordPage.ErrorCode.EMPTY_FIELD || this.props.errorCode ===
      ForgotPasswordPage.ErrorCode.NOT_AN_EMAIL);
    return (
      <div style={CONTAINER_STYLE} >
        <div style={{...CONTENT_CONTAINER_STYLE, ...contentStyle}} >
          <h1 style={TITLE_STYLE} >Forgot PASSWORD?</h1>
          <p style={P_STYLE} >
            No worries! Fill in your account’s email address below and we&nbsp;
            will send you a recovery link:
          </p>
          <EmailInputField
            style={INPUT_FIELD_STYLE}
            hasError={emailHasError}
            value={this.state.email}
            placeholder='Your Email'
            onChange={this.handleEmailChange}
          />
          <p style={ERROR_MESSAGE_STYLE} >{errorMessage}</p>
          <PrimaryTextButton
            style={BUTTON_STYLE}
            label='Send Recovery Link'
            disabled={this.state.email.length === 0 || this.props.errorCode !==
              ForgotPasswordPage.ErrorCode.NONE}
            onClick={this.handleSendLinkClick}
          />
        </div>
      </div>);
  }

  private handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.target.value.trim() });
  }

  private handleSendLinkClick = () => {
    this.props.onSendLinkClick(this.state.email);
  }
}

export namespace ForgotPasswordPage {
  export enum ErrorCode {
    NO_CONNECTION,
    EMPTY_FIELD,
    NOT_AN_EMAIL,
    NONE
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  backgroundColor: '#FFFFFF',
  padding: '60px 10px 60px 10px'
};

const CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '#F6F6F6',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  borderRadius: '4px'
};

const CONTENT_STYLE: React.CSSProperties = {
  width: '410px',
  padding: '50px'
};

const MOBILE_CONTENT_STYLE: React.CSSProperties = {
  width: '350px',
  padding: '20px'
};

const TITLE_STYLE: React.CSSProperties = {
  width: '100%',
  height: '53px',
  minHeight: '53px',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '36px',
  lineHeight: '53px',
  textTransform: 'uppercase',
  color: '#000000',
  margin: '0px',
  padding: '0px'
};

const P_STYLE: React.CSSProperties = {
  width: '100%',
  height: '36px',
  minHeight: '36px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  padding: '0px',
  margin: '30px 0px 0px 0px'
};

const INPUT_FIELD_STYLE: React.CSSProperties = {
  width: '100%',
  minHeight: '38px',
  margin: '30px 0px 0px 0px'
};

const ERROR_MESSAGE_STYLE: React.CSSProperties = {
  width: '100%',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  height: '18px',
  minHeight: '18px',
  textAlign: 'right',
  color: '#FF2C79',
  padding: '0px',
  margin: '2px 0px 0px 0px'
};

const BUTTON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '35px',
  minHeight: '35px',
  margin: '10px 0px 0px 0px'
};
