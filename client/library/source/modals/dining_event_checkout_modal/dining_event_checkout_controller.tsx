import * as React from 'react';
import * as Router from 'react-router-dom';
import { AddCreditCardForm } from '../../components';
import { DisplayMode, User } from '../../definitions';
import { DiningEventCheckoutModal } from './dining_event_checkout_modal';
import { DiningEventCheckoutModel } from './dining_event_checkout_model';

interface Properties {
  account: User;
  displayMode: DisplayMode;
  model: DiningEventCheckoutModel;
  profileImageSrc: string;
  onClose: () => void;
  showLoginModal: () => void;

  /** Indicates the join event was successful. */
  onJoinEventSuccess: () => void;
}

interface State {
  isLoaded: boolean;
  checkoutErrorCode: DiningEventCheckoutModal.ErrorCode;
  addCardErrorCode: AddCreditCardForm.ErrorCode;
  errorCode: number;
}

export class DiningEventCheckoutModalController extends React.Component<
    Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isLoaded: false,
      checkoutErrorCode: DiningEventCheckoutModal.ErrorCode.NONE,
      addCardErrorCode: AddCreditCardForm.ErrorCode.NONE,
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
        eventFee={this.props.model.diningEvent.eventFee}
        eventFeeDescription=''
        taxRate={0.13}
        eventTitle={this.props.model.diningEvent.title}
        imageSrc={this.props.model.diningEvent.coverImageSrc}
        eventStartDate={this.props.model.diningEvent.startAt}
        paymentCardsOnFile={this.props.model.paymentCardList}
        defaultCard={this.props.model.defaultPaymentCard}
        addCardErrorMessage=''
        errorCode={this.state.checkoutErrorCode}
        addCardErrorCode={this.state.addCardErrorCode}
        cardAdded
        checkoutCompleted
        onJoinEvent={this.handleJoinEvent}
        onCreditCardClick={this.handleCreditCardClick}
        onClose={this.props.onClose}
        onCheckout={this.handleCheckout}
        onAddCard={this.handleAddCard}
        onPaypalClick={this.handlePaypalClick}
        onGooglePayClick={this.handleGooglePayClick}
        onApplePayClick={this.handleApplePayClick}
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

  /** Indicates the event is free and user clicked on join button. */
  private handleJoinEvent = async () => {
    if (this.props.account?.id === -1) {
      this.props.showLoginModal();
      return;
    }
    try {
      await this.props.model.joinEvent(this.props.account.id,
        this.props.account.name, this.props.profileImageSrc);
      this.props.onJoinEventSuccess();
    } catch (error) {
      this.setState({
        checkoutErrorCode: DiningEventCheckoutModal.ErrorCode.JOIN_FAILED });
    }
  }

  private handleCreditCardClick = () => {

  }

  private handleCheckout = () => {

  }

  private handleAddCard = () => {

  }

  private handlePaypalClick = () => {

  }

  private handleGooglePayClick = () => {

  }

  private handleApplePayClick = () => {

  }
}
