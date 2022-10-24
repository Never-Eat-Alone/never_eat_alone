import { format } from 'date-fns';
import * as React from 'react';
import * as Router from 'react-router-dom';
import { AccentTextButton, CloseButton, PrimaryTextLinkButton
} from '../components';
import { DisplayMode, PaymentRecord } from '../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** Payment Record. */
  paymentRecord: PaymentRecord;

  /** Indicates the close button is clicked. */
  onClose: () => void;

  /** Indicates the print button is clicked. */
  onPrintClick: () => void;

  /** Indicates the Download Pdf button is clicked. */
  onDownloadPdfClick: () => void;

  /** Indicates the send email button is clicked. */
  onSendEmailClick: () => void;

  /** Indicates the help button is clicked. */
  onHelpClick: () => void;
}

/** Displays the Payment Receipt Modal. */
export function PaymentReceiptModal(props: Properties) {
  const { containerStyle, logoRowStyle, contentContainerStyle, plateImageStyle,
      eventTitleStyle, dateTimeSectionStyle, eventTagContainerStyle,
      buttonContainerStyle } = (() => {
    if (props.displayMode === DisplayMode.MOBILE) {
      return {
        containerStyle: MOBILE_CONTAINER_STYLE,
        logoRowStyle: MOBILE_LOGO_ROW_STYLE,
        contentContainerStyle: MOBILE_CONTENT_CONTAINER_STYLE,
        plateImageStyle: MOBILE_PLATE_IMAGE_STYLE,
        eventTitleStyle: MOBILE_EVENT_TITLE_STYLE,
        dateTimeSectionStyle: MOBILE_DATE_TIME_SECTION_STYLE,
        eventTagContainerStyle: MOBILE_EVENT_TAG_CONTAINER_STYLE,
        buttonContainerStyle: MOBILE_BUTTON_CONTAINER_STYLE
      };
    }
    return {
      containerStyle: CONTAINER_STYLE,
      logoRowStyle: LOGO_ROW_STYLE,
      contentContainerStyle: CONTENT_CONTAINER_STYLE,
      plateImageStyle: PLATE_IMAGE_STYLE,
      eventTitleStyle: EVENT_TITLE_STYLE,
      dateTimeSectionStyle: DATE_TIME_SECTION_STYLE,
      eventTagContainerStyle: EVENT_TAG_CONTAINER_STYLE,
      buttonContainerStyle: BUTTON_CONTAINER_STYLE
    };
  })();
  const buttons = (() => {
    const temp = [];
    if (props.displayMode === DisplayMode.MOBILE) {
      temp.push(<AccentTextButton key='Print' label='Print'
        style={MOBILE_BUTTON_STYLE} onClick={props.onPrintClick} />);
      temp.push(<AccentTextButton key='PDF' label='Download PDF'
        style={MOBILE_BUTTON_STYLE} onClick={props.onDownloadPdfClick} />);
      temp.push(<AccentTextButton key='Email' label='Send Email'
        style={MOBILE_BUTTON_STYLE} onClick={props.onSendEmailClick} />);
      temp.push(<AccentTextButton key='Help' label='Help'
        style={MOBILE_BUTTON_STYLE} onClick={props.onHelpClick} />);
    } else {
      temp.push(<PrimaryTextLinkButton key='Print' label='Print'
        onClick={props.onPrintClick} />);
      temp.push(<PrimaryTextLinkButton key='PDF' label='Download PDF'
        onClick={props.onDownloadPdfClick} />);
      temp.push(<PrimaryTextLinkButton key='Email' label='Send Email'
        onClick={props.onSendEmailClick} />);
      temp.push(<PrimaryTextLinkButton key='Help' label='Help'
        onClick={props.onHelpClick} />);
    }
    return temp;
  })();
  let totalFee = 0, totalTax = 0, totalPayment = 0;
  const feeRows = [];
  if (props.paymentRecord.paymentTransactions &&
      props.paymentRecord.paymentTransactions.length !== 0) {
    for (const payment of props.paymentRecord.paymentTransactions) {
      const newFee = payment.amount;
      totalFee += newFee;
      const newTaxAmount = newFee * payment.taxRate;
      totalTax += newTaxAmount;
      totalPayment += newFee + newTaxAmount;
      feeRows.push(
        <div key={payment.id} style={FEE_ROW_STYLE} >
          <div style={BOLD_FEE_TEXT_STYLE} >{payment.title}</div>
          <div style={AMOUNT_TEXT_STYLE} >CAD ${newFee}</div>
        </div>);
    }
  }
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
          <div style={PLATE_IMAGE_CONTAINER_STYLE} >
            <img
              style={plateImageStyle}
              src='resources/payment_receipt_modal/plate.svg'
              alt='Plate Image'
            />
          </div>
          <div style={eventTagContainerStyle} >
            <svg
                style={{...EVENT_TAG_ICON_STYLE,
                  color: props.paymentRecord.eventCardSummary.eventColor}}
                width='18' height='31' viewBox='0 0 18 31'
                xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M18 31H0V0H18L14 15.5L18 31Z' fill='currentColor' />
            </svg>
          </div>
          <h1 style={eventTitleStyle} >
            {props.paymentRecord.eventCardSummary.eventTitle}
          </h1>
          <div style={dateTimeSectionStyle} >
            <div style={TEXT_ICON_CONTAINER_STYLE} >
              <img
                style={DATE_ICON_STYLE}
                src='resources/payment_receipt_modal/date.svg'
                alt='Date Icon'
              />
              <p style={DATE_TEXT_STYLE} >
                {format(props.paymentRecord.eventCardSummary.eventStartTime,
                'eeee, MMMM do')}
              </p>
            </div>
            <div style={TEXT_ICON_CONTAINER_STYLE} >
              <img
                style={TIME_ICON_STYLE}
                src='resources/payment_receipt_modal/time.svg'
                alt='Time Icon'
              />
              <p style={TIME_TEXT_STYLE} >
                {format(props.paymentRecord.eventCardSummary.eventStartTime,
                'h:mm aa')} - {format(
                props.paymentRecord.eventCardSummary.eventEndTime, 'h:mm aa')}
              </p>
            </div>
          </div>
          <div style={LOCATION_ICON_CONTAINER_STYLE} >
            <img
              style={LOCATION_ICON_STYLE}
              src='resources/icons/location.svg'
              alt='Location Icon'
            />
            <p style={TIME_TEXT_STYLE} >
              {props.paymentRecord.eventCardSummary.restaurantName}
            </p>
          </div>
          <div style={JOINED_TEXT_STYLE} >
            You joined on {format(
            props.paymentRecord.paymentTransactions[0].processedAt,
            'eeee, MMMM do, yyyy, h:mm aa')}.
          </div>
          {feeRows}
          <div style={DIVIDER_STYLE} />
          <div style={FEE_ROW_STYLE} >
            <div style={GREY_TEXT_STYLE} >Subtotal</div>
            <div style={AMOUNT_TEXT_STYLE} >CAD ${totalFee.toFixed(2)}</div>
          </div>
          <div style={FEE_ROW_STYLE} >
            <div style={GREY_TEXT_STYLE} >Tax</div>
            <div style={AMOUNT_TEXT_STYLE} >CAD ${totalTax.toFixed(2)}</div>
          </div>
          <div style={FEE_ROW_STYLE} >
            <div style={BOLD_FEE_TEXT_STYLE} >Total Payment</div>
            <div style={AMOUNT_TEXT_STYLE} >CAD ${totalPayment.toFixed(2)}</div>
          </div>
          <div style={DIVIDER_STYLE} />
          <div style={RECEIPT_NUMBER_STYLE} >
            Receipt #{props.paymentRecord.id}
          </div>
          <div style={BOLD_FEE_TEXT_STYLE} >Payment Method</div>
          <div style={CARD_AMOUNT_ROW_STYLE} >
            <div style={CARD_NUMBER_COLUMN_STYLE} >
              <img
                style={CARD_IMAGE_STYLE}
                src='resources/icons/amex.svg'
                alt='Card Icon'
              />
              <div style={COLUMN_CONTAINER_STYLE} >
                <div style={BOLD_FEE_TEXT_STYLE} >Ending in {
                  props.paymentRecord.paymentTransactions[0].cardLast4digits}
                </div>
                <div style={GREY_TEXT_STYLE} >
                  {format(
                  props.paymentRecord.paymentTransactions[0].processedAt,
                  'MM/dd/yy h:mm aa')}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={buttonContainerStyle} >
          {buttons}
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
  position: 'relative',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  padding: '100px 30px 40px 28px',
  backgroundColor: '#FFFFFF',
  borderRadius: '4px',
  width: '100%'
};

