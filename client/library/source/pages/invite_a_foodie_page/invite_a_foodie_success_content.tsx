import * as React from 'react';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;
}

export class InviteAFoodieSuccessContent extends React.Component<Properties> {
  public render(): JSX.Element {
    const containerStyle = (this.props.displayMode === DisplayMode.MOBILE && 
      MOBILE_CONTAINER_STYLE || CONTAINER_STYLE);
    return (
      <div style={containerStyle} >
        <h1 style={HEADER_STYLE} >
          hooray!
        </h1>
        <div style={IMAGE_CONTAINER_STYLE} >
          <img
            style={CELEBRATION_IMAGE_STYLE}
            src='resources/icons/celebration.jpg'
            alt='Celebration image'
            draggable={false}
          />
        </div>
        <p style={TEXT_STYLE} >
          You shared NeverEatAlone! Thanks for bringing more people together.
        </p>
      </div>);
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  width: '702px',
  height: '287px',
  padding: '30px'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTAINER_STYLE,
  width: '100%',
  height: 'auto',
  padding: '30px'
};

const HEADER_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '26px',
  lineHeight: '39px',
  textTransform: 'uppercase',
  color: '#000000',
  marginBottom: '30px',
  padding: '0px'
};

const IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '30px',
  width: '80px',
  height: '80px'
};

const CELEBRATION_IMAGE_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};

const TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '18px',
  textAlign: 'center',
  color: '#000000',
  padding: '0px',
  margin: '0px opx 30px 0px',
  height: '18px',
  minWidth: '419px'
};
