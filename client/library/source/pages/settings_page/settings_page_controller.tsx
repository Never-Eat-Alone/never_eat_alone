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
}

export class SettingPageController extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isLoaded: false,
      hasError: false
    };
  }

  public render(): JSX.Element {
    if (!this.state.isLoaded || this.state.hasError) {
      return <div />;
    }
    return <SettingsPage
      displayMode={this.props.displayModel}
      linkedSocialAccounts={}
      displayName={}
      profileId={}
      email={}
      password={}
      isNewEvents={}
      isEventJoined={}
      isEventReminders={}
      isChanges={}
      isSomeoneJoined={}
      isFoodieAcceptedInvite={}
      isAnnouncement={}
      defaultCard={}
      otherPaymentCards={}
      paymentRecords={}
      addCardErrorMessage={}
      addCardErrorCode={}
      updateCardErrorMessage={}
      updateCardErrorCode={}
      onAddCard={}
      onUpdateCard={}
      onMakeDefaultCard={}
      onDeleteCard={}
      onNewEventsToggle={}
      onEventJoinedToggle={}
      onEventRemindersToggle={}
      onChangesToggle={}
      onSomeoneJoinedToggle={}
      onFoodieAcceptedInviteToggle={}
      onAnnouncementToggle={}
      onGoogleClick={}
      onFacebookClick={}
      onRemoveLinkedAccount={}
      onEditDisplayNameClick={}
      onEditEmailClick={}
      onDeactivateAccount={}
      onDeleteAccount={}
      onViewReceiptClick={}
    />;
  }

  public async componentDidMount(): Promise<void> {
    try {
      await this.props.model.load();
      this.setState({ isLoaded: true });
    } catch {
      this.setState({ isLoaded: true, hasError: true });
    }
  }
}
