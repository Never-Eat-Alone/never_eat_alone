import * as React from 'react';
import { AccountDeletedSurvey, DisplayMode, User } from '../../definitions';
import { DeletedAccountSurveyModel } from './deleted_account_survey_model';
import { DeletedAccountSurveyPage } from './deleted_account_survey_page';

interface Properties {
  account: User;
  displayMode: DisplayMode;
  model: DeletedAccountSurveyModel;
}

interface State {
  isSubmitted: boolean;
}

export class DeletedAccountSurveyPageController extends React.Component<
    Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isSubmitted: false
    };
  }

  public render(): JSX.Element {
    return <DeletedAccountSurveyPage
      account={this.props.account}
      displayMode={this.props.displayMode}
      isSubmitted={this.state.isSubmitted}
      onSubmit={this.handleSubmit}
    />;
  }

  private handleSubmit = async (survey: AccountDeletedSurvey) => {
    try {
      const isSubmitted = await this.props.model.submit(survey);
      this.setState({ isSubmitted });
    } catch {
      this.setState({ isSubmitted: false });
    }
  }
}
