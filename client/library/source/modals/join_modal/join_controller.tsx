import * as React from 'react';
import * as EmailValidator from 'email-validator';
import { DisplayMode } from '../../definitions';
import { JoinModel } from './join_model';
import { JoinModal } from './join_modal';

interface Properties {
  /** The display mode. */
  displayMode: DisplayMode;

  /** Join model. */
  model: JoinModel;

  onClose: () => void;
}

interface State {
  isLoaded: boolean;
  hasError: boolean;
  name: string;
  email: string;
  referralCode: string;
}

export class JoinController extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isLoaded: false,
      hasError: false,
      name: '',
      email: '',
      referralCode: ''
    };
  }

  public render(): JSX.Element {
    if (this.state.isLoaded && !this.state.hasError) {
      return <JoinModal
        displayMode={this.props.displayMode}
        name={this.state.name}
        email={this.state.email}
        referralCode={this.state.referralCode}
        nameErrorMessage=''
        emailErrorMessage=''
        nameHasError={false}
        emailHasError={false}
        onClose={this.props.onClose}
        onRequestJoin={this.handleRequestJoin}
      />
    }
    return <div />;
  }

  public async componentDidMount(): Promise<void> {
    try {
      await this.props.model.load();
      this.setState({
        isLoaded: true,
        hasError: false
      });
    } catch {
      this.setState({
        isLoaded: true,
        hasError: true
      });
    }
  }

  private handleRequestJoin = async (name: string, email: string,
      referralCode: string) => {
    try {
      await this.props.model.requestSignUp(name, email, referralCode);
    } catch {
      this.setState({  });
    }
  }
}
