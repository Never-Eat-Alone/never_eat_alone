import * as React from 'react';
import * as Router from 'react-router-dom';
import { DisplayMode, User } from '../../definitions';
import { DiningEventCheckoutModal } from './dining_event_checkout_modal';
import { DiningEventCheckoutModel } from './dining_event_checkout_model';

interface Properties {
  account: User;
  displayMode: DisplayMode;
  model: DiningEventCheckoutModel;
  profileImageSrc: string;
  checkoutCompleted: boolean;
  checkoutErrorCode: DiningEventCheckoutModal.ErrorCode;

  onJoinEvent: () => void;
  onClose: () => void;
  showLoginModal: () => void;

  /** Indicates the join event was successful. */
  onJoinEventSuccess: () => void;
}

interface State {
  isLoaded: boolean;
  errorCode: number;
}

export class DiningEventCheckoutModalController extends React.Component<
    Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isLoaded: false,
      errorCode: null
    };
  }

  public render(): JSX.Element {
    if (this.state.errorCode) {
      return <Router.Redirect to={`/error/${this.state.errorCode}`} />;
    }
    if (!this.state.isLoaded) {
      return <div />;
    }
    return (
      <DiningEventCheckoutModal
        displayMode={this.props.displayMode}
        account={this.props.account}
        eventId={this.props.model.diningEvent.id}
        eventFee={this.props.model.diningEvent.eventFee}
        eventFeeDescription=''
        eventTitle={this.props.model.diningEvent.title}
        imageSrc={this.props.model.diningEvent.coverImageSrc}
        eventStartDate={this.props.model.diningEvent.startAt}
        checkoutCompleted={this.props.checkoutCompleted}
        errorCode={this.props.checkoutErrorCode}
        onJoinEvent={this.props.onJoinEvent}
        onClose={this.props.onClose}
        onCheckout={this.handleCheckout}
      />);
  }

  public async componentDidMount(): Promise<void> {
    try {
      await this.props.model.load();
      this.setState({ isLoaded: true });
    } catch (error) {
      this.setState({ errorCode: error.code });
    }
  }

  private handleCheckout = async () => {
    await this.props.model.checkout();
  }
}
