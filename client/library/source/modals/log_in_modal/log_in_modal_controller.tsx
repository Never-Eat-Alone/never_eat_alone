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
}

interface State {
  isLoaded: boolean;
  hasError: boolean;
  email: string;
  password: string;
  rememberMe: boolean;
  googleEmail: string;
  googgleToke: any;
  facebookEmail: string;
  facebookToken: any;
  isForgotPass: boolean;
  errorCode: LogInModal.ErrorCode;
  user: User;
}

export class LogInModalController extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this._guest = User.makeGuest();
    this.state = {
      isLoaded: false,
      hasError: false,
      email: '',
      password: '',
      rememberMe: true,
      googleEmail: '',
      googgleToke: null,
      facebookEmail: '',
      facebookToken: null,
      isForgotPass: false,
      errorCode: LogInModal.ErrorCode.NONE,
      user: this._guest
    };
  }

  public render(): JSX.Element {
    if (!this.state.isLoaded || this.state.hasError) {
      return <div />;
    }
    return <LogInModal
      displayMode={this.props.displayMode}
      onLogin={this.handleLogIn}
      onForgotPassword={this.handleForgotPassword}
      onGoogleLogInClick={this.props.model.googleLogIn(this.state.googleEmail,
        this.state.googleToken)}
      onFacebookLogInClick={this.props.model.facebookLogIn(
        this.state.facebookEmail, this.state.facebookToken)}
      onClose={this.props.onClose}
    />;
  }

  public componentDidMount(): void {
    try {
      this.setState({ isLoaded: true });
    } catch {
      this.setState({ isLoaded: true, hasError: true });
    }
  }

  private handleLogIn = async () => {
    try {
      const user = await this.props.model.logIn(this.state.email,
        this.state.password, this.state.rememberMe);
      this.setState({user});
    } catch {
      this.setState({ user:  });
    }
  }

  private handleForgotPassword = async () => {
    try {
      await this.props.model.forgotPassword(this.state.email);
      this.setState({ isForgotPass: true });
    } catch {
      this.setState({ isForgotPass: false });
    }
  }

  private _guest: User;
}
