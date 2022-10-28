import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import * as Router from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { InviteAFoodieButton } from '../../components';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** Indicates Invite a foodie button is clicked. */
  onInviteAFoodieClick: () => void;
}

export class HelpPage extends React.Component<Properties> {
  public render(): JSX.Element {
    const { containerStyle, contentStyle } = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          containerStyle: DESKTOP_CONTAINER_STYLE,
          contentStyle: DESKTOP_CONTENT_CONTAINER_STYLE
        };
      }
      if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerStyle: TABLET_CONTAINER_STYLE,
          contentStyle: TABLET_CONTENT_CONTAINER_STYLE
        };
      }
      return {
        containerStyle: MOBILE_CONTAINER_STYLE,
        contentStyle: MOBILE_CONTENT_CONTAINER_STYLE
      };
    })();
    return (
      <div id='top' style={containerStyle} >
        <div style={contentStyle} >
          <h1 style={{...HEADING_STYLE, ...H1_STYLE}} >Help</h1>
          <div style={SEARCH_TITLE_STYLE} >
            What do you need help with? Search within this page or click on a 
            topic below:
          </div>
          <div style={TOPICS_ROW} >
            <HashLink
                style={TOPICS_BUTTON_STYLE}
                className={css(styles.topicsButton)}
                to='#attending_an_event'
                onMouseLeave={this.handleMouseLeave}
            >
              <div style={TOPICS_ICON_CONTAINER_STYLE} >
                <img
                  style={{...NO_SELECTION_STYLE,
                    ...ATTENDING_AN_EVENT_ICON_STYLE}}
                  src='resources/help_page/icons/attending_an_event.svg'
                  alt='Attending An Event'
                  draggable={false}
                />
              </div>
              <div style={TOPICS_BUTTON_TEXT_STYLE} >Attending An Event</div>
            </HashLink>
            <HashLink
                style={TOPICS_BUTTON_STYLE}
                className={css(styles.topicsButton)}
                to='#restaurant'
                onMouseLeave={this.handleMouseLeave}
            >
              <div style={TOPICS_ICON_CONTAINER_STYLE} >
                <img
                  style={{...NO_SELECTION_STYLE, ...RESTAURANT_ICON_STYLE}}
                  src='resources/help_page/icons/restaurant.svg'
                  alt='Restaurant'
                  draggable={false}
                />
              </div>
              <div style={TOPICS_BUTTON_TEXT_STYLE} >Restaurant</div>
            </HashLink>
          </div>
          <div style={{...TOPICS_ROW, ...TOPICS_SECOND_ROW_STYLE}} >
            <HashLink
                style={TOPICS_BUTTON_STYLE}
                className={css(styles.topicsButton)}
                to='#settings_and_support'
                onMouseLeave={this.handleMouseLeave}
            >
              <div style={TOPICS_ICON_CONTAINER_STYLE} >
                <img
                  style={{...NO_SELECTION_STYLE, ...SETTINGS_ICON_STYLE}}
                  src='resources/help_page/icons/settings_and_support.svg'
                  alt='Settings and Support'
                  draggable={false}
                />
              </div>
              <div style={TOPICS_BUTTON_TEXT_STYLE} >Settings and Support</div>
            </HashLink>
            <HashLink
                style={TOPICS_BUTTON_STYLE}
                className={css(styles.topicsButton)}
                to='#my_profile'
                onMouseLeave={this.handleMouseLeave}
            >
              <div style={TOPICS_ICON_CONTAINER_STYLE} >
                <img
                  style={{...NO_SELECTION_STYLE, ...MY_PROFILE_ICON_STYLE}}
                  src='resources/help_page/icons/my_profile.svg'
                  alt='My Profile'
                  draggable={false}
                />
              </div>
              <div style={TOPICS_BUTTON_TEXT_STYLE} >My Profile</div>
            </HashLink>
            <HashLink
                style={TOPICS_BUTTON_STYLE}
                className={css(styles.topicsButton)}
                to='#community'
                onMouseLeave={this.handleMouseLeave}
            >
              <div style={TOPICS_ICON_CONTAINER_STYLE} >
                <img
                  style={{...NO_SELECTION_STYLE, ...COMMUNITY_ICON_STYLE}}
                  src='resources/help_page/icons/community.svg'
                  alt='Community'
                  draggable={false}
                />
              </div>
              <div style={TOPICS_BUTTON_TEXT_STYLE} >Community</div>
            </HashLink>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h2
              style={{...HEADING_STYLE, ...H2_STYLE, ...ORANGE_TEXT_STYLE}}
              id='attending_an_event'
          >
            Attending an Event
          </h2>
          <h3 style={QUESTION_STYLE} >
            How do I join events?
          </h3>
          <div style={ANSWER_STYLE} >
            <p style={P_STYLE} >
              Log in and locate the event you are interested in. Hit the button 
              “Join this Event” located on the right of the event page. (If you 
              are not logged in, you need to first request an account. See&nbsp;
            </p>
            <span style={LINK_SPAN_STYLE} >
              <HashLink
                  style={LINK_STYLE}
                  className={css(styles.linkStates)}
                  to='#sign_up'
              >
                How do I sign up for NEA?
              </HashLink>)
            </span>
            <p style={P_STYLE} >
              {'\n\n'}
              If the event has a fee, you’ll see a payment options window 
              pop-up. You can checkout with Google Pay, Apple Pay, PayPal, or 
              by adding a card to your account.{'\n\n'}
              To learn how to add a card to your account, see&nbsp;
            </p>
            <span style={LINK_SPAN_STYLE} >
              <HashLink
                  style={LINK_STYLE}
                  className={css(styles.linkStates)}
                  to='#add_payment'
              >
                How do I add a payment method to my account?
              </HashLink>
            </span>
            <p style={P_STYLE} >
              {'\n\n'}
              Select the payment option you would like to use and follow the 
              steps on-screen. You may be asked to log in to your Google 
              Pay/Apple Pay/PayPal account if you’re using one of those 
              options.{'\n\n'}
              Once the payment is approved, you’ll see a Payment Complete 
              screen. You can now close this pop-up, or hit the “Back to Event” 
              button.{'\n\n'}
              Once you’ve joined an event, it will appear on your&nbsp;
            </p>
            <span style={LINK_SPAN_STYLE} >
              <Router.Link
                  to='/'
                  style={LINK_STYLE}
                  className={css(styles.linkStates)}
              >
                Homepage
              </Router.Link>
            </span>
            <p style={P_STYLE} >&nbsp;and your&nbsp;</p>
            <span style={LINK_SPAN_STYLE} >
              <Router.Link
                  to='/users/profile/:id'
                  style={LINK_STYLE}
                  className={css(styles.linkStates)}
              >
                Profile page
              </Router.Link>
            </span>
            <p style={P_STYLE} >. You can also check your&nbsp;</p>
            <span style={LINK_SPAN_STYLE} >
              <Router.Link
                  to='/users/settings/:id'
                  style={LINK_STYLE}
                  className={css(styles.linkStates)}
              >
                Payment History
              </Router.Link>
            </span>
            <p style={P_STYLE} >&nbsp;for a record of your events and fees.</p>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How do I sign up for NEA?
          </h3>
          <div style={ANSWER_STYLE} >
            From the Homepage, hit the “Become a Member” or the “Join Us” 
            button at the top of the page. You can also hit the “Request an 
            Account” button from an event page. You’ll see a form asking for 
            your name and email, and if you have it, the name or username of 
            the member who told you about NEA. The email you use here will be 
            the one you use to log in to your account.{'\n'}
            Fill in the information and hit the “Request to Join!” button. 
            We’ll send you an email once your account is approved.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How much do events cost?
          </h3>
          <div style={ANSWER_STYLE} >
            The price of every event is determined by the restaurant, menu, and 
            seating availability. You can find the price of each event on the 
            event page.{'\n'}
            Here are some examples of fees for events:{'\n\n'}
            Event Fee{'\n'}
            In order to ensure a good experience for both you and the 
            restaurants we host at, we may charge a small fee to reserve your 
            seat for certain events. Typically $2-5 CAD, this charge helps us 
            fill our events with people who are committed to attending.{'\n'}
            This fee is refundable if you remove your seat more than 24 hours 
            in advance of an event.{'\n'}
            Cancellation Fee{'\n'}
            Some restaurants may charge a no-show fee for last-minute 
            cancellations. For the events we host at these restaurants, 
            NeverEatAlone puts a hold on your payment method for the 
            restaurant’s cancellation rate. This may be charged if you don’t 
            attend your seat.{'\n\n'}
            For more information, see&nbsp;
            <HashLink
                style={LINK_STYLE}
                className={css(styles.linkStates)}
                to='#are_events_refundable'
            >
              Are event fees refundable?
            </HashLink>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            I want to join an event, but it’s full
          </h3>
          <div style={ANSWER_STYLE} >
            Currently, there is no way to join an event if it is full. If an 
            attendee drops out of an event, a seat will open up and the option 
            to join will become available. Please check back on an event you’re 
            interested in to see if there are any last-minute changes.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
            We’re working on a follow system and other community features. 
            Please look forward to updates in the near future.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How do I see events I joined?
          </h3>
          <div style={ANSWER_STYLE} >
            Once you’re logged in, you’ll see a list of events that you’re 
            attending on your&nbsp;
            <Router.Link
                to='/'
                style={LINK_STYLE}
                className={css(styles.linkStates)}
            >
              Homepage
            </Router.Link>. You can also find it on your&nbsp;
            <Router.Link
                to='/users/profile/:id'
                style={LINK_STYLE}
                className={css(styles.linkStates)}
            >
              Profile page
            </Router.Link>.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
            Profile:{'\n'}
            <ul style={UL_STYLE} >
              <li>
                Click on your profile picture in the header on the top right 
                of the screen. You must be logged in to see your profile
              </li>
              <li>On the following dropdown, select “Profile”</li>
              <li>View a list of your upcoming events and past events</li>
              <li>
                You can choose to hide these from other users. For more 
                information, see&nbsp;
                <HashLink
                    style={LINK_STYLE}
                    className={css(styles.linkStates)}
                    to='#hide_activity'
                >
                  How do I hide my event activity?
                </HashLink>
              </li>
            </ul>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How do I add events to my collection?
          </h3>
          <div style={ANSWER_STYLE} >
            Once you start attending events, the coloured flags corresponding 
            to your events will appear in your flag collection after the events 
            pass. Your flag collection resets at the start of every month. 
            We’re working on special surprises for users who can collect them 
            all!
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How to see an event’s attendees?
          </h3>
          <div style={ANSWER_STYLE} >
            You can see the attendees of an event on the event page. If anyone 
            has joined the event, their name and profile picture will appear 
            under the “Attendees” section of the page. If you’re not logged in, 
            you’ll just see the number of attendees. If many people have joined 
            the event, click on the last option (See All) to see a full list of 
            attendees.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How to invite a friend to an event?
          </h3>
          <div style={ANSWER_STYLE} >
            Navigate to the event page of any event that you would like to 
            share. You can share the URL of this page with your friend. They 
            will be able to view the event details, restaurant, and attendees 
            without an account, and they will be asked to log in or sign up 
            once they click on “Join This Event.”
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How to invite a friend to NeverEatAlone?
          </h3>
          <div style={ANSWER_STYLE} >
            To share the NeverEatAlone app with a friend, make sure you are 
            logged in and scroll to the bottom of any page to find the&nbsp;
            <InviteAFoodieButton
              style={INVITE_FOODIE_BUTTON_STYLE}
              onInviteAFoodie={this.props.onInviteAFoodieClick}
            />&nbsp;
            link in the footer. A popup will appear where you can type 
            in a friend’s email address and write them a personalized message. 
            They will receive an email invitation to create and account, along 
            with the username and profile picture of the account who invited 
            them.{'\n'}
            Additionally you can share NeverEatAlone without logging in by 
            using the social media icons on the bottom part of the popup:{'\n'}
            <ul style={UL_STYLE} >
              <li>Twitter</li>
              <li>Facebook</li>
              <li>Reddit</li>
              <li>Or any other channel, using the link</li>
            </ul>
            {'\n'}
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How do I find events that have passed?
          </h3>
          <div style={ANSWER_STYLE} >
            To view events that you attended in the past, you can go to your 
            profile page and look under “Past Events''. You can also visit 
            another user’s profile to do the same. Currently, there is no way 
            to filter by past events on the homepage, but let us know by 
            submitting feedback if this is a feature you want to see in the 
            future!
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            I won’t be able to attend an event I joined
          </h3>
          <div style={ANSWER_STYLE} >
            You can remove your seat from the event anytime before the event 
            happens. Once you are logged in, head to the event page and hit the 
            button “Remove my Seat” on the top right corner.{'\n\n'}
            For events with a fee, you will see a window pup-up with 
            information on your refund eligibility once you click 
            “Remove my Seat”. Click “Remove Seat” in this pop-up to finish 
            removing your seat.{'\n\n'}
            For more information, see&nbsp;
            <HashLink
                style={LINK_STYLE}
                className={css(styles.linkStates)}
                to='#are_events_refundable'
            >
              Are fees for events refundable?
            </HashLink>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            I can’t find any events near me?
          </h3>
          <div style={ANSWER_STYLE} >
            We are currently focussing on events in Toronto, but you may be 
            able to find events in other cities in the Greater Toronto Area.
            {'\n\n'}
            If you want to see any neighbourhoods or venues featured, send us 
            some feedback to let us know!
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            Can I host an event of my own?
          </h3>
          <div style={ANSWER_STYLE} >
            We are currently working on user-hosted events and other community 
            features. If you’re interested in hosting an event, or if there’s a 
            restaurant you think we should host at, send us some feedback to
            &nbsp;
            <a
                style={LINK_STYLE}
                className={css(styles.linkStates)}
                href='mailto:support@nevereatalone.net'
                target='_blank'
                rel='noopener noreferrer'
            >
              support@nevereatalone.net
            </a>.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
            If you’re a restaurant owner, head to the&nbsp;
            <Router.Link
                to='/partner_with_us'
                style={LINK_STYLE}
                className={css(styles.linkStates)}
            >
              partner with us
            </Router.Link>&nbsp;
            page and send us a message. We'd love to hear from you.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h2
              style={{...HEADING_STYLE, ...H2_STYLE, ...ORANGE_TEXT_STYLE}}
              id='restaurant'
          >
            Restaurant
          </h2>
          <h3 id='find_restaurant' style={QUESTION_STYLE} >
            I want to find a restaurant in my neighbourhood
          </h3>
          <div style={ANSWER_STYLE} >
            We’re currently working on browsing and filtering for restaurants. 
            For now, you can check the location of an event to find out what 
            neighbourhood the venue is in.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            Can you host an event at a specific restaurant
          </h3>
          <div style={ANSWER_STYLE} >
            We are always working on expanding our features. If there’s a 
            restaurant you think we should host at, send us some feedback to 
            let us know.{'\n\n'}
            If you’re a restaurant owner, head to&nbsp;
            <Router.Link
                to='/partner_with_us'
                style={LINK_STYLE}
                className={css(styles.linkStates)}
            >
              partner with us
            </Router.Link>&nbsp;
            page and send us a message. We’d love to hear from you!
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            Information on a restaurant page is wrong?
          </h3>
          <div style={ANSWER_STYLE} >
            Let us know about any incorrect or outdated information by sending 
            us some feedback or emailing us at&nbsp;
            <a
                style={LINK_STYLE}
                className={css(styles.linkStates)}
                href='mailto:support@nevereatalone.net'
                target='_blank'
                rel='noopener noreferrer'
            >
              support@nevereatalone.net
            </a>.
            {'\n\n'}
            If you’re a restaurant owner, head to the&nbsp;
            <Router.Link
                to='/partner_with_us'
                style={LINK_STYLE}
                className={css(styles.linkStates)}
            >
              partner with us
            </Router.Link>&nbsp;
            page and send us a message. We’d love to hear from you!
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How to see if a restaurant has a patio?
          </h3>
          <div style={ANSWER_STYLE} >
            We are still building NeverEatAlone’s database so the information 
            for seating options isn’t available on the restaurant page at the 
            moment. You can see seating arrangements for each event on the 
            event page, within the about section.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            Is the restaurant page managed by the restaurant owner?
          </h3>
          <div style={ANSWER_STYLE} >
            Restaurants are listed by NEA staff. We are currently working on a 
            partnership solution with restaurant owners so please look forward 
            to updates about this in the near future.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h2
              style={{...HEADING_STYLE, ...H2_STYLE, ...ORANGE_TEXT_STYLE}}
              id='settings_and_support'
          >
            Settings & Support
          </h2>
          <h3 style={QUESTION_STYLE} >
            I can’t sign in to my account
          </h3>
          <div style={ANSWER_STYLE} >
            Please reach out to us using the email&nbsp;
            <a
                style={LINK_STYLE}
                className={css(styles.linkStates)}
                href='mailto:support@nevereatalone.net'
                target='_blank'
                rel='noopener noreferrer'
            >
              support@nevereatalone.net
            </a>.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            My restaurant is listed on NEA
          </h3>
          <div style={ANSWER_STYLE} >
            NEA allows users to attend events at restaurants. We boost local 
            businesses while connecting with people who are genuinely 
            interested in having a gastronomic experience with others.
            If any information regarding your restaurant is incorrect, or if 
            you want to partner with us, please reach out through&nbsp;
            <Router.Link
                to='/partner_with_us'
                style={LINK_STYLE}
                className={css(styles.linkStates)}
            >
              this link
            </Router.Link>.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How to report a harmful profile picture?
          </h3>
          <div style={ANSWER_STYLE} >
            Once you are logged in, head to the user profile you’d like to 
            report and locate the More Actions icon (• • •) at the right side 
            of the user card and click on Report. On the following popup fill 
            out the reason and hit the button “Report”. Select the reason this 
            user is being reported, fill in any additional comments, and hit 
            the “Report” button  in the following window. We will then 
            investigate the issue and act accordingly.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How to change my email?
          </h3>
          <div style={ANSWER_STYLE} >
            You can find the email associated with your account in the&nbsp;
            <Router.Link
                to='/users/settings/:id'
                style={LINK_STYLE}
                className={css(styles.linkStates)}
            >
              settings page
            </Router.Link>. To get to your settings page, you must first be 
            logged in to NeverEatAlone. When logged in, click on your profile 
            icon on the top right of the header, and select “Settings” from the 
            dropdown menu.{'\n\n'}
            You will be taken to the “Account Information” section.{'\n\n'}
            You can change your email by clicking the EDIT button next to your 
            existing email. You’ll be prompted to enter a new email and verify 
            your password.{'\n\n'}
            Your new email must be verified before it replaces the existing 
            email. Until it is verified, you must still use your old email or a 
            linked social account to log in. To verify your email, simply 
            follow the link we send to your new email address.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How can I link my Google or Facebook Account?
          </h3>
          <div style={ANSWER_STYLE} >
            When logged in, click on your profile icon in the top right of the 
            header, and select “Settings” from the dropdown menu.{'\n\n'}
            Under the Account Information section, locate and click the button 
            related to the account you want to link. A popup will appear and 
            take you through the process of linking your accounts. Once your 
            Google or Facebook account is linked, it will appear in your Linked 
            Accounts. Make sure your browser is not blocking any popups from 
            NEA otherwise you won’t be able to finish this process.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How can I unlink or remove my Google or Facebook Account from NEA?
          </h3>
          <div style={ANSWER_STYLE} >
            When logged in, click on your profile icon in the top right of the 
            header, and select “Settings” from the dropdown menu.{'\n\n'}
            Under the Account Information section, locate the button related to 
            the account you want to unlink and hit the remove button. Confirm 
            that you are removing the correct account in the following popup 
            window, and select “Remove Account.” The linked social account 
            should then be removed from your Linked Accounts.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How do I add a payment method to my account?
          </h3>
          <div style={ANSWER_STYLE} >
            You can either add a payment method during the checkout process 
            when you join an event with a fee, or by adding a card to the 
            Payment Methods tab of your settings page.{'\n\n'}
            If this is the first time you’re adding a card to your NEA account, 
            you can do so directly through the event checkout process once 
            you’re logged in.{'\n\n'}
            To add a card during the checkout process, simply click 
            “Join Event” on the page of an event you’re interested in. If there 
            is a fee for this event, you’ll see a payment options window pop 
            up. Select the “Add a Card” button, and fill in your card 
            information on the following screen. Click continue when you’re 
            done. NeverEatAlone will check to see if your information is 
            correct. If it is, you’ll be taken back to the payment options 
            window where you’ll see your new card appear as your default 
            payment method. To check out using this card, simply click the 
            orange “Checkout” button.{'\n\n'}
            You can also navigate to the Settings page to add a payment method. 
            Once logged in, click on your profile picture in the header at the 
            top right of the page and select “Settings” from the dropdown menu.
            {'\n\n'}
            Once you’re there, click on the “Payment Methods” tab to see the 
            payment methods you have added to your account.{'\n\n'}
            To add a new payment method, click on “Add a payment method” and 
            fill in your information on the following screen. Click on the 
            “Save” button on the bottom of the screen once you’re done. 
            NeverEatAlone will run a check to make sure your information is 
            correct. If everything is correct, you’ll be taken back to the 
            previous page, and you’ll see your newly added payment method 
            listed.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How do I edit card details?
          </h3>
          <div style={ANSWER_STYLE} >
            You can edit the information on a card you’ve added to your account 
            anytime. Once logged in, click on your profile picture in the 
            header at the top right of the page and select “Settings” from the 
            dropdown menu.{'\n\n'}
            Then navigate to the Payment Methods tab in your Settings page.
            {'\n\n'}
            Here, you’ll see a list of all the cards you’ve added to your 
            account. If you haven’t added any cards yet, see&nbsp;
            <HashLink
                style={LINK_STYLE}
                className={css(styles.linkStates)}
                to='#add_payment'
            >
              How do I add a payment method to my account?
            </HashLink>{'\n\n'}
            Click on one of your added cards to be taken to a card details 
            page. Here, you can edit your name, expiration date, security code 
            and postal code. You can also delete a card or set it as default.
            {'\n\n'}
            Once you’re happy with the information, click “Save” on the bottom 
            of the screen, or click “Discard Changes” to return to the previous 
            page without making changes.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How do I select a default payment method?
          </h3>
          <div style={ANSWER_STYLE} >
            You can set one of your saved cards as your default payment 
            method. Once logged in, click on your profile picture in the header 
            at the top right of the page and select “Settings” from the 
            dropdown menu.{'\n\n'}
            Then navigate to the “Payment Methods” tab in your Settings page.
            {'\n\n'}
            If you’ve already added cards to your account, they’ll be listed 
            here. If you have no payment methods, the first card you add will 
            automatically be marked as default. For more information, see&nbsp;
            <HashLink
                style={LINK_STYLE}
                className={css(styles.linkStates)}
                to='#add_payment'
            >
              How do I add a payment method to my account?
            </HashLink>{'\n\n'}
            To make a card your default payment method, click on it to be taken 
            to its details page. Click the checkbox labeled “Make this my 
            default card”, and then click the “Save” button on the bottom of 
            the page to save your changes.{'\n\n'}
            You’ll see a label marking the card as your default on the Payment 
            Methods page.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How do I delete a card from my account?
          </h3>
          <div style={ANSWER_STYLE} >
            You can remove any card you added previously. Once logged in, click 
            on your profile picture in the header at the top right of the page 
            and select “Settings” from the dropdown menu.{'\n\n'}
            Then navigate to the Payment Methods tab in your Settings page.
            {'\n\n'}
            Select the card you’d like to delete. On the following page, hit 
            the "Delete" button beneath the card image. You’ll get a popup 
            asking you to confirm the deletion. Select “Delete Card” to finish 
            removing it from your account.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            Where can I find my payment records and receipts?
          </h3>
          <div style={ANSWER_STYLE} >
            You can find your purchase history on the Payment History tab of 
            your Settings page. Once logged in, navigate to the settings page 
            by clicking on your profile picture in the header on the top right 
            of the screen. On the ensuing dropdown menu, select “Settings”.
            {'\n\n'}
            Once there, select the “Payment History” tab to see a list of your 
            purchases on NEA.{'\n\n'}
            All of the events you’ve joined will be listed here from most 
            recent to oldest, along with any fees associated with the event.
            {'\n\n'}
            To see more details, click the “View Receipt” button on to the 
            right of the purchase you’d like to view, or click the tile if 
            you’re viewing on a mobile device.{'\n\n'}
            You’ll see a receipt window with details on the event, your payment 
            method, the amount paid and refund status(es) if applicable. You’ll 
            also find links to print, save PDF, and get help with your payment 
            at the bottom of this window.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            My cancellation fee is “On Hold” or “Charged” - what does that mean?
          </h3>
          <div style={ANSWER_STYLE} >
            NeverEatAlone charges a cancellation fee for certain events, if the 
            restaurant we are hosting at has a policy that requires payment for 
            cancellations. We put a hold on your payment method for this 
            amount, but we don’t charge it unless our records indicate that you 
            did not attend your seat.  You can find the status for this hold on 
            the Payment History tab of your Settings page.{'\n\n'}
            Here’s a breakdown of what the status of your cancellation means:
            {'\n\n'}
            On Hold{'\n'}
            NeverEatAlone is holding your cancellation charge until the event 
            ends. Once the event has passed and our records indicate that you 
            have attended your seat, this hold on your payment method will be 
            released.{'\n\n'}
            Charged{'\n'}
            Our records indicate that you were a no-show at the event, or 
            perhaps you canceled your seat without enough notice and the 
            restaurant charged your seat a no-show fee. This means that 
            NeverEatAlone charged your payment method for the amount that was 
            on hold for the event. If you feel this fee was charged to you in 
            error, feel free to reach out through the link in your payment 
            history, or send us an email at&nbsp;
            <a
                style={LINK_STYLE}
                className={css(styles.linkStates)}
                href='mailto:support@nevereatalone.net'
                target='_blank'
                rel='noopener noreferrer'
            >
              support@nevereatalone.net
            </a>.{'\n\n'}
            For information on how to find your payment details, see&nbsp;
            <HashLink
                style={LINK_STYLE}
                className={css(styles.linkStates)}
                to='#find_payment_records'
            >
              Where can I find my payment records and receipts?
            </HashLink>
          </div>




          <div style={DIVIDER_LINE_STYLE} />
          <h2
              style={{...HEADING_STYLE, ...H2_STYLE, ...ORANGE_TEXT_STYLE}}
              id='my_profile'
          >
            My Profile
          </h2>
          <h3 style={QUESTION_STYLE} >
            How to change the badges on my profile?
          </h3>
          <div style={ANSWER_STYLE} >
            Once logged in, head to your Profile and click on any badge in your 
            user card to open the Badges Dashboard. On the following page, 
            locate the section “Your Badges” and:{'\n'}
            <ul style={UL_STYLE} >
              <li>Deselect a badge to remove it from your user card.</li>
              <li>
                Select a badge (up to 4) to have it added to your user card.
              </li>
              <li>
                The order they will show in your user profile will follow the 
                order you selected them.
              </li>
              <li>
                Partially unlocked badges won’t be selectable, only the badges 
                in the “Your Badges” section.
              </li>
            </ul>
            {'\n'}
            Changes on this page are automatically saved.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How do I edit my photos?
          </h3>
          <div style={ANSWER_STYLE} >
            Photos published in an event cannot be changed.  You can remove the 
            photo from a specific event, untag yourself or upload a new one.
            {'\n\n'}
            You can change photos uploaded to a restaurant page (menu or 
            header).{'\n\n'}
            To remove your photos, please see&nbsp;
            <HashLink
                style={LINK_STYLE}
                className={css(styles.linkStates)}
                to='#delete_photo_from_event'
            >
              How can I delete a photo from an event?
            </HashLink>
            .{'\n\n'}
            You can remove your tag from someone else’s photo, please see&nbsp;
            <HashLink
                style={LINK_STYLE}
                className={css(styles.linkStates)}
                to='#tagged_in_photo_without_permission'
            >
              I was tagged in photo without my permission
            </HashLink>
            .{'\n\n'}
            To edit photos you upload a restaurant, login and head to the 
            restaurant‘s page.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How do I change my profile picture?
          </h3>
          <div style={ANSWER_STYLE} >
            Once logged in, head to your Profile and hit the button “Edit 
            Profile”. On the following page, locate your profile picture and 
            click on the icon Replace Image&nbsp;
            <img
              style={{...NO_SELECTION_STYLE, ...ICON_STYLE}}
              src='resources/help_page/icons/replace-image.svg'
              alt='Replace Image Icon'
              draggable={false}
            />
            &nbsp;and upload your new profile picture.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            I want to collect more badges
          </h3>
          <div style={ANSWER_STYLE} >
            You can check your badge progress on the Badges Dashboard. Once 
            logged in, head to your Profile and click on any badge in your user 
            card to open the Badges Dashboard. On the following page, locate 
            the section “In Progress” and click on any badge from there to open 
            a popup that shows what tasks are required to unlock that badge.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How do I delete my photos?
          </h3>
          <div style={ANSWER_STYLE} >
            To remove your photos from a specific event, please see&nbsp;
            <HashLink
                style={LINK_STYLE}
                className={css(styles.linkStates)}
                to='#delete_photo_from_event'
            >
              How can I delete a photo from an event?
            </HashLink>
            .{'\n\n'}
            To remove your profile picture, login, head to your Profile and hit 
            the button “Edit Profile”. On the following page, locate your 
            profile picture and click on the icon Replace Image&nbsp;
            <img
              style={{...NO_SELECTION_STYLE, ...ICON_STYLE}}
              src='resources/help_page/icons/replace-image.svg'
              alt='Replace Image Icon'
              draggable={false}
            />
            &nbsp;and choose one of our avatars.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How do I untag myself from photos?
          </h3>
          <div style={ANSWER_STYLE} >
            Please see&nbsp;
            <HashLink
                style={LINK_STYLE}
                className={css(styles.linkStates)}
                to='#tagged_in_photo_without_permission'
            >
              I was tagged in photo without my permission
            </HashLink>.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h2
              style={{...HEADING_STYLE, ...H2_STYLE, ...ORANGE_TEXT_STYLE}}
              id='community'
          >
            Community
          </h2>
          <h3 style={QUESTION_STYLE} >
            How do I find someone on NEA?
          </h3>
          <div style={ANSWER_STYLE} >
            We are currently working on a user directory and also integration 
            with other social media (bring your friends from Facebook, for 
            example). So please look forward to future updates.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How to follow someone?
          </h3>
          <div style={ANSWER_STYLE} >
            From the person’s profile, hit the button “Follow” located on the 
            user card.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How do I tag someone in a photo?
          </h3>
          <div style={ANSWER_STYLE} >
            When uploading a photo to an event you can tag attendee’s by typing 
            “@” to show a dropdown with a list of people who attended the 
            event. That person will be notified.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How to have my photo featured in the Live Album?
          </h3>
          <div style={ANSWER_STYLE} >
            Photos from the Live Album are selected randomly from all our 
            event’s photos (uploaded by the users). The Live Album will always 
            bring different images whenever you load the home page and 
            different users will see different albums.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How do I archive messages?
          </h3>
          <div style={ANSWER_STYLE} >
            Once you are logged in, head to Messages. Select a chat or group 
            chat and hit the “More Actions” button <span 
            style={NO_WORD_BREAK_STYLE} >(<span style={ORANGE_TEXT_STYLE} >
            • • •</span>)</span> on the top right corner of the chat window and 
            select “Archive Chat/Group”. Archived chats can be searchable.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            What to do if someone is bothering me?
          </h3>
          <div style={ANSWER_STYLE} >
            You can block someone from contacting you. Blocked contact:{'\n'}
            <ul style={UL_STYLE} >
              <li>Can’t message you.</li>
              <li>Can’t leave a testimonial for you.</li>
              <li>Can’t see your profile.</li>
              <li>Can’t see your name on an attendee’s list from an event.</li>
              <li><b>Can still join events you are attending.</b></li>
            </ul>
            {'\n'}
            You can block someone from the user profile or directly from a chat.
            {'\n\n'}
            <b>To block someone from a user profile</b>{'\n'}
            Once you are logged in, head to the user’s profile. Hit the “More 
            Actions” button <span style={NO_WORD_BREAK_STYLE} >(<span 
            style={ORANGE_TEXT_STYLE} >• • •</span>)</span> and select “Block”. 
            On the following popup hit the button “Yes”.{'\n\n'}
            <b>To block someone from the Message center</b>
            Once you are logged in, head to Message and select the user’s chat. 
            Hit the “More Actions” button <span style={NO_WORD_BREAK_STYLE} >(
            <span style={ORANGE_TEXT_STYLE} >• • •</span>)</span> and select 
            “Block User”. On the following popup hit the button “Yes”.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How do I unblock someone?
          </h3>
          <div style={ANSWER_STYLE} >
            Please see&nbsp;
            <HashLink
                style={LINK_STYLE}
                className={css(styles.linkStates)}
                to='#blocked_list'
            >
              Where can I see all my blocked users?
            </HashLink>
            . On the following screen, use the search field to locate the user 
            you want and hit the link “Unblock”. Confirm the unblock on the 
            popup.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 id='blocked_list' style={QUESTION_STYLE} >
            Where can I see all my blocked users?
          </h3>
          <div style={ANSWER_STYLE} >
            Once you are logged in, head to Settings and click on the tab 
            “Blocked Users”.
          </div>
        </div>
        <HashLink
            style={BACK_TO_TOP_BUTTON_STYLE}
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

  private handleMouseLeave: { (event: any): void } = (
      event: React.MouseEvent) => {
    (document.activeElement as HTMLElement).blur();
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
  backgroundColor: '#FFFFFF'
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

const BACK_TO_TOP_BUTTON_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  position: 'absolute',
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

const P_STYLE: React.CSSProperties = {
  margin: '0px',
  padding: '0px',
  display: 'inline'
};

const LINK_SPAN_STYLE: React.CSSProperties = {
  margin: '0px',
  padding: '0px',
  display: 'inline-flex'
};

const NEW_LINE_STYLE: React.CSSProperties = {
  whiteSpace: 'pre'
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
  fontSize: '26px',
  lineHeight: '39px'
};

const H2_STYLE: React.CSSProperties = {
  fontSize: '23px',
  lineHeight: '34px'
};

const SEARCH_TITLE_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 300,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  width: '100%',
  marginBottom: '30px'
};

const DIVIDER_LINE_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  border: '1px dashed #CCCCCC',
  marginBottom: '30px',
  width: '100%'
};

