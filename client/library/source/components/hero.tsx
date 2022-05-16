import * as React from 'react';
import { DisplayMode } from '../definitions';
import { AccentTextButton } from './text_button';

interface Properties {
  displayMode: DisplayMode;
  onJoinButton: () => void;
}

export class Hero extends React.Component<Properties> {
  public render(): JSX.Element {
    const paragraph = 'Are you feeling adventurous and want to try something \
      entirely new, but know no one to recommend you? We’re here for you.';
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
            FIND YOUR FAVOURITE EVENTS
            WITH YOUR FAVOURITE PEOPLE.
          </h1>
          <p style={PARAGRAPH_STYLE} >{paragraph}</p>
          <AccentTextButton
            style={JOIN_BUTTON_STYLE}
            label='join the fun'
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
  backgroundPosition: 'left center',
  paddingBottom: '72px'
};

const DESKTOP_CONTAINER_STYLE: React.CSSProperties = {
  height: '615px'
};

const TABLET_CONTAINER_STYLE: React.CSSProperties = {
  height: '615px'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  height: 'auto'
};

const DETAILS_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  marginTop: '258px',
  backgroundColor: 'transparent',
  color: '#FFFFFF'
};

const DESKTOP_DETAILS_CONTAINER_STYLE: React.CSSProperties = {
  width: '1200px',
  paddingLeft: '20px',
  paddingRight: '20px'
};

const TABLET_DETAILS_CONTAINER_STYLE: React.CSSProperties = {
  width: '100%',
  paddingLeft: '30px',
  paddingRight: '30px'
};

const MOBILE_DETAILS_CONTAINER_STYLE: React.CSSProperties = {
  width: '100%',
  paddingLeft: '15px',
  paddingRight: '15px'
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
  marginTop: '23px',
  marginBottom: '0',
  marginRight: '0',
  marginLeft: '0',
  padding: '0',
  textShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)'
};

const JOIN_BUTTON_STYLE: React.CSSProperties = {
  width: '145px',
  height: '35px',
  marginTop: '23px'
};

const JOIN_BUTTON_LABEL_STYLE: React.CSSProperties = {
  fontSize: '12px',
  lineHeight: '15px',
  height: '15px'
};
