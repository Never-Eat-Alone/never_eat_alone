import { css, StyleSheet } from 'aphrodite';
import { format } from 'date-fns';
import * as React from 'react';
import * as Router from 'react-router-dom';
import { Cuisine, DisplayMode, PriceRange, toDollarSigns } from
  '../definitions';

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

  /** The end date of the event. */
  endTime: Date;

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
  style?: React.CSSProperties;
}

/** Displays the dining event card. */
export class DiningEventCard extends React.Component<Properties> {
  public render(): JSX.Element {
    const imageSrc = this.props.imageSrc ||
      'resources/dining_event_card/default_image.svg';
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
    const cuisine = (
      <div
          key={this.props.cuisines[0]?.id}
          style={{...CUISINE_TEXT_STYLE,
            backgroundColor: this.props.cuisines[0]?.colorCode}}
      >
        {this.props.cuisines[0]?.label}
      </div>);
    const seats = `${this.props.numberOfAttendees}/${this.props.numberOfSeats} \
      Attendees`;
    const isAttending = (() => {
      if (this.props.isAttending) {
        const text = (this.props.startTime > new Date() && 'going' ||
          'attended');
        return (
          <div style={ATTENDING_CONTAINER_STYLE} >
            <div style={ATTENDING_ICON_CONTAINER_STYLE} >
              <img
                style={ATTENDING_ICON_STYLE}
                src='resources/dining_event_card/icons/check_mark.svg'
                alt='Attending'
              />
            </div>
            <div style={ATTENDING_TEXT_STYLE} >{text}</div>
          </div>);
      }
      return null;
    })();
    const { containerStyle, eventColorStyle, imageContainerStyle,
        imageStyle, textContainerStyle, restaurantNameRowStyle, titleStyle
    } = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          containerStyle: DESKTOP_CONTAINER_STYLE,
          eventColorStyle: DESKTOP_EVENT_COLOR_STYLE,
          imageContainerStyle: DESKTOP_IMAGE_CONTAINER_STYLE,
          imageStyle: DESKTOP_IMAGE_STYLE,
          textContainerStyle: DESKTOP_TEXT_CONTAINER_STYLE,
          restaurantNameRowStyle: DESKTOP_RESTAURANT_NAME_ROW_STYLE,
          titleStyle: DESKTOP_TITLE_STYLE
        };
      }
      if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerStyle: TABLET_CONTAINER_STYLE,
          eventColorStyle: TABLET_EVENT_COLOR_STYLE,
          imageContainerStyle: TABLET_IMAGE_CONTAINER_STYLE,
          imageStyle: TABLET_IMAGE_STYLE,
          textContainerStyle: TABLET_TEXT_CONTAINER_STYLE,
          restaurantNameRowStyle: TABLET_RESTAURANT_NAME_ROW_STYLE,
          titleStyle: TABLET_TITLE_STYLE
        };
      }
      return {
        containerStyle: MOBILE_CONTAINER_STYLE,
        eventColorStyle: MOBILE_EVENT_COLOR_STYLE,
        imageContainerStyle: MOBILE_IMAGE_CONTAINER_STYLE,
        imageStyle: MOBILE_IMAGE_STYLE,
        textContainerStyle: MOBILE_TEXT_CONTAINER_STYLE,
        restaurantNameRowStyle: MOBILE_RESTAURANT_NAME_ROW_STYLE,
        titleStyle: MOBILE_TITLE_STYLE
      };
    })();
    const namePriceCuisineSection = (() => {
      if (this.props.displayMode === DisplayMode.MOBILE) {
        return (
          <div style={{...RESTAURANT_NAME_ROW_STYLE, ...restaurantNameRowStyle}}
          >
            <div style={RESTAURANT_NAME_STYLE} >{restaurantName}</div>
            <div style={PRICE_TEXT_STYLE} >&nbsp;.&nbsp;</div>
            <div style={{...PRICE_TEXT_STYLE, ...MOBILE_PRICE_MARGIN}} >
              {toDollarSigns(this.props.priceRange)}
            </div>
            <div style={CUISINE_ROW_STYLE} >{cuisine}</div>
          </div>);
      }
      return (
        <>
          <div style={{...RESTAURANT_NAME_ROW_STYLE, ...restaurantNameRowStyle}}
          >
            <div style={RESTAURANT_NAME_STYLE} >{restaurantName}</div>
            <div style={PRICE_TEXT_STYLE} >&nbsp;.&nbsp;</div>
            <div style={PRICE_TEXT_STYLE} >
              {toDollarSigns(this.props.priceRange)}
            </div>
          </div>
          <div style={CUISINE_ROW_STYLE} >{cuisine}</div>
        </>);
    })();
    const dateInfo = (this.props.isLoggedIn && format(this.props.startTime,
      'eeee, MMMM d, yyyy') || 'Log in to see date');
    const timeInfo = (this.props.isLoggedIn && `${format(this.props.startTime,
      'h:mm aa')} - ${format(this.props.endTime, 'h:mm aa')}` ||
      'Log in to see time');
    return (
      <Router.Link
          style={{...CONTAINER_STYLE, ...containerStyle, ...this.props.style}}
          className={css(styles.container)}
          to={`/dining_events/${this.props.id}`}
      >
        <div style={{...IMAGE_CONTAINER_STYLE, ...imageContainerStyle}} >
          <img
            style={{...IMAGE_STYLE, ...imageStyle}}
            alt='Dining Event Image'
            src={imageSrc}
          />
        </div>
        <div style={{...TEXT_CONTAINER_STYLE, ...textContainerStyle}} >
          <div style={{...EVENT_COLOR_STYLE, ...eventColorStyle}} >
            <svg
                width='12' height='18' viewBox='0 0 12 18'
                fill={this.props.color} xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M12 18H0V0H12L8 9L12 18Z'
                fill={this.props.color}
              />
            </svg>
          </div>
          <div style={SECTION_CONTAINER_STYLE} >
            <div style={{...TITLE_STYLE, ...titleStyle}} >{title}</div>
            {namePriceCuisineSection}
          </div>
          <div style={SECTION_CONTAINER_STYLE} >
            <div style={{...ROW_STYLE, ...ROW_MARGIN_STYLE}} >
              <div style={ICON_CONTAINER_STYLE} >
                <img
                  style={ICON_STYLE}
                  src='resources/dining_event_card/icons/event_date.svg'
                  alt='Date'
                />
              </div>
              <div style={TEXT_ROW_STYLE} >
                {dateInfo}
              </div>
            </div>
            <div style={{...ROW_STYLE, ...ROW_MARGIN_STYLE}} >
              <div style={ICON_CONTAINER_STYLE} >
                <img
                  style={ICON_STYLE}
                  src='resources/dining_event_card/icons/clock.svg'
                  alt='Time'
                />
              </div>
              <div style={TEXT_ROW_STYLE} >
                {timeInfo}
              </div>
            </div>
            <div style={ROW_STYLE} >
              <div style={ICON_CONTAINER_STYLE} >
                <img
                  style={ICON_STYLE}
                  src='resources/dining_event_card/icons/seats.svg'
                  alt='Seats'
                />
              </div>
              <div style={TEXT_ROW_STYLE} >{seats}</div>
            </div>
          </div>
          {isAttending}
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

  private formatTime = (startTime: Date, endTime: Date): string => {
    function convert24To12HourClock(hour: number, minute: number): string {
      if (hour === 0) {
        return `12:${minute}am`;
      } else if (hour === 12) {
        return `12:${minute}pm`;
      } else if (hour > 12) {
        return `${hour - 12}:${minute}pm`;
      } else {
        return `${hour}:${minute}am`;
      }
    }
    return (`${convert24To12HourClock(startTime.getHours(),
      startTime.getMinutes())} - ${convert24To12HourClock(endTime.getHours(),
      endTime.getMinutes())}`);
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  boxSizing: 'border-box',
  display: 'flex',
  borderRadius: '4px',
  backgroundColor: '#FFFFFF',
  overflow: 'hidden',
  textDecoration: 'none',
  outline: 'none',
  filter: 'drop-shadow(0px 1px 4px rgba(86, 70, 40, 0.25))'
};

const DESKTOP_CONTAINER_STYLE: React.CSSProperties = {
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '244px',
  minHeight: '348px',
  height: '348px'
};

const TABLET_CONTAINER_STYLE: React.CSSProperties = {
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '214px',
  minHeight: '348px',
  height: '348px'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  minWidth: '335px',
  width: '335px',
  height: '216px'
};

const EVENT_COLOR_STYLE: React.CSSProperties = {
  position: 'absolute',
  left: '0'
};

const DESKTOP_EVENT_COLOR_STYLE: React.CSSProperties = {
  top: '24px'
};

const TABLET_EVENT_COLOR_STYLE: React.CSSProperties = {
  top: '24px'
};

const MOBILE_EVENT_COLOR_STYLE: React.CSSProperties = {
  top: '20px'
};

const IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
};

