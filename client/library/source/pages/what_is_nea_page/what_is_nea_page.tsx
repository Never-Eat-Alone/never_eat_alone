import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import * as Router from 'react-router-dom';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** Indicates the request your account button is clicked. */
  onCreateAccount: () => void;
}

/** Displays the What is NEA page. */
export class WhatIsNeaPage extends React.Component<Properties> {
  public render(): JSX.Element {
    const { heroContainerStyle, imageHeroSubSectionContainerStyle,
        textHeroSubSectionContainerStyle, contentContainerStyle,
        contentFrameStyle, imageContainerStyle, imageStyle, teamContainerStyle,
        jessicaImageContainerStyle, arthurImageContainerStyle,
        shahrzadImageContainerStyle, textContainerStyle } = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          heroContainerStyle: DESKTOP_HERO_CONTAINER_STYLE,
          imageHeroSubSectionContainerStyle: IMAGE_HERO_SUB_SECTION_CONTAINER_STYLE,
          textHeroSubSectionContainerStyle: TEXT_HERO_SUB_SECTION_CONTAINER_STYLE,
          contentContainerStyle: DESKTOP_CONTENT_CONTAINER_STYLE,
          contentFrameStyle: DESKTOP_CONTENT_FRAME_STYLE,
          imageContainerStyle: DESKTOP_IMAGE_CONTAINER_STYLE,
          imageStyle: DESKTOP_IMAGE_STYLE,
          teamContainerStyle: DESKTOP_TEAM_CONTAINER_STYLE,
          jessicaImageContainerStyle: DESKTOP_JESSICA_IMAGE_CONTAINER_STYLE,
          arthurImageContainerStyle: DESKTOP_ARTHUR_IMAGE_CONTAINER_STYLE,
          shahrzadImageContainerStyle: DESKTOP_SHAHRZAD_IMAGE_CONTAINER_STYLE,
          textContainerStyle: DESKTOP_TEXT_CONTAINER_STYLE
        };
      }
      if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          heroContainerStyle: TABLET_HERO_CONTAINER_STYLE,
          imageHeroSubSectionContainerStyle: IMAGE_HERO_SUB_SECTION_CONTAINER_STYLE,
          textHeroSubSectionContainerStyle: TEXT_HERO_SUB_SECTION_CONTAINER_STYLE,
          contentContainerStyle: TABLET_CONTENT_CONTAINER_STYLE,
          contentFrameStyle: TABLET_CONTENT_FRAME_STYLE,
          imageContainerStyle: TABLET_IMAGE_CONTAINER_STYLE,
          imageStyle: TABLET_IMAGE_STYLE,
          teamContainerStyle: TABLET_TEAM_CONTAINER_STYLE,
          jessicaImageContainerStyle: TABLET_JESSICA_IMAGE_CONTAINER_STYLE,
          arthurImageContainerStyle: TABLET_ARTHUR_IMAGE_CONTAINER_STYLE,
          shahrzadImageContainerStyle: TABLET_SHAHRZAD_IMAGE_CONTAINER_STYLE,
          textContainerStyle: TABLET__TEXT_CONTAINER_STYLE
        };
      }
      return {
        heroContainerStyle: MOBILE_HERO_CONTAINER_STYLE,
        imageHeroSubSectionContainerStyle: MOBILE_HERO_SUB_SECTION_CONTAINER_STYLE,
        textHeroSubSectionContainerStyle: MOBILE_HERO_SUB_SECTION_CONTAINER_STYLE,
        contentContainerStyle: MOBILE_CONTENT_CONTAINER_STYLE,
        contentFrameStyle: MOBILE_CONTENT_FRAME_STYLE,
        imageContainerStyle: MOBILE_IMAGE_CONTAINER_STYLE,
        imageStyle: MOBILE_IMAGE_STYLE,
        teamContainerStyle: MOBILE_TEAM_CONTAINER_STYLE,
        jessicaImageContainerStyle: MOBILE_JESSICA_IMAGE_CONTAINER_STYLE,
        arthurImageContainerStyle: MOBILE_ARTHUR_IMAGE_CONTAINER_STYLE,
        shahrzadImageContainerStyle: MOBILE_SHAHRZAD_IMAGE_CONTAINER_STYLE,
        textContainerStyle: MOBILE_TEXT_CONTAINER_STYLE
      };
    })();

    return (
      <div style={CONTAINER_STYLE} >
        <div style={heroContainerStyle} >
          <div style={SCROLL_TEXT_CONTAINER_STYLE} >
            <div>Scroll down</div>
            <div>↓</div>
          </div>
          <div style={imageHeroSubSectionContainerStyle} >
            <div style={teamContainerStyle} >
              <div
                  style={{...imageContainerStyle,
                    ...jessicaImageContainerStyle}}
              >
                <img
                  style={imageStyle}
                  src='resources/what_is_nea_page/jessica.svg'
                  alt='Jessica'
                  draggable={false}
                />
              </div>
              <div
                  style={{...imageContainerStyle,
                    ...arthurImageContainerStyle}}
              >
                <img
                  style={imageStyle}
                  src='resources/what_is_nea_page/arthur.png'
                  alt='Arthur'
                  draggable={false}
                />
              </div>
              <div
                  style={{...imageContainerStyle,
                    ...shahrzadImageContainerStyle}}
              >
                <img
                  style={imageStyle}
                  src='resources/what_is_nea_page/shahrzad.svg'
                  alt='Shahrzad'
                  draggable={false}
                />
              </div>
            </div>
          </div>
          <div style={textHeroSubSectionContainerStyle} >
            <div style={textContainerStyle} >
              <div style={HEADER_STYLE} >WHAT IS NEA?</div>
              <div style={PARAGRAPH_STYLE} >
                We’re a little startup passionate about food and 
                connections. It all started 3 years ago as a MeetUp Group 
                called Never Eat Alone.
              </div>
              <div style={PARAGRAPH_STYLE} >
                Find out what you can achieve on NEA!
              </div>
            </div>
          </div>
        </div>
        <div style={contentContainerStyle} >
          <div style={contentFrameStyle} >
            <div style={FIRST_ROW_CONTAINER_STYLE} >
              <div style={FIRST_TEXT_BOX_STYLE} >
                <div style={TEXT_BOX_HEADER} >
                  Attend Culinary Events
                </div>
                <div style={TEXT_BOX_PARAGRAPH_STYLE} >
                  Would love to check that new restaurant close to your place? 
                  Or are you feeling adventurous and want to try something 
                  entirely new, but know no one to recommend you? That’s why 
                  we are here.
                </div>
                <Router.Link
                    style={{...BUTTON_STYLE, ...EXPLORE_EVENTS_BUTTON_STYLE}}
                    className={css(styles.link)}
                    to='/explore_events'
                    draggable={false}
                >
                  Explore Events
                </Router.Link>
              </div>
              <div style={CONTENT_IMAGE_CONTAINER_STYLE} >
                <img
                  style={CONTENT_IMAGE_STYLE}
                  src='resources/what_is_nea_page/explore-events.png'
                  alt='Explore events'
                />
              </div>
            </div>
            <div style={THIRD_ROW_CONTAINER_STYLE} >
              <div style={THIRD_TEXT_BOX_STYLE} >
                <div style={TEXT_BOX_HEADER} >Partner With Us</div>
                <div style={TEXT_BOX_PARAGRAPH_STYLE} >
                  Want to manage and promote your restaurant so we can 
                  create events at your venue and bring lots of customers to 
                  you? Or did you find your venue here and want to add more 
                  information to make it interesting?
                </div>
                <Router.Link
                    style={{...BUTTON_STYLE, ...PARTNER_WITH_US_BUTTON_STYLE}}
                    className={css(styles.link)}
                    to='/partner_with_us'
                    draggable={false}
                >
                  Partner With Us
                </Router.Link>
              </div>
              <div style={CONTENT_IMAGE_CONTAINER_STYLE} >
                <img
                  style={CONTENT_IMAGE_STYLE}
                  src='resources/what_is_nea_page/partner-with-us.png'
                  alt='Partner with us'
                />
              </div>
            </div>
            <div style={CREATE_ACCOUNT_BOX_CONTAINER_STYLE} >
              <div style={CREATE_ACCOUNT_HEADER_STYLE} >Ready To Start?</div>
              <button
                  style={CREATE_ACCOUNT_BUTTON_STYLE}
                  className={css(styles.createAccountButton)}
                  onClick={this.props.onCreateAccount}
              >
                Create Your Account
              </button>
            </div>
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
  width: '100%'
};

