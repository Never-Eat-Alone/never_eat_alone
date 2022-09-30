import { css, StyleSheet } from 'aphrodite';
import { format } from 'date-fns';
import * as React from 'react';
import { AddCreditCardForm, ApplePayButton, CloseButton,
  CreditCardDropdownMenu, GooglePayButton, PayPalButton, PrimaryTextButton,
  RedNavLinkWithArrow, SecondaryTextButtonWithArrow } from '../components';
import { DisplayMode, PaymentCard } from '../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** The fee associated with the event. */
  eventFee: number;

  /** The description displayed about the event fee. */
  eventFeeDescription: string;

  /** The tax rate of the event such as 0.13 for ontario. */
  taxRate: number;

  /** The title of the event. */
  eventTitle: string;

  /** The source address of the event image. */
  imageSrc: string;

  /** The start date of the event. */
  eventStartDate: Date;

  /** The list of payment cards associated with the user profile. */
  paymentCardsOnFile: PaymentCard[];

  /** User's default payment card. */
  displayedCard: PaymentCard;

  /** Error message regarding the add credit card form. */
  addCardErrorMessage: string;

  /** Displayed month number on dropdown menu. */
  selectedMonth: number;

  /** Displayed year number on dropdown menu. */
  selectedYear: number;

  /** The security code on the card. */
  securityCode: string;

  /** Card number. */
  cardNumber: string;

  /** The zipcode of the creditcard. */
  zipcode: string;

  /** First name and last name on the card. */
  nameOnCard: string;

  /** ErrorCode of the page. */
  errorCode: JoinEventModal.ErrorCode;

  /** Errorcode regarding the add credit card form. */
  addCardErrorCode: AddCreditCardForm.ErrorCode;

  /** Whether the credit card is added successfully or not. */
  cardAdded: boolean;

  /** Whether the checkout process is completed or not. */
  checkoutCompleted: boolean;

  /** Indicates the join button is clicked. */
  onJoinEvent: () => void;

  /** Indictes a credit card in dropdown menu is clicked. */
  onCreditCardClick: () => void;

  /** Indicates the close button is clicked. */
  onClose: () => void;

  /** Indicates the Checkout button is clicked. */
  onCheckout: () => void;

  /** Indicates the Add card button is clicked. */
  onAddCard: (cardNumber: string, cardName: string, month: number, year: number,
    securityCode: string, zipcode: string) => void;

  /** Indicates the Paypal button is clicked. */
  onPaypalClick: () => void;

  /** Indicates the Google Pay button is clicked. */
  onGooglePayClick: () => void;

  /** Indicates the Apple Pay button is clicked. */
  onApplePay: () => void;
}

interface State {
  page: JoinEventModal.Page;
  errorCode: JoinEventModal.ErrorCode;
}

function getTaxAmount(fee: number, taxRate: number) {
  return (Math.ceil(fee * taxRate * 100) / 100).toFixed(2);
}

