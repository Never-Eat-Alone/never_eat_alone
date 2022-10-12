import * as React from 'react';
import * as Router from 'react-router-dom';
import { CloseButton } from '../components';
import { DisplayMode, PaymentRecord } from '../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** Payment Record. */
  paymentRecord: PaymentRecord;

  /** Indicates the close button is clicked. */
  onClose: () => void;
}

/** Displays the Payment Receipt Modal. */
export function PaymentReceiptModal(props: Properties) {
  const { containerStyle, logoRowStyle, contentContainerStyle, plateImageStyle
      } = (() => {
    if (props.displayMode === DisplayMode.MOBILE) {
      return {
        containerStyle: MOBILE_CONTAINER_STYLE,
        logoRowStyle: MOBILE_LOGO_ROW_STYLE,
        contentContainerStyle: MOBILE_CONTENT_CONTAINER_STYLE,
        plateImageStyle: MOBILE_PLATE_IMAGE_STYLE
      };
    }
    return {
      containerStyle: CONTAINER_STYLE,
      logoRowStyle: LOGO_ROW_STYLE,
      contentContainerStyle: CONTENT_CONTAINER_STYLE,
      plateImageStyle: PLATE_IMAGE_STYLE
    };
  })();
  return (
    <div style={containerStyle} >
      <div style={BACKGROUND_IMAGE_CONTAINER_STYLE} >
        <div style={logoRowStyle} >
          <Router.Link to='/' style={LOGO_LINK_STYLE} >
            <img
              style={LOGO_STYLE}
              src='resources/payment_receipt_modal/logo.svg'
              alt='Receipt Image'
            />
          </Router.Link>
          <CloseButton
            style={CLOSE_BUTTON_STYLE}
            displayMode={DisplayMode.MOBILE}
            onClick={props.onClose}
          />
        </div>
        <div style={contentContainerStyle} >
          <img
            style={plateImageStyle}
            src='resources/payment_receipt_modal/plate.svg'
            alt='Plate Image'
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
  background: 'linear-gradient(180deg, #F26A54 54.18%, #F26A54 54.19%, \
    #F24D3D 100%, #F24D3D 100%)',
  minHeight: '993px',
  overflowY: 'initial'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTAINER_STYLE,
  width: '375px',
  minWidth: '375px'
};

const BACKGROUND_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
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
  backgroundPosition: 'top -121px center',
  padding: '40px 20px 20px 20px'
};

const LOGO_ROW_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  padding: '0px 20px 0px 20px',
  width: '100%',
  backgroundColor: 'transparent',
  marginBottom: '137px'
};

const MOBILE_LOGO_ROW_STYLE: React.CSSProperties = {
  ...LOGO_ROW_STYLE,
  padding: '0px',
  marginBottom: '47px'
};

const LOGO_LINK_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'transparent',
  textDecoration: 'none',
  cursor: 'pointer',
  outline: 'none',
  height: '43px',
  width: '50px'
};

const LOGO_STYLE: React.CSSProperties = {
  width: '100%',
  minWidth: '50px',
  height: '100%',
  minHeight: '43px',
  objectFit: 'cover',
  backgroundColor: 'transparent'
};

const CLOSE_BUTTON_STYLE: React.CSSProperties = {
  width: '24px',
  height: '24px',
  backgroundColor: 'transparent'
};

const CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  padding: '100px 30px 40px 28px',
  backgroundColor: '#FFFFFF',
  borderRadius: '4px',
  width: '100%'
};

const MOBILE_CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTENT_CONTAINER_STYLE,
  padding: '60px 20px 40px 30px'
};

const PLATE_IMAGE_STYLE: React.CSSProperties = {
  width: '140px',
  height: '140px',
  minWidth: '140px',
  minHeight: '140px',
  marginTop: '-170px',
  backgroundColor: 'transparent'
};

const MOBILE_PLATE_IMAGE_STYLE: React.CSSProperties = {
  width: '100px',
  height: '100px',
  minWidth: '100px',
  minHeight: '100px',
  marginTop: '-110px',
  backgroundColor: 'transparent'
};
