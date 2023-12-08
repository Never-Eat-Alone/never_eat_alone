import { css, StyleSheet } from 'aphrodite';
import { format } from 'date-fns';
import * as React from 'react';
import { CloseButton, PrimaryTextButton, RedNavLinkWithArrow } from
  '../../components';
import { DisplayMode, User } from '../../definitions';
import StripeCheckoutForm from './stripe_checkout_form';

interface Properties {
  displayMode: DisplayMode;

  account: User;

  eventId: number;

  /** The fee associated with the event. */
  eventFee: number;

  /** The description displayed about the event fee. */
  eventFeeDescription: string;

  /** The tax rate of the event such as 0.13 for ontario. */
  taxRate?: number;

  /** The title of the event. */
  eventTitle: string;

  /** The source address of the event image. */
  imageSrc: string;

  /** The start date of the event. */
  eventStartDate: Date;

  /** ErrorCode of the page. */
  errorCode: DiningEventCheckoutModal.ErrorCode;

  /** Whether the checkout process is completed or not. */
  checkoutCompleted: boolean;

  page: DiningEventCheckoutModal.Page;

  /** Indicates the join button is clicked. */
  onJoinEvent: () => void;

  /** Indicates the close button is clicked. */
  onClose: () => void;

  /** Indicates the Checkout button is clicked. */
  onCheckout: () => void;
}

interface State {
  page: DiningEventCheckoutModal.Page;
  errorCode: DiningEventCheckoutModal.ErrorCode;
}

function getTaxAmount(fee: number, taxRate: number = 0) {
  return (Math.ceil(fee * taxRate * 100) / 100).toFixed(2);
}

