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
  name: string;
  email: string;
  referralCode: string;
  errorCode: JoinPage.ErrorCode;
  page: JoinPage.Page
}

export class JoinPageController extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      errorCode: JoinPage.ErrorCode.NONE,
      name: '',
      email: '',
      referralCode: '',
      page: JoinPage.Page.INITIAL
    };
  }

  public render(): JSX.Element {
    return <JoinPage
      displayMode={this.props.displayMode}
      errorCode={this.state.errorCode}
      page={this.state.page}
      onJoin={this.handleJoin}
    />;
  }

  private handleJoin = async (name: string, email: string,
      referralCode: string) => {
    try {
      await this.props.model.join(name, email, referralCode);
      this.setState({
        page: JoinPage.Page.REQUEST_SENT,
        errorCode: JoinPage.ErrorCode.NONE
      });
    } catch {
      this.setState({
        errorCode: JoinPage.ErrorCode.NO_CONNECTION,
        page: JoinPage.Page.INITIAL
      });
    }
  }
}
