import * as React from 'react';
import { DisplayMode } from '../../definitions';
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
  referralCode: string;
  errorCode: JoinPage.ErrorCode;
}

export class JoinPageController extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      email: '',
      name: '',
      referralCode: '',
      errorCode: JoinPage.ErrorCode.NONE
    };
  }

  public render(): JSX.Element {
    return <JoinPage
      displayMode={this.props.displayMode}
      errorCode={this.state.errorCode}
      onJoin={this.handleJoin}
    />;
  }

  private handleJoin = async (name: string, email: string,
      referralCode: string) => {
    try {
      await this.props.model.join(name, email, referralCode);
    } catch {
      this.setState({ errorCode: JoinPage.ErrorCode.NO_CONNECTION });
    }
  }
/** 
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
  */
}
