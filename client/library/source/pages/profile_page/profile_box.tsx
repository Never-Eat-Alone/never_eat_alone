import * as React from 'react';
import { CityProvince, Cuisine, DisplayMode } from '../../definitions';

interface Properties {
  profileImageSrc: string;
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
      <div>

      </div>);
  }
}