const DESKTOP_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  width: '100%',
  height: '78px'
};

const TABLET_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  width: '100%',
  height: '78px'
};

const MOBILE_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  width: '78px',
  height: '100%'
};

const IMAGE_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};

const DESKTOP_IMAGE_STYLE: React.CSSProperties = {
  minWidth: '244px',
  minHeight: '78px'
};

const TABLET_IMAGE_STYLE: React.CSSProperties = {
  minWidth: '214px',
  minHeight: '78px'
};

const MOBILE_IMAGE_STYLE: React.CSSProperties = {
  minWidth: '78px',
  minHeight: '216px'
};

const TEXT_CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start'
};

const DESKTOP_TEXT_CONTAINER_STYLE: React.CSSProperties = {
  width: '100%',
  height: 'calc(100% - 78px)',
  padding: '20px 20px 30px 20px'
};

const TABLET_TEXT_CONTAINER_STYLE: React.CSSProperties = {
  width: '100%',
  height: 'calc(100% - 78px)',
  padding: '20px 20px 30px 20px'
};

const MOBILE_TEXT_CONTAINER_STYLE: React.CSSProperties = {
  width: 'calc(100% - 78px)',
  height: '100%',
  padding: '15px 20px 20px 20px'
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
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '100%',
  minHeight: '24px',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '24px',
  color: '#000000',
  overflow: 'hidden',
  whiteSpace: 'pre-wrap',
  textOverflow: 'ellipsis',
  marginBottom: '5px'
};

