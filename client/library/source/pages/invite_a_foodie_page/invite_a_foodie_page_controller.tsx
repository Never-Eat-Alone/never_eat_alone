import * as EmailValidator from 'email-validator';
import * as React from 'react';
import { EmailInputField } from '../../components';
import { DisplayMode, InviteEmail } from '../../definitions';
import { InviteAFoodieModel } from '../../modals/invite_a_foodie_modal';
import { InviteAFoodiePage } from './invite_a_foodie_page';

interface Properties {
  displayMode: DisplayMode;
  model: InviteAFoodieModel;
  maxContentLength: number;
}

interface State {
  content: string;
  emailListText: string;
  errorCode: InviteAFoodiePage.ErrorCode;
  emailInputFieldErrorCode: EmailInputField.ErrorCode;
  textAreaErrorCode: InviteAFoodiePage.TextErrorCode;
  wrongEmails: string[];
  isLoaded: boolean;
  isSuccess: boolean;
}

export class InviteAFoodiePageController extends React.Component<Properties,
    State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      content: 'Hey foodie friend!\n\nHave you heard of this site? It\'s ' +
        'called NeverEatAlone and it lets us discover amazing new places to ' +
        'eat! You can view the events I\'m attending and come along with me. ' +
        'I hope to see you there!',
      emailListText: '',
      errorCode: InviteAFoodiePage.ErrorCode.NONE,
      emailInputFieldErrorCode: EmailInputField.ErrorCode.NONE,
      textAreaErrorCode: InviteAFoodiePage.TextErrorCode.NONE,
      wrongEmails: [],
      isLoaded: false,
      isSuccess: false
    };
  }

  public render(): JSX.Element {
    if (this.state.isLoaded) {
      return (
        <InviteAFoodiePage
          displayMode={this.props.displayMode}
          emailList={this.state.emailListText}
          content={this.state.content}
          maxContentLength={this.props.maxContentLength}
          errorCode={this.state.errorCode}
          emailInputFieldErrorCode={this.state.emailInputFieldErrorCode}
          textAreaErrorCode={this.state.textAreaErrorCode}
          wrongEmails={this.state.wrongEmails}
          onContentChange={this.handleContentChange}
          onEmailListChange={this.handleEmailListChange}
          onEmailListFocus={this.handleEmailListOnFocus}
          onEmailListBlur={this.handleEmailListOnBlur}
          userInvitationCode={this.props.model.userInvitationCode}
          onSendInviteEmail={this.handleSendInviteEmailClick}
          isSuccess={this.state.isSuccess}
        />);
    }
    return <div />;
  }

  public async componentDidMount(): Promise<void> {
    try {
      await this.props.model.load();
      this.setState({
        isLoaded: true,
        errorCode: InviteAFoodiePage.ErrorCode.NONE
      });
    } catch {
      this.setState({
        isLoaded: true,
        errorCode: InviteAFoodiePage.ErrorCode.NO_CONNECTION
      });
    }
    return;
  }

  private handleContentChange = (value: string) => {
    if (value.length > this.props.maxContentLength) {
      this.setState({
        textAreaErrorCode: InviteAFoodiePage.TextErrorCode.TEXT_OVERFLOW,
        content: value
      });
    } else {
      this.setState({
        textAreaErrorCode: InviteAFoodiePage.TextErrorCode.NONE,
        content: value
      });
    }
  }

  private handleEmailListChange = (value: string) => {
    this.setState({ emailListText: value });
  }

  private handleEmailListOnFocus = () => {
    this.setState({ emailInputFieldErrorCode: EmailInputField.ErrorCode.NONE });
  }

  private handleEmailListOnBlur = () => {
    const { errorCode, wrongEmails } = this.verifyEmailList(
      this.state.emailListText);
    this.setState({ emailInputFieldErrorCode: errorCode,
      wrongEmails: wrongEmails });
  }

  private verifyEmailList = (emailListText: string) => {
    const wrongEmails: string[] = [];
    if (!emailListText || emailListText.trim().length === 0) {
      return { errorCode: EmailInputField.ErrorCode.EMPTY_FIELD,
        wrongEmails: wrongEmails };
    }
    const totalEmails = emailListText.replace(/[^@]/g, "").length;
    const totalComma = emailListText.replace(/[^,]/g, "").length;
    if (totalEmails > 1 && totalComma !== totalEmails - 1) {
      return { errorCode: EmailInputField.ErrorCode.INVALID_SEPARATOR,
        wrongEmails: wrongEmails };
    }
    const tempList = emailListText.split(/\s*(?:,|$)\s*/);
    for (const email of tempList) {
      if (!EmailValidator.validate(email)) {
        wrongEmails.push(email);
      }
    }
    if (wrongEmails.length > 0) {
      return { errorCode: EmailInputField.ErrorCode.INVALID_EMAIL,
        wrongEmails: wrongEmails };
    }
    return { errorCode: EmailInputField.ErrorCode.NONE,
      wrongEmails: wrongEmails };
  }

  private handleSendInviteEmailClick = async () => {
    const inviteEmail = new InviteEmail(this.state.emailListText.split(
      /\s*(?:,|$)\s*/), this.state.content);
    try {
      const hasSent = await this.props.model.sendInviteEmail(inviteEmail);
      if (hasSent) {
        this.setState({ isSuccess: true });
        return;
      }
      this.setState({ errorCode: InviteAFoodiePage.ErrorCode.EMAIL_FAILED });
      return;
    } catch {
      this.setState({ errorCode: InviteAFoodiePage.ErrorCode.NO_CONNECTION });
    }
  }
}
