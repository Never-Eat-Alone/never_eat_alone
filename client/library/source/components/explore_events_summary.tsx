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
    this._initialNumberOfDisplayedCards = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return 8;
      }
      if (this.props.displayMode === DisplayMode.TABLET) {
        return 6;
      }
      return 5;
    })();
  }

  public render(): JSX.Element {
    this._initialNumberOfDisplayedCards = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return 8;
      }
      if (this.props.displayMode === DisplayMode.TABLET) {
        return 6;
      }
      return 5;
    })();
    const { containerStyle, contentContainerStyle, cardContainerStyle } = (
        () => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          containerStyle: DESKTOP_CONTAINER_STYLE,
          contentContainerStyle: DESKTOP_CONTENT_CONTAINER_STYLE,
          cardContainerStyle: DESKTOP_CARD_CONTAINER_STYLE
        };
      }
      if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerStyle: TABLET_CONTAINER_STYLE,
          contentContainerStyle: TABLET_CONTENT_CONTAINER_STYLE,
          cardContainerStyle: TABLET_CARD_CONTAINER_STYLE
        };
      }
      return {
        containerStyle: MOBILE_CONTAINER_STYLE,
        contentContainerStyle: MOBILE_CONTENT_CONTAINER_STYLE,
        cardContainerStyle: MOBILE_CARD_CONTAINER_STYLE
      };
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
    const button = (() => {
      if (!this.state.isShowAllClicked) {
        return (
          <button style={BUTTON_STYLE} onClick={this.handleShowAllClick} >
            <div style={BUTTON_TEXT_STYLE} >
              Show All Events ({this.props.events.length})
            </div>
            <div style={ICON_CONTAINER_STYLE} >
              <img
                style={ICON_STYLE}
                src='resources/explore_events/icons/arrow_down.svg'
                alt='Down Arrow Icon'
              />
            </div>
          </button>);
      }
      return (
        <button style={BUTTON_STYLE} onClick={this.handleShowAllClick} >
          <div style={BUTTON_TEXT_STYLE} >Show Less</div>
          <div style={{...ICON_CONTAINER_STYLE, ...SHOW_LESS_STYLE}} >
            <img
              style={ICON_STYLE}
              src='resources/explore_events/icons/arrow_up.svg'
              alt='Up Arrow Icon'
            />
          </div>
        </button>);
    })();
    return (
      <div style={{...CONTAINER_STYLE, ...containerStyle}} >
        <div style={{...CONTENT_CONTAINER_STYLE, ...contentContainerStyle}} >
          <div style={TITLE_STYLE} >
            Explore Events
          </div>
          <div style={{...CARD_CONTAINER_STYLE, ...cardContainerStyle}} >
            {cards}
          </div>
          {button}
        </div>
      </div>);
  }

  private handleShowAllClick = (event: React.MouseEvent) => {
    this.setState({ isShowAllClicked: !this.state.isShowAllClicked });
  }

  private _initialNumberOfDisplayedCards: number;
}

const CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  backgroundImage: 'url(resources/explore_events/background.jpg)',
  backgroundSize: 'cover',
  backgroundColor: 'transparent',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left center'
};

const DESKTOP_CONTAINER_STYLE: React.CSSProperties = {
  paddingBottom: '70px'
};

const TABLET_CONTAINER_STYLE: React.CSSProperties = {
  paddingBottom: '50px'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  paddingBottom: '40px'
};

const CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start'
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
  height: '34px',
  textTransform: 'capitalize',
  color: '#000000',
  marginBottom: '20px'
};

const CARD_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'space-between',
  flexWrap: 'wrap',
  width: '100%'
};

const DESKTOP_CARD_CONTAINER_STYLE: React.CSSProperties = {
  gap: '20px 17px'
};

const TABLET_CARD_CONTAINER_STYLE: React.CSSProperties = {
  gap: '20px 30px'
};

const MOBILE_CARD_CONTAINER_STYLE: React.CSSProperties = {
  gap: '20px'
};

const BUTTON_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  height: '18px',
  backgroundColor: 'transparent',
  outline: 'none',
  border: 'none',
  margin: '40px 0px 0px 0px',
  cursor: 'pointer',
  width: '100%',
  padding: '0px'
};

const BUTTON_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '18px',
  textAlign: 'center',
  color: '#000000'
};

const ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '4px',
  height: '8px',
  marginLeft: '7px'
};

const SHOW_LESS_STYLE: React.CSSProperties = {
  marginTop: '5px'
};

const ICON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minWidth: '4px',
  minHeight: '8px',
  backgroundColor: 'transparent',
  objectFit: 'cover'
};
