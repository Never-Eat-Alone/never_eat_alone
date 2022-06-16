import * as React from 'react';

interface Properties {
  /** The score of the password strength. */
  score: number;

  /** Indicates the password has at least one uppercase character. */
  hasUpperCase: boolean;

  /** Indicates the password has at least one lowercase character. */
  hasLowerCase: boolean;

  /** Indicates the password has at least a number. */
  hasNumber: boolean;

  /** Indicates the password has at least one special character. */
  hasSpecialCharacter: boolean;

  /** Indicates the password is at least 8 characters long. */
  hasMin8Character: boolean;

  style?: React.CSSProperties;
}

export class PasswordAnalyzer extends React.Component<Properties> {
  public render(): JSX.Element {
    const score = this.props.score;
    const { bars, message } = (() => {
      if (score === 0) {
        return ({
          bars: [
            <div key={0} style={{...BAR_STYLE, ...GREY_STYLE}} />,
            <div key={1} style={{...BAR_STYLE, ...GREY_STYLE}} />,
            <div key={2} style={{...BAR_STYLE, ...GREY_STYLE}} />,
            <div key={3} style={{...BAR_STYLE, ...GREY_STYLE}} />,
            <div key={4} style={{...BAR_STYLE, ...GREY_STYLE}} />
          ],
          message: <div style={MESSAGE_STYLE} />
        });
      }
      if (score === 1) {
        return ({
          bars: [
            <div key={0} style={{...BAR_STYLE, ...VERY_WEAK_BAR_STYLE}} />,
            <div key={1} style={{...BAR_STYLE, ...GREY_STYLE}} />,
            <div key={2} style={{...BAR_STYLE, ...GREY_STYLE}} />,
            <div key={3} style={{...BAR_STYLE, ...GREY_STYLE}} />,
            <div key={4} style={{...BAR_STYLE, ...GREY_STYLE}} />
          ],
          message:
            <div style={{...MESSAGE_STYLE, ...VERY_WEAK_MESSAGE_STYLE}} >
              VERY WEAK
            </div>
        });
      }
      if (score === 2) {
        return ({
          bars: [
            <div key={0} style={{...BAR_STYLE, ...WEAK_BAR_STYLE}} />,
            <div key={1} style={{...BAR_STYLE, ...WEAK_BAR_STYLE}} />,
            <div key={2} style={{...BAR_STYLE, ...GREY_STYLE}} />,
            <div key={3} style={{...BAR_STYLE, ...GREY_STYLE}} />,
            <div key={4} style={{...BAR_STYLE, ...GREY_STYLE}} />
          ],
          message:
            <div style={{...MESSAGE_STYLE, ...WEAK_MESSAGE_STYLE}} >
              WEAK
            </div>
        });
      }
      if (score === 3) {
        return ({
          bars: [
            <div key={0} style={{...BAR_STYLE, ...AVERAGE_BAR_STYLE}} />,
            <div key={1} style={{...BAR_STYLE, ...AVERAGE_BAR_STYLE}} />,
            <div key={2} style={{...BAR_STYLE, ...AVERAGE_BAR_STYLE}} />,
            <div key={3} style={{...BAR_STYLE, ...GREY_STYLE}} />,
            <div key={4} style={{...BAR_STYLE, ...GREY_STYLE}} />
          ],
          message:
            <div style={{...MESSAGE_STYLE, ...AVERAGE_MESSAGE_STYLE}} >
              AVERAGE
            </div>
        });
      }
      if (score === 4) {
        return ({
          bars: [
            <div key={0} style={{...BAR_STYLE, ...STRONG_BAR_STYLE}} />,
            <div key={1} style={{...BAR_STYLE, ...STRONG_BAR_STYLE}} />,
            <div key={2} style={{...BAR_STYLE, ...STRONG_BAR_STYLE}} />,
            <div key={3} style={{...BAR_STYLE, ...STRONG_BAR_STYLE}} />,
            <div key={4} style={{...BAR_STYLE, ...GREY_STYLE}} />
          ],
          message:
            <div style={{...MESSAGE_STYLE, ...STRONG_MESSAGE_STYLE}} >
              STRONG
            </div>
        });
      }
      if (score === 5) {
        return ({
          bars: [
            <div key={0} style={{...BAR_STYLE, ...VERY_STRONG_BAR_STYLE}} />,
            <div key={1} style={{...BAR_STYLE, ...VERY_STRONG_BAR_STYLE}} />,
            <div key={2} style={{...BAR_STYLE, ...VERY_STRONG_BAR_STYLE}} />,
            <div key={3} style={{...BAR_STYLE, ...VERY_STRONG_BAR_STYLE}} />,
            <div key={4} style={{...BAR_STYLE, ...VERY_STRONG_BAR_STYLE}} />
          ],
          message:
            <div style={{...MESSAGE_STYLE, ...VERY_STRONG_MESSAGE_STYLE}} >
              VERY STRONG
            </div>
        });
      }
    })();
    const min8ImageSrc = (this.props.hasMin8Character &&
      'resources/password_analyzer/icons/check.svg' ||
      'resources/password_analyzer/icons/cross.svg');
    const lettersAndNumbersImageSrc = (this.props.hasNumber && (
      this.props.hasLowerCase || this.props.hasUpperCase) &&
      'resources/password_analyzer/icons/check.svg' ||
      'resources/password_analyzer/icons/cross.svg');
    const specialCharacterImageSrc = (this.props.hasSpecialCharacter &&
      'resources/password_analyzer/icons/check.svg' ||
      'resources/password_analyzer/icons/cross.svg');
    const upperAndLowerImageSrc = (this.props.hasLowerCase &&
      this.props.hasUpperCase &&
      'resources/password_analyzer/icons/check.svg' ||
      'resources/password_analyzer/icons/cross.svg');
    return (
      <div style={{...CONTAINER_STYLE, ...this.props.style}} >
        <div style={BAR_CONTAINER_STYLE} >
          {bars}
        </div>
        <div style={TEXT_CONTAINER_STYLE} >
          {message}
        </div>
        <div style={DETAILS_CONTAINER_STYLE} >
          <div>Make your password stronger by adding:</div>
          <div style={DETAILS_ROW_STYLE} >
            <div style={ICON_CONTAINER_STYLE} >
              <img style={ICON_STYLE} src={min8ImageSrc} alt='Checkmark Icon' />
            </div>
            <div>Minimum of 8 characters (required)</div>
          </div>
          <div style={DETAILS_ROW_STYLE} >
            <div style={ICON_CONTAINER_STYLE} >
              <img
                style={ICON_STYLE}
                src={lettersAndNumbersImageSrc}
                alt='Checkmark Icon'
              />
            </div>
            <div>Numbers</div>
          </div>
          <div style={DETAILS_ROW_STYLE} >
            <div style={ICON_CONTAINER_STYLE} >
              <img
                style={ICON_STYLE}
                src={specialCharacterImageSrc}
                alt='Checkmark Icon'
              />
            </div>
            <div>Special Characters</div>
          </div>
          <div style={DETAILS_ROW_STYLE} >
            <div style={ICON_CONTAINER_STYLE} >
              <img
                style={ICON_STYLE}
                src={upperAndLowerImageSrc}
                alt='Checkmark Icon'
              />
            </div>
            <div>Uppercase and lowercase letters</div>
          </div>
        </div>
      </div>);
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  width: '100%'
};

const BAR_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  minHeight: '5px',
  height: '5px'
};

