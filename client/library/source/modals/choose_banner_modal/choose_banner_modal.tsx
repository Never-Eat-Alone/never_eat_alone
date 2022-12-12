import * as React from 'react';
import { CloseButton, PrimaryTextButton } from '../../components';
import { CoverImage, DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** The selected image by user as their banner. */
  selectedImage: CoverImage;

  /** Cover Images displayed on the modal for the user to choose from. */
  coverImageList: CoverImage[];

  /** Indicates the close button is clicked. */
  onClose: () => void;

  /** Indicates the done button is clicked. */
  onDone: (newImage: CoverImage) => void;
}

interface State {
  selectedImage: CoverImage;
}

/** Displays the Choose Banner Modal. */
export class ChooseBannerModal extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      selectedImage: this.props.selectedImage
    };
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
    const imageList = [];
    for (const image of this.props.coverImageList) {
      const border = (image.id === this.state.selectedImage.id &&
        '3px solid #5EC745' || 'none');
      imageList.push(
        <div
            key={image.id}
            style={{...IMAGE_CONTAINER_STYLE, border: border}}
            onClick={() => this.handleCoverImageClick(image)}
        >
          <img style={IMAGE_STYLE} src={image.src} alt={image.alt} />
        </div>);
    }
    const noCoverImage = CoverImage.NoImage();
    const greyCoverBorder = (this.state.selectedImage.id === noCoverImage.id &&
      '3px solid #5EC745' || 'none');
    imageList.push(
      <div
          key='No_Cover_Image'
          style={{...IMAGE_CONTAINER_STYLE, border: greyCoverBorder}}
          onClick={() => this.handleCoverImageClick(noCoverImage)}
      >
        <img
          src={noCoverImage.src}
          style={GREY_IMAGE_STYLE}
          alt={noCoverImage.alt}
        />
      </div>);
    return (
      <div style={FORM_STYLE} >
        <div ref={this._containerRef} style={containerStyle} >
          <CloseButton
            style={CLOSE_BUTTON_STYLE}
            displayMode={this.props.displayMode}
            onClick={this.props.onClose}
          />
          <div style={contentContainerStyle} >
            <h1 style={HEADING_STYLE} >CHOOSE A BANNER PATTERN:</h1>
            <div style={IMAGE_SECTION_STYLE} >
              {imageList}
            </div>
            <PrimaryTextButton
              style={DONE_BUTTON_STYLE}
              label='Done'
              onClick={this.handleDoneClick}
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

  private handleDoneClick = () => {
    this.props.onDone(this.state.selectedImage);
    this.props.onClose();
  }

  private handleCoverImageClick = (newImage: CoverImage) => {
    this.setState({ selectedImage: newImage });
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

const IMAGE_SECTION_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  width: '100%',
  gap: '15px'
};

const IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100px',
  height: '100px',
  backgroundColor: '#969696'
};

const IMAGE_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};

const GREY_IMAGE_STYLE: React.CSSProperties = {
  width: '50px',
  minWidth: '50px',
  height: '50px',
  minHeight: '50px',
  backgroundColor: 'transparent'
};

const DONE_BUTTON_STYLE: React.CSSProperties = {
  width: '102px',
  minWidth: '102px',
  height: '35px',
  minHeight: '35px',
  fontSize: '12px',
  lineHeight: '15px'
};
