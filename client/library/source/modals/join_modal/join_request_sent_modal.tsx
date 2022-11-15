import * as React from 'react';
import { CloseButton } from '../../components';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** Represents the user's email address. */
  email: string;

  /** Indicates the close button is clicked. */
  onClose: () => void;
}

/** Displays the Join Request Sent modal. */
export class JoinRequestSentModal extends React.Component<Properties> {
  constructor(props: Properties) {
    super(props);
    this._containerRef = React.createRef();
  }

  public render(): JSX.Element {
    const containerStyle = (this.props.displayMode === DisplayMode.MOBILE &&
      MOBILE_CONTAINER_STYLE || CONTAINER_STYLE);
    return (
      <div style={FORM_STYLE} >
        <div ref={this._containerRef} style={containerStyle} >
          <CloseButton
            style={CLOSE_BUTTON_STYLE}
            displayMode={this.props.displayMode}
            onClick={this.props.onClose}
          />
          <div style={CONTENT_CONTAINER_STYLE} >
            <div style={EMAIL_SENT_ICON_CONTAINER_STYLE} >
              <img
                style={EMAIL_SENT_ICON_STYLE}
                src='resources/join_request_sent_modal/icons/email_sent.svg'
                alt='Email Sent Icon'
              />
            </div>
            <div style={HEADING_TEXT_STYLE} >Request sent!</div>
            <div style={TEXT_STYLE} >
              You should receive an email confirmation to
            </div>
            <div style={EMAIL_TEXT_STYLE} >{this.props.email}</div>
            <div style={LAST_LINE_TEXT_STYLE} >
              We can’t wait to have you in the NEA community!
            </div>
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

const CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  borderRadius: '4px',
  width: '585px',
  minHeight: '360px'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTAINER_STYLE,
  width: '100%'
};

const CLOSE_BUTTON_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: '20px',
  right: '20px'
};

const CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center'
};

const EMAIL_SENT_ICON_CONTAINER_STYLE: React.CSSProperties = {
  width: '80px',
  height: '40px'
};

const EMAIL_SENT_ICON_STYLE: React.CSSProperties = {
  backgroundColor: 'transparent',
  minWidth: '80px',
  width: '100%',
  objectFit: 'cover'
};

const HEADING_TEXT_STYLE: React.CSSProperties = {
  marginTop: '10px',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '30px',
  lineHeight: '44px',
  color: '#000000'
};

const TEXT_STYLE: React.CSSProperties = {
  marginTop: '10px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '24px',
  height: '24px',
  textAlign: 'center',
  color: '#000000'
};

const EMAIL_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '24px',
  height: '24px',
  textAlign: 'center',
  color: '#000000'
};

const LAST_LINE_TEXT_STYLE: React.CSSProperties = {
  marginTop: '24px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '24px',
  height: '24px',
  textAlign: 'center',
  color: '#000000'
};
