import * as React from 'react';
import { CloseButton, EmailInputField, NameInputField, InputField } from '../components';
import { DisplayMode } from '../definitions';

interface Properties {
  displayMode: DisplayMode;
  name?: string;
  email?: string;
  referralCode?: string;
  onClose: () => void;
}

/** Displays the Join Modal. */
export class Join extends React.Component<Properties> {
  public render(): JSX.Element {
    const containerStyle = (this.props.displayMode === DisplayMode.MOBILE &&
      MOBILE_CONTAINER_STYLE || CONTAINER_STYLE);
    return (
      <div style={containerStyle} >
        <CloseButton style={CLOSE_BUTTON_STYLE}
          displayMode={this.props.displayMode} onClick={this.props.onClose}
        />
        <div style={IMAGE_SECTION_STYLE} >
          <div style={LOGO_CONTAINER_STYLE} >
            <img
              style={LOGO_STYLE}
              src='resources/join_modal/icons/logo.svg'
              alt='NEA Logo'
            />
          </div>
        </div>
        <div style={FORM_CONTAINER_STYLE} >
          <div style={HEADING_STYLE} > Join NeverEatAlone!</div>
          <div style={TEXT_STYLE} >
            Fill in the form below to request your account.
          </div>
          <NameInputField style={NAME_FIELD_STYLE} />
          <EmailInputField style={EMAIL_FIELD_STYLE} />
          <InputField style={REFERRAL_FIELD_STYLE} />
        </div>
      </div>);
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  position: 'relative',
  height: '486px',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  borderRadius: '4px',
  overflow: 'hidden'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  position: 'relative',
  width: '335px',
  height: '482px',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  borderRadius: '4px',
  overflow: 'hidden'
};

const CLOSE_BUTTON_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: '20px',
  right: '20px'
};

const IMAGE_SECTION_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '100%',
  width: '277px',
  backgroundImage: 'url(resources/join_modal/illustrations/wave.svg)',
  backgroundSize: 'cover',
  backgroundColor: '#F26B55',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'left center',
  minHeight: '486px'
};

const LOGO_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '174px',
  height: '100px',
  marginLeft: '51px'
};

const LOGO_STYLE: React.CSSProperties = {
  backgroundColor: 'transparent',
  color: '#FFFFFF',
  objectFit: 'cover'
};

const FORM_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '100%',
  width: 'calc(100% - 277px)',
  backgroundColor: '#FFFFFF'
};

const HEADING_STYLE: React.CSSProperties = {
  marginTop: '70px',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '30px',
  lineHeight: '44px',
  height: '44px',
  color: '#000000'
};

const TEXT_STYLE: React.CSSProperties = {
  marginTop: '5px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000'
};

const NAME_FIELD_STYLE: React.CSSProperties = {
  marginTop: '40px'
};

const EMAIL_FIELD_STYLE: React.CSSProperties = {
  marginTop: '30px'
};

const REFERRAL_FIELD_STYLE: React.CSSProperties = {
  marginTop: '30px'
};
