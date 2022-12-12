import * as React from 'react';
import { PrimaryTextButton, SecondaryTextButton } from '../components';
import { DisplayMode } from '../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** The amount that will be refunded to the user. */
  refundAmount: number;

  /** The description related to the refund. */
  refundDescription: string;

  /** Indicates the remove seat button is clicked. */
  onRemoveSeat: () => {};

  /** Indicates the cancel button is clicked. */
  onCancel: () => {};
}

/** Displays the Remove Seat Modal. */
export function RemoveSeatModal(props: Properties) {
  const { containerStyle, contentStyle, buttonRowStyle} = (() => {
    if (props.displayMode === DisplayMode.MOBILE) {
      return {
        containerStyle: MOBILE_CONTAINER_STYLE,
        contentStyle: MOBILE_CONTENT_STYLE,
        buttonRowStyle: MOBILE_BUTTON_ROW_STYLE
      };
    }
    return {
      containerStyle: CONTAINER_STYLE,
      contentStyle: CONTENT_STYLE,
      buttonRowStyle: BUTTON_ROW_STYLE
    };
  })();
  return (
    <div style={containerStyle} >
      <img
        style={IMAGE_STYLE}
        src='resources/illustrations/remove_seat.jpg'
        alt='Image'
      />
      <div style={contentStyle} >
        <h1 style={HEADER_STYLE} >Really remove your seat?</h1>
        <h3 style={SECOND_HEADING_STYLE} >Here’s what will happen:</h3>
        <div>
          <div style={REFUND_AMOUNT_ROW_STYLE} >
            <img
              style={ICON_STYLE}
              src='resources/icons/added.svg'
              alt='Checkmark Icon'
            />
            <div style={REFUND_AMOUNT_TEXT_STYLE} >
              <b>Refund:</b>&nbsp;${props.refundAmount.toFixed(2)}
            </div>
          </div>
          <p style={DESCRIPTION_STYLE} >{props.refundDescription}</p>
        </div>
        <div style={buttonRowStyle} >
          <SecondaryTextButton style={CANCEL_BUTTON_STYLE} label='Cancel'
            onClick={props.onCancel} />
          <PrimaryTextButton style={REMOVE_SEAT_BUTTON_STYLE}
            label='Remove Seat' onClick={props.onRemoveSeat} />
        </div>
      </div>
    </div>);
}

const CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  position: 'relative',
  borderRadius: '4px',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  backgroundColor: '#FFFFFF',
  overflowY: 'initial',
  maxWidth: '375px',
  width: '100%'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTAINER_STYLE,
  width: '100%',
  height: '100%'
};

const IMAGE_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100px',
  borderRadius: '4px 4px 0px 0px'
};

const CONTENT_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '20px',
  padding: '20px',
  width: '100%',
  borderRadius: '0px 0px 4px 4px'
};

const MOBILE_CONTENT_STYLE: React.CSSProperties = {
  ...CONTENT_STYLE,
  height: 'calc(100% - 100px)'
}

const HEADER_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '20px',
  lineHeight: '30px',
  color: '#000000',
  margin: '0px',
  padding: '0px'
};

const SECOND_HEADING_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  margin: '0px',
  padding: '0px'
};

const REFUND_AMOUNT_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '10px',
  width: '100%'
};

const ICON_STYLE: React.CSSProperties = {
  width: '12px',
  height: '12px',
  backgroundColor: 'trasparent',
  borderRadius: '50%'
};

const REFUND_AMOUNT_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000'
};

const DESCRIPTION_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  margin: '10px 0px 0px 0px',
  padding: '0px 0px 0px 22px',
  width: '100%',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#969696',
  whiteSpace: 'pre-line'
};

const BUTTON_ROW_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '20px',
  paddingLeft: '22px',
  paddingTop: '10px',
  width: '100%',
  height: '45px'
};

const MOBILE_BUTTON_ROW_STYLE: React.CSSProperties = {
  ...BUTTON_ROW_STYLE,
  position: 'absolute',
  bottom: '20px',
  left: '20px'
};

const CANCEL_BUTTON_STYLE: React.CSSProperties = {
  minWidth: '113px',
  width: '113px',
  minHeight: '35px',
  height: '100%'
};

const REMOVE_SEAT_BUTTON_STYLE: React.CSSProperties = {
  minWidth: '144px',
  width: '144px',
  minHeight: '35px',
  height: '100%'
};
