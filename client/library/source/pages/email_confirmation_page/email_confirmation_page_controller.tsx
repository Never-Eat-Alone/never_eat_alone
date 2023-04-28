import * as React from 'react';
import { DisplayMode } from '../../definitions';
import { EmailConfirmationPage } from './email_confirmation_page';
import { EmailConfirmationPageModel } from './email_confirmation_page_model';
import { InvalidConfirmationPage } from './invalid_confirmation_page';

interface Properties {
  displayMode: DisplayMode;
  model: EmailConfirmationPageModel;
}

interface State {
  isLoaded: boolean;
  hasError: boolean;
}

export class EmailConfirmationPageController extends React.Component<
    Properties, State> {
  public constructor(props: Properties) {
    super(props);
    this.state = {
      isLoaded: false,
      hasError: false
    }
  }

  public render(): JSX.Element {
    if (!this.state.isLoaded || this.state.hasError) {
      return <div />;
    }
    if (!this.props.model.isValid) {
      return <InvalidConfirmationPage displayMode={this.props.displayMode}
        message={this.props.model.message} error={this.props.model.error} />;
    }
    return <EmailConfirmationPage displayMode={this.props.displayMode} />;
  }

  public async componentDidMount(): Promise<void> {
    try {
      await this.props.model.load();
      this.setState({
        isLoaded: true,
        hasError: false
      });
    } catch {
      this.setState({
        isLoaded: true,
        hasError: true
      });
    }
  }
}
