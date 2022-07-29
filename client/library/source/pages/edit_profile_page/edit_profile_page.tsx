import * as React from 'react';
import { InvertedSecondaryTextButton } from '../../components';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** The source address of the user's cover image. */
  coverImageSrc: string;

  /** The source address of the user's profile image. */
  profileImageSrc: string;

  /** User's display name. */
  displayName: string;

  /** User's unique username. */
  userName: string;

  /** Indicates the change profile image button is clicked. */
  onChangeProfileImageClick: () => void;
}

/** Displays the edit profile page. */
export class EditProfilePage extends React.Component<Properties> {
  public render(): JSX.Element {
    const { containerStyle, coverImageStyle, changeBannerButtonStyle
        } = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          containerStyle: DESKTOP_CONTAINER_STYLE,
          coverImageStyle: DESKTOP_COVER_IMAGE_STYLE,
          changeBannerButtonStyle: DESKTOP_CHANGE_BANNER_BUTTON_STYLE
        };
      } else if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerStyle: TABLET_CONTAINER_STYLE,
          coverImageStyle: TABLET_COVER_IMAGE_STYLE,
          changeBannerButtonStyle: MOBILE_TABLET_CHANGE_BANNER_BUTTON_STYLE
        };
      } else {
        return {
          containerStyle: MOBILE_CONTAINER_STYLE,
          coverImageStyle: MOBILE_COVER_IMAGE_STYLE,
          changeBannerButtonStyle: MOBILE_TABLET_CHANGE_BANNER_BUTTON_STYLE
        };
      }
    })();
    return (
      <div style={{...CONTAINER_STYLE, ...containerStyle}} >
        <div
          style={{...COVER_IMAGE_STYLE,
            backgroundImage: `url(${this.props.coverImageSrc})`,
            ...coverImageStyle
          }}
        />
        <InvertedSecondaryTextButton
          style={changeBannerButtonStyle}
          label='Change Banner'
          labelStyle={CHANGE_BANNER_LABEL_STYLE}
        />
        <div style={CONTENT_CONTAINER_STYLE} >
          <div style={IMAGE_PRIVACY_CONTAINER_STYLE} >
            <div style={IMAGE_CONTAINER_STYLE} >
              <img
                style={PROFILE_IMAGE_STYLE}
                src={this.props.profileImageSrc}
                alt='Profile Image'
              />
            </div>
            <div style={PUBLIC_HIDDEN_CONTAINER_STYLE} >
              <div style={PUBLIC_HIDDEN_ICON_ROW_STYLE} >
                <div style={PRIVACY_ICON_CONTAINER_STYLE} >
                  <img
                    style={PRIVACY_ICON_STYLE}
                    src='resources/edit_profile_page/icons/public.svg'
                    alt='Public Icon'
                  />
                </div>
                <div style={PRIVACY_TEXT_STYLE} >Public</div>
                <div style={PRIVACY_ICON_CONTAINER_STYLE} >
                  <img
                    style={PRIVACY_ICON_STYLE}
                    src='resources/edit_profile_page/icons/private.svg'
                    alt='Private Icon'
                  />
                </div>
                <div style={PRIVACY_TEXT_STYLE} >Private</div>
              </div>
              <div style={GUIDE_TEXT_STYLE} >
                You can hide sections of your profile by clicking the eye icon.
              </div>
            </div>
          </div>
          <div style={DISPLAY_NAME_TITLE_STYLE} >Your Display Name</div>
        </div>
      </div>);
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyItems: 'flex-start',
  alignItems: 'center',
  width: '100%',
  backgroundColor: '#FFFFFF'
};

const DESKTOP_CONTAINER_STYLE: React.CSSProperties = {
  paddingBottom: '140px'
};

const TABLET_CONTAINER_STYLE: React.CSSProperties = {
  paddingBottom: '115px'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  paddingBottom: '87px'
};

const COVER_IMAGE_STYLE: React.CSSProperties = {
  backgroundSize: 'cover',
  backgroundColor: '#C4C4C4',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left center',
  width: '100%'
};

const DESKTOP_COVER_IMAGE_STYLE: React.CSSProperties = {
  height: '120px'
};

const TABLET_COVER_IMAGE_STYLE: React.CSSProperties = {
  height: '200px'
};

const MOBILE_COVER_IMAGE_STYLE: React.CSSProperties = {
  height: '200px'
};

const MOBILE_TABLET_CHANGE_BANNER_BUTTON_STYLE: React.CSSProperties = {
  width: '211px',
  height: '35px',
  backgroundColor: 'rgba(150, 150, 150, 0.5)',
  marginTop: '-160px'
};

const DESKTOP_CHANGE_BANNER_BUTTON_STYLE: React.CSSProperties = {
  ...MOBILE_TABLET_CHANGE_BANNER_BUTTON_STYLE,
  marginTop: '-80px'
};

const CHANGE_BANNER_LABEL_STYLE: React.CSSProperties = {
  fontSize: '12px',
  lineHeight: '15px',
  color: '#FFFFFF'
};

const CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  backgroundColor: '#FFFFFF',
  padding: '30px',
  width: '630px',
  marginTop: '22px',
  borderRadius: '4px'
};

const IMAGE_PRIVACY_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyItems: 'flex-start',
  alignItems: 'flex-start',
  width: '100%'
};

const IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyItems: 'center',
  alignItems: 'center',
  width: '68px',
  height: '68px',
  marginRight: '30px'
};

const PROFILE_IMAGE_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minWidth: '68px',
  minHeight: '68px',
  objectFit: 'cover',
  backgroundColor: 'transparent',
  borderRadius: '50%'
};

const PUBLIC_HIDDEN_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyItems: 'flex-start',
  alignItems: 'flex-start'
};

const PUBLIC_HIDDEN_ICON_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyItems: 'flex-start',
  alignItems: 'center',
  height: '20px',
  marginBottom: '2px'
};

const PRIVACY_ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyItems: 'center',
  alignItems: 'center',
  width: '20px',
  height: '20px',
  marginRight: '10px'
};

const PRIVACY_ICON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minWidth: '20px',
  minHeight: '20px',
  backgroundColor: 'transparent'
};

const PRIVACY_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  marginRight: '30px'
};

const GUIDE_TEXT_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyItems: 'flex-start',
  alignItems: 'flex-start',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '15px',
  color: '#969696'
};

const DISPLAY_NAME_TITLE_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyItems: 'flex-start',
  alignItems: 'center',
  marginTop: '30px',
  height: '23px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '18px',
  lineHeight: '23px',
  textTransform: 'capitalize',
  color: '#000000'
};
