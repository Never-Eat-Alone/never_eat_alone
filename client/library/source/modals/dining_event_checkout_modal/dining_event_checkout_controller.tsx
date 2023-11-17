import * as React from 'react';
import * as Router from 'react-router-dom';
import { DisplayMode, User } from '../../definitions';
import { DiningEventCheckoutModal } from './dining_event_checkout_modal';
import { DiningEventCheckoutModel } from './dining_event_checkout_model';

interface Properties {
  account: User;
  displayMode: DisplayMode;
  model: DiningEventCheckoutModel;
}

interface State {
  isLoaded: boolean;
  errorCode: DiningEventCheckoutModal.ErrorCode;
}

export class DiningEventCheckoutModalController extends React.Component<
    Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isLoaded: false,
      errorCode: DiningEventCheckoutModal.ErrorCode.NONE
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
        eventFee={this.props.model.diningEvent.eventFee}
        eventFeeDescription=''
        eventStartDate={this.props.model.diningEvent.startAt}
        eventTitle={this.props.model.diningEvent.title}
        imageSrc=''
        paymentCardsOnFile={this.props.model.paymentCardList}
      />);
  }

  public async componentDidMount(): Promise<void> {
    try {

    } catch (error) {
      this.setState({ errorCode: error.code });
    }
  }
}
