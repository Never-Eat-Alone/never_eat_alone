import * as React from 'react';
import { DisplayMode, User } from '../../definitions';
import { LogInModal } from './log_in_modal';
import { LogInModel } from './log_in_model';

interface Properties {
  /** The display mode. */
  displayMode: DisplayMode;

  /** Log in model. */
  model: LogInModel;

  /** Indicates the close button is clicked. */
  onClose: () => void;

  /** Indicates the log in was successful. */
  onLogInSuccess: (user: User) => void;
}

interface State {
  email: string;
  password: string;
  rememberMe: boolean;
  errorCode: LogInModal.ErrorCode;
}

export class LogInModalController extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      email: '',
      password: '',
      rememberMe: true,
      errorCode: LogInModal.ErrorCode.NONE
    };
  }

  public render(): JSX.Element {
    return <LogInModal
      displayMode={this.props.displayMode}
      errorCode={this.state.errorCode}
      onLogIn={this.handleLogIn}
      onGoogleLogInClick={this.handleGoogleLogIn}
      onFacebookLogInClick={this.handleFacebookLogIn}
      onClose={this.props.onClose}
    />;
  }

  private handleLogIn = async () => {
    try {
      const user = await this.props.model.logIn(this.state.email,
        this.state.password, this.state.rememberMe);
      this.props.onLogInSuccess(user);
    } catch {
      this.setState({
        errorCode: LogInModal.ErrorCode.LOGIN_FAILED
      });
    }
  }

  private handleGoogleLogIn = async () => {
    try {
      const user = await this.props.model.googleLogIn();
      this.props.onLogInSuccess(user);
    } catch {
      this.setState({ errorCode: LogInModal.ErrorCode.GOOGLE_LOGIN_FAILED });
    }
  }

  private handleFacebookLogIn = async () => {
    try {
      const user = await this.props.model.facebookLogIn();
      this.props.onLogInSuccess(user);
    } catch {
      this.setState({ errorCode: LogInModal.ErrorCode.FACEBOOK_LOGIN_FAILED });
    }
  }
}
