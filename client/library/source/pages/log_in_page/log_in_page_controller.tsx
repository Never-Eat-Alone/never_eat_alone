import * as React from 'react';
import { DisplayMode, User, UserStatus
} from '../../definitions';
import { LogInModel } from '../../modals/log_in_modal';
import { LogInPage } from './log_in_page';

interface Properties {
  /** The display mode. */
  displayMode: DisplayMode;

  /** Log in model. */
  model: LogInModel;

  /** Indicates the log in was successful. */
  onLogInSuccess: (user: User) => void;
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
    />;
  }

  private handleLogIn = async (email: string, password: string,
      rememberMe: boolean) => {
    try {
      const user = await this.props.model.logIn(email, password,
        rememberMe);
      if (user.userStatus === UserStatus.ACTIVE) {
        this.props.onLogInSuccess(user);
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
}
