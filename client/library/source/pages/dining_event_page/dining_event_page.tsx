import * as React from 'react';
import { Attendee, DisplayMode, DressCode, Location, Restaurant, Seating
} from '../../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** The color code of the event tag. */
  eventColor: string;

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

  /** Indicates the join event button is clicked. */
  onJoinEvent: () => void;
}

/** Displays the Dining Event Page. */
export class DiningEventPage extends React.Component<Properties> {
  public render(): JSX.Element {
    const { containerStyle, coverImageStyle, contentContainerStyle } = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          containerStyle: DESKTOP_CONTAINER_STYLE,
          coverImageStyle: DESKTOP_COVER_IMAGE_STYLE,
          contentContainerStyle: DESKTOP_CONTENT_CONTAINER_STYLE
        };
      } else if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerStyle: TABLET_CONTAINER_STYLE,
          coverImageStyle: TABLET_COVER_IMAGE_STYLE,
          contentContainerStyle: TABLET_CONTENT_CONTAINER_STYLE
        };
      } else {
        return {
          containerStyle: MOBILE_CONTAINER_STYLE,
          coverImageStyle: MOBILE_COVER_IMAGE_STYLE,
          contentContainerStyle: MOBILE_CONTENT_CONTAINER_STYLE
        };
      }
    })();
    const attendees = (() => {
      if (this.props.attendeeList && this.props.attendeeList.length !== 0 ) {
        const attendees = [];
        for (const attendee of this.props.attendeeList) {
          attendees.push(
            <div key={attendee.userId} style={ATTENDEE_CONTAINER_STYLE} >
              <div style={ATTENDEE_IMAGE_CONTAINER_STYLE} >
                <img
                  style={ATTENDEE_IMAGE_STYLE}
                  src={attendee.profileImageSrc}
                  alt='Profile Image'
                />
              </div>
              <div style={ATTENDEE_NAME_STYLE} >{attendee.name}</div>
            </div>);
        }
        return (
          <div style={ATTENDEES_ROW_STYLE} >
            {attendees}
          </div>);
      }
    return (
      <div style={TEXT_STYLE} >
        No attendees have joined yet. You can be the first!
      </div>);
    })();
    const detailsSection = (() => {
      const details = [];
      if (this.props.startTime) {

      }
      if (details.length === 0) {
        return <div style={TEXT_STYLE} >No details are available yet.</div>;
      }
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
          <div style={HEADER_CONTAINER_STYLE} >

          </div>
          <div style={DIVIDER_STYLE} />
          <div style={TITLE_STYLE} >Event Details</div>
          <div style={DETAILS_ROW_CONTAINER_STYLE} >
            {detailsSection}
          </div>
          <div style={TITLE_STYLE} >
            Attendees (${this.props.attendeeList.length}/
            ${this.props.totalCapacity})
          </div>
          {attendees}
          <div style={TITLE_STYLE} >Description</div>
          <div style={DESCRIPTION_STYLE} >{this.props.description}</div>
        </div>
      </div>);
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
  boxSizing: 'border-box',
  backgroundColor: '#FFFFFF',
  padding: '40px 0px',
  width: '900px',
  marginTop: '-120px',
  borderRadius: '4px'
};

const TABLET_CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  backgroundColor: '#FFFFFF',
  padding: '40px 0px',
  width: '702px',
  marginTop: '-100px',
  borderRadius: '4px'
};

const MOBILE_CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  backgroundColor: '#FFFFFF',
  padding: '40px 20px',
  width: '100%',
  marginTop: '0px',
  borderRadius: '4px'
};

const HEADER_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  backgroundColor: 'transparent'
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
  marginTop: '40px'
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
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '340px',
  marginLeft: '20px'
};

const DETAILS_BOLD_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000'
};

const ATTENDEES_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  width: '100%',
  backgroundColor:' trasnparent',
  gap: '40px 20px'
};

const ATTENDEE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '10px',
  width: '68px',
  backgroundColor: 'transparent'
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
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  width: '100%',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  textAlign: 'center',
  color: '#C67E14'
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
  color: '#000000'
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
