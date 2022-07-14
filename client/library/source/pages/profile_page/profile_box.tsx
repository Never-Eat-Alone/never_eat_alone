import * as React from 'react';
import { CityProvince, Cuisine, DisplayMode } from '../../definitions';

interface Properties {
  profileImageSrc: string;
  displayName: string;
  userName: string;
  memberSince: Date;
  description: string;
  location: CityProvince;
  languageList: string[];
  facebookLink: string;
  twitterLink: string;
  instagramLink: string;
  favoriteCuisineList: Cuisine[];
  displayMode: DisplayMode;
  onEditClick: () => void;
}

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
      </div>);
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-stat',
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

};

const USER_NAME_STYLE: React.CSSProperties = {

};
