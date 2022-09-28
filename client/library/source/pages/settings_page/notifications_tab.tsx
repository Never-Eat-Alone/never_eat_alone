import * as React from 'react';
import { ToggleButton } from '../../components';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** Whether the new events notification is checked or not. */
  isNewEvents: boolean;

  /** Whether the event joined notification is checked or not. */
  isEventJoined: boolean;

  /** Whether the event reminders notification is checked or not. */
  isEventReminders: boolean;

  /** Whether the changes to attending events notification is checked or not. */
  isChanges: boolean;

  /** Whether the someone joins event notification is checked or not. */
  isSomeoneJoined: boolean;

  /** Whether the foodie accepts invite notification is checked or not. */
  isFoodieAcceptedInvite: boolean;

  /** Whether the announcement notification is checked or not. */
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
        <ToggleRow
          key='New Events'
          checked={this.props.isNewEvents}
          title='New Events'
          description='Get an email when new events are posted on NEA.'
          onToggleClick={this.props.onNewEventsToggle}
        />
        <ToggleRow
          key='Event Joined'
          checked={this.props.isEventJoined}
          title='Event Joined'
          description='Get a confirmation email when you join an event.'
          onToggleClick={this.props.onEventJoinedToggle}
        />
        <ToggleRow
          key='Event reminders'
          checked={this.props.isEventReminders}
          title='Event reminders'
          description='Get notifications leading up to an event.'
          onToggleClick={this.props.onEventRemindersToggle}
        />
        <ToggleRow
          key='Changes to events you’re attending'
          checked={this.props.isChanges}
          title='Changes to events you’re attending'
          description='Be notified of any event detail changes, including 
            cancellations.'
          onToggleClick={this.props.onChangesToggle}
        />
        <ToggleRow
          key='Someone joins an event you’re attending'
          checked={this.props.isSomeoneJoined}
          title='Someone joins an event you’re attending'
          description="Be notified of when a new member joins an event you're 
            going to."
          onToggleClick={this.props.onSomeoneJoinedToggle}
        />
        <ToggleRow
          key='A foodie accepts your invite'
          checked={this.props.isFoodieAcceptedInvite}
          title='A foodie accepts your invite'
          description='Be notified when a friend you invited joins 
            NeverEatAlone.'
          onToggleClick={this.props.onFoodieAcceptedInviteToggle}
        />
        <ToggleRow
          key='Announcements'
          checked={this.props.isAnnouncement}
          title='Announcements'
          description='Get emails about NEA news and announcements.'
          onToggleClick={this.props.onAnnouncementToggle}
        />
      </React.Fragment>);
  }
}

interface ToggleRowProps {
  checked: boolean;
  title: string;
  description: string;
  onToggleClick: () => void;
}

function ToggleRow(props: ToggleRowProps) {
  return (
    <div style={TOGGLE_ROW_CONTAINER_STYLE} >
      <ToggleButton
        checked={props.checked}
        onClick={props.onToggleClick}
      />
      <div style={COLUMN_STYLE} >
        <h3 style={BOLD_TEXT_STYLE} >{props.title}</h3>
        <p style={P_STYLE} >{props.description}</p>
      </div>
    </div>);  
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
  margin: '0px 0px 2px 0px',
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
  minHeight: '38px',
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
  margin: '0px'
};

const P_STYLE: React.CSSProperties = {
  ...BOLD_TEXT_STYLE,
  fontWeight: 400,
  whiteSpace: 'pre-line'
};
