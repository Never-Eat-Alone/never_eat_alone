import * as React from 'react';
import * as Router from 'react-router-dom';
import { AddCreditCardForm } from '../../components';
import { CreditCardType, DisplayMode, PaymentCard, PaymentRecord, User
} from '../../definitions';
import { PaymentReceiptModal } from '../../modals';
import { AccountInformationTab } from './account_information_tab';
import { CardDetailsForm } from './card_details_form';
import { PaymentMethodsTab } from './payment_methods_tab';
import { SettingsPage } from './settings_page';
import { SettingsPageModel } from './settings_page_model';

interface Properties {
  displayMode: DisplayMode;
  account: User;
  model: SettingsPageModel;
  onLogOut: () => void;
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
  accountInformationTabPage: AccountInformationTab.Page;
  paymentMethodsTabPage: PaymentMethodsTab.Page;
  paymentReceiptModalPage: PaymentReceiptModal.Page;
  isReceiptEmailed: boolean;
  isDeleteChecked: boolean;
  deleteAccountPassword: string;
  deleteAccountErrorCode: AccountInformationTab.DeleteAccountErrorCode;
  redirect: string;
}

export class SettingsPageController extends React.Component<Properties, State> {
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
      accountInformationTabPage: AccountInformationTab.Page.INITIAL,
      paymentMethodsTabPage: PaymentMethodsTab.Page.INITIAL,
      paymentReceiptModalPage: PaymentReceiptModal.Page.INITIAL,
      isReceiptEmailed: false,
      isDeleteChecked: false,
      deleteAccountPassword: '',
      deleteAccountErrorCode: AccountInformationTab.DeleteAccountErrorCode.NONE,
      redirect: null
    };
  }

  public render(): JSX.Element {
    if (!this.state.isLoaded || this.state.hasError) {
      return <div />;
    }
    if (this.state.redirect) {
      return <Router.Redirect to={this.state.redirect} />;
    }
    return <SettingsPage
      displayMode={this.props.displayMode}
      linkedSocialAccounts={this.props.model.linkedSocialAccounts}
      displayName={this.props.account.name}
      profileId={this.props.account.id}
      email={this.props.account.email}
      password={this.props.model.hashedPassword}
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
      accountInformationTabPage={this.state.accountInformationTabPage}
      paymentMethodsTabPage={this.state.paymentMethodsTabPage}
      paymentReceiptModalPage={this.state.paymentReceiptModalPage}
      isReceiptEmailed={this.state.isReceiptEmailed}
      isDeleteChecked={this.state.isDeleteChecked}
      deleteAccountPassword={this.state.deleteAccountPassword}
      deleteAccountErrorCode={this.state.deleteAccountErrorCode}
      onSubmitDeleteAccount={this.handleSubmitDeleteAccount}
      onAddCard={this.handleAddCard}
      onUpdateCard={this.handleUpdateCard}
      onDeleteCard={this.handleDeleteCard}
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
      onEditPasswordClick={this.handleEditPasswordClick}
      onDeactivateAccountSubmit={this.handleSubmitDeactivateAccount}
      onDeleteAccountPage={this.handleDeleteAccount}
      onChangePaymentMethodsTabPage={this.handleChangePaymentMethodsTabPage}
      onPrintClick={this.handlePrint}
      onDownloadPdfClick={this.handleDownloadPdf}
      onPaymentReceiptBackClick={this.handlePaymentReceiptBackButton}
      onAccountInformationBackClick={this.handleAccountInformationBackClick}
      onHelpButtonClick={this.handleHelpClick}
      onSubmitHelpEmail={this.handleSubmitHelpEmail}
      onEmailReceiptClick={this.handleEmailReceipt}
      activateEmailButton={this.handleActivateEmailButton}
      onDeactivateAccountPageClick={this.handleDeactivateAccountPageClick}
      onDeleteCheckboxClick={this.handleDeleteCheckboxClick}
      onDeletePasswordChange={this.handleDeletePasswordChange}
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
        defaultCard: this.props.model.defaultCard
      });
    } catch {
      this.setState({ isLoaded: true, hasError: true });
    }
  }

  private handleChangePaymentMethodsTabPage = (page: PaymentMethodsTab.Page
      ) => {
    this.setState({ paymentMethodsTabPage: page });
  }

  private handleNewEventsToggle = async () => {
    try {
      const isToggled = await this.props.model.toggleNewEventsNotification();
      if (isToggled) {
        this.setState((prevState) => ({
          isNewEventsNotificationOn: !prevState.isNewEventsNotificationOn
        }));
      }
    } catch {
      this.setState({ hasError: true });
    }
  }

  private handleEventJoinedToggle = async () => {
    try {
      const isToggled = await this.props.model.toggleEventJoinedNotification();
      if (isToggled) {
        this.setState((prevState) => ({
          isEventJoinedNotificationOn: !prevState.isEventJoinedNotificationOn
        }));
      }
    } catch {
      this.setState({ hasError: true });
    }
  }

  private handleEventRemindersToggle = async () => {
    try {
      const isToggled = 
        await this.props.model.toggleEventRemindersNotification();
      if (isToggled) {
        this.setState((prevState) => ({
          isEventRemindersNotificationOn:
            !prevState.isEventRemindersNotificationOn
        }));
      }
    } catch {
      this.setState({ hasError: true });
    }
  }

  private handleChangesToggle = async () => {
    try {
      const isToggled = await this.props.model.toggleChangesNotification();
      if (isToggled) {
        this.setState((prevState) => ({
          isChangesNotificationOn: !prevState.isChangesNotificationOn
        }));
      }
    } catch {
      this.setState({ hasError: true });
    }
  }

  private handleSomeoneJoinedToggle = async () => {
    try {
      const isToggled =
        await this.props.model.toggleSomeoneJoinedNotification();
      if (isToggled) {
        this.setState((prevState) => ({ isSomeoneJoinedNotificationOn:
          !prevState.isSomeoneJoinedNotificationOn
        }));
      }
    } catch {
      this.setState({ hasError: true });
    }
  }

  private handleFoodieAcceptedInviteToggle = async () => {
    try {
      const isToggled =
        await this.props.model.toggleFoodieAcceptedInviteNotification();
      if (isToggled) {
        this.setState((prevState) => ({ isFoodieAcceptedInviteNotificationOn:
          !prevState.isFoodieAcceptedInviteNotificationOn }));
      }
    } catch {
      this.setState({ hasError: true });
    }
  }

  private handleDeleteCheckboxClick = () => {
    this.setState((prevState) => ({
      isDeleteChecked: !prevState.isDeleteChecked
    }));
  }

  private handleDeletePasswordChange = (event: React.ChangeEvent<
      HTMLInputElement>) => {
    this.setState({ deleteAccountPassword: event.target.value });
  }

  private handleAnnouncementToggle = async () => {
    try {
      const isToggled = await this.props.model.toggleAnnouncementNotification();
      if (isToggled) {
        this.setState((prevState) => ({ isAnnouncementNotificationOn:
          !prevState.isAnnouncementNotificationOn }));
      }
    } catch {
      this.setState({ hasError: true });
    }
  }

  private handleAddCard = async (cardNumber: number, nameOnCard: string,
      month: number, year: number, securityCode: number, zipcode: string,
      creditCardType: CreditCardType) => {
    try {
      const response = await this.props.model.addCard(cardNumber, nameOnCard,
        month, year, securityCode, zipcode, creditCardType);
      if (response.id !== -1) {
        this.setState({
          addCardErrorCode: AddCreditCardForm.ErrorCode.NONE,
          paymentCards: this.props.model.paymentCards,
          paymentMethodsTabPage: PaymentMethodsTab.Page.INITIAL
        });
      }
    } catch {
      this.setState({
        addCardErrorCode: AddCreditCardForm.ErrorCode.INVALID_CARD_INFO,
        paymentMethodsTabPage: PaymentMethodsTab.Page.ADD_CARD
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
          updateCardErrorCode: CardDetailsForm.ErrorCode.NONE,
          paymentMethodsTabPage: PaymentMethodsTab.Page.INITIAL
        });
      } else {
        this.setState({
          updateCardErrorCode:
            CardDetailsForm.ErrorCode.INVALID_UPDATE_CARD_INPUT,
            paymentMethodsTabPage: PaymentMethodsTab.Page.CARD_DETAILS
        });
      }
    } catch {
      this.setState({
        updateCardErrorCode: CardDetailsForm.ErrorCode.NO_CONNECTION,
        paymentMethodsTabPage: PaymentMethodsTab.Page.CARD_DETAILS
      });
    }
  }

  private handleDeleteCard = async (cardId: number) => {
    try {
      const isDeleted = await this.props.model.deleteCard(cardId);
      if (isDeleted) {
        this.setState({
          defaultCard: this.props.model.defaultCard,
          paymentCards: this.props.model.paymentCards,
          updateCardErrorCode: CardDetailsForm.ErrorCode.NONE,
          paymentMethodsTabPage: PaymentMethodsTab.Page.INITIAL
        });
      }
    } catch {
      this.setState({
        updateCardErrorCode: CardDetailsForm.ErrorCode.NO_CONNECTION,
        paymentMethodsTabPage: PaymentMethodsTab.Page.CARD_DETAILS
      });
    }
  }

  private handleGoogleClick = () => {}

  private handleFacebookClick = () => {}

  private handleRemoveLinkedAccount = () => {}

  private handleEditDisplayNameClick = () => {}

  private handleEditEmailClick = () => {}

  private handleEditPasswordClick = () => {}

  private handleDeleteAccount = () => {
    this.setState({
      accountInformationTabPage: AccountInformationTab.Page.DELETE
    });
  }

  private handleSubmitDeleteAccount = async () => {
    try {
      const response = await this.props.model.deleteAccount(
        this.state.deleteAccountPassword);
      if (response.id === -1) {
        this.setState({
          deleteAccountErrorCode:
            AccountInformationTab.DeleteAccountErrorCode.WRONG_PASSWORD
        });
      } else {
        this.setState({ redirect: '/deleted_account_survey' });
        this.props.onLogOut();
      }
    } catch {
      this.setState({
        deleteAccountErrorCode:
          AccountInformationTab.DeleteAccountErrorCode.NO_CONNECTION
      });
    }
  }

  private handleSubmitDeactivateAccount = async () => {
    try {
      const isDeactivated = await this.props.model.deactivateAccount();
      if (isDeactivated) {
        this.setState({ redirect: '/deactivate_account_survey' });
        this.props.onLogOut();
      }
    } catch {
      this.setState({ hasError: true });
    }
  }

  private handleDeactivateAccountPageClick = () => {
    this.setState({
      accountInformationTabPage: AccountInformationTab.Page.DEACTIVATE_DELETE
    });
  }

  private handleHelpClick = () => {
    this.setState({ paymentReceiptModalPage: PaymentReceiptModal.Page.HELP });
  }

  private handlePaymentReceiptBackButton = () => {
    if (this.state.paymentReceiptModalPage ===
        PaymentReceiptModal.Page.REQUEST_SENT) {
      this.setState({ paymentReceiptModalPage: PaymentReceiptModal.Page.HELP });
    } else {
      this.setState({
        paymentReceiptModalPage: PaymentReceiptModal.Page.INITIAL
      });
    }
  }

  private handleAccountInformationBackClick = () => {
    if (this.state.accountInformationTabPage ===
        AccountInformationTab.Page.DELETE) {
      this.setState({
        accountInformationTabPage: AccountInformationTab.Page.DEACTIVATE_DELETE
      });
    } else {
      this.setState({
        accountInformationTabPage: AccountInformationTab.Page.INITIAL
      });
    }
  }

  private handlePrint = (paymentRecord: PaymentRecord) => {}

  private handleDownloadPdf = (paymentRecord: PaymentRecord) => {}

  private handleSubmitHelpEmail = async (receiptId: number,
      message: string) => {
    try {
      const isSent = await this.props.model.SubmitHelpEmail(receiptId, message);
      if (isSent) {
        this.setState({
          paymentReceiptModalPage: PaymentReceiptModal.Page.REQUEST_SENT
        });
      }
    } catch {
      this.setState({ hasError: true });
    }
  }

  private handleEmailReceipt = async (paymentRecord: PaymentRecord) => {
    try {
      const isSent = await this.props.model.emailReceipt(paymentRecord);
      if (isSent) {
        this.setState({ isReceiptEmailed: true });
      }
    } catch {
      this.setState({ isReceiptEmailed: false });
    }
  }

  private handleActivateEmailButton = () => {
    this.setState({ isReceiptEmailed: false });
  }
}
