import * as React from 'react';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;
}

export class ResetPasswordPage extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <div style={CONTAINER_STYLE} >
        <div style={CONTENT_STYLE} >

        </div>
      </div>);
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#FFFFFF'
};

const CONTENT_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '50px'
};
