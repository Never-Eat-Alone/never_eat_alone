import * as React from 'react';
import { CheckBox, PrimaryTextButton, RedNavLink, Textarea
} from '../../components';
import { AccountDeletedSurvey, DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;
  isSubmitted: boolean;
  onSubmit: (survey: AccountDeletedSurvey) => void;
}

interface State {
  message: string;
  a1: boolean;
  a2: boolean;
  a3: boolean;
  a4: boolean;
  a5: boolean;
  a6: boolean;
}

export class DeletedAccountSurveyPage extends React.Component<Properties, State
    > {
  constructor(props: Properties) {
    super(props);
    const survey = new AccountDeletedSurvey(false, false, false, false,
      false, false, '');
    this.state = {
      a1: survey.a1,
      a2: survey.a2,
      a3: survey.a3,
      a4: survey.a4,
      a5: survey.a5,
      a6: survey.a6,
      message: ''
    };
    this._surveyQuestions = survey.questions;
  }

  public render(): JSX.Element {
    const { containerStyle, contentStyle, imageContainerStyle, imageStyle,
        surveyContainerStyle } = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          containerStyle: DESKTOP_CONTAINER_STYLE,
          contentStyle: DESKTOP_CONTENT_STYLE,
          imageContainerStyle: DESKTOP_IMAGE_CONTAINER_STYLE,
          imageStyle: DESKTOP_IMAGE_STYLE,
          surveyContainerStyle: DESKTOP_SURVEY_CONTAINER_STYLE
        };
      }
      if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerStyle: TABLET_CONTAINER_STYLE,
          contentStyle: TABLET_CONTENT_STYLE,
          imageContainerStyle: TABLET_IMAGE_CONTAINER_STYLE,
          imageStyle: TABLET_IMAGE_STYLE,
          surveyContainerStyle: TABLET_SURVEY_CONTAINER_STYLE
        };
      }
      return {
        containerStyle: MOBILE_CONTAINER_STYLE,
        contentStyle: MOBILE_CONTENT_STYLE,
        imageContainerStyle: MOBILE_IMAGE_CONTAINER_STYLE,
        imageStyle: MOBILE_IMAGE_STYLE,
        surveyContainerStyle: MOBILE_SURVEY_CONTAINER_STYLE
      };
    })();
    const surveyContentSection = (() => {
      if (this.props.isSubmitted) {
        return (
          <div style={THANKS_CONTAINER_STYLE} >
            <img
              style={HEART_IMAGE_STYLE}
              src='resources/icons/appreciation.svg'
              alt='Appreciation Icon'
            />
            <h2 style={H2_TEXT_STYLE} >Thanks for your feedback!</h2>
          </div>);
      }
      const surveyRows = [];
      surveyRows.push(
        <div key='option-1' style={SURVEY_ROW_STYLE} >
          <CheckBox
            label={this._surveyQuestions[0]}
            checked={this.state.a1}
            onBoxClick={this.handleCheckBoxA1Click}
          />
        </div>);
      surveyRows.push(
        <div key='option-2' style={SURVEY_ROW_STYLE} >
          <CheckBox
            label={this._surveyQuestions[1]}
            checked={this.state.a2}
            onBoxClick={this.handleCheckBoxA2Click}
          />
        </div>);
      surveyRows.push(
        <div key='option-3' style={SURVEY_ROW_STYLE} >
          <CheckBox
            label={this._surveyQuestions[2]}
            checked={this.state.a3}
            onBoxClick={this.handleCheckBoxA3Click}
          />
        </div>);
      surveyRows.push(
        <div key='option-4' style={SURVEY_ROW_STYLE} >
          <CheckBox
            label={this._surveyQuestions[3]}
            checked={this.state.a4}
            onBoxClick={this.handleCheckBoxA4Click}
          />
        </div>);
      surveyRows.push(
        <div key='option-5' style={SURVEY_ROW_STYLE} >
          <CheckBox
            label={this._surveyQuestions[4]}
            checked={this.state.a5}
            onBoxClick={this.handleCheckBoxA5Click}
          />
        </div>);
      surveyRows.push(
        <div key='option-6' style={SURVEY_ROW_STYLE} >
          <CheckBox
            label={this._surveyQuestions[5]}
            checked={this.state.a6}
            onBoxClick={this.handleCheckBoxA6Click}
          />
        </div>);
      return (
        <div style={surveyContainerStyle} >
          <p style={TEXT_STYLE} >
            Take a few moments to let us know why you’re leaving?
          </p>
          {surveyRows}
          <Textarea
            style={TEXT_AREA_STYLE}
            placeholder='Share any other thoughts or feedback to help us 
              improve our app!'
            value={this.state.message}
            onValueChange={this.handleTextAreaValueChange}
          />
          <PrimaryTextButton
            style={SUBMIT_BUTTON_STYLE}
            label='Submit'
            onClick={this.handleSubmit}
          />
        </div>);
    })();
    return (
      <div style={containerStyle} >
        <div style={contentStyle} >
          <h1 style={H1_STYLE} >Acount Deleted</h1>
          <div style={imageContainerStyle} >
            <img
              style={imageStyle}
              src='resources/illustrations/account_deleted.svg'
              alt='Account Deleted Image'
            />
          </div>
          <div style={TEXT_STYLE} >
            We’re sad to see you go, but you can still browse NeverEatAlone as 
            a guest.&nbsp;
            <RedNavLink style={LINK_STYLE} to='/' label='Go to Homepage' />.
          </div>
          {surveyContentSection}
        </div>
      </div>);
  }

  private handleTextAreaValueChange = (newMessage: string) => {
    this.setState({ message: newMessage });
  }

  private handleCheckBoxA1Click = () => {
    this.setState((prevState) => ({ a1: !prevState.a1 }));
  }

  private handleCheckBoxA2Click = () => {
    this.setState((prevState) => ({ a2: !prevState.a2 }));
  }

  private handleCheckBoxA3Click = () => {
    this.setState((prevState) => ({ a3: !prevState.a3 }));
  }

  private handleCheckBoxA4Click = () => {
    this.setState((prevState) => ({ a4: !prevState.a4 }));
  }

  private handleCheckBoxA5Click = () => {
    this.setState((prevState) => ({ a5: !prevState.a5 }));
  }

  private handleCheckBoxA6Click = () => {
    this.setState((prevState) => ({ a6: !prevState.a6 }));
  }

  private handleSubmit = () => {
    const survey = new AccountDeletedSurvey(this.state.a1, this.state.a2,
      this.state.a3, this.state.a4, this.state.a5, this.state.a6,
      this.state.message);
    this.props.onSubmit(survey);
  }

  private _surveyQuestions: string[];
}

