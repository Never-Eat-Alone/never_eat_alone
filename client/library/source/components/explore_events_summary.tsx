import * as React from 'react';
import * as tinyColor from 'tinycolor2';
import { DisplayMode, EventCardSummary } from '../definitions';
import { DiningEventCard } from './dining_event_card';

interface Properties {

  /** The display mode. */
  displayMode: DisplayMode;

  /** The event summaries. */
  events: EventCardSummary[];

  /** The max number of displayed card in one page. */
  maxDisplayedCard: number;

  isLoggedIn: boolean;

  onShowAllClick: () => void;
}

/** Displays the ExploreEventsSummary section on the home page. */
export class ExploreEventsSummary extends React.Component<Properties> {
  public render(): JSX.Element {
    const { containerSize, cardMarginStyle } = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          containerSize: DESKTOP_CONTAINER_STYLE,
          cardMarginStyle: DESKTOP_CARD_MARGIN_STYLE
        };
      }
      return {
        containerSize: TABLET_CONTAINER_STYLE,
        cardMarginStyle: TABLET_CARD_MARGIN_STYLE
      };
    })();
    const cards = [];
    for(let i = 0; i < this.props.events.length; ++i) {
      const marginLeft = (() => {
        if (this.props.displayMode === DisplayMode.TABLET) {
          if (i === 0 || i === this.props.maxDisplayedCard) {
            return TABLET_MARGIN_LEFT_STYLE;
          }
        }
        return MARGIN_LEFT_DEFAULT_STYLE;
      })();
      const event = this.props.events[i];
      cards.push(
        <DiningEventCard
          key={i}
          style={{...cardMarginStyle, ...marginLeft}}
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
    return (
      <div style={{...CONTAINER_STYLE, ...containerSize}} >
        <div style={ROW_STYLE} >
          <div style={TEXT_CONTAINER} >
            <div style={TITLE_STYLE} >
              Explore Events
            </div>
          </div>
        </div>
        <div style={CARD_CONTAINER_STYLE} >
          {(this.props.events && this.props.events.length > 0 && cards) || null}
        </div>
      </div>);
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  overflow: 'hidden',
  padding: '10px',
  margin: '-10px'
};

const ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  width: '100%',
  height: '63px',
  marginBottom: '20px'
};

const TEXT_CONTAINER: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  height: '100%'
};

const TITLE_STYLE: React.CSSProperties = {
  minWidth: '120px',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '23px',
  lineHeight: '34px',
  textTransform: 'capitalize',
  color: '#000000',
  marginBottom: '5px',
  marginTop: '6px'
};

const DESKTOP_CONTAINER_STYLE: React.CSSProperties = {
  width: '1034px'
};

const TABLET_CONTAINER_STYLE: React.CSSProperties = {
  width: '702px'
};

const MARGIN_LEFT_DEFAULT_STYLE: React.CSSProperties = {
  marginLeft: '0px'
};

const TABLET_MARGIN_LEFT_STYLE: React.CSSProperties = {
  marginLeft: '0'
};

const CARD_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  transition: 'transform 0.3s ease-in'
};

const DESKTOP_CARD_MARGIN_STYLE: React.CSSProperties = {
  marginRight: '18px'
};

const TABLET_CARD_MARGIN_STYLE: React.CSSProperties = {
  marginRight: '30px'
};
