import * as React from 'react';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** the user display name. */
  displayName: string;

  /** The source address of the user profile image. */
  profileImageSrc: string;

  /** Indicates the save and login button is clicked. */
  onSaveClick: () => void;
}

export class ResetPasswordPage extends React.Component<Properties> {
  public render(): JSX.Element {
    const contentSize = this.props.displayMode === DisplayMode.MOBILE &&
      MOBILE_CONTENT_SIZE_STYLE || CONTENT_SIZE_STYLE;
    return (
      <div style={CONTAINER_STYLE} >
        <div style={{...CONTENT_STYLE, ...contentSize}} >
          <h1 style={HEADING_STYLE} >Reset Password</h1>
          <div style={PROFILE_IMAGE_CONTAINER_STYLE} >
            <img
              style={PROFILE_IMAGE_STYLE}
              src={this.props.profileImageSrc}
              alt='Profile Image'
            />
          </div>
          <div style={DISPLAY_NAME_STYLE} >{this.props.displayName}</div>
        </div>
      </div>);
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  width: '100%',
  backgroundColor: '#FFFFFF',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '60px 10px 60px 10px'
};

const CONTENT_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  backgroundColor: '#F6F6F6'
};

const CONTENT_SIZE_STYLE: React.CSSProperties = {
  width: '410px',
  padding: '50px'
};

const MOBILE_CONTENT_SIZE_STYLE: React.CSSProperties = {
  width: '351px',
  padding: '20px'
};

const HEADING_STYLE: React.CSSProperties = {
  padding: '0px',
  margin: '0px',
  height: '53px',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '36px',
  lineHeight: '53px',
  textTransform: 'uppercase',
  color: '#000000'
};

const PROFILE_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '68px',
  marginTop: '30px'
};

const PROFILE_IMAGE_STYLE: React.CSSProperties = {
  width: '68px',
  height: '100%',
  minHeight: '68px',
  backgroundColor: 'transparent',
  borderRadius: '50%',
  overflow: 'hidden'
};

const DISPLAY_NAME_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '18px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#C67E14',
  marginTop: '10px'
};
