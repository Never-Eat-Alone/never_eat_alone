import * as React from 'react';
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

  /** The description on user's profile written by the user. */
  description: string;

  /** The user's location. */
  location: CityProvince;

  /** List of the languages the user can speak. */
  languageList: string[];

  /** The url to user's profile on Facebook social platform. */
  facebookLink: string;

  /** The url to user's profile on Twitter social platform. */
  twitterLink: string;

  /** The url to user's profile on Instagram social platform. */
  instagramLink: string;

  /** The list of the user's favorite cuisines. */
  favoriteCuisineList: Cuisine[];

  /** The displayMode based on the screen size. */
  displayMode: DisplayMode;

  /** Indicates the Edit button is clicked. */
  onEditClick: () => void;
}

/** Displays the User Information Box on the User Profile Page. */
export class ProfileBox extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <div style={CONTAINER_STYLE} >
        <div style={PROFILE_IMAGE_CONTAINER_STYLE} >
          <img
            style={PROFILE_IMAGE_STYLE}
            src={this.props.profileImageSrc}
            alt='Profile Image'
          />
        </div>
        <h1 style={DISPLAY_NAME_STYLE} >{this.props.displayName}</h1>
        <h3 style={USER_NAME_STYLE} >{this.props.userName}</h3>
        <h3 style={MEMBER_SINCE_STYLE} >Member since {this.formatDate(
          this.props.memberSince)}</h3>
        <p style={DESCRIPTION_STYLE} >{this.props.description}</p>
        <div style={LOCATION_ROW_STYLE} >
          <img
            style={LOCATION_ICON_STYLE}
            src='resources/profile_box/icons/location.svg'
            alt='Location Icon'
          />
          <p style={LOCATION_TEXT_STYLE} >
            {this.props.location.city}, {this.props.location.province}
          </p>
        </div>
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
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '20px',
  gap: '25px',
  width: '300px',
  backgroundColor: '#F6F6F6',
  borderRadius: '4px'
};

const PROFILE_IMAGE_CONTAINER_STYLE: React.CSSProperties = {

};

const PROFILE_IMAGE_STYLE: React.CSSProperties = {

};

const DISPLAY_NAME_STYLE: React.CSSProperties = {
  margin: '0px',
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
  margin: '0px',
  padding: '0px'
};

const DESCRIPTION_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  textAlign: 'center',
  color: '#000000',
  maxWidth: '100%',
  whiteSpace: 'pre-line',
  margin: '0px',
  padding: '0px'
};

const LOCATION_TEXT_STYLE: React.CSSProperties = {
  width: 'fit-content',
  maxWidth: '100%',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  textAlign: 'center',
  color: '#000000',
  margin: '0px',
  padding: '0px'
};

const LOCATION_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  height: '20px',
  width: '100%',
  overflow: 'hidden'
};

const LOCATION_ICON_STYLE: React.CSSProperties = {
  width: '20px',
  height: '20px',
  objectFit: 'cover',
  backgroundColor: 'transparent'
};
