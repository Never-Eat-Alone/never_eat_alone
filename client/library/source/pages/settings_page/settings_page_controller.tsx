import * as EmailValidator from 'email-validator';
import * as React from 'react';
import * as Router from 'react-router-dom';
import { AddCreditCardForm } from '../../components';
import { CreditCardType, DisplayMode, PaymentCard, PaymentRecord, SocialAccount,
  User } from '../../definitions';
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

  /** Indicates the save display name was successful on database. */
  onSaveDisplayNameSuccess: (newAccount: User) => Promise<void>;

  onLogOut: () => void;
}

interface State {
  isLoaded: boolean;
  isNewEventsNotificationOn: boolean;
  isEventJoinedNotificationOn: boolean;
  isEventRemindersNotificationOn: boolean;
  isChangesNotificationOn: boolean;
  isSomeoneJoinedNotificationOn: boolean;
  isFoodieAcceptedInviteNotificationOn: boolean;
  isAnnouncementNotificationOn: boolean;
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
  linkedSocialAccounts: SocialAccount[];
  errorCode: number;
  saveEmailErrorCode: AccountInformationTab.SaveEmailErrorCode;
  addCardErrorCode: AddCreditCardForm.ErrorCode;
  newEmail: string;
  editEmailPassword: string;
  isNewEmailValid: boolean;
}

