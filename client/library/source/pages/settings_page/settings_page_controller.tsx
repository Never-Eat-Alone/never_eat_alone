import * as React from 'react';
import { DisplayMode } from '../../definitions';
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
      isFoodieAcceptedInviteNotificationOn={this.state.isFoodieAcceptedInviteNotificationOn}
      isAnnouncementNotificationOn={this.state.isAnnouncementNotificationOn}
      defaultCard={this.props.model.defaultCard}
      otherPaymentCards={this.props.model.otherPaymentCards}
      paymentRecords={this.props.model.paymentRecords}
      addCardErrorMessage={}
      addCardErrorCode={this.state.addCardErrorCode}
      updateCardErrorMessage={}
      updateCardErrorCode={}
      onAddCard={}
      onUpdateCard={}
      onMakeDefaultCard={}
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
}
