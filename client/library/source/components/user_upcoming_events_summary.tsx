import * as React from 'react';
import * as tinyColor from 'tinycolor2';
import { DisplayMode, EventCardSummary } from '../definitions';
import { DiningEventCard } from './dining_event_card';
import { ShowAllButton } from './show_all_button';
import { ShowLessButton } from './show_less_button';

interface Properties {
  displayMode: DisplayMode;

  /** List of event cards related to user's upcoming events. */
  upcomingEventList: EventCardSummary[];

  /** Indicates the style. */
  style?: React.CSSProperties;
}

interface State {
  isShowAllClicked: boolean;
}

/** Displays the User's upcoming events summary. */
export class UserUpcomingEventsSummary extends React.Component<Properties,
    State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isShowAllClicked: false
    };
    this._initialNumberOfDisplayedCards = this.getNumberOfCardsDisplayed();
  }

  public render(): JSX.Element {
    this._initialNumberOfDisplayedCards = this.getNumberOfCardsDisplayed();
    const { containerStyle, contentContainerStyle, cardsContainerStyle } = (
      () => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          containerStyle: DESKTOP_CONTAINER_STYLE,
          contentContainerStyle: DESKTOP_CONTENT_CONTAINER_STYLE,
          cardsContainerStyle: DESKTOP_CARD_CONTAINER_STYLE
        };
      }
      if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerStyle: TABLET_CONTAINER_STYLE,
          contentContainerStyle: TABLET_CONTENT_CONTAINER_STYLE,
          cardsContainerStyle: TABLET_CARD_CONTAINER_STYLE
        };
      }
      return {
        containerStyle: MOBILE_CONTAINER_STYLE,
        contentContainerStyle: MOBILE_CONTENT_CONTAINER_STYLE,
        cardsContainerStyle: MOBILE_CARD_CONTAINER_STYLE
      };
    })();
    const cards = (() => {
      if (!this.props.upcomingEventList ||
          this.props.upcomingEventList.length === 0) {
        return null;
      }
      const temp = [];
      if (!this.state.isShowAllClicked) {
        for (let i = 0; i < Math.min(this.props.upcomingEventList.length,
            this._initialNumberOfDisplayedCards); ++i) {
          const event = this.props.upcomingEventList[i];
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
              isLoggedIn={true}
              color={tinyColor(event.eventColor).toHexString()}
            />);
        }
      } else {
        for (let i = 0; i < this.props.upcomingEventList.length; ++i) {
          const event = this.props.upcomingEventList[i];
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
              isLoggedIn={true}
              color={tinyColor(event.eventColor).toHexString()}
            />);
        }
      }
      return temp;
    })();
    const button = (() => {
      if (!this.state.isShowAllClicked) {
        return (
          <ShowAllButton
            label={`Show All Events (${this.props.upcomingEventList.length})`}
            onClick={this.handleShowAllClick}
          />);
      }
      return <ShowLessButton onClick={this.handleShowAllClick} />;
    })();
    return (
      <div style={{...CONTAINER_STYLE, ...containerStyle}} >
        <div style={{...CONTENT_CONTAINER_STYLE, ...contentContainerStyle}} >
          <div style={TITLE_STYLE} >
            Your Upcoming Events
          </div>
          <div style={{...CARDS_CONTAINER_STYLE, ...cardsContainerStyle}} >
            {cards}
          </div>
          <div style={SHOW_BUTTON_CONTAINER_STYLE} >{button}</div>
        </div>
      </div>);
  }

  private handleShowAllClick = (event: React.MouseEvent) => {
    this.setState({ isShowAllClicked: !this.state.isShowAllClicked });
  }

  private getNumberOfCardsDisplayed = () => {
    if (this.props.displayMode === DisplayMode.DESKTOP) {
      return 4;
    }
    if (this.props.displayMode === DisplayMode.TABLET) {
      return 3;
    }
    return 2;
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
  backgroundColor: '#FFFFFF'
};

const DESKTOP_CONTAINER_STYLE: React.CSSProperties = {
  paddingBottom: '60px'
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
  width: '1032px',
  marginTop: '40px'
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

const SHOW_BUTTON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  marginTop: '40px'
};
