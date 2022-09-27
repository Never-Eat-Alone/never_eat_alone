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
        <h1 style={PAGE_HEADING_STYLE} >Notifications</h1>
        <h2 style={SUB_HEADING_STYLE} >
          Change your email notification settings
        </h2>
        <div style={TOGGLE_ROW_CONTAINER_STYLE} >
          
          <div style={COLUMN_STYLE} >
            <h3 style={BOLD_TEXT_STYLE} >New Events</h3>
            <p style={P_STYLE} >
              Get an email when new events are posted on NEA.
            </p>
          </div>
        </div>
      </React.Fragment>);
  }
}

const PAGE_HEADING_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '23px',
  lineHeight: '34px',
  height: '34px',
  textTransform: 'capitalize',
  color: '#000000',
  margin: '0px 0px 30px 0px',
  padding: '0px'
};

const SUB_HEADING_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  height: '18px',
  color: '#000000',
  padding: '0px',
  margin: '0px'
};

const TOGGLE_ROW_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '38px',
  width: '100%',
  marginTop: '20px',
  gap: '30px'
};

const COLUMN_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  height: '100%',
  width: '100%',
  gap: '2px'
};

const BOLD_TEXT_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  padding: '0px',
  margin: '0px',
  width: '100%'
};

const P_STYLE: React.CSSProperties = {
  ...BOLD_TEXT_STYLE,
  fontWeight: 400
};