const HERO_CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  width: '100%',
  backgroundImage: "url('resources/what_is_nea_page/synesthesia.png')",
  backgroundColor: '#F26B55',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top right'
};

const DESKTOP_HERO_CONTAINER_STYLE: React.CSSProperties = {
  ...HERO_CONTAINER_STYLE,
  height: '450px'
};

const TABLET_HERO_CONTAINER_STYLE: React.CSSProperties = {
  ...HERO_CONTAINER_STYLE,
  height: '450px'
};

const MOBILE_HERO_CONTAINER_STYLE: React.CSSProperties = {
  ...HERO_CONTAINER_STYLE,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%'
};

const SCROLL_TEXT_CONTAINER_STYLE: React.CSSProperties = {
  position: 'absolute',
  bottom: '0',
  left: 'calc(50% - 41px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '83px',
  height: '39px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '18px',
  color: '#FFFFFF',
  backgroundColor: 'transparent'
};

const TEXT_HERO_SUB_SECTION_CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '50%',
  height: '100%'
};

const IMAGE_HERO_SUB_SECTION_CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-end',
  width: '50%',
  height: '100%'
};

const MOBILE_HERO_SUB_SECTION_CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  height: 'auto'
};

const TEAM_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-end',
  backgroundColor: 'transparent',
  overflow: 'hidden'
};

