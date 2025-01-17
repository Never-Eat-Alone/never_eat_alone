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
    const { containerStyle, contentContainerStyle, imageContainerStyle } = (
        () => {
      if (this.props.displayMode === DisplayMode.MOBILE) {
        return {
          containerStyle: MOBILE_CONTAINER_STYLE,
          contentContainerStyle: MOBILE_CONTENT_CONTAINER_STYLE,
          imageContainerStyle: MOBILE_IMAGE_CONTAINER_STYLE
        };
      }
      return {
        containerStyle: CONTAINER_STYLE,
        contentContainerStyle: CONTENT_CONTAINER_STYLE,
        imageContainerStyle: IMAGE_CONTAINER_STYLE
      };
    })();
    const imageList = [];
    for (const image of this.props.coverImageList) {
      const border = (image.src === this.state.selectedImage.src &&
        '3px solid #5EC745' || 'none');
      imageList.push(
        <div
            key={image.profileId + image.src}
            style={{...imageContainerStyle, border: border}}
            onClick={() => this.handleCoverImageClick(image)}
        >
          <img style={IMAGE_STYLE} src={image.src} alt='Cover Image' />
        </div>);
    }
    const noCoverImage = CoverImage.noImage();
    const greyCoverBorder = (this.state.selectedImage.src ===
      noCoverImage.src && '3px solid #5EC745' || 'none');
    imageList.push(
      <div
          key='No_Cover_Image'
          style={{...imageContainerStyle, border: greyCoverBorder}}
          onClick={() => this.handleCoverImageClick(noCoverImage)}
      >
        <img
          src={noCoverImage.src}
          style={GREY_IMAGE_STYLE}
          alt='No Cover Image'
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
  padding: '50px 50px',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  borderRadius: '4px',
  background: 'var(--grey-white, #FFF)',
  overflow: 'overlay',
  margin: '74px 10px'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTAINER_STYLE,
  width: '100%',
  maxWidth: '375px',
  padding: '50px 20px'
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
  width: '340px',
  gap: '30px',
  overflow: 'initial'
};

const MOBILE_CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTENT_CONTAINER_STYLE,
  width: '100%'
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
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  width: '100%',
  gap: '15px 20px'
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

const MOBILE_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  ...IMAGE_CONTAINER_STYLE,
  width: '93px',
  height: '93px'
};

const IMAGE_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  overflow: 'hidden'
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
