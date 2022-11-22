import * as React from 'react';
import { CloseButton, PrimaryButtonNavLink } from '../../components';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** Indicates the close button is clicked. */
  onClose: () => void;
}

export class PartnerWithUsMessageSentModal extends React.Component<Properties> {
  constructor(props: Properties) {
    super(props);
    this._containerRef = React.createRef();
  }

  public render(): JSX.Element {
    const { containerStyle, closeButtonStyle, headingFormStyle,
        textFormContainerStyle, textContainerStyle, formStyle,
        imageContainerStyle } = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          containerStyle: DESKTOP_CONTAINER_STYLE,
          closeButtonStyle: CLOSE_BUTTON_STYLE,
          headingFormStyle: DESKTOP_HEADER_FORM_STYLE,
          textFormContainerStyle: DESKTOP_TEXT_FORM_CONTAINER_STYLE,
          textContainerStyle: DESKTOP_TEXT_CONTAINER_STYLE,
          formStyle: {...DESKTOP_FORM_STYLE, ...DESKTOP_FORM_MARGIN_STYLE},
          imageContainerStyle: DESKTOP_IMAGE_CONTAINER_STYLE
        };
      }
      if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerStyle: TABLET_CONTAINER_STYLE,
          closeButtonStyle: CLOSE_BUTTON_STYLE,
          headingFormStyle: TABLET_HEADER_FORM_STYLE,
          textFormContainerStyle: TABLET_TEXT_FORM_CONTAINER_STYLE,
          textContainerStyle: TABLET_TEXT_CONTAINER_STYLE,
          formStyle: {...TABLET_FORM_STYLE, ...TABLET_FORM_MARGIN_STYLE},
          imageContainerStyle: TABLET_IMAGE_CONTAINER_STYLE
        };
      }
      return {
        containerStyle: MOBILE_CONTAINER_STYLE,
        closeButtonStyle: MOBILE_CLOSE_BUTTON_STYLE,
        headingFormStyle: MOBILE_HEADER_FORM_STYLE,
        textFormContainerStyle: MOBILE_TEXT_FORM_CONTAINER_STYLE,
        textContainerStyle: MOBILE_TEXT_CONTAINER_STYLE,
        formStyle: {...MOBILE_FORM_STYLE, ...MOBILE_FORM_MARGIN_STYLE},
        imageContainerStyle: MOBILE_IMAGE_CONTAINER_STYLE
      };
    })();
    return (
      <div style={FORM_STYLE} >
        <div ref={this._containerRef} style={containerStyle} >
          <CloseButton
            displayMode={this.props.displayMode}
            onClick={this.props.onClose}
            style={closeButtonStyle}
          />
          <div style={headingFormStyle} >
            <h1 style={H1_STYLE} >Partner With US</h1>
          </div>
          <div style={imageContainerStyle} >
            <div style={textFormContainerStyle} >
              <div style={textContainerStyle} >
                <div style={IMAGE_TITLE_STYLE} >
                  Take control of your listing on NeverEatAlone
                </div>
                <div style={IMAGE_DESCRIPTION_STYLE} >
                  Take control over the information and menus posted on your 
                  restaurant page. Partner with us and stay connected on our 
                  updates, such as hosting your own events and connecting 
                  directly with customers in the future!
                </div>
              </div>
            </div>
          </div>
          <div style={formStyle} >
            <div style={ROW_CONTAINER_STYLE} >
              <img
                style={IMAGE_STYLE}
                src='resources/partner_with_us_page/icons/appreciation.svg'
                alt='Appreciation Icon'
              />
              <h2 style={H2_STYLE} >Thanks for getting in touch!</h2>
            </div>
            <p style={P_STYLE} >
              Your email has been received and a member of our team will get back 
              to you shortly! We look forward to chatting!
            </p>
            <PrimaryButtonNavLink
              style={BUTTON_STYLE}
              to='/'
              label='Back to homepage'
            />
          </div>
        </div>
      </div>);
  }

  public componentDidMount(): void {
    this._timeOutId = setTimeout(() => { this.props.onClose() }, 1500);
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  public componentWillUnmount(): void {
    clearTimeout(this._timeOutId);
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  private handleClickOutside: { (event: any): void } = (
      event: React.MouseEvent) => {
    if (!this._containerRef.current.contains(event.target as Node)) {
      event.preventDefault();
      event.stopPropagation();
      this.props.onClose();
    }
  }

  private _timeOutId: NodeJS.Timeout;
  private _containerRef: React.RefObject<HTMLDivElement>;
}

const FORM_STYLE: React.CSSProperties = {
  position: 'fixed',
  top: '0px',
  left: '0px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgb(150, 150, 150, 0.5)',
  zIndex: 1000
};

const CLOSE_BUTTON_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: '20px',
  right: '20px'
};

const MOBILE_CLOSE_BUTTON_STYLE: React.CSSProperties = {
  ...CLOSE_BUTTON_STYLE,
  right: '8px'
};

