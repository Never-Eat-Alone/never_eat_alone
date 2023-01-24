import * as React from 'react';
import { DisplayMode, User, UserProfileImage, UserStatus
} from '../../definitions';
import { LogInModel } from '../../modals/log_in_modal';
import { LogInPage } from './log_in_page';

interface Properties {
  /** The display mode. */
  displayMode: DisplayMode;

  /** Log in model. */
  model: LogInModel;

  /** Indicates the log in was successful. */
  onLogInSuccess: (user: User, profileImage: UserProfileImage) => void;
}

interface State {
  email: string;
  password: string;
  rememberMe: boolean;
  errorCode: LogInPage.ErrorCode;
}

export class LogInPageController extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      email: '',
      password: '',
      rememberMe: true,
      errorCode: LogInPage.ErrorCode.NONE
    };
  }

  public render(): JSX.Element {
    return <LogInPage
      displayMode={this.props.displayMode}
      email={this.state.email}
      password={this.state.password}
      rememberMe={this.state.rememberMe}
      errorCode={this.state.errorCode}
      onLogIn={this.handleLogIn}
      onGoogleLogIn={this.handleGoogleLogIn}
      onFacebookLogIn={this.handleFacebookLogIn}
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
        this.setState({ errorCode: LogInPage.ErrorCode.LOGIN_FAILED });
      }
    } catch {
      this.setState({
        email: email,
        password: password,
        rememberMe: rememberMe,
        errorCode: LogInPage.ErrorCode.NO_CONNECTION
      });
    }
  }

  private handleGoogleLogIn = async () => {
    try {
      const userResponse = await this.props.model.googleLogIn();
      const user = User.fromJson(userResponse.user);
      const profileImage = UserProfileImage.fromJson(userResponse.profileImage);
      if (user.userStatus === UserStatus.ACTIVE) {
        this.props.onLogInSuccess(user, profileImage);
      } else {
        this.setState({ errorCode: LogInPage.ErrorCode.GOOGLE_LOGIN_FAILED });
      }
    } catch {
      this.setState({ errorCode: LogInPage.ErrorCode.NO_CONNECTION });
    }
  }

  private handleFacebookLogIn = async () => {
    try {
      const userResponse = await this.props.model.facebookLogIn();
      const user = User.fromJson(userResponse.user);
      const profileImage = UserProfileImage.fromJson(userResponse.profileImage);
      if (user.userStatus === UserStatus.ACTIVE) {
        this.props.onLogInSuccess(user, profileImage);
      } else {
        this.setState({
          errorCode: LogInPage.ErrorCode.FACEBOOK_LOGIN_FAILED
        });
      }
    } catch {
      this.setState({ errorCode: LogInPage.ErrorCode.NO_CONNECTION });
    }
  }
}
