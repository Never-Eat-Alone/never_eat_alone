import * as React from 'react';
import { DisplayMode } from '../definitions';
import { FacebookButton } from './facebook_button';
import { FooterLink } from './footer_link';
import { FooterLogo } from './footer_logo';
import { InstagramButton } from './instagram_button';
import { InviteAFoodieButton } from './invite_a_foodie_button';
import { TwitterButton } from './twitter_button';

interface Properties {
  /** The display mode. */
  displayMode: DisplayMode;

  /** Whether the backgroundimage for the footer is displayed or not. */
  isBackgroundImage?: boolean;

  /** The background color of the footer. */
  backgroundColor?: string;

  /** Indicates the invite a foodie button is clicked. */
  onInviteAFoodie: () => void;
}

export class Footer extends React.Component<Properties> {
  private static defaultProps: Partial<Properties> = {
    isBackgroundImage: true,
    backgroundColor: '#EFEFEF'
  };

  public render(): JSX.Element {
    const footerContainerMode = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return DESKTOP_CONTAINER_STYLE;
      } else if (this.props.displayMode === DisplayMode.TABLET) {
        return TABLET_CONTAINER_STYLE;
      } else {
        return MOBILE_CONTAINER_STYLE;
      }
    })();
    const content = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP ||
          this.props.displayMode === DisplayMode.TABLET) {
        const pagesRows = (() => {
          const rows = [];
          if (this.props.displayMode === DisplayMode.DESKTOP) {
            rows.push(
              <div key='pagesRow' style={PAGES_ROW_CONTAINER_STYLE} >
                <FooterLink
                  displayMode={this.props.displayMode}
                  to='/partner_with_us'
                  label='Partner With Us'
                  style={PAGES_MARGIN_LEFT_STYLE}
                />
                <FooterLink
                  displayMode={this.props.displayMode}
                  to='/cookies_policy'
                  label='Cookies Policy'
                  style={PAGES_MARGIN_LEFT_STYLE}
                />
                <FooterLink
                  displayMode={this.props.displayMode}
                  to='/privacy_policy'
                  label='Privacy Policy'
                  style={PAGES_MARGIN_LEFT_STYLE}
                />
                <FooterLink
                  displayMode={this.props.displayMode}
                  to='/terms_of_use'
                  label='Terms of Use'
                  style={PAGES_MARGIN_LEFT_STYLE}
                />
                <FooterLink
                  displayMode={this.props.displayMode}
                  to='/sitemap'
                  label='Sitemap'
                  style={PAGES_MARGIN_LEFT_STYLE}
                />
                <FooterLink
                  displayMode={this.props.displayMode}
                  to='/help'
                  label='Help'
                  style={PAGES_MARGIN_LEFT_STYLE}
                />
              </div>);
          } else {
            rows.push(
              <div key='pagesRow1' style={PAGES_ROW_CONTAINER_STYLE} >
                <FooterLink
                  displayMode={this.props.displayMode}
                  to='/cookies_policy'
                  label='Cookies Policy'
                  style={PAGES_MARGIN_LEFT_STYLE}
                />
                <FooterLink
                  displayMode={this.props.displayMode}
                  to='/privacy_policy'
                  label='Privacy Policy'
                  style={PAGES_MARGIN_LEFT_STYLE}
                />
                <FooterLink
                  displayMode={this.props.displayMode}
                  to='/terms_of_use'
                  label='Terms of Use'
                  style={PAGES_MARGIN_LEFT_STYLE}
                />
                <FooterLink
                  displayMode={this.props.displayMode}
                  to='/sitemap'
                  label='Sitemap'
                  style={PAGES_MARGIN_LEFT_STYLE}
                />
                <FooterLink
                  displayMode={this.props.displayMode}
                  to='/help'
                  label='Help'
                  style={PAGES_MARGIN_LEFT_STYLE}
                />
              </div>);
            rows.push(
              <div key='pagesRow2' style={PAGES_ROW_CONTAINER_STYLE} >
                <FooterLink
                  displayMode={this.props.displayMode}
                  to='/partner_with_us'
                  label='Partner With Us'
                  style={PAGES_MARGIN_LEFT_STYLE}
                />
              </div>);
          }
          return rows;
        })();
        const backgroundStyle = (() => {
          if (!this.props.isBackgroundImage) {
            return {backgroundImage: 'none'};
          }
          if (this.props.displayMode === DisplayMode.DESKTOP) {
            return ({
              backgroundImage: 'url(resources/footer/icons/wave.svg)',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '40px',
              backgroundSize: 'cover',
              minWidth: '367px'
            });
          }
          return ({
            backgroundImage: 'url(resources/footer/icons/wave.svg)',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '40px',
            backgroundSize: 'cover',
            minWidth: '302px'
          });
        })();
        const logoStyle = (this.props.displayMode === DisplayMode.DESKTOP && {
          marginTop: '84px', marginLeft: '20px' }) || { marginTop: '84px',
          marginLeft: '30px' };
        return (
          <div style={{...FOOTER_CONTAINER_STYLE, ...footerContainerMode}} >
            <div
                style={{...LEFT_CONTAINER_STYLE, ...backgroundStyle}} >
              <FooterLogo style={logoStyle} />
            </div>
            <div style={RIGHT_CONTAINER_STYLE} >
              <div
                  style={{...SOCIAL_MEDIA_ROW_STYLE,
                    ...DESKTOP_SOCIAL_ROW_MARGIN_STYLE}}
              >
                <TwitterButton
                  style={TWITTER_ICON_STYLE}
                  href='https://twitter.com/NEA_Toronto'
                />
                <FacebookButton
                  style={FB_ICON_STYLE}
                  href='https://www.facebook.com/neverEatAloneToronto'
                />
                <InstagramButton
                  style={INSTA_ICON_STYLE}
                  href='https://www.instagram.com/nevereatalonetoronto/'
                />
                <InviteAFoodieButton
                  onInviteAFoodie={this.props.onInviteAFoodie}
                />
              </div>
              {pagesRows}
              <div style={COPY_RIGHT_ROW_CONTAINER_STYLE} >
                Copyright 2020 © Never Eat Alone
              </div>
            </div>
          </div>);
      }
      const mobileBackgroundStyle = (this.props.isBackgroundImage && {
        backgroundImage: 'url(resources/footer/icons/waves_mobile.png)',
        backgroundSize: '367px 355px',
        backgroundColor: 'transparent',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }) || { backgroundImage: 'none' };
      return (
        <div
            style={{...FOOTER_CONTAINER_STYLE, ...footerContainerMode,
              ...mobileBackgroundStyle}}
        >
          <FooterLogo {...this.props} style={MARGIN_BOTTOM_STYLE} />
          <InviteAFoodieButton
            style={MARGIN_BOTTOM_STYLE}
            onInviteAFoodie={this.props.onInviteAFoodie}
          />
          <div
              style={{...SOCIAL_MEDIA_ROW_STYLE,
                ...MOBILE_SOCIAL_ROW_MARGIN_STYLE}}
          >
            <TwitterButton style={TWITTER_ICON_STYLE} />
            <FacebookButton style={FB_ICON_STYLE} />
            <InstagramButton />
          </div>
          <div style={LINK_ROW_STYLE} >
            <FooterLink
              displayMode={this.props.displayMode}
              to='/help'
              label='Help'
            />
            <div style={DOT_STYLE} >&nbsp;.&nbsp;</div>
            <FooterLink
              displayMode={this.props.displayMode}
              to='/sitemap'
              label='Sitemap'
            />
            <div style={DOT_STYLE} >&nbsp;.&nbsp;</div>
            <FooterLink
              displayMode={this.props.displayMode}
              to='/terms_of_use'
              label='Terms of Use'
            />
          </div>
          <div style={LINK_ROW_STYLE} >
            <FooterLink
              displayMode={this.props.displayMode}
              to='/privacy_policy'
              label='Privacy Policy'
            />
            <div style={DOT_STYLE} >&nbsp;.&nbsp;</div>
            <FooterLink
              displayMode={this.props.displayMode}
              to='/cookies_policy'
              label='Cookies Policy'
            />
          </div>
          <div style={{...LINK_ROW_STYLE, ...LINK_MARGIN_BOTTOM_STYLE}} >
            <FooterLink
              displayMode={this.props.displayMode}
              to='/partner_with_us'
              label='Partner With Us'
            />
          </div>
          <div style={COPY_RIGHT_ROW_CONTAINER_STYLE} >
            Copyright 2020 © Never Eat Alone
          </div>
        </div>);
    })();
    const backgroundColor = (this.props.backgroundColor &&
      `${this.props.backgroundColor}`) || '#EFEFEF';
    return (
      <div id='shell-footer' style={{...CONTAINER_STYLE,
          backgroundColor: backgroundColor}}
      >
        {content}
      </div>);
  }
}

