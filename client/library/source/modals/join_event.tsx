import * as React from 'react';
import { CloseButton, PrimaryTextButton } from '../components';
import { DisplayMode } from '../definitions';

interface Properties {
  displayMode: DisplayMode;

  eventFee: number;

  eventTitle: string;

  eventStartDate: Date;

  onJoinEvent: () => void;
  onClose: () => void;
}

/** Displays the Join Event Modal. */
export class JoinEventModal extends React.Component<Properties> {
  public render(): JSX.Element {
    const { containerStyle, formContainerStyle } = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          containerStyle: DESKTOP_CONTAINER_STYLE,
          formContainerStyle: DESKTOP_FORM_CONTAINER_STYLE
        };
      }
      if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerStyle: TABLET_CONTAINER_STYLE,
          formContainerStyle: TABLET_FORM_CONTAINER_STYLE
        };
      }
      return {
        containerStyle: MOBILE_CONTAINER_STYLE,
        formContainerStyle: MOBILE_FORM_CONTAINER_STYLE
      };
    })();
    return (
      <div style={containerStyle} >
        <CloseButton
          style={CLOSE_BUTTON_STYLE}
          displayMode={this.props.displayMode}
          onClick={this.props.onClose}
        />
        <div style={formContainerStyle} >
          
          <PrimaryTextButton
            style={JOIN_BUTTON_STYLE}
            label='Join Event'
            onClick={this.props.onJoinEvent}
          />
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
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  borderRadius: '4px',
  overflow: 'hidden'
};

const DESKTOP_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTAINER_STYLE,
  width: '675px',
  height: '410px'
};

const TABLET_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTAINER_STYLE,
  width: '675px',
  height: '410px'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  position: 'relative',
  width: '100%',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  borderRadius: '4px',
  overflow: 'hidden'
};

const CLOSE_BUTTON_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: '20px',
  right: '20px'
};

const DESKTOP_FORM_CONTAINER_STYLE: React.CSSProperties = {

};

const TABLET_FORM_CONTAINER_STYLE: React.CSSProperties = {
  
};

const MOBILE_FORM_CONTAINER_STYLE: React.CSSProperties = {
  
};

const JOIN_BUTTON_STYLE: React.CSSProperties = {

};
