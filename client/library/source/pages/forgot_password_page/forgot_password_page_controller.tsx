import * as React from 'react';
import { DisplayMode, User } from '../../definitions';
import { ForgotPasswordLinkSentPage } from '../forgot_password_link_sent_page';
import { ForgotPasswordPage } from './forgot_password_page';
import { ForgotPasswordPageModel } from './forgot_password_page_model';

interface Properties {
  displayMode: DisplayMode;
  model: ForgotPasswordPageModel;
}

interface State {
  isLoaded: boolean;
  hasError: boolean;
  errorCode: ForgotPasswordPage.ErrorCode;
  hasSentEmail: boolean;
}

export class ForgotPasswordPageController extends React.Component<Properties,
    State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isLoaded: false,
      hasError: false,
      errorCode: ForgotPasswordPage.ErrorCode.NONE,
      hasSentEmail: false
    };
  }

  public render(): JSX.Element {
    if (!this.state.isLoaded || this.state.hasError) {
      return <div />;
    }
    if (this.state.hasSentEmail) {
      return <ForgotPasswordLinkSentPage
        displayMode={this.props.displayMode}
        onResendLinkClick={this.handleResendLinkClick}
      />;
    }
    return <ForgotPasswordPage
      displayMode={this.props.displayMode}
      errorCode={this.state.errorCode}
      onSendLinkClick={this.handleSendLinkClick}
    />;
  }

  private handleResendLinkClick = async () => {
    
  }

  private handleSendLinkClick = async (email: string) => {
    try {
      const response = await this.props.model.sendRecoveryEmail(email);
      const user = User.fromJson(response);
      if (user && user.id !== -1) {
        this.setState({
          hasSentEmail: true,
          errorCode: ForgotPasswordPage.ErrorCode.NONE
        });
      } else {
        this.setState({ hasSentEmail: false });
      }
    } catch {
      this.setState({ errorCode: ForgotPasswordPage.ErrorCode.NO_CONNECTION });
    }
  }
}