const DOT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '12px',
  lineHeight: '22px',
  color: '#CCCCCC',
  marginBottom: '5px'
};

const CONTAINER_STYLE: React.CSSProperties = {
  position: 'absolute',
  bottom: '0px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  width: '100%',
  textRendering: 'geometricPrecision'
};

 const FOOTER_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  overflow: 'hidden'
};

const DESKTOP_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  height: '214px',
  width: '1201px',
  paddingRight: '20px'
};

const TABLET_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  height: '214px',
  width: '100%',
  paddingRight: '30px'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '355px',
  width: '367px',
  paddingTop: '40px'
};

const MARGIN_BOTTOM_STYLE: React.CSSProperties = {
  marginBottom: '30px'
};

const LINK_MARGIN_BOTTOM_STYLE: React.CSSProperties = {
  marginBottom: '20px'
};

const LEFT_CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  backgroundColor: 'transparent',
  overflow: 'visible'
};

const LINK_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0px',
  padding: '0px',
  height: '22px'
};

const RIGHT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-end',
  height: '100%',
  backgroundColor: 'transparent',
  marginTop: '58px'
};

const SOCIAL_MEDIA_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '28px'
};

const MOBILE_SOCIAL_ROW_MARGIN_STYLE: React.CSSProperties = {
  marginBottom: '20px'
};

const DESKTOP_SOCIAL_ROW_MARGIN_STYLE: React.CSSProperties = {
  marginBottom: '30px'
};

const TWITTER_ICON_STYLE: React.CSSProperties = {
  marginLeft: '30px'
};

const FB_ICON_STYLE: React.CSSProperties = {
  marginLeft: '30px'
};

const INSTA_ICON_STYLE: React.CSSProperties = {
  marginLeft: '45px'
};

const PAGES_ROW_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '12px',
  lineHeight: '15px',
  color: '#F26B55',
  marginBottom: '10px'
};

const PAGES_MARGIN_LEFT_STYLE: React.CSSProperties = {
  marginLeft: '30px'
};

const COPY_RIGHT_ROW_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'flex-start',
  alignItems: 'center',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '12px',
  lineHeight: '15px',
  textAlign: 'right',
  color: '#969696'
};
