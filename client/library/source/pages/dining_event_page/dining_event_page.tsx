import { css, StyleSheet } from 'aphrodite';
import { format } from 'date-fns';
import * as React from 'react';
import * as Router from 'react-router-dom';
import { PrimaryTextButton, SecondaryTextButton, SeeAllButton, SeeLessButton
} from '../../components';
import { Attendee, AttendeeStatus, DisplayMode, DressCode, getDressCodeIconSrc,
  getDressCodeName, getSeatingIconSrc, getSeatingName, Location, Restaurant,
  Seating, toDollarSigns, User, UserStatus } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** The color code of the event tag. */
  eventColor: string;

  /** The cost of joining the event. */
  eventFee: number;

  /** The source address of the user's cover image. */
  coverImageSrc: string;

  /** Event title. */
  title: string;

  /** The restaurant that the event is happening at. */
  restaurant: Restaurant;

  /** Dress code of the event. */
  dressCode: DressCode;

  /** Seating type of the reservation. */
  seating: Seating;

  /** Location of the event. */
  location: Location;

  /** The name of the reservation at the venue. */
  reservationName: string;

  /** Start datetime of the event. */
  startTime: Date;

  /** End datetime of the event. */
  endTime: Date;

  /** List of users who are on the going list of the event. */
  attendeeList: Attendee[];

  /** Total number of people who can attend the event. */
  totalCapacity: number;

  /** The event description. */
  description: string;

  account: User;

  /** Whether the rsvp to the event is open or not. */
  isRSVPOpen: boolean;

  /** Indicates the join event button is clicked. */
  onJoinEvent: () => void;

  /** Indicates the user clicked on remove seat button. */
  onRemoveSeat: () => void;
}

interface State {
  isSeeAllAttendees: boolean;
}

