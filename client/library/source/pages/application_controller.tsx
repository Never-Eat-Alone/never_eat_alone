import * as React from 'react';
import { ApplicationModel } from './application_model';

interface Properties {
  model: ApplicationModel;
}

export class ApplicationController extends React.Component<Properties> {
  public render(): JSX.Element {
    return (<div />);
  }
}
