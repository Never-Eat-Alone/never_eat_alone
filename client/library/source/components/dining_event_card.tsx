import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import * as Router from 'react-router-dom';
import { Cuisine, DisplayMode, PriceRange, toDollarSigns
} from '../definitions';

interface Properties {

  displayMode: DisplayMode;
  
  /** The id of the dining event. */
  id: number;

  /** The source address of the image displayed on the dining event card. */
  imageSrc: string;

  /** The title of the dining event. */
  title: string;

  /** Represents the name of the restaurant event is happening at. */
  restaurantName: string;

  /** The price range for the restaurant. */
  priceRange: PriceRange;

  /** The start date of the event. */
  startTime: Date;

  /** The cuisine labels associated with the restaurant. */
  cuisines: Cuisine[];

  /** Represents the number of users who joined the event. */
  numberOfAttendees: number;

  /** Indicates the number of seats in total for the event. */
  numberOfSeats: number;

  /** Indicates the logged in user is attending this event. */
  isAttending: boolean;

  /** Indicates whether the user is logged in or not. */
  isLoggedIn: boolean;

  /** The card color. */
  color: string;

  /** Indicates the style. */
  style?: any;

  /** Indicated the classname. */
  className?: any;
}

/** Displays the dining event summary card. */
export class DiningEventCard extends React.Component<Properties> {
  public render(): JSX.Element {
    const title = (() => {
      if (this.props.title.length > 60) {
        return this.props.restaurantName.substring(0, 57) + '...';
      }
      return this.props.title;
    })();
    const restaurantName = (() => {
      if (this.props.restaurantName.length > 28) {
        return this.props.restaurantName.substring(0, 25) + '...';
      }
      return this.props.restaurantName;
    })();
    const seats = `${this.props.numberOfAttendees}/${this.props.numberOfSeats} \
      Attendees`;
    const imageSrc = this.props.imageSrc ||
      'resources/dining_event_card/default_image.svg';
    const cuisines = (() => {
      if (this.props.cuisines.length == 0) {
        return null;
      }
      let result = this.props.cuisines[0].label;
      for (let i = 1; i < Math.min(this.props.cuisines.length, 3); ++i) {
        const newLabel = ', ' + this.props.cuisines[i].label;
        if ((result + newLabel).length < 33) {
          result += newLabel;
        }
      }
      return (
        <div style={{...ROW_STYLE, ...CUISINE_ROW_STYLE}} >
          <div style={{...TEXT_ROW_STYLE, ...NO_SELECTION_STYLE}} >
            {result}
          </div>
        </div>
      );
    })();
    const isAttending = (() => {
      return (
        (this.props.isAttending &&
        <div style={ATTENDING_CONTAINER_STYLE} >
          <div style={ATTENDING_ICON_CONTAINER_STYLE} >
            <img
              style={ATTENDING_ICON_STYLE}
              src='resources/dining_event_card/icons/check_mark.svg'
              alt='Attending'
            />
          </div>
          <div style={ATTENDING_TEXT_STYLE} >I'm Going</div>
        </div>) || null);
    })();
    const containerStyle = (() => {
      if (this.props.style) {
        return {...CONTAINER_STYLE, ...this.props.style}
      }
      return CONTAINER_STYLE;
    })();
    const containerClass = (() => {
      if (this.props.className) {
        return css(styles.container, this.props.className, styles.linkText);
      }
      return css(styles.container, styles.linkText);
    })();
    return (
      <Router.Link
          style={containerStyle}
          className={containerClass}
          to={`/dining_events/${this.props.id}`}
          draggable={false}
      >
        {isAttending}
        <div style={IMAGE_CONTAINER_STYLE} >
          <img
            style={{...IMAGE_STYLE, ...NO_SELECTION_STYLE}}
            alt='Dining Event Image'
            src={imageSrc}
          />
        </div>
        <div style={TEXT_CONTAINER_STYLE} >
          <div style={EVENT_COLOR_STYLE} >
            <svg
                width='12' height='20' viewBox='0 0 12 20'
                fill={this.props.color} xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M12 19.5468H0V0H12L8 9.7734L12 19.5468Z'
                fill={this.props.color} />
            </svg>
          </div>
          <div style={SECTION_CONTAINER_STYLE} >
            <div
                style={{...TITLE_STYLE, ...NO_SELECTION_STYLE}}
                draggable={false}
            >
              {title}
            </div>
            <div style={{...ROW_STYLE, ...PRICE_ROW_STYLE}} >
              <div style={RESTAURANT_NAME_STYLE} >
                {restaurantName}
              </div>
              <div style={NO_SELECTION_STYLE} >
                &nbsp;.&nbsp;
              </div>
              <div style={NO_SELECTION_STYLE} >
                {toDollarSigns(this.props.priceRange)}
              </div>
            </div>
          </div>
          <div style={SECTION_CONTAINER_STYLE} >
            <div style={{...ROW_STYLE, ...MIDDLE_ROW_STYLE}} >
              <div style={ICON_CONTAINER_STYLE} >
                <img
                  style={{...ICON_STYLE, ...NO_SELECTION_STYLE, height: '15px'}}
                  src='resources/dining_event_card/icons/event_date.svg'
                  alt='Calendar'
                  draggable={false}
                  />
              </div>
              <div
                  style={{...TEXT_ROW_STYLE, ...NO_SELECTION_STYLE}}
                  draggable={false}
                  >
                {this.formatDate(this.props.startTime)}
              </div>
            </div>
            <div style={{...ROW_STYLE, ...MIDDLE_ROW_STYLE}} >
              <div style={ICON_CONTAINER_STYLE} >
                <img
                  style={{...ICON_STYLE, ...NO_SELECTION_STYLE, height: '14px'}}
                  src='resources/dining_event_card/icons/seats.svg'
                  alt='Seat'
                  draggable={false}
                  />
              </div>
              <div
                  style={{...TEXT_ROW_STYLE, ...NO_SELECTION_STYLE}}
                  draggable={false}
                  >
                {seats}
              </div>
            </div>
            {cuisines}
          </div>
        </div>
      </Router.Link>);
  }