/** Displays the Dining Event Page. */
export class DiningEventPage extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isSeeAllAttendees: false
    };
  }

  public render(): JSX.Element {
    const isLoggedIn = (() => {
      if (this.props.account && this.props.account.userStatus ===
          UserStatus.ACTIVE) {
        return true;
      }
      return false;
    })();
    const isGoing = (() => {
      if (isLoggedIn) {
        const index = this.props.attendeeList.findIndex((a) => 
          a.userId === this.props.account.id && a.status ===
          AttendeeStatus.GOING);
        if (index !== -1) {
          return true;
        }
      }
      return false;
    })();
    const goingAttendeeList: Attendee[] = (() => {
      if (!this.props.attendeeList) {
        return [];
      }
      return this.props.attendeeList.filter((a) => a.status ===
        AttendeeStatus.GOING);
    })();
    const joinButton = (() => {
      const currentTime = new Date();
      const { joinButtonStyle, joinButtonLabelStyle } = (() => {
        if (this.props.displayMode === DisplayMode.MOBILE) {
          return {
            joinButtonStyle: MOBILE_JOIN_BUTTON_STYLE,
            joinButtonLabelStyle: MOBILE_JOIN_BUTTON_TEXT_STYLE
          };
        }
        return {
          joinButtonStyle: JOIN_BUTTON_STYLE,
          joinButtonLabelStyle: JOIN_BUTTON_TEXT_STYLE
        };
      })();
      if (currentTime > this.props.endTime) {
        return <PrimaryTextButton style={joinButtonStyle}
          label='Past Event' labelStyle={joinButtonLabelStyle}
          disabled />;
      }
      if (currentTime > this.props.startTime && currentTime <
          this.props.endTime) {
        return <PrimaryTextButton style={joinButtonStyle}
          label='Happening Now' labelStyle={joinButtonLabelStyle}
          disabled />;
      }
      if (isLoggedIn && isGoing) {
        return <SecondaryTextButton style={joinButtonStyle}
          label='Remove Seat' labelStyle={joinButtonLabelStyle}
          onClick={this.props.onRemoveSeat} />;
      }
      if (!this.props.isRSVPOpen) {
        return <PrimaryTextButton style={joinButtonStyle}
          label='RSVP Close' labelStyle={joinButtonLabelStyle}
          disabled />;
      }
      if (goingAttendeeList.length >= this.props.totalCapacity) {
        return <PrimaryTextButton style={joinButtonStyle}
          label='Full' labelStyle={joinButtonLabelStyle}
          disabled />;
      }
      if (this.props.isRSVPOpen && (!isGoing || !isLoggedIn)) {
        return <PrimaryTextButton style={joinButtonStyle}
          label='Join This Event' labelStyle={joinButtonLabelStyle}
          onClick={this.props.onJoinEvent} />;
      }
    })();
    const { containerStyle, coverImageStyle, contentContainerStyle,
        headerContainerStyle, eventTagContainerStyle,
        detailIconTextContainerStyle, attendeesRowStyle, eventTitleStyle,
        headerJoinButton, stickyFooter
    } = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          containerStyle: DESKTOP_CONTAINER_STYLE,
          coverImageStyle: DESKTOP_COVER_IMAGE_STYLE,
          contentContainerStyle: DESKTOP_CONTENT_CONTAINER_STYLE,
          headerContainerStyle: DESKTOP_HEADER_CONTAINER_STYLE,
          eventTagContainerStyle: DESKTOP_EVENT_TAG_CONTAINER_STYLE,
          detailIconTextContainerStyle: DETAIL_ICON_TEXT_CONTAINER_STYLE,
          attendeesRowStyle: DESKTOP_ATTENDEES_ROW_STYLE,
          eventTitleStyle: DESKTOP_EVENT_TITLE_STYLE,
          headerJoinButton: joinButton,
          stickyFooter: <div />
        };
      } else if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerStyle: TABLET_CONTAINER_STYLE,
          coverImageStyle: TABLET_COVER_IMAGE_STYLE,
          contentContainerStyle: TABLET_CONTENT_CONTAINER_STYLE,
          headerContainerStyle: TABLET_HEADER_CONTAINER_STYLE,
          eventTagContainerStyle: TABLET_EVENT_TAG_CONTAINER_STYLE,
          detailIconTextContainerStyle: DETAIL_ICON_TEXT_CONTAINER_STYLE,
          attendeesRowStyle: TABLET_ATTENDEES_ROW_STYLE,
          eventTitleStyle: TABLET_EVENT_TITLE_STYLE,
          headerJoinButton: joinButton,
          stickyFooter: <div />
        };
      } else {
        return {
          containerStyle: MOBILE_CONTAINER_STYLE,
          coverImageStyle: MOBILE_COVER_IMAGE_STYLE,
          contentContainerStyle: MOBILE_CONTENT_CONTAINER_STYLE,
          headerContainerStyle: HEADER_CONTAINER_STYLE,
          eventTagContainerStyle: MOBILE_EVENT_TAG_CONTAINER_STYLE,
          detailIconTextContainerStyle: MOBILE_DETAIL_ICON_TEXT_CONTAINER_STYLE,
          attendeesRowStyle: MOBILE_ATTENDEES_ROW_STYLE,
          eventTitleStyle: MOBILE_EVENT_TITLE_STYLE,
          headerJoinButton: <div />,
          stickyFooter: (
            <div style={STICKY_FOOTER_CONTAINER_STYLE} >{joinButton}</div>)
        };
      }
    })();
    const cuisineTags = (() => {
      if (this.props.restaurant && this.props.restaurant.cuisineList) {
        const list = this.props.restaurant.cuisineList.slice(0, 3);
        const tags = [];
        for (const cuisine of list) {
          tags.push(
            <div
                key={cuisine.id}
                style={{...CUISINE_TEXT_STYLE,
                  backgroundColor: cuisine.colorCode}}
            >
              {cuisine.label}
            </div>);
        }
        return <div style={TAGS_CONTAINER_STYLE} >{tags}</div>;
      }
      return null;
    })();
    const goingAttendeesSection = (() => {
      if (goingAttendeeList.length === 0) {
        return (
          <div style={ATTENDEES_ROW_STYLE} >
            <div style={TEXT_STYLE} >
              No attendees have joined yet. You can be the first!
            </div>
          </div>);
      }
      const attendees = [];
      const total = (this.state.isSeeAllAttendees &&
        goingAttendeeList.length || Math.min(7,
          goingAttendeeList.length));
      for (const attendee of goingAttendeeList.slice(0, total)) {
        attendees.push(
          <Router.Link
              key={attendee.userId}
              style={ATTENDEE_CONTAINER_STYLE}
              to={`/users/profile/${attendee.userId}`}
              className={css(styles.profileLink)}
          >
            <div style={ATTENDEE_IMAGE_CONTAINER_STYLE} >
              <img
                style={ATTENDEE_IMAGE_STYLE}
                src={attendee.profileImageSrc}
                alt='Profile Image'
              />
            </div>
            <div style={ATTENDEE_NAME_STYLE} >{attendee.name}</div>
          </Router.Link>);
      }
      if (goingAttendeeList.length > 7 && this.state.isSeeAllAttendees) {
        attendees.push(
          <SeeLessButton key='SeeLessButton' onClick={this.handleSeeLess} />);
      }
      if (goingAttendeeList.length > 7 && !this.state.isSeeAllAttendees) {
        attendees.push(
          <SeeAllButton key='SeeAllButton' onClick={this.handleSeeAll} />);
      }
      return (
        <div style={attendeesRowStyle} >
          {attendees}
        </div>);
    })();
    const detailsSection = (() => {
      const details = [];
      if (this.props.startTime) {
        const startTime = (() => {
          if (!isLoggedIn) {
            return 'Log in to see the date';
          }
          return format(this.props.startTime, 'eeee, MMMM d, yyyy');
        })();
        details.push(
          <div key='event-start-date' style={detailIconTextContainerStyle} >
            <div style={ICON_CONTAINER_STYLE} >
              <img
                style={ICON_STYLE}
                src='resources/icons/calendar.svg'
                alt='Calendar Icon'
              />
            </div>
            <div style={DETAILS_TEXT_CONTAINER_STYLE} >
              <div style={DETAILS_BOLD_TEXT_STYLE} >
                {startTime}
              </div>
            </div>
          </div>);
      }
      if (this.props.reservationName) {
        const reservationName = (isLoggedIn && isGoing &&
          `Reservation: ${this.props.reservationName}` ||
          'Join to see the details');
        details.push(
          <div
              key='event-reservation-name'
              style={detailIconTextContainerStyle}
          >
            <div style={ICON_CONTAINER_STYLE} >
              <img
                style={ICON_STYLE}
                src='resources/icons/reservation.svg'
                alt='Reservation Icon'
              />
            </div>
            <div style={DETAILS_TEXT_CONTAINER_STYLE} >
              <div style={DETAILS_BOLD_TEXT_STYLE} >
                {reservationName}
              </div>
              <div style={TEXT_STYLE} >
                Upon arrival to the restaurant, ask for this name to be guided 
                to your table.
              </div>
            </div>
          </div>);
      }
      if (this.props.startTime && this.props.endTime) {
        const eventTime = (() => {
          if (!isLoggedIn) {
            return 'Log in to see the time';
          }
          return `${format(this.props.startTime, 'h:mm aa')} - ${format(
            this.props.endTime, 'h:mm aa')}`;
        })();
        details.push(
          <div key='event-hours' style={detailIconTextContainerStyle} >
            <div style={ICON_CONTAINER_STYLE} >
              <img
                style={ICON_STYLE}
                src='resources/icons/time.svg'
                alt='Time Icon'
              />
            </div>
            <div style={DETAILS_TEXT_CONTAINER_STYLE} >
              <div style={DETAILS_BOLD_TEXT_STYLE} >
                {eventTime}
              </div>
            </div>
          </div>);
      }
      if (this.props.dressCode || this.props.dressCode === 0) {
        details.push(
          <div key='event-dress-code' style={detailIconTextContainerStyle} >
            <div style={ICON_CONTAINER_STYLE} >
              <img
                style={ICON_STYLE}
                src={getDressCodeIconSrc(this.props.dressCode)}
                alt='Dresscode Icon'
              />
            </div>
            <div style={DETAILS_TEXT_CONTAINER_STYLE} >
              <div style={DETAILS_BOLD_TEXT_STYLE} >Dress Code</div>
              <div style={TEXT_STYLE} >
                {getDressCodeName(this.props.dressCode)}
              </div>
            </div>
          </div>);
      }
      if (this.props.location &&
          this.formatLocation(this.props.location) !== '') {
        details.push(
          <div key='event-location' style={detailIconTextContainerStyle} >
            <div style={ICON_CONTAINER_STYLE} >
              <img
                style={ICON_STYLE}
                src='resources/icons/location.svg'
                alt='Location Icon'
              />
            </div>
            <div style={DETAILS_TEXT_CONTAINER_STYLE} >
              <div style={DETAILS_BOLD_TEXT_STYLE} >
                {this.props.location.neighbourhood}
              </div>
              <div style={TEXT_STYLE} >
                {this.formatLocation(this.props.location)}
              </div>
            </div>
          </div>);
      }
      if (this.props.seating || this.props.seating === 0) {
        details.push(
          <div key='event-seating' style={detailIconTextContainerStyle} >
            <div style={ICON_CONTAINER_STYLE} >
              <img
                style={ICON_STYLE}
                src={getSeatingIconSrc(this.props.seating)}
                alt='Seating Icon'
              />
            </div>
            <div style={DETAILS_TEXT_CONTAINER_STYLE} >
              <div style={DETAILS_BOLD_TEXT_STYLE} >Seating</div>
              <div style={TEXT_STYLE} >
                {getSeatingName(this.props.seating)}
              </div>
            </div>
          </div>);
      }
      if (details.length === 0) {
      return (
        <div style={detailIconTextContainerStyle} >
          <div style={TEXT_STYLE} >
            No details are available yet.
          </div>
        </div>);
      }
      return details;
    })();
    const eventFee = (this.props.eventFee &&
      <div style={EVENT_FEE_CONTAINER_STYLE} >
        <img
          style={EVENT_FEE_ICON_STYLE}
          src='resources/icons/event_fee.svg'
          alt='Event Fee Icon'
        />
        <p style={EVENT_FEE_TEXT_STYLE} >
          ${this.props.eventFee.toString()} Event Fee
        </p>
      </div> || null);
    const attendeesTitle = (() => {
      if (!this.props.totalCapacity) {
        if (goingAttendeeList.length === 0) {
          return 'Attendees (0)';
        } else {
          return `Attendees (${goingAttendeeList.length})`;
        }
      } else {
        if (goingAttendeeList.length === 0) {
          return `Attendees (0/${this.props.totalCapacity})`;
        }
        return (`Attendees (${
          goingAttendeeList.length}/${this.props.totalCapacity})`);
      }
    })();
    const eventDescription = (() => {
      if (!isLoggedIn) {
        return 'Log in to see the event description.'
      }
      return this.props.description;
    })();
    return (
      <div style={{...CONTAINER_STYLE, ...containerStyle}} >
        <div
          style={{...COVER_IMAGE_STYLE,
            backgroundImage: `url(${this.props.coverImageSrc})`,
            ...coverImageStyle
          }}
        />
        <div style={contentContainerStyle} >
          <div style={headerContainerStyle} >
            <div style={eventTagContainerStyle} >
              <svg
                  style={{...EVENT_TAG_ICON_STYLE,
                    color: this.props.eventColor}}
                  width='18' height='31' viewBox='0 0 18 31'
                  xmlns='http://www.w3.org/2000/svg'
              >
                <path d='M18 31H0V0H18L14 15.5L18 31Z' fill='currentColor' />
              </svg>
            </div>
            <div style={eventTitleStyle} >{this.props.title}</div>
            {headerJoinButton}
            <div style={ROW_STYLE} >
              <div style={RESTAURANT_CONTAINER_STYLE} >
                <svg style={RESTAURANT_ICON_STYLE} width='20' height='20'
                    viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'
                >
                  <path d='M16.2673 15.9987H11.334V11.8654C11.334 10.532 12.4007 9.33203 13.8673 9.33203C15.2007 9.33203 16.4007 10.3987 16.4007 11.8654V15.9987H16.2673Z'
                    fill='currentColor'
                  />
                  <path fillRule='evenodd' clipRule='evenodd'
                    d='M0 0V4V5.33333V20H20V5.33333V4V0H0ZM18.6667 18.6667H9.33333V11.8667C9.33333 10.4 8.13333 9.33333 6.66667 9.33333C5.2 9.33333 4 10.4 4 11.8667V18.6667H1.33333V5.33333H18.6667V18.6667ZM1.33333 4V1.33333H18.6667V4H1.33333Z'
                    fill='currentColor'
                  />
                </svg>
                <div style={RESTAURANT_NAME_TEXT_STYLE} >
                  {this.props.restaurant.name}
                </div>
              </div>
              <div style={DOT_STYLE} >&nbsp;&nbsp;.&nbsp;&nbsp;</div>
              <div style={PRICE_RANGE_STYLE} >
                {toDollarSigns(this.props.restaurant.priceRange)}
              </div>
              {cuisineTags}
              {eventFee}
            </div>
            <div style={DIVIDER_STYLE} />
          </div>
          <div style={TITLE_STYLE} >Event Details</div>
          <div style={DETAILS_ROW_CONTAINER_STYLE} >
            {detailsSection}
          </div>
          <div style={TITLE_STYLE} >{attendeesTitle}</div>
          {goingAttendeesSection}
          <div style={TITLE_STYLE} >Description</div>
          <div style={DESCRIPTION_STYLE} >{eventDescription}</div>
        </div>
        {stickyFooter}
      </div>);
  }

  private formatLocation(location: Location): string {
    let address = '';
    if (location.addressLineTwo) {
      address = location.addressLineTwo;
    }
    if (location.addressLineOne) {
      if (address) {
        address += '- ' + location.addressLineOne;
      } else {
        address = location.addressLineOne;
      }
    }
    if (location.city) {
      if (address) {
        address += ', ' + location.city;
      } else {
        address = location.city;
      }
    }
    if (location.province) {
      if (address) {
        address += ', ' + location.province;
      } else {
        address = location.province;
      }
    }
    if (location.postalCode) {
      if (address) {
        address += ' ' + location.postalCode;
      } else {
        address = location.postalCode;
      }
    }
    return address;
  }

  private handleSeeLess = () => {
    this.setState({ isSeeAllAttendees: false });
  }

  private handleSeeAll = () => {
    this.setState({ isSeeAllAttendees: true });
  }
}

