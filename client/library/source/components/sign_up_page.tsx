import * as React from 'react';
import { DisplayMode } from '../definitions';

interface Properties {
  displayMode: DisplayMode;
}

export class SignUpPage extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <div style={CONTAINER_STYLE} >
        <div style={CONTENT_CONTAINER_STYLE} >

        </div>
      </div>);
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  
};

const CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',

};
