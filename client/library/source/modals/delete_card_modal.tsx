import * as React from 'react';
import { CloseButton, PrimaryTextButton, SecondaryTextButton
} from '../components';
import { DisplayMode, CreditCardType, getCreditCardTypeName
} from '../definitions';

interface Properties {
  displayMode: DisplayMode;

  creditType: CreditCardType;
  /** Indicates the close button is clicked. */

  cardLast4digits: string;

  /** Indicates the close button is clicked. */
  onClose: () => void;

  /** Indicates the delete button is clicked. */
  onDelete: () => void;
}

/** Displays the Delete Card Modal. */
export class DeleteCardModal extends React.Component<Properties> {
  constructor(props: Properties) {
    super(props);
    this._containerRef = React.createRef();
  }

  public render(): JSX.Element {
    const { containerStyle, contentContainerStyle } = (() => {
      if (this.props.displayMode === DisplayMode.MOBILE) {
        return {
          containerStyle: MOBILE_CONTAINER_STYLE,
          contentContainerStyle: MOBILE_CONTENT_CONTAINER_STYLE
        };
      }
      return {
        containerStyle: CONTAINER_STYLE,
        contentContainerStyle: CONTENT_CONTAINER_STYLE
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
          <div style={contentContainerStyle} >
            <h1 style={HEADING_STYLE} >Delete card</h1>
            <div style={TEXT_STYLE} >
              Delete <b>{getCreditCardTypeName(this.props.creditType)}&nbsp;
              ending in •••• {this.props.cardLast4digits}</b> from your account?
            </div>
            <div style={BUTTONS_CONTAINER_STYLE} >
              <PrimaryTextButton
                style={DELETE_BUTTON_STYLE}
                label='Delete'
                onClick={this.props.onDelete}
              />
              <SecondaryTextButton
                style={CANCEL_BUTTON_STYLE}
                label='Cancel'
                onClick={this.props.onClose}
              />
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
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '440px',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  borderRadius: '4px',
  overflow: 'hidden',
  backgroundColor: '#FFFFFF'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTAINER_STYLE,
  width: '100%',
  maxWidth: '375px'
};

const CLOSE_BUTTON_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: '20px',
  right: '20px'
};

const CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '50px',
  width: '100%',
  gap: '30px'
};

const MOBILE_CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTENT_CONTAINER_STYLE,
  padding: '50px 20px'
};

const HEADING_STYLE: React.CSSProperties = {
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
  whiteSpace: 'pre',
  width: '100%',
  margin: '0px',
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
  whiteSpace: 'pre',
  margin: '0px',
  padding: '0px',
  width: '100%'
};

const BUTTONS_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  gap: '20px'
};

const DELETE_BUTTON_STYLE: React.CSSProperties = {
  width: '143px',
  minWidth: '143px',
  height: '35px',
  minHeight: '35px'
};

const CANCEL_BUTTON_STYLE: React.CSSProperties = {
  width: '113px',
  minWidth: '113px',
  height: '35px',
  minHeight: '35px'
};
