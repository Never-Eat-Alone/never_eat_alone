import * as React from 'react';
import * as tinyColor from 'tinycolor2';
import { DiningEventCard, ShowAllButton, ShowLessButton } from
  '../../components';
import { DisplayMode, EventCardSummary } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** The list of the event card summaries for this section. */
  eventList: EventCardSummary[];

  /** Whether the user is logged in or not. */
  isLoggedIn: boolean;
}

interface State {
  lastDisplayedCardIndex: number;
}

/** Displays the upcoming events section on the user profile page. */
export class ProfileUpcomingEvents extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      lastDisplayedCardIndex: 5
    };
  }

  public render(): JSX.Element {
    if (this.props.eventList?.length === 0) {
      return (
        <div style={CONTAINER_STYLE} >
          <h1 style={TITLE_STYLE} >
            Upcoming Events (0)
          </h1>
          <div style={NO_EVENT_CONTAINER_STYLE} >
            <div style={NO_EVENT_IMAGE_CONTAINER_STYLE} >
              <img
                style={NO_EVENT_IMAGE_STYLE}
                src='resources/icons/no_events.svg'
                alt='No Events Icon'
              />
            </div>
            <p style={NO_EVENT_BOLD_TEXT_STYLE} >Nothing here yet</p>
            <p style={NO_EVENT_DESCRIPTION_STYLE} >
              You haven’t attended any events yet, why not check out some?
            </p>
          </div>
        </div>);
    }
    const cards = [];
    const numberOfDisplayedCards = Math.min(
      this.state.lastDisplayedCardIndex + 1, this.props.eventList.length);
    for (const card of this.props.eventList.slice(0, numberOfDisplayedCards)) {
      cards.push(
        <DiningEventCard
          key={card.eventId}
          displayMode={this.props.displayMode}
          id={card.eventId}
          imageSrc={card.imageSrc}
          title={card.eventTitle}
          startTime={card.eventStartTime}
          endTime={card.eventEndTime}
          numberOfAttendees={card.numberOfAttendees}
          numberOfSeats={card.numberOfSeats}
          restaurantName={card.restaurantName}
          priceRange={card.restaurantPriceRange}
          cuisines={card.cuisines}
          isAttending={card.isAttending}
          isLoggedIn={this.props.isLoggedIn}
          color={tinyColor(card.eventColor).toHexString()}
        />);
    }
    const showButton = (() => {
      if (this.props.eventList.length <= 6) {
        return null;
      }
      if (numberOfDisplayedCards !== this.props.eventList.length) {
        return (
          <ShowAllButton
            style={SHOW_BUTTON_STYLE}
            label={`Show All events (${this.props.eventList.length})`}
            onClick={this.handleShowAllClick}
          />);
      }
      return (
        <ShowLessButton
          style={SHOW_BUTTON_STYLE}
          onClick={this.handleShowLessClick}
        />);
    })();
    return (
      <div style={CONTAINER_STYLE} >
        <h1 style={TITLE_STYLE} >
          Upcoming Events ({this.props.eventList.length.toString()})
        </h1>
        <div style={EVENT_CARDS_CONTAINER_STYLE} >{cards}</div>
        {showButton}
      </div>);
  }

  private handleShowAllClick = () => {
    this.setState({ lastDisplayedCardIndex: this.props.eventList.length - 1 });
  }

  private handleShowLessClick = () => {
    this.setState({ lastDisplayedCardIndex: 5 });
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  backgroundColor: 'transparent'
};

const TITLE_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '23px',
  lineHeight: '34px',
  textTransform: 'capitalize',
  color: '#000000',
  padding: '0px',
  margin: '0px 0px 40px 0px'
};

const NO_EVENT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '10px',
  width: '100%'
};

const NO_EVENT_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '200px',
  height: '150px',
  backgroundColor: 'transparent',
  marginTop: '30px'
};

const NO_EVENT_IMAGE_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minWidth: '200px',
  objectFit: 'cover'
};

const EVENT_CARDS_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  gap: '18px',
  width: '100%'
};

const SHOW_BUTTON_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  marginTop: '40px'
};
