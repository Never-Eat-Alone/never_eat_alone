import * as React from 'react';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;
}

export class ProfilePage extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <div>
        Profile Page
      </div>);
  }
}
