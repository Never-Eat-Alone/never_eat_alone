import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import { DisplayMode } from '../definitions';
import { AvatarWithCheckMark } from './avatar_with_check_mark';
import { NameInputFieldWithCounterInside } from './input_field';
import { PrimaryTextButton } from './text_button';

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
  markIndex: number;
}

export class ProfileSetUpPage extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      imageSrc: 'resources/profile_set_up_page/icons/profile-image-0.svg',
      displayName: this.props.displayName || '',
      markIndex: -1
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
      avatars.push(<AvatarWithCheckMark key={`avatar-${i}`} imageSrc={src}
        isMarked={i === this.state.markIndex}
        onClick={() => this.handleAvatarImageClick(src, i)} />);
    }
    const isDisplayName = this.state.displayName.length !== 0;
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
                  src={this.state.imageSrc}
                  alt='Profile Picture'
                />
              </div>
            </div>
            <div style={ROW_CONTAINER_STYLE} >
              <div style={DISPLAY_NAME_STYLE} >{this.state.displayName}</div>
            </div>
            <div style={YOUR_NAME_TITLE_STYLE} >Your Display Name:</div>
            <NameInputFieldWithCounterInside
              style={NAME_FIELD_STYLE}
              counterValue={this.state.displayName.length}
              maxValue={20}
              placeholder='Display Name (20 characters max.)'
              value={this.state.displayName}
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
                onClick={this.props.onUploadImageClick}
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

  /** Handles the click on the avatar images. */
  private handleAvatarImageClick = (src: string, i: number) => {
    this.setState({ imageSrc: src, markIndex: i });
  }

  /** Handles the change in display name inputfield. */
  private handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ displayName: event.target.value });
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
  padding: '50px 30px'
};

const CONTENT_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '460px'
};

const MOBILE_CONTENT_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
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
  marginTop: '10px',
  marginBottom: '15px'
};

const ROW_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  width: '100%'
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
  width: '123px',
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
