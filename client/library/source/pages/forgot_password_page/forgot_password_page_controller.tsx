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
  errorCode: ForgotPasswordPage.ErrorCode;
  hasSentEmail: boolean;
  email: string;
  user: User;
}

export class ForgotPasswordPageController extends React.Component<Properties,
    State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      errorCode: ForgotPasswordPage.ErrorCode.NONE,
      hasSentEmail: false,
      email: '',
      user: User.makeGuest()
    };
  }

  public render(): JSX.Element {
    if (this.state.hasSentEmail) {
      return <ForgotPasswordLinkSentPage
        displayMode={this.props.displayMode}
        onResendLinkClick={this.handleResendLinkClick}
      />;
    }
    return <ForgotPasswordPage
      displayMode={this.props.displayMode}
      email={this.state.email}
      errorCode={this.state.errorCode}
      onSendLinkClick={this.handleSendLinkClick}
    />;
  }

  private handleResendLinkClick = async () => {
    try {
      const isResend = await this.props.model.resendRecoveryEmail(
        this.state.email, this.state.user);
      this.setState({ errorCode: isResend && ForgotPasswordPage.ErrorCode.NONE
        || ForgotPasswordPage.ErrorCode.NO_CONNECTION });
    } catch {
      this.setState({ errorCode: ForgotPasswordPage.ErrorCode.NO_CONNECTION });
    }
  }

  private handleSendLinkClick = async (email: string) => {
    this.setState({ email });
    try {
      const response = await this.props.model.sendRecoveryEmail(email);
      const user = User.fromJson(response);
      this.setState({
        hasSentEmail: true,
        user: user,
        errorCode: ForgotPasswordPage.ErrorCode.NONE
      });
    } catch {
      this.setState({ errorCode: ForgotPasswordPage.ErrorCode.NO_CONNECTION });
    }
  }
}
