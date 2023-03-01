import * as React from 'react';
import { DisplayMode, User, UserProfileImage, UserStatus
} from '../../definitions';
import { LogInModal } from './log_in_modal';
import { LogInModel } from './log_in_model';

interface Properties {
  /** The display mode. */
  displayMode: DisplayMode;

  /** Log in model. */
  model: LogInModel;

  googleClientId: string;
  facebookClientId: string;

  /** Indicates the close button is clicked. */
  onClose: () => void;

  /** Indicates the log in was successful. */
  onLogInSuccess: (user: User, profileImage: UserProfileImage) => void;
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
      email={this.state.email}
      password={this.state.password}
      rememberMe={this.state.rememberMe}
      googleClientId={this.props.googleClientId}
      facebookClientId={this.props.facebookClientId}
      errorCode={this.state.errorCode}
      onLogIn={this.handleLogIn}
      onGoogleLogIn={this.handleGoogleLogIn}
      onFacebookLogIn={this.handleFacebookLogIn}
      onClose={this.props.onClose}
    />;
  }

  private handleLogIn = async (email: string, password: string,
      rememberMe: boolean) => {
    try {
      const userResponse = await this.props.model.logIn(email, password,
        rememberMe);
      const user = User.fromJson(userResponse.user);
      const profileImage = UserProfileImage.fromJson(userResponse.profileImage);
      if (user.userStatus === UserStatus.ACTIVE) {
        this.props.onLogInSuccess(user, profileImage);
      } else {
        this.setState({ errorCode: LogInModal.ErrorCode.LOGIN_FAILED });
      }
    } catch {
      this.setState({
        email: email,
        password: password,
        rememberMe: rememberMe,
        errorCode: LogInModal.ErrorCode.NO_CONNECTION
      });
    }
  }

  private handleGoogleLogIn = async (email: string, token: any) => {
    try {
      const userResponse = await this.props.model.googleLogIn(email, token);
      const user = User.fromJson(userResponse.user);
      const profileImage = UserProfileImage.fromJson(userResponse.profileImage);
      if (user.userStatus === UserStatus.ACTIVE) {
        this.props.onLogInSuccess(user, profileImage);
      } else {
        this.setState({ errorCode: LogInModal.ErrorCode.GOOGLE_LOGIN_FAILED });
      }
    } catch {
      this.setState({ errorCode: LogInModal.ErrorCode.NO_CONNECTION });
    }
  }

  private handleFacebookLogIn = async (email: string, token: any) => {
    try {
      const userResponse = await this.props.model.facebookLogIn(email, token);
      const user = User.fromJson(userResponse.user);
      const profileImage = UserProfileImage.fromJson(userResponse.profileImage);
      if (user.userStatus === UserStatus.ACTIVE) {
        this.props.onLogInSuccess(user, profileImage);
      } else {
        this.setState({
          errorCode: LogInModal.ErrorCode.FACEBOOK_LOGIN_FAILED
        });
      }
    } catch {
      this.setState({ errorCode: LogInModal.ErrorCode.NO_CONNECTION });
    }
  }
}