const DESKTOP_TITLE_STYLE: React.CSSProperties = {
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  maxHeight: '48px'
};

const TABLET_TITLE_STYLE: React.CSSProperties = {
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  maxHeight: '48px'
};

const MOBILE_TITLE_STYLE: React.CSSProperties = {
  display: 'block',
  whiteSpace: 'nowrap',
  maxHeight: '24px'
};

const RESTAURANT_NAME_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  marginBottom: '5px'
};

const DESKTOP_RESTAURANT_NAME_ROW_STYLE: React.CSSProperties = {
  height: '15px'
};

const TABLET_RESTAURANT_NAME_ROW_STYLE: React.CSSProperties = {
  height: '15px'
};

const MOBILE_RESTAURANT_NAME_ROW_STYLE: React.CSSProperties = {
  height: '19px'
};

const RESTAURANT_NAME_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '15px',
  color: '#000000',
  height: '100%',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis'
};

const PRICE_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '15px',
  height: '100%',
  color: '#000000'
};

const ROW_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  height: '18px'
};

const ROW_MARGIN_STYLE: React.CSSProperties = {
  marginBottom: '10px'
};

const CUISINE_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  minHeight: '19px',
  height: '19px',
  width: '100%',
  overflow: 'hidden'
};

const CUISINE_TEXT_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px',
  color: '#000000',
  borderRadius: '4px',
  padding: '2px 4px',
  maxWidth: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap'
};

const MOBILE_PRICE_MARGIN: React.CSSProperties = {
  marginRight: '10px'
};

const ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '15px',
  height: '15px',
  marginRight: '15px'
};

const ICON_STYLE: React.CSSProperties = {
  minWidth: '15px',
  minHeight: '15px',
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent',
  objectFit: 'cover'
};

const TEXT_ROW_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  height: '18px',
  color: '#000000',
  width: '100%',
  overflow: 'hidden'
};

const ATTENDING_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  height: '30px',
  width: '100%',
  backgroundColor: 'transparent'
};

const ATTENDING_ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '10px',
  height: '8px',
  backgroundColor: 'transparent',
  marginRight: '5px'
};

const ATTENDING_ICON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minWidth: '10px',
  minHeight: '8px',
  objectFit: 'cover'
};

const ATTENDING_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px',
  textTransform: 'uppercase',
  color: '#000000'
};

const styles = StyleSheet.create({
  container: {
    ':hover': {
      filter: 'drop-shadow(0px 1px 5px rgba(86, 70, 40, 0.4))'
    },
    ':focus': {
      filter: 'drop-shadow(0px 1px 5px rgba(86, 70, 40, 0.4))'
    },
    ':active': {
      filter: 'drop-shadow(0px 1px 5px rgba(86, 70, 40, 0.4))'
    }
  }
});