const TOPICS_ROW: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '250px',
  marginBottom: '30px'
};

const TOPICS_SECOND_ROW_STYLE: React.CSSProperties = {
  height: '205px'
};

const TOPICS_BUTTON_STYLE: React.CSSProperties = {
  marginRight: '60px',
  backgroundColor: '#FFFFFF',
  border: 'none',
  outline: 'none',
  width: '140px',
  height: '180px',
  textDecoration: 'none'
};

const TOPICS_ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '140px',
  height: '140px',
  borderRadius: '50%'
};

const TOPICS_BUTTON_TEXT_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '140px',
  height: '38px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#F26B55',
  marginTop: '2px'
};

const ATTENDING_AN_EVENT_ICON_STYLE: React.CSSProperties = {
  width: '102px',
  height: '92px'
};

const RESTAURANT_ICON_STYLE: React.CSSProperties = {
  width: '90px',
  height: '82px'
};

const SETTINGS_ICON_STYLE: React.CSSProperties = {
  width: '108px',
  height: '98px'
};

const MY_PROFILE_ICON_STYLE: React.CSSProperties = {
  width: '66px',
  height: '107px'
};

const COMMUNITY_ICON_STYLE: React.CSSProperties = {
  width: '89px',
  height: '90px'
};

const ORANGE_TEXT_STYLE: React.CSSProperties = {
  color: '#F26B55',
  textDecoration: 'none'
};

