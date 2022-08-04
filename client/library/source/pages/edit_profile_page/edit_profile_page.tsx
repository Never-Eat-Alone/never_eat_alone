import * as React from 'react';
import { InvertedSecondaryTextButton, LocationInputField, PublicButton,
  PrivateButton, RedNavLink } from '../../components';
import { DisplayMode, CityProvince } from '../../definitions';

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

  /** Whether User's upcoming events section is private or public. */
  isUpcomingEventsPrivate: boolean;

  /** Whether User's past events section is private or public. */
  isPastEventsPrivate: boolean;

  /** Whether User's location information is private or public. */
  isLocationPrivate: boolean;

  /** The value entered in the location input field. */
  locationValue: string;

  /** Whether the location inputfield has an error or not. */
  locationHasError: boolean;

  /** List of locations matched the location input field. */
  locationList: CityProvince[];

  /** Indicates the location inputfield value changed. */
  onLocationInputChange: () => void;

  /** Indicates the change profile image button is clicked. */
  onChangeProfileImageClick: () => void;

  /** Indicates the change banner's button is clicked. */
  onChangeBanner: () => void;

  /** Indicates the upcoming events's privacy button is clicked. */
  onUpcomingEventPrivacyClick: () => void;

  /** Indicates the past events's privacy button is clicked. */
  onPastEventPrivacyClick: () => void;

  /** Indicates the location's privacy button is clicked. */
  onLocationPrivacyClick: () => void;
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
    const upcomingEventsPrivacyButton = (this.props.isUpcomingEventsPrivate &&
      <PrivateButton onClick={this.handleUpcomingEventsPrivacyClick} /> ||
      <PublicButton onClick={this.handleUpcomingEventsPrivacyClick} />);
    const pastEventsPrivacyButton = (this.props.isPastEventsPrivate &&
      <PrivateButton onClick={this.handlePastEventsPrivacyClick} /> ||
      <PublicButton onClick={this.handlePastEventsPrivacyClick} />);
    const locationPrivacyButton = (this.props.isLocationPrivate &&
      <PrivateButton onClick={this.handleLocationPrivacyClick} /> ||
      <PublicButton onClick={this.handleLocationPrivacyClick} />);
    const dropdown = (() => {
      if (this.props.locationHasError) {
        return <div>Required</div>;
      }
      if (this.props.locationList && this.props.locationList.length !== 0) {
        return (
          <div>
            dropdown menu
          </div>);
      }
      return null;
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
          onClick={this.props.onChangeBanner}
        />
        <div style={CONTENT_CONTAINER_STYLE} >
          <div style={IMAGE_PRIVACY_CONTAINER_STYLE} >
            <div style={IMAGE_CONTAINER_STYLE} >
              <img
                style={PROFILE_IMAGE_STYLE}
                src={this.props.profileImageSrc}
                alt='Profile Image'
              />
              <button
                  style={CHANGE_IMAGE_BUTTON_STYLE}
                  onClick={this.props.onChangeBanner}
              >
                <img
                  style={CHANGE_IMAGE_ICON_STYLE}
                  src='resources/edit_profile_page/icons/change_image.svg'
                  alt='Change Image Icon'
                />
              </button>
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
          <div style={TITLE_STYLE} >Your Display Name</div>
          <div style={DISPLAY_NAME_TEXT_STYLE} >{this.props.displayName}</div>
          <div style={USERNAME_STYLE} >{this.props.userName}</div>
          <div style={GUIDE_TEXT_STYLE} >
            To change your display name or handle, go to&nbsp;
            <RedNavLink
              label='Account Information'
              to='/settings/account_information'
              style={LINK_STYLE}
            />
            &nbsp;in your settings.
          </div>
          <div style={EVENTS_TITLE_STYLE} >Events</div>
          <div style={GUIDE_TEXT_STYLE} >
            If you choose to hide any of the following sections, they will be
            &nbsp;visible only to you.
          </div>
          <div style={SUB_TITLE_CONTAINER_STYLE} >
            <div>UPCOMING EVENTS</div>
            {upcomingEventsPrivacyButton}
          </div>
          <div style={GUIDE_TEXT_STYLE} >
            Publically display the events that you’re attending, or hide&nbsp;
            them for only you to see.
          </div>
          <div style={SUB_TITLE_CONTAINER_STYLE} >
            <div>PAST EVENTS</div>
            {pastEventsPrivacyButton}
          </div>
          <div style={GUIDE_TEXT_STYLE} >
            Publically display the events that you attended, or hide them&nbsp;
            for only you to see.
          </div>
          <div style={ROW_CONTAINER_STYLE} >
            <div style={TITLE_STYLE} >Location</div>
            {locationPrivacyButton}
          </div>
          <div style={GUIDE_TEXT_STYLE} >
            Default location is Toronto, ON.
          </div>
          <div style={LOCATION_MENU_CONTAINER_STYLE} >
            <LocationInputField
              value={this.props.locationValue}
              placeholder='Toronto, ON, CA'
              onChange={this.props.onLocationInputChange}
              hasError={this.props.locationHasError}
            />
            {dropdown}
          </div>
        </div>
      </div>);
  }

  private handleUpcomingEventsPrivacyClick = (event: React.MouseEvent) => {
    this.props.onUpcomingEventPrivacyClick();
  }

  private handlePastEventsPrivacyClick = (event: React.MouseEvent) => {
    this.props.onPastEventPrivacyClick();
  }

  private handleLocationPrivacyClick = (event: React.MouseEvent) => {
    this.props.onLocationPrivacyClick();
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
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
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  marginBottom: '30px'
};

const IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
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

const CHANGE_IMAGE_BUTTON_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  position: 'absolute',
  bottom: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#969696',
  width: '26px',
  height: '26px',
  borderRadius: '4px',
  border: '1px solid #FFFFFF',
  padding: '0px',
  margin: '0px'
};

const CHANGE_IMAGE_ICON_STYLE: React.CSSProperties = {
  height: '16px',
  width: '16px',
  backgroundColor: 'transparent'
};

const PUBLIC_HIDDEN_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start'
};

const PUBLIC_HIDDEN_ICON_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '20px',
  marginBottom: '2px'
};

const PRIVACY_ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
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
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '15px',
  color: '#969696',
  width: '100%'
};

const TITLE_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '23px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '18px',
  lineHeight: '23px',
  textTransform: 'capitalize',
  color: '#000000'
};

const DISPLAY_NAME_TEXT_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '15px',
  color: '#000000',
  width: '100%',
  marginTop: '20px'
};

const USERNAME_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '15px',
  color: '#969696',
  marginBottom: '20px',
  width: '100%'
};

const LINK_STYLE: React.CSSProperties = {
  width: 'fit-content',
  height: '15px'
};

const EVENTS_TITLE_STYLE: React.CSSProperties = {
  ...TITLE_STYLE,
  marginTop: '30px'
};

const SUB_TITLE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '10px',
  marginTop: '10px',
  marginBottom: '4px',
  textTransform: 'uppercase',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000'
};

const ROW_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  gap: '10px',
  marginTop: '30px'
};

const LOCATION_MENU_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%'
};
