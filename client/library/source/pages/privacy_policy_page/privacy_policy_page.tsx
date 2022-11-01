import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import * as Router from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;
}

export class PrivacyPolicyPage extends React.Component<Properties> {
  public render(): JSX.Element {
    const { containerStyle, contentContainerStyle, backToTopButtonStyle } = (
        () => {
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
      <div style={containerStyle} >
        <div style={contentContainerStyle} >
          <h1 style={H1_STYLE} >
            Policy Page (E.g. Privacy Policy)
          </h1>
          <p
              style={{...P_STYLE, ...DESCRIPTION_CONTAINER_STYLE,
              ...PAGE_DESCRIPTION_STYLE}}
          >
            Last updated Oct 5th, 2021{'\n\n'}
            Thank you for choosing to be part of our community at Never Eat 
            Alone Inc., doing business as NEA ("NEA", "we", "us", "our"). We 
            are committed to protecting your personal information and your 
            right to privacy. If you have any questions or concerns about 
            this privacy notice, or our practices with regards to your 
            personal information, please contact us at&nbsp;
            <a
                style={LINK_STYLE}
                className={css(styles.link)}
                href='mailto:info@nevereatalone.net'
                target='_blank'
                rel='noopener noreferrer'
            >
              info@nevereatalone.net
            </a>
            .{'\n\n'}
            When you visit our website&nbsp;
            <Router.Link
                style={LINK_STYLE}
                className={css(styles.link)}
                to='/'
            >
              nevereatalone.net
            </Router.Link>
            &nbsp;(the "Website"), and more generally, use any of our 
            services (the "Services", which include the Website), we 
            appreciate that you are trusting us with your personal 
            information. We take your privacy very seriously. In this privacy 
            notice, we seek to explain to you in the clearest way possible 
            what information we collect, how we use it and what rights you 
            have in relation to it. We hope you take some time to read 
            through it carefully, as it is important. If there are any terms 
            in this privacy notice that you do not agree with, please 
            discontinue use of our Services immediately.{'\n\n'}
            This privacy notice applies to all information collected through 
            our Services (which, as described above, includes our Website), 
            as well as, any related services, sales, marketing or events.
            {'\n\n'}
            <b>
              Please read this privacy notice carefully as it will help you 
              understand what we do with the information that we collect.
            </b>
          </p>
          <h2 style={{...HEADING_STYLE, ...CONTENT_LIST_HEADING_STYLE}} >
            table of contents
          </h2>
          <ol style={{...CONTENT_LIST_STYLE, ...OL_STYLE}} >
            <li>
              <HashLink
                  style={LINK_STYLE}
                  className={css(styles.link)}
                  to='#collected_info'
              >
                What information do we collect?
              </HashLink>
            </li>
            <li>
              <HashLink
                  style={LINK_STYLE}
                  className={css(styles.link)}
                  to='#use_info'
              >
                How do we use your information?
              </HashLink>
            </li>
            <li>
              <HashLink
                  style={LINK_STYLE}
                  className={css(styles.link)}
                  to='#shared_info'
              >
                Will your information be shared with anyone?
              </HashLink>  
            </li>
            <li>
              <HashLink
                  style={LINK_STYLE}
                  className={css(styles.link)}
                  to='#use_cookies'
              >
                Do we use cookies and other tracking technologies?
              </HashLink>
            </li>
            <li>
              <HashLink
                  style={LINK_STYLE}
                  className={css(styles.link)}
                  to='#social_logins'
              >
                How do we handle your social logins?
              </HashLink>
            </li>
            <li>
              <HashLink
                  style={LINK_STYLE}
                  className={css(styles.link)}
                  to='#keep_info'
              >
                How long do we keep your information?
              </HashLink>
            </li>
            <li>
              <HashLink
                  style={LINK_STYLE}
                  className={css(styles.link)}
                  to='#keep_info_safe'
              >
                How do we keep your information safe?
              </HashLink>
            </li>
            <li>
              <HashLink
                  style={LINK_STYLE}
                  className={css(styles.link)}
                  to='#minors_info'
              >
                Do we collect information from minors?
              </HashLink>
            </li>
            <li>
              <HashLink
                  style={LINK_STYLE}
                  className={css(styles.link)}
                  to='#privacy_rights'
              >
                What are your privacy rights?
              </HashLink>
            </li>
            <li>
              <HashLink
                  style={LINK_STYLE}
                  className={css(styles.link)}
                  to='#do_not_track_features'
              >
                Controls For DO-NOT-TRACK features
              </HashLink>
            </li>
            <li>
              <HashLink
                  style={LINK_STYLE}
                  className={css(styles.link)}
                  to='#california_privacy_rights'
              >
                Do California residents have specific privacy rights?
              </HashLink>
            </li>
            <li>
            <HashLink
                  style={LINK_STYLE}
                  className={css(styles.link)}
                  to='#update_notice'
              >
                Do we make updates to this notice?
              </HashLink>
            </li>
            <li>
              <HashLink
                  style={LINK_STYLE}
                  className={css(styles.link)}
                  to='#contact_about_notice'
              >
                How can you contact us about this notice?
              </HashLink>
            </li>
            <li>
              <HashLink
                  style={LINK_STYLE}
                  className={css(styles.link)}
                  to='#update_collected_data'
              >
                How can you review, update or delete the data we collect from 
                you?
              </HashLink>
            </li>
          </ol>
          <ol style={OL_STYLE} >
            <li
                id='collected_info'
                style={{...HEADING_STYLE, ...QUESTION_STYLE}}
            >
              What information do we collect?
            </li>
            <p
                style={{...P_STYLE, ...DESCRIPTION_CONTAINER_STYLE,
                ...DISCLOSE_OF_INFO_STYLE}}
            >
              <b>Personal information you disclose to us{'\n\n'}</b>
              <b style={IN_SHORT_BOLD_STYLE} >
                In Short
              </b>
              <span style={IN_SHORT_LINE_STYLE} >
                :&nbsp;&nbsp;We collect personal information that you provide 
                to us.{'\n\n'}
              </span>
              We collect personal information that you voluntarily provide to 
              us when you register on the Website, express an interest in 
              obtaining information about us or our products and Services, 
              when you participate in activities on the Website (such as by 
              posting messages in our online forums or entering competitions, 
              contests or giveaways) or otherwise when you contact us.{'\n\n'}
              The personal information that we collect 
              depends on the context of your interactions with us and the 
              Website, the choices you make and the products and features you 
              use. The personal information we collect may include the 
              following:{'\n\n'}
              <b>Personal Information Provided by You</b>.&nbsp;We collect 
              email addresses; usernames; passwords; and other similar 
              information.{'\n\n'}
              <b>Social Media Login Data</b>.&nbsp;We may provide you with 
              the option to register with us using your existing social media 
              account details, like your Facebook, Twitter or other social 
              media account. If you choose to register in this way, we will 
              collect the information described in the section called "HOW DO 
              WE HANDLE YOUR SOCIAL LOGINS?" below.{'\n\n'}
              All personal information that you provide to us must be true, 
              complete and accurate, and you must notify us of any changes to 
              such personal information.
            </p>
            <h2 style={{...HEADING_STYLE, ...H2_STYLE}} >
              Information automatically collected
            </h2>
            <p
                style={{...P_STYLE, ...DESCRIPTION_CONTAINER_STYLE,
                ...INFO_COLLECTED_PARAGRAPH_STYLE}}
            >
              <b style={IN_SHORT_BOLD_STYLE} >
                In Short
              </b>
              <span style={IN_SHORT_LINE_STYLE} >
                :&nbsp;&nbsp;Some information — such as your Internet 
                Protocol (IP) address and/or browser and device 
                characteristics — is collected automatically when you visit 
                our Website.{'\n\n'}
              </span>
              We automatically collect certain information when you visit, 
              use or navigate the Website. This information does not reveal 
              your specific identity (like your name or contact information) 
              but may include device and usage information, such as your IP 
              address, browser and device characteristics, operating system, 
              language preferences, referring URLs, device name, country, 
              location, information about how and when you use our Website 
              and other technical information. This information is primarily 
              needed to maintain the security and operation of our Website, 
              and for our internal analytics and reporting purposes.{'\n\n'}
              Like many businesses, we also collect information through 
              cookies and similar technologies.{'\n\n'}
              The information we collect includes:{'\n'}
              <ul style={UL_STYLE} >
                <li>
                  Log and Usage Data. Log and usage data is 
                  service-related, diagnostic, usage and performance 
                  information our servers automatically collect when you 
                  access or use our Website and which we record in log 
                  files. Depending on how you interact with us, this log 
                  data may include your IP address, device information, 
                  browser type and settings and information about your 
                  activity in the Website (such as the date/time stamps 
                  associated with your usage, pages and files viewed, 
                  searches and other actions you take such as which features 
                  you use), device event information (such as system 
                  activity, error reports (sometimes called 'crash dumps') 
                  and hardware settings).
                </li>
              </ul>
            </p>
            <li id='use_info' style={{...HEADING_STYLE, ...QUESTION_STYLE}} >
              How do we use your information?
            </li>
            <p
                style={{...P_STYLE, ...DESCRIPTION_CONTAINER_STYLE,
                ...USE_OF_INFO_STYLE}}
            >
              <b style={IN_SHORT_BOLD_STYLE} >
                In Short
              </b>
              <span style={IN_SHORT_LINE_STYLE} >
                :&nbsp;&nbsp;We process your information for purposes based 
                on legitimate business interests, the fulfillment of our 
                contract with you, compliance with our legal obligations, 
                and/or your consent.{'\n\n'}
              </span>
              We use personal information collected via our Website for a 
              variety of business purposes described below. We process your 
              personal information for these purposes in reliance on our 
              legitimate business interests, in order to enter into or 
              perform a contract with you, with your consent, and/or for 
              compliance with our legal obligations. We indicate the 
              specific processing grounds we rely on next to each purpose 
              listed below.{'\n\n'}
              We use the information we collect or receive:{'\n'}
              <ul style={UL_STYLE} >
                <li>
                  <b>
                    To facilitate account creation and logon process.&nbsp;
                  </b>
                  If you choose to link your account with us to a 
                  third-party account (such as your Google or Facebook 
                  account), we use the information you allowed us to collect 
                  from those third parties to facilitate account creation 
                  and logon process for the performance of the contract. See 
                  the section below headed "HOW DO WE HANDLE YOUR SOCIAL 
                  LOGINS?" for further information.
                </li>
                <li>
                  <b>To post testimonials.&nbsp;</b>
                  We post testimonials on our Website that may contain 
                  personal information. Prior to posting a testimonial, we 
                  will obtain your consent to use your name and the content 
                  of the testimonial. If you wish to update, or delete your 
                  testimonial, please contact us at&nbsp;
                  <a
                      style={LINK_STYLE}
                      className={css(styles.link)}
                      href='mailto:info@nevereatalone.net'
                      target='_blank'
                      rel='noopener noreferrer'
                  >
                    info@nevereatalone.net
                  </a>
                  &nbsp;and be sure to include your name, testimonial 
                  location, and contact information.
                </li>
                <li>
                  <b>Request feedback.&nbsp;</b>
                  We may use your information to request feedback and to 
                  contact you about your use of our Website.
                </li>
                <li>
                  <b>To enable user-to-user communications.&nbsp;</b>
                  We may use your information in order to enable 
                  user-to-user communications with each user's consent.
                </li>
                <li>
                  <b>To manage user accounts.&nbsp;</b>
                  We may use your information for the purposes of managing 
                  our account and keeping it in working order.
                </li>
                <li>
                  <b>To send administrative information to you.&nbsp;</b>
                  We may use your personal information to send you product, 
                  service and new feature information and/or information 
                  about changes to our terms, conditions, and policies.
                </li>
                <li>
                  <b>To protect our Services.&nbsp;</b>
                  We may use your information as part of our efforts to keep 
                  our Website safe and secure (for example, for fraud 
                  monitoring and prevention).
                </li>
                <li>
                  <b>
                    To enforce our terms, conditions and policies for 
                    business purposes, to comply with legal and regulatory 
                    requirements or in connection with our contract.
                  </b>
                </li>
                <li>
                  <b>To respond to legal requests and prevent harm.&nbsp;</b>
                  If we receive a subpoena or other legal request, we may 
                  need to inspect the data we hold to determine how to 
                  respond.
                </li>
                <li>
                  <b>
                    To send you marketing and promotional 
                    communications.&nbsp;
                  </b>
                  We and/or our third-party marketing partners may use the 
                  personal information you send to us for our marketing 
                  purposes, if this is in accordance with your marketing 
                  preferences. For example, when expressing an interest in 
                  obtaining information about us or our Website, subscribing 
                  to marketing or otherwise contacting us, we will collect 
                  personal information from you. You can opt-out of our 
                  marketing emails at any time (see the "WHAT ARE YOUR 
                  PRIVACY RIGHTS?" below).
                </li>
                <li>
                  <b>Deliver targeted advertising to you.&nbsp;</b>
                  We may use your information to develop and display 
                  personalized content and advertising (and work with third 
                  parties who do so) tailored to your interests and/or 
                  location and to measure its effectiveness.
                </li>
              </ul>
            </p>
            <li
                id='shared_info'
                style={{...HEADING_STYLE, ...QUESTION_STYLE}}
            >
              Will your information be shared with anyone?
            </li>
            <p
                style={{...P_STYLE, ...DESCRIPTION_CONTAINER_STYLE,
                ...SHARE_INFO_STYLE}}
            >
              <b style={IN_SHORT_BOLD_STYLE} >
                In Short
              </b>
              <span style={IN_SHORT_LINE_STYLE} >
                :&nbsp;&nbsp;We only share information with your consent, to 
                comply with laws, to provide you with services, to protect 
                your rights, or to fulfill business obligations.{'\n\n'}
              </span>
              We may process or share your data that we hold based on the 
              following legal basis:{'\n'}
              <ul style={UL_STYLE} >
                <li>
                  <b>Consent</b>:&nbsp;We may process your data if you have 
                  given us specific consent to use your personal information 
                  for a specific purpose.
                </li>
                <li>
                  <b>Legitimate Interests</b>:&nbsp;We may process your data 
                  when it is reasonably necessary to achieve our legitimate 
                  business interests.
                </li>
                <li>
                  <b>Performance of a Contract</b>:&nbsp;Where we have 
                  entered into a contract with you, we may process your 
                  personal information to fulfill the terms of our contract.
                </li>
                <li>
                  <b>Legal Obligations</b>:&nbsp;We may disclose your 
                  information where we are legally required to do so in 
                  order to comply with applicable law, governmental 
                  requests, a judicial proceeding, court order, or legal 
                  process, such as in response to a court order or a 
                  subpoena (including in response to public authorities to 
                  meet national security or law enforcement requirements).
                </li>
                <li>
                  <b>Vital Interests</b>:&nbsp;We may disclose your 
                  information where we believe it is necessary to 
                  investigate, prevent, or take action regarding potential 
                  violations of our policies, suspected fraud, situations 
                  involving potential threats to the safety of any person 
                  and illegal activities, or as evidence in litigation in 
                  which we are involved.
                </li>
                <span style={SPAN_STYLE} >
                  More specifically, we may need to process your data or share 
                  your personal information in the following situations:{'\n'}
                </span>
                <li>
                  <b>Business Transfers.&nbsp;</b>We may share or transfer 
                  your information in connection with, or during 
                  negotiations of, any merger, sale of company assets, 
                  financing, or acquisition of all or a portion of our 
                  business to another company.
                </li>
                <li>
                  <b>Google Maps Platform APIs.</b>We may share your 
                  information with certain Google Maps Platform APIs (e.g., 
                  Google Maps API, Place API). To find out more about 
                  Google’s Privacy Policy, please refer to this link.
                </li>
                <li>
                  <b>Other Users.&nbsp;</b>When you share personal 
                  information (for example, by posting comments, 
                  contributions or other content to the Website) or 
                  otherwise interact with public areas of the Website, such 
                  personal information may be viewed by all users and may be 
                  publicly made available outside the Website in 
                  perpetuity. If you interact with other users of our 
                  Website and register for our Website through a social 
                  network (such as Facebook), your contacts on the social 
                  network will see your name, profile photo, and 
                  descriptions of your activity. Similarly, other users 
                  will be able to view descriptions of your activity, 
                  communicate with you within our Website, and view your 
                  profile.
                </li>
              </ul>
            </p>
            <li
                id='use_cookies'
                style={{...HEADING_STYLE, ...QUESTION_STYLE}}
            >
              Do we use cookies and other tracking technologies?
            </li>
            <p
                style={{...P_STYLE, ...DESCRIPTION_CONTAINER_STYLE,
                ...COOKIE_INFO_STYLE}}
            >
              <b style={IN_SHORT_BOLD_STYLE} >
                In Short
              </b>
              <span style={IN_SHORT_LINE_STYLE} >
                :&nbsp;&nbsp;We may use cookies and other tracking 
                technologies to collect and store your information.{'\n\n'}
              </span>
              We may use cookies and similar tracking technologies (like web 
              beacons and pixels) to access or store information. Specific 
              information about how we use such technologies and how you can 
              refuse certain cookies is set out in our Cookie Notice.
            </p>
            <li
                id='social_logins'
                style={{...HEADING_STYLE, ...QUESTION_STYLE}}
            >
              How do we handle your social logins?
            </li>
            <p
                style={{...P_STYLE, ...DESCRIPTION_CONTAINER_STYLE,
                ...SOCIAL_LOGIN_INFO_STYLE}}
            >
              <b style={IN_SHORT_BOLD_STYLE} >
                In Short
              </b>
              <span style={IN_SHORT_LINE_STYLE} >
                :&nbsp;&nbsp;If you choose to register or log in to our 
                services using a social media account, we may have access to 
                certain information about you.{'\n\n'}
              </span>
              Our Website offers you the ability to register and login using 
              your third-party social media account details (like your 
              Facebook or Twitter logins). Where you choose to do this, we 
              will receive certain profile information about you from your 
              social media provider. The profile information we receive may 
              vary depending on the social media provider concerned, but 
              will often include your name, email address, friends list, 
              profile picture as well as other information you choose to 
              make public on such social media platform.{'\n\n'}
              We will use the information we receive only for the purposes 
              that are described in this privacy notice or that are 
              otherwise made clear to you on the relevant Website. Please 
              note that we do not control, and are not responsible for, 
              other uses of your personal information by your third-party 
              social media provider. We recommend that you review their 
              privacy notice to understand how they collect, use and share 
              your personal information, and how you can set your privacy 
              preferences on their sites and apps.
            </p>
            <li id='keep_info' style={{...HEADING_STYLE, ...QUESTION_STYLE}} >
              How long do we keep your information?
            </li>
            <p
                style={{...P_STYLE, ...DESCRIPTION_CONTAINER_STYLE,
                ...KEEPING_DATA_STYLE}}
            >
              <b style={IN_SHORT_BOLD_STYLE} >
                In Short
              </b>
              <span style={IN_SHORT_LINE_STYLE} >
                :&nbsp;&nbsp;We keep your information for as long as 
                necessary to fulfill the purposes outlined in this privacy 
                notice unless otherwise required by law.{'\n\n'}
              </span>
              We will only keep your personal information for as long as it 
              is necessary for the purposes set out in this privacy notice, 
              unless a longer retention period is required or permitted by 
              law (such as tax, accounting or other legal requirements). No 
              purpose in this notice will require us keeping your personal 
              information for longer than the period of time in which users 
              have an account with us.{'\n\n'}
              When we have no ongoing legitimate business need to process 
              your personal information, we will either delete or anonymize 
              such information, or, if this is not possible (for example, 
              because your personal information has been stored in backup 
              archives), then we will securely store your personal 
              information and isolate it from any further processing until 
              deletion is possible.
            </p>
            <li
                id='keep_info_safe'
                style={{...HEADING_STYLE, ...QUESTION_STYLE}}
            >
              How do we keep your information safe?
            </li>
            <p
                style={{...P_STYLE, ...DESCRIPTION_CONTAINER_STYLE,
                ...INFO_SAFETY_STYLE}}
            >
              <b style={IN_SHORT_BOLD_STYLE} >
                In Short
              </b>
              <span style={IN_SHORT_LINE_STYLE} >
                :&nbsp;&nbsp;We aim to protect your personal information 
                through a system of organizational and technical security 
                measures.{'\n\n'}
              </span>
              We have implemented appropriate technical and organizational 
              security measures designed to protect the security of any 
              personal information we process. However, despite our 
              safeguards and efforts to secure your information, no 
              electronic transmission over the Internet or information 
              storage technology can be guaranteed to be 100% secure, so we 
              cannot promise or guarantee that hackers, cybercriminals, or 
              other unauthorized third parties will not be able to defeat our 
              security, and improperly collect, access, steal, or modify your 
              information. Although we will do our best to protect your 
              personal information, transmission of personal information to 
              and from our Website is at your own risk. You should only 
              access the Website within a secure environment.
            </p>
            <li
                id='minors_info'
                style={{...HEADING_STYLE, ...QUESTION_STYLE}}
            >
              Do we collect information from minors?
            </li>
            <p
                style={{...P_STYLE, ...DESCRIPTION_CONTAINER_STYLE,
                ...MINORS_INFO_STYLE}}
            >
              <b style={IN_SHORT_BOLD_STYLE} >
                In Short
              </b>
              <span style={IN_SHORT_LINE_STYLE} >
                :&nbsp;&nbsp;We do not knowingly collect data from or market 
                to children under 18 years of age.{'\n\n'}
              </span>
              We do not knowingly solicit data from or market to children 
              under 18 years of age. By using the Website, you represent that 
              you are at least 18 or that you are the parent or guardian of 
              such a minor and consent to such minor dependent’s use of the 
              Website. If we learn that personal information from users less 
              than 18 years of age has been collected, we will deactivate 
              the account and take reasonable measures to promptly delete 
              such data from our records. If you become aware of any data we 
              may have collected from children under age 18, please contact 
              us at&nbsp;
              <a
                  style={LINK_STYLE}
                  className={css(styles.link)}
                  href='mailto:info@nevereatalone.net'
                  target='_blank'
                  rel='noopener noreferrer'
              >
                info@nevereatalone.net
              </a>
              .
            </p>
            <li
                id='privacy_rights'
                style={{...HEADING_STYLE, ...QUESTION_STYLE}}
            >
              What are your privacy rights?
            </li>
            <p
                style={{...P_STYLE, ...DESCRIPTION_CONTAINER_STYLE,
                ...PRIVACY_RIGHTS_STYLE}}
            >
              <b style={IN_SHORT_BOLD_STYLE} >
                In Short
              </b>
              <span style={IN_SHORT_LINE_STYLE} >
                :&nbsp;&nbsp;You may review, change, or terminate your 
                account at any time.{'\n\n'}
              </span>
              If you are a resident in the EEA or UK and you believe we are 
              unlawfully processing your personal information, you also have 
              the right to complain to your local data protection 
              supervisory authority. You can find their contact details 
              here:&nbsp;
              <a
                  style={LINK_STYLE}
                  className={css(styles.link)}
                  href='https://ec.europa.eu/newsroom/article29/items/612080'
                  target='_blank'
              >
                https://ec.europa.eu/newsroom/article29/items/612080
              </a>
              .{'\n\n'}
              If you are a resident in Switzerland, the contact details for 
              the data protection authorities are available here:&nbsp;
              <a
                  style={LINK_STYLE}
                  className={css(styles.link)}
                  href='https://www.edoeb.admin.ch/edoeb/en/home.html'
                  target='_blank'
              >
                https://www.edoeb.admin.ch/edoeb/en/home.html
              </a>
              .{'\n\n'}
              If you have questions or comments about your privacy rights, 
              you may email us at&nbsp;
              <a
                  style={LINK_STYLE}
                  className={css(styles.link)}
                  href='mailto:info@nevereatalone.net'
                  target='_blank'
                  rel='noopener noreferrer'
              >
                info@nevereatalone.net
              </a>
              .
            </p>
            <h2 style={{...HEADING_STYLE, ...H2_STYLE}} >
              ACCount information
            </h2>
            <p
                style={{...P_STYLE, ...DESCRIPTION_CONTAINER_STYLE,
                ...ACCOUNT_INFO_STYLE}}
            >
              If you would at any time like to review or change the 
              information in your account or terminate your account, you 
              can:{'\n'}
              <ul style={UL_STYLE} >
                <li>
                  Log in to your account settings and update your user 
                  account.
                </li>
                <li>
                  Contact us using the contact information provided.
                </li>
              </ul>
              {'\n'}Upon your request to terminate your account, we will 
              deactivate or delete your account and information from our 
              active databases. However, we may retain some information in 
              our files to prevent fraud, troubleshoot problems, assist with 
              any investigations, enforce our Terms of Use and/or comply with 
              applicable legal requirements.{'\n\n'}
              <b>Cookies and similar technologies</b>: Most Web browsers are 
              set to accept cookies by default. If you prefer, you can 
              usually choose to set your browser to remove cookies and to 
              reject cookies. If you choose to remove cookies or reject 
              cookies, this could affect certain features or services of our 
              Website. To opt-out of interest-based advertising by 
              advertisers on our Website visit&nbsp;
              <a
                  style={LINK_STYLE}
                  className={css(styles.link)}
                  href='http://www.aboutads.info/choices'
                  target='_blank'
              >
                http://www.aboutads.info/choices
              </a>
              .{'\n\n'}
              <b>Opting out of email marketing</b>: You can unsubscribe from 
              our marketing email list at any time by clicking on the 
              unsubscribe link in the emails that we send or by contacting us 
              using the details provided below. You will then be removed from 
              the marketing email list — however, we may still communicate 
              with you, for example to send you service-related emails that 
              are necessary for the administration and use of your account, 
              to respond to service requests, or for other non-marketing 
              purposes. To otherwise opt-out, you may:
              <ul style={UL_STYLE} >
                <li>
                  Access your account settings and update your preferences.
                </li>
              </ul>
            </p>
            <li
                id='do_not_track_features'
                style={{...HEADING_STYLE, ...QUESTION_STYLE}}
            >
              Controls For DO-NOT-TRACK features
            </li>
            <p
                style={{...P_STYLE, ...DESCRIPTION_CONTAINER_STYLE,
                ...TRACK_STYLE}}
            >
              Most web browsers and some mobile operating systems and mobile 
              applications include a Do-Not-Track ("DNT") feature or setting 
              you can activate to signal your privacy preference not to have 
              data about your online browsing activities monitored and 
              collected. At this stage no uniform technology standard for 
              recognizing and implementing DNT signals has been finalized. As 
              such, we do not currently respond to DNT browser signals or any 
              other mechanism that automatically communicates your choice not 
              to be tracked online. If a standard for online tracking is 
              adopted that we must follow in the future, we will inform you 
              about that practice in a revised version of this privacy notice.
            </p>
            <li
                id='california_privacy_rights'
                style={{...HEADING_STYLE, ...QUESTION_STYLE}}
            >
              Do California residents have specific privacy rights?
            </li>
            <p
                style={{...P_STYLE, ...DESCRIPTION_CONTAINER_STYLE,
                ...CALIFORNIA_STYLE}}
            >
              <b style={IN_SHORT_BOLD_STYLE} >
                In Short
              </b>
              <span style={IN_SHORT_LINE_STYLE} >
                :&nbsp;&nbsp;Yes, if you are a resident of California, you 
                are granted specific rights regarding access to your personal 
                information.{'\n\n'}
              </span>
              California Civil Code Section 1798.83, also known as the "Shine 
              The Light" law, permits our users who are California residents 
              to request and obtain from us, once a year and free of charge, 
              information about categories of personal information (if any) 
              we disclosed to third parties for direct marketing purposes and 
              the names and addresses of all third parties with which we 
              shared personal information in the immediately preceding 
              calendar year. If you are a California resident and would like 
              to make such a request, please submit your request in writing 
              to us using the contact information provided below.{'\n\n'}
              If you are under 18 years of age, reside in California, and 
              have a registered account with the Website, you have the right 
              to request removal of unwanted data that you publicly post on 
              the Website. To request removal of such data, please contact us 
              using the contact information provided below, and include the 
              email address associated with your account and a statement that 
              you reside in California. We will make sure the data is not 
              publicly displayed on the Website, but please be aware that the 
              data may not be completely or comprehensively removed from all 
              our systems (e.g. backups, etc.).
            </p>
            <li
                id='update_notice'
                style={{...HEADING_STYLE, ...QUESTION_STYLE}}
            >
              Do we make updates to this notice?
            </li>
            <p
                style={{...P_STYLE, ...DESCRIPTION_CONTAINER_STYLE,
                ...NOTICE_STYLE}}
            >
              <b style={IN_SHORT_BOLD_STYLE} >
                In Short
              </b>
              <span style={IN_SHORT_LINE_STYLE} >
                :&nbsp;&nbsp;Yes, we will update this notice as necessary to 
                stay compliant with relevant laws.{'\n\n'}
              </span>
              We may update this privacy notice from time to time. The 
              updated version will be indicated by an updated "Revised" date 
              and the updated version will be effective as soon as it is 
              accessible. If we make material changes to this privacy notice, 
              we may notify you either by prominently posting a notice of 
              such changes or by directly sending you a notification. We 
              encourage you to review this privacy notice frequently to be 
              informed of how we are protecting your information.
            </p>
            <li
                id='contact_about_notice'
                style={{...HEADING_STYLE, ...QUESTION_STYLE}}
            >
              How can you contact us about this notice?
            </li>
            <p
                style={{...P_STYLE, ...DESCRIPTION_CONTAINER_STYLE,
                ...CONTACT_STYLE}}
            >
              If you have questions or comments about this notice, you may 
              email us at&nbsp;
              <a
                  style={LINK_STYLE}
                  className={css(styles.link)}
                  href='mailto:info@nevereatalone.net'
                  target='_blank'
                  rel='noopener noreferrer'
              >
                info@nevereatalone.net
              </a>
              &nbsp;or by post to:{'\n\n'}
              <b>Never Eat Alone Inc.</b>{'\n'}
              55 Eglinton Ave E{'\n'}
              Suite 710{'\n'}
              Toronto, Ontario M4P 1G8{'\n'}
              Canada
            </p>
            <li
                id='update_collected_data'
                style={{...HEADING_STYLE, ...QUESTION_STYLE}}
            >
              How can you review, update or delete the data we collect from 
              you?
            </li>
            <p
                style={{...P_STYLE, ...DESCRIPTION_CONTAINER_STYLE,
                ...DATA_STYLE}}
            >
              Based on the applicable laws of your country, you may have the 
              right to request access to the personal information we collect 
              from you, change that information, or delete it in some 
              circumstances. To request to review, update, or delete your 
              personal information, please visit&nbsp;
              <Router.Link
                  style={LINK_STYLE}
                  className={css(styles.link)}
                  to='/help'
              >
                Help
              </Router.Link>
              .
            </p>
          </ol>
        </div>
        <HashLink
            style={backToTopButtonStyle}
            to='#top'
        >
          <img
            style={BACK_TO_TOP_ICON}
            src='resources/help_page/icons/back_to_top.svg'
            alt='Back To Top'
          />
        </HashLink>
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

const CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '1006px',
  whiteSpace: 'pre-wrap'
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

const HEADING_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
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
  fontWeight: 300,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  overflowWrap: 'break-word'
};

const OL_STYLE: React.CSSProperties = {
  margin: '0px',
  listStylePosition: 'outside',
  paddingLeft: '20px'
};

const LINK_STYLE: React.CSSProperties = {
  textDecoration: 'none',
  color: '#F26B55',
  margin: '0',
  padding: '0',
  cursor: 'pointer'
};

const LINK_SPAN_STYLE: React.CSSProperties = {
  margin: '0px',
  padding: '0px',
  display: 'inline'
};

const UL_STYLE: React.CSSProperties = {
  margin: '0px',
  paddingLeft: '25px',
  listStyleType: 'disc',
  listStylePosition: 'outside'
};

const P_STYLE: React.CSSProperties = {
  padding: '0px',
  margin: '0px'
};

const DESCRIPTION_CONTAINER_STYLE: React.CSSProperties = {
  width: '100%',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '20px',
  color: '#000000',
  marginBottom: '30px'
};

const PAGE_DESCRIPTION_STYLE: React.CSSProperties = {
  height: '320px'
};

const CONTENT_LIST_HEADING_STYLE: React.CSSProperties = {
  height: '34px',
  minWidth: '172px',
  fontSize: '23px',
  lineHeight: '34px'
};

const CONTENT_LIST_STYLE: React.CSSProperties = {
  height: '300px',
  minWidth: '946px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '14px',
  lineHeight: '20px',
  color: '#F26B55',
  textTransform: 'uppercase',
  marginBottom: '30px'
};

const QUESTION_STYLE: React.CSSProperties = {
  fontSize: '23px',
  lineHeight: '34px'
};

const DISCLOSE_OF_INFO_STYLE: React.CSSProperties = {
  height: '378px'
};

const INFO_COLLECTED_PARAGRAPH_STYLE: React.CSSProperties = {
  height: '320px'
};

const USE_OF_INFO_STYLE: React.CSSProperties = {
  height: '614px'
};

const SHARE_INFO_STYLE: React.CSSProperties = {
  height: '440px'
};

const COOKIE_INFO_STYLE: React.CSSProperties = {
  height: '96px'
};

const SOCIAL_LOGIN_INFO_STYLE: React.CSSProperties = {
  height: '236px'
};

const KEEPING_DATA_STYLE: React.CSSProperties = {
  height: '200px'
};

const INFO_SAFETY_STYLE: React.CSSProperties = {
  height: '156px'
};

const MINORS_INFO_STYLE: React.CSSProperties = {
  height: '136px'
};

const PRIVACY_RIGHTS_STYLE: React.CSSProperties = {
  height: '160px'
};

const ACCOUNT_INFO_STYLE: React.CSSProperties = {
  height: '360px'
};

const TRACK_STYLE: React.CSSProperties = {
  height: '120px'
};

const CALIFORNIA_STYLE: React.CSSProperties = {
  height: '236px'
};

const NOTICE_STYLE: React.CSSProperties = {
  height: '116px'
};

const CONTACT_STYLE: React.CSSProperties = {
  height: '144px'
};

const DATA_STYLE: React.CSSProperties = {
  height: '60px',
  marginBottom: '0px'
};

const IN_SHORT_BOLD_STYLE: React.CSSProperties = {
  fontWeight: 700,
  fontStyle: 'italic'
};

const IN_SHORT_LINE_STYLE: React.CSSProperties = {
  fontWeight: 200,
  fontStyle: 'italic'
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

const styles = StyleSheet.create({
  link: {
    ':hover': {
      textDecoration: 'underline',
	    textDecorationColor: '#F26B55',
	    '-webkit-text-decoration-color': '#F26B55'
    },
    ':focus': {
      textDecoration: 'underline',
	    textDecorationColor: '#F26B55',
	    '-webkit-text-decoration-color': '#F26B55'
    },
    ':focus-within': {
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