export namespace DiningEventPage {
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
  alignItems: 'center',
  width: '100%',
  backgroundColor: '#E5E5E5'
};

const DESKTOP_CONTAINER_STYLE: React.CSSProperties = {
  paddingBottom: '108px'
};

const TABLET_CONTAINER_STYLE: React.CSSProperties = {
  paddingBottom: '59px'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  paddingBottom: '70px'
};

const COVER_IMAGE_STYLE: React.CSSProperties = {
  backgroundSize: 'cover',
  backgroundColor: '#C4C4C4',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left center',
  width: '100%'
};

const DESKTOP_COVER_IMAGE_STYLE: React.CSSProperties = {
  height: '420px'
};

const TABLET_COVER_IMAGE_STYLE: React.CSSProperties = {
  height: '250px'
};

const MOBILE_COVER_IMAGE_STYLE: React.CSSProperties = {
  height: '200px'
};

const DESKTOP_CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  boxSizing: 'border-box',
  backgroundColor: '#FFFFFF',
  padding: '40px 30px',
  width: '900px',
  marginTop: '-120px',
  borderRadius: '4px'
};

const TABLET_CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  boxSizing: 'border-box',
  backgroundColor: '#FFFFFF',
  padding: '40px 30px',
  width: '702px',
  marginTop: '-100px',
  borderRadius: '4px'
};

