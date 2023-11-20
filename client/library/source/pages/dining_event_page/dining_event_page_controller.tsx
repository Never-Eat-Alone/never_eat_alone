import * as React from 'react';
import { Modal } from '../../components';
import { DisplayMode, User } from '../../definitions';
import { DiningEventCheckoutModalController } from
  '../../modals/dining_event_checkout_modal';
import { DiningEventPage } from './dining_event_page';
import { DiningEventPageModel } from './dining_event_page_model';

interface Properties {
  /** The display mode. */
  displayMode: DisplayMode;
  model: DiningEventPageModel;
  account: User;
  eventId: number;
  profileImageSrc: string;

  showLoginModal: () => void;

  /** Indicates the join event was successful. */
  onJoinEventSuccess: () => Promise<void>;

  /** Indicates the remove seat was successful. */
  onRemoveSeatSuccess: () => void;
}

interface State {
  isLoaded: boolean;
  errorCode: DiningEventPage.ErrorCode;
  isCheckoutModal: boolean;
}

/** Implements the DiningEventPageController. */
export class DiningEventPageController extends React.Component<Properties,
    State> {
  public constructor(props: Properties) {
    super(props);
    this.state = {
      isLoaded: false,
      errorCode: DiningEventPage.ErrorCode.NONE,
      isCheckoutModal: false
    };
  }

  public render(): JSX.Element {
    if (!this.state.isLoaded || this.state.errorCode !==
        DiningEventPage.ErrorCode.NONE) {
      return <div />;
    }
    console.log('this.state.isCheckoutModal', this.state.isCheckoutModal);
    const checkoutModal = (this.state.isCheckoutModal &&
      <Modal>
        <DiningEventCheckoutModalController
          account={this.props.account}
          displayMode={this.props.displayMode}
          model={this.props.model.getCheckoutModel()}
          profileImageSrc={this.props.profileImageSrc}
          onClose={this.handleCloseCheckoutModal}
          showLoginModal={this.props.showLoginModal}
          onJoinEventSuccess={this.handleJoinEventSuccess}
        />
      </Modal> || null);
    const now = new Date();
    const isRSVPOpen = (this.props.model.diningEvent.rsvpOpenAt <= now &&
      this.props.model.diningEvent.rsvpCloseAt > now);
    const isGoing = this.props.model.diningEvent.attendeeList.some(attendee =>
      attendee.userId === this.props.account.id && attendee.status === 'GOING');
    return (
      <>
        {checkoutModal}
        <DiningEventPage
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
          isGoing={isGoing}
          onJoinEvent={this.handleJoinEvent}
          onRemoveSeat={this.handleRemoveSeat}
        />
      </>);
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

  private handleJoinEvent = async (): Promise<void> => {
    if (this.props.account?.id === -1) {
      this.props.showLoginModal();
      return;
    }
    this.setState({ isCheckoutModal: true });
  }

  private handleCloseCheckoutModal = () => {
    this.setState({ isCheckoutModal: false });
  }

  private handleJoinEventSuccess = async () => {
    await this.props.onJoinEventSuccess();
    this.setState({ isCheckoutModal: false });
  }

  private handleRemoveSeat = async (): Promise<void> => {
    try {
      await this.props.model.removeSeat(this.props.account.id,
        this.props.account.name, this.props.profileImageSrc);
      this.props.onRemoveSeatSuccess();
    } catch (error) {
      this.setState({ errorCode: DiningEventPage.ErrorCode.NO_CONNECTION });
    }
  }
}