export class SettingsPageController extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isLoaded: false,
      isNewEventsNotificationOn: false,
      isEventJoinedNotificationOn: false,
      isEventRemindersNotificationOn: false,
      isChangesNotificationOn: false,
      isSomeoneJoinedNotificationOn: false,
      isFoodieAcceptedInviteNotificationOn: false,
      isAnnouncementNotificationOn: false,
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
      redirect: null,
      linkedSocialAccounts: [],
      errorCode: null,
      saveEmailErrorCode: AccountInformationTab.SaveEmailErrorCode.NONE,
      addCardErrorCode: AddCreditCardForm.ErrorCode.NONE,
      newEmail: '',
      editEmailPassword: '',
      isNewEmailValid: true
    };
  }

  public render(): JSX.Element {
    if (this.state.errorCode) {
      return <Router.Redirect to={`/error/${this.state.errorCode}`} />;
    }
    if (!this.state.isLoaded) {
      return <div />;
    }
    if (this.state.redirect) {
      return <Router.Redirect to={this.state.redirect} />;
    }
    return <SettingsPage
      displayMode={this.props.displayMode}
      linkedSocialAccounts={this.state.linkedSocialAccounts}
      displayName={this.props.model.displayName}
      email={this.props.model.email}
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
      updateCardErrorMessage=''
      updateCardErrorCode={this.state.updateCardErrorCode}
      accountInformationTabPage={this.state.accountInformationTabPage}
      paymentMethodsTabPage={this.state.paymentMethodsTabPage}
      paymentReceiptModalPage={this.state.paymentReceiptModalPage}
      isReceiptEmailed={this.state.isReceiptEmailed}
      isDeleteChecked={this.state.isDeleteChecked}
      deleteAccountPassword={this.state.deleteAccountPassword}
      deleteAccountErrorCode={this.state.deleteAccountErrorCode}
      isEmailUpdateTokenValid={this.props.model.isEmailUpdateTokenValid}
      saveEmailErrorCode={this.state.saveEmailErrorCode}
      newEmail={this.state.newEmail}
      editEmailPassword={this.state.editEmailPassword}
      isNewEmailValid={this.state.isNewEmailValid}
      onResendEmailUpdateConfirmation={this.handleResendEmailUpdateConfirmation}
      onDiscardEmailUpdateRequest={this.handleDiscardEmailUpdateRequest}
      addCardErrorCode={this.state.addCardErrorCode}
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
      onEditDisplayNameSaveClick={this.handleEditDisplayNameClick}
      onEditEmailSaveClick={this.handleEditEmailClick}
      onEditPasswordSaveClick={this.handleEditPasswordClick}
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
        isNewEventsNotificationOn: this.props.model.getNotificationSetting(
          'isNewEventsNotificationOn'),
        isEventJoinedNotificationOn: this.props.model.getNotificationSetting(
          'isEventJoinedNotificationOn'),
        isEventRemindersNotificationOn: this.props.model.getNotificationSetting(
          'isEventRemindersNotificationOn'),
        isChangesNotificationOn: this.props.model.getNotificationSetting(
          'isChangesNotificationOn'),
        isSomeoneJoinedNotificationOn: this.props.model.getNotificationSetting(
          'isSomeoneJoinedNotificationOn'),
        isFoodieAcceptedInviteNotificationOn:
          this.props.model.getNotificationSetting(
            'isFoodieAcceptedInviteNotificationOn'),
        isAnnouncementNotificationOn:
          this.props.model.getNotificationSetting(
            'isAnnouncementNotificationOn'),
        paymentCards: this.props.model.paymentCards,
        defaultCard: this.props.model.defaultCard,
        linkedSocialAccounts: this.props.model.linkedSocialAccounts
      });
    } catch (error) {
      this.setState({ isLoaded: true, errorCode: error.code });
    }
  }

  private handleChangePaymentMethodsTabPage = (page:
      PaymentMethodsTab.Page) => {
    this.setState({ paymentMethodsTabPage: page });
  }

  private handleNewEventsToggle = async () => {
    try {
      const newSetting = await this.props.model.toggleNotificationSetting(
        'isNewEventsNotificationOn');
      this.setState({ isNewEventsNotificationOn: newSetting });
    } catch (error) {
      this.setState({ errorCode: error.code });
    }
  }

  private handleEventJoinedToggle = async () => {
    try {
      const newSetting = await this.props.model.toggleNotificationSetting(
        'isEventJoinedNotificationOn');
      this.setState({ isEventJoinedNotificationOn: newSetting });
    } catch (error) {
      this.setState({ errorCode: error.code });
    }
  }

  private handleEventRemindersToggle = async () => {
    try {
      const newSetting = await this.props.model.toggleNotificationSetting(
        'isEventRemindersNotificationOn');
      this.setState({ isEventRemindersNotificationOn: newSetting });
    } catch (error) {
      this.setState({ errorCode: error.code });
    }
  }

  private handleChangesToggle = async () => {
    try {
      const newSetting = await this.props.model.toggleNotificationSetting(
        'isChangesNotificationOn');
      this.setState({ isChangesNotificationOn: newSetting });
    } catch (error) {
      this.setState({ errorCode: error.code });
    }
  }

  private handleSomeoneJoinedToggle = async () => {
    try {
      const newSetting = await this.props.model.toggleNotificationSetting(
        'isSomeoneJoinedNotificationOn');
      this.setState({ isSomeoneJoinedNotificationOn: newSetting });
    } catch (error) {
      this.setState({ errorCode: error.code });
    }
  }

  private handleFoodieAcceptedInviteToggle = async () => {
    try {
      const newSetting = await this.props.model.toggleNotificationSetting(
        'isFoodieAcceptedInviteNotificationOn');
      this.setState({ isFoodieAcceptedInviteNotificationOn: newSetting });
    } catch (error) {
      this.setState({ errorCode: error.code });
    }
  }

  private handleAnnouncementToggle = async () => {
    try {
      const newSetting = await this.props.model.toggleNotificationSetting(
        'isFoodieAcceptedInviteNotificationOn');
      this.setState({ isAnnouncementNotificationOn: newSetting });
    } catch (error) {
      this.setState({ errorCode: error.code });
    }
  }

  private handleAddCard = async (cardNumber: number, nameOnCard: string,
      month: number, year: number, securityCode: number, zipcode: string,
      creditCardType: CreditCardType) => {
    try {
      await this.props.model.addCard(new PaymentCard(Date.now(), cardNumber,
        nameOnCard, month, year, securityCode, zipcode, creditCardType));
      this.setState({
        paymentCards: this.props.model.paymentCards,
        paymentMethodsTabPage: PaymentMethodsTab.Page.INITIAL,
        addCardErrorCode: AddCreditCardForm.ErrorCode.NONE
      });
    } catch {
      this.setState({
        paymentMethodsTabPage: PaymentMethodsTab.Page.ADD_CARD,
        addCardErrorCode: AddCreditCardForm.ErrorCode.INVALID_CARD_INFO
      });
    }
  }

  private handleUpdateCard = async (newCard: PaymentCard, isMarkedAsDefault:
      boolean) => {
    try {
      await this.props.model.updateCard(newCard, isMarkedAsDefault);
      this.setState({
        paymentCards: this.props.model.paymentCards,
        defaultCard: this.props.model.defaultCard,
        updateCardErrorCode: CardDetailsForm.ErrorCode.NONE,
        paymentMethodsTabPage: PaymentMethodsTab.Page.INITIAL
      });
    } catch (error) {
      this.setState({
        updateCardErrorCode: CardDetailsForm.ErrorCode.NO_CONNECTION,
        paymentMethodsTabPage: PaymentMethodsTab.Page.CARD_DETAILS
      });
    }
  }

  private handleDeleteCard = async (cardId: number) => {
    try {
      await this.props.model.deleteCard(cardId);
      this.setState({
        defaultCard: this.props.model.defaultCard,
        paymentCards: this.props.model.paymentCards,
        updateCardErrorCode: CardDetailsForm.ErrorCode.NONE,
        paymentMethodsTabPage: PaymentMethodsTab.Page.INITIAL
      });
    } catch (error) {
      this.setState({
        updateCardErrorCode: CardDetailsForm.ErrorCode.NO_CONNECTION,
        paymentMethodsTabPage: PaymentMethodsTab.Page.CARD_DETAILS,
        errorCode: error.code
      });
    }
  }

  private handleResendEmailUpdateConfirmation = async () => {
    try {
      await this.props.model.resendEmailUpdateConfirmation();
    } catch (error) {
      this.setState({ errorCode: error.code });
    }
  }

  private handleDiscardEmailUpdateRequest = async () => {
    try {
      await this.props.model.discardEmailUpdateRequest();
    } catch (error) {
      this.setState({ errorCode: error.code });
    }
  }

  private handleGoogleClick = () => {}

  private handleFacebookClick = () => {}

  private handleRemoveLinkedAccount = async (account: SocialAccount) => {
    try {
      const unlinkSuccess = await this.props.model.unlinkAccount(account);
      if (unlinkSuccess) {
        this.setState({
          linkedSocialAccounts: this.props.model.linkedSocialAccounts
        });
      }
    } catch (error) {
      this.setState({ errorCode: error.code });
    }
  }

  private handleEditDisplayNameClick = async (newDisplayName: string) => {
    try {
      const modifiedAccount = await this.props.model.saveDisplayName(
        newDisplayName);
      await this.props.onSaveDisplayNameSuccess(modifiedAccount);
    } catch (error) {
      this.setState({ errorCode: error.code });
    }
  }

  private handleEditEmailClick = async (newEmail: string, password: string):
      Promise<void> => {
    if (newEmail.trim() === '') {
      this.setState({ saveEmailErrorCode:
        AccountInformationTab.SaveEmailErrorCode.EMPTY_EMAIL_FIELD });
      return;
    }
    if (password === '') {
      this.setState({ saveEmailErrorCode:
        AccountInformationTab.SaveEmailErrorCode.EMPTY_PASSWORD_FIELD });
      return;
    }
    if (password.length < 8) {
      this.setState({  saveEmailErrorCode:
        AccountInformationTab.SaveEmailErrorCode.WRONG_PASSWORD });
      return;
    }
    if (newEmail === this.props.model.email) {
      this.setState({ saveEmailErrorCode:
        AccountInformationTab.SaveEmailErrorCode.DUPLICATE_EMAIL });
      return;
    }
    if (!EmailValidator.validate(newEmail)) {
      this.setState({ saveEmailErrorCode:
        AccountInformationTab.SaveEmailErrorCode.INVALID_EMAIL_ADDRESS });
      return;
    }

    try {
      await this.props.model.saveEmailUpdateRequest(newEmail, password);
      this.setState({ saveEmailErrorCode:
        AccountInformationTab.SaveEmailErrorCode.NONE });
    } catch (error) {
      if (error.message && error.code === 401) {
        this.setState({ saveEmailErrorCode:
          AccountInformationTab.SaveEmailErrorCode.WRONG_PASSWORD });
        return;
      }
      this.setState({ errorCode: error.code, saveEmailErrorCode:
        AccountInformationTab.SaveEmailErrorCode.NO_CONNECTION });
    }
  }

  private handleEditPasswordClick = async (currentPassword: string,
      newPassword: string) => {
    try {
      await this.props.model.savePassword(currentPassword, newPassword);
    } catch (error) {
      this.setState({ errorCode: error.code });
    }
  }

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
    } catch (error) {
      this.setState({
        errorCode: error.code,
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
    } catch (error) {
      this.setState({ errorCode: error.code });
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
      const isSent = await this.props.model.submitHelpEmail(receiptId, message);
      if (isSent) {
        this.setState({
          paymentReceiptModalPage: PaymentReceiptModal.Page.REQUEST_SENT
        });
      }
    } catch (error) {
      this.setState({ errorCode: error.code });
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

  private handleDeleteCheckboxClick = () => {
    this.setState(prevState => ({
      isDeleteChecked: !prevState.isDeleteChecked
    }));
  }

  private handleDeletePasswordChange = (event: React.ChangeEvent<
      HTMLInputElement>) => {
    this.setState({ deleteAccountPassword: event.target.value });
  }
}
