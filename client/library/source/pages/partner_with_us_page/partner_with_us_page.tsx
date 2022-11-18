import * as EmailValidator from 'email-validator';
import * as React from 'react';
import { EmailInputField, InputFieldWithIcon, InputField, } from '../../components';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** The email's sender name. */
  name: string;

  /** The sender's email. */
  email: string;

  /** The url address to the restaurant profile on NEA. */
  profileLink: string;

  /** The message user typed inside the form. */
  message: string;

  /** Indicates the send email button is clicked. */
  onSendEmail: (name: string, email: string, profileLink: string,
    message: string) => void;
}

interface State {
  name: string;
  email: string;
  profileLink: string;
  message: string;
  emailErrorCode: PartnerWithUsPage.EmailErrorCode;
}

export class PartnerWithUsPage extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      name: '',
      email: '',
      profileLink: '',
      message: '',
      emailErrorCode: PartnerWithUsPage.EmailErrorCode.NONE
    };
  }

  public render(): JSX.Element {
    const { containerStyle, formStyle, imageStyle, inputStyle } = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          containerStyle: DESKTOP_CONTAINER_STYLE,
          formStyle: DESKTOP_FORM_STYLE,
          imageStyle: DESKTOP_IMAGE_STYLE,
          inputStyle: DESKTOP_INPUT_ROW_STYLE
        };
      }
      if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerStyle: TABLET_CONTAINER_STYLE,
          formStyle: TABLET_FORM_STYLE,
          imageStyle: TABLET_IMAGE_STYLE,
          inputStyle: TABLET_INPUT_ROW_STYLE
        };
      }
      return {
        containerStyle: MOBILE_CONTAINER_STYLE,
        formStyle: MOBILE_FORM_STYLE,
        imageStyle: MOBILE_IMAGE_STYLE,
        inputStyle: MOBILE_INPUT_COLUMN_STYLE
      };
    })();

    return (
      <div style={containerStyle} >
        <h1 style={H1_STYLE} >Partner With US</h1>
        <img
          style={imageStyle}
          src='resources/partner_with_us_page/images/background.jpg'
          alt='Partnership Image'
        />
        <div style={formStyle} >
          <h2 style={H2_STYLE} >Ready to get started?</h2>
          <div style={inputStyle} >
            <InputFieldWithIcon
              style={NAME_INPUT_STYLE}
              type='text'
              placeholder='Your name / restaurant'
              iconSrc='resources/partner_with_us_page/icons/name.svg'
              iconStyle={ICON_STYLE}
              value={this.state.name}
              onChange={this.handleNameChange}
            />
            <EmailInputField
              style={EMAIL_INPUT_STYLE}
              placeholder='Your email address'
              value={this.state.email}
              onChange={this.handleEmailChange}
              onBlur={this.checkEmail}
              hasError={this.state.emailErrorCode !==
                PartnerWithUsPage.EmailErrorCode.NONE}
            />
          </div>
          <InputField
            style={LINK_INPUT_STYLE}
            placeholder='(Optional) Link to your restaurant on NEA'
            value={this.state.profileLink}
            onChange={this.handleProfileLinkChange}
            type='url'
          />
          <p style={P_STYLE} >How can we work together?</p>
        </div>
      </div>);
  }

  private handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: event.target.value });
  }

  private handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.target.value.trim() });
  }

  private handleProfileLinkChange = (event: React.ChangeEvent<HTMLInputElement>
      ) => {
    this.setState({ profileLink: event.target.value.trim() });
  }

  private checkEmail = () => {
    if (this.state.email.length === 0) {
      this.setState({ emailErrorCode: PartnerWithUsPage.EmailErrorCode.EMPTY });
      return false;
    } else if (!EmailValidator.validate(this.state.email)) {
      this.setState({
        emailErrorCode: PartnerWithUsPage.EmailErrorCode.NOT_AN_EMAIL
      });
      return false;
    } else {
      this.setState({ emailErrorCode: PartnerWithUsPage.EmailErrorCode.NONE });
      return true;
    }
  }
}

export namespace PartnerWithUsPage {
  export enum Page {
    INITIAL,
    MESSAGE_SENT
  }

  export enum EmailErrorCode {
    EMPTY,
    NOT_AN_EMAIL,
    NONE
  }
}

const DESKTOP_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  backgroundColor: '#FFFFFF',
  paddingTop: '50px',
  paddingBottom: '50px'
};

const TABLET_CONTAINER_STYLE: React.CSSProperties = {
  ...DESKTOP_CONTAINER_STYLE,
  paddingTop: '40px',
  paddingBottom: '114px'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  paddingTop: '30px',
  paddingBottom: '50px'
};

const DESKTOP_FORM_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'space-between',
  gap: '20px 20px',
  marginTop: '50px',
  width: '1150px'
};

const TABLET_FORM_STYLE: React.CSSProperties = {
  ...DESKTOP_FORM_STYLE,
  marginTop: '50px',
  width: '702px'
};

const MOBILE_FORM_STYLE: React.CSSProperties = {
  ...DESKTOP_FORM_STYLE,
  paddingLeft: '20px',
  paddingRight: '20px',
  marginTop: '30px',
  width: '100%'
};

const H1_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '26px',
  lineHeight: '39px',
  textTransform: 'uppercase',
  color: '#000000',
  padding: '0px',
  margin: '0px'
};

const DESKTOP_IMAGE_STYLE: React.CSSProperties = {
  width: '100%',
  minWidth: '100%',
  height: '274px',
  minHeight: '274px',
  marginTop: '50px'
};

const TABLET_IMAGE_STYLE: React.CSSProperties = {
  width: '100%',
  minWidth: '100%',
  height: '245px',
  minHeight: '245px',
  marginTop: '50px'
};

const MOBILE_IMAGE_STYLE: React.CSSProperties = {
  width: '100%',
  minWidth: '100%',
  height: '300px',
  minHeight: '300px',
  marginTop: '30px'
};

const H2_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '27px',
  color: '#000000'
};

const NAME_INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  height: '38px',
  minHeight: '38px'
};

const EMAIL_INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  height: '38px',
  minHeight: '38px'
};

const DESKTOP_INPUT_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  width: '100%',
  gap: '20px'
};

const TABLET_INPUT_ROW_STYLE: React.CSSProperties = {
  ...DESKTOP_INPUT_ROW_STYLE
};

const MOBILE_INPUT_COLUMN_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  gap: '20px'
};

const LINK_INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  minWidth: '100%',
  height: '38px',
  minHeight: '38px'
};

const P_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  margin: '0px',
  padding: '0px'
};

const ICON_STYLE: React.CSSProperties = {
  width: '15px',
  minWidth: '15px',
  height: '15px',
  minHeight: '15px'
};
