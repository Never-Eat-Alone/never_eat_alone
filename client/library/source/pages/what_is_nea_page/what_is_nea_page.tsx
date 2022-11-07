import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import * as Router from 'react-router-dom';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;
  onCreateAccount: () => void;
}

export class WhatIsNeaPage extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <div style={CONTAINER_STYLE} >
        <div style={HERO_CONTAINER_STYLE} >
          <div style={SCROLL_TEXT_CONTAINER_STYLE} >
            <div>Scroll down</div>
            <div>↓</div>
          </div>
          <div style={HERO_SUB_SECTION_CONTAINER_STYLE} >
            <div style={TEAM_CONTAINER_STYLE} >
              <div
                  style={{...IMAGE_CONTAINER_STYLE,
                  ...HERO_IMAGE_CONTAINER_STYLE}}
              >
                <img
                  style={IMAGE_STYLE}
                  src='resources/what_is_nea_page/jessica.svg'
                  alt='Jessica'
                  draggable={false}
                />
              </div>
              <div
                  style={{...IMAGE_CONTAINER_STYLE,
                  ...HERO_IMAGE_CONTAINER_STYLE,
                  ...ARTHUR_IMAGE_CONTAINER_STYLE}}
              >
                <img
                  style={{...IMAGE_STYLE, ...ARTHUR_IMAGE_STYLE}}
                  src='resources/what_is_nea_page/arthur.png'
                  alt='Arthur'
                  draggable={false}
                />
              </div>
              <div
                  style={{...IMAGE_CONTAINER_STYLE,
                  ...HERO_IMAGE_CONTAINER_STYLE,
                  ...SHAHRZAD_IMAGE_CONTAINER_STYLE}}
              >
                <img
                  style={{...IMAGE_STYLE, ...SHAHRZAD_IMAGE_STYLE}}
                  src='resources/what_is_nea_page/shahrzad.svg'
                  alt='Shahrzad'
                  draggable={false}
                />
              </div>
            </div>
          </div>
          <div style={HERO_SUB_SECTION_CONTAINER_STYLE} >
            <div style={TEXT_CONTAINER_STYLE} >
              <div style={HEADER_STYLE} >WHAT IS NEA?</div>
              <div style={{...PARAGRAPH_STYLE, ...FIRST_LINES_STYLE}} >
                We’re a little startup passionate about food and 
                connections. It all started 3 years ago as a MeetUp Group 
                called Never Eat Alone.
              </div>
              <div style={{...PARAGRAPH_STYLE, ...LAST_LINE_STYLE}} >
                Find out what you can achieve on NEA!
              </div>
            </div>
          </div>
        </div>
        <div style={CONTENT_CONTAINER_STYLE} >
          <div style={CONTENT_FRAME_STYLE} >
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
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  height: '450px',
  width: '100%',
  backgroundImage: "url('resources/what_is_nea_page/synesthesia.png')",
  backgroundColor: '#F26B55',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top right'
};

const SCROLL_TEXT_CONTAINER_STYLE: React.CSSProperties = {
  position: 'absolute',
  bottom: '0',
  left: 'calc(50% - 83px/2)',
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
  lineHeight: '20px',
  color: '#FFFFFF'
};

const HERO_SUB_SECTION_CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '50%',
  height: '100%',
  overflow: 'hidden'
};

const IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
};

const IMAGE_STYLE: React.CSSProperties = {
  minWidth: '376px',
  minHeight: '224px',
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent'
};

const HERO_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  width: '376px',
  height: '224px'
};

const TEAM_CONTAINER_STYLE: React.CSSProperties = {
  position: 'absolute',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-end',
  width: '717px',
  height: '421px',
  backgroundColor: 'transparent',
  right: '22px',
  top: '50px'
};

const ARTHUR_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  marginTop: '-167px',
  marginRight: '341px',
  width: 'auto',
  height: '225px'
};

const ARTHUR_IMAGE_STYLE: React.CSSProperties = {
  minHeight: '225px',
  minWidth: 'auto'
};

const SHAHRZAD_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  marginTop: '-85px',
  marginRight: '98px',
  height: 'auto',
  width: '377px'
};

const SHAHRZAD_IMAGE_STYLE: React.CSSProperties = {
  minWidth: '377px',
  minHeight: 'auto'
};

const TEXT_CONTAINER_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: '154px',
  left: '121px'
};

const HEADER_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '26px',
  lineHeight: '39px',
  height: '39px',
  minWidth: '137px',
  textTransform: 'uppercase',
  color: '#FFFFFF',
  overflow: 'hidden'
};

const PARAGRAPH_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '20px',
  lineHeight: '28px',
  color: '#FFFFFF',
  textShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
  width: '370px',
  whiteSpace: 'pre-wrap'
};

const FIRST_LINES_STYLE: React.CSSProperties = {
  height: '80px',
  marginTop: '23px'
};

const LAST_LINE_STYLE: React.CSSProperties = {
  marginTop: '28px'
};

const CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  maxWidth: '1206px',
  maxHeight: '2146px',
  backgroundImage: "url('resources/what_is_nea_page/background-image.png')",
  backgroundColor: '#FFFFFF',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'bottom center',
  overflow: 'visible'
};

const CONTENT_FRAME_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '1143px',
  marginTop: '100px',
  marginBottom: '220px',
  padding: '0px'
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
