import * as React from 'react';
import { AccountDeletedSurvey, DisplayMode } from '../../definitions';
import { DeactivateAccountSurveyModel
} from './deactivate_account_survey_model';
import { DeactivateAccountSurveyPage } from './deactivate_account_survey_page';

interface Properties {
  displayMode: DisplayMode;
  model: DeactivateAccountSurveyModel;
}

interface State {
  isSubmitted: boolean;
}

export class DeactivateAccountSurveyPageController extends React.Component<
    Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isSubmitted: false
    };
  }

  public render(): JSX.Element {
    return <DeactivateAccountSurveyPage
      displayMode={this.props.displayMode}
      isSubmitted={this.state.isSubmitted}
      onSubmit={this.handleSubmit}
    />;
  }

  private handleSubmit = async (survey: AccountDeletedSurvey) => {
    try {
      await this.props.model.submit(survey);
      this.setState({ isSubmitted: true });
    } catch {
      //pass
    }
  }
}
