import * as React from 'react';
import { AlbumSummary, ExploreEventsSummary, Hero, PartnerWithUsSummary,
  UserUpcomingEventsSummary } from '../../components';
import { DisplayMode, EventCardSummary, EventTag, SocialMediaImage, User
} from '../../definitions';

interface Properties {
  /** The current user. */
  account: User;

  /** The display mode. */
  displayMode: DisplayMode;

  /** The page error code. */
  errorCode: HomePage.ErrorCode;

  /** List of NEA images on social media. */
  imageList: SocialMediaImage[];

  /** List of all upcoming events that user is not attending. */
  upcomingEventList: EventCardSummary[];

  /** List of all past events. */
  pastEventList: EventCardSummary[];

  /** The list of Event Tags that user has attended in the current month. */
  userEventTagList: EventTag[];

  /** List of user's upcoming events. */
  userFutureEventList: EventCardSummary[];

  /** Total number of events happening this month. */
  userTotalEventsThisMonth: number;

  /** Indicates the join button is clicked. */
  onJoinButton: () => void;

  /** Indicates the Partner with us button is clicked. */
  onPartnerWithUsButton: () => void;
}

/** Displays the HomePage. */
export class HomePage extends React.Component<Properties> {
  public render(): JSX.Element {
    if (this.props.errorCode !== HomePage.ErrorCode.NONE) {
      return <div />;
    }
    const userUpcomingEventsSection = (() => {
      if (!this.props.account || this.props.account.id === -1) {
        return null;
      }
      return (
        <UserUpcomingEventsSummary
          displayMode={this.props.displayMode}
          upcomingEventList={this.props.userFutureEventList}
        />);
    })();
    const partnershipSection = (() => {
      if (!this.props.account || this.props.account.id === -1) {
        return <PartnerWithUsSummary
          displayMode={this.props.displayMode}
          onPartnerWithUsButton={this.props.onPartnerWithUsButton}
        />;
      }
      return null;
    })();
    return (
      <div style={CONTAINER_STYLE} >
        <Hero
          account={this.props.account}
          displayMode={this.props.displayMode}
          onJoinButton={this.props.onJoinButton}
          userEventTagList={this.props.userEventTagList}
          userTotalEventsThisMonth={this.props.userTotalEventsThisMonth}
        />
        {userUpcomingEventsSection}
        <ExploreEventsSummary
          displayMode={this.props.displayMode}
          title='Explore Upcoming Events'
          eventList={this.props.upcomingEventList}
          isLoggedIn={this.props.account?.id !== -1}
        />
         <ExploreEventsSummary
          displayMode={this.props.displayMode}
          title='Past Events'
          eventList={this.props.pastEventList}
          isLoggedIn={this.props.account?.id !== -1}
        />
        <AlbumSummary
          displayMode={this.props.displayMode}
          imageList={this.props.imageList}
        />
        {partnershipSection}
      </div>);
  }
}

/** HomePage Error Codes. */
export namespace HomePage {
  export enum ErrorCode {
    NONE,
    NO_CONNECTION
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%'
};