/** Displays the Join Event Modal. */
export class JoinEventModal extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      page: JoinEventModal.Page.INITIAL,
      errorCode: this.props.errorCode
    };
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
          JoinEventModal.Page.PROCESSING_PAYMENT) {
        if (this.props.errorCode === JoinEventModal.ErrorCode.PAYMENT_FAILED ||
            this.props.errorCode ===
            JoinEventModal.ErrorCode.THIRDPARTY_PAYMENT_FAILED) {
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
    const cardsOnFileSection = (() => {
      if (!this.props.paymentCardsOnFile ||
          this.props.paymentCardsOnFile.length === 0) {
        return <h3 style={NO_CARD_TITLE_STYLE} >No cards on file.</h3>;
      }
      const cardTitle = (() => {
        if (this.props.cardAdded) {
          return (
            <div style={CARD_TITLE_CONTAINER_STYLE} >
              <img
                style={ADDED_ICON_STYLE}
                src='resources/icons/added.svg'
                alt='Added Icon'
              />
              <div>Card added</div>
            </div>);
        }
        return <h3 style={CARD_ON_FILE_TITLE_STYLE} >Cards on file:</h3>;
      })();
      return (
        <React.Fragment>
          {cardTitle}
          <CreditCardDropdownMenu
            cardList={this.props.paymentCardsOnFile}
            displayedCard={this.props.displayedCard}
            onCardClick={this.props.onCreditCardClick}
          />
          <PrimaryTextButton label='Checkout' style={CHECKOUT_BUTTON_STYLE}
            onClick={this.handleCheckout}
          />
        </React.Fragment>);
    })();
    const paymentMethodSection = (
      <React.Fragment>
        {cardsOnFileSection}
        <SecondaryTextButtonWithArrow
          style={ADD_CARD_BUTTON_STYLE}
          labelStyle={ADD_CARD_BUTTON_LABEL_STYLE}
          label='Add a card'
          onClick={this.handleAddCard}
        />
        <div style={OR_LINE_CONTAINER_STYLE} >
          <div style={PARTIAL_LINE_STYLE} />
          <p style={OR_CHECKOUT_TEXT_STYLE} >or checkout with</p>
          <div style={PARTIAL_LINE_STYLE} />
        </div>
        <PayPalButton style={PAYPAL_BUTTON_STYLE}
          onClick={this.props.onPaypalClick} />
        <div style={PAY_BUTTON_CONTAINER_STYLE} >
          <ApplePayButton style={PAY_BUTTON_STYLE}
            onClick={this.props.onApplePay} />
          <GooglePayButton style={PAY_BUTTON_STYLE}
            onClick={this.props.onGooglePayClick} />
        </div>
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
      if (this.state.page === JoinEventModal.Page.PROCESSING_PAYMENT &&
          !this.props.checkoutCompleted) {
        return null;
      }
      if (this.props.checkoutCompleted && this.state.page ===
          JoinEventModal.Page.PROCESSING_PAYMENT) {
        if (this.props.errorCode === JoinEventModal.ErrorCode.PAYMENT_FAILED ||
            this.props.errorCode ===
            JoinEventModal.ErrorCode.THIRDPARTY_PAYMENT_FAILED) {
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
      if (this.state.page === JoinEventModal.Page.ADD_CARD) {
        return (
          <AddCreditCardForm
            style={EVENT_NAME_BUTTON_CONTAINER_STYLE}
            errorCode={this.props.addCardErrorCode}
            addCardErrorMessage={this.props.addCardErrorMessage}
            cardNumber={this.props.cardNumber}
            nameOnCard={this.props.nameOnCard}
            zipcode={this.props.zipcode}
            securityCode={this.props.securityCode}
            selectedMonth={this.props.selectedMonth}
            selectedYear={this.props.selectedYear}
            onAddLabel='Continue'
            onCancel={this.handleBackClick}
            onAdd={this.props.onAddCard}
          />);
      }
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
          this.state.page === JoinEventModal.Page.PROCESSING_PAYMENT) {
        if (this.props.errorCode === JoinEventModal.ErrorCode.PAYMENT_FAILED ||
            this.props.errorCode ===
            JoinEventModal.ErrorCode.THIRDPARTY_PAYMENT_FAILED) {
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
                      to='/payment_history/:user_id'
                    />
                  </div>
                </div>
              </div>
            </div>);
        }
      } else if (this.state.page === JoinEventModal.Page.PROCESSING_PAYMENT &&
          !this.props.checkoutCompleted) {
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
      <div style={containerStyle} >
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
      </div>);
  }

  private handleBackToCheckout = () => {
    this.setState({
      page: JoinEventModal.Page.INITIAL,
      errorCode: JoinEventModal.ErrorCode.NONE
    });
  }

  private handleAddCard = () => {
    this.setState({ page: JoinEventModal.Page.ADD_CARD });
  }

  private handleBackClick = () => {
    this.setState({ page: JoinEventModal.Page.INITIAL });
  }

  private handleCheckout = () => {
    this.setState({ page: JoinEventModal.Page.PROCESSING_PAYMENT });
    this.props.onCheckout();
  }
}

export namespace JoinEventModal {
  export enum Page {
    INITIAL,
    ADD_CARD,
    PROCESSING_PAYMENT
  }

  export enum ErrorCode {
    NONE,
    PAYMENT_FAILED,
    THIRDPARTY_PAYMENT_FAILED
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  position: 'relative',
  borderRadius: '4px',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  backgroundColor: '#F6F6F6',
  overflowY: 'initial'
};

const DESKTOP_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTAINER_STYLE,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '675px'
};

const TABLET_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTAINER_STYLE,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '675px'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTAINER_STYLE,
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%'
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
  borderRadius: '4px 0px 0px 4px'
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

const CARD_TITLE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '10px',
  width: '100%',
  height: '18px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '18px',
  padding: '0px',
  margin: '30px 0px 10px 0px',
  color: '#000000'
};

const CARD_ON_FILE_TITLE_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '18px',
  height: '18px',
  padding: '0px',
  margin: '30px 0px 10px 0px',
  color: '#000000'
};

const NO_CARD_TITLE_STYLE: React.CSSProperties = {
  ...CARD_ON_FILE_TITLE_STYLE,
  margin: '30px 0px 20px 0px'
};

const ADD_CARD_BUTTON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '38px'
};

const ADD_CARD_BUTTON_LABEL_STYLE: React.CSSProperties = {
  fontSize: '12px',
  lineHeight: '18px',
  height: '18px'
};

const CHECKOUT_BUTTON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '38px',
  marginTop: '20px',
  marginBottom: '20px'
};

const BACK_TO_BUTTON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '38px',
  margin: '30px 0px 0px 0px'
}

const OR_LINE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'transparent',
  width: '100%',
  color: '#969696',
  gap: '10px',
  marginTop: '30px',
  height: '18px'
};

const PARTIAL_LINE_STYLE: React.CSSProperties = {
  width: 'calc(50% - 59px)',
  height: '1px',
  backgroundColor: '#969696'
};

const OR_CHECKOUT_TEXT_STYLE: React.CSSProperties = {
  padding: '0px',
  margin: '0px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px'
};

const PAYPAL_BUTTON_STYLE: React.CSSProperties = {
  width: '100%',
  minWidth: '100%',
  height: '38px',
  minHeight: '38px',
  marginTop: '30px'
};

const PAY_BUTTON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'transparent',
  width: '100%',
  gap: '20px',
  marginTop: '20px',
  height: '38px',
  minHeight: '38px'
};

const PAY_BUTTON_STYLE: React.CSSProperties = {
  width: 'calc(50% - 10px)',
  minWidth: 'calc(50% - 10px)',
  height: '100%',
  minHeight: '100%'
};

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
