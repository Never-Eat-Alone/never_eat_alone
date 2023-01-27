import * as React from 'react';
import { DisplayMode, User, UserProfileImage, UserStatus
} from '../../definitions';
import { JoinModel } from '../../modals/join_modal';
import { JoinPage } from './join_page';

interface Properties {
  /** The display mode. */
  displayMode: DisplayMode;

  /** Join model. */
  model: JoinModel;
}

interface State {
  email: string;
  name: string;
  referral: string;
  errorCode: JoinPage.ErrorCode;
}

export class JoinPageController extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      email: '',
      name: '',
      referral: '',
      errorCode: JoinPage.ErrorCode.NONE
    };
  }

  public render(): JSX.Element {
    return <JoinPage
      displayMode={this.props.displayMode}
      email={this.state.email}
      name={this.state.name}
      referral={this.state.referral}
      errorCode={this.state.errorCode}
      onNameChange={this.handleNameChange}
      onEmailChange={this.handleEmailChange}
      onReferralChange={this.handleReferralChange}
      onJoin={this.handleJoin}
    />;
  }

  private handleLogIn = async (email: string, password: string,
      rememberMe: boolean) => {
    try {
      const userResponse = await this.props.model.join(email, password,
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

  private checkEmail = () => {
    if (this.state.email.length === 0) {
      this.setState({ emailErrorCode: JoinPage.EmailErrorCode.EMPTY });
      return false;
    } else if (!EmailValidator.validate(this.state.email)) {
      this.setState({ emailErrorCode: JoinPage.EmailErrorCode.NOT_AN_EMAIL });
      return false;
    } else {
      this.setState({ emailErrorCode: JoinPage.EmailErrorCode.NONE });
      return true;
    }
  }
}