const DESKTOP_TEAM_CONTAINER_STYLE: React.CSSProperties = {
  ...TEAM_CONTAINER_STYLE,
  width: '717px',
  height: '421px',
  marginRight: '22px',
  marginTop: '54px'
};

const TABLET_TEAM_CONTAINER_STYLE: React.CSSProperties = {
  ...TEAM_CONTAINER_STYLE,
  width: '305px',
  height: '340px',
  marginRight: '25px',
  marginTop: '59px'
};

const MOBILE_TEAM_CONTAINER_STYLE: React.CSSProperties = {
  ...TEAM_CONTAINER_STYLE,
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  height: '225px'
};

const IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'transparent'
};

const DESKTOP_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  ...IMAGE_CONTAINER_STYLE,
  width: '376px',
  height: '224px'
};

const TABLET_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  ...IMAGE_CONTAINER_STYLE,
  width: '209px',
  height: '125px'
};

const MOBILE_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  ...IMAGE_CONTAINER_STYLE,
  width: '189px',
  height: '113px'
};

const DESKTOP_IMAGE_STYLE: React.CSSProperties = {
  minWidth: '376px',
  minHeight: '224px',
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent'
};

const TABLET_IMAGE_STYLE: React.CSSProperties = {
  minWidth: '209px',
  minHeight: '125px',
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent'
};

const MOBILE_IMAGE_STYLE: React.CSSProperties = {
  minWidth: '189px',
  minHeight: '113px',
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent'
};

const DESKTOP_JESSICA_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  marginTop: '0px',
  marginRight: '0px'
};

const TABLET_JESSICA_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  marginTop: '114px',
  marginRight: '29px',
  zIndex: 1
};

const MOBILE_JESSICA_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  marginTop: '112px',
  zIndex: 1
};

const DESKTOP_ARTHUR_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  marginTop: 'calc(57px - 224px)',
  marginRight: '341px'
};

const TABLET_ARTHUR_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  marginTop: '-234px',
  marginRight: '96px',
  zIndex: 0
};

const MOBILE_ARTHUR_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  marginTop: '-170px',
  marginRight: '254px',
  zIndex: 0
};

const DESKTOP_SHAHRZAD_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  marginTop: '-97px',
  marginRight: '98px'
};

const TABLET_SHAHRZAD_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  marginTop: '90px',
  marginRight: '72px',
  zIndex: 2
};

const MOBILE_SHAHRZAD_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  marginTop: '-111px',
  marginRight: '-220px',
  zIndex: 2
};

const TEXT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '23px',
  flexWrap: 'wrap',
  marginTop: '122px',
  marginLeft: '86px',
  backgroundColor: 'transparent'
};

const DESKTOP_TEXT_CONTAINER_STYLE: React.CSSProperties = {
  ...TEXT_CONTAINER_STYLE,
  maxWidth: '370px'
};

const TABLET__TEXT_CONTAINER_STYLE: React.CSSProperties = {
  ...TEXT_CONTAINER_STYLE,
  boxSizing: 'border-box',
  maxWidth: '370px',
  marginLeft: '0px',
  paddingRight: '20px'
};

const MOBILE_TEXT_CONTAINER_STYLE: React.CSSProperties = {
  ...TEXT_CONTAINER_STYLE,
  boxSizing: 'border-box',
  marginTop: '15px',
  width: '100%',
  padding: '0px 50px',
  marginBottom: '73px',
  marginLeft: '0px'
};

const HEADER_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '26px',
  lineHeight: '39px',
  textTransform: 'uppercase',
  color: '#FFFFFF'
};

const PARAGRAPH_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '20px',
  lineHeight: '25px',
  color: '#FFFFFF',
  textShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  whiteSpace: 'pre-wrap'
};

const CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  backgroundImage: "url('resources/what_is_nea_page/background-image.png')",
  backgroundColor: '#FFFFFF',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'bottom center',
  overflow: 'visible'
};

