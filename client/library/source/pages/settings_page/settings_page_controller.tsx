import * as React from 'react';
import { AddCreditCardForm } from '../../components';
import { DisplayMode, PaymentCard } from '../../definitions';
import { CardDetailsForm } from './card_details_form';
import { SettingsPage } from './settings_page';
import { SettingsPageModel } from './settings_page_model';

interface Properties {
  displayModel: DisplayMode;
  model: SettingsPageModel;
}

interface State {
  isLoaded: boolean;
  hasError: boolean;
  isNewEventsNotificationOn: boolean;
  isEventJoinedNotificationOn: boolean;
  isEventRemindersNotificationOn: boolean;
  isChangesNotificationOn: boolean;
  isSomeoneJoinedNotificationOn: boolean;
  isFoodieAcceptedInviteNotificationOn: boolean;
  isAnnouncementNotificationOn: boolean;
  addCardErrorCode: AddCreditCardForm.ErrorCode;
  updateCardErrorCode: CardDetailsForm.ErrorCode;
  paymentCards: PaymentCard[];
  defaultCard: PaymentCard;
}

export class SettingPageController extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isLoaded: false,
      hasError: false,
      isNewEventsNotificationOn: false,
      isEventJoinedNotificationOn: false,
      isEventRemindersNotificationOn: false,
      isChangesNotificationOn: false,
      isSomeoneJoinedNotificationOn: false,
      isFoodieAcceptedInviteNotificationOn: false,
      isAnnouncementNotificationOn: false,
      addCardErrorCode: AddCreditCardForm.ErrorCode.NONE,
      updateCardErrorCode: CardDetailsForm.ErrorCode.NONE,
      paymentCards: [],
      defaultCard: PaymentCard.noCard(),

    };
  }

  public render(): JSX.Element {
    if (!this.state.isLoaded || this.state.hasError) {
      return <div />;
    }
    return <SettingsPage
      displayMode={this.props.displayModel}
      linkedSocialAccounts={this.props.model.linkedSocialAccounts}
      displayName={this.props.model.displayName}
      profileId={this.props.model.profileId}
      email={this.props.model.email}
      password={this.props.model.password}
      isNewEventsNotificationOn={this.state.isNewEventsNotificationOn}
      isEventJoinedNotificationOn={this.state.isEventJoinedNotificationOn}
      isEventRemindersNotificationOn={this.state.isEventRemindersNotificationOn}
      isChangesNotificationOn={this.state.isChangesNotificationOn}
      isSomeoneJoinedNotificationOn={this.state.isSomeoneJoinedNotificationOn}
      isFoodieAcceptedInviteNotificationOn={
        this.state.isFoodieAcceptedInviteNotificationOn}
      isAnnouncementNotificationOn={this.state.isAnnouncementNotificationOn}
      defaultCard={this.props.model.defaultCard}
      paymentCards={this.props.model.paymentCards}
      paymentRecords={this.props.model.paymentRecords}
      addCardErrorMessage=''
      addCardErrorCode={this.state.addCardErrorCode}
      updateCardErrorMessage=''
      updateCardErrorCode={this.state.updateCardErrorCode}
      onAddCard={this.handleAddCard}
      onUpdateCard={this.handleUpdateCard}
      onDeleteCard={}
      onNewEventsToggle={this.handleNewEventsToggle}
      onEventJoinedToggle={this.handleEventJoinedToggle}
      onEventRemindersToggle={this.handleEventRemindersToggle}
      onChangesToggle={this.handleChangesToggle}
      onSomeoneJoinedToggle={this.handleSomeoneJoinedToggle}
      onFoodieAcceptedInviteToggle={this.handleFoodieAcceptedInviteToggle}
      onAnnouncementToggle={this.handleAnnouncementToggle}
      onGoogleClick={this.handleGoogleClick}
      onFacebookClick={this.handleFacebookClick}
      onRemoveLinkedAccount={this.handleRemoveLinkedAccount}
      onEditDisplayNameClick={this.handleEditDisplayNameClick}
      onEditEmailClick={this.handleEditEmailClick}
      onDeactivateAccount={this.handleDeactivateAccount}
      onDeleteAccount={this.handleDeleteAccount}
      onViewReceiptClick={this.handleViewReceiptClick}
    />;
  }

  public async componentDidMount(): Promise<void> {
    try {
      await this.props.model.load();
      this.setState({
        isLoaded: true,
        isNewEventsNotificationOn: this.props.model.isNewEventsNotificationOn,
        isEventJoinedNotificationOn:
          this.props.model.isEventJoinedNotificationOn,
        isEventRemindersNotificationOn:
          this.props.model.isEventRemindersNotificationOn,
        isChangesNotificationOn: this.props.model.isChangesNotificationOn,
        isSomeoneJoinedNotificationOn:
          this.props.model.isSomeoneJoinedNotificationOn,
        isFoodieAcceptedInviteNotificationOn:
          this.props.model.isFoodieAcceptedInviteNotificationOn,
        isAnnouncementNotificationOn:
          this.props.model.isAnnouncementNotificationOn,
        paymentCards: this.props.model.paymentCards,
        defaultCard: this.props.model.defaultCard,

      });
    } catch {
      this.setState({ isLoaded: true, hasError: true });
    }
  }

  private handleNewEventsToggle = () => {
    this.setState((prevState) => ({
      isNewEventsNotificationOn: !prevState.isNewEventsNotificationOn }));
  }

  private handleEventJoinedToggle = () => {
    this.setState((prevState) => ({
      isEventJoinedNotificationOn: !prevState.isEventJoinedNotificationOn }));
  }

  private handleEventRemindersToggle = () => {
    this.setState((prevState) => ({
      isEventRemindersNotificationOn: !prevState.isEventRemindersNotificationOn
    }));
  }

  private handleChangesToggle = () => {
    this.setState((prevState) => ({
      isChangesNotificationOn: !prevState.isChangesNotificationOn }));
  }

  private handleSomeoneJoinedToggle = () => {
    this.setState((prevState) => ({
      isSomeoneJoinedNotificationOn: !prevState.isSomeoneJoinedNotificationOn
    }));
  }

  private handleFoodieAcceptedInviteToggle = () => {
    this.setState((prevState) => ({ isFoodieAcceptedInviteNotificationOn:
      !prevState.isFoodieAcceptedInviteNotificationOn }));
  }

  private handleAnnouncementToggle = () => {
    this.setState((prevState) => ({ isAnnouncementNotificationOn:
      !prevState.isAnnouncementNotificationOn }));
  }

  private handleAddCard = async (cardNumber: number, nameOnCard: string,
      month: number, year: number, securityCode: number, zipcode: string) => {
    try {
      const response = await this.props.model.addCard(cardNumber, nameOnCard,
        month, year, securityCode, zipcode);
      if (response.id !== -1) {
        this.setState({
          addCardErrorCode: AddCreditCardForm.ErrorCode.NONE,
          paymentCards: this.props.model.paymentCards
        });
      }
    } catch {
      this.setState({
        addCardErrorCode: AddCreditCardForm.ErrorCode.INVALID_CARD_INFO
      });
    }
  }

  private handleUpdateCard = async (newCard: PaymentCard, isMarkedAsDefault:
      boolean) => {
    try {
      const response = await this.props.model.updateCard(newCard,
        isMarkedAsDefault);
      if (response.id !== -1) {
        this.setState({
          paymentCards: this.props.model.paymentCards,
          defaultCard: this.props.model.defaultCard,
          updateCardErrorCode: CardDetailsForm.ErrorCode.NONE
        });
      }
      this.setState({
        updateCardErrorCode: CardDetailsForm.ErrorCode.INVALID_UPDATE_CARD_INPUT
      });
    } catch {
      this.setState({
        updateCardErrorCode: CardDetailsForm.ErrorCode.NO_CONNECTION
      });
    }
  }
}
