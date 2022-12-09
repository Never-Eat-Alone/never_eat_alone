import * as React from 'react';
import { CheckBox, PrimaryTextButton, Textarea } from '../../components';
import { DisplayMode } from '../../definitions';

const SurveyOptions = {
  o1: "I don’t find it useful.",
  o2: "I don’t understand how it works.",
  o3: 'There are no events that interest me.',
  o4: 'There are no events in my area.',
  o5: 'This is a temporary break / I want to make a new account.',
  o6: 'I have a privacy or safety concern.'
};

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
  surveyAnswers: SurveyAnswers;
}

export class DeletedAccountSurveyPage extends React.Component<Properties, State
    > {
  constructor(props: Properties) {
    super(props);
    this.state = {
      surveyAnswers: new SurveyAnswers(false, false, false, false, false, false,
        '')
    };
  }

  public render(): JSX.Element {
    const { containerStyle, contentStyle, imageContainerStyle, imageStyle } = (
        () => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          containerStyle: DESKTOP_CONTAINER_STYLE,
          contentStyle: DESKTOP_CONTENT_STYLE,
          imageContainerStyle: DESKTOP_IMAGE_CONTAINER_STYLE,
          imageStyle: DESKTOP_IMAGE_STYLE
        };
      }
      if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerStyle: TABLET_CONTAINER_STYLE,
          contentStyle: TABLET_CONTENT_STYLE,
          imageContainerStyle: TABLET_IMAGE_CONTAINER_STYLE,
          imageStyle: TABLET_IMAGE_STYLE
        };
      }
      return {
        containerStyle: MOBILE_CONTAINER_STYLE,
        contentStyle: MOBILE_CONTENT_STYLE,
        imageContainerStyle: MOBILE_IMAGE_CONTAINER_STYLE,
        imageStyle: MOBILE_IMAGE_STYLE
      };
    })();
    const surveyContentSection = (() => {
      if (this.props.isSubmitted) {
        return (
          <div>

          </div>);
      }
      return (
        <div>

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
            a guest. Go to Homepage.
          </div>
          {surveyContentSection}
        </div>
      </div>);
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

};

const TABLET_IMAGE_STYLE: React.CSSProperties = {
  
};

const MOBILE_IMAGE_CONTAINER_STYLE: React.CSSProperties = {

};

const MOBILE_IMAGE_STYLE: React.CSSProperties = {
  
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
  color: '#000000'
};
