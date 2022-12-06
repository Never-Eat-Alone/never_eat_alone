import * as React from 'react';
import { AddCreditCardForm, Modal } from '../../components';
import { DisplayMode, PaymentCard, PaymentRecord, SocialAccount
} from '../../definitions';
import { PaymentReceiptModal } from '../../modals';
import { AccountInformationTab } from './account_information_tab';
import { CardDetailsForm } from './card_details_form'; 
import { NotificationsTab } from './notifications_tab';
import { PaymentHistoryTab } from './payment_history_tab';
import { PaymentMethodsTab } from './payment_methods_tab';
import { Tab } from './tab';

interface Properties {
  displayMode: DisplayMode;

  /** User's linked social acounts. */
  linkedSocialAccounts: SocialAccount[];

  /** User's displayname. */
  displayName: string;

  /** User's profile id number. */
  profileId: number;

  /** User's email. */
  email: string;

  /** User's password. */
  password: string;

  /** Whether the new events notification is checked or not. */
  isNewEventsNotificationOn: boolean;

  /** Whether the event joined notification is checked or not. */
  isEventJoinedNotificationOn: boolean;

  /** Whether the event reminders notification is checked or not. */
  isEventRemindersNotificationOn: boolean;

  /** Whether the changes to attending events notification is checked or not. */
  isChangesNotificationOn: boolean;

  /** Whether the someone joins event notification is checked or not. */
  isSomeoneJoinedNotificationOn: boolean;

  /** Whether the foodie accepts invite notification is checked or not. */
  isFoodieAcceptedInviteNotificationOn: boolean;

  /** Whether the announcement notification is checked or not. */
  isAnnouncementNotificationOn: boolean;

  /** User's default payment card. */
  defaultCard: PaymentCard;

  /** User's list of existing cards on file other than the default card. */
  paymentCards: PaymentCard[];

  /** User's list of payment records. */
  paymentRecords: PaymentRecord[];

  /** Error message regarding adding a new card. */
  addCardErrorMessage: string;

  /** Error code regarding adding a new card. */
  addCardErrorCode: AddCreditCardForm.ErrorCode;

  /** Error message regarding updating an existing card info. */
  updateCardErrorMessage: string;

  /** Error code regarding updating an existing credit card. */
  updateCardErrorCode: CardDetailsForm.ErrorCode;

  accountInformationTabPage: AccountInformationTab.Page;

  paymentMethodsTabPage: PaymentMethodsTab.Page;

  paymentReceiptModalPage: PaymentReceiptModal.Page;

  isReceiptEmailed: boolean;

  onChangePaymentMethodsTabPage: (page: PaymentMethodsTab.Page) => void;

  /** Indicates the Add card button is clicked. */
  onAddCard: (cardNumber: number, nameOnCard: string, month: number,
    year: number, securityCode: number, zipcode: string) => void;

  /** Indicates the update card details button is clicked. */
  onUpdateCard: (newCard: PaymentCard, isMarkedDefault: boolean) => void;

  /** Indicates the delete card button is clicked. */
  onDeleteCard: (cardId: number) => void;

  /** Indicates the New Events toggle button is clicked. */
  onNewEventsToggle: () => void;

  /** Indicates the Event Joined toggle button is clicked. */
  onEventJoinedToggle: () => void;

  /** Indicates the Event Reminders toggle button is clicked. */
  onEventRemindersToggle: () => void;

  /** Indicates the Changes toggle button is clicked. */
  onChangesToggle: () => void;

  /** Indicates the Someone Joined toggle button is clicked. */
  onSomeoneJoinedToggle: () => void;

  /** Indicates the Foodie Accepted Invite toggle button is clicked. */
  onFoodieAcceptedInviteToggle: () => void;

  /** Indicates the Announcement toggle button is clicked. */
  onAnnouncementToggle: () => void;

  /** Indicates link Google account button is clicked. */
  onGoogleClick: () => void;

  /** Indicates link Facebook account button is clicked. */
  onFacebookClick: () => void;

  /** Indicates the remove social account button is clicked. */
  onRemoveLinkedAccount: (account: SocialAccount) => void;

  /** Indicates the edit button regarding the displayname section is clicked. */
  onEditDisplayNameClick: () => void;

  /** Indicates the edit button regarding the email is clicked. */
  onEditEmailClick: () => void;

  /** Indicates the edit button regarding the password is clicked. */
  onEditPasswordClick: () => void;

  /** Indicates the deactivate account button is clicked. */
  onDeactivateAccount: () => void;

  /** Indicates the delete account button is clicked. */
  onDeleteAccount: () => void;

  /** Indicates the view receipt button is clicked. */
  onViewReceiptClick: (record: PaymentRecord) => void;

