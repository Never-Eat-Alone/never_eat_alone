import * as React from 'react';
import * as tinyColor from 'tinycolor2';
import { DisplayMode, EventCardSummary } from '../definitions';
import { DiningEventCard } from './dining_event_card';

interface Properties {

  /** The display mode. */
  displayMode: DisplayMode;

  /** The title displayed at the top of this section. */
  title: string;

  /** The event summaries. */
  eventList: EventCardSummary[];

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
    const { containerStyle, contentContainerStyle, cardsContainerStyle,
        noEventsContainerStyle, noEventsContentContainerStyle } = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          containerStyle: DESKTOP_CONTAINER_STYLE,
          contentContainerStyle: DESKTOP_CONTENT_CONTAINER_STYLE,
          cardsContainerStyle: DESKTOP_CARD_CONTAINER_STYLE,
          noEventsContainerStyle: DESKTOP_NO_EVENTS_CONTAINER_STYLE,
          noEventsContentContainerStyle: DESKTOP_NO_EVENTS_CONTENT_CONTAINER_STYLE
        };
      }
      if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerStyle: TABLET_CONTAINER_STYLE,
          contentContainerStyle: TABLET_CONTENT_CONTAINER_STYLE,
          cardsContainerStyle: TABLET_CARD_CONTAINER_STYLE,
          noEventsContainerStyle: TABLET_NO_EVENTS_CONTAINER_STYLE,
          noEventsContentContainerStyle: TABLET_NO_EVENTS_CONTENT_CONTAINER_STYLE
        };
      }
      return {
        containerStyle: MOBILE_CONTAINER_STYLE,
        contentContainerStyle: MOBILE_CONTENT_CONTAINER_STYLE,
        cardsContainerStyle: MOBILE_CARD_CONTAINER_STYLE,
        noEventsContainerStyle: MOBILE_NO_EVENTS_CONTAINER_STYLE,
        noEventsContentContainerStyle: MOBILE_NO_EVENTS_CONTENT_CONTAINER_STYLE
      };
    })();
    const cards = (() => {
      if (!this.props.eventList || this.props.eventList.length === 0) {
        return (
          <div
              style={{...NO_EVENTS_CONTAINER_STYLE, ...noEventsContainerStyle}}
          >
            <div
                style={{...NO_EVENTS_CONTENT_CONTAINER_STYLE,
                  ...noEventsContentContainerStyle}}
            >
              <div style={DOG_IMAGE_CONTAINER_STYLE} >
                <img
                  style={DOG_IMAGE_STYLE}
                  src='resources/explore_events/icons/dog.svg'
                  alt='Dog Icon'
                />
              </div>
              <div style={TEXT_CONTAINER_STYLE} >
                <div style={HEADING_STYLE} >
                  Oops! The dog ate all our events...
                </div>
                <div style={TEXT_STYLE} >
                  You’ve either joined everything, or we’re fresh out of{" "}
                  events. Check back in a day or two to see what’s new!
                </div>
              </div>
            </div>
          </div>);
      }
      const temp = [];
      if (!this.state.isShowAllClicked) {
        for (let i = 0; i < Math.min(this.props.eventList.length,
            this._initialNumberOfDisplayedCards); ++i) {
          const event = this.props.eventList[i];
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
        for (let i = 0; i < this.props.eventList.length; ++i) {
          const event = this.props.eventList[i];
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
      if (!this.props.eventList || this.props.eventList.length === 0) {
        return null;
      }
      if (!this.state.isShowAllClicked) {
        return (
          <button style={BUTTON_STYLE} onClick={this.handleShowAllClick} >
            <div style={BUTTON_TEXT_STYLE} >
              Show All Events ({this.props.eventList.length})
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
            {this.props.title}
          </div>
          <div style={{...CARDS_CONTAINER_STYLE, ...cardsContainerStyle}} >
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
  width: '1027px',
  marginTop: '70px'
};

const TABLET_CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  width: '702px',
  marginTop: '50px'
};

const MOBILE_CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  width: '335px',
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

const CARDS_CONTAINER_STYLE: React.CSSProperties = {
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

const NO_EVENTS_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '40px',
  width: '100%',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  borderRadius: '4px'
};

const DESKTOP_NO_EVENTS_CONTAINER_STYLE: React.CSSProperties = {
  padding: '50px 40px'
};

const TABLET_NO_EVENTS_CONTAINER_STYLE: React.CSSProperties = {
  padding: '50px 40px'
};

const MOBILE_NO_EVENTS_CONTAINER_STYLE: React.CSSProperties = {
  padding: '40px 20px'
};

const NO_EVENTS_CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '25px'
};

const DESKTOP_NO_EVENTS_CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  width: '839px',
  height: '80px'
};

const TABLET_NO_EVENTS_CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  width: '622px',
  height: '84px'
};

const MOBILE_NO_EVENTS_CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '295px',
  height: '209px'
};

const DOG_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '110px',
  height: '80px'
};

const DOG_IMAGE_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minWidth: '110px',
  minHeight: '80px',
  objectFit: 'cover'
};

const TEXT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'space-between',
  width: '100%',
  gap: '10px'
};

const HEADING_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '23px',
  lineHeight: '34px',
  height: '34px',
  textAlign: 'center',
  textTransform: 'capitalize',
  color: '#000000'
};

const TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '20px',
  textAlign: 'center',
  color: '#000000'
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
