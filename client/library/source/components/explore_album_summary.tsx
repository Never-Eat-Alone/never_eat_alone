import * as React from 'react';
import { DisplayMode, SocialMediaImage } from '../definitions';
import { AlbumCard } from './album_card';

interface Properties {
  displayMode: DisplayMode;
  imageList: SocialMediaImage[];
}

export class AlbumSummary extends React.Component<Properties> {
  public render(): JSX.Element {
    const { containerStyle, contentContainerStyle, cardsContainerStyle,
        numberOfDisplayedCards } = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          containerStyle: DESKTOP_CONTAINER_STYLE,
          contentContainerStyle: DESKTOP_CONTENT_CONTAINER_STYLE,
          cardsContainerStyle: DESKTOP_CARDS_CONTAINER_STYLE,
          numberOfDisplayedCards: 8
        };
      }
      if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerStyle: TABLET_CONTAINER_STYLE,
          contentContainerStyle: TABLET_CONTENT_CONTAINER_STYLE,
          cardsContainerStyle: TABLET_CARDS_CONTAINER_STYLE,
          numberOfDisplayedCards: 6
        };
      }
      if (this.props.displayMode === DisplayMode.MOBILE) {
        return {
          containerStyle: MOBILE_CONTAINER_STYLE,
          contentContainerStyle: MOBILE_CONTENT_CONTAINER_STYLE,
          cardsContainerStyle: MOBILE_CARDS_CONTAINER_STYLE,
          numberOfDisplayedCards: 6
        };
      }
    })();
    const cardList = [];
    for (let i = 0; i < Math.min(this.props.imageList.length,
        numberOfDisplayedCards); ++i) {
      const image = this.props.imageList[i];
      cardList.push(
        <AlbumCard
          id={image.id}
          src={image.src}
          displayMode={this.props.displayMode}
        />);
    }
    return (
      <div style={{...CONTAINER_STYLE, ...containerStyle}} >
        <div style={{...CONTENT_CONTAINER_STYLE, ...contentContainerStyle}} >
          <div style={TEXT_CONTAINER_STYLE} >
            <div style={HEADER_STYLE} >
              A Peek At Our Live Album
            </div>
            <div style={ACCOUNT_INFO_STYLE} >
              <div style={ICON_CONTAINER_STYLE} >
                <img
                  style={ICON_STYLE}
                  src='resources/explore_album/icons/instagram.svg'
                  alt='Instagram'
                />
              </div>
              <a
                  target='_blank'
                  href='https://www.instagram.com/nevereatalonetoronto/'
                  style={LINK_STYLE}
              >
                &nbsp;@nevereatalonetoronto
              </a>
            </div>
          </div>
          <div style={{...CARDS_CONTAINER_STYLE, ...cardsContainerStyle}} >
            {cardList}
          </div>
        </div>
      </div>);
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  width: '100%',
  backgroundImage: 'url(resources/explore_album/background.jpg)',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left center'
};

const DESKTOP_CONTAINER_STYLE: React.CSSProperties = {
  paddingTop: '70px',
  paddingBottom: '70px'
};

const TABLET_CONTAINER_STYLE: React.CSSProperties = {
  paddingTop: '50px',
  paddingBottom: '50px'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  paddingTop: '40px',
  paddingBottom: '40px'
};

const CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start'
};

const DESKTOP_CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  width: '1032px'
};

const TABLET_CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  width: '702px'
};

const MOBILE_CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  width: '335px'
};

const TEXT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  marginBottom: '40px',
  backgroundColor: 'transparent'
};

const HEADER_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '23px',
  lineHeight: '34px',
  height: '34px',
  textTransform: 'capitalize',
  color: '#000000',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  marginBottom: '8px'
};

const ACCOUNT_INFO_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  height: '18px',
  color: '#FF2C79',
  gap: '10px'
};

const ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '16px',
  height: '16px'
};

const ICON_STYLE: React.CSSProperties = {
  minHeight: '16px',
  minWidth: '16px',
  width: '100%',
  height: '100%',
  color: '#ED1E79',
  objectFit: 'cover'
};

const CARDS_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  width: '100%'
};

const DESKTOP_CARDS_CONTAINER_STYLE: React.CSSProperties = {
  gap: '60px 20px'
};

const TABLET_CARDS_CONTAINER_STYLE: React.CSSProperties = {
  gap: '30px'
};

const MOBILE_CARDS_CONTAINER_STYLE: React.CSSProperties = {
  gap: '25px'
};

const LINK_STYLE: React.CSSProperties = {
  textDecoration: 'none',
  height: '100%',
  color: '#FF2C79'
};
