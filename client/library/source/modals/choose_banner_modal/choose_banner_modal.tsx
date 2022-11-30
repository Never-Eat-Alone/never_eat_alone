import * as React from 'react';
import { CloseButton } from '../../components';
import { CoverImage, DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** The selected image by user as their banner. */
  selectedImage: CoverImage;

  /** Cover Images displayed on the modal for the user to choose from. */
  coverImageList: CoverImage[];

  errorCode: ChooseBannerModal.ErrorCode;

  /** Indicates the close button is clicked. */
  onClose: () => void;

  /** Indicates the done button is clicked. */
  onDone: (newImage: CoverImage) => void;
}

interface State {
  selectedImage: CoverImage;
}

export class ChooseBannerModal extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      selectedImage: this.props.selectedImage
    };
  }

  public render(): JSX.Element {
    const errorMessage = (this.props.errorCode ===
      ChooseBannerModal.ErrorCode.NO_CONNECTION &&
      'Something went wrong. Please try again later.' || '');
    return (
      <div style={FORM_STYLE} >
        <div ref={this._containerRef}  >
          <CloseButton
            style={CLOSE_BUTTON_STYLE}
            displayMode={this.props.displayMode}
            onClick={this.props.onClose}
          />
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

export namespace ChooseBannerModal {
  export enum ErrorCode {
    NONE,
    NO_CONNECTION
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
  backgroundColor: 'rgb(150, 150, 150, 0.5)',
  zIndex: 1000
};

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
  width: '100%',
  minHeight: '482px',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  borderRadius: '4px',
  overflow: 'hidden'
};

const CLOSE_BUTTON_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: '20px',
  right: '20px'
};
