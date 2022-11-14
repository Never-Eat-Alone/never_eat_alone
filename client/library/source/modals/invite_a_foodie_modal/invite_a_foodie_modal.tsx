import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import { CircularCounterWithCounterOutside, CloseButton, EmailInputField,
  FacebookButton, InstagramButton, RedditLinkButton, TwitterButton
} from '../../components';
import { DisplayMode, UserInvitationCode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;
  userInvitationCode: UserInvitationCode;
  emailList: string;
  content: string;
  maxContentLength: number;
  errorCode: InviteAFoodieModal.ErrorCode;
  emailInputFieldErrorCode: EmailInputField.ErrorCode;
  textAreaErrorCode: InviteAFoodieModal.TextErrorCode;
  wrongEmails: string[];
  onClose: () => void;
  onEmailListChange: (newValue: string) => void;
  onEmailListFocus: () => void;
  onEmailListBlur: () => void;
  onContentChange: (newValue: string) => void;
  onSendInviteEmail: () => void;
}

interface State {
  invitationLink: string;
  borderStyle: string;
}

export class InviteAFoodieModal extends React.Component<Properties, State> {
  public static readonly INVITATION_URL = 
    'www.nevereatalone.net/invitation_code/';
  constructor(props: Properties) {
    super(props);
    this._inviteCodeTextArea = React.createRef();
    this.state = {
      invitationLink: `${InviteAFoodieModal.INVITATION_URL +
        this.props.userInvitationCode.invitationCode}`,
      borderStyle: '1px solid #CCCCCC'
    };
    this._containerRef = React.createRef();
  }

  public render(): JSX.Element {
    const emailErrorMessage = (() => {
      if (this.props.emailInputFieldErrorCode ===
          EmailInputField.ErrorCode.INVALID_EMAIL) {
        return 'Enter a valid email.';
      }
      if (this.props.emailInputFieldErrorCode ===
          EmailInputField.ErrorCode.INVALID_SEPARATOR) {
        return 'Seperate Emails Using a comma (,).';
      }
      if (this.props.emailInputFieldErrorCode ===
          EmailInputField.ErrorCode.EMPTY_FIELD) {
        return 'Email is required.'
      }
      if (this.props.emailInputFieldErrorCode ===
          EmailInputField.ErrorCode.NONE) {
        return '';
      }
    })();
    const pageError = (() => {
      if (this.props.errorCode === InviteAFoodieModal.ErrorCode.NO_CONNECTION) {
        return (
          <div style={PAGE_ERROR_STYLE} >
            Check your internet connection and try again later.
          </div>);
      }
      if (this.props.errorCode === InviteAFoodieModal.ErrorCode.EMAIL_FAILED) {
        return (
          <div style={PAGE_ERROR_STYLE} >
            The email couldn't be sent. Please try again later.
          </div>);
      }
      return null;
    })();
    return (
      <div style={FORM_STYLE} >
        <div ref={this._containerRef} style={CONTAINER_STYLE} >
          <CloseButton
            displayMode={this.props.displayMode}
            onClick={this.props.onClose}
          />
          <h1 style={HEADER_STYLE} >Invite a Foodie</h1>
          <p style={INVITE_LINE_STYLE} >
            Invite a friend to join NeverEatAlone! They’ll be able to see the 
            events you’re attending and message you.
          </p>
          <EmailInputField
            placeholder='Seperate Emails Using a comma (,)'
            value={this.props.emailList}
            hasError={this.props.emailInputFieldErrorCode !==
              EmailInputField.ErrorCode.NONE}
            onChange={() => this.props.onEmailListChange}
            onFocus={this.props.onEmailListFocus}
            onBlur={this.props.onEmailListBlur}
          />
          <div style={EMAIL_ERROR_MESSAGE_STYLE} >
            {emailErrorMessage}
          </div>
          <h3 style={CONTENT_TITLE_STYLE} >
            Personalize your message
          </h3>
          <p style={CONTENT_DESCRIPTION_STYLE} >
            Make it yours, or not. Totally your call.
          </p>
          <div
              style={TEXT_AREA_CONTAINER_STYLE}
              className={css(styles.textAreaContainer)}
          >
            <textarea
              style={TEXT_AREA_STYLE}
              className={css(styles.textarea)}
              value={this.props.content}
              onChange={this.onContentChange}
            />
            <div style={COUNTER_ROW_STYLE} >
              <CircularCounterWithCounterOutside
                value={this.props.content.length}
                maxValue={this.props.maxContentLength}
              />
            </div>
          </div>
          <div style={SEND_BUTTON_ROW_STYLE} >
            <button
                style={SEND_BUTTON_STYLE}
                className={css(styles.sendButton)}
                disabled={this.props.emailInputFieldErrorCode !==
                  EmailInputField.ErrorCode.NONE ||
                  this.props.textAreaErrorCode ===
                  InviteAFoodieModal.TextErrorCode.TEXT_OVERFLOW}
                onClick={this.props.onSendInviteEmail}
            >
              <div style={EMAIL_ICON_CONTAINER_STYLE} >
                <img
                  style={EMAIL_ICON_STYLE}
                  src='resources/icons/email_white.svg'
                  alt='Email icon'
                  draggable={false}
                />
              </div>
              <p style={BUTTON_TEXT_STYLE} >Send Email</p>
            </button>
            {pageError}
          </div>
          <div style={SOCIAL_MEDIA_ROW_STYLE} >
            <h2 style={SHARE_TEXT_STYLE} >Or Share Via:</h2>
            <TwitterButton style={SOCIAL_MEDIA_MARGIN} />
            <InstagramButton style={SOCIAL_MEDIA_MARGIN} />
            <FacebookButton style={SOCIAL_MEDIA_MARGIN} />
            <RedditLinkButton style={SOCIAL_MEDIA_MARGIN} />
            <div
                style={{...COPY_CONTAINER_STYLE,
                  border: this.state.borderStyle}}
                className={css(styles.copyContainer)}
            >
              <button
                  style={COPY_ICON_CONTAINER_STYLE}
                  onClick={this.handleCopy}
              >
                <img
                  style={COPY_ICON_STYLE}
                  src='resources/icons/copy.svg'
                  alt='Copy Icon'
                  draggable={false}
                />
              </button>
              <input
                ref={this._inviteCodeTextArea}
                style={INVITE_LINK_TEXT_STYLE}
                value={this.state.invitationLink}
                readOnly
              />
            </div>
          </div>
        </div>
      </div>);
  }