  onPrintClick: (paymentRecord: PaymentRecord) => void;

  onDownloadPdfClick: (paymentRecord: PaymentRecord) => void;

  onBackClick: () => void;

  onHelpButtonClick: () => void;

  onSubmitHelpEmail: (receiptId: number, message: string) => void;

  onEmailReceiptClick: (paymentRecord: PaymentRecord) => void;
  activateEmailButton: () => void;
  onDeactivateAccountPageClick: () => void;
}

interface State {
  activeTab: SettingsPage.Tab
  isReceiptDisplayed: boolean;
  paymentRecord: PaymentRecord;
}

/** Displays the Settings Page. */
export class SettingsPage extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      activeTab: SettingsPage.Tab.ACCOUNT_INFORMATION,
      isReceiptDisplayed: false,
      paymentRecord: PaymentRecord.noRecord()
    };
  }

  public render(): JSX.Element {
    const { containerStyle, contentStyle, headingStyle,
        pageContainerStyle, lastTabStyle } = (() => {
      if (this.props.displayMode === DisplayMode.MOBILE) {
        return {
          containerStyle: MOBILE_CONTAINER_STYLE,
          contentStyle: MOBILE_CONTENT_STYLE,
          headingStyle: MOBILE_HEADING_STYLE,
          pageContainerStyle: MOBILE_PAGE_CONTAINER_STYLE,
          lastTabStyle: MOBILE_LAST_TAB_STYLE
        };
      } else if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerStyle: TABLET_CONTAINER_STYLE,
          contentStyle: TABLET_CONTENT_STYLE,
          headingStyle: HEADING_STYLE,
          pageContainerStyle: PAGE_CONTAINER_STYLE,
          lastTabStyle: TABLET_LAST_TAB_STYLE
        };
      }
      return {
        containerStyle: DESKTOP_CONTAINER_STYLE,
        contentStyle: DESKTOP_CONTENT_STYLE,
        headingStyle: HEADING_STYLE,
        pageContainerStyle: PAGE_CONTAINER_STYLE,
        lastTabStyle: DESKTOP_LAST_TAB_STYLE
      };
    })();
    const tabContent = (() => {
      switch (this.state.activeTab) {
        case SettingsPage.Tab.ACCOUNT_INFORMATION:
          return <AccountInformationTab {...this.props}
            page={this.props.accountInformationTabPage} />;
        case SettingsPage.Tab.NOTIFICATIONS:
          return <NotificationsTab {...this.props} />;
        case SettingsPage.Tab.PAYMENT_METHODS:
          return <PaymentMethodsTab {...this.props}
            page={this.props.paymentMethodsTabPage}
            onChangePage={this.props.onChangePaymentMethodsTabPage}
          />;
        case SettingsPage.Tab.PAYMENT_HISTORY:
          return <PaymentHistoryTab
            {...this.props}
            onViewReceiptClick={this.handleViewReceipt}
          />;
      }
    })();
    const receiptModal = (this.state.isReceiptDisplayed &&
      <Modal>
        <PaymentReceiptModal
          displayMode={this.props.displayMode}
          paymentRecord={this.state.paymentRecord}
          page={this.props.paymentReceiptModalPage}
          isReceiptEmailed={this.props.isReceiptEmailed}
          onClose={this.handlePaymentReceiptClose}
          onPrintClick={this.props.onPrintClick}
          onDownloadPdfClick={this.props.onDownloadPdfClick}
          onSendEmailClick={this.props.onEmailReceiptClick}
          onHelpClick={this.props.onHelpButtonClick}
          submitHelpEmail={this.props.onSubmitHelpEmail}
          onBack={this.props.onBackClick}
          activateEmailButton={this.props.activateEmailButton}
        />
      </Modal>);
    return (
      <div style={containerStyle} >
        <div style={contentStyle} >
          {receiptModal}
          <h1 style={headingStyle} >Settings</h1>
          <div style={TABS_ROW_STYLE} >
            <Tab
              key='Account_Information'
              label='Account Information'
              imgSrc='resources/icons/account.svg'
              style={ACCOUNT_TAB_STYLE}
              isActive={this.state.activeTab ===
                SettingsPage.Tab.ACCOUNT_INFORMATION}
              onClick={() => this.handleTabClick(
                SettingsPage.Tab.ACCOUNT_INFORMATION)}
            />
            <Tab
              key='Notifications'
              label='Notifications'
              imgSrc='resources/icons/notifications.svg'
              style={NOTIFICATIONS_TAB_STYLE}
              isActive={this.state.activeTab ===
                SettingsPage.Tab.NOTIFICATIONS}
              onClick={() => this.handleTabClick(
                SettingsPage.Tab.NOTIFICATIONS)}
            />
            <Tab
              key='Payment_Method'
              label='Payment Method'
              imgSrc='resources/icons/payment_method.svg'
              style={PAYMENT_METHODS_TAB_STYLE}
              isActive={this.state.activeTab ===
                SettingsPage.Tab.PAYMENT_METHODS}
              onClick={() => this.handleTabClick(
                SettingsPage.Tab.PAYMENT_METHODS)}
            />
            <Tab
              key='Payment_History'
              label='Payment History'
              imgSrc='resources/icons/payment_history.svg'
              style={PAYMENY_HISTORY_TAB_STYLE}
              isActive={this.state.activeTab ===
                SettingsPage.Tab.PAYMENT_HISTORY}
              onClick={() => this.handleTabClick(
                SettingsPage.Tab.PAYMENT_HISTORY)}
            />
            <div style={lastTabStyle} />
          </div>
          <div style={pageContainerStyle} >
            {tabContent}
          </div>
        </div>
      </div>);
  }

  private handleTabClick = (tab: SettingsPage.Tab) => {
    this.setState({ activeTab: tab });
  }

  private handlePaymentReceiptClose = () => {
    this.setState({ isReceiptDisplayed: false });
  }

  private handleViewReceipt = (paymentRecord: PaymentRecord) => {
    this.setState({
      isReceiptDisplayed: true,
      paymentRecord: paymentRecord
    });
  }
}

