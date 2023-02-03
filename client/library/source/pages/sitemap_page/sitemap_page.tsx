import * as React from 'react';

export class SitemapPage extends React.Component<{}> {
  public render(): JSX.Element {
    return (
      <div style={CONTAINER_STYLE} >
        <img
          style={IMAGE_STYLE}
          src='resources/sitemap_page/image.jpg'
          alt='Sitemap image'
        />
      </div>);
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  overflow: 'initial'
};

const IMAGE_STYLE: React.CSSProperties = {
  width: '100%',
  objectFit: 'cover'
};
