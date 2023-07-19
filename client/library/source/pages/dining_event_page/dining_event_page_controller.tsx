import * as React from 'react';
import { Attendee, DisplayMode, User, UserStatus } from '../../definitions';
import { DiningEventPage } from './dining_event_page';
import { DiningEventPageModel } from './dining_event_page_model';

interface Properties {
  /** The display mode. */
  displayMode: DisplayMode;
  model: DiningEventPageModel;
  account: User;
  eventId: number;
  profileImageSrc: string;

  /** Indicates the join event button is clicked. */
  onJoinEvent: () => void;

  /** Indicates the remove seat button is clicked. */
  onRemoveSeat: () => void;

  onLogIn: () => void;
}

interface State {
  isLoaded: boolean;
  errorCode: DiningEventPage.ErrorCode;
  attendeeList: Attendee[];
}

/** Implements the DiningEventPageController. */
export class DiningEventPageController extends React.Component<Properties,
    State> {
  public constructor(props: Properties) {
    super(props);
    this.state = {
      isLoaded: false,
      errorCode: DiningEventPage.ErrorCode.NONE,
      attendeeList: []
    };
  }

  public render(): JSX.Element {
    if (!this.state.isLoaded || this.state.errorCode !==
        DiningEventPage.ErrorCode.NONE) {
      return <div />;
    }
    const now = new Date();
    const isRSVPOpen = (this.props.model.diningEvent.rsvpOpenAt <= now &&
      this.props.model.diningEvent.rsvpCloseAt > now);
    const isGoing = !!this.state.attendeeList.find(attendee =>
      attendee.userId === this.props.account.id && attendee.status === 'GOING');
    return <DiningEventPage
      displayMode={this.props.displayMode}
      eventColor={this.props.model.diningEvent.eventColor}
      eventFee={this.props.model.diningEvent.eventFee}
      coverImageSrc={this.props.model.diningEvent.coverImageSrc}
      title={this.props.model.diningEvent.title}
      restaurant={this.props.model.diningEvent.restaurant}
      dressCode={this.props.model.diningEvent.dressCode}
      seating={this.props.model.diningEvent.seating}
      location={this.props.model.diningEvent.location}
      reservationName={this.props.model.diningEvent.reservationName}
      startTime={this.props.model.diningEvent.startAt}
      endTime={this.props.model.diningEvent.endAt}
      attendeeList={this.state.attendeeList}
      totalCapacity={this.props.model.diningEvent.totalCapacity}
      description={this.props.model.diningEvent.description}
      account={this.props.account}
      isRSVPOpen={isRSVPOpen}
      isGoing={isGoing}
      onJoinEvent={this.handleJoinEvent}
      onRemoveSeat={this.handleRemoveSeat}
    />;
  }

  public async componentDidMount(): Promise<void> {
    try {
      await this.props.model.load();
      this.setState({
        isLoaded: true,
        errorCode: DiningEventPage.ErrorCode.NONE,
        attendeeList: this.props.model.diningEvent.attendeeList
      });
    } catch {
      this.setState({
        isLoaded: true,
        errorCode: DiningEventPage.ErrorCode.NO_CONNECTION
      });
    }
  }

  private handleJoinEvent = async(): Promise<void> => {
    if (this.props.account.id === -1 || this.props.account.userStatus ===
        UserStatus.GUEST) {
      this.props.onLogIn();
    } else {
      try {
        await this.props.model.joinEvent(this.props.account.id,
          this.props.account.name, this.props.profileImageSrc);
        this.setState({
          attendeeList: this.props.model.diningEvent.attendeeList
        });
      } catch {
        this.setState({ errorCode: DiningEventPage.ErrorCode.NO_CONNECTION });
      }
    }
  }

  private handleRemoveSeat = async(): Promise<void> => {
    if (this.props.account.id === -1 || this.props.account.userStatus ===
        UserStatus.GUEST) {
      this.props.onLogIn();
    } else {
      try {
        await this.props.model.removeSeat(this.props.account.id,
          this.props.account.name, this.props.profileImageSrc);
        this.setState({
          attendeeList: this.props.model.diningEvent.attendeeList
        });
      } catch {
        this.setState({ errorCode: DiningEventPage.ErrorCode.NO_CONNECTION });
      }
    }
  }
}
