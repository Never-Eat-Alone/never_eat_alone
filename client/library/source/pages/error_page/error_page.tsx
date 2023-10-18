import * as React from 'react';
import { DisplayMode } from '../../definitions';
import { ErrorPage401, ErrorPage403, ErrorPage404, ErrorPage500 } from './';

interface Properties {
  displayMode: DisplayMode;
  errorCode: number;
}

export class ErrorPage extends React.Component<Properties> {
  public render(): JSX.Element {
    switch (this.props.errorCode) {
      case 401:
        return <ErrorPage401 displayMode={this.props.displayMode} />;
      case 403:
        return <ErrorPage403 displayMode={this.props.displayMode} />;
      case 404:
        return <ErrorPage404 displayMode={this.props.displayMode} />;
      default:
        return <ErrorPage500 displayMode={this.props.displayMode} />;
    }
  }
}