const DESKTOP_CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '830px',
  backgroundColor: '#FFFFFF',
  paddingTop: '30px',
  paddingBottom: '30px',
  borderRadius: '4px',
  overflow: 'hidden'
};

const TABLET_CONTAINER_STYLE: React.CSSProperties = {
  ...DESKTOP_CONTAINER_STYLE,
  width: '375px',
  paddingTop: '20px',
  paddingBottom: '20px'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  ...DESKTOP_CONTAINER_STYLE,
  paddingTop: '20px',
  paddingBottom: '20px',
  width: '100%'
};

const DESKTOP_FORM_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'space-between',
  marginTop: '30px',
  paddingLeft: '50px',
  paddingRight: '50px',
  width: '100%'
};

const DESKTOP_FORM_MARGIN_STYLE: React.CSSProperties = {
  marginBottom: '50px'
};

const TABLET_FORM_STYLE: React.CSSProperties = {
  ...DESKTOP_FORM_STYLE,
  paddingLeft: '20px',
  paddingRight: '20px',
  marginTop: '20px',
  width: '100%'
};

const TABLET_FORM_MARGIN_STYLE: React.CSSProperties = {
  marginBottom: '60px'
};

const MOBILE_FORM_STYLE: React.CSSProperties = {
  ...DESKTOP_FORM_STYLE,
  paddingLeft: '20px',
  paddingRight: '20px',
  marginTop: '20px',
  width: '100%'
};

const MOBILE_FORM_MARGIN_STYLE: React.CSSProperties = {
  marginBottom: '30px'
};

const DESKTOP_HEADER_FORM_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'space-between',
  width: '100%',
  marginTop: '0px'
};

const TABLET_HEADER_FORM_STYLE: React.CSSProperties = {
  ...DESKTOP_HEADER_FORM_STYLE,
  width: '100%',
  marginTop: '0px'
};

const MOBILE_HEADER_FORM_STYLE: React.CSSProperties = {
  ...DESKTOP_HEADER_FORM_STYLE,
  paddingLeft: '20px',
  paddingRight: '20px',
  width: '100%',
  marginTop: '0px'
};

const H1_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '26px',
  lineHeight: '39px',
  textTransform: 'uppercase',
  color: '#000000',
  padding: '0px',
  margin: '0px'
};

const DESKTOP_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '10px',
  width: '100%',
  minWidth: '100%',
  minHeight: '274px',
  marginTop: '50px',
  backgroundImage: 'url(resources/partner_with_us_page/images/background.jpg)',
  backgroundSize: 'cover',
  backgroundColor: '#FFFFFF',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center bottom 38%'
};

const TABLET_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  ...DESKTOP_IMAGE_CONTAINER_STYLE,
  minHeight: '245px'
};

const MOBILE_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  ...DESKTOP_IMAGE_CONTAINER_STYLE,
  minHeight: '300px',
  marginTop: '30px'
};

const DESKTOP_TEXT_FORM_CONTAINER_STYLE: React.CSSProperties = {
  ...DESKTOP_FORM_STYLE,
  justifyContent: 'center',
  alignItems: 'flex-start'
};

const TABLET_TEXT_FORM_CONTAINER_STYLE: React.CSSProperties = {
  ...TABLET_FORM_STYLE,
  justifyContent: 'center',
  alignItems: 'flex-start'
};

const MOBILE_TEXT_FORM_CONTAINER_STYLE: React.CSSProperties = {
  ...MOBILE_FORM_STYLE,
  justifyContent: 'center',
  alignItems: 'center'
};

const DESKTOP_TEXT_CONTAINER_STYLE: React.CSSProperties = {
  ...DESKTOP_FORM_STYLE,
  gap: '10px',
  width: '360px',
  marginTop: '0px'
};

const TABLET_TEXT_CONTAINER_STYLE: React.CSSProperties = {
  ...TABLET_FORM_STYLE,
  gap: '10px',
  width: '360px',
  marginTop: '0px'
};

const MOBILE_TEXT_CONTAINER_STYLE: React.CSSProperties = {
  ...MOBILE_FORM_STYLE,
  gap: '10px',
  marginTop: '0px'
};

const IMAGE_TITLE_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '24px',
  lineHeight: '36px',
  color: '#FFFFFF',
  width: '100%'
};

const IMAGE_DESCRIPTION_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#FFFFFF',
  width: '100%',
  whiteSpace: 'pre-line',
  marginBottom: '20px'
};

const ROW_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '15px'
};

const IMAGE_STYLE: React.CSSProperties = {
  width: '50px',
  minWidth: '50px',
  height: '50px',
  minHeight: '50px',
  backgroundColor: 'transparent'
};

const H2_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '27px',
  color: '#000000',
  padding: '0px',
  margin: '0px'
};

const P_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  padding: '0px',
  margin: '20px 0px 0px 65px'
};

const BUTTON_STYLE: React.CSSProperties = {
  width: '128px',
  height: '30px',
  minWidth: '128px',
  minHeight: '30px',
  marginLeft: '65px',
  marginTop: '20px'
};
