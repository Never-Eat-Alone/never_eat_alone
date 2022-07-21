import * as React from 'react';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;
  coverImageSrc?: string;
}

export class ProfilePage extends React.Component<Properties> {
  public render(): JSX.Element {
    const coverImageStyle = (this.props.displayMode === DisplayMode.DESKTOP &&
      DESKTOP_COVER_IMAGE_STYLE || MOBILE_TABLET_COVER_IMAGE_STYLE);
    return (
      <div style={CONTAINER_STYLE} >
        <div
          style={{...COVER_IMAGE_STYLE,
            backgroundImage: `url(${this.props.coverImageSrc})`,
            ...coverImageStyle
          }}
        />
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
  backgroundColor: '#FFFFFF'
};

const COVER_IMAGE_STYLE: React.CSSProperties = {
  backgroundSize: 'cover',
  backgroundColor: '#C4C4C4',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left center',
  width: '100%'
};

const DESKTOP_COVER_IMAGE_STYLE: React.CSSProperties = {
  height: '120px'
};

const MOBILE_TABLET_COVER_IMAGE_STYLE: React.CSSProperties = {
  height: '200px'
};
