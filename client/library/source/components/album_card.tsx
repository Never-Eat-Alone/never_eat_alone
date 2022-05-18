import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import { DisplayMode } from '../definitions';

interface Properties {
  displayMode: DisplayMode;
  id: number;
  src: string;
  onClick?: () => void;
}

/** Displays the Album Card in photo album. */
export class AlbumCard extends React.Component<Properties> {
  public render(): JSX.Element {
    const containerStyle = (() => {
      if (this.props.displayMode === DisplayMode.MOBILE) {
        return MOBILE_CONTAINER_STYLE;
      }
      if (this.props.displayMode === DisplayMode.TABLET) {
        return TABLET_CONTAINER_STYLE;
      }
      return DESKTOP_CONTAINER_STYLE;
    })();
    return (
      <div style={{...CONTAINER_STYLE, ...containerStyle}}
          onClick={this.props.onClick}
      >
        <div
            style={{...IMAGE_CONTAINER,
              backgroundImage: `url(${this.props.src})`}}
            className={css(styles.imageContainer)}
        >
          <div style={ICON_CONTAINER_STYLE} >
            <img
              style={ICON_STYLE}
              src='resources/album_card/icons/instagram.svg'
              alt='Instagram'
            />
          </div>
        </div>
      </div>);
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  borderRadius: '4px',
  overflow: 'hidden'
};

const DESKTOP_CONTAINER_STYLE: React.CSSProperties = {
  width: '243px',
  height: '243px'
};

const TABLET_CONTAINER_STYLE: React.CSSProperties = {
  width: '214px',
  height: '214px'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  width: '155px',
  height: '155px'
};

const IMAGE_CONTAINER: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  backgroundSize: 'cover',
  width: '100%',
  height: '100%'
};

const ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '20px',
  height: '20px',
  color: '#FFFFFF',
  marginTop: '10px',
  marginRight: '10px',
  backgroundColor: 'transparent'
};

const ICON_STYLE: React.CSSProperties = {
  minWidth: '20px',
  minHeight: '20px',
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};

const styles = StyleSheet.create({
  imageContainer: {
    ':hover': {
      filter: 'drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.4))'
    },
    ':focus': {
      filter: 'drop-shadow(0px 1px 5px rgba(0, 0, 0, 0.4))'
    }
  }
});
