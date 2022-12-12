import * as React from 'react';
import { CloseButton, PrimaryTextButton, SecondaryTextButton
} from '../components';
import { DisplayMode } from '../definitions';

interface Properties {
  displayMode: DisplayMode;
  onSubmit: () => void;
  onClose: () => void;
}

export class DeactivateAccountModal extends React.Component<Properties> {
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
          <h1 style={H1_TEXT_STYLE} >DEACTIVATE ACCOUNT</h1>
          <h2 style={H2_TEXT_STYLE} >
            Are you sure you want to deactivate your account?
          </h2>
          <p style={P_TEXT_STYLE} >
            All of your information will be kept safe until you reactivate your 
            account. Whenever you’re ready, just log back in to pick up where 
            you left off!
          </p>
          <div style={BUTTONS_CONTAINER_STYLE} >
            <PrimaryTextButton
              label='deactivate account'
              style={SUBMIT_BUTTON_STYLE}
              onClick={this.props.onSubmit}
            />
            <SecondaryTextButton
              label='cancel'
              style={CANCEL_BUTTON_STYLE}
              onClick={this.props.onClose}
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
  zIndex: 1000,
  overflow: 'scroll'
};

const CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  boxSizing: 'border-box',
  width: '400px',
  minWidth: '400px',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  borderRadius: '4px',
  background: '#FFFFFF',
  overflow: 'initial',
  padding: '30px'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTAINER_STYLE,
  width: '100%',
  minWidth: 'auto',
  maxWidth: '375px',
  padding: '20px'
};

const CLOSE_BUTTON_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: '20px',
  right: '20px',
  width: '24px',
  height: '24px',
  backgroundColor: 'transparent'
};

const H1_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '23px',
  lineHeight: '34px',
  textTransform: 'uppercase',
  color: '#000000',
  padding: '0px',
  margin: '0px',
  whiteSpace: 'pre-line',
  width: '100%'
};

const H2_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  padding: '0px',
  margin: '20px 0px 0px 0px',
  whiteSpace: 'pre-line',
  width: '100%'
};

const P_TEXT_STYLE: React.CSSProperties = {
  ...H2_TEXT_STYLE,
  fontWeight: 400
};

const BUTTONS_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  gap: '20px',
  marginTop: '30px'
};

const SUBMIT_BUTTON_STYLE: React.CSSProperties = {
  width: '187px',
  minWidth: '187px',
  height: '35px',
  minHeight: '35px',
  fontSize: '12px',
  lineHeight: '15px'
};

const CANCEL_BUTTON_STYLE: React.CSSProperties = {
  width: '113px',
  minWidth: '113px',
  height: '35px',
  minHeight: '35px',
  fontSize: '12px',
  lineHeight: '15px'
};
