import * as React from 'react';
import { DisplayMode } from '../../definitions';
import { PartnerWithUsModel, PartnerWithUsPage } from '../../pages';
import { PartnerWithUsMessageSentModal } from
'./partner_with_us_message_sent_modal';
import { PartnerWithUsModal} from './partner_with_us_modal';

interface Properties {
  /** The display mode. */
  displayMode: DisplayMode;

  /** PartnerWithUs model. */
  model: PartnerWithUsModel;

  /** Indicates the close button is clicked. */
  onClose: () => void;
}

interface State {
  name: string;
  email: string;
  profileLink: string;
  message: string;
  page: PartnerWithUsPage.Page
  errorCode: PartnerWithUsPage.PageErrorCode;
}

export class PartnerWithUsModalController extends React.Component<Properties,
    State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      name: '',
      email: '',
      profileLink: '',
      message: '',
      page: PartnerWithUsPage.Page.INITIAL,
      errorCode: PartnerWithUsPage.PageErrorCode.NONE
    };
  }

  public render(): JSX.Element {
    if (this.state.page === PartnerWithUsPage.Page.INITIAL) {
      return <PartnerWithUsModal
        displayMode={this.props.displayMode}
        name={this.state.name}
        email={this.state.email}
        message={this.state.message}
        profileLink={this.state.profileLink}
        errorCode={this.state.errorCode}
        onSendEmail={this.handleEmailSendClick}
        onClose={this.props.onClose}
      />;
    }
    return <PartnerWithUsMessageSentModal
      displayMode={this.props.displayMode}
      onClose={this.props.onClose}
    />;
  }

  private handleEmailSendClick = async (name: string, email: string,
      profileLink: string, message: string) => {
    try {
      await this.props.model.sendEmail(name, email, profileLink, message);
      this.setState({
        name: name,
        email: email,
        profileLink: profileLink,
        message: message,
        page: PartnerWithUsPage.Page.MESSAGE_SENT,
        errorCode: PartnerWithUsPage.PageErrorCode.NONE
      });
    } catch {
      this.setState({
        name: name,
        email: email,
        profileLink: profileLink,
        message: message,
        page: PartnerWithUsPage.Page.INITIAL,
        errorCode: PartnerWithUsPage.PageErrorCode.SEND_FAILED
      });
    }
  }
}
