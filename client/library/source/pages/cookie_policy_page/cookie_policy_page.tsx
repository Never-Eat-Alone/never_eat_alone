import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import * as Router from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;
}

export class CookiesPolicyPage extends React.Component<Properties> {
  public render(): JSX.Element {
    const { containerStyle, contentContainerStyle, backToTopButtonStyle
        } = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          containerStyle: DESKTOP_CONTAINER_STYLE,
          contentContainerStyle: DESKTOP_CONTENT_CONTAINER_STYLE,
          backToTopButtonStyle: BACK_TO_TOP_BUTTON_STYLE
        };
      }
      if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerStyle: TABLET_CONTAINER_STYLE,
          contentContainerStyle: TABLET_CONTENT_CONTAINER_STYLE,
          backToTopButtonStyle: BACK_TO_TOP_BUTTON_STYLE
        };
      }
      return {
        containerStyle: MOBILE_CONTAINER_STYLE,
        contentContainerStyle: MOBILE_CONTENT_CONTAINER_STYLE,
        backToTopButtonStyle: MOBILE_BACK_TO_TOP_BUTTON_STYLE
      };
    })();
    return (
      <div id='top' style={containerStyle} >
        <div style={contentContainerStyle} >
          <h1 style={H1_STYLE} >Cookies Policy</h1>
          <div style={ANSWER_STYLE} >
            Last updated January 28, 2022{'\n\n'}
            As described in our&nbsp;
            <Router.Link
                style={LINK_STYLE}
                className={css(styles.link)}
                to='/privacy_policy'
            >
              Privacy Policy
            </Router.Link>
            , we and our service providers use cookies and other technologies 
            to provide NEA and to enhance your experience. This Cookies Policy 
            sets out some further detail on how and why we use these 
            technologies on NEA, which includes any website, application, or 
            service we offer. By using our NEA, you consent to storage and 
            access to cookies and other technologies on your device, in 
            accordance with this Cookies Policy.{'\n\n'}
          </div>
          <h2 style={H2_STYLE} >
            What Are Cookies?
          </h2>
          <div style={ANSWER_STYLE} >
            Cookies are small pieces of data, stored in text files, that are 
            stored on your computer or other device when websites are loaded in 
            a browser. They are widely used to "remember" you and your 
            preferences, either for a single visit (through a "session cookie") 
            or for multiple repeat visits (using a "persistent cookie"). They 
            ensure a consistent and efficient experience for visitors, and 
            perform essential functions such as allowing users to register and 
            remain logged in. Cookies may be set by NEA (known as "first party 
            cookies"), or by third parties, such as those who serve content or 
            provide analytics services on the website ("third party cookies"). 
            Both websites and HTML emails may also contain other tracking 
            technologies such as "web beacons" or "pixels." These are typically 
            small transparent images that provide us with statistics, for 
            similar purposes as cookies. They are often used in conjunction 
            with cookies, though they are not stored on your computer in the 
            same way. As a result, if you disable cookies, web beacons may 
            still load, but their functionality will be restricted.{'\n\n'}
          </div>
          <h2 style={H2_STYLE} >
            How We Use Cookies
          </h2>
          <div style={ANSWER_STYLE} >
            We use cookies for a number of different purposes. Some cookies are 
            necessary for technical reasons; some enable a personalized 
            experience for both visitors and registered users. Some of these 
            cookies may be set when a page is loaded, or when a visitor takes a 
            particular action (clicking the "Join" button on an event, for 
            example). Many of the cookies we use are only set if you are a 
            registered NEA user (so you don’t have to log in every time, for 
            example), while others are set whenever you visit our website, 
            irrespective of whether you have an account. For more information 
            on the choices you have about the cookies we use, please see the 
            Controlling Cookies section below.{'\n\n'}
          </div>
          <h2 style={H2_STYLE} >
            Where We Place Cookies
          </h2>
          <div style={ANSWER_STYLE} >
            We set cookies in a number of different locations across our 
            services.{'\n\n'}
          </div>
          <h2 style={H2_STYLE} >
            Type Of Cookies
          </h2>
          <div style={ANSWER_STYLE} >
            The table below explains the type of cookies we use on our websites 
            and why we use them.{'\n\n\n'}
            <table style={TABLE_STYLE} >
              <thead style={TABLE_HEADER_STYLE} >
                <tr>
                    <th style={CATEGORY_HEAD_STYLE} >Category of cookies</th>
                    <th style={USE_COOKIES_HEAD_STYLE} >
                      Why we use these cookies
                    </th>
                </tr>
              </thead>
              <tbody>
                <tr style={TABLE_ROW_STYLE} >
                  <td style={CATEGORY_COLUMN_STYLE} >Required</td>
                  <td style={USE_COOKIES_COLUMN_STYLE} >
                    These cookies are essential for our websites and services 
                    to perform basic functions and are necessary for us to 
                    operate certain features. These include those required to 
                    allow registered users to authenticate and perform 
                    account-related functions, store preferences set by users 
                    such as account name, language, and location, and ensure 
                    our services are operating properly.
                  </td>
                </tr>
                <tr style={TABLE_ROW_STYLE} >
                  <td style={CATEGORY_COLUMN_STYLE} >
                    Analytics and Performance
                  </td>
                  <td style={USE_COOKIES_COLUMN_STYLE} >
                    These cookies allow us to optimize performance by 
                    collecting information on how users interact with our 
                    websites, including which pages are visited most, as well 
                    as other analytical data. We use these details to improve 
                    how our websites function and to understand how users 
                    interact with them.
                  </td>
                </tr>
              </tbody>
            </table>
            {'\n\n'}
          </div>
          <h2 style={H2_STYLE} >
            User Sites
          </h2>
          <div style={ANSWER_STYLE} >
            In addition to the cookies set on our own site, we utilize cookies 
            for our Site Stats feature. This tallies the unique numbers of 
            visitors to a site, as well as the number from specific geographic 
            locations. A visitor is counted when we see a user or browser for 
            the first time in a given period.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <h2 style={H2_STYLE} >
            Controlling Cookies
          </h2>
          <div style={ANSWER_STYLE} >
            Visitors may wish to restrict the use of cookies or completely 
            prevent them from being set. Most browsers provide ways to control 
            cookie behavior such as the length of time they are stored – either 
            through built-in functionality or by utilizing third party plugins. 
            If you disable cookies, please be aware that some of the features 
            of our service may not function correctly. To find out more on how 
            to manage and delete cookies, visit&nbsp;
            <a
                style={LINK_STYLE}
                className={css(styles.link)}
                href='https://aboutcookies.org'
                target='_blank'
            >
              aboutcookies.org
            </a>
            .{'\n\n'}
            On a mobile device, you may also have to adjust your settings to 
            limit tracking.{'\n\n'}
            Some analytics services we use, which place their own cookies or 
            web tags on your browser, offer their own opt out choices. For 
            example, you can opt out of Google Analytics by installing&nbsp;
            <a
                style={LINK_STYLE}
                className={css(styles.link)}
                href='https://tools.google.com/dlpage/gaoptout'
                target='_blank'
            >
              Google’s opt-out browser add-on
            </a>
            , from Hotjar by using the&nbsp;
            <a
                style={LINK_STYLE}
                className={css(styles.link)}
                href='https://www.hotjar.com/legal/policies/do-not-track'
                target='_blank'
            >
              Do Not Track header
            </a>
            , and from Nielsen by clicking the opt out link found within&nbsp;
            <a
                style={LINK_STYLE}
                className={css(styles.link)}
                href='https://www.nielsen.com/us/en/legal/privacy-statement/digital-measurement/'
                target='_blank'
            >
              Nielsen's Privacy Statement
            </a>
            .{'\n\n'}
          </div>
          <h2 style={H2_STYLE} >
            Our Internal Analytics Tool
          </h2>
          <div style={ANSWER_STYLE} >
            In order to better understand how our services are used, we monitor 
            certain user activities that take place within our products, 
            including page views and clicks on any links used when managing a 
            site via our dashboards. We call each one of these actions an 
            “event.” In general, we record the following data for each event: 
            IP address, user ID and username, user agent, referring URL, 
            timestamp of event, browser language, and country code. We use this 
            information to improve our products, make our marketing to you more 
            relevant, personalize your experience, and for the other purposes 
            described in our Privacy Policy. You may opt out of our analytics 
            program through your user settings. By doing so, you won’t share 
            information with our analytics tool about events or actions that 
            happen after the opt-out, while logged in to your NEA account. Note 
            that opting out does not disable the functionality of the actions 
            we track - for example, if you publish an event or list a 
            restaurant, we will still have record of that, but for an event or 
            action after you opt out, we will not have other data associated 
            with that action or event in the analytics tool.{'\n\n'}
          </div>
          <h2 style={H2_STYLE} >
            Revisions To This Policy
          </h2>
          <div style={ANSWER_STYLE} >
            We may modify this Cookies Policy from time to time. When we do, we 
            will provide notice to you by publishing the most current version 
            and revising the date at the top of this page. If we make any 
            material change to this Cookie Policy, we will provide additional 
            notice to you, such as by sending you an email, or displaying a 
            prominent notice on our Platform. By continuing to use NEA after 
            any changes come into effect, you agree to the revised Cookie 
            Policy.{'\n\n'}
          </div>
          <h2 style={H2_STYLE} >
            Contact Us
          </h2>
          <div style={ANSWER_STYLE} >
            If you have any questions about our use of cookies, you can find 
            the most relevant contact details in our&nbsp;
            <Router.Link
                style={LINK_STYLE}
                className={css(styles.link)}
                to='/privacy_policy'
            >
              Privacy Policy
            </Router.Link>
            .
          </div>
        </div>
        <HashLink
            style={backToTopButtonStyle}
            to='#top'
        >
          <img
            style={{...NO_SELECTION_STYLE, ...BACK_TO_TOP_ICON}}
            src='resources/help_page/icons/back_to_top.svg'
            alt='Back To Top'
            draggable={false}
          />
        </HashLink>
      </div>);
  }

  public componentDidMount(): void {
    const header = document.getElementById('shell-header');
    header.style.backgroundColor = '#F26B55';
    header.style.position = 'relative';
    const footer = document.getElementById('shell-footer');
    footer.style.backgroundColor = '#EFEFEF';
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  backgroundColor: '#FFFFFF',
  padding: '50px 10px 80px 60px'
};

