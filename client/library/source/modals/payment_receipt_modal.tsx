import * as React from 'react';
import { CloseButton } from '../components';
import { DisplayMode } from '../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** Indicates the close button is clicked. */
  onClose: () => void;
}

/** Displays the Payment Receipt Modal. */
export function PaymentReceiptModal(props: Properties) {    
  const { containerStyle } = (() => {
    if (props.displayMode === DisplayMode.MOBILE) {
      return {
        containerStyle: MOBILE_CONTAINER_STYLE
      };
    }
    return {
      containerStyle: CONTAINER_STYLE
    };
  })();
  return (
    <div style={containerStyle} >
      <CloseButton
        style={CLOSE_BUTTON_STYLE}
        displayMode={props.displayMode}
        onClick={props.onClose}
      />
    </div>);
}

const CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  position: 'relative',
  height: '486px',
  width: '687px',
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
