import * as React from 'react';
import { DisplayMode } from '../../definitions';
import { DiningEventPage } from './dining_event_page';
import { DiningEventPageModel } from './dining_event_page_model';

interface Properties {
  /** The display mode. */
  displayMode: DisplayMode;
  model: DiningEventPageModel;

  isLoggedIn: boolean;
  
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
    if (this.state.isLoaded && this.state.errorCode ===
        DiningEventPage.ErrorCode.NONE) {
      return (
        <DiningEventPage
          displayMode={this.props.displayMode}
          eventColor={this.props.model.eventColor}
          eventFee={this.props.model.eventFee}
          coverImageSrc={this.props.model.coverImageSrc}
          title={this.props.model.title}
          restaurant={this.props.model.restaurant}
          dressCode={this.props.model.dressCode}
          seating={this.props.model.seating}
          location={this.props.model.location}
          reservationName={this.props.model.reservationName}
          startTime={this.props.model.startTime}
          endTime={this.props.model.endTime}
          attendeeList={this.props.model.attendeeList}
          totalCapacity={this.props.model.totalCapacity}
          description={this.props.model.description}
          isGoing={this.props.model.isGoing}
          isLoggedIn={this.props.isLoggedIn}
          isRSVPOpen={this.props.model.isRSVPOpen}
          onJoinEvent={this.props.onJoinEvent}
          onRemoveSeat={this.props.onRemoveSeat}
        />);
    }
    return <div />;
  }

  public async componentDidMount(): Promise<void> {
    try {
      await this.props.model.load();
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