const DESKTOP_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTAINER_STYLE,
  padding: '50px 20px'
};

const TABLET_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTAINER_STYLE,
  padding: '50px 20px'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTAINER_STYLE,
  padding: '50px 20px 30px 20px'
};

const TABLE_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  tableLayout: 'fixed',
  width: '100%',
  borderCollapse: 'collapse',
  border: '1px solid #F6F6F6',
  backgroundColor: '#FFFFFF',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 300,
  fontSize: '14px',
  lineHeight: '20px',
  color: '#000000',
  verticalAlign: 'center',
  textAlign: 'left'
};

const TABLE_HEADER_STYLE: React.CSSProperties = {
  backgroundColor: '#F6F6F6',
  height: '48px'
};

const CATEGORY_HEAD_STYLE: React.CSSProperties = {
  padding: '0px 0px 0px 40px',
  fontWeight: 300,
  fontStyle: 'normal',
  width: '211px'
};

const USE_COOKIES_HEAD_STYLE: React.CSSProperties = {
  padding: '0px 0px 0px 19px',
  fontWeight: 300,
  fontStyle: 'normal'
};

const TABLE_ROW_STYLE: React.CSSProperties = {
  height: '84px',
  border: '1px solid #F6F6F6'
};

const CATEGORY_COLUMN_STYLE: React.CSSProperties = {
  padding: '0px 0px 0px 40px',
  border: '1px solid #F6F6F6'
};

