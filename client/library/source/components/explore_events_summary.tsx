import * as React from 'react';
import * as tinyColor from 'tinycolor2';
import { DisplayMode, EventCardSummary } from '../definitions';
import { DiningEventCard } from './dining_event_card';

interface Properties {

  /** The display mode. */
  displayMode: DisplayMode;

  /** The event summaries. */
  events: EventCardSummary[];

  isLoggedIn: boolean;
}

interface State {
  isShowAllClicked: boolean;
}

/** Displays the ExploreEventsSummary section on the home page. */
export class ExploreEventsSummary extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isShowAllClicked: false
    };
    this._initialNumberOfDisplayedCards = 8;
  }

  public render(): JSX.Element {
    const contentContainerStyle = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return DESKTOP_CONTENT_CONTAINER_STYLE;
      }
      if (this.props.displayMode === DisplayMode.TABLET) {
        return TABLET_CONTENT_CONTAINER_STYLE;
      }
      return MOBILE_CONTENT_CONTAINER_STYLE;
    })();
    const cards = (() => {
      if (!this.props.events || this.props.events.length === 0) {
        return null;
      }
      const temp = [];
      if (!this.state.isShowAllClicked) {
        for (let i = 0; i < Math.min(this.props.events.length,
            this._initialNumberOfDisplayedCards); ++i) {
          const event = this.props.events[i];
          temp.push(
            <DiningEventCard
              key={i}
              id={event.eventId}
              displayMode={this.props.displayMode}
              imageSrc={event.imageSrc}
              title={event.eventTitle}
              restaurantName={event.restaurantName}
              priceRange={event.restaurantPriceRange}
              startTime={event.eventStartTime}
              endTime={event.eventEndTime}
              cuisines={event.cuisines}
              numberOfAttendees={event.numberOfAttendees}
              numberOfSeats={event.numberOfSeats}
              isAttending={event.isAttending}
              isLoggedIn={this.props.isLoggedIn}
              color={tinyColor(event.eventColor).toHexString()}
            />);
        }
      } else {
        for (let i = 0; i < this.props.events.length; ++i) {
          const event = this.props.events[i];
          temp.push(
            <DiningEventCard
              key={i}
              id={event.eventId}
              displayMode={this.props.displayMode}
              imageSrc={event.imageSrc}
              title={event.eventTitle}
              restaurantName={event.restaurantName}
              priceRange={event.restaurantPriceRange}
              startTime={event.eventStartTime}
              endTime={event.eventEndTime}
              cuisines={event.cuisines}
              numberOfAttendees={event.numberOfAttendees}
              numberOfSeats={event.numberOfSeats}
              isAttending={event.isAttending}
              isLoggedIn={this.props.isLoggedIn}
              color={tinyColor(event.eventColor).toHexString()}
            />);
        }
      }
      return temp;
    })();
    const showAllButton = (!this.state.isShowAllClicked && (
      <button onClick={this.handleShowAllClick} >
        <div>Show All Events({this.props.events.length})</div>
        <div style={ICON_CONTAINER_STYLE} >
          <img
            style={ICON_STYLE}
            src='resources/explore_events/icons/arrow_down.svg'
            alt='Down Arrow Icon'
          />
        </div>
      </button>) || null);
    return (
      <div style={CONTAINER_STYLE} >
        <div style={{...CONTENT_CONTAINER_STYLE, ...contentContainerStyle}} >
          <div style={TITLE_STYLE} >
            Explore Events
          </div>
          <div style={CARD_CONTAINER_STYLE} >
            {cards}
          </div>
          {showAllButton}
        </div>
      </div>);
  }

  private handleShowAllClick = (event: React.MouseEvent) => {
    this.setState({ isShowAllClicked: true });
  }

  private _initialNumberOfDisplayedCards: number;
}

const CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  overflow: 'hidden'
};

const CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center'
};

const DESKTOP_CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  width :'1027px',
  marginTop: '70px'
};

const TABLET_CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  width :'702px',
  marginTop: '50px'
};

const MOBILE_CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  width :'335px',
  marginTop: '40px'
};

const TITLE_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '23px',
  lineHeight: '34px',
  height: '24px',
  textTransform: 'capitalize',
  color: '#000000',
  overflow: 'hidden'
};

const CARD_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'space-between',
  marginTop: '20px',
  width: '100%'
};

const ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '4px',
  height: '8px'
};

const ICON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minWidth: '4px',
  minHeight: '8px',
  backgroundColor: 'transparent',
  objectFit: 'cover'
};
