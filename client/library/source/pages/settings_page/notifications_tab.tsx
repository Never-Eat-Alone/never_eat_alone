import * as React from 'react';
import { InputField, SecondaryTextButton, SecondaryTextLinkButton
} from '../../components';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;

  /**  */
  isNewEvents: boolean;
  isEventJoined: boolean;
  isEventReminders: boolean;
  isChanges: boolean;
  isSomeoneJoined: boolean;
  isFoodieAcceptedInvite: boolean;
  isAnnouncement: boolean;

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
}

/** Displays the notifications tab. */
export class NotificationsTab extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <React.Fragment>

      </React.Fragment>);
  }
}