const USE_COOKIES_COLUMN_STYLE: React.CSSProperties = {
  padding: '0px 0px 0px 19px',
  border: '1px solid #F6F6F6'
};

const BACK_TO_TOP_BUTTON_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  position: 'fixed',
  bottom: '50px',
  right: '50px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '60px',
  height: '50px',
  padding: '10px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
  borderRadius: '50px',
  border: 'none',
  outline: 'none'
};

const MOBILE_BACK_TO_TOP_BUTTON_STYLE: React.CSSProperties = {
  ...BACK_TO_TOP_BUTTON_STYLE,
  right: '20px',
  bottom: '20px'
};

const BACK_TO_TOP_ICON: React.CSSProperties = {
  width: '20px',
  height: '20px'
};

const CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start'
};

const DESKTOP_CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTENT_CONTAINER_STYLE,
  width: '1060px'
};

const TABLET_CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTENT_CONTAINER_STYLE,
  width: '702px'
};

const MOBILE_CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTENT_CONTAINER_STYLE,
  width: '100%'
};

const NEW_LINE_STYLE: React.CSSProperties = {
  whiteSpace: 'pre'
};

const HEADING_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: '400',
  textTransform: 'uppercase',
  color: '#969696',
  padding: '0px',
  margin: '0px 0px 30px 0px'
};

const H1_STYLE: React.CSSProperties = {
  ...HEADING_STYLE,
  fontSize: '26px',
  lineHeight: '39px'
};

const H2_STYLE: React.CSSProperties = {
  ...HEADING_STYLE,
  fontSize: '23px',
  lineHeight: '34px'
};

const ANSWER_STYLE: React.CSSProperties = {
  display: 'inline-block',
  width: '100%',
  margin: '0px 0px 30px 0px',
  padding: '0px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: '300',
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  overflowWrap: 'break-word'
};

const NO_SELECTION_STYLE: React.CSSProperties = {
  WebkitTouchCallout: 'none',
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
  KhtmlUserSelect: 'none',
  userSelect: 'none'
};

const LINK_STYLE: React.CSSProperties = {
  display: 'inline',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '14px',
  lineHeight: '18px',
  textDecoration: 'none',
  color: '#F26B55',
  margin: '0',
  padding: '0',
  whiteSpace: 'pre-wrap',
  cursor: 'pointer'
};

const styles = StyleSheet.create({
  link: {
    ':hover': {
      textDecoration: 'underline',
	    textDecorationColor: '#F26B55',
	    '-webkit-text-decoration-color': '#F26B55'
    },
    ':active': {
      textDecoration: 'underline',
	    textDecorationColor: '#F26B55',
	    '-webkit-text-decoration-color': '#F26B55'
    }
  }
});