const TEXT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '15px',
  height: '15px',
  lineHeight: '15px',
  marginTop: '5px',
  fontFamily: 'Source Sans Pro',
  fontSize: '12px',
  fontWeight: 400,
  fontStyle: 'normal'
};

const BAR_STYLE: React.CSSProperties = {
  minWidth: '58px',
  width: '58px',
  height: '100%',
  borderRadius: '3px'
};

const GREY_STYLE: React.CSSProperties = {
  backgroundColor: '#CCCCCC',
  color: '#CCCCCC'
};

const VERY_WEAK_BAR_STYLE: React.CSSProperties = {
  backgroundColor: '#FF2C79'
};

const VERY_WEAK_MESSAGE_STYLE: React.CSSProperties = {
  color: '#FF2C79'
};

const WEAK_BAR_STYLE: React.CSSProperties = {
  backgroundColor: '#CD6074'
};

const WEAK_MESSAGE_STYLE: React.CSSProperties = {
  color: '#CD6074'
};

const AVERAGE_BAR_STYLE: React.CSSProperties = {
  backgroundColor: '#C7AA8E'
};

const AVERAGE_MESSAGE_STYLE: React.CSSProperties = {
  color: '#C7AA8E'
};

const STRONG_BAR_STYLE: React.CSSProperties = {
  backgroundColor: '#97B68B'
};

const STRONG_MESSAGE_STYLE: React.CSSProperties = {
  color: '#97B68B'
};

const VERY_STRONG_BAR_STYLE: React.CSSProperties = {
  backgroundColor: '#5EC745'
};

const VERY_STRONG_MESSAGE_STYLE: React.CSSProperties = {
  color: '#5EC745'
};

const MESSAGE_STYLE: React.CSSProperties = {
  height: '100%',
  minHeight: '15px',
  margin: '0',
  padding: '0'
};

const DETAILS_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  gap: '2px',
  height: '92px',
  marginTop: '9px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '11px',
  lineHeight: '16px',
  color: '#969696'
};

const DETAILS_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  height: '16px'
};

const ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '8px',
  height: '8px',
  marginRight: '10px'
};

const ICON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minWidth: '8px',
  objectFit: 'cover',
  backgroundColor: 'transparent'
};
