import * as React from 'react';
import * as Router from 'react-router-dom';
import { DisplayMode, EventTag, User } from '../definitions';

interface Properties {

  account: User;

  displayMode: DisplayMode;

  /** List of event tags related to the user's previously attended events in the
   * current month
   */
  pastEventList: EventTag[];

  /** Total number of events in the current month. */
  totalNumberOfEvents: number;

  /** Indicates the style. */
  style?: React.CSSProperties;
}

/** Displays the Attendance record of the user in the current month. */
export class AttendanceRecord extends React.Component<Properties> {
  public render(): JSX.Element {
    const { containerStyle, tagsDetailContainerStyle,
        detailFirstSectionContainerStyle, detailSecondSectionContainerStyle
    } = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          containerStyle: DESKTOP_CONTAINER_STYLE,
          tagsDetailContainerStyle: DESKTOP_TAGS_DETAIL_CONTAINER_STYLE,
          detailFirstSectionContainerStyle: DESKTOP_DETAIL_FIRST_SECTION_CONTAINER_STYLE,
          detailSecondSectionContainerStyle: DESKTOP_DETAIL_SECOND_SECTION_CONTAINER_STYLE
        };
      }
      if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerStyle: TABLET_CONTAINER_STYLE,
          tagsDetailContainerStyle: TABLET_TAGS_DETAIL_CONTAINER_STYLE,
          detailFirstSectionContainerStyle: TABLET_DETAIL_FIRST_SECTION_CONTAINER_STYLE,
          detailSecondSectionContainerStyle: TABLET_DETAIL_SECOND_SECTION_CONTAINER_STYLE
        };
      }
      return {
        containerStyle: MOBILE_CONTAINER_STYLE,
        tagsDetailContainerStyle: MOBILE_TAGS_DETAIL_CONTAINER_STYLE,
        detailFirstSectionContainerStyle: MOBILE_DETAIL_FIRST_SECTION_CONTAINER_STYLE,
        detailSecondSectionContainerStyle: MOBILE_DETAIL_SECOND_SECTION_CONTAINER_STYLE
      };
    })();
    const coloredTags = [];
    for (const event of this.props.pastEventList) {
      coloredTags.push(
        <div key={event.eventId} style={SMALL_TAG_ICON_CONTAINER_STYLE} >
          <svg
              style={SMALL_TAG_ICON_STYLE}
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M18.4615 0H1.53846C0.615385 0 0 0.615385 0 1.53846V18.4615C0 
                19.3846 0.769231 20 1.53846 20C1.84615 20 2 20 2.30769 
                19.8462L9.38461 15.2308C9.53846 15.0769 9.84615 15.0769 10.1538 
                15.0769C10.4615 15.0769 10.6154 15.0769 10.9231 15.2308L17.8462 
                19.8462C18 20 18.1538 20 18.4615 20C19.2308 20 20 19.3846 20 
                18.4615V1.53846C20 0.615385 19.3846 0 18.4615 0Z'
              fill={event.eventColor}
            />
          </svg>
        </div>);
    }
    const greyTags = (() => {
      const numberOfGreyTags = (this.props.totalNumberOfEvents -
        this.props.pastEventList.length);
      if (numberOfGreyTags === 0) {
        return [];
      }
      const temp = [];
      for (let i = 0; i < numberOfGreyTags; ++i) {
        temp.push(
          <div
              key={`unlocked_tag_${i}`}
              style={SMALL_TAG_ICON_CONTAINER_STYLE}
          >
            <img
              style={SMALL_TAG_ICON_STYLE}
              src='resources/home_page/icons/unlocked_tag.svg'
              alt='Unlocked Tag Icon'
            />
          </div>);
      }
      return temp;
    })();
    const tags = [...coloredTags, ...greyTags];
    return (
      <div style={{...CONTAINER_STYLE, ...containerStyle}} >
        <div style={WELCOME_ROW_STYLE} >
          <div style={FOX_IMAGE_CONTAINER_STYLE} >
            <img
              style={FOX_IMAGE_STYLE}
              src='resources/home_page/illustrations/fox.svg'
              alt='Fox Icon'
            />
          </div>
          <div style={WELCOME_TEXT_STYLE} >Welcome back!</div>
        </div>
        <div
            style={{...TAGS_DETAIL_CONTAINER_STYLE,
              ...tagsDetailContainerStyle}}
        >
          <div
              style={{...DETAIL_FIRST_SECTION_CONTAINER_STYLE,
                ...detailFirstSectionContainerStyle}}
          >
            <div style={BIG_TAG_ICON_CONTAINER_STYLE} >
              <img
                style={BIG_TAG_ICON_STYLE}
                src='resources/home_page/icons/big_tag.svg'
                alt='Tag Icon'
              />
            </div>
            <div style={TEXT_CONTAINER_STYLE} >
              <div style={TITLE_STYLE} >Event superstar!</div>
              <div style={TEXT_STYLE} >
                You attended {this.props.pastEventList.length} events this{" "}
                month.
              </div>
            <Router.Link
                to={`/users/profile/${this.props.account.id}`}
                style={LINK_STYLE}
            >
              See your events
            </Router.Link>
            </div>
          </div>
          <div
              style={{...DETAIL_SECOND_SECTION_CONTAINER_STYLE,
                ...detailSecondSectionContainerStyle}}
          >
            {tags}
          </div>
        </div>
      </div>);
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: 'transparent',
  boxSizing: 'border-box'
};

