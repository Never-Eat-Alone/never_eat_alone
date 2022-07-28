import * as React from 'react';
import { InvertedSecondaryTextButton } from '../../components';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** The source address of the user's cover image. */
  coverImageSrc: string;
}

/** Displays the edit profile page. */
export class EditProfilePage extends React.Component<Properties> {
  public render(): JSX.Element {
    const { containerStyle, coverImageStyle } = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          containerStyle: DESKTOP_CONTAINER_STYLE,
          coverImageStyle: DESKTOP_COVER_IMAGE_STYLE
        };
      } else if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerStyle: TABLET_CONTAINER_STYLE,
          coverImageStyle: TABLET_COVER_IMAGE_STYLE
        };
      } else {
        return {
          containerStyle: MOBILE_CONTAINER_STYLE,
          coverImageStyle: MOBILE_COVER_IMAGE_STYLE
        };
      }
    })();
    return (
      <div style={{...CONTAINER_STYLE, ...containerStyle}} >
        <div
          style={{...COVER_IMAGE_STYLE,
            backgroundImage: `url(${this.props.coverImageSrc})`,
            ...coverImageStyle
          }}
        />
        <InvertedSecondaryTextButton
          style={CHANGE_BANNER_BUTTON_STYLE}
          label='Change Banner'
          labelStyle={CHANGE_BANNER_LABEL_STYLE}
        />
        <div style={CONTENT_CONTAINER_STYLE} >
          Content
        </div>
      </div>);
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyItems: 'flex-start',
  alignItems: 'center',
  width: '100%',
  backgroundColor: '#FFFFFF'
};

const DESKTOP_CONTAINER_STYLE: React.CSSProperties = {
  paddingBottom: '140px'
};

const TABLET_CONTAINER_STYLE: React.CSSProperties = {
  paddingBottom: '115px'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  paddingBottom: '87px'
};

const COVER_IMAGE_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  backgroundSize: 'cover',
  backgroundColor: '#C4C4C4',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left center',
  width: '100%'
};

const DESKTOP_COVER_IMAGE_STYLE: React.CSSProperties = {
  height: '120px'
};

const TABLET_COVER_IMAGE_STYLE: React.CSSProperties = {
  height: '200px'
};

const MOBILE_COVER_IMAGE_STYLE: React.CSSProperties = {
  height: '200px'
};

const CHANGE_BANNER_BUTTON_STYLE: React.CSSProperties = {
  width: '211px',
  height: '35px',
  backgroundColor: 'rgba(150, 150, 150, 0.5)',
  marginTop: '40px'
};

const CHANGE_BANNER_LABEL_STYLE: React.CSSProperties = {
  fontSize: '12px',
  lineHeight: '15px'
};

const CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  backgroundColor: '#FFFFFF',
  padding: '30px',
  width: '630px',
  marginTop: '22px'
};
