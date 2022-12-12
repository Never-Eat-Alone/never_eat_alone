import { css, StyleSheet } from 'aphrodite';
import * as EmailValidator from 'email-validator';
import * as React from 'react';
import { CloseButton, EmailInputField, InputField, InputFieldWithIcon,
  PrimaryEmailButton } from '../../components';
import { DisplayMode } from '../../definitions';
import { PartnerWithUsPage } from '../../pages';

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

  errorCode: PartnerWithUsPage.PageErrorCode;

  /** Indicates the send email button is clicked. */
  onSendEmail: (name: string, email: string, profileLink: string,
    message: string) => void;

  /** Indicates the close button is clicked. */
  onClose: () => void;
}

interface State {
  name: string;
  nameErrorCode: PartnerWithUsPage.NameErrorCode;
  email: string;
  emailErrorCode: PartnerWithUsPage.EmailErrorCode;
  profileLink: string;
  message: string;
  messageErrorCode: PartnerWithUsPage.MessageErrorCode;
}

export class PartnerWithUsModal extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      name: this.props.name,
      email: this.props.email,
      profileLink: this.props.profileLink,
      message: this.props.message,
      nameErrorCode: PartnerWithUsPage.NameErrorCode.NONE,
      emailErrorCode: PartnerWithUsPage.EmailErrorCode.NONE,
      messageErrorCode: PartnerWithUsPage.MessageErrorCode.NONE
    };
    this._containerRef = React.createRef();
  }

  public render(): JSX.Element {
    const { containerStyle, closeButtonStyle, headingFormStyle,
        textFormContainerStyle, textContainerStyle, formStyle,
        imageContainerStyle, inputStyle } = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          containerStyle: DESKTOP_CONTAINER_STYLE,
          closeButtonStyle: CLOSE_BUTTON_STYLE,
          headingFormStyle: DESKTOP_HEADER_FORM_STYLE,
          textFormContainerStyle: DESKTOP_TEXT_FORM_CONTAINER_STYLE,
          textContainerStyle: DESKTOP_TEXT_CONTAINER_STYLE,
          formStyle: DESKTOP_FORM_STYLE,
          imageContainerStyle: DESKTOP_IMAGE_CONTAINER_STYLE,
          inputStyle: DESKTOP_INPUT_ROW_STYLE
        };
      }
      if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerStyle: TABLET_CONTAINER_STYLE,
          closeButtonStyle: CLOSE_BUTTON_STYLE,
          headingFormStyle: TABLET_HEADER_FORM_STYLE,
          textFormContainerStyle: TABLET_TEXT_FORM_CONTAINER_STYLE,
          textContainerStyle: TABLET_TEXT_CONTAINER_STYLE,
          formStyle: TABLET_FORM_STYLE,
          imageContainerStyle: TABLET_IMAGE_CONTAINER_STYLE,
          inputStyle: TABLET_INPUT_ROW_STYLE
        };
      }
      return {
        containerStyle: MOBILE_CONTAINER_STYLE,
        closeButtonStyle:  MOBILE_CLOSE_BUTTON_STYLE,
        headingFormStyle: MOBILE_HEADER_FORM_STYLE,
        textFormContainerStyle: MOBILE_TEXT_FORM_CONTAINER_STYLE,
        textContainerStyle: MOBILE_TEXT_CONTAINER_STYLE,
        formStyle: MOBILE_FORM_STYLE,
        imageContainerStyle: MOBILE_IMAGE_CONTAINER_STYLE,
        inputStyle: MOBILE_INPUT_COLUMN_STYLE
      };
    })();
    const fieldErrorMessage = (() => {
      if (this.state.emailErrorCode ===
          PartnerWithUsPage.EmailErrorCode.NOT_AN_EMAIL) {
        return 'Enter a valid email.';
      }
      if (this.state.emailErrorCode ===
          PartnerWithUsPage.EmailErrorCode.EMPTY_EMAIL_FIELD) {
        return 'Email is required.'
      }
      if (this.state.nameErrorCode === PartnerWithUsPage.NameErrorCode.EMPTY) {
        return 'Name is required.'
      }
      return '';
    })();
    const messageErrorMessage = (() => {
      if (this.state.messageErrorCode ===
          PartnerWithUsPage.MessageErrorCode.EMPTY) {
        return 'Message is required.'
      }
      return '';
    })();
    return (
      <div style={FORM_STYLE} >
        <div ref={this._containerRef} style={containerStyle} >
          <CloseButton
            displayMode={this.props.displayMode}
            onClick={this.props.onClose}
            style={closeButtonStyle}
          />
          <div style={headingFormStyle} >
            <h1 style={H1_STYLE} >Partner With US</h1>
          </div>
          <div style={imageContainerStyle} >
            <div style={textFormContainerStyle} >
              <div style={textContainerStyle} >
                <div style={IMAGE_TITLE_STYLE} >
                  Take control of your listing on NeverEatAlone
                </div>
                <div style={IMAGE_DESCRIPTION_STYLE} >
                  Take control over the information and menus posted on your 
                  restaurant page. Partner with us and stay connected on our 
                  updates, such as hosting your own events and connecting 
                  directly with customers in the future!
                </div>
              </div>
            </div>
          </div>
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
                onBlur={this.handleNameBlur}
                hasError={this.state.nameErrorCode !==
                  PartnerWithUsPage.NameErrorCode.NONE}
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
            <div style={ERROR_MESSAGE_STYLE} >
              {fieldErrorMessage}
            </div>
            <InputField
              style={LINK_INPUT_STYLE}
              placeholder='(Optional) Link to your restaurant on NEA'
              value={this.state.profileLink}
              onChange={this.handleProfileLinkChange}
              type='url'
            />
            <p style={P_STYLE} >How can we work together?</p>
            <textarea
              style={TEXT_AREA_STYLE}
              className={css(styles.textarea)}
              placeholder='Enter your message'
              value={this.state.message}
              onChange={this.handleMessageChange}
              onBlur={this.handleMessageBlur}
            />
            <div style={ERROR_MESSAGE_STYLE} >
              {messageErrorMessage}
            </div>
            <PrimaryEmailButton
              style={SEND_BUTTON_STYLE}
              label='send'
              disabled={this.isDisabled()}
              onClick={this.handleSendClick}
            />
          </div>
        </div>
      </div>);
  }

  private isDisabled = () => {
    if (this.state.name.trim().length === 0) {
      return true;
    }
    if (this.state.email.trim().length === 0) {
      return true;
    }
    if (!EmailValidator.validate(this.state.email)) {
      return true;
    }
    if (this.state.message.trim().length === 0) {
      return true;
    }
    return false;
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
    if (event.target.value != '') {
      this.setState({
        nameErrorCode: PartnerWithUsPage.NameErrorCode.NONE
      });
    }
  }

  private handleNameBlur = () => {
    if (this.state.name.trim().length === 0) {
      this.setState({ nameErrorCode: PartnerWithUsPage.NameErrorCode.EMPTY });
    }
  }

  private handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ email: event.target.value.trim() });
    if (event.target.value != '') {
      this.setState({
        emailErrorCode: PartnerWithUsPage.EmailErrorCode.NONE
      });
    }
  }

  private handleProfileLinkChange = (event: React.ChangeEvent<HTMLInputElement>
      ) => {
    this.setState({ profileLink: event.target.value.trim() });
  }

  private handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>
      ) => {
    this.setState({ message: event.target.value });
    if (event.target.value != '') {
      this.setState({
        messageErrorCode: PartnerWithUsPage.MessageErrorCode.NONE
      });
    }
  }

  private handleMessageBlur = () => {
    if (this.state.message.trim().length === 0) {
      this.setState({
        messageErrorCode: PartnerWithUsPage.MessageErrorCode.EMPTY
      });
    }
  }

  private handleSendClick = (event: React.MouseEvent) => {
    if (this.checkEmail()) {
      this.props.onSendEmail(this.state.name, this.state.email,
        this.state.profileLink, this.state.message.trim());
    }
  }

  private checkEmail = () => {
    if (this.state.email.length === 0) {
      this.setState({
        emailErrorCode: PartnerWithUsPage.EmailErrorCode.EMPTY_EMAIL_FIELD
      });
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

  private _containerRef: React.RefObject<HTMLDivElement>;
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

const DESKTOP_CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '830px',
  backgroundColor: '#FFFFFF',
  paddingTop: '30px',
  paddingBottom: '30px',
  borderRadius: '4px',
  overflow: 'hidden',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)'
};

