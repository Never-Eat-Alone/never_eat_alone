import * as React from 'react';
import { DisplayMode, User } from '../../definitions';
import { DiningEventPage } from './dining_event_page';
import { DiningEventPageModel } from './dining_event_page_model';

interface Properties {
  /** The display mode. */
  displayMode: DisplayMode;
  model: DiningEventPageModel;
  account: User;

  eventId: number;

  /** Indicates the remove seat button is clicked. */
  onRemoveSeat: () => void;

  /** Indicates the join event button is clicked. */
  onJoinEvent: () => void;
}

interface State {
  isLoaded: boolean;
  errorCode: DiningEventPage.ErrorCode;
}

/** Implements the DiningEventPageController. */
export class DiningEventPageController extends React.Component<Properties,
    State> {
  public constructor(props: Properties) {
    super(props);
    this.state = {
      isLoaded: false,
      errorCode: DiningEventPage.ErrorCode.NONE
    }
  }

  public render(): JSX.Element {
    if (!this.state.isLoaded || this.state.errorCode !==
        DiningEventPage.ErrorCode.NONE) {
      return <div />;
    }
    const isRSVPOpen = (this.props.model.diningEvent.rsvpOpenAt <= new Date() &&
      this.props.model.diningEvent.rsvpCloseAt < new Date());
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
      attendeeList={this.props.model.diningEvent.attendeeList}
      totalCapacity={this.props.model.diningEvent.totalCapacity}
      description={this.props.model.diningEvent.description}
      account={this.props.account}
      isRSVPOpen={isRSVPOpen}
      isGoing={this.props.model.isGoing}
      onJoinEvent={this.props.onJoinEvent}
      onRemoveSeat={this.props.onRemoveSeat}
    />;
  }

  public async componentDidMount(): Promise<void> {
    try {
      await this.props.model.load(this.props.eventId);
      this.setState({
        isLoaded: true,
        errorCode: DiningEventPage.ErrorCode.NONE
      });
    } catch {
      this.setState({
        isLoaded: true,
        errorCode: DiningEventPage.ErrorCode.NO_CONNECTION
      });
    }
  }
}
