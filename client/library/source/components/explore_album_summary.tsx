import * as React from 'react';
import { DisplayMode, SocialMediaImage } from '../definitions';
import { AlbumCard } from './album_card';

interface Properties {
  displayMode: DisplayMode;
  imageList: SocialMediaImage[];
}

export class AlbumSummary extends React.Component<Properties> {
  public render(): JSX.Element {
    const { containerWidth, albumCardContainerMarginRight,
        albumCardContainerMarginBottom, numberOfDisplayedCards } = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          containerWidth: '1032px',
          albumCardContainerMarginRight: '20px',
          albumCardContainerMarginBottom: '60px',
          numberOfDisplayedCards: 8
        };
      }
      if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerWidth: '839px',
          albumCardContainerMarginRight: '55px',
          albumCardContainerMarginBottom: '89px',
          numberOfDisplayedCards: 6
        };
      }
      if (this.props.displayMode === DisplayMode.MOBILE) {
        return {
          containerWidth: '335px',
          albumCardContainerMarginRight: '25px',
          albumCardContainerMarginBottom: '59px',
          numberOfDisplayedCards: 6
        };
      }
    })();
    const cardList = [];
    for (let i = 0; i < Math.min(this.props.imageList.length,
        numberOfDisplayedCards); ++i) {
      const image = this.props.imageList[i];
      cardList.push(
        <div
            key={image.id}
            style={{marginBottom: albumCardContainerMarginBottom}}
        >
          <AlbumCard
            id={image.id}
            src={image.src}
            displayMode={this.props.displayMode}
          />
        </div>);
    }
    return (
      <div style={{...CONTAINER_STYLE, width: containerWidth}} >
        <div style={TEXT_CONTAINER_STYLE} >
          <div style={HEADER_STYLE} >
            A Peek At Our Live Album
          </div>
          <div style={ACCOUNT_INFO_STYLE} >
            <div style={ICON_CONTAINER_STYLE} >
              <img
                style={ICON_STYLE}
                src='resources/guest_home_page/icons/instagram_small.svg'
                alt='Instagram'
              />
            </div>
            See more on our Instagram
            <a
                target='_blank'
                href='https://www.instagram.com/nevereatalonetoronto/'
                style={LINK_STYLE}
            >
              &nbsp;@nevereatalonetoronto
            </a>
          </div>
        </div>
        <div style={IMAGE_CONTENT_CONTAINER_STYLE} >
          {cardList}
        </div>
      </div>);
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  backgroundColor: '#FFFFFF'
};

const TEXT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  marginBottom: '40px'
};

const HEADER_STYLE: React.CSSProperties = {
  minWidth: '212px',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '23px',
  lineHeight: '34px',
  textTransform: 'capitalize',
  color: '#000000',
  overflow: 'hidden',
  marginBottom: '8px'
};

const ACCOUNT_INFO_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '14px',
  height: '20px',
  color: '#FF2C79'
};

const ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '16px',
  height: '100%',
  marginRight: '10px'
};

const ICON_STYLE: React.CSSProperties = {
  height: '16px',
  width: '16px',
  color: '#ED1E79',
  objectFit: 'cover',
  opacity: 0.16
};

const IMAGE_CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  width: '100%'
};

const LINK_STYLE: React.CSSProperties = {
  textDecoration: 'none',
  height: '100%',
  color: '#FF2C79'
};
