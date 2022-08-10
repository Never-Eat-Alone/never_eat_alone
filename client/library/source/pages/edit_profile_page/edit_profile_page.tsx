import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import { InputField, InputFieldWithIcon, InvertedSecondaryTextButton,
  PublicButton, PrivateButton, RedNavLink, TextareaWithCounter
} from '../../components';
import { CityProvince, Cuisine, DisplayMode, Language
} from '../../definitions';

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

  /** Whether user's upcoming events section is private or public. */
  isUpcomingEventsPrivate: boolean;

  /** Whether user's past events section is private or public. */
  isPastEventsPrivate: boolean;

  /** Whether user's location information is private or public. */
  isLocationPrivate: boolean;

  /** The value entered in the location input field. */
  locationValue: string;

  /** List of locations matched the location input field. */
  suggestedLocationList: CityProvince[];

  /** Whether user's location information is private or public. */
  isLanguagePrivate: boolean;

  /** The value entered in the language input field. */
  languageValue: string;

  /** List of languages matched the language input value. */
  suggestedLanguageList: Language[];

  /** The list of languages that user selected. */
  selectedLanguageList: Language[];

  /** The value entered in the biography textarea. */
  biographyValue: string;

  /** Whether user's biography is private or public. */
  isBiographyPrivate: boolean;

  /** The value entered in the cuisine inputfield. */
  cuisineValue: string;

  /** The list of cuisines matched the cuisine input value. */
  suggestedCuisineList: Cuisine[];

  /** The list of cuisines that user selected. */
  selectedCuisineList: Cuisine[];

  /** Whether user's favorite cuisines are private or public. */
  isCuisinePrivate: boolean;

  /** Whether user's facebook profile link is private or public. */
  isFacebookPrivate: boolean;

  /** Whether user's twitter profile link is private or public. */
  isTwitterPrivate: boolean;

  /** Whether user's instagram profile link is private or public. */
  isInstagramPrivate: boolean;

  /** The value entered in the facebook link inputfield. */
  facebookLink: string;

  /** The value entered in the twitter link inputfield. */
  twitterLink: string;

  /** The value entered in the instagram link inputfield. */
  instagramLink: string;

  /** Indicates the location inputfield value changed. */
  onLocationInputChange: (newValue: string) => void;

  /** Indicates the location's privacy button is clicked. */
  onLocationPrivacyClick: () => void;

  /** Indicates the change profile image button is clicked. */
  onChangeProfileImageClick: () => void;

  /** Indicates the change banner's button is clicked. */
  onChangeBanner: () => void;

  /** Indicates the upcoming events's privacy button is clicked. */
  onUpcomingEventPrivacyClick: () => void;

  /** Indicates the past events's privacy button is clicked. */
  onPastEventPrivacyClick: () => void;

  /** Indicates the language's privacy button is clicked. */
  onLanguagePrivacyClick: () => void;

  /** Indicates the language inputfield value changed. */
  onLanguageInputChange: (newValue: string) => void;

  /** Indicates the biography's privacy button is clicked. */
  onBiographyPrivacyClick: () => void;

  /** Indicates the biography textarea value changed. */
  onBiographyInputChange: (newValue: string) => void;

  /** Indicates the cuisine's privacy button is clicked. */
  onCuisinePrivacyClick: () => void;

  /** Indicates the cuisine input value changed. */
  onCuisineInputChange: (newValue: string) => void;

  /** Indicates the facebook's privacy button is clicked. */
  onFacebookPrivacyClick: () => void;

  /** Indicates the facebook link input value changed. */
  onFacebookInputChange: (newValue: string) => void;

  /** Indicates the twitter's privacy button is clicked. */
  onTwitterPrivacyClick: () => void;

  /** Indicates the twitter link input value changed. */
  onTwitterInputChange: (newValue: string) => void;

  /** Indicates the instagram's privacy button is clicked. */
  onInstagramPrivacyClick: () => void;

  /** Indicates the instagram link input value changed. */
  onInstagramInputChange: (newValue: string) => void;
}

interface State {
  isLocationDropdownDisplayed: boolean;
  isLanguageDropdownDisplayed: boolean;
  isCuisineDropdownDisplayed: boolean;
}

