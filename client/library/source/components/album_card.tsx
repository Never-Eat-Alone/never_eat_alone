import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import { DisplayMode } from '../definitions';

interface Properties {
  displayMode: DisplayMode;
  id: number;
  src: string;
}

/** Displays the Album Card in photo album. */
export class AlbumCard extends React.Component<Properties> {
  public render(): JSX.Element {
    const containerWidth = (() => {
      if (this.props.displayMode === DisplayMode.MOBILE) {
        return '155px';
      }
      return '243px';
    })();
    return (
      <div style={{...CARD_CONTAINER_STYLE, width: containerWidth}} >
        <div
            style={{...IMAGE_CONTAINER, height: containerWidth,
            backgroundImage: `url(${this.props.src})`
            }}
            className={css(styles.imageContainer)}
        >
          <div style={ICON_CONTAINER_STYLE} >
            <img
              style={{...ICON_STYLE, ...NO_SELECTION_STYLE}}
              src='resources/album_card/icons/instagram.svg'
              alt='Instagram'
            />
          </div>
        </div>
      </div>);
  }
}

const CARD_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start'
};

const IMAGE_CONTAINER: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  width: '100%',
  backgroundSize: 'cover',
  borderRadius: '4px'
};

const ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '28px',
  height: '28px',
  color: '#FFFFFF',
  marginTop: '10px',
  marginRight: '10px',
  backgroundColor: 'transparent'
};

const ICON_STYLE: React.CSSProperties = {
  minWidth: '28px',
  width: '100%',
  height: '100%'
};

const NO_SELECTION_STYLE: React.CSSProperties = {
  WebkitTouchCallout: 'none',
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
  KhtmlUserSelect: 'none',
  userSelect: 'none'
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