const DESKTOP_CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTENT_CONTAINER_STYLE,
  maxWidth: '1206px',
  maxHeight: '1655px'
};

const TABLET_CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTENT_CONTAINER_STYLE,
  maxWidth: '1206px',
  maxHeight: '1655px'
};

const MOBILE_CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTENT_CONTAINER_STYLE,
  maxWidth: '1206px',
  maxHeight: '1655px'
};

const CONTENT_FRAME_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '0px'
};

const DESKTOP_CONTENT_FRAME_STYLE: React.CSSProperties = {
  ...CONTENT_FRAME_STYLE,
  width: '1143px',
  marginTop: '100px',
  marginBottom: '325px'
};

const TABLET_CONTENT_FRAME_STYLE: React.CSSProperties = {
  ...CONTENT_FRAME_STYLE,
  width: '768px',
  marginTop: '100px',
  marginBottom: '245px'
};

const MOBILE_CONTENT_FRAME_STYLE: React.CSSProperties = {
  ...CONTENT_FRAME_STYLE,
  width: '100%',
  marginTop: '100px',
  marginBottom: '271px'
};

const FIRST_ROW_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  height: '396px'
};

const FIRST_TEXT_BOX_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  padding: '40px 40px 50px 100px',
  backgroundColor: '#F6F6F6',
  opacity: 0.8,
  width: '633px',
  height: '350px',
  marginLeft: '-40px',
  marginTop: '46px',
  textAlign: 'left'
};

const CONTENT_IMAGE_CONTAINER_STYLE : React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '550px',
  height: '350px',
  filter: 'drop-shadow(0px 1px 4px rgba(0, 0, 0, 0.25))',
  borderRadius: '4px',
  overflow: 'hidden'
};

const CONTENT_IMAGE_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minWidth: '550px',
  minHeight: '350px',
  backgroundColor: 'transparent',
  objectFit: 'cover',
  padding: '0',
  margin: '0'
};

const TEXT_BOX_HEADER: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '32px',
  lineHeight: '47px',
  textTransform: 'uppercase',
  color: '#4F4F4F',
  width: '100%',
  height: '47px',
  backgroundColor: 'transparent'
};

const TEXT_BOX_PARAGRAPH_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '20px',
  lineHeight: '25px',
  color: '#000000',
  width: '100%',
  height: '100px',
  marginTop: '16px',
  marginBottom: '32px',
  backgroundColor: 'transparent',
  whiteSpace: 'pre-wrap'
};

const BUTTON_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px solid #F26B55',
  borderRadius: '4px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px',
  textTransform: 'uppercase',
  color: '#F26B55',
  backgroundColor: 'transparent',
  outline: 'none',
  textDecoration: 'none',
  height: '35px',
  cursor: 'pointer'
};

const PARTNER_WITH_US_BUTTON_STYLE: React.CSSProperties = {
  width: '167px'
};

const EXPLORE_EVENTS_BUTTON_STYLE: React.CSSProperties = {
  width: '162px'
};

const THIRD_ROW_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  height: '416px',
  marginBottom: '180px'
};

const THIRD_TEXT_BOX_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  padding: '40px 40px 50px 100px',
  backgroundColor: '#FFF2CC',
  opacity: 0.8,
  width: '633px',
  height: '350px',
  marginTop: '66px',
  marginLeft: '-40px',
  textAlign: 'left'
};

const CREATE_ACCOUNT_BOX_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: 'transparent',
  width: '196px',
  padding: '0px'
};

const CREATE_ACCOUNT_HEADER_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '26px',
  lineHeight: '39px',
  height: '39px',
  textAlign: 'center',
  textTransform: 'uppercase',
  color: '#4F4F4F',
  marginBottom: '30px',
  minWidth: '173px',
  maxWidth: '100%',
  overflow: 'hidden'
};

const CREATE_ACCOUNT_BUTTON_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '10px 36px',
  width: '100%',
  height: '35px',
  background: '#F26B55',
  borderRadius: '4px',
  border: 'none',
  textDecoration: 'none',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px',
  textTransform: 'uppercase',
  color: '#FFFFFF',
  cursor: 'pointer'
};

const styles = StyleSheet.create({
  link: {
    ':hover': {
      textDecoration: 'none',
      outline: 'none'
    },
    ':focus': {
      textDecoration: 'none',
      outline: 'none'
    },
    ':active': {
      textDecoration: 'none',
      outline: 'none'
    }
  },
  createAccountButton: {
    ':hover': {
      backgroundColor: '#F26B55'
    },
    ':active': {
      backgroundColor: '#F26B55'
    }
  }
});