/** Displays the edit profile page. */
export class EditProfilePage extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isLocationDropdownDisplayed: false,
      isLanguageDropdownDisplayed: false,
      isCuisineDropdownDisplayed: false
    };
  }

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
      <PrivateButton onClick={this.props.onUpcomingEventPrivacyClick} /> ||
      <PublicButton onClick={this.props.onUpcomingEventPrivacyClick} />);
    const pastEventsPrivacyButton = (this.props.isPastEventsPrivate &&
      <PrivateButton onClick={this.props.onPastEventPrivacyClick} /> ||
      <PublicButton onClick={this.props.onPastEventPrivacyClick} />);
    const locationPrivacyButton = (this.props.isLocationPrivate &&
      <PrivateButton onClick={this.props.onLocationPrivacyClick} /> ||
      <PublicButton onClick={this.props.onLocationPrivacyClick} />);
    const languagesPrivacyButton = (this.props.isLanguagePrivate &&
      <PrivateButton onClick={this.props.onLanguagePrivacyClick} /> ||
      <PublicButton onClick={this.props.onLanguagePrivacyClick} />);
    const biographyPrivacyButton = (this.props.isBiographyPrivate &&
      <PrivateButton onClick={this.props.onBiographyPrivacyClick} /> ||
      <PublicButton onClick={this.props.onBiographyPrivacyClick} />);
    const cuisinesPrivacyButton = (this.props.isCuisinePrivate &&
      <PrivateButton onClick={this.props.onCuisinePrivacyClick} /> ||
      <PublicButton onClick={this.props.onCuisinePrivacyClick} />);
    const facebookPrivacyButton = (this.props.isFacebookPrivate &&
      <PrivateButton onClick={this.props.onFacebookPrivacyClick} /> ||
      <PublicButton onClick={this.props.onFacebookPrivacyClick} />);
    const twitterPrivacyButton = (this.props.isTwitterPrivate &&
      <PrivateButton onClick={this.props.onTwitterPrivacyClick} /> ||
      <PublicButton onClick={this.props.onTwitterPrivacyClick} />);
    const instagramPrivacyButton = (this.props.isInstagramPrivate &&
      <PrivateButton onClick={this.props.onInstagramPrivacyClick} /> ||
      <PublicButton onClick={this.props.onInstagramPrivacyClick} />);
    const locationInputFieldStyle = (this.state.isLocationDropdownDisplayed &&
      INPUT_WITH_DROPDOWN_STYLE || INPUT_FIELD_STYLE);
    const languageInputFieldStyle = (this.state.isLanguageDropdownDisplayed &&
      INPUT_WITH_DROPDOWN_STYLE || INPUT_FIELD_STYLE);
    const cuisineInputFieldStyle = (this.state.isCuisineDropdownDisplayed &&
      INPUT_WITH_DROPDOWN_STYLE || INPUT_FIELD_STYLE);
    const locationDropdown = (() => {
      if (this.props.locationValue.trim().length === 0) {
        return <div>Required</div>;
      }
      if (this.state.isLocationDropdownDisplayed &&
          this.props.suggestedLocationList &&
          this.props.suggestedLocationList.length !== 0) {
        const rows = this.props.suggestedLocationList.map(location => {
          return (
            <div
                key={location.id}
                style={DROPDOWN_ROW_STYLE}
                className={css(styles.dropdownRow)}
            >
              {location.city}, {location.province}, {location.country}
            </div>);
        });
        return (
          <div style={DROPDOWN_CONTAINER_STYLE} >
            {rows}
          </div>);
      }
      return null;
    })();
    const languageDropdown = (() => {
      if (this.state.isLanguageDropdownDisplayed &&
          this.props.suggestedLanguageList &&
          this.props.suggestedLanguageList.length !== 0) {
        const rows = this.props.suggestedLanguageList.map(language => {
          return (
            <div
                key={language.id}
                style={DROPDOWN_ROW_STYLE}
                className={css(styles.dropdownRow)}
            >
              {language.name}
            </div>);
        });
        return (
          <div style={DROPDOWN_CONTAINER_STYLE} >
            {rows}
          </div>);
      }
      return null;
    })();
    const cuisineDropdown = (() => {
      if (this.state.isCuisineDropdownDisplayed &&
          this.props.suggestedCuisineList &&
          this.props.suggestedCuisineList.length !== 0) {
        const rows = this.props.suggestedCuisineList.map(cuisine => {
          return (
            <div
                key={cuisine.id}
                style={DROPDOWN_ROW_STYLE}
                className={css(styles.dropdownRow)}
            >
              {cuisine.label}
            </div>);
        });
        return (
          <div style={DROPDOWN_CONTAINER_STYLE} >
            {rows}
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
                  onClick={this.props.onChangeProfileImageClick}
              >
                <img
                  style={CHANGE_IMAGE_ICON_STYLE}
                  src='resources/edit_profile_page/icons/change_image.svg'
                  alt='Change Image Icon'
                />
              </button>
            </div>
            <div style={COLUMN_CONTAINER_STYLE} >
              <div style={DISPLAY_NAME_TEXT_STYLE} >
                {this.props.displayName}
              </div>
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
            </div>
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
          <div style={TITLE_MARGIN_STYLE} >Events</div>
          <div style={GUIDE_TEXT_STYLE} >
            If you choose to hide any of the following sections, they will be
            &nbsp;visible only to you.
          </div>
          <div style={SUB_TITLE_CONTAINER_STYLE} >
            {upcomingEventsPrivacyButton}
            <div>UPCOMING EVENTS</div>
          </div>
          <div style={GUIDE_TEXT_STYLE} >
            Publically display the events that you’re attending, or hide&nbsp;
            them for only you to see.
          </div>
          <div style={SUB_TITLE_CONTAINER_STYLE} >
            {pastEventsPrivacyButton}
            <div>PAST EVENTS</div>
          </div>
          <div style={GUIDE_TEXT_STYLE} >
            Publically display the events that you attended, or hide them&nbsp;
            for only you to see.
          </div>
          <div style={ROW_CONTAINER_STYLE} >
            {locationPrivacyButton}
            <div style={TITLE_STYLE} >Location</div>
          </div>
          <div style={GUIDE_TEXT_STYLE} >
            Enter your city here.
          </div>
          <InputField
            style={{...locationInputFieldStyle, ...MARGIN_STYLE}}
            value={this.props.locationValue}
            placeholder='City, Province'
            type='text'
            onChange={this.handleLocationInputChange}
            onFocus={this.handleDisplayLocationDropdown}
            onBlur={this.handleHideLocationDropdown}
          />
          {locationDropdown}
          <div style={ROW_CONTAINER_STYLE} >
            {languagesPrivacyButton}
            <div style={TITLE_STYLE} >Languages</div>
          </div>
          <div style={GUIDE_TEXT_STYLE} >
            Helps you connect to more people. Optional.
          </div>
          <InputField
            style={{...languageInputFieldStyle, ...MARGIN_STYLE}}
            value={this.props.languageValue}
            placeholder='Start typing to add a language...'
            type='text'
            onChange={this.handleLanguageInputChange}
            onFocus={this.handleDisplayLanguageDropdown}
            onBlur={this.handleHideLanguageDropdown}
          />
          {languageDropdown}
          <div style={ROW_CONTAINER_STYLE} >
            {biographyPrivacyButton}
            <div style={TITLE_STYLE} >Biography</div>
          </div>
          <div style={GUIDE_TEXT_STYLE} >
            Tell others a bit about you! Optional.
          </div>
          <TextareaWithCounter
            style={MARGIN_STYLE}
            maxCount={280}
            value={this.props.biographyValue}
            onValueChange={this.props.onBiographyInputChange}
          />
          <div style={TITLE_MARGIN_STYLE} >Social Media</div>
          <div style={SOCIAL_LINK_ROW_CONTAINER_STYLE} >
            {facebookPrivacyButton}
            <InputFieldWithIcon
              style={INPUT_FIELD_STYLE}
              iconSrc='resources/edit_profile_page/icons/facebook.svg'
              iconAlt='Facebook Icon'
              value={this.props.facebookLink}
              type='url'
              placeholder='Enter your Facebook profile URL'
              onChange={this.handleFacebookInputChange}
            />
          </div>
          <div style={SOCIAL_LINK_ROW_CONTAINER_STYLE} >
            {twitterPrivacyButton}
            <InputFieldWithIcon
              style={INPUT_FIELD_STYLE}
              iconSrc='resources/edit_profile_page/icons/twitter.svg'
              iconAlt='Twitter Icon'
              value={this.props.twitterLink}
              type='url'
              placeholder='Enter your Twitter profile URL'
              onChange={this.handleTwitterInputChange}
            />
          </div>
          <div style={SOCIAL_LINK_ROW_CONTAINER_STYLE} >
            {instagramPrivacyButton}
            <InputFieldWithIcon
              style={INPUT_FIELD_STYLE}
              iconSrc='resources/edit_profile_page/icons/instagram.svg'
              iconAlt='Instagram Icon'
              value={this.props.instagramLink}
              type='url'
              placeholder='Enter your Instagram profile URL'
              onChange={this.handleInstagramInputChange}
            />
          </div>
          <div style={ROW_CONTAINER_STYLE} >
            {cuisinesPrivacyButton}
            <div style={TITLE_STYLE} >Favorite Cuisines</div>
          </div>
          <div style={GUIDE_TEXT_STYLE} >
            Pick up to 5 of your favourite cuisines.
          </div>
          <InputField
            style={{...cuisineInputFieldStyle, ...MARGIN_STYLE}}
            value={this.props.cuisineValue}
            placeholder='Start typing to add a cuisine...'
            type='text'
            onChange={this.handleCuisineInputChange}
            onFocus={this.handleDisplayCuisineDropdown}
            onBlur={this.handleHideCuisineDropdown}
          />
          {cuisineDropdown}
        </div>
      </div>);
  }

  private handleLocationInputChange = (event: React.ChangeEvent<
      HTMLInputElement>) => {
    this.props.onLocationInputChange(event.target.value);
  }

  private handleDisplayLocationDropdown = () => {
    this.setState({ isLocationDropdownDisplayed: true });
  }

  private handleHideLocationDropdown = () => {
    this.setState({ isLocationDropdownDisplayed: false });
  }

  private handleLanguageInputChange = (event: React.ChangeEvent<
      HTMLInputElement>) => {
    this.props.onLanguageInputChange(event.target.value);
  }

  private handleDisplayLanguageDropdown = () => {
    this.setState({ isLanguageDropdownDisplayed: true });
  }

  private handleHideLanguageDropdown = () => {
    this.setState({ isLanguageDropdownDisplayed: false });
  }

  private handleFacebookInputChange = (event: React.ChangeEvent<
      HTMLInputElement>) => {
    this.props.onFacebookInputChange(event.target.value.trim());
  }

  private handleTwitterInputChange = (event: React.ChangeEvent<
      HTMLInputElement>) => {
    this.props.onTwitterInputChange(event.target.value.trim());
  }

  private handleInstagramInputChange = (event: React.ChangeEvent<
      HTMLInputElement>) => {
    this.props.onInstagramInputChange(event.target.value.trim());
  }

  private handleCuisineInputChange = (event: React.ChangeEvent<
      HTMLInputElement>) => {
    this.props.onCuisineInputChange(event.target.value);
  }

  private handleDisplayCuisineDropdown = () => {
    this.setState({ isCuisineDropdownDisplayed: true });
  }

  private handleHideCuisineDropdown = () => {
    this.setState({ isCuisineDropdownDisplayed: false });
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
  width: '590px',
  marginTop: '22px',
  borderRadius: '4px'
};

const IMAGE_PRIVACY_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  height: '68px',
  marginBottom: '30px'
};

const IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '68px',
  height: '100%',
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

const COLUMN_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  width: '100%',
  height: '100%'
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
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '23px',
  lineHeight: '34px',
  color: '#000000',
  width: '100%'
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
  width: '100%'
};

