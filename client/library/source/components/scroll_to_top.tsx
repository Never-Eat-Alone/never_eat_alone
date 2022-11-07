import * as React from 'react';
import * as Router from 'react-router-dom';

export class ScrollToTop extends React.Component<
    Router.RouteComponentProps> {
  public render(): JSX.Element {
    return null;
  }

  public componentDidUpdate(prevProps: Router.RouteComponentProps): void {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      document.getElementById('app_top').scroll(0, 0);
    }
  }
}
