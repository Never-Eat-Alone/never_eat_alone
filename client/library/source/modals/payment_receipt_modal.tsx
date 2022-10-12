import * as React from 'react';
import { CloseButton } from '../components';
import { DisplayMode, PaymentRecord } from '../definitions';

interface Properties {
  displayMode: DisplayMode;

  paymentRecord: PaymentRecord;

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
      <div style={BACKGROUND_IMAGE_CONTAINER_STYLE} >
        <div style={LOGO_ROW_STYLE} >
          <img
            style={LOGO_STYLE}
            src='resources/payment_receipt_modal/logo.svg'
            alt='Receipt Image'
          />
          <CloseButton
            style={CLOSE_BUTTON_STYLE}
            displayMode={props.displayMode}
            onClick={props.onClose}
          />
        </div>
      </div>
    </div>);
}

const CONTAINER_STYLE: React.CSSProperties = {
  width: '560px',
  minWidth: '560px',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  borderRadius: '4px',
  overflow: 'hidden',
  background: 'linear-gradient(180deg, #F26A54 54.18%, #F26A54 54.19%, #F24D3D 100%, #F24D3D 100%)',
  minHeight: '993px'
};

const BACKGROUND_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  position: 'relative',
  width: '100%',
  height: '100%',
  backgroundImage: 'url(resources/payment_receipt_modal/background.svg)',
  backgroundSize: '290px 453px',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top -121px center'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTAINER_STYLE,
};

const LOGO_ROW_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '40px 40px 0px 40px',
  width: '100%',
  height: '83px',
  minHeight: '83px',
  backgroundColor: 'transparent',
  marginBottom: '137px'
};

const LOGO_STYLE: React.CSSProperties = {
  width: '50px',
  minWidth: '50px',
  height: '100%',
  minHeight: '43px',
  objectFit: 'cover',
  backgroundColor: 'transparent'
};

const CLOSE_BUTTON_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: '40px',
  right: '40px',
  width: '24px',
  height: '24px',
  backgroundColor: 'transparent'
};
