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
    return (
      <div id='top' style={CONTAINER_STYLE} >
        <div style={CONTENT_CONTAINER_STYLE} >
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
            Locate the event you are interested in. Hit the button 
            “Join this Event” located at the top right corner of the event 
            page. If you are not logged in, follow the instructions on the 
            screen to login or sign-up. Once you’ve joined an event, it will 
            appear on Your Upcoming Events and your&nbsp;
            <Router.Link to='/users/profile/:id' style={LINK_STYLE} >
              Profile page
            </Router.Link>.
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
            Events that you’re attending will appear on Your Upcoming Events 
            and your Profile page.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
            Your Upcoming Events:{'\n'}
            <ul style={UL_STYLE} >
              <li>
                Follow the “Your Events” link in the header to see a list of 
                your upcoming events. You must be logged in to access this link
              </li>
              <li>
                You can view your events in a listview or a calendar view by 
                selecting the appropriate icons
                <img
                  style={LISTVIEW_CALENDAR_ICONS_STYLE}
                  src='resources/help_page/icons/listview_calendar_icons.svg'
                  alt='Listview Calendar Icons'
                />
              </li>
              {'\n'}
              Only future events will appear on this page. To see a list of 
              your past events, navigate to your Profile page
              {'\n'}
              Profile:{'\n'}
              <ul style={UL_STYLE} >
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
            </ul>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How to see an event’s attendees?
          </h3>
          <div style={ANSWER_STYLE} >
            Once you are logged in, head to an event page. If anyone has joined 
            the event, their name and profile picture will appear under the 
            “Attendees” section of the page. If there are more than 5 
            attendees, click on the last option (See All) to see a full list of 
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
            How do I hide my event activity?
          </h3>
          <div style={ANSWER_STYLE} >
            You will always appear on the attendees section of an event page 
            you’re attending, but you can hide the events you are attending or 
            your past events from your user profile.
            <img
              style={USER_SETTINGS_IMAGE_STYLE}
              src='resources/help_page/images/settings.jpg'
              alt='Settings Image'
            />
            Once you are logged in, head to your profile and hit the button 
            “Edit Profile” on the bottom part of your user card. On the 
            following page, find the “Events” section and hit the eye icon 
            beside the section that you want to hide from other users.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            I won’t be able to attend an event I joined
          </h3>
          <div style={ANSWER_STYLE} >
            You can remove your seat from the event anytime before the event 
            happens. Once you are logged in, head to the event page and hit the 
            button “Remove my Seat” on the top right corner.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            I can’t find any events near me?
          </h3>
          <div style={ANSWER_STYLE} >
            We are currently focussing on events in Toronto, but you may be 
            able to find events in other cities in the Greater Toronto Area.
            {'\n'}
            Navigate to the Home Page or Explore Events page and click on the 
            location dropdown&nbsp;
            <img
              style={LOCATION_DROPDOWN_IMAGE_STYLE}
              src='resources/help_page/images/location_dropdown.jpg'
              alt='Dropdown Image'
              draggable={false}
            />
            &nbsp;at the top of the page. If any other cities are available, 
            you’ll be able to select them from this dropdown to view events in 
            that area.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            Can I host an event of my own?
          </h3>
          <div style={ANSWER_STYLE} >
            We are currently working on user-hosted events and other community 
            features. If you’re interested in hosting an event, or if there’s a 
            restaurant you think we should host at, send us some feedback to 
            info@nevereatalone.net.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
            If you’re a restaurant owner, head to the partner with us page and 
            send us a message. We would love to work with you.
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How can I delete a photo from an event?
          </h3>
          <div style={ANSWER_STYLE} >
            You can remove photos uploaded by yourself and for photos uploaded 
            by someone else that tags you, you can remove your tag.{'\n\n'}
            To remove a photo you uploaded login and head to the event page. 
            Once there scroll down to the “Gallery” section, locate your photo 
            and click on the More Actions button <span 
            style={NO_WORD_BREAK_STYLE} >(<span style={ORANGE_TEXT_STYLE} >
            • • •</span>)</span> and select “Delete”.{'\n'}
            To remove your tag from a photo, please see&nbsp;
            <HashLink
                style={LINK_STYLE}
                className={css(styles.linkStates)}
                to='#tagged_in_photo_without_permission'
            >
              I was tagged in photo without my permission
            </HashLink>
            .
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            Where can I find the events that I am following?
          </h3>
          <div style={ANSWER_STYLE} >
            Once you are logged in, select Your Events from the top navigation. 
            You can see events you are attending this week or click the “Next 
            Week And Beyond” tab to see what’s coming up in the future. All 
            events you are following are located on the right side within each 
            tab.{'\n\n'}
            If an event has already passed, you can find them under the “Past 
            Events” tab in your&nbsp;
            <HashLink
                style={LINK_STYLE}
                className={css(styles.linkStates)}
                to='#my_profile'
            >
              User Profile
            </HashLink>
            .
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            I won’t be able to attend an event I joined
          </h3>
          <div style={ANSWER_STYLE} >
            You can remove your seat from the event anytime before the event 
            happens. Once you are logged in, head to the event page and hit the 
            button “Remove my Seat” on the top right corner.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h2
              style={{...HEADING_STYLE, ...H2_STYLE, ...ORANGE_TEXT_STYLE}}
              id='restaurant'
          >
            Restaurant
          </h2>
          <h3 id='fix_restaurant_info' style={QUESTION_STYLE} >
            How to fix incorrect information about a Restaurant?
          </h3>
          <div style={ANSWER_STYLE} >
            Once you are logged in, head to the 
            restaurant page and hit the edit button&nbsp;
            <img
              style={{...NO_SELECTION_STYLE, ...ICON_STYLE, ...SUB_ICON_STYLE}}
              src='resources/help_page/icons/edit.svg'
              alt='Edit Icon'
              draggable={false}
            />
            &nbsp;beside the restaurant title. On the following popup allow you 
            to edit:{'\n'}
            <ul style={UL_STYLE} >
              <li>Restaurant name</li>
              <li>Cuisine Type</li>
              <li>Price Estimate</li>
              <li>Venue Description</li>
            </ul>
            {'\n'}
            You can edit the following by clicking “Submit an Edit” within the 
            About section:{'\n'}
            <ul style={UL_STYLE} >
              <li>Address</li>
              <li>Contact information</li>
              <li>Hours of operation</li>
            </ul>
            {'\n'}
            You can edit the header image by clicking 
            the edit button&nbsp;
            <img
              style={{...NO_SELECTION_STYLE, ...ICON_STYLE, ...SUB_ICON_STYLE}}
              src='resources/help_page/icons/edit.svg'
              alt='Edit Icon'
              draggable={false}
            />
            &nbsp;on the top right corner of the image.{'\n\n'}
            Once you are done, hit the button “Submit Edit”.{'\n\n'}
            If a restaurant has the “&nbsp;
            <img
              style={{...NO_SELECTION_STYLE, ...ICON_STYLE}}
              src='resources/help_page/icons/listed-by-nea.svg'
              alt='Listed By NEA Icon'
              draggable={false}
            />
            &nbsp;Listed by NEA” tag underneath its name, the information has 
            been verified by us and you will not be able to submit any edits at 
            this time.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            I want to find a restaurant in my neighbourhood
          </h3>
          <div style={ANSWER_STYLE} >
            Once you are logged in, head to Explore Restaurants. You can search 
            for a restaurant using the search bar at the top or clicking on the 
            map view&nbsp;
            <img
              style={{...NO_SELECTION_STYLE, ...ICON_STYLE}}
              src='resources/help_page/icons/map.svg'
              alt='Map Icon'
              draggable={false}
            />
            &nbsp;and navigate to your neighborhood.{'\n\n'}
            Additionally, you can also hit the filter button&nbsp;
            <img
              style={{...NO_SELECTION_STYLE, ...ICON_STYLE}}
              src='resources/help_page/icons/filter.svg'
              alt='Filter Icon'
              draggable={false}
            />
            &nbsp;to filter the results (like cuisines).
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            I can’t find a restaurant
          </h3>
          <div style={ANSWER_STYLE} >
            If after searching for a specific restaurant you ultimately 
            couldn’t find it, you can add it yourself.{'\n\n'}
            Once you are logged in, from the Explore Restaurant page, click the 
            tab “List a Restaurant” and hit the button “List a Restaurant”.
            {'\n'}
            The next page will have the following fields:{'\n'}
            <ul style={UL_STYLE} >
              <li>
                <b>Restaurant Name</b>: Name of the business, including 
                neighbourhood or major intersection if this is a chain or 
                franchise.
              </li>
              <li><b>Address</b></li>
              <li>
                <b>Cuisine type</b>: Select one or more cuisines from a 
                predefined list.
              </li>
              <li>
                <b>Price estimate</b>: Specify the overall price of this 
                restaurant’s menu.
              </li>
              <li><b>Venue description</b>: A blurb about the location.</li>
              <li><b>Phone number</b></li>
              <li><b>Website</b></li>
              <li><b>Hours of operation</b></li>
              <li>
                <b>Menu photo</b>: You can upload photos of the restaurant’s 
                menu.
              </li>
              <li>
                <b>Header photo</b>: You can upload a photo of the 
                restaurant’s cuisine to be featured on the head of the 
                restaurant’s page.
              </li>
            </ul>
            {'\n'}
            Hit the button “List Restaurant on NEA” once you are done.{'\n\n'}
            You can stop filling this form anytime and resume it from the 
            “Explore Restaurant” and under the tab “List a Restaurant” in a new 
            section called “Draft”.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How to edit working hours from a restaurant?
          </h3>
          <div style={ANSWER_STYLE} >
            Within a restaurant page, you can click the “Submit an Edit” link 
            under the Hours of Operation section to edit the restaurant’s 
            working hours.{'\n\n'}
            Once you are done, hit the button “Submit Edit”.{'\n\n'}
            If a restaurant has the “&nbsp;
            <img
              style={{...NO_SELECTION_STYLE, ...ICON_STYLE}}
              src='resources/help_page/icons/listed-by-nea.svg'
              alt='Listed By NEA Icon'
              draggable={false}
            />
            &nbsp;Listed by NEA” tag underneath its name, the information has 
            been verified by us and you will not be able to submit any edits at 
            this time.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How to see if a restaurant has a patio?
          </h3>
          <div style={ANSWER_STYLE} >
            We are still building NEAs database so the information for seating 
            options isn’t available at the moment. We appreciate your patience 
            and please look forward to updates in the near future.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            Is the restaurant page managed by the restaurant owner?
          </h3>
          <div style={ANSWER_STYLE} >
            Restaurants are listed by NEA users and staff. We are currently 
            working on a partnership solution with restaurant owners so please 
            look forward to updates about this in the near future.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How do I change my review for a restaurant?
          </h3>
          <div style={ANSWER_STYLE} >
            Once you are logged in, head to the restaurant page, scroll down to 
            the “Reviews” section and hit the button “Edit Review” to trigger 
            the review popup. Once you are done with your changes hit the 
            button “Submit” to apply the changes.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How to leave a review on a restaurant?
          </h3>
          <div style={ANSWER_STYLE} >
            Once you are logged in, head to the restaurant page, scroll down to 
            the “Reviews” section and hit the button “Add a Review” to trigger 
            the review popup. On the following screen you can add:
            {'\n'}
            <ul style={UL_STYLE} >
              <li>A rating</li>
              <li>Labels to illustrate the restaurant’s atmosphere</li>
              <li>A written review</li>
            </ul>
            {'\n'}
            At the end, hit the button “Submit” to publish your review.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
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
                href='mailto:info@nevereatalone.net'
                target='_blank'
                rel='noopener noreferrer'
            >
              info@nevereatalone.net
            </a>
            .
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            Someone used my photo without my consent
          </h3>
          <div style={ANSWER_STYLE} >
            Click the photo to open the popup, locate the More Actions 
            button <span style={NO_WORD_BREAK_STYLE} >(<span 
            style={ORANGE_TEXT_STYLE} >• • •</span>)</span> on the right side 
            and hit “report”.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            Someone listed my restaurant on NEA
          </h3>
          <div style={ANSWER_STYLE} >
            NEA allows users to attend events at restaurants. We boost 
            local businesses while connecting with people who are genuinely 
            interested in having a gastronomic experience with others.
            If any information regarding your restaurant is incorrect, please 
            see&nbsp;
            <HashLink
                style={LINK_STYLE}
                className={css(styles.linkStates)}
                to='#fix_restaurant_info'
            >
              How to fix incorrect information about a restaurant?
            </HashLink>
            . If you want to partner with us, please reach out through this 
            link.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How to report a harmful profile picture?
          </h3>
          <div style={ANSWER_STYLE} >
            Once you are logged in, head to the user profile and locate the 
            More Actions button <span style={NO_WORD_BREAK_STYLE} >(<span 
            style={ORANGE_TEXT_STYLE} >• • •</span>)</span> at the right side 
            of the user card and click on Report. On the following popup fill 
            out the reason and hit the button “Report”. We will then 
            investigate the issue and act accordingly.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            Someone left a bad testimonial on my profile
          </h3>
          <div style={ANSWER_STYLE} >
            If there’s a harmful, offensive or untruthful testimonial, you can 
            always report it.{'\n\n'}
            Or you can set all your testimonials to private.{'\n\n'}
            To report it, once you are logged in, head to your profile, locate 
            the testimonial and click the Report icon&nbsp;
            <img
              style={{...NO_SELECTION_STYLE, ...ICON_STYLE}}
              src='resources/help_page/icons/report.svg'
              alt='Report Icon'
              draggable={false}
            />
            .{'\n\n'}
            To set your testimonial to private, once you are logged in, head to 
            your profile and hit the button “Edit Profile”. On the following 
            screen, scroll down to the “Tabs” section and hit the eye 
            icon&nbsp;
            <img
              style={{...NO_SELECTION_STYLE, ...ICON_STYLE, ...EYE_ICON_STYLE}}
              src='resources/help_page/icons/eye.svg'
              alt='Share Icon'
              draggable={false}
            />
            &nbsp;next to Testimonials to hide it to others.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How to change my email?
          </h3>
          <div style={ANSWER_STYLE} >
            You can find the email associated with your account in the settings 
            page, under the “Account Information” tab. To get to your settings 
            page, you must first be logged in to NeverEatAlone. When logged in, 
            click on your profile icon on the top right of the header, and 
            select “Settings” from the dropdown menu.{'\n\n'}
            From here, navigate to the “Account Information” tab.{'\n\n'}
            If you signed up with an email, or already have set an email, you 
            can change it by clicking the EDIT button next to your existing 
            email. You’ll be prompted to enter a new email and verify your 
            password.{'\n\n'}
            If you signed up with a Google or Facebook account and want to add 
            an email, click the ADD button under the “Email & Password” 
            heading. You’ll need to set a new password at the same time.{'\n\n'}
            <b>Your new email must be verified before it replaces the existing 
            email.</b> Until it is verified, you must still use your old email 
            or a linked social account to log in. To verify your email, simply 
            follow the link we send to your new email address.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How can I link my Google or Facebook Account?
          </h3>
          <div style={ANSWER_STYLE} >
            When logged in, click on your profile icon in the top right of the 
            header, and select “Settings” from the dropdown menu.{'\n\n'}
            Under the Account Information tab, locate the button related to the 
            account you want to link. Regardless of which account you want to 
            link, once you click on the button a popup will show up with the 
            login. Make sure your browser is not blocking any popups from NEA 
            otherwise you won’t be able to finish this process.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How can I unlink or remove my Google or Facebook Account from NEA?
          </h3>
          <div style={ANSWER_STYLE} >
            When logged in, click on your profile icon in the top right of the 
            header, and select “Settings” from the dropdown menu.{'\n\n'}
            If you’ve signed up to NEA with a linked Facebook or Google 
            account, you’ll be prompted  to set an email and password to use as 
            your login before you can unlink it. You can also set an email and 
            password anytime you want by simply clicking the ADD button 
            underneath the “Email & Password” heading.{'\n\n'}
            Under the Account Information tab, locate the button related to the 
            account you want to unlink and hit the remove button.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            Someone listed a restaurant that doesn’t exist
          </h3>
          <div style={ANSWER_STYLE} >
            If there's incorrect information about this restaurant, please 
            see&nbsp;
            <HashLink
                style={LINK_STYLE}
                className={css(styles.linkStates)}
                to='#fix_restaurant_info'
            >
              How to fix incorrect information about a restaurant?
            </HashLink>
            . If this business is no longer open or didn’t exists in the first 
            place please reach out to us using the email&nbsp;
            <a
                style={LINK_STYLE}
                className={css(styles.linkStates)}
                href='mailto:info@nevereatalone.net'
                target='_blank'
                rel='noopener noreferrer'
            >
              info@nevereatalone.net
            </a>
            .
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How do I report a toxic user?
          </h3>
          <div style={ANSWER_STYLE} >
            Once logged in, head to the user’s profile and hit the More Actions 
            button <span style={NO_WORD_BREAK_STYLE} >(<span 
            style={ORANGE_TEXT_STYLE} >• • •</span>)</span> in the top corner 
            of the user’s card and select “Report”. In the following popup 
            select the reason for the report and hit “Report”.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 id='tagged_in_photo_without_permission' style={QUESTION_STYLE} >
            I was tagged in photo without my permission
          </h3>
          <div style={ANSWER_STYLE} >
            You can remove your tag from someone else’s photo or you can hide 
            all tagged photos from your profile.{'\n\n'}
            <b>To remove a tag</b>{'\n'}
            Once logged in, open the said photo (in the photo overlay), hit the 
            “More Actions” button <span style={NO_WORD_BREAK_STYLE} >(<span 
            style={ORANGE_TEXT_STYLE} >• • •</span>)</span> and select “Untag 
            Myself”.{'\n\n'}
            <b>To hide all tagged photos</b>{'\n'}
            Once logged in, open the Profile Settings page, scroll down to the 
            “Tabs” section and click on the eye icon&nbsp;
            <img
              style={{...NO_SELECTION_STYLE, ...ICON_STYLE, ...EYE_ICON_STYLE}}
              src='resources/help_page/icons/eye.svg'
              alt='Share Icon'
              draggable={false}
            />
            &nbsp;right beside the “Tagged Photos”. Hit the button “Save”.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How can I deactivate or delete my account? :(
          </h3>
          <div style={ANSWER_STYLE} >
            If you want to take a break from NEA, you can deactivate or delete 
            your account. Go to the Settings page by clicking on your profile 
            icon in the top right of the header and selecting “Settings” from 
            the dropdown menu.{'\n\n'}
            From here, you can find the account deactivation or deletion 
            options in the “Deactivate or Delete” tab. Please read the 
            instructions carefully.{'\n\n'}
            <b>Deactivate</b>{'\n'}
            Deactivating your account will temporarily disable all links to 
            your profile, and hide your profile from public access. When you’re 
            ready to log back in, all links will be restored and you can pick 
            up where you left off.{'\n\n'}
            <b>Delete</b>{'\n'}
            Deleting your account is a permanent action and cannot be undone.
            {'\n\n'}
            If you created your account with email and password or if you set 
            these later on, you will be prompted to type your password as an 
            additional security measure when deleting your account.{'\n\n'}
            NeverEatAlone deletes your account immediately once your request is 
            submitted, and your account <b>will not be recoverable</b>. Please 
            only delete your account if you are sure you won’t be returning to 
            the account. Your email and handle associated with a deleted 
            account are recycled, and can be used to create a new account.
            {'\n\n'}
            If your account was deleted by accident and you want it back, there 
            may be a chance of recovery within 15 days of deletion. Reach out 
            to us at&nbsp;
            <a
                style={LINK_STYLE}
                className={css(styles.linkStates)}
                href='mailto:info@nevereatalone.net'
                target='_blank'
                rel='noopener noreferrer'
            >
              info@nevereatalone.net
            </a>
            .
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
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
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
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
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
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
            </HashLink>
            .
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
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
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How to follow someone?
          </h3>
          <div style={ANSWER_STYLE} >
            From the person’s profile, hit the button “Follow” located on the 
            user card.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How do I tag someone in a photo?
          </h3>
          <div style={ANSWER_STYLE} >
            When uploading a photo to an event you can tag attendee’s by typing 
            “@” to show a dropdown with a list of people who attended the 
            event. That person will be notified.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
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
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
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
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
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
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 id='blocked_list' style={QUESTION_STYLE} >
            Where can I see all my blocked users?
          </h3>
          <div style={ANSWER_STYLE} >
            Once you are logged in, head to Settings and click on the tab 
            “Blocked Users”.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
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
  backgroundColor: '#FFFFFF',
  padding: '50px 10px 80px 60px'
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
  alignItems: 'flex-start',
  width: '1006px',
  whiteSpace: 'pre-wrap'
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

const LISTVIEW_CALENDAR_ICONS_STYLE: React.CSSProperties = {
  width: '43px',
  height: '20px',
  marginLeft: '5px'
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
  width: '100%',
  margin: '0px 0px 30px 0px',
  padding: '0px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  overflowWrap: 'break-word'
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

const EYE_ICON_STYLE: React.CSSProperties = {
  verticalAlign: 'bottom'
};

const SUB_ICON_STYLE: React.CSSProperties = {
  verticalAlign: 'sub'
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
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 700,
  fontSize: '14px',
  lineHeight: '18px',
  textDecoration: 'none',
  color: '#F26B55',
  margin: '0',
  padding: '0',
  cursor: 'pointer'
};

const USER_SETTINGS_IMAGE_STYLE: React.CSSProperties = {
  width: '468px',
  minWidth: '468px',
  height: '246px',
  minHeight: '246px',
  margin: '30px 0px',
  padding: '0px'
};

const INVITE_FOODIE_BUTTON_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontWeight: 700,
  fontSize: '14px',
  lineHeight: '18px',
  height: '18px'
};

const LOCATION_DROPDOWN_IMAGE_STYLE: React.CSSProperties = {
  width: '134px',
  minWidth: '134px',
  height: '24px',
  minHeight: '24px'
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