const QUESTION_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '20px',
  lineHeight: '30px',
  textTransform: 'uppercase',
  color: '#969696',
  height: '30px',
  margin: '0px 0px 30px 0px',
  padding: '0px'
};

const ANSWER_STYLE: React.CSSProperties = {
  display: 'inline',
  width: '100%',
  margin: '0px 0px 30px 0px',
  padding: '0px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  overflowWrap: 'break-word',
  whiteSpace: 'pre-line'
};

const UL_STYLE: React.CSSProperties = {
  margin: '0px',
  paddingLeft: '25px',
  listStyleType: 'disc',
  listStylePosition: 'outside'
};

const ICON_STYLE: React.CSSProperties = {
  width: '22px',
  height: '22px',
  verticalAlign: 'baseline'
};

const NO_WORD_BREAK_STYLE: React.CSSProperties = {
  whiteSpace: 'nowrap'
};

const NO_SELECTION_STYLE: React.CSSProperties = {
  WebkitTouchCallout: 'none',
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
  KhtmlUserSelect: 'none',
  userSelect: 'none'
};

const LINK_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
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

const INVITE_FOODIE_BUTTON_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontWeight: 700,
  fontSize: '14px',
  lineHeight: '18px',
  height: '18px'
};

const styles = StyleSheet.create({ 
  topicsButton: {
    ':hover div:last-child': {
      textDecoration: 'underline'
    },
    ':hover div:first-child': {
      backgroundColor: '#F6F6F6'
    },
    ':focus div:last-child': {
      textDecoration: 'underline'
    },
    ':focus div:first-child': {
      backgroundColor: '#F6F6F6'
    },
    ':active div:last-child': {
      textDecoration: 'underline'
    },
    ':active div:first-child': {
      backgroundColor: '#FFE2CA'
    }
  },
  linkStates: {
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
