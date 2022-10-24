import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import { HashLink } from 'react-router-hash-link';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;
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
                draggable='false'
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
                draggable='false'
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
                draggable='false'
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
                draggable='false'
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
                draggable='false'
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
          <h3 style={QUESTION_STYLE} >
            I want to find a specific event
          </h3>
          <div style={ANSWER_STYLE} >
            Head to Explore Events page. You can use the search bar to type a 
            specific keyword (event title, restaurant name, cuisine) 
            and/or you can use the filter button&nbsp;
            <img
              style={{...NO_SELECTION_STYLE, ...ICON_STYLE}}
              src='resources/help_page/icons/filter.svg'
              alt='Filter Icon'
              draggable={false}
            />
            &nbsp;to narrow down by:{'\n'}
            <ul style={UL_STYLE} >
              <li>Only upcoming events</li>
              <li>Reviews</li>
              <li>Seats available</li>
              <li>Price range</li>
              <li>Date</li>
              <li>And Cuisine</li>
            </ul>
            {'\n'}
            Any changes made on the filter overlay are automatically applied to 
            the results.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
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
            Once you are logged in, locate the event you are interested in. Hit 
            the button “Join this Event” located at the top right corner of the 
            event page. You will receive a notification saying you are going 
            and following that event.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How to see my event’s attendees?
          </h3>
          <div style={ANSWER_STYLE} >
            Once you are logged in, head to your event page. On the right side 
            you will see a list of attendees and, if you have more than 5 
            attendees, click on the last option (See All) to see a full list of 
            attendees.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            I was on the waitlist but I didn’t get a spot at an event
          </h3>
          <div style={ANSWER_STYLE} >
            The waitlist works in a first in first out way, meaning that once a 
            spot opens, everyone in the waitlist is notified and the first one 
            who joins gets the spot.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How to post a photo to an event page?
          </h3>
          <div style={ANSWER_STYLE} >
            Once you are logged in, locate the event page and scroll down until 
            you find the “Gallery” section and hit the button  “Add Photos”. A 
            popup will appear, click on the gray area to select your photo, or 
            drag and drop there to start uploading. Once the photo loads, you 
            will notice the bottom bar with the following options:{'\n'}
            <ul style={UL_STYLE} >
              <li><b>Rotate</b>: Rotate the image 90º clockwise.</li>
              <li><b>Zoom in</b>: Crop the image on a selected area.</li>
              <li><b>Zoom out</b>: Only available if the image is zoomed.</li>
              <li><b>Fill it based on the height</b>: Photos on NEA are 
              squared, so if you camera is set to take 4:3 photos, you have the 
              option to crop your image here, otherwise there will be black 
              bars (top and bottom for landscape photos; left and right for 
              portrait photos).</li>
              <li><b>Fill it based on the width</b>: Same as previous.</li>
              <li><b>Replace image</b>: Selecting a different photo will 
              discard all the changes you did with the current one.</li>
            </ul>
            {'\n'}
            You can add a caption on the right side. Once you are done, hit the 
            button “Post”. Repeat this process for every photo you want to 
            post.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 id='review_attended_event' style={QUESTION_STYLE} >
            How do I leave a review for an event I attended?
          </h3>
          <div style={ANSWER_STYLE} >
            Once you are logged in, after an event has happened, you will see a 
            notification asking you to leave a review on it. You can also head 
            to the event page, scroll down until you find the “Attendee 
            Reviews” and hit the button “Add Review”.{'\n'}
            A popup will appear with the following options:{'\n'}
            <ul style={UL_STYLE} >
              <li><b>Rate the restaurant</b>: select one from five stars</li>
              <li><b>Restaurant labels</b>: select all labels that apply to the 
              restaurant’s atmosphere</li>
              <li><b>Restaurant review</b>: the content on this field will be 
              posted on the restaurant page</li>
            </ul>
            {'\n'}
            Once you are done, hit the button “Submit”.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How do I change my review for an event?
          </h3>
          <div style={ANSWER_STYLE} >
            Once you are logged in, locate the event page and scroll down until 
            you find the “Attendee Reviews” section and hit the button 
            “Edit Review”. From there on follow the instructions on&nbsp;
            <HashLink
                style={LINK_STYLE}
                className={css(styles.linkStates)}
                to='#review_attended_event'
                draggable='false'
            >
              How do I leave a review for an event I attended?
            </HashLink>
            .
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How to invite a friend to an event?
          </h3>
          <div style={ANSWER_STYLE} >
            Once you are logged in, locate the event 
            page and click on the share icon&nbsp;
            <img
              style={{...NO_SELECTION_STYLE, ...ICON_STYLE}}
              src='resources/help_page/icons/share.svg'
              alt='Share Icon'
              draggable={false}
            />
            &nbsp;. A popup will appear, if your friend has an NEA account, 
            type their name with @ and hit the button “Notify them” so they can 
            receive a notification; or hit the button “Send via message” For 
            your friends who don’t have an NEA account yet, you can type their 
            email address and write them a personalized message. They will 
            receive an invitation to create an account and a link to the event 
            you shared with them.{'\n\n'}
            Additionally you can share your event on your social media channels 
            using the icons on the bottom part of the popup:{'\n'}
            <ul style={UL_STYLE} >
              <li>Twitter</li>
              <li>Facebook</li>
              <li>Reddit</li>
              <li>Or any other channel, using the unique link</li>
            </ul>
           <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 style={QUESTION_STYLE} >
            How do I delete past events from my events list?
          </h3>
          <div style={ANSWER_STYLE} >
            You can hide your past events from your user profile.{'\n'}
            Once you are logged in, head to your 
            profile and hit the button “Edit Profile” on the bottom part of 
            your user card. On the following page, scroll down to the “Tabs” 
            section and hit the eye icon&nbsp;
            <img
              style={{...NO_SELECTION_STYLE, ...ICON_STYLE, ...EYE_ICON_STYLE}}
              src='resources/help_page/icons/eye.svg'
              alt='Share Icon'
              draggable={false}
            />
            &nbsp;beside “Past Events” to hide that section to other users.
            <div style={NEW_LINE_STYLE} >{'\n'}</div>
          </div>
          <div style={DIVIDER_LINE_STYLE} />
          <h3 id='delete_photo_from_event' style={QUESTION_STYLE} >
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
                draggable='false'
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
                draggable='false'
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
                draggable={false}
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
                draggable='false'
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
                draggable='false'
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
                draggable={false}
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
                draggable={false}
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
                draggable='false'
            >
              How can I delete a photo from an event?
            </HashLink>
            .{'\n\n'}
            You can remove your tag from someone else’s photo, please see&nbsp;
            <HashLink
                style={LINK_STYLE}
                className={css(styles.linkStates)}
                to='#tagged_in_photo_without_permission'
                draggable='false'
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
                draggable='false'
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
                draggable='false'
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
                draggable='false'
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
            draggable='false'
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
  fontWeight: 'normal',
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
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '20px',
  height: '20px',
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
  lineHeight: '20px',
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
  width: '100%',
  margin: '0px 0px 30px 0px',
  padding: '0px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '20px',
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
  textDecoration: 'none',
  color: '#F26B55',
  margin: '0',
  padding: '0',
  cursor: 'pointer'
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
