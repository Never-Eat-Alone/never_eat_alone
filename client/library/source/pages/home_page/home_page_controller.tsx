import * as React from 'react';
import { DisplayMode, User } from '../../definitions';
import { HomePage } from './home_page';
import { HomePageModel } from './home_page_model';

interface Properties {
  /** The current user. */
  account: User;

  /** The display mode. */
  displayMode: DisplayMode;

  /** The HomePageModel. */
  model: HomePageModel;

  /** Indicates the join button on home page is clicked. */
  onJoinButton: () => void;

  /** Indicates the partner with us button is clicked. */
  onPartnerWithUsButton: () => void;
}

interface State {
  isLoaded: boolean;
  errorCode: HomePage.ErrorCode;
}

/** Implements the HomePageController. */
export class HomePageController extends React.Component<Properties, State> {
  public constructor(props: Properties) {
    super(props);
    this.state = {
      isLoaded: false,
      errorCode: HomePage.ErrorCode.NONE
    }
  }

  public render(): JSX.Element {
    if (!this.state.isLoaded || this.state.errorCode !==
        HomePage.ErrorCode.NONE) {
      return <div />;
    }
    return (
      <HomePage
        displayMode={this.props.displayMode}
        account={this.props.account}
        imageList={this.props.model.imageList}
        upcomingEventList={this.props.model.upcomingEventList}
        pastEventList={this.props.model.pastEventList}
        userEventTagList={this.props.model.userEventTagList}
        userFutureEventList={this.props.model.userFutureEventList}
        userTotalEventsThisMonth={this.props.model.userTotalEventsThisMonth}
        errorCode={this.state.errorCode}
        onJoinButton={this.props.onJoinButton}
        onPartnerWithUsButton={this.props.onPartnerWithUsButton}
      />);
  }

  public async componentDidMount(): Promise<void> {
    try {
      await this.props.model.load();
      this.setState({
        isLoaded: true,
        errorCode: HomePage.ErrorCode.NONE
      });
    } catch {
      this.setState({
        isLoaded: true,
        errorCode: HomePage.ErrorCode.NO_CONNECTION
      });
    }
  }
}
