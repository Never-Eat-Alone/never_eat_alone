import * as React from 'react';
import { FacebookButton, InstagramButton, TwitterButton, SecondaryTextButton
} from '../../components';
import { CityProvince, Cuisine, DisplayMode } from '../../definitions';

interface Properties {
  /** The address of the user's profile image. */
  profileImageSrc: string;

  /** The user's display name. */
  displayName: string;

  /** The unique username of the user. */
  userName: string;

  /** The date of the user's account creation. */
  memberSince: Date;

  /** The biography on user's profile written by the user. */
  biography: string;

  isBiographyDisplayed: boolean;

  /** The user's location. */
  location: CityProvince;

  isLocationDisplayed: boolean;

  /** List of the languages the user can speak. */
  languageList: string[];

  isLanguageDisplayed: boolean;

  /** The url to user's profile on Facebook social platform. */
  facebookLink: string;

  isFacebookLinkDisplayed: boolean;

  /** The url to user's profile on Twitter social platform. */
  twitterLink: string;

  isTwitterLinkDisplayed: boolean;

  /** The url to user's profile on Instagram social platform. */
  instagramLink: string;

  isInstagramLinkDisplayed: boolean;

  /** The list of the user's favorite cuisines. */
  favoriteCuisineList: Cuisine[];

  isCuisineDisplayed: boolean;

  /** The displayMode based on the screen size. */
  displayMode: DisplayMode;

  /** Whether the edit button is displayed on user profile or not. */
  isEditButton?: boolean;

  /** Whether Action button is displayed on the user profile or not. */
  isActionButton?: boolean;

  /** Indicates the profile action button was clicked. */
  onProfileActionClick?: () => void;

  /** Indicates the Edit button is clicked. */
  onEditClick?: () => void;
}

/** Displays the User Information Box on the User Profile Page. */
export class ProfileBox extends React.Component<Properties> {
  public render(): JSX.Element {
    const profileActionButton = (() => {
      if (!this.props.isActionButton) {
        return null;
      }
      return <div style={ACTION_BUTTON_STYLE}
        onClick={this.props.onProfileActionClick} >...</div>;
    })();
    const biography = (() => {
      if (this.props.biography && this.props.isBiographyDisplayed) {
        return <p style={BIOGRAPHY_STYLE} >{this.props.biography}</p>;
      }
      return null;
    })();
    const locationSection = (() => {
      if (!this.props.isLocationDisplayed) {
        return null;
      }
      return (
        <div style={LOCATION_ROW_STYLE} >
          <img
            style={ICON_STYLE}
            src='resources/profile_box/icons/location.svg'
            alt='Location Icon'
          />
          <p style={TEXT_STYLE} >
            {this.props.location.city}, {this.props.location.province}
          </p>
        </div>);
    })();
    const languageSection = (() => {
      if (this.props.languageList && this.props.languageList.length !== 0 &&
          this.props.isLanguageDisplayed) {
        return (
          <div style={LANGUAGE_ROW_STYLE} >
            <img
              style={ICON_STYLE}
              src='resources/profile_box/icons/language.svg'
              alt='Language Icon'
            />
            <p style={TEXT_STYLE} >
              {this.props.languageList.join(', ')}
            </p>
          </div>);
      }
      return null;
    })();
    const socialMediaLinks = [];
    if (this.props.facebookLink && this.props.isFacebookLinkDisplayed) {
      socialMediaLinks.push(
        <FacebookButton
          href={this.props.facebookLink}
          style={SOCIAL_ICON_STYLE}
        />);
    }
    if (this.props.twitterLink && this.props.isTwitterLinkDisplayed) {
      socialMediaLinks.push(
        <TwitterButton
          href={this.props.twitterLink}
          style={SOCIAL_ICON_STYLE}
        />);
    }
    if (this.props.instagramLink && this.props.isInstagramLinkDisplayed) {
      socialMediaLinks.push(
        <InstagramButton
          href={this.props.instagramLink}
          style={SOCIAL_ICON_STYLE}
        />);
    }
    const socialMediaLinkSection = (() => {
      if (socialMediaLinks.length === 0) return null;
      return <div style={SOCIAL_ICONS_ROW_STYLE} >{socialMediaLinks}</div>;
    })();
    const cuisineList = [];
    if (this.props.isCuisineDisplayed) {
      for (const cuisine of this.props.favoriteCuisineList) {
        cuisineList.push(
          <div
              key={cuisine.id}
              style={{...CUISINE_TEXT_STYLE,
                backgroundColor: cuisine.colorCode}}
          >
            {cuisine.label}
          </div>);
      }
    }
    const cuisineSection = (() => {
      if (cuisineList.length === 0) return null;
      return <div style={CUISINE_ROW_STYLE} >{cuisineList}</div>;
    })();
    const editProfileButton = (() => {
      if (this.props.isEditButton) {
        return <SecondaryTextButton style={EDIT_BUTTON_STYLE}
          label='Edit Profile' onClick={this.props.onEditClick} />;
      }
      return null;
    })();
    return (
      <div style={CONTAINER_STYLE} >
        {profileActionButton}
        <div style={PROFILE_IMAGE_CONTAINER_STYLE} >
          <img
            style={PROFILE_IMAGE_STYLE}
            src={this.props.profileImageSrc}
            alt='Profile Image'
          />
        </div>
        <h1 style={DISPLAY_NAME_STYLE} >{this.props.displayName}</h1>
        <h3 style={USER_NAME_STYLE} >@{this.props.userName}</h3>
        <h3 style={MEMBER_SINCE_STYLE} >
          Member since {this.formatDate(this.props.memberSince)}
        </h3>
        {biography}
        {locationSection}
        {languageSection}
        {socialMediaLinkSection}
        {cuisineSection}
        {editProfileButton}
      </div>);
  }