  public componentDidMount(): void {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  public componentDidUpdate(): void {
    if (this.state.invitationLink === 'Link copied!') {
      this._timeOutId = setTimeout(() => {
        this.setState({ invitationLink: `${InviteAFoodieModal.INVITATION_URL +
        this.props.userInvitationCode.invitationCode}`,
        borderStyle: '1px solid #CCCCCC'
      })}, 1500);
    }
  }

  public componentWillUnmount(): void {
    clearTimeout(this._timeOutId);
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

  private onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.props.onContentChange(event.target.value);
  }

  private handleCopy = (event: React.MouseEvent<HTMLElement>) => {
    const invitationLink = `${InviteAFoodieModal.INVITATION_URL +
      this.props.userInvitationCode.invitationCode}`;
    // @ts-ignore
    navigator.clipboard.writeText(invitationLink);
    this.setState({
      invitationLink: 'Link copied!',
      borderStyle: '1px solid #F26B55'
    });
  }

  private _inviteCodeTextArea: React.RefObject<HTMLInputElement>;
  private _timeOutId: NodeJS.Timeout;
  private _containerRef: React.RefObject<HTMLDivElement>;
}

/** InviteAFoodieModal Error Codes. */
export namespace InviteAFoodieModal {
  export enum ErrorCode {
    NONE,
    NO_CONNECTION,
    EMAIL_FAILED
  }

  export enum TextErrorCode {
    NONE,
    TEXT_OVERFLOW
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
  backgroundColor: 'rgb(150, 150, 150, 0.5)'
};

const CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '702px',
  height: '534px',
  backgroundColor: '#FFFFFF',
  padding: '30px'
};

const HEADER_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '26px',
  lineHeight: '39px',
  textTransform: 'uppercase',
  color: '#000000',
  margin: '0px 0px 20px 0px',
  padding: '0px'
};

const INVITE_LINE_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  margin: '0px 0px 30px 0px',
  padding: '0px'
};

const EMAIL_ERROR_MESSAGE_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  margin: '2px 0px 0px 0px',
  width:' 100%',
  lineHeight: '18px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  color: '#FF2C79'
};