  /** Converts the date to the string format displayed on an event card. */
  private formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.toLocaleString('en-us', { month: 'long' }).slice(0, 3);
    const day = date.getDate();
    const weekday = date.toLocaleString('en-us',
      { weekday: 'long' }).slice(0, 3);
    if (day % 10 === 1) {
      return `${weekday} ${month} ${day}st, ${year}`;
    }
    if (day % 10 === 2) {
      return `${weekday} ${month} ${day}nd, ${year}`;
    }
    if (day % 10 === 3) {
      return `${weekday} ${month} ${day}rd, ${year}`;
    }
    return `${weekday} ${month} ${day}th, ${year}`;
  }
}

export namespace DiningEventCard {
  export enum ErrorCode {
    NONE,
    NO_CONNECTION
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '244px',
  height: '348px',
  boxShadow: '0px 2px 3px rgba(0, 0, 0, .25)',
  borderRadius: '4px',
  overflow: 'hidden',
  textDecoration: 'none',
  backgroundColor: '#FFFFFF'
};

const EVENT_COLOR_STYLE: React.CSSProperties = {
  position: 'absolute',
  left: '0',
  top: '24px'
};

const ATTENDING_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '3px 4px',
  position: 'absolute',
  height: '24px',
  right: '10px',
  top: '10px',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  borderRadius: '4px'
};

const ATTENDING_ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '14px',
  height: '15px',
  backgroundColor: 'transparent',
  marginRight: '4px'
};

const ATTENDING_ICON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minWidth: '14px',
  minHeight: '15px'
};

const ATTENDING_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '12px',
  lineHeight: '18px',
  color: '#FFFFFF',
  height: '100%',
  minWidth: '42px'
};

const IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100px'
};

const IMAGE_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%'
};

const RESTAURANT_NAME_STYLE: React.CSSProperties = {
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
};

const TEXT_CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  width: '100%',
  height: 'calc(100% - 100px)',
  padding: '20px'
};

const SECTION_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%'
};

const TITLE_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  width: '100%',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '24px',
  minHeight: '24px',
  maxHeight: '48px',
  color: '#000000',
  overflow: 'hidden',
  whiteSpace: 'pre-wrap'
};

const ROW_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%'
};

const PRICE_ROW_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 300,
  fontSize: '12px',
  lineHeight: '15px',
  height: '15px',
  color: '#000000',
  marginTop: '5px',
  overflow: 'hidden'
};

const MIDDLE_ROW_STYLE: React.CSSProperties = {
  paddingBottom: '15px'
};

const CUISINE_ROW_STYLE: React.CSSProperties = {
  height: '18px'
};

const ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '15px',
  height: '18px',
  marginRight: '10px'
};

const TEXT_ROW_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 300,
  fontSize: '14px',
  height: '18px',
  color: '#000000',
  width: '100%',
  overflow: 'hidden'
};

const ICON_STYLE: React.CSSProperties = {
  minWidth: '15px',
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent'
};

const NO_SELECTION_STYLE: React.CSSProperties = {
  WebkitTouchCallout: 'none',
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
  KhtmlUserSelect: 'none',
  userSelect: 'none'
};

const styles = StyleSheet.create({
  container: {
    ':hover': {
      boxShadow: '0px 2px 5px rgba(0, 0, 0, .25)'
    },
    ':focus': {
      boxShadow: '0px 2px 5px rgba(0, 0, 0, .25)'
    },
    ':active': {
      boxShadow: '0px 2px 5px rgba(0, 0, 0, .25)'
    }
  },
  linkText: {
    textDecoration: 'none',
    color: '#FFFFFF',
    ':focus': {
      outline: 'none'
    }
  }
});