const MOBILE_CONTENT_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTENT_CONTAINER_STYLE,
  padding: '60px 20px 40px 30px'
};

const PLATE_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  width: '100%'
};

const PLATE_IMAGE_STYLE: React.CSSProperties = {
  width: '140px',
  height: '140px',
  minWidth: '140px',
  minHeight: '140px',
  marginTop: '-171px',
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

const EVENT_TAG_CONTAINER_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: '105px',
  left: '0px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '18px',
  height: '31px',
  backgroundColor: 'transparent'
};

const MOBILE_EVENT_TAG_CONTAINER_STYLE: React.CSSProperties = {
  ...EVENT_TAG_CONTAINER_STYLE,
  top: '65px'
};

const EVENT_TAG_ICON_STYLE: React.CSSProperties = {
  width: '100%',
  minWidth: '18px',
  height: '100%',
  minHeight: '31px'
};

const EVENT_TITLE_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '26px',
  lineHeight: '39px',
  textTransform: 'capitalize',
  color: '#000000',
  padding: '0px',
  margin: '0px 0px 10px 0px',
  width: '100%'
};

const MOBILE_EVENT_TITLE_STYLE: React.CSSProperties = {
  ...EVENT_TITLE_STYLE,
  fontSize: '24px',
  lineHeight: '36px',
  margin: '0px 0px 10px 0px'
};

