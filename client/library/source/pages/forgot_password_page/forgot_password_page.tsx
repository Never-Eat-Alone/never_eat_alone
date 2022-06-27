import * as React from 'react';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;
}

interface State {
  
}

export class SignUpPage extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      
    };
  }

  public render(): JSX.Element {
    return (
      <div style={CONTAINER_STYLE} >

      </div>);
  }
}

export namespace SignUpPage {
  export enum ErrorCode {
    NO_CONNECTION,
    NONE
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  backgroundColor: '#FFFFFF',
  padding: '60px 10px'
};

const CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  borderRadius: '4px',
  padding: '50px 100px'
};