/** Displays the Join Event Modal. */
export class DiningEventCheckoutModal extends React.Component<Properties,
    State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      page: this.props.page,
      errorCode: this.props.errorCode
    };
    this._containerRef = React.createRef();
  }

  public render(): JSX.Element {
    const { containerStyle, costDetailsContainerStyle } = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          containerStyle: DESKTOP_CONTAINER_STYLE,
          costDetailsContainerStyle: COST_DETAILS_CONTAINER_STYLE
        };
      }
      if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerStyle: TABLET_CONTAINER_STYLE,
          costDetailsContainerStyle: COST_DETAILS_CONTAINER_STYLE
        };
      }
      return {
        containerStyle: MOBILE_CONTAINER_STYLE,
        costDetailsContainerStyle: MOBILE_COST_DETAILS_CONTAINER_STYLE
      };
    })();
    const eventNameButtonContainerStyle = (() => {
      if (this.props.eventFee && this.props.eventFee != 0) {
        if (this.props.checkoutCompleted) {
          return PAYMENT_COMPLETED_EVENT_NAME_BUTTON_CONTAINER_STYLE;
        }
        return EVENT_NAME_BUTTON_CONTAINER_STYLE;
      }
      return FREE_EVENT_NAME_BUTTON_CONTAINER_STYLE;
    })();
    const feeDescription = (this.props.eventFeeDescription &&
      <div style={FEE_DESCRIPTION_STYLE} >
        {this.props.eventFeeDescription}
      </div> || null);
    const totalPaymentSection = (() => {
      if (this.props.checkoutCompleted && this.state.page ===
          DiningEventCheckoutModal.Page.PROCESSING_PAYMENT) {
        if (this.props.errorCode === DiningEventCheckoutModal.ErrorCode
            .PAYMENT_FAILED || this.props.errorCode ===
            DiningEventCheckoutModal.ErrorCode.THIRDPARTY_PAYMENT_FAILED) {
          return (
            <React.Fragment>
              <div
                style={{...EVENT_FEE_BOLD_TEXT_STYLE,
                  ...EVENT_FEE_FAILED_STYLE}}
              >
                Total Paid
              </div>
              <div style={{...EVENT_PRICE_STYLE, ...EVENT_FEE_FAILED_STYLE}} >
                CAD $0.00
              </div>
            </React.Fragment>);
        } else {
          return (
            <React.Fragment>
              <div style={EVENT_FEE_BOLD_TEXT_STYLE} >Total Paid</div>
              <div style={EVENT_PRICE_STYLE} >
                CAD ${(Number(getTaxAmount(this.props.eventFee,
                  this.props.taxRate)) + this.props.eventFee).toFixed(2)}
              </div>
            </React.Fragment>);
        }
      }
      return (
        <React.Fragment>
          <div style={EVENT_FEE_BOLD_TEXT_STYLE} >Total Payment</div>
          <div style={EVENT_PRICE_STYLE} >
            CAD ${(Number(getTaxAmount(this.props.eventFee,
              this.props.taxRate)) + this.props.eventFee).toFixed(2)}
          </div>
        </React.Fragment>);
    })();
    const costBreakDownSection = (
      <div style={COST_BREAKDOWN_TOTAL_CONTAINER_STYLE} >
        <div style={COLUMN_CONTAINER_STYLE} >
          <div style={EVENT_FEE_ROW_STYLE} >
            <div style={EVENT_FEE_BOLD_TEXT_STYLE} >Event Fee</div>
            <div style={EVENT_PRICE_STYLE} >
              CAD ${this.props.eventFee.toString()}
            </div>
          </div>
          {feeDescription}
        </div>
        <div style={COLUMN_CONTAINER_STYLE} >
          <div style={PRICE_DIVIDER_STYLE} />
          <div style={EVENT_FEE_ROW_STYLE} >
            <div style={GREY_TEXT_STYLE} >Subtotal</div>
            <div style={EVENT_PRICE_STYLE} >
              CAD ${this.props.eventFee.toString()}
            </div>
          </div>
          <div style={EVENT_FEE_ROW_STYLE} >
            <div style={GREY_TEXT_STYLE} >Tax</div>
            <div style={EVENT_PRICE_STYLE} >
              CAD ${getTaxAmount(this.props.eventFee, this.props.taxRate)}
            </div>
          </div>
          <div style={EVENT_FEE_ROW_STYLE} >
            {totalPaymentSection}
          </div>
        </div>
      </div>);
    const paymentMethodSection = (
      <React.Fragment>
        <StripeCheckoutForm
          label='Checkout'
          onCheckout={this.handleCheckout}
        />
      </React.Fragment>);
    const joinButton = (() => {
      if (this.props.eventFee == 0) {
        return (
          <PrimaryTextButton
            style={JOIN_BUTTON_STYLE}
            label='Join Event'
            labelStyle={JOIN_BUTTON_TEXT_STYLE}
            onClick={this.props.onJoinEvent}
          />);
      }
      if (this.state.page === DiningEventCheckoutModal.Page
          .PROCESSING_PAYMENT && !this.props.checkoutCompleted) {
        return null;
      }
      if (this.props.checkoutCompleted && this.state.page ===
          DiningEventCheckoutModal.Page.PROCESSING_PAYMENT) {
        if (this.props.errorCode === DiningEventCheckoutModal.ErrorCode
            .PAYMENT_FAILED || this.props.errorCode ===
            DiningEventCheckoutModal.ErrorCode.THIRDPARTY_PAYMENT_FAILED) {
          return <PrimaryTextButton label='Back to Checkout'
                    style={BACK_TO_BUTTON_STYLE}
                    onClick={this.handleBackToCheckout}
                  />;
        }
        return <PrimaryTextButton label='Back to Event'
                  style={BACK_TO_BUTTON_STYLE}
                  onClick={this.props.onClose}
                />;
      }
      return paymentMethodSection;
    })();
    const eventNameButtonSection = (() => {
      return (
        <div style={eventNameButtonContainerStyle} >
          <div style={EVENT_NAME_DATE_CONTAINER_STYLE} >
            <h1 style={EVENT_NAME_STYLE} >{this.props.eventTitle}</h1>
            <div style={EVENT_DATE_STYLE} >
              {format(this.props.eventStartDate,
              'eeee, MMMM do, yyyy')}{' at '}{format(
              this.props.eventStartDate, 'h:mm aa')}
            </div>
          </div>
          {joinButton}
        </div>);
      })();
    const costDetailsSection = (() => {
      if (this.props.checkoutCompleted &&
          this.state.page === DiningEventCheckoutModal.Page.PROCESSING_PAYMENT
          ) {
        if (this.props.errorCode === DiningEventCheckoutModal.ErrorCode
            .PAYMENT_FAILED || this.props.errorCode ===
            DiningEventCheckoutModal.ErrorCode.THIRDPARTY_PAYMENT_FAILED) {
          return (
            <div style={costDetailsContainerStyle} >
              <div style={PAYMENT_COMPLETED_CONTAINER_STYLE} >
                <div style={PAYMENT_TOP_SECTION_STYLE} >
                  <div style={ROW_STYLE} >
                    <img
                      style={PAYMENT_FAILED_ICON_STYLE}
                      src='resources/icons/failed.svg'
                      alt='Failed Icon'
                    />
                    <div style={PAYMENT_FAILED_TITLE_STYLE} >
                      Payment Failed
                    </div>
                  </div>
                  <p style={FAILED_PAYMENT_DESCRIPTION_STYLE} >
                    We ran into a problem processing your payment.&nbsp;
                    Your payment method has not been charged.
                  </p>
                </div>
                <div style={PAYMENT_BOTTOM_SECTION_STYLE} >
                  {costBreakDownSection}
                </div>
              </div>
            </div>);
        } else {
          return (
            <div style={costDetailsContainerStyle} >
              <div style={PAYMENT_COMPLETED_CONTAINER_STYLE} >
                <div style={PAYMENT_TOP_SECTION_STYLE} >
                  <div style={PAYMENT_ICON_CONTAINER_STYLE} >
                    <img
                      style={PAYMENT_ICON_STYLE}
                      src='resources/icons/celebration.svg'
                      alt='Icon'
                    />
                  </div>
                  <div style={PAYMENT_TITLE_STYLE} >Payment completed</div>
                </div>
                <div style={PAYMENT_BOTTOM_SECTION_STYLE} >
                  {costBreakDownSection}
                  <div style={DIVIDER_STYLE} />
                  <div style={PAYMENT_HISTORY_LINK_STYLE} >
                    <RedNavLinkWithArrow
                      label='Payment History'
                      to={`/payment_history/${this.props.account.id}`}
                    />
                  </div>
                </div>
              </div>
            </div>);
        }
      } else if (this.state.page === DiningEventCheckoutModal.Page
          .PROCESSING_PAYMENT && !this.props.checkoutCompleted) {
        return (
          <div style={costDetailsContainerStyle} >
            <div style={CENTER_CONTAINER_STYLE} >
              <div style={SPINNER_CONTAINER_STYLE} >
                <img
                  style={PROCESSING_IMAGE_STYLE}
                  src='resources/icons/processing.svg'
                  alt='Processing Icon'
                />
                <div style={SPIN_DIV_STYLE} className={css(styles.spinDiv,
                  styles.spinDivFirst)} />
                <div style={SPIN_DIV_STYLE} className={css(styles.spinDiv,
                  styles.spinDivSecond)} />
                <div style={SPIN_DIV_STYLE} className={css(styles.spinDiv,
                  styles.spinDivThird)} />
                <div style={SPIN_DIV_STYLE} className={css(styles.spinDiv)} />
              </div>
              <h3 style={PROCESSING_TITLE_STYLE} >Processing</h3>
              <p style={PROCESSING_DESCRIPTION_STYLE} >
                You’re almost done! Please wait while we process your payment.
              </p>
            </div>
          </div>);
      } else {
        return (
          <div style={costDetailsContainerStyle} >
            <h2 style={CHECKOUT_TITLE_STYLE} >Event Checkout</h2>
            <div style={DIVIDER_STYLE} />
            {costBreakDownSection}
          </div>);
      }
    })();
    if (this.props.displayMode === DisplayMode.MOBILE) {
      return (
        <div style={containerStyle} >
          <CloseButton
            style={CLOSE_BUTTON_STYLE}
            displayMode={DisplayMode.MOBILE}
            onClick={this.props.onClose}
          />
          <img
            style={{...IMAGE_STYLE, ...MOBILE_IMAGE_STYLE,
              height: this.props.eventFee == 0 && '150px' || '50px'}}
            src={this.props.imageSrc}
            alt='Event Image'
          />
          {costDetailsSection}
          {eventNameButtonSection}
        </div>);
    }
    return (
      <div style={FORM_STYLE} >
        <div ref={this._containerRef} style={containerStyle} >
          <CloseButton
            style={CLOSE_BUTTON_STYLE}
            displayMode={DisplayMode.MOBILE}
            onClick={this.props.onClose}
          />
          {costDetailsSection}
          <div style={PAYMENT_METHOD_CONTAINER_STYLE} >
            <img
              style={{...IMAGE_STYLE,
                height: this.props.eventFee == 0 && '150px' || '50px'}}
              src={this.props.imageSrc}
              alt='Event Image'
            />
            {eventNameButtonSection}
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
    if (this._containerRef.current && !this._containerRef.current.contains(
        event.target as Node)) {
      event.preventDefault();
      event.stopPropagation();
      this.props.onClose();
    }
  }

  private handleCheckout = () => {
    this.setState({ page: DiningEventCheckoutModal.Page.PROCESSING_PAYMENT });
    this.props.onCheckout();
  }

  private handleBackToCheckout = () => {
    this.setState({
      page: DiningEventCheckoutModal.Page.INITIAL,
      errorCode: DiningEventCheckoutModal.ErrorCode.NONE
    });
  }

  private handleBackClick = () => {
    this.setState({ page: DiningEventCheckoutModal.Page.INITIAL });
  }

  private _containerRef: React.RefObject<HTMLDivElement>;
}

export namespace DiningEventCheckoutModal {
  export enum Page {
    INITIAL,
    PROCESSING_PAYMENT
  }

  export enum ErrorCode {
    NONE,
    PAYMENT_FAILED,
    THIRDPARTY_PAYMENT_FAILED,
    JOIN_FAILED
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
  zIndex: 1000
};

const CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  position: 'relative',
  borderRadius: '4px',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  backgroundColor: '#F6F6F6',
  overflowY: 'auto'
};

const DESKTOP_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTAINER_STYLE,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start'
};

const TABLET_CONTAINER_STYLE: React.CSSProperties = {
  ...DESKTOP_CONTAINER_STYLE
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTAINER_STYLE,
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  minWidth: '100%',
  maxWidth: '375px',
  overflow: 'auto'
};

const CLOSE_BUTTON_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: '10px',
  right: '10px'
};

const COST_DETAILS_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  backgroundColor: '#FFFFFF',
  height: '100%',
  padding: '40px 20px',
  borderRadius: '4px 0px 0px 4px',
  width: '375px',
  minWidth: '375px'
};

const MOBILE_COST_DETAILS_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  backgroundColor: '#FFFFFF',
  width: '100%',
  padding: '20px',
  borderRadius: '0px'
};

const COST_BREAKDOWN_TOTAL_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%'
};

const COLUMN_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%'
};

const PAYMENT_METHOD_CONTAINER_STYLE: React.CSSProperties = {
  width: '300px',
  minWidth: '300px',
  height: '100%'
};

const CHECKOUT_TITLE_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '20px',
  lineHeight: '30px',
  color: '#969696',
  padding: '0px',
  margin: '0px',
  width: '100%'
};

const DIVIDER_STYLE: React.CSSProperties = {
  height: '1px',
  width: '100%',
  backgroundColor: '#969696',
  marginTop: '20px'
};

const EVENT_FEE_ROW_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '0px 10px',
  height: '38px'
};

const EVENT_FEE_BOLD_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000'
};

const EVENT_FEE_FAILED_STYLE: React.CSSProperties = {
  color: '#DE6956'
};

const EVENT_PRICE_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000'
};

const PRICE_DIVIDER_STYLE: React.CSSProperties = {
  height: '1px',
  width: '100%',
  backgroundColor: '#EFEFEF'
};

const GREY_TEXT_STYLE: React.CSSProperties = {
  marginTop: '10px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#969696'
};

const IMAGE_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '150px',
  minHeight: '150px',
  minWidth: '300px',
  objectFit: 'cover',
  overflow: 'hidden',
  borderRadius: '0px 4px 0px 0px'
};

const MOBILE_IMAGE_STYLE: React.CSSProperties = {
  borderRadius: '4px 4px 0px 0px'
};

const EVENT_NAME_BUTTON_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  padding: '20px 20px 40px 20px',
  backgroundColor: '#F6F6F6',
  borderRadius: '0px 0px 4px 4px'
};

const PAYMENT_COMPLETED_EVENT_NAME_BUTTON_CONTAINER_STYLE:
    React.CSSProperties = {
  ...EVENT_NAME_BUTTON_CONTAINER_STYLE,
  justifyContent: 'space-between',
  height: 'calc(100% - 150px)'
};