const DATE_TIME_SECTION_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  marginBottom: '10px',
  gap: '30px'
};

const MOBILE_DATE_TIME_SECTION_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  marginBottom: '10px',
  gap: '10px'
};

const DATE_ICON_STYLE: React.CSSProperties = {
  width: '15px',
  minWidth: '15px',
  height: '14px',
  minHeight: '14px'
};

const DATE_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '20px',
  lineHeight: '25px',
  color: '#000000',
  padding: '0px',
  margin: '0px 30px 0px 0px'
};

const TIME_ICON_STYLE: React.CSSProperties = {
  width: '15px',
  minWidth: '15px',
  height: '15px',
  minHeight: '15px'
};

const TIME_TEXT_STYLE: React.CSSProperties = {
  ...DATE_TEXT_STYLE,
  margin: '0px'
};

const TEXT_ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '10px'
};

const LOCATION_ICON_CONTAINER_STYLE: React.CSSProperties = {
  ...TEXT_ICON_CONTAINER_STYLE,
  marginBottom: '40px',
  width: '100%'
};

const JOINED_TEXT_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  marginBottom: '40px',
  width: '100%',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '20px',
  color: '#000000'
};

const LOCATION_ICON_STYLE: React.CSSProperties = {
  width: '15px',
  minWidth: '15px',
  height: '15px',
  minHeight: '15px'
};

const DIVIDER_STYLE: React.CSSProperties = {
  width: '100%',
  height: '1px',
  backgroundColor: '#EFEFEF',
  marginBottom: '20px'
};

const FEE_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  width: '100%',
  gap: '20px',
  marginBottom: '20px'
};

const BOLD_FEE_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '20px',
  color: '#000000'
};

const GREY_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '16px',
  lineHeight: '20px',
  color: '#969696'
};

const AMOUNT_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '20px',
  color: '#000000'
};

const RECEIPT_NUMBER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 300,
  fontSize: '12px',
  lineHeight: '15px',
  color: '#000000',
  width: '100%',
  marginBottom: '40px'
};

const CARD_AMOUNT_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '20px',
  width: '100%',
  marginTop: '20px'
};

const CARD_NUMBER_COLUMN_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '20px'
};

const CARD_IMAGE_STYLE: React.CSSProperties = {
  width: '55px',
  minWidth: '55px',
  height: '40px',
  minHeight: '40px'
};

const COLUMN_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start'
};

const BUTTON_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0px 10px',
  height: '63px',
  width: '100%'
};

const MOBILE_BUTTON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  gap: '20px',
  marginTop: '20px'
};

const MOBILE_BUTTON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '35px',
  minHeight: '35px'
};
