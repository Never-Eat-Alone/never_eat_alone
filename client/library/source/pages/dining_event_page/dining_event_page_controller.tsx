import * as React from 'react';
import { DisplayMode } from '../../definitions';
import { DiningEventPage } from './dining_event_page';
import { DiningEventPageModel } from './dining_event_page_model';

interface Properties {
  /** The display mode. */
  displayMode: DisplayMode;
  model: DiningEventPageModel;
  
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
          eventColor={this.props.model.getEventColor()}
          eventFee={this.props.model.getEventFee()}
          coverImageSrc={this.props.model.getCoverImageSrc()}
          title={this.props.model.getTitle()}
          restaurant={this.props.model.getRestaurant()}
          dressCode={this.props.model.getDressCode()}
          seating={this.props.model.getSeating()}
          location={this.props.model.getLocation()}
          reservationName={this.props.model.getReservationName()}
          startTime={this.props.model.getStartTime()}
          endTime={this.props.model.getEndTime()}
          attendeeList={this.props.model.getAttendeeList()}
          totalCapacity={this.props.model.getTotalCapacity()}
          description={this.props.model.getDescription()}
          isGoing={this.props.model.getIsGoing()}
          isLoggedIn={this.props.model.getIsLoggedIn()}
          isRSVPOpen={this.props.model.getIsRSVPOpen()}
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
