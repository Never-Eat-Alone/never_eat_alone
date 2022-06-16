import * as React from 'react';
import { DisplayMode } from '../definitions';
import { AccentTextButton, PrimaryTextButton } from './text_button';

interface Properties {
  displayMode: DisplayMode;

  /** The user display name entered when they requested an account. */
  displayName: string;

  /** Indicates the upload image button is clicked. */
  onUploadImageClick: () => void;

  /** Indicates the let's go button is clicked. */
  onLetsGoClick: () => void;
}

interface State {
  imageSrc: string;
  displayName: string;
}

export class ProfileSetUpPage extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      imageSrc: 'resources/profile_set_up_page/icons/profile-image-0.svg',
      displayName: this.props.displayName || ''
    };
  }

  public render(): JSX.Element {
    const contentContainerStyle = (this.props.displayMode ===
      DisplayMode.MOBILE && MOBILE_CONTAINER_STYLE || CONTENT_CONTAINER_STYLE);
    const contentStyle = (this.props.displayMode === DisplayMode.MOBILE &&
      MOBILE_CONTENT_STYLE || CONTENT_STYLE);
    const avatars = [];
    for (let i = 0; i < 20; ++i) {
      const src = `resources/profile_set_up_page/icons/profile-image-${i}.svg`;
      avatars.push(
        <div key={`avatar-${i}`} style={ICON_CONTAINER_STYLE} >
          <img
            style={ICON_STYLE}
            src={src}
            alt='Avatar'
            onClick={() => this.handleAvatarImageClick(src)}
          />
        </div>);
    }
    const content = ((contentContainerStyle: React.CSSProperties,
        contentStyle: React.CSSProperties) => {
      return (
        <div style={contentContainerStyle} >
          <div style={contentStyle} >
            <div style={TITLE_STYLE} >SUCCESS! LET’S SET UP YOUR PROFILE.</div>
            <div style={ICON_CONTAINER_STYLE} >
              <img
                style={ICON_STYLE}
                src={this.state.imageSrc}
                alt='Profile Picture'
              />
            </div>
            <div style={DISPLAY_NAME_STYLE} >{this.state.displayName}</div>
            <div style={YOUR_NAME_TITLE_STYLE} >Your Display Name:</div>
            <div>input field with counter {this.state.displayName} </div>
            <div style={YOUR_PICTURE_TITLE_STYLE} >Your profile picture:</div>
            <div style={AVATARS_CONTAINER_STYLE} >
              {avatars}
              <AccentTextButton
                label='Upload an Image'
                style={UPLOAD_IMAGE_BUTTON_STYLE}
                onClick={this.props.onUploadImageClick}
              />
            </div>
            <PrimaryTextButton label="Let’s go!" style={LETS_GO_BUTTON_STYLE} />
          </div>
        </div>);
    })(contentContainerStyle, contentStyle);
    if (this.props.displayMode === DisplayMode.MOBILE) {
      return content;
    }
    return (
      <div style={CONTAINER_STYLE} >
        {content}
      </div>);
  }

  /** Handles the click on the avatar images. */
  private handleAvatarImageClick = (src: string) => {
    this.setState({ imageSrc: src });
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backgroundImage: 'url(resources/illustrations/wave.svg)',
  backgroundSize: 'cover',
  backgroundColor: '#F6F6F6',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left center',
  padding: '50px 100px'
};

const CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  borderRadius: '4px',
  padding: '50px 100px'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  borderRadius: '4px',
  width: '100%',
  height: '100%',
  padding: '50px 30px'
};

const CONTENT_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '460px'
};

const MOBILE_CONTENT_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%'
};

const TITLE_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '100%',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '26px',
  lineHeight: '39px',
  color: '#000000',
  marginBottom: '30px',
  textTransform: 'uppercase'
};

const ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '68px',
  width: '68px'
};

const ICON_STYLE: React.CSSProperties = {
  height: '100%',
  width: '100%',
  minWidth: '68px',
  backgroundColor: 'transparent',
  objectFit: 'cover'
};

const DISPLAY_NAME_STYLE: React.CSSProperties = {
  marginTop: '10px',
  height: '23px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '18px',
  lineHeight: '23px',
  textAlign: 'center',
  color: '#000000'
};

const YOUR_NAME_TITLE_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '18px',
  width: '100%',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  marginBottom: '5px'
};

const YOUR_PICTURE_TITLE_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '18px',
  width: '100%',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  marginTop: '30px',
  marginBottom: '15px'
};

const AVATARS_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  width: '100%',
  gap: '30px'
};

const UPLOAD_IMAGE_BUTTON_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  height: '18px',
  width: 'auto',
  padding: '10px 20px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '18px',
  textAlign: 'center',
  color: '#F26B55'
};

const LETS_GO_BUTTON_STYLE: React.CSSProperties = {
  marginTop: '30px',
  width: '123px',
  height: '35px'
};