const MOBILE_CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  boxSizing: 'border-box',
  backgroundColor: '#FFFFFF',
  padding: '40px 20px',
  width: '100%',
  marginTop: '0px',
  borderRadius: '4px'
};

const HEADER_CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  backgroundColor: '#FFFFFF',
  flexWrap: 'wrap'
};

const DESKTOP_HEADER_CONTAINER_STYLE: React.CSSProperties = {
  ...HEADER_CONTAINER_STYLE,
  position: 'sticky',
  left: '0px',
  top: '20px'
};

const TABLET_HEADER_CONTAINER_STYLE: React.CSSProperties = {
  ...HEADER_CONTAINER_STYLE,
  position: 'sticky',
  left: '0px',
  top: '20px'
};

const EVENT_TAG_CONTAINER_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: '0px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  height: '39px',
  backgroundColor: 'transparent'
};

const DESKTOP_EVENT_TAG_CONTAINER_STYLE: React.CSSProperties = {
  ...EVENT_TAG_CONTAINER_STYLE,
  left: '-30px',
  width: '18px'
};

const TABLET_EVENT_TAG_CONTAINER_STYLE: React.CSSProperties = {
  ...EVENT_TAG_CONTAINER_STYLE,
  left: '-30px',
  width: '18px'
};

const MOBILE_EVENT_TAG_CONTAINER_STYLE: React.CSSProperties = {
  ...EVENT_TAG_CONTAINER_STYLE,
  left: '-20px',
  width: '13px'
};