const LINK_STYLE: React.CSSProperties = {
  width: 'fit-content',
  height: '15px'
};

const TITLE_MARGIN_STYLE: React.CSSProperties = {
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

const DROPDOWN_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  backgroundColor: '#FFFFFF',
  padding: '0px',
  borderWidth: '0px 1px 1px 1px',
  borderStyle: 'solid',
  borderColor: '#969696',
  borderRadius: '0px 0px 4px 4px',
  overflow: 'hidden'
};

const INPUT_FIELD_STYLE: React.CSSProperties = {
  width: '100%'
};

const MARGIN_STYLE: React.CSSProperties = {
  marginTop: '10px'
};

const SOCIAL_LINK_ROW_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  gap: '20px',
  marginTop: '10px'
};

const DROPDOWN_ROW_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingLeft: '10px',
  paddingRight: '10px',
  gap: '10px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  backgroundColor: '#FFFFFF',
  width: '100%',
  minHeight: '38px'
};

const INPUT_WITH_DROPDOWN_STYLE: React.CSSProperties = {
  width: '100%',
  borderRadius: '4px 4px 0px 0px'
};

const styles = StyleSheet.create({
  dropdownRow: {
    ':hover': {
      backgroundColor: '#F6F6F6'
    },
    ':focus': {
      backgroundColor: '#F6F6F6'
    },
    ':focus-within': {
      backgroundColor: '#F6F6F6'
    },
    ':active': {
      backgroundColor: '#F6F6F6'
    }
  }
});