export namespace SettingsPage {
  export enum Tab {
    ACCOUNT_INFORMATION,
    NOTIFICATIONS,
    PAYMENT_METHODS,
    PAYMENT_HISTORY
  }
}

const DESKTOP_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  overflow: 'initial',
  padding: '50px 33px 90px 33px',
  width: '100%'
};

const TABLET_CONTAINER_STYLE: React.CSSProperties = {
  ...DESKTOP_CONTAINER_STYLE
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  ...DESKTOP_CONTAINER_STYLE,
  alignItems: 'flex-start',
  padding: '50px 0px'
};

const CONTENT_STYLE: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start'
};

const DESKTOP_CONTENT_STYLE: React.CSSProperties = {
  ...CONTENT_STYLE,
  width: '900px'
};

const TABLET_CONTENT_STYLE: React.CSSProperties = {
  ...CONTENT_STYLE,
  width: '702px'
};

const MOBILE_CONTENT_STYLE: React.CSSProperties = {
  ...CONTENT_STYLE,
  width: '100%'
};

const HEADING_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '26px',
  lineHeight: '39px',
  textTransform: 'uppercase',
  color: '#969696',
  padding: '0px',
  margin: '0px'
};

const MOBILE_HEADING_STYLE: React.CSSProperties = {
  ...HEADING_STYLE,
  margin: '0px 0px 0px 20px'
};

const TABS_ROW_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  position: 'absolute',
  left: '0px',
  top: '89px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  height: '45px',
  flexWrap: 'nowrap',
  width: '100%',
  overflowX: 'auto'
};

const DESKTOP_LAST_TAB_STYLE: React.CSSProperties = {
  height: '1px',
  width: '315px',
  backgroundColor: '#EFEFEF',
  marginTop: '44px',
  flex: '0 0 auto'
};

const TABLET_LAST_TAB_STYLE: React.CSSProperties = {
  ...DESKTOP_LAST_TAB_STYLE,
  width: '117px'
};

const MOBILE_LAST_TAB_STYLE: React.CSSProperties = {
  width: '0px'
};

const ACCOUNT_TAB_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  borderRadius: '4px 0px 0px 4px',
  width: '164px',
  minWidth: '164px',
  flex: '0 0 auto'
};

const GREY_BORDER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  borderLeft: '1px solid #EFEFEF'
};

const NOTIFICATIONS_TAB_STYLE: React.CSSProperties = {
  ...GREY_BORDER_STYLE,
  width: '125px',
  minWidth: '125px',
  flex: '0 0 auto'
};

const PAYMENT_METHODS_TAB_STYLE: React.CSSProperties = {
  ...GREY_BORDER_STYLE,
  width: '151px',
  minWidth: '151px',
  flex: '0 0 auto'
};

const PAYMENY_HISTORY_TAB_STYLE: React.CSSProperties = {
  ...GREY_BORDER_STYLE,
  width: '145px',
  minWidth: '145px',
  borderRadius: '0px 4px 4px 0px',
  flex: '0 0 auto'
};

const PAGE_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  paddingTop: '145px',
  backgroundColor: '#FFFFFF'
};

const MOBILE_PAGE_CONTAINER_STYLE: React.CSSProperties = {
  ...PAGE_CONTAINER_STYLE,
  paddingLeft: '20px',
  paddingRight: '20px'
};
