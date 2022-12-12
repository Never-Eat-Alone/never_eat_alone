import * as React from 'react';
import { AccountDeletedSurvey, DisplayMode } from '../../definitions';
import { DeletedAccountSurveyPageModel
} from './deleted_account_survey_page_model';
import { DeletedAccountSurveyPage } from './deleted_account_survey_page';

interface Properties {
  displayMode: DisplayMode;
  model: DeletedAccountSurveyPageModel;
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