const EVENT_TAG_ICON_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  height: '31px',
  backgroundColor: 'transparent'
};

const EVENT_TITLE_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '26px',
  lineHeight: '39px',
  color: '#000000',
  whiteSpace: 'pre-line'
};

const DESKTOP_EVENT_TITLE_STYLE: React.CSSProperties = {
  ...EVENT_TITLE_STYLE,
  width: 'calc(100% - 200px)'
};

const TABLET_EVENT_TITLE_STYLE: React.CSSProperties = {
  ...EVENT_TITLE_STYLE,
  width: 'calc(100% - 200px)'
};

const MOBILE_EVENT_TITLE_STYLE: React.CSSProperties = {
  ...EVENT_TITLE_STYLE,
  width: '100%'
};

const STICKY_FOOTER_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  position: 'sticky',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  paddingRight: '20px',
  paddingLeft: '20px',
  width: '100%',
  height: '70px',
  backgroundColor: '#F6F6F6',
  boxShadow: '0px 1px 8px rgba(0, 0, 0, 0.25)'
};

const JOIN_BUTTON_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: '2px',
  right: '0px',
  minWidth: '161px',
  width: 'fit-content',
  height: '35px'
};

const MOBILE_JOIN_BUTTON_STYLE: React.CSSProperties = {
  minWidth: '114px',
  width: 'fit-content',
  height: '30px'
};

