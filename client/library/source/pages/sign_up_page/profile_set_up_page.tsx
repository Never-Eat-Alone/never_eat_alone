import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import { AvatarWithCheckMark, NameInputFieldWithCounterInside, PrimaryTextButton
} from '../../components';
import { DisplayMode, UserProfileImage } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** The user display name entered when they requested an account. */
  displayName: string;

  /** The image user selected as profile picture. */
  selectedImage: UserProfileImage;

  userId: number;

  /** The error code that applies to the ProfileSetUpPage. */
  errorCode: ProfileSetUpPage.ErrorCode;

  /** Indicates the upload image button is clicked. */
  onUploadImageClick: (imageFile: File) => void;

  onAvatarClick: (src: string) => void;

  onDisplayNameChange: (newDisplayName: string) => void;

  /** Indicates the let's go button is clicked. */
  onLetsGoClick: () => void;
}

/** Displays the ProfileSetUpPage. */
export class ProfileSetUpPage extends React.Component<Properties> {
  constructor(props: Properties) {
    super(props);
    this._avatarSrcList = [
      '/resources/avatars/profile-image-0.svg',
      '/resources/avatars/profile-image-1.svg',
      '/resources/avatars/profile-image-2.svg',
      '/resources/avatars/profile-image-3.svg',
      '/resources/avatars/profile-image-4.svg',
      '/resources/avatars/profile-image-5.svg',
      '/resources/avatars/profile-image-6.svg',
      '/resources/avatars/profile-image-7.svg',
      '/resources/avatars/profile-image-8.svg',
      '/resources/avatars/profile-image-9.svg',
      '/resources/avatars/profile-image-10.svg',
      '/resources/avatars/profile-image-11.svg',
      '/resources/avatars/profile-image-12.svg',
      '/resources/avatars/profile-image-13.svg',
      '/resources/avatars/profile-image-14.svg',
      '/resources/avatars/profile-image-15.svg',
      '/resources/avatars/profile-image-16.svg',
      '/resources/avatars/profile-image-17.svg',
      '/resources/avatars/profile-image-18.svg',
      '/resources/avatars/profile-image-19.svg'
    ];
  }