const DESKTOP_CONTAINER_STYLE: React.CSSProperties = {
  marginTop: '83px',
  minHeight: '215px',
  maxWidth: '100%',
  marginLeft: '30px',
  marginRight: '30px',
  marginBottom: '69px'
};

const TABLET_CONTAINER_STYLE: React.CSSProperties = {
  marginTop: '84px',
  minHeight: '215px',
  maxWidth: '100%',
  marginLeft: '30px',
  marginRight: '30px',
  marginBottom: '68px'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  marginTop: '84px',
  width: '330px',
  maxHeight: '100%',
  marginLeft: '20px',
  marginRight: '20px',
  marginBottom: '30px'
};

const WELCOME_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-end',
  backgroundColor: 'transparent',
  width: '100%',
  height: '88px'
};

const FOX_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '115px',
  height: '123px',
  backgroundColor: 'transparent',
  marginBottom: '-29px'
};

const FOX_IMAGE_STYLE: React.CSSProperties = {
  minWidth: '115px',
  minHeight: '123px',
  width: '100%',
  height: '100%'
};

const WELCOME_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '26px',
  lineHeight: '39px',
  color: '#FFFFFF'
};

const TAGS_DETAIL_CONTAINER_STYLE: React.CSSProperties = {
  backgroundColor: '#FFFFFF',
  minHeight: '127px',
  width: '100%',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  borderRadius: '4px'
};

const DESKTOP_TAGS_DETAIL_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: '34px 38px',
  width: '100%'
};

const TABLET_TAGS_DETAIL_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: '34px 38px',
  width: '100%'
};

const MOBILE_TAGS_DETAIL_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '30px 20px',
  width: '100%'
};

const DETAIL_FIRST_SECTION_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center'
};

const DESKTOP_DETAIL_FIRST_SECTION_CONTAINER_STYLE: React.CSSProperties = {
  marginRight: '40px',
  height: '100%'
};

const TABLET_DETAIL_FIRST_SECTION_CONTAINER_STYLE: React.CSSProperties = {
  marginRight: '40px',
  height: '100%'
};

const MOBILE_DETAIL_FIRST_SECTION_CONTAINER_STYLE: React.CSSProperties = {
  marginBottom: '30px'
};

const BIG_TAG_ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '40px',
  height: '40px',
  marginRight: '20px'
};

const BIG_TAG_ICON_STYLE: React.CSSProperties = {
  minWidth: '40px',
  minHeight: '40px',
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};

const DETAIL_SECOND_SECTION_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '10px'
};

const DESKTOP_DETAIL_SECOND_SECTION_CONTAINER_STYLE: React.CSSProperties = {
  height: '100%'
};

const TABLET_DETAIL_SECOND_SECTION_CONTAINER_STYLE: React.CSSProperties = {
  height: '100%'
};

const MOBILE_DETAIL_SECOND_SECTION_CONTAINER_STYLE: React.CSSProperties = {
  maxWidth: '100%'
};

const SMALL_TAG_ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '20px',
  height: '20px'
};

const SMALL_TAG_ICON_STYLE: React.CSSProperties = {
  minWidth: '20px',
  minHeight: '20px',
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};

const TEXT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  width: '206px'
};

const TITLE_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '20px',
  lineHeight: '25px',
  color: '#000000',
  width: '100%'
};

const TEXT_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexWrap: 'wrap',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  width: '100%'
};

const LINK_STYLE: React.CSSProperties = {
  textDecoration: 'none',
  outline: 'none',
  padding: '0px',
  margin: '0px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '15px',
  color: '#F26B55',
  width: '100%'
};