const JOIN_BUTTON_TEXT_STYLE: React.CSSProperties = {
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px'
};

const MOBILE_JOIN_BUTTON_TEXT_STYLE: React.CSSProperties = {
  fontWeight: 600,
  fontSize: '10px',
  lineHeight: '13px'
};

const DIVIDER_STYLE: React.CSSProperties = {
  height: '1px',
  width: '100%',
  backgroundColor: '#C4C4C4',
  marginTop: '20px'
};

const TITLE_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '27px',
  textTransform: 'uppercase',
  color: '#969696',
  width: '100%',
  marginTop: '40px',
  whiteSpace: 'pre-line'
};

const DETAILS_ROW_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  marginTop: '30px',
  flexWrap: 'wrap',
  gap: '30px 40px'
};

const DETAIL_ICON_TEXT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: 'calc(50% - 20px)',
  gap: '20px'
};

const MOBILE_DETAIL_ICON_TEXT_CONTAINER_STYLE: React.CSSProperties = {
  ...DETAIL_ICON_TEXT_CONTAINER_STYLE,
  width: '100%'
};

const ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '40px',
  height: '40px',
  backgroundColor: 'transparent'
};

const ICON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minWidth: '40px',
  minHeight: '40px',
  objectFit: 'cover'
};

const DETAILS_TEXT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  width: 'calc(100% - 60px)',
  minHeight: '40px',
  height: '100%',
  gap: '5px'
};

