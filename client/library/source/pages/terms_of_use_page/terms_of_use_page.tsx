import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import * as Router from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;
}

export class TermsOfUsePage extends React.Component<Properties> {
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
      <div id='top' style={containerStyle} >
        <div style={contentContainerStyle} >
          <h1 style={H1_STYLE} >Terms of Use</h1>
          <div style={ANSWER_STYLE} >
            Last updated Oct 5th, 2022
          </div>
          <h2 style={H2_STYLE} >
            Agreement to Terms
          </h2>
          <div style={ANSWER_STYLE} >
            These Terms of Use constitute a legally binding agreement made 
            between you, whether personally or on behalf of an entity (“you”) 
            and Never Eat Alone Inc. ("<b>Company</b>", “<b>we</b>”, 
            “<b>us</b>”, or “<b>our</b>”), concerning your access to and use of 
            the https://www.nevereatalone.net/ website as well as any other 
            media form, media channel, mobile website or mobile application 
            related, linked, or otherwise connected thereto (collectively, the 
            “<b>Site</b>”). We are registered in Canada and have our 
            registered office at 55 Eglinton Ave E, Suite 710, Toronto, Ontario 
            M4P 1G8. You agree that by accessing the Site, you have read, 
            understood, and agreed to be bound by all of these Terms of Use. IF 
            YOU DO NOT AGREE WITH ALL OF THESE TERMS OF USE, THEN YOU ARE 
            EXPRESSLY PROHIBITED FROM USING THE SITE AND YOU MUST DISCONTINUE 
            USE IMMEDIATELY.{'\n\n'}
            Supplemental terms and conditions or documents that may be posted 
            on the Site from time to time are hereby expressly incorporated 
            herein by reference. We reserve the right, in our sole discretion, 
            to make changes or modifications to these Terms of Use at any time 
            and for any reason. We will alert you about any changes by updating 
            the “Last updated” date of these Terms of Use, and you waive any 
            right to receive specific notice of each such change. Please ensure 
            that you check the applicable Terms every time you use our Site so 
            that you understand which Terms apply. You will be subject to, and 
            will be deemed to have been made aware of and to have accepted, the 
            changes in any revised Terms of Use by your continued use of the 
            Site after the date such revised Terms of Use are posted.{'\n\n'}
            The information provided on the Site is not intended for 
            distribution to or use by any person or entity in any jurisdiction 
            or country where such distribution or use would be contrary to law 
            or regulation or which would subject us to any registration 
            requirement within such jurisdiction or country. Accordingly, 
            those persons who choose to access the Site from other locations do 
            so on their own initiative and are solely responsible for 
            compliance with local laws, if and to the extent local laws are 
            applicable.{'\n\n'}
            The Site is intended for users who are at least 18 years old. 
            Persons under the age of 18 are not permitted to use or register 
            for the Site.
          </div>
          <h2 style={H2_STYLE} >
            Intelectual Property Rights
          </h2>
          <div style={ANSWER_STYLE} >
            Unless otherwise indicated, the Site is our proprietary property 
            and all source code, databases, functionality, software, website 
            designs, audio, video, text, photographs, and graphics on the Site 
            (collectively, the “Content”) and the trademarks, service marks, 
            and logos contained therein (the “Marks”) are owned or controlled 
            by us or licensed to us, and are protected by copyright and 
            trademark laws and various other intellectual property rights and 
            unfair competition laws of the United States, international 
            copyright laws, and international conventions. The Content and the 
            Marks are provided on the Site “AS IS” for your information and 
            personal use only. Except as expressly provided in these Terms of 
            Use, no part of the Site and no Content or Marks may be copied, 
            reproduced, aggregated, republished, uploaded, posted, publicly 
            displayed, encoded, translated, transmitted, distributed, sold, 
            licensed, or otherwise exploited for any commercial purpose 
            whatsoever, without our express prior written permission.{'\n\n'}
            Provided that you are eligible to use the Site, you are granted a 
            limited license to access and use the Site and to download or print 
            a copy of any portion of the Content to which you have properly 
            gained access solely for your personal, non-commercial use. We 
            reserve all rights not expressly granted to you in and to the Site, 
            the Content and the Marks.
          </div>
          <h2 style={H2_STYLE} >
            User Representations
          </h2>
          <div style={ANSWER_STYLE} >
            By using the Site, you represent and warrant that: (1) all 
            registration information you submit will be true, accurate, 
            current, and complete; (2) you will maintain the accuracy of such 
            information and promptly update such registration information as 
            necessary; (3) you have the legal capacity and you agree to comply 
            with these Terms of Use; (4) you are not a minor in the 
            jurisdiction in which you reside; (5) you will not access the Site 
            through automated or non-human means, whether through a bot, 
            script, or otherwise; (6) you will not use the Site for any illegal 
            or unauthorized purpose; and (7) your use of the Site will not 
            violate any applicable law or regulation.{'\n\n'}
            If you provide any information that is untrue, inaccurate, not 
            current, or incomplete, we have the right to suspend or terminate 
            your account and refuse any and all current or future use of the 
            Site (or any portion thereof).
          </div>
          <h2 style={H2_STYLE} >
            User Registration
          </h2>
          <div style={ANSWER_STYLE} >
            You may be required to register with the Site. You agree to keep 
            your password confidential and will be responsible for all use of 
            your account and password. We reserve the right to remove, reclaim, 
            or change a username you select if we determine, in our sole 
            discretion, that such username is inappropriate, obscene, or 
            otherwise objectionable.
          </div>
          <h2 style={H2_STYLE} >
            Prohibited activities
          </h2>
          <div style={ANSWER_STYLE} >
            You may not access or use the Site for any purpose other than that 
            for which we make the Site available. The Site may not be used in 
            connection with any commercial endeavors except those that are 
            specifically endorsed or approved by us.{'\n\n'}
            As a user of the Site, you agree not to:{'\n\n'}
            <ol style={OL_STYLE} >
              <li>
                Systematically retrieve data or other content from the Site 
                to create or compile, directly or indirectly, a collection, 
                compilation, database, or directory without written permission 
                from us.
              </li>
              <li>
                Trick, defraud, or mislead us and other users, especially in 
                any attempt to learn sensitive account information such as user 
                passwords.
              </li>
              <li>
                Circumvent, disable, or otherwise interfere with 
                security-related features of the Site, including features that 
                prevent or restrict the use or copying of any Content or 
                enforce limitations on the use of the Site and/or the Content 
                contained therein.
              </li>
              <li>
                Disparage, tarnish, or otherwise harm, in our opinion, us 
                and/or the Site.
              </li>
              <li>
                Use any information obtained from the Site in order to harass, 
                abuse, or harm another person.
              </li>
              <li>
                Make improper use of our support services or submit false 
                reports of abuse or misconduct.
              </li>
              <li>
                Use the Site in a manner inconsistent with any applicable laws 
                or regulations.
              </li>
              <li>
                Use the Site to advertise or offer to sell goods and services.
              </li>
              <li>Engage in unauthorized framing of or linking to the Site.</li>
              <li>
                Upload or transmit (or attempt to upload or to transmit) 
                viruses, Trojan horses, or other material, including excessive 
                use of capital letters and spamming (continuous posting of 
                repetitive text), that interferes with any party’s 
                uninterrupted use and enjoyment of the Site or modifies, 
                impairs, disrupts, alters, or interferes with the use, 
                features, functions, operation, or maintenance of the Site.
              </li>
              <li>
                Engage in any automated use of the system, such as using 
                scripts to send comments or messages, or using any data mining, 
                robots, or similar data gathering and extraction tools.
              </li>
              <li>
                Delete the copyright or other proprietary rights notice from 
                any Content.
              </li>
              <li>
                Attempt to impersonate another user or person or use the 
                username of another user.
              </li>
              <li>Sell or otherwise transfer your profile.</li>
              <li>
                Upload or transmit (or attempt to upload or to transmit) any 
                material that acts as a passive or active information 
                collection or transmission mechanism, including without 
                limitation, clear graphics interchange formats (“gifs”), 1×1 
                pixels, web bugs, cookies, or other similar devices (sometimes 
                referred to as “spyware” or “passive collection mechanisms” or 
                “pcms”).
              </li>
              <li>
                Interfere with, disrupt, or create an undue burden on the Site 
                or the networks or services connected to the Site.
              </li>
              <li>
                Harass, annoy, intimidate, or threaten any of our employees or 
                agents engaged in providing any portion of the Site to you.
              </li>
              <li>
                Attempt to bypass any measures of the Site designed to prevent 
                or restrict access to the Site, or any portion of the Site.
              </li>
              <li>
                Copy or adapt the Site’s software, including but not limited to 
                Flash, PHP, HTML, JavaScript, or other code.
              </li>
              <li>
                Except as permitted by applicable law, decipher, decompile, 
                disassemble, or reverse engineer any of the software comprising 
                or in any way making up a part of the Site.
              </li>
              <li>
                Except as may be the result of standard search engine or 
                Internet browser usage, use, launch, develop, or distribute any 
                automated system, including without limitation, any spider, 
                robot, cheat utility, scraper, or offline reader that accesses 
                the Site, or using or launching any unauthorized script or 
                other software.
              </li>
              <li>
                Make any unauthorized use of the Site, including collecting 
                usernames and/or email addresses of users by electronic or 
                other means for the purpose of sending unsolicited email, or 
                creating user accounts by automated means or under false 
                pretenses.
              </li>
              <li>
                Use the Site as part of any effort to compete with us or 
                otherwise use the Site and/or the Content for any 
                revenue-generating endeavor or commercial enterprise.
              </li>
              <li>
                Intentionally publish incorrect information about a person or 
                business.
              </li>
            </ol>
          </div>
          <h2 style={H2_STYLE} >
            Social Media
          </h2>
          <div style={ANSWER_STYLE} >
            As part of the functionality of the Site, you may link your account 
            with online accounts you have with third-party service providers 
            (each such account, a “Third-Party Account”) by either: (1) 
            providing your Third-Party Account login information through the 
            Site; or (2) allowing us to access your Third-Party Account, as is 
            permitted under the applicable terms and conditions that govern 
            your use of each Third-Party Account. You represent and warrant 
            that you are entitled to disclose your Third-Party Account login 
            information to us and/or grant us access to your Third-Party 
            Account, without breach by you of any of the terms and conditions 
            that govern your use of the applicable Third-Party Account, and 
            without obligating us to pay any fees or making us subject to any 
            usage limitations imposed by the third-party service provider of 
            the Third-Party Account. By granting us access to any Third-Party 
            Accounts, you understand that (1) we may access, make available, 
            and store (if applicable) any content that you have provided to and 
            stored in your Third-Party Account (the “Social Network Content”) 
            so that it is available on and through the Site via your account, 
            including without limitation any friend lists and (2) we may submit 
            to and receive from your Third-Party Account additional information 
            to the extent you are notified when you link your account with the 
            Third-Party Account. Depending on the Third-Party Accounts you 
            choose and subject to the privacy settings that you have set in 
            such Third-Party Accounts, personally identifiable information that 
            you post to your Third-Party Accounts may be available on and 
            through your account on the Site. Please note that if a Third-Party 
            Account or associated service becomes unavailable or our access to 
            such Third Party Account is terminated by the third-party service 
            provider, then Social Network Content may no longer be available on 
            and through the Site. You will have the ability to disable the 
            connection between your account on the Site and your Third-Party 
            Accounts at any time. PLEASE NOTE THAT YOUR RELATIONSHIP WITH THE 
            THIRD-PARTY SERVICE PROVIDERS ASSOCIATED WITH YOUR THIRD-PARTY 
            ACCOUNTS IS GOVERNED SOLELY BY YOUR AGREEMENT(S) WITH SUCH 
            THIRD-PARTY SERVICE PROVIDERS. We make no effort to review any 
            Social Network Content for any purpose, including but not limited 
            to, for accuracy, legality, or non-infringement, and we are not 
            responsible for any Social Network Content. You acknowledge and 
            agree that we may access your email address book associated with a 
            Third-Party Account and your contacts list stored on your mobile 
            device or tablet computer solely for purposes of identifying and 
            informing you of those contacts who have also registered to use the 
            Site. You can deactivate the connection between the Site and your 
            Third-Party Account by contacting us using the contact information 
            below or through your account settings (if applicable). We will 
            attempt to delete any information stored on our servers that was 
            obtained through such Third-Party Account, except the username and 
            profile picture that become associated with your account.
          </div>
          <h2 style={H2_STYLE} >
            fees and refunds
          </h2>
          <div style={ANSWER_STYLE} >
            Access to the Site is free, but in some cases we charge fees for 
            certain events on the Site. These fees may vary based on individual 
            arrangements between the Company and certain restaurants, or based 
            on our choice of menu and seating options. The fees charged to you 
            upon joining such an event may include without limitation: event 
            fees, cancellation fees, taxes and processing fees. The Company 
            does not control (and thus cannot disclose) fees levied by your 
            bank and/or credit card company, including fees for registrations 
            in foreign currencies or from foreign persons. Be sure to check 
            with your bank or credit card company prior to engaging in a 
            transaction to understand all applicable fees, credit card 
            surcharges and currency conversion rates.{'\n\n'}
            Never Eat Alone Inc. puts a hold for the amount of a restaurant’s 
            cancellation fee in advance of events in cases where the restaurant 
            in question requires such a fee for canceled reservations. This fee 
            is typically not charged if an event ends and the restaurant 
            confirms that you have attended the event. To assist us in 
            maintaining a consistently high level of service for you and for 
            the restaurants, users must remove any seats that they will be 
            unable to attend at least 48 hours in advance of the event start 
            time. In the cases where you cancel your seat less than 48 hours in 
            advance of the event start time, or if you are unable to attend 
            such an event and you fail to cancel at least 48 hours in advance 
            of the event start time, we will send you an email letting you know 
            that our records indicate that you were a no-show. Never Eat Alone 
            Inc. reserves the right to charge your payment method for the 
            amount of the cancellation fee in such cases subject to the 
            restaurant’s cancellation and no-show policies.{'\n\n'}
            Some event fees charged for joining certain events are 
            non-refundable fees meant, on average, to defray certain costs 
            incurred by the Company. By paying this fee and joining such an 
            event, you acknowledge that the event fee may not be refunded if 
            you decide to remove your seat with less than 24 hours’ notice. 
            Certain other event fees may cover the cost of a set menu at an 
            event. The Company may process cancellations and refunds for these 
            events on a case-by-case scenario, subject to the restaurant’s 
            cancellation and no-show policies. If you need additional 
            information or assistance with an event fee or charge, please&nbsp;
            <span style={LINK_SPAN_STYLE} >
              <a
                  style={LINK_STYLE}
                  className={css(styles.link)}
                  href='mailto:support@nevereatalone.net'
                  target='_blank'
                  rel='noopener noreferrer'
              >
                click here
              </a>
            </span>&nbsp;to send us an email.
          </div>
          <h2 style={H2_STYLE} >
            Submissions
          </h2>
          <div style={ANSWER_STYLE} >
            You acknowledge and agree that any questions, comments, 
            suggestions, ideas, feedback, or other information regarding the 
            Site ("Submissions") provided by you to us are non-confidential and 
            shall become our sole property. We shall own exclusive rights, 
            including all intellectual property rights, and shall be entitled 
            to the unrestricted use and dissemination of these Submissions for 
            any lawful purpose, commercial or otherwise, without acknowledgment 
            or compensation to you. You hereby waive all moral rights to any 
            such Submissions, and you hereby warrant that any such Submissions 
            are original with you or that you have the right to submit such 
            Submissions. You agree there shall be no recourse against us for 
            any alleged or actual infringement or misappropriation of any 
            proprietary right in your Submissions.
          </div>
          <h2 style={H2_STYLE} >
            Third-Party Website And Content
          </h2>
          <div style={ANSWER_STYLE} >
            The Site may contain (or you may be sent via the Site) links to 
            other websites ("Third-Party Websites") as well as articles, 
            photographs, text, graphics, pictures, designs, music, sound, 
            video, information, applications, software, and other content or 
            items belonging to or originating from third parties ("Third-Party 
            Content"). Such Third-Party Websites and Third-Party Content are 
            not investigated, monitored, or checked for accuracy, 
            appropriateness, or completeness by us, and we are not responsible 
            for any Third-Party Websites accessed through the Site or any 
            Third-Party Content posted on, available through, or installed from 
            the Site, including the content, accuracy, offensiveness, opinions, 
            reliability, privacy practices, or other policies of or contained 
            in the Third-Party Websites or the Third-Party Content. Inclusion 
            of, linking to, or permitting the use or installation of any 
            Third-Party Websites or any Third-Party Content does not imply 
            approval or endorsement thereof by us. If you decide to leave the 
            Site and access the Third-Party Websites or to use or install any 
            Third-Party Content, you do so at your own risk, and you should be 
            aware these Terms of Use no longer govern. You should review the 
            applicable terms and policies, including privacy and data gathering 
            practices, of any website to which you navigate from the Site or 
            relating to any applications you use or install from the Site. Any 
            purchases you make through Third-Party Websites will be through 
            other websites and from other companies, and we take no 
            responsibility whatsoever in relation to such purchases which are 
            exclusively between you and the applicable third party. You agree 
            and acknowledge that we do not endorse the products or services 
            offered on Third-Party Websites and you shall hold us harmless from 
            any harm caused by your purchase of such products or services. 
            Additionally, you shall hold us harmless from any losses sustained 
            by you or harm caused to you relating to or resulting in any way 
            from any Third-Party Content or any contact with Third-Party 
            Websites.
          </div>
          <h2 style={H2_STYLE} >
            Site Management
          </h2>
          <div style={ANSWER_STYLE} >
            We reserve the right, but not the obligation, to: (1) monitor the 
            Site for violations of these Terms of Use; (2) take appropriate 
            legal action against anyone who, in our sole discretion, violates 
            the law or these Terms of Use, including without limitation, 
            reporting such user to law enforcement authorities; (3) in our sole 
            discretion and without limitation, refuse, restrict access to, 
            limit the availability of, or disable (to the extent 
            technologically feasible) any of your Contributions or any portion 
            thereof; (4) in our sole discretion and without limitation, notice, 
            or liability, to remove from the Site or otherwise disable all 
            files and content that are excessive in size or are in any way 
            burdensome to our systems; and (5) otherwise manage the Site in a 
            manner designed to protect our rights and property and to 
            facilitate the proper functioning of the Site.
          </div>
          <h2 style={H2_STYLE} >
            Privacy Policy
          </h2>
          <div style={ANSWER_STYLE} >
            We care about data privacy and security. Please review our Privacy 
            Policy:&nbsp;
            <span style={LINK_SPAN_STYLE} >
              <Router.Link
                  to='/privacy-policy'
                  style={LINK_STYLE}
                  className={css(styles.link)}
              >
                https://www.nevereatalone.net/privacy-policy
              </Router.Link>
            </span>. By using the 
            Site, you agree to be bound by our Privacy Policy, which is 
            incorporated into these Terms of Use. Please be advised the Site is 
            hosted in Canada. If you access the Site from any other region of 
            the world with laws or other requirements governing personal data 
            collection, use, or disclosure that differ from applicable laws in 
            Canada, then through your continued use of the Site, you are 
            transferring your data to Canada, and you agree to have your data 
            transferred to and processed in Canada.
          </div>
          <h2 style={H2_STYLE} >
            Copyright Infringements
          </h2>
          <div style={ANSWER_STYLE} >
            We respect the intellectual property rights of others. If you 
            believe that any material available on or through the Site 
            infringes upon any copyright you own or control, please immediately 
            notify us using the contact information provided below (a 
            “Notification”). A copy of your Notification will be sent to the 
            person who posted or stored the material addressed in the 
            Notification. Please be advised that pursuant to applicable law you 
            may be held liable for damages if you make material 
            misrepresentations in a Notification. Thus, if you are not sure 
            that material located on or linked to by the Site infringes your 
            copyright, you should consider first contacting an attorney.
          </div>
          <h2 style={H2_STYLE} >
            Term And Termination
          </h2>
          <div style={ANSWER_STYLE} >
            These Terms of Use shall remain in full force and effect while you 
            use the Site. WITHOUT LIMITING ANY OTHER PROVISION OF THESE TERMS 
            OF USE, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT 
            NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SITE (INCLUDING 
            BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR 
            NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY 
            REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE TERMS OF 
            USE OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR 
            USE OR PARTICIPATION IN THE SITE OR DELETE YOUR ACCOUNT AND ANY 
            CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT 
            WARNING, IN OUR SOLE DISCRETION.{'\n\n'}
            If we terminate or suspend your account for any reason, you are 
            prohibited from registering and creating a new account under your 
            name, a fake or borrowed name, or the name of any third party, even 
            if you may be acting on behalf of the third party. In addition to 
            terminating or suspending your account, we reserve the right to 
            take appropriate legal action, including without limitation 
            pursuing civil, criminal, and injunctive redress.
          </div>
          <h2 style={H2_STYLE} >
            Modifications And Interruptions
          </h2>
          <div style={ANSWER_STYLE} >
            We reserve the right to change, modify, or remove the contents of 
            the Site at any time or for any reason at our sole discretion 
            without notice. However, we have no obligation to update any 
            information on our Site. We also reserve the right to modify or 
            discontinue all or part of the Site without notice at any time. We 
            will not be liable to you or any third party for any modification, 
            price change, suspension, or discontinuance of the Site.{'\n\n'}
            We cannot guarantee the Site will be available at all times. We may 
            experience hardware, software, or other problems or need to perform 
            maintenance related to the Site, resulting in interruptions, 
            delays, or errors. We reserve the right to change, revise, update, 
            suspend, discontinue, or otherwise modify the Site at any time or 
            for any reason without notice to you. You agree that we have no 
            liability whatsoever for any loss, damage, or inconvenience caused 
            by your inability to access or use the Site during any downtime or 
            discontinuance of the Site. Nothing in these Terms of Use will be 
            construed to obligate us to maintain and support the Site or to 
            supply any corrections, updates, or releases in connection 
            therewith.
          </div>
          <h2 style={H2_STYLE} >
            Governing Law
          </h2>
          <div style={ANSWER_STYLE} >
            These Terms shall be governed by and defined following the laws of 
            Canada. Never Eat Alone Inc. and yourself irrevocably consent that 
            the courts of Canada shall have exclusive jurisdiction to resolve 
            any dispute which may arise in connection with these terms.
          </div>
          <h2 style={H2_STYLE} >
            Dispute Resolution
          </h2>
          <div style={ANSWER_STYLE} >
            You agree to irrevocably submit all disputes related to Terms or 
            the relationship established by this Agreement to the jurisdiction 
            of the Canada courts. Never Eat Alone Inc. shall also maintain the 
            right to bring proceedings as to the substance of the matter in the 
            courts of the country where you reside or, if these Terms are 
            entered into in the course of your trade or profession, the state 
            of your principal place of business.
          </div>
          <h2 style={H2_STYLE} >
            Corrections
          </h2>
          <div style={ANSWER_STYLE} >
            There may be information on the Site that contains typographical 
            errors, inaccuracies, or omissions, including descriptions, 
            pricing, availability, and various other information. We reserve 
            the right to correct any errors, inaccuracies, or omissions and to 
            change or update the information on the Site at any time, without 
            prior notice.
          </div>
          <h2 style={H2_STYLE} >
            Disclaimer
          </h2>
          <div style={ANSWER_STYLE} >
            The site is provided on an as-is and as-available basis. You agree 
            that your use of the site and our services will be at your sole 
            risk. To the fullest extent permitted by law, we disclaim all 
            warranties, express or implied, in connection with the site and 
            your use thereof, including, without limitation, the implied 
            warranties of merchantability, fitness for a particular purpose, 
            and non-infringement. We make no warranties or representations 
            about the accuracy or completeness of the site’s content or the 
            content of any websites linked to the site and we will assume no 
            liability or responsibility for any (1) errors, mistakes, or 
            inaccuracies of content and materials, (2) personal injury or 
            property damage, of any nature whatsoever, resulting from your 
            access to and use of the site, (3) any unauthorized access to or 
            use of our secure servers and/or any and all personal information 
            and/or financial information stored therein, (4) any interruption 
            or cessation of transmission to or from the site, (5) any bugs, 
            viruses, trojan horses, or the like which may be transmitted to or 
            through the site by any third party, and/or (6) any errors or 
            omissions in any content and materials or for any loss or damage of 
            any kind incurred as a result of the use of any content posted, 
            transmitted, or otherwise made available via the site. We do not 
            warrant, endorse, guarantee, or assume responsibility for any 
            product or service advertised or offered by a third party through 
            the site, any hyperlinked website, or any website or mobile 
            application featured in any banner or other advertising, and we 
            will not be a party to or in any way be responsible for monitoring 
            any transaction between you and any third-party providers of 
            products or services. As with the purchase of a product or service 
            through any medium or in any environment, you should use your best 
            judgment and exercise caution where appropriate.
          </div>
          <h2 style={H2_STYLE} >
            limitations Of Liability
          </h2>
          <div style={ANSWER_STYLE} >
            In no event will we or our directors, employees, or agents be 
            liable to you or any third party for any direct, indirect, 
            consequential, exemplary, incidental, special, or punitive damages, 
            including lost profit, lost revenue, loss of data, or other damages 
            arising from your use of the site, even if we have been advised of 
            the possibility of such damages.
          </div>
          <h2 style={H2_STYLE} >
            Indemnification
          </h2>
          <div style={ANSWER_STYLE} >
            You agree to defend, indemnify, and hold us harmless, including our 
            subsidiaries, affiliates, and all of our respective officers, 
            agents, partners, and employees, from and against any loss, damage, 
            liability, claim, or demand, including reasonable attorneys’ fees 
            and expenses, made by any third party due to or arising out of: (1) 
            your Contributions; (2) use of the Site; (3) breach of these Terms 
            of Use; (4) any breach of your representations and warranties set 
            forth in these Terms of Use; (5) your violation of the rights of a 
            third party, including but not limited to intellectual property 
            rights; or (6) any overt harmful act toward any other user of the 
            Site with whom you connected via the Site. Notwithstanding the 
            foregoing, we reserve the right, at your expense, to assume the 
            exclusive defense and control of any matter for which you are 
            required to indemnify us, and you agree to cooperate, at your 
            expense, with our defense of such claims. We will use reasonable 
            efforts to notify you of any such claim, action, or proceeding 
            which is subject to this indemnification upon becoming aware of it.
          </div>
          <h2 style={H2_STYLE} >
            User Data
          </h2>
          <div style={ANSWER_STYLE} >
            We will maintain certain data that you transmit to the Site for the 
            purpose of managing the performance of the Site, as well as data 
            relating to your use of the Site. Although we perform regular 
            routine backups of data, you are solely responsible for all data 
            that you transmit or that relates to any activity you have 
            undertaken using the Site. You agree that we shall have no 
            liability to you for any loss or corruption of any such data, and 
            you hereby waive any right of action against us arising from any 
            such loss or corruption of such data.
          </div>
          <h2 style={H2_STYLE} >
            Electronic Communications, Transactions, And Signatures
          </h2>
          <div style={ANSWER_STYLE} >
            Visiting the Site, sending us emails, and completing online forms 
            constitute electronic communications. You consent to receive 
            electronic communications, and you agree that all agreements, 
            notices, disclosures, and other communications we provide to you 
            electronically, via email and on the Site, satisfy any legal 
            requirement that such communication be in writing. YOU HEREBY AGREE 
            TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER 
            RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND 
            RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE 
            SITE. You hereby waive any rights or requirements under any 
            statutes, regulations, rules, ordinances, or other laws in any 
            jurisdiction which require an original signature or delivery or 
            retention of non-electronic records, or to payments or the granting 
            of credits by any means other than electronic means.
          </div>
          <h2 style={H2_STYLE} >
            Miscellaneous
          </h2>
          <div style={ANSWER_STYLE} >
            These Terms of Use and any policies or operating rules posted by us 
            on the Site or in respect to the Site constitute the entire 
            agreement and understanding between you and us. Our failure to 
            exercise or enforce any right or provision of these Terms of Use 
            shall not operate as a waiver of such right or provision. These 
            Terms of Use operate to the fullest extent permissible by law. We 
            may assign any or all of our rights and obligations to others at 
            any time. We shall not be responsible or liable for any loss, 
            damage, delay, or failure to act caused by any cause beyond our 
            reasonable control. If any provision or part of a provision of 
            these Terms of Use is determined to be unlawful, void, or 
            unenforceable, that provision or part of the provision is deemed 
            severable from these Terms of Use and does not affect the validity 
            and enforceability of any remaining provisions. There is no joint 
            venture, partnership, employment or agency relationship created 
            between you and us as a result of these Terms of Use or use of the 
            Site. You agree that these Terms of Use will not be construed 
            against us by virtue of having drafted them. You hereby waive any 
            and all defenses you may have based on the electronic form of these 
            Terms of Use and the lack of signing by the parties hereto to 
            execute these Terms of Use.
          </div>
          <h2 style={H2_STYLE} >
            Contact Us
          </h2>
          <div style={ANSWER_STYLE} >
            In order to resolve a complaint regarding the Site or to receive 
            further information regarding use of the Site, please contact us at:
            {'\n\n'}
            <b>Never Eat Alone Inc.</b>{'\n'}
            55 Eglinton Ave E{'\n'}
            Suite 710{'\n'}
            Toronto, Ontario M4P 1G8{'\n'}
            Canada{'\n'}
            <a
                style={LINK_STYLE}
                className={css(styles.link)}
                href='mailto:info@nevereatalone.net'
                target='_blank'
                rel='noopener noreferrer'
            >
              info@nevereatalone.net
            </a>
          </div>
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
