import * as React from 'react';
import { DisplayMode } from '../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** Indicates the let's go button is clicked. */
  onLetsGoClick: () => void;
}

export class ProfileSetUpPage extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <div style={CONTAINER_STYLE} >

      </div>);
  }
}

const CONTAINER_STYLE: React.CSSProperties = {

};