const DETAILS_BOLD_TEXT_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  width: '100%'
};

const ATTENDEES_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  width: '100%',
  backgroundColor: 'trasnparent',
  marginTop: '20px'
};

const DESKTOP_ATTENDEES_ROW_STYLE: React.CSSProperties = {
  ...ATTENDEES_ROW_STYLE,
  gap: '20px 40px'
};

const TABLET_ATTENDEES_ROW_STYLE: React.CSSProperties = {
  ...ATTENDEES_ROW_STYLE,
  gap: '20px 45px'
};

const MOBILE_ATTENDEES_ROW_STYLE: React.CSSProperties = {
  ...ATTENDEES_ROW_STYLE,
  gap: '20px 20px'
};

const ATTENDEE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '10px',
  width: '68px',
  backgroundColor: 'transparent',
  color: '#C67E14',
  textDecoration: 'none',
  outline: 'none'
};

const ATTENDEE_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '68px',
  backgroundColor: 'transparent'
};

const ATTENDEE_IMAGE_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minHeight: '68px',
  minWidth: '68px',
  objectFit: 'cover',
  borderRadius: '50%'
};

const ATTENDEE_NAME_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  maxWidth: '100%',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  textAlign: 'center',
  color: 'inherit',
  textDecoration: 'inherit'
};

const TEXT_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  width: '100%',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  whiteSpace: 'pre-line'
};

const DESCRIPTION_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  flexWrap: 'wrap',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  marginTop: '20px'
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

const ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '100%',
  marginTop: '5px',
  gap: '10px 0px'
};

const DOT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000'
};

const RESTAURANT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: 'fit-content',
  gap: '10px',
  color: '#F26B55',
  textDecoration: 'none'
};

const RESTAURANT_ICON_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '20px',
  height: '20px',
  objectFit: 'cover',
  color: 'inherit'
};

const RESTAURANT_NAME_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: 'inherit'
};

const PRICE_RANGE_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  marginRight: '20px'
};

const EVENT_FEE_ICON_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '13px',
  height: '13px',
  backgroundColor: 'transparent',
  marginRight: '5px'
};

const EVENT_FEE_TEXT_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '18px',
  color: '#969696',
  padding: '0px',
  margin: '0px'
};

const TAGS_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '5px',
  marginRight: '20px'
};

const EVENT_FEE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '100%'
};

const styles = StyleSheet.create({
  profileLink: {
    ':hover': {
      color: '#EA9F26',
      textDecoration: 'underline #EA9F26'
    },
    ':focus': {
      color: '#EA9F26',
      textDecoration: 'underline #EA9F26'
    },
    ':focus-within': {
      color: '#EA9F26',
      textDecoration: 'underline #EA9F26'
    },
    ':active': {
      color: '#C67E14',
      textDecoration: 'underline #C67E14'
    }
  }
});
