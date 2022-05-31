import * as React from 'react';
import { DisplayMode } from '../definitions';
import { AccentTextButton } from './text_button';

interface Properties {
  displayMode: DisplayMode;
  onJoinButton: () => void;
}

export class Hero extends React.Component<Properties> {
  public render(): JSX.Element {
    const paragraph = 'We’re here to pair the experiences you love with the \
      people who love them. Want to go out but don’t know when and where? \
      There’s an event for that.';
    const { containerStyle, detailsContainerStyle } = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          containerStyle: DESKTOP_CONTAINER_STYLE,
          detailsContainerStyle: DESKTOP_DETAILS_CONTAINER_STYLE
        };
      }
      if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerStyle: TABLET_CONTAINER_STYLE,
          detailsContainerStyle: TABLET_DETAILS_CONTAINER_STYLE
        };
      }
      return {
        containerStyle: MOBILE_CONTAINER_STYLE,
        detailsContainerStyle: MOBILE_DETAILS_CONTAINER_STYLE
      };
    })();
    return (
      <div style={{...CONTAINER_STYLE, ...containerStyle}} >
        <div style={{...DETAILS_CONTAINER_STYLE, ...detailsContainerStyle}} >
          <h1 style={HEADLINE_STYLE} >
            FIND YOUR FAVOURITE EVENTS.
          </h1>
          <p style={PARAGRAPH_STYLE} >{paragraph}</p>
          <AccentTextButton
            style={JOIN_BUTTON_STYLE}
            label='Become a member'
            labelStyle={JOIN_BUTTON_LABEL_STYLE}
            onClick={this.props.onJoinButton}
          />
        </div>
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
  backgroundImage: 'url(resources/home_page/illustrations/background-hero-big.jpg)',
  backgroundSize: 'cover',
  backgroundColor: '#F24D3D',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left center'
};

const DESKTOP_CONTAINER_STYLE: React.CSSProperties = {
  height: '615px'
};

const TABLET_CONTAINER_STYLE: React.CSSProperties = {
  height: '615px'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  height: '575px'
};

const DETAILS_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  backgroundColor: 'transparent',
  color: '#FFFFFF'
};

const DESKTOP_DETAILS_CONTAINER_STYLE: React.CSSProperties = {
  width: '1032px',
  marginLeft: '20px',
  marginRight: '20px',
  marginTop: '271px',
  gap: '20px'
};

const TABLET_DETAILS_CONTAINER_STYLE: React.CSSProperties = {
  width: '702px',
  marginLeft: '33px',
  marginRight: '33px',
  marginTop: '302px',
  gap: '23px'
};

const MOBILE_DETAILS_CONTAINER_STYLE: React.CSSProperties = {
  width: '335px',
  marginLeft: '20px',
  marginRight: '20px',
  marginTop: '299px',
  gap: '15px'
};

const HEADLINE_STYLE: React.CSSProperties = {
  maxWidth: '362px',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '26px',
  lineHeight: '39px',
  textTransform: 'uppercase',
  textShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
  margin: '0',
  padding: '0'
};

const PARAGRAPH_STYLE: React.CSSProperties = {
  maxWidth: '400px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '20px',
  lineHeight: '25px',
  overflowWrap: 'break-word',
  margin: '0px',
  padding: '0px',
  textShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)'
};

const JOIN_BUTTON_STYLE: React.CSSProperties = {
  width: '173px',
  height: '35px'
};

const JOIN_BUTTON_LABEL_STYLE: React.CSSProperties = {
  fontSize: '12px',
  lineHeight: '15px',
  height: '15px'
};
