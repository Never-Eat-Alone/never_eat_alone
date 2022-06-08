import * as React from 'react';
import { DisplayMode } from '../definitions';

interface Properties {
  displayMode: DisplayMode;
  name?: string;
  email?: string;
  referralCode?: string;
}

/** Displays the Join Overlay. */
export class Join extends React.Component<Properties> {
  public render(): JSX.Element {
    const containerStyle = (this.props.displayMode === DisplayMode.MOBILE &&
      MOBILE_CONTAINER_STYLE || CONTAINER_STYLE);
    return (
      <div style={containerStyle} >
        <div>Close button</div>
        <div>Join NEA</div>
        <div>Fill the form</div>
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
  width: '687px',
  height: '486px',
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  borderRadius: '4px'
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
  backgroundColor: '#FFFFFF',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  borderRadius: '4px'
};
