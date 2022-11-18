import * as React from 'react';
import { DisplayMode } from '../../definitions';
import { PartnerWithUsModel } from './partner_with_us_model';
import { PartnerWithUsMessageSentPage } from
'./partner_with_us_message_sent_page';
import { PartnerWithUsPage } from './partner_with_us_page';

interface Properties {
  /** The display mode. */
  displayMode: DisplayMode;

  /** PartnerWithUs model. */
  model: PartnerWithUsModel;
}

interface State {
  isLoaded: boolean;
  hasError:  boolean;
  name: string;
  email: string;
  profileLink: string;
  message: string;
  page: PartnerWithUsPage.Page
}

export class PartnerWithUsController extends React.Component<Properties,
    State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isLoaded: false,
      name: '',
      email: '',
      profileLink: '',
      hasError: false,
      message: '',
      page: PartnerWithUsPage.Page.INITIAL
    };
  }

  public render(): JSX.Element {
    if (this.state.isLoaded) {
      if (this.state.page === PartnerWithUsPage.Page.INITIAL) {
        return <PartnerWithUsPage
          displayMode={this.props.displayMode}
          name={this.state.name}
          email={this.state.email}
          message={this.state.message}
          profileLink={this.state.profileLink}
          onSendEmail={this.handleEmailSendClick}
        />;
      }
      return <PartnerWithUsMessageSentPage
        displayMode={this.props.displayMode} />;
    }
    return <div />;
  }

  public async componentDidMount(): Promise<void> {
    try {
      await this.props.model.load();
      this.setState({
        isLoaded: true
      });
    } catch {
      this.setState({
        isLoaded: true,
        hasError: true
      });
    }
  }

  private handleEmailSendClick = async (name: string, email: string,
      profileLink: string, message: string) => {
    try {
      await this.props.model.sendEmail(name, email, profileLink, message);
      this.setState({
        name: name,
        email: email,
        profileLink: profileLink,
        page: PartnerWithUsPage.Page.MESSAGE_SENT
      });
    } catch {
      this.setState({
        name: name,
        email: email,
        profileLink: profileLink,
        message: message,
        page: PartnerWithUsPage.Page.INITIAL
      });
    }
  }
}