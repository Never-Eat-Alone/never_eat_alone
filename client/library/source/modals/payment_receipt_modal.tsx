import { format } from 'date-fns';
import * as React from 'react';
import * as Router from 'react-router-dom';
import { AccentTextButton, BackButton, CloseButton, InputField,
  PrimaryTextLinkButton, Textarea, PrimaryTextButton, RedNavLink
} from '../components';
import { DisplayMode, PaymentRecord, PaymentStatus } from '../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** Payment Record. */
  paymentRecord: PaymentRecord;

  page: PaymentReceiptModal.Page;

  isReceiptEmailed: boolean;

  /** Indicates the close button is clicked. */
  onClose: () => void;

  /** Indicates the print button is clicked. */
  onPrintClick: (paymentRecord: PaymentRecord) => void;

  /** Indicates the Download Pdf button is clicked. */
  onDownloadPdfClick: (paymentRecord: PaymentRecord) => void;

  /** Indicates the send email button is clicked. */
  onSendEmailClick: (paymentRecord: PaymentRecord) => void;

  /** Indicates the help button is clicked. */
  onHelpClick: () => void;

  /** Indicates the back button is clicked. */
  onBack: () => void;

  /** Indicates the submit button on help page is clicked. */
  submitHelpEmail: (receiptId: number, message: string) => void;

  activateEmailButton: () => void;
}

interface State {
  message: string;
  counter: number;
}

/** Displays the Payment Receipt Modal. */
export class PaymentReceiptModal extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      message: '',
      counter: 5
    };
    this._containerRef = React.createRef();
  }

  public render(): JSX.Element {
    const { containerStyle, logoRowStyle, contentContainerStyle,
        plateImageStyle, eventTitleStyle, dateTimeSectionStyle,
        eventTagContainerStyle, buttonContainerStyle,
        backgroundImageContainerStyle } = (() => {
      if (this.props.displayMode === DisplayMode.MOBILE) {
        return {
          containerStyle: MOBILE_CONTAINER_STYLE,
          logoRowStyle: MOBILE_LOGO_ROW_STYLE,
          contentContainerStyle: MOBILE_CONTENT_CONTAINER_STYLE,
          plateImageStyle: MOBILE_PLATE_IMAGE_STYLE,
          eventTitleStyle: MOBILE_EVENT_TITLE_STYLE,
          dateTimeSectionStyle: MOBILE_DATE_TIME_SECTION_STYLE,
          eventTagContainerStyle: MOBILE_EVENT_TAG_CONTAINER_STYLE,
          buttonContainerStyle: MOBILE_BUTTON_CONTAINER_STYLE,
          backgroundImageContainerStyle: MOBILE_BACKGROUND_IMAGE_CONTAINER_STYLE
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
        buttonContainerStyle: BUTTON_CONTAINER_STYLE,
        backgroundImageContainerStyle: BACKGROUND_IMAGE_CONTAINER_STYLE
      };
    })();
    let totalFee = 0, totalTax = 0, totalPayment = 0;
    let processedAtDate = null;
    const feeRows = [];
    if (this.props.paymentRecord.paymentTransactions &&
        this.props.paymentRecord.paymentTransactions.length !== 0) {
      for (const payment of this.props.paymentRecord.paymentTransactions) {
        if (payment.status !== PaymentStatus.CHARGED) {
          continue;
        }
        if (!processedAtDate) {
          processedAtDate = payment.processedAt;
        } else {
          processedAtDate = (processedAtDate > payment.processedAt &&
            payment.processedAt || processedAtDate);
        }
        const newFee = payment.amount;
        totalFee += newFee;
        const newTaxAmount = (newFee * payment.taxRate / 100);
        totalTax += newTaxAmount;
        totalPayment += newFee + newTaxAmount;
        feeRows.push(
          <div key={payment.id} style={FEE_ROW_STYLE} >
            <div style={BOLD_FEE_TEXT_STYLE} >{payment.title}</div>
            <div style={AMOUNT_TEXT_STYLE} >CAD ${newFee}</div>
          </div>);
      }
    }
    const processedAt = (processedAtDate && format(processedAtDate,
      'MM/dd/yy h:mm aa') || '');
    const pageContent = (() => {
      if (this.props.page === PaymentReceiptModal.Page.REQUEST_SENT) {
        return (
          <div style={HELP_FORM_CONTAINER_STYLE} >
            <div style={BACK_ROW_CONTAINER_STYLE} >
              <BackButton onClick={this.props.onBack} />
              <h1 style={HELP_H1_STYLE} >Request sent!</h1>
            </div>
            <div style={HELP_FORM_P_STYLE} >
              Someone from our team will get back to you as soon as we can.
            </div>
            <div style={HELP_FORM_P_STYLE} >
              Need a quick answer now? <RedNavLink to='/help'
              label='See our Help Page' style={RED_LINK_STYLE} />.
            </div>
          </div>);
      }
      if (this.props.page === PaymentReceiptModal.Page.HELP) {
        return (
          <div style={HELP_FORM_CONTAINER_STYLE} >
            <div style={BACK_ROW_CONTAINER_STYLE} >
              <BackButton onClick={this.props.onBack} />
              <h1 style={HELP_H1_STYLE} >Get help with this receipt</h1>
            </div>
            <div style={HELP_FORM_P_STYLE} >
              Fill in the form below or email <b>
              support@nevereatalone.net</b> with your Receipt Number.
            </div>
            <InputField
              style={HELP_INPUT_STYLE}
              value={`Help with Receipt #${this.props.paymentRecord.id}`}
              type='text'
              disabled
              readOnly
            />
            <Textarea
              style={HELP_TEXTAREA_STYLE}
              value={this.state.message}
              placeholder='Tell us how we can help.'
              onValueChange={this.handleMessageChange}
            />
            <PrimaryTextButton
              style={SUBMIT_HELP_BUTTON_STYLE}
              label='Submit'
              disabled={this.state.message.trim() === ''}
              onClick={() => this.props.submitHelpEmail(
                this.props.paymentRecord.id, this.state.message.trim())}
            />
            <div style={HELP_FORM_P_STYLE} >
              Need a quick answer now? <RedNavLink to='/help'
              label='See our Help Page' style={RED_LINK_STYLE} />.
            </div>
          </div>);
      }
      return (
        <>
          <div style={eventTagContainerStyle} >
            <svg
                style={{...EVENT_TAG_ICON_STYLE,
                  color: this.props.paymentRecord.eventCardSummary.eventColor
                }}
                width='18' height='31' viewBox='0 0 18 31'
                xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M18 31H0V0H18L14 15.5L18 31Z' fill='currentColor' />
            </svg>
          </div>
          <h1 style={eventTitleStyle} >
            {this.props.paymentRecord.eventCardSummary.eventTitle}
          </h1>
          <div style={dateTimeSectionStyle} >
            <div style={TEXT_ICON_CONTAINER_STYLE} >
              <img
                style={DATE_ICON_STYLE}
                src='resources/payment_receipt_modal/date.svg'
                alt='Date Icon'
              />
              <p style={DATE_TEXT_STYLE} >
                {format(
                  this.props.paymentRecord.eventCardSummary.eventStartTime,
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
                {format(
                  this.props.paymentRecord.eventCardSummary.eventStartTime,
                  'h:mm aa')} - {format(
                  this.props.paymentRecord.eventCardSummary.eventEndTime,
                  'h:mm aa')}
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
              {this.props.paymentRecord.eventCardSummary.restaurantName}
            </p>
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
            <div style={AMOUNT_TEXT_STYLE} >
              CAD ${totalPayment.toFixed(2)}
            </div>
          </div>
          <div style={DIVIDER_STYLE} />
          <div style={RECEIPT_NUMBER_STYLE} >
            Receipt #{this.props.paymentRecord.id}
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
                  this.props.paymentRecord.paymentTransactions[0]
                  .cardLast4digits}
                </div>
                <div style={GREY_TEXT_STYLE} >
                  {processedAt}
                </div>
              </div>
            </div>
            <div style={AMOUNT_TEXT_STYLE} >CAD ${totalPayment.toFixed(2)}</div>
          </div>
        </>);
    })();
    const buttons = (() => {
      const temp = [];
      if (this.props.displayMode === DisplayMode.MOBILE) {
        temp.push(<AccentTextButton key='Print' label='Print'
          style={MOBILE_BUTTON_STYLE} onClick={() => this.props.onPrintClick(
          this.props.paymentRecord)} />);
        temp.push(<AccentTextButton key='PDF' label='Download PDF'
          style={MOBILE_BUTTON_STYLE} onClick={() =>
          this.props.onDownloadPdfClick(this.props.paymentRecord)}
        />);
        if (this.props.isReceiptEmailed) {
          temp.push(<AccentTextButton key='Email'
            label={`Sent(${this.state.counter}s)`}
            style={MOBILE_BUTTON_STYLE} disabled />);
        } else {
          temp.push(<AccentTextButton key='Email' label='Send Email'
          style={MOBILE_BUTTON_STYLE} onClick={this.handleSendEmail} />);
        }
        temp.push(<AccentTextButton key='Help' label='Help'
          style={MOBILE_BUTTON_STYLE} onClick={this.props.onHelpClick} />);
      } else {
        temp.push(<PrimaryTextLinkButton key='Print' label='Print'
          onClick={() => this.props.onPrintClick(this.props.paymentRecord)} />);
        temp.push(<PrimaryTextLinkButton key='PDF' label='Download PDF'
          onClick={() => this.props.onDownloadPdfClick(
          this.props.paymentRecord)} />);
        if (this.props.isReceiptEmailed) {
          temp.push(<PrimaryTextLinkButton key='Email'
            label={`Sent(${this.state.counter}s)`} disabled />);
        } else {
          temp.push(<PrimaryTextLinkButton key='Email' label='Send Email'
            onClick={this.handleSendEmail} />);
        }
        temp.push(<PrimaryTextLinkButton key='Help' label='Help'
          onClick={this.props.onHelpClick} />);
      }
      return temp;
    })();
    const buttonsSection = (() => {
      if (this.props.page !== PaymentReceiptModal.Page.INITIAL) {
        return null;
      }
      return (
        <div style={buttonContainerStyle} >
          {buttons}
        </div>);
    })();
    return (
      <div style={FORM_STYLE} >
        <div ref={this._containerRef} style={containerStyle} >
          <div style={backgroundImageContainerStyle} >
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
                onClick={this.props.onClose}
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
              {pageContent}
            </div>
            {buttonsSection}
          </div>
        </div>
      </div>);
  }

  public componentDidMount(): void {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  public componentWillUnmount(): void {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  private handleClickOutside: { (event: any): void } = (
      event: React.MouseEvent) => {
    if (!this._containerRef.current.contains(event.target as Node)) {
      event.preventDefault();
      event.stopPropagation();
      this.props.onClose();
    }
  }

  private handleMessageChange = (newValue: string) => {
    this.setState({ message: newValue });
  }

  private handleSendEmail = () => {
    this.props.onSendEmailClick(this.props.paymentRecord);
    this._emailTimerId = setInterval(() => {
      if (this.state.counter > 0) {
        this.setState((prevState) => ({ counter: prevState.counter - 1 }));
      } else {
        this.setState({ counter: 5 });
        this.props.activateEmailButton();
        clearInterval(this._emailTimerId);
      }
    }, 1000);
  }

  private _containerRef: React.RefObject<HTMLDivElement>;
  private _emailTimerId: NodeJS.Timeout;
}

export namespace PaymentReceiptModal {
  export enum Page {
    INITIAL,
    HELP,
    REQUEST_SENT
  }
}

const FORM_STYLE: React.CSSProperties = {
  position: 'fixed',
  top: '0px',
  left: '0px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgb(150, 150, 150, 0.5)',
  zIndex: 1000,
  overflow: 'scroll'
};

const CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  boxSizing: 'border-box',
  width: '560px',
  minWidth: '560px',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  borderRadius: '4px',
  background: 'linear-gradient(180deg, #F26A54 54.18%, #F26A54 54.19%, \
    #F24D3D 100%, #F24D3D 100%)',
  overflow: 'initial'
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
  backgroundColor: 'transparent',
  padding: '40px 20px 20px 20px'
};

const MOBILE_BACKGROUND_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  ...BACKGROUND_IMAGE_CONTAINER_STYLE,
  padding: '20px'
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

const HELP_FORM_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '20px',
  width: '100%'
};

const BACK_ROW_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  gap: '10px'
};

const HELP_H1_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 500,
  fontSize: '26px',
  lineHeight: '39px',
  textTransform: 'uppercase',
  color: '#000000',
  padding: '0px',
  margin: '0px'
};

const HELP_FORM_P_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  whiteSpace: 'pre-line',
  width: '100%',
  padding: '0px',
  margin: '0px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '18px',
  color: '#000000'
};

const HELP_INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  minWidth: '100%',
  height: '38px',
  minHeight: '38px'
};

const HELP_TEXTAREA_STYLE: React.CSSProperties = {
  height: '130px',
  minHeight: '130px',
  width: '100%'
};

const SUBMIT_HELP_BUTTON_STYLE: React.CSSProperties = {
  width: '113px',
  height: '35px'
};

const RED_LINK_STYLE: React.CSSProperties = {
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '18px',
  minHeight: '18px',
  width: 'fit-content',
  whiteSpace: 'pre-line'
};
