import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import * as Router from 'react-router-dom';
import { DisplayMode } from '../definitions';

interface Properties {

  /** The display mode. */
  displayMode: DisplayMode;
}

/** Displays the PartnerWithUsSummary section on the home page. */
export class PartnerWithUsSummary extends React.Component<Properties> {
  public render(): JSX.Element {
    const { cardContainerStyle, imageContainerStyle } = (
        () => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          cardContainerStyle: DESKTOP_CARD_CONTAINER_STYLE,
          imageContainerStyle: DESKTOP_IMAGE_CONTAINER_STYLE
        };
      }
      if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          cardContainerStyle: TABLET_CARD_CONTAINER_STYLE,
          imageContainerStyle: TABLET_IMAGE_CONTAINER_STYLE
        };
      }
      return {
        cardContainerStyle: MOBILE_CARD_CONTAINER_STYLE,
        imageContainerStyle: MOBILE_IMAGE_CONTAINER_STYLE
      };
    })();
    return (
      <div style={CONTAINER_STYLE} >
        <Router.Link
            to='/partner_with_us'
            style={{...CARD_CONTAINER_STYLE, ...cardContainerStyle}}
            className={css(styles.card)}
        >
          <div style={{...IMAGE_CONTAINER_STYLE, ...imageContainerStyle}} >
            <img
              style={IMAGE_STYLE}
              src='resources/partner_with_us_summary/chef.jpg'
              alt='Partnership Image'
            />
          </div>
          <div style={TEXT_CONTAINER_STYLE} >
            <div style={TITLE_STYLE} >
              Partner With Us
            </div>
            <div style={TEXT_BOX_STYLE} >
              Have a venue or restaurant?<br/>
              We can help you host events directly for your customers.
            </div>
            <button style={BUTTON_STYLE} >
              <div style={BUTTON_TEXT_STYLE} >Get in touch</div>
              <div style={ICON_CONTAINER_STYLE} >
                <img
                  style={ICON_STYLE}
                  src='resources/partner_with_us_summary/icons/arrow.svg'
                  alt='Get in touch'
                />
              </div>
            </button>
          </div>
        </Router.Link>
      </div>);
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  backgroundColor: '#F6F6F6',
  paddingBottom: '40px',
  paddingTop: '30px'
};

const CARD_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  filter: 'drop-shadow(0px 1px 30px rgba(86, 70, 40, 0.15))',
  borderRadius: '4px',
  textDecoration: 'none',
  overflow: 'hidden'
};

const DESKTOP_CARD_CONTAINER_STYLE: React.CSSProperties = {
  width: '506px'
};

const TABLET_CARD_CONTAINER_STYLE: React.CSSProperties = {
  width: '702px'
};

const MOBILE_CARD_CONTAINER_STYLE: React.CSSProperties = {
  width: '335px'
};

const IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%'
};

const DESKTOP_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  height: '288px'
};

const TABLET_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  height: '288px'
};

const MOBILE_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  height: '263px'
};

const IMAGE_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};

const TEXT_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  padding: '20px',
  width: '100%',
  backgroundColor: '#FFFFFF',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center'
};

const TITLE_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '30px',
  lineHeight: '30px',
  height: '30px',
  color: '#000000',
  marginBottom: '10px',
  textAlign: 'center'
};

const TEXT_BOX_STYLE: React.CSSProperties = {
  width: '100%',
  minHeight: '50px',
  maxHeight: '75px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '25px',
  textAlign: 'center',
  whiteSpace: 'pre-wrap',
  color: '#000000',
  marginBottom: '20px'
};

const BUTTON_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  border: 'none',
  outline: 'none',
  backgroundColor: '#F26B55',
  borderRadius: '4px',
  height: '35px',
  width: '161px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center'
};

const BUTTON_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px',
  textTransform: 'uppercase',
  color: '#FFFFFF'
};

const ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '10px',
  height: '10px',
  marginLeft: '5px'
};

const ICON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minWidth: '10px',
  minHeight: '10px',
  objectFit: 'cover',
  backgroundColor: 'transparent',
  color: '#FFFFFF'
};

const styles = StyleSheet.create({
  card: {
    ':hover': {
      filter: 'drop-shadow(0px 1px 30px rgba(86, 70, 40, 0.4))'
    },
    ':focus': {
      filter: 'drop-shadow(0px 1px 30px rgba(86, 70, 40, 0.4))'
    },
    ':focus-within': {
      filter: 'drop-shadow(0px 1px 30px rgba(86, 70, 40, 0.4))'
    },
    ':active': {
      filter: 'drop-shadow(0px 1px 30px rgba(86, 70, 40, 0.4))'
    }
  }
});
