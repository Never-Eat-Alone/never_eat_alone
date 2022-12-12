import * as React from 'react';
import { CheckBox, PrimaryTextButton, Textarea, RedNavLink
} from '../../components';
import { DisplayMode } from '../../definitions';

const SurveyOptions = ["I don’t find it useful.",
  "I don’t understand how it works.", 'There are no events that interest me.',
  'There are no events in my area.',
  'This is a temporary break / I want to make a new account.',
  'I have a privacy or safety concern.'
];

export class SurveyAnswers {
  constructor(a1: boolean, a2: boolean, a3: boolean, a4: boolean, a5: boolean,
      a6: boolean, message: string) {
    this._a1 = a1;
    this._a2 = a2;
    this._a3 = a3;
    this._a4 = a4;
    this._a5 = a5;
    this._a6 = a6;
    this._message = message;
  }

  public get a1(): boolean {
    return this._a1;
  }

  public get a2(): boolean {
    return this._a2;
  }

  public get a3(): boolean {
    return this._a3;
  }

  public get a4(): boolean {
    return this._a4;
  }

  public get a5(): boolean {
    return this._a5;
  }

  public get a6(): boolean {
    return this._a6;
  }

  public get message(): string {
    return this._message;
  }

  private _a1: boolean;
  private _a2: boolean;
  private _a3: boolean;
  private _a4: boolean;
  private _a5: boolean;
  private _a6: boolean;
  private _message: string;
}

interface Properties {
  displayMode: DisplayMode;
  isSubmitted: boolean;
  onSubmit: (surveyAnswers: SurveyAnswers) => void;
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
    this.state = {
      message: '',
      a1: false,
      a2: false,
      a3: false,
      a4: false,
      a5: false,
      a6: false
    };
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
            label={SurveyOptions[0]}
            checked={this.state.a1}
            onBoxClick={this.handleCheckBoxA1Click}
          />
        </div>);
      surveyRows.push(
        <div key='option-2' style={SURVEY_ROW_STYLE} >
          <CheckBox
            label={SurveyOptions[1]}
            checked={this.state.a2}
            onBoxClick={this.handleCheckBoxA2Click}
          />
        </div>);
      surveyRows.push(
        <div key='option-3' style={SURVEY_ROW_STYLE} >
          <CheckBox
            label={SurveyOptions[2]}
            checked={this.state.a3}
            onBoxClick={this.handleCheckBoxA3Click}
          />
        </div>);
      surveyRows.push(
        <div key='option-4' style={SURVEY_ROW_STYLE} >
          <CheckBox
            label={SurveyOptions[3]}
            checked={this.state.a4}
            onBoxClick={this.handleCheckBoxA4Click}
          />
        </div>);
      surveyRows.push(
        <div key='option-5' style={SURVEY_ROW_STYLE} >
          <CheckBox
            label={SurveyOptions[4]}
            checked={this.state.a5}
            onBoxClick={this.handleCheckBoxA5Click}
          />
        </div>);
      surveyRows.push(
        <div key='option-6' style={SURVEY_ROW_STYLE} >
          <CheckBox
            label={SurveyOptions[5]}
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
    const surveyAnswers = new SurveyAnswers(this.state.a1, this.state.a2,
      this.state.a3, this.state.a4, this.state.a5, this.state.a6,
      this.state.message);
    this.props.onSubmit(surveyAnswers);
  }
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