const DESKTOP_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: '#FFFFFF',
  overflow: 'initial',
  padding: '50px 33px 90px 33px',
  width: '100%'
};

const TABLET_CONTAINER_STYLE: React.CSSProperties = {
  ...DESKTOP_CONTAINER_STYLE
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  ...DESKTOP_CONTAINER_STYLE,
  alignItems: 'flex-start',
  padding: '50px 20px 90px 20px',
};

const CONTENT_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '50px'
};

const DESKTOP_CONTENT_STYLE: React.CSSProperties = {
  ...CONTENT_STYLE,
  width: '900px'
};

const TABLET_CONTENT_STYLE: React.CSSProperties = {
  ...CONTENT_STYLE,
  width: '702px'
};

const MOBILE_CONTENT_STYLE: React.CSSProperties = {
  ...CONTENT_STYLE,
  width: '100%'
};

const H1_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '36px',
  lineHeight: '53px',
  textAlign: 'center',
  textTransform: 'uppercase',
  color: '#000000',
  padding: '0px',
  margin: '0px'
};

const DESKTOP_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '220px',
  minHeight: '220px'
};

const DESKTOP_IMAGE_STYLE: React.CSSProperties = {
  width: '310px',
  minWidth: '310px',
  height: '100%',
  minHeight: '220px',
  backgroundColor: 'transparent'
};

const TABLET_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  ...DESKTOP_IMAGE_CONTAINER_STYLE
};

const TABLET_IMAGE_STYLE: React.CSSProperties = {
  ...DESKTOP_IMAGE_STYLE
};

const MOBILE_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  ...DESKTOP_IMAGE_CONTAINER_STYLE
};

const MOBILE_IMAGE_STYLE: React.CSSProperties = {
  ...DESKTOP_IMAGE_STYLE,
  width: '300px',
  minWidth: '300px'
};

const TEXT_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  flexWrap: 'wrap',
  whiteSpace: 'pre-line',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '23px',
  color: '#000000',
  padding: '0px',
  margin: '0px'
};

const LINK_STYLE: React.CSSProperties = {
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '23px',
  minHeight: '23px',
  height: 'auto',
  width: 'fit-content'
};

const DESKTOP_SURVEY_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '20px',
  width: '456px'
}

const TABLET_SURVEY_CONTAINER_STYLE: React.CSSProperties = {
  ...DESKTOP_SURVEY_CONTAINER_STYLE
};

const MOBILE_SURVEY_CONTAINER_STYLE: React.CSSProperties = {
  ...DESKTOP_SURVEY_CONTAINER_STYLE,
  width: '100%'
};

const SURVEY_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  height: '18px'
};

const TEXT_AREA_STYLE: React.CSSProperties = {
  width: '100%',
  fontSize: '18px',
  lineHeight: '23px',
  whiteSpace: 'pre-line'
};

const SUBMIT_BUTTON_STYLE: React.CSSProperties = {
  width: '113px',
  minWidth: '113px',
  height: '35px',
  minHeight: '35px',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px'
};

const THANKS_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingTop: '50px',
  gap: '15px',
  height: '100px',
  width: '100%'
};

const HEART_IMAGE_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '50px',
  height: '50px',
  minWidth: '50px',
  minHeight: '50px'
};

const H2_TEXT_STYLE: React.CSSProperties = {
  padding: '0px',
  margin: '0px',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '24px',
  lineHeight: '36px',
  color: '#000000'
};
