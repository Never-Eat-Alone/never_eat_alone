import * as React from 'react';
import { DisplayMode } from '../../definitions';
import { JoinModel } from './join_model';
import { JoinModal } from './join_modal';
import { JoinRequestSentModal } from './join_request_sent_modal';

interface Properties {
  /** The display mode. */
  displayMode: DisplayMode;

  /** Join model. */
  model: JoinModel;

  onClose: () => void;
}

interface State {
  isLoaded: boolean;
  errorCode: JoinModal.ErrorCode;
  name: string;
  email: string;
  referralCode: string;
  page: JoinModal.Page
}

export class JoinController extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isLoaded: false,
      name: '',
      email: '',
      referralCode: '',
      errorCode: JoinModal.ErrorCode.NONE,
      page: JoinModal.Page.INITIAL
    };
  }

  public render(): JSX.Element {
    if (this.state.isLoaded) {
      if (this.state.page === JoinModal.Page.INITIAL) {
        return <JoinModal
          displayMode={this.props.displayMode}
          name={this.state.name}
          email={this.state.email}
          referralCode={this.state.referralCode}
          errorCode={this.state.errorCode}
          onClose={this.props.onClose}
          onRequestJoin={this.handleRequestJoin}
        />;
      }
      return <JoinRequestSentModal
        displayMode={this.props.displayMode}
        email={this.state.email}
        onClose={this.props.onClose}
      />;
    }
    return <div />;
  }

  public async componentDidMount(): Promise<void> {
    try {
      await this.props.model.load();
      this.setState({
        isLoaded: true
      });
    } catch {
      this.setState({
        isLoaded: true,
        errorCode: JoinModal.ErrorCode.NO_CONNECTION
      });
    }
    return;
  }

  private handleRequestJoin = async (name: string, email: string,
      referralCode: string) => {
    try {
      await this.props.model.join(name, email, referralCode);
      this.setState({
        name: name,
        email: email,
        referralCode: referralCode,
        errorCode: JoinModal.ErrorCode.NONE,
        page: JoinModal.Page.REQUEST_SENT
      });
    } catch {
      this.setState({
        name: name,
        email: email,
        referralCode: referralCode,
        errorCode: JoinModal.ErrorCode.NO_CONNECTION,
        page: JoinModal.Page.INITIAL
      });
    }
  }
}