const FREE_EVENT_NAME_BUTTON_CONTAINER_STYLE: React.CSSProperties = {
  ...EVENT_NAME_BUTTON_CONTAINER_STYLE,
  justifyContent: 'space-between'
};

const EVENT_NAME_DATE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%'
};

const EVENT_NAME_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  width: '100%',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '20px',
  lineHeight: '30px',
  color: '#000000',
  padding: '0px',
  margin: '0px'
};

const EVENT_DATE_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '25px',
  color: '#BF408D',
  marginTop: '5px',
  width: '100%'
};

const JOIN_BUTTON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '40px',
  minHeight: '40px',
  marginTop: '30px'
};

const JOIN_BUTTON_TEXT_STYLE: React.CSSProperties = {
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px',
};

const BACK_TO_BUTTON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '38px',
  margin: '30px 0px 0px 0px'
}

const FEE_DESCRIPTION_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  width: '100%',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#969696',
  marginTop: '10px',
  marginBottom: '10px',
  padding: '0px 10px'
};

const ADDED_ICON_STYLE: React.CSSProperties = {
  width: '15px',
  minWidth: '15px',
  height: '15px',
  minHeight: '15px',
  backgroundColor: 'transparent'
};

const CENTER_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent',
  minHeight: '385px',
  gap: '20px'
};

const SPINNER_CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  display: 'inline-block',
  width: '70px',
  height: '70px'
};

const SPIN_DIV_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'block',
  position: 'absolute',
  width: '64px',
  height: '64px',
  margin: '3px',
  border: '3px solid #F26B55',
  borderRadius: '50%',
  borderColor: '#F26B55 transparent transparent transparent'
};

const PROCESSING_IMAGE_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: '20px',
  left: '20px',
  width: '30px',
  height: '30px',
  minWidth: '30px',
  minHeight: '30px',
  backgroundColor: 'transparent'
};

const PAYMENT_COMPLETED_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  gap: '20px'
};

const spinKeyframes = {
  '0%': {
    transform: 'rotate(0deg)'
  },
  '100%': {
    transform: 'rotate(360deg)'
  }
};

const PROCESSING_TITLE_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '20px',
  lineHeight: '30px',
  textAlign: 'center',
  color: '#000000',
  height: '30px',
  padding: '0px',
  margin: '0px',
  maxWidth: '100%'
};

const PROCESSING_DESCRIPTION_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  textAlign: 'center',
  color: '#969696',
  maxWidth: '100%',
  padding: '0px',
  margin: '0px'
};

const PAYMENT_ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '50px',
  height: '50px'
};

const PAYMENT_ICON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  minWidth: '50px',
  backgroundColor: 'transparent'
};

const PAYMENT_TITLE_STYLE: React.CSSProperties = {
  marginTop: '20px',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '20px',
  lineHeight: '30px',
  textAlign: 'center',
  color: '#000000'
};

const PAYMENT_TOP_SECTION_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%'
};

const PAYMENT_BOTTOM_SECTION_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'center',
  width: '100%'
};

const PAYMENT_HISTORY_LINK_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '18px',
  backgroundColor: 'transparent',
  marginTop: '10px'
};

const PAYMENT_FAILED_ICON_STYLE: React.CSSProperties = {
  width: '17px',
  height: '15px',
  backgroundColor: 'transparent'
};

const PAYMENT_FAILED_TITLE_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '20px',
  lineHeight: '30px',
  textAlign: 'center',
  color: '#DE6956'
};

const FAILED_PAYMENT_DESCRIPTION_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  margin: '20px 0px 0px 0px',
  padding: '0px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  textAlign: 'center',
  color: '#DE6956',
  whiteSpace: 'pre-line'
};

const ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  gap: '10px'
};

const styles = StyleSheet.create({
  spinDiv: {
    animationName: [spinKeyframes],
    animationDuration: '1.2s',
    animationTimingFunction: 'cubic-bezier(0.5, 0, 0.5, 1)',
    animationIterationCount: 'infinite'
  },
  spinDivFirst: {
    animationDelay: '-0.45s'
  },
  spinDivSecond:{
    animationDelay: '-0.3s'
  },
  spinDivThird: {
    animationDelay: '-0.15s'
  }
});