const TABLET_CONTAINER_STYLE: React.CSSProperties = {
  ...DESKTOP_CONTAINER_STYLE,
  width: '375px',
  paddingTop: '20px',
  paddingBottom: '20px'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  ...DESKTOP_CONTAINER_STYLE,
  paddingTop: '20px',
  paddingBottom: '20px',
  width: '100%',
  maxWidth: '375px'
};

const DESKTOP_FORM_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'space-between',
  marginTop: '30px',
  paddingLeft: '50px',
  paddingRight: '50px',
  width: '100%'
};

const TABLET_FORM_STYLE: React.CSSProperties = {
  ...DESKTOP_FORM_STYLE,
  paddingLeft: '20px',
  paddingRight: '20px',
  marginTop: '20px',
  width: '100%'
};

const MOBILE_FORM_STYLE: React.CSSProperties = {
  ...DESKTOP_FORM_STYLE,
  paddingLeft: '20px',
  paddingRight: '20px',
  marginTop: '20px',
  width: '100%'
};

const DESKTOP_HEADER_FORM_STYLE: React.CSSProperties = {
  ...DESKTOP_FORM_STYLE,
  marginTop: '0px'
};

const TABLET_HEADER_FORM_STYLE: React.CSSProperties = {
  ...TABLET_FORM_STYLE,
  marginTop: '0px'
};