const CONTENT_TITLE_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '18px',
  textTransform: 'capitalize',
  color: '#000000',
  height: '18px',
  padding: '0px',
  margin: '0px 0px 2px 0px'
};

const CONTENT_DESCRIPTION_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '12px',
  lineHeight: '15px',
  color: '#969696',
  margin: '0px 0px 10px 0px',
  padding: '0px'
};

const TEXT_AREA_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  width: '100%',
  height: '146px',
  marginBottom: '20px',
  border: '1px solid #CCCCCC',
  borderRadius: '4px',
  backgroundColor: '#FFFFFF',
  boxShadow: 'none',
  paddingBottom: '8px'
};

const PAGE_ERROR_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '12px',
  lineHeight: '15px',
  color: '#FF2C79',
  margin: '0px 20px',
  height: '15px'
};

const TEXT_AREA_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  resize: 'none',
  whiteSpace: 'pre-line',
  width: '100%',
  height: 'calc(144px - 18px)',
  padding: '10px 2px 0px 10px',
  outline: 'none',
  border: 'none',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  scrollbarColor: '#C4C4C4',
  scrollbarWidth: 'thin',
  cursor: 'auto',
  borderRadius: '4px'
};

const COUNTER_ROW_STYLE: React.CSSProperties = {
  position: 'sticky',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: '100%',
  height: '20px',
  paddingRight: '10px'
};

const BUTTON_TEXT_STYLE: React.CSSProperties = {
  color: '#FFFFFF',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '10px',
  lineHeight: '13px',
  textTransform: 'uppercase',
  padding: '0px',
  margin: '0px',
  minWidth: '52px',
  height: '13px'
};

const SEND_BUTTON_STYLE: React.CSSProperties = {
  boxSizing: 'content-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0px',
  width: '112px',
  height: '30px',
  margin: '0px',
  outline: 'none',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#F26B55'
};

const SEND_BUTTON_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  height: '30px',
  marginBottom: '30px'
};

const EMAIL_ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '15px',
  height: '15px',
  margin: '0px 5px'
};

const EMAIL_ICON_STYLE: React.CSSProperties = {
  objectFit: 'cover'
};

const SOCIAL_MEDIA_MARGIN: React.CSSProperties = {
  marginRight: '20px'
};

const SOCIAL_MEDIA_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '38px',
  width: '100%'
};

const SHARE_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '18px',
  lineHeight: '27px',
  color: '#000000',
  margin: '0px 20px 0px 0px',
  padding: '0px'
};

const COPY_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  border: '1px solid #CCCCCC',
  boxSizing: 'border-box',
  borderRadius: '4px',
  height: '100%',
  width: '224px',
  padding: '9px 10px'
};

const COPY_ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '20px',
  height: '20px',
  backgroundColor: '#FFFFFF',
  marginRight: '10px',
  outline: 'none',
  border: 'none'
};

const COPY_ICON_STYLE: React.CSSProperties = {
  height: '100%'
};

const INVITE_LINK_TEXT_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '18px',
  color: '#969696',
  padding: '0px',
  margin: '0px',
  width: '100%',
  height: '18px',
  overflow: 'hidden',
  outline: 'none',
  border: 'none'
};

const styles = StyleSheet.create({
  sendButton: {
    ':hover': {
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)'
    },
    ':focus': {
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)'
    },
    ':active': {
      backgroundColor: ' #F24D3D',
      boxShadow: 'none'
    },
    ':disabled': {
      backgroundColor: '#CCCCCC',
      boxShadow: 'none'
    }
  },
  link: {
    ':hover': {
      fill: '#F26B55',
      boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)'
    },
    ':focus': {
      fill: '#F26B55',
      boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)'
    },
    ':active': {
      fill: '#AA2F19',
      boxShadow: 'none'
    }
  },
  copyContainer: {
    ':hover':{
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)'
    },
    ':focus': {
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)'
    },
    ':focus-within': {
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)'
    },
    ':active': {
      boxShadow: 'none'
    }
  },
  textAreaContainer: {
    ':focus': {
      border: '1px solid #969696',
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)'
    },
    ':focus-within': {
      border: '1px solid #969696',
      boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.4)'
    }
  },
  textarea: {
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