  /** Converts date to a formated string of day of the month number, month name
   * in short,year number in full.
   * example: Date(2020, 0, 20) => 20 Jan, 2020
   */
  private formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = date.toLocaleString('en-us', { month: 'long' }).slice(0, 3);
    const day = date.getDate();
    return `${day} ${month}, ${year}`;
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '20px',
  width: '300px',
  minHeight: '400px',
  backgroundColor: '#F6F6F6',
  borderRadius: '4px'
};

const ACTION_BUTTON_STYLE: React.CSSProperties = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  top: '20px',
  right: '20px',
  color: '#F24D3D',
  fontSize: '25px',
  width: '20px',
  height: '20px'
};

const PROFILE_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '68px',
  height: '68px',
  borderRadius: '50%',
  overflow: 'hidden'
};

const PROFILE_IMAGE_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minWidth: '68px',
  objectFit: 'cover',
  backgroundColor: 'transparent'
};

const DISPLAY_NAME_STYLE: React.CSSProperties = {
  margin: '10px 0px 0px 0px',
  padding: '0px'
};

const USER_NAME_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '15px',
  textAlign: 'center',
  color: '#969696',
  width: '100%',
  margin: '0px',
  padding: '0px'
};

const MEMBER_SINCE_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '15px',
  textAlign: 'center',
  color: '#000000',
  height: '15px',
  width: '100%',
  margin: '10px 0px 0px 0px',
  padding: '0px'
};

const BIOGRAPHY_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  textAlign: 'center',
  color: '#000000',
  maxWidth: '100%',
  whiteSpace: 'pre-line',
  margin: '10px 0px 0px 0px',
  padding: '0px'
};

const LOCATION_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  width: '100%',
  margin: '25px 0px 0px 0px',
};

const ICON_STYLE: React.CSSProperties = {
  width: '20px',
  height: '20px',
  backgroundColor: 'transparent',
  marginRight: '5px'
};

const TEXT_STYLE: React.CSSProperties = {
  width: 'fit-content',
  maxWidth: '100%',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '20px',
  textAlign: 'center',
  color: '#000000',
  margin: '0px',
  padding: '0px',
  whiteSpace: 'pre-line'
};

const LANGUAGE_ROW_STYLE: React.CSSProperties = {
  ...LOCATION_ROW_STYLE,
  margin: '10px 0px 0px 0px'
};

const SOCIAL_ICONS_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '20px',
  margin: '25px 0px 0px 0px'
};

const SOCIAL_ICON_STYLE: React.CSSProperties = {
  width: '21px',
  height: '21px'
};

const CUISINE_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '3px',
  maxWidth: '100%',
  margin: '25px 0px 0px 0px',
  padding: '0px',
  backgroundColor: 'transparent'
};

const CUISINE_TEXT_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  padding: '2px 4px',
  height: '19px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px',
  color: '#000000',
  borderRadius: '4px'
};

const EDIT_BUTTON_STYLE: React.CSSProperties = {
  width: '99px',
  height: '30px',
  margin: '25px 0px 0px 0px'
};