  public render(): JSX.Element {
    const contentContainerStyle = (this.props.displayMode ===
      DisplayMode.MOBILE && MOBILE_CONTAINER_STYLE || CONTENT_CONTAINER_STYLE);
    const contentStyle = (this.props.displayMode === DisplayMode.MOBILE &&
      MOBILE_CONTENT_STYLE || CONTENT_STYLE);
    const avatars = [];
    for (const avatarSrc of this._avatarSrcList) {
      const isMarked = avatarSrc === this.props.selectedImage.src;
      avatars.push(<AvatarWithCheckMark key={avatarSrc}
        imageSrc={avatarSrc}
        isMarked={isMarked}
        onClick={() => this.props.onAvatarClick(avatarSrc)} />);
    }
    const isDisplayName = this.props.displayName.length !== 0;
    const nameErrorMessage = (!isDisplayName && 'Please enter a display name.'
      || '');
    const content = ((contentContainerStyle: React.CSSProperties,
        contentStyle: React.CSSProperties) => {
      return (
        <div style={contentContainerStyle} >
          <div style={contentStyle} >
            <div style={TITLE_STYLE} >SUCCESS! LET’S SET UP YOUR PROFILE.</div>
            <div style={ROW_CONTAINER_STYLE} >
              <div style={ICON_CONTAINER_STYLE} >
              <img
                style={ICON_STYLE}
                src={this.props.selectedImage.src}
                alt='Selected Picture'
              />
              </div>
            </div>
            <div style={DISPLAY_NAME_ROW_STYLE} >
              <div style={DISPLAY_NAME_STYLE} >{this.props.displayName}</div>
            </div>
            <NameInputFieldWithCounterInside
              style={NAME_FIELD_STYLE}
              counterValue={this.props.displayName.length}
              maxValue={20}
              placeholder='Display Name (20 characters max.)'
              value={this.props.displayName}
              onChange={this.handleNameChange}
              hasError={!isDisplayName}
            />
            <div style={ERROR_MESSAGE_STYLE} >{nameErrorMessage}</div>
            <div style={YOUR_PICTURE_TITLE_STYLE} >Your profile picture:</div>
            <div style={AVATARS_CONTAINER_STYLE} >
              {avatars}
              <button
                style={UPLOAD_IMAGE_BUTTON_STYLE}
                className={css(styles.uploadImageButton)}
                onClick={this.handleUploadImageClick}
              >
                Upload an Image
              </button>
            </div>
            <div style={ROW_CONTAINER_STYLE} >
              <PrimaryTextButton
                label="Let’s go!"
                style={LETS_GO_BUTTON_STYLE}
                onClick={this.props.onLetsGoClick}
                disabled={!isDisplayName}
              />
            </div>
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

  /** Handles the change in display name inputfield. */
  private handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onDisplayNameChange(event.target.value);
  }

  private handleUploadImageClick = () => {
    // Create a hidden input element with the type 'file'
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*'; // Accept only image files
    input.style.display = 'none';

  // Listen for the 'change' event to get the selected image file
  input.addEventListener('change', (event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files && target.files[0];
    if (file) {
      // Call the onUploadImageClick prop with the selected image file
      this.props.onUploadImageClick(file);
    }
  });

  // Trigger the click event to open the file picker dialog
  input.click();
  }

  private _avatarSrcList: string[];
}

export namespace ProfileSetUpPage {
  export enum ErrorCode {
    NONE,
    NO_CONNECTION
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  backgroundImage: 'url(resources/illustrations/wave.svg)',
  backgroundSize: 'cover',
  backgroundColor: '#F6F6F6',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left center',
  padding: '50px 100px',
  overflow: 'initial'
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
  padding: '50px 30px',
  overflow: 'initial'
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
  padding: '50px 100px',
  overflow: 'initial'
};

const CONTENT_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '460px',
  height: '100%',
  overflow: 'initial'
};

const MOBILE_CONTENT_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  overflow: 'initial'
};

const TITLE_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
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
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  height: '68px',
  width: '68px',
  borderRadius: '50%',
  overflow: 'hidden'
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

const ERROR_MESSAGE_STYLE: React.CSSProperties = {
  marginTop: '2px',
  width: '264px',
  height: '18px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  textAlign: 'right',
  color: '#FF2C79'
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

const ROW_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  width: '100%'
};

const DISPLAY_NAME_ROW_STYLE: React.CSSProperties = {
  ...ROW_CONTAINER_STYLE,
  marginBottom: '30px'
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
  width: '100%',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '18px',
  textAlign: 'center',
  color: '#F26B55',
  cursor: 'pointer',
  border: 'none',
  outline: 'none',
  textDecoration: 'none',
  margin: '0px',
  padding: '0px',
  backgroundColor: 'transparent',
  transition: 'all 0.08s ease-in 0s'
};

const LETS_GO_BUTTON_STYLE: React.CSSProperties = {
  marginTop: '30px',
  width: '100%',
  height: '35px'
};

const NAME_FIELD_STYLE: React.CSSProperties = {
  width: '264px'
};

const styles = StyleSheet.create({
  uploadImageButton: {
    ':hover': {
      textDecoration: 'underline solid #F26B55 1px',
      color: '#F26B55'
    },
    ':focus': {
      textDecoration: 'underline solid #F26B55 1px',
      color: '#F26B55'
    },
    ':focus-within': {
      textDecoration: 'underline solid #F26B55 1px',
      color: '#F26B55'
    },
    ':active': {
      textDecoration: 'underline solid #AA2F19 1px',
      color: '#AA2F19'
    }
  }
});
