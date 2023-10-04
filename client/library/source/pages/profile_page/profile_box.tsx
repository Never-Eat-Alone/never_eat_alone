import * as React from 'react';
import { EllipsisDropdownMenu, FacebookButton, InstagramButton,
  SecondaryButtonNavLink, TwitterButton } from '../../components';
import { Cuisine, Language, User } from '../../definitions';

interface Properties {

  /** The current logged user. */
  account: User;

  /** The page id which is the same as the user's id who created the page. */
  profileId: number;

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

  isBiographyPrivate: boolean;

  /** The user's location. */
  address: string;

  isLocationPrivate: boolean;

  /** List of the languages the user can speak. */
  languageList: Language[];

  isLanguagePrivate: boolean;

  /** The url to user's profile on Facebook social platform. */
  facebookLink: string;

  isFacebookPrivate: boolean;

  /** The url to user's profile on Twitter social platform. */
  twitterLink: string;

  isTwitterPrivate: boolean;

  /** The url to user's profile on Instagram social platform. */
  instagramLink: string;

  isInstagramPrivate: boolean;

  /** The list of the user's favorite cuisines. */
  favoriteCuisineList: Cuisine[];

  isCuisinePrivate: boolean;

  /** Indicates the report option was clicked. */
  onReportClick: () => void;
}

/** Displays the User Information Box on the User Profile Page. */
export class ProfileBox extends React.Component<Properties> {
  public render(): JSX.Element {
    const isAccountProfile = (this.props.account.id !== -1 &&
      this.props.account.id === this.props.profileId);
    const profileActionButton = (() => {
      if (!this.props.account || this.props.account.id === -1 ||
          this.props.account.id === this.props.profileId) {
        return null;
      }
      return <EllipsisDropdownMenu style={ACTION_BUTTON_STYLE}
        onReportClick={this.props.onReportClick} />;
    })();
    const biography = (() => {
      if (this.props.biography && (isAccountProfile ||
          !this.props.isBiographyPrivate)) {
        return <p style={BIOGRAPHY_STYLE} >{this.props.biography}</p>;
      }
      return null;
    })();
    const locationSection = (() => {
      if (this.props.address && (isAccountProfile ||
          !this.props.isLocationPrivate)) {
        return (
          <div style={LOCATION_ROW_STYLE} >
            <img
              style={ICON_STYLE}
              src='resources/profile_box/icons/location.svg'
              alt='Location Icon'
            />
            <p style={TEXT_STYLE} >{this.props.address}</p>
          </div>);
      }
      return null;
    })();
    const languageSection = (() => {
      if (this.props.languageList?.length !== 0 && (isAccountProfile ||
          !this.props.isLanguagePrivate)) {
        return (
          <div style={LANGUAGE_ROW_STYLE} >
            <img
              style={ICON_STYLE}
              src='resources/profile_box/icons/language.svg'
              alt='Language Icon'
            />
            <p style={TEXT_STYLE} >
              {this.props.languageList.map(language => language.name).join(', '
              )}
            </p>
          </div>);
      }
      return null;
    })();
    const socialMediaLinks = [];
    if (this.props.facebookLink && (isAccountProfile ||
        !this.props.isFacebookPrivate)) {
      socialMediaLinks.push(
        <FacebookButton
          key={this.props.facebookLink}
          href={this.props.facebookLink}
          style={SOCIAL_ICON_STYLE}
        />);
    }
    if (this.props.twitterLink && (isAccountProfile ||
        !this.props.isTwitterPrivate)) {
      socialMediaLinks.push(
        <TwitterButton
          key={this.props.twitterLink}
          href={this.props.twitterLink}
          style={SOCIAL_ICON_STYLE}
        />);
    }
    if (this.props.instagramLink && (isAccountProfile ||
        !this.props.isInstagramPrivate)) {
      socialMediaLinks.push(
        <InstagramButton
          key={this.props.instagramLink}
          href={this.props.instagramLink}
          style={SOCIAL_ICON_STYLE}
        />);
    }
    const socialMediaLinkSection = (() => {
      if (socialMediaLinks.length === 0) return null;
      return <div style={SOCIAL_ICONS_ROW_STYLE} >{socialMediaLinks}</div>;
    })();
    const cuisineList = [];
    if (this.props.favoriteCuisineList &&
        this.props.favoriteCuisineList.length !== 0 && (isAccountProfile ||
        !this.props.isCuisinePrivate)) {
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
      if (this.props.account?.id !== -1 &&
          this.props.account.id === this.props.profileId) {
        return <SecondaryButtonNavLink
          style={EDIT_BUTTON_STYLE}
          label='Edit Profile'
          to={`/users/edit_profile/${this.props.profileId}`}
        />;
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
        <h3 style={USER_NAME_STYLE} >{this.props.userName}</h3>
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
  top: '20px',
  right: '20px'
};

const PROFILE_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '68px',
  height: '68px',
  minWidth: '68px',
  minHeight: '68px',
  borderRadius: '50%',
  overflow: 'hidden'
};

const PROFILE_IMAGE_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  backgroundColor: 'transparent'
};

const DISPLAY_NAME_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  margin: '10px 0px 0px 0px',
  padding: '0px',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '26px',
  lineHeight: '39px',
  textAlign: 'center',
  textTransform: 'capitalize',
  color: '#000000'
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
  minHeight: '30px',
  minWidth: '99px',
  margin: '25px 0px 0px 0px'
};