const MOBILE_HEADER_FORM_STYLE: React.CSSProperties = {
  ...MOBILE_FORM_STYLE,
  marginTop: '0px'
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

const DESKTOP_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '10px',
  width: '100%',
  minWidth: '100%',
  minHeight: '274px',
  marginTop: '50px',
  backgroundImage: 'url(resources/partner_with_us_page/images/background.jpg)',
  backgroundSize: 'cover',
  backgroundColor: '#FFFFFF',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center bottom 38%'
};

const TABLET_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  ...DESKTOP_IMAGE_CONTAINER_STYLE,
  minHeight: '245px'
};

const MOBILE_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  ...DESKTOP_IMAGE_CONTAINER_STYLE,
  minHeight: '300px',
  marginTop: '30px'
};

const DESKTOP_TEXT_FORM_CONTAINER_STYLE: React.CSSProperties = {
  ...DESKTOP_FORM_STYLE,
  justifyContent: 'center',
  alignItems: 'flex-start'
};

const TABLET_TEXT_FORM_CONTAINER_STYLE: React.CSSProperties = {
  ...TABLET_FORM_STYLE,
  justifyContent: 'center',
  alignItems: 'flex-start'
};

const MOBILE_TEXT_FORM_CONTAINER_STYLE: React.CSSProperties = {
  ...MOBILE_FORM_STYLE,
  justifyContent: 'center',
  alignItems: 'center'
};

const DESKTOP_TEXT_CONTAINER_STYLE: React.CSSProperties = {
  ...DESKTOP_FORM_STYLE,
  gap: '10px',
  width: '360px',
  marginTop: '0px'
};

const TABLET_TEXT_CONTAINER_STYLE: React.CSSProperties = {
  ...TABLET_FORM_STYLE,
  gap: '10px',
  width: '360px',
  marginTop: '0px'
};

const MOBILE_TEXT_CONTAINER_STYLE: React.CSSProperties = {
  ...MOBILE_FORM_STYLE,
  gap: '10px',
  marginTop: '0px'
};

const IMAGE_TITLE_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '24px',
  lineHeight: '36px',
  color: '#FFFFFF',
  width: '100%'
};

const IMAGE_DESCRIPTION_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#FFFFFF',
  width: '100%',
  whiteSpace: 'pre-line',
  marginBottom: '20px'
};

const H2_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '27px',
  color: '#000000',
  marginTop: '20px'
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
  margin: '20px 0px 0px 0px',
  padding: '0px'
};

const ICON_STYLE: React.CSSProperties = {
  width: '15px',
  minWidth: '15px',
  height: '15px',
  minHeight: '15px'
};

const TEXT_AREA_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  minHeight: '146px',
  height: '146px',
  border: '1px solid #969696',
  borderRadius: '4px',
  backgroundColor: '#FFFFFF',
  boxShadow: 'none',
  padding: '10px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  outline: 'none',
  marginTop: '20px'
};

const SEND_BUTTON_STYLE: React.CSSProperties = {
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px',
  width: '121px',
  minWidth: '121px',
  height: '35px',
  minHeight: '35px',
  gap: '5px'
};

const ERROR_MESSAGE_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  margin: '2px 0px 0px 0px',
  width:' 100%',
  lineHeight: '18px',
  minHeight: '18px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  color: '#FF2C79'
};

const CLOSE_BUTTON_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: '20px',
  right: '20px'
};

const MOBILE_CLOSE_BUTTON_STYLE: React.CSSProperties = {
  ...CLOSE_BUTTON_STYLE,
  right: '8px'
};

const styles = StyleSheet.create({
  textarea: {
    ':focus': {
      border: '1px solid #969696',
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)'
    },
    ':focus-within': {
      border: '1px solid #969696',
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)'
    },
    '::-webkit-scrollbar': {
      width: '10px',
      backgroundColor: 'transparent',
      color: '#C4C4C4',
      borderRadius: '4px'
    },
    '::-webkit-scrollbar-track': {
      boxShadow: 'none',
      background: 'transparent',
      borderRadius: '4px'
    },
    '::-webkit-scrollbar-thumb': {
      background: '#C4C4C4',
      border: '3px solid rgba(0, 0, 0, 0)',
      backgroundClip: 'padding-box',
      borderRadius: '9999px'
    }
  }
});
