import { format } from 'date-fns';
import * as React from 'react';
import { CloseButton, CreditCardDropdownMenu, PrimaryTextButton,
  SecondaryTextButtonWithArrow } from '../components';
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

  /** Indicates the join button is clicked. */
  onJoinEvent: () => void;

  onCreditCardClick: () => void;

  /** Indicates the close button is clicked. */
  onClose: () => void;

  /** Indicates the Checkout button is clicked. */
  onCheckout: () => void;

  /** Indicates the Add card button is clicked. */
  onAddCard: () => void;

  /** Indicates the Paypal button is clicked. */
  onPaypalClick: () => void;

  /** Indicates the Google Pay button is clicked. */
  onGooglePayClick: () => void;

  /** Indicates the Apple Pay button is clicked. */
  onApplePay: () => void;
}

function getTaxAmount(fee: number, taxRate: number) {
  return fee * taxRate;
}

/** Displays the Join Event Modal. */
export class JoinEventModal extends React.Component<Properties> {
  public render(): JSX.Element {
    const { containerStyle, eventNameButtonContainerStyle,
        costDetailsContainerStyle } = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          containerStyle: DESKTOP_CONTAINER_STYLE,
          eventNameButtonContainerStyle: EVENT_NAME_BUTTON_CONTAINER_STYLE,
          costDetailsContainerStyle: COST_DETAILS_CONTAINER_STYLE
        };
      }
      if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerStyle: TABLET_CONTAINER_STYLE,
          eventNameButtonContainerStyle: EVENT_NAME_BUTTON_CONTAINER_STYLE,
          costDetailsContainerStyle: COST_DETAILS_CONTAINER_STYLE
        };
      }
      return {
        containerStyle: MOBILE_CONTAINER_STYLE,
        eventNameButtonContainerStyle: MOBILE_EVENT_NAME_BUTTON_CONTAINER_STYLE,
        costDetailsContainerStyle: MOBILE_COST_DETAILS_CONTAINER_STYLE
      };
    })();
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
      return null;
    })();
    const cardsOnFileSection = (() => {
      if (!this.props.paymentCardsOnFile ||
          this.props.paymentCardsOnFile.length === 0) {
        return (
          <React.Fragment>
            <h3 style={CARD_ON_FILE_TITLE_STYLE} >No cards on file.</h3>
            <SecondaryTextButtonWithArrow
              style={ADD_CARD_BUTTON_STYLE}
              labelStyle={ADD_CARD_BUTTON_LABEL_STYLE}
              label='Add a card'
            />
          </React.Fragment>);
      }
      return (
        <React.Fragment>
          <h3 style={CARD_ON_FILE_TITLE_STYLE} >Cards on file:</h3>
          <CreditCardDropdownMenu
            cardList={this.props.paymentCardsOnFile}
            displayedCard={this.props.displayedCard}
            onCardClick={this.props.onCreditCardClick}
          />
        </React.Fragment>);
    })();
    const eventNameButtonSection = (
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
    const costDetailsSection = (
      <div style={costDetailsContainerStyle} >
        <h2 style={CHECKOUT_TITLE_STYLE} >Event Checkout</h2>
        <div style={DIVIDER_STYLE} />
        <div style={COST_BREAKDOWN_TOTAL_CONTAINER_STYLE} >
          <div style={COLUMN_CONTAINER_STYLE} >
            <div style={EVENT_FEE_ROW_STYLE} >
              <div style={EVENT_FEE_BOLD_TEXT_STYLE} >Event Fee</div>
              <div style={EVENT_PRICE_STYLE} >
                CAD ${this.props.eventFee.toString()}
              </div>
            </div>
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
                CAD ${getTaxAmount(this.props.eventFee,
                this.props.taxRate).toString()}
              </div>
            </div>
            <div style={EVENT_FEE_ROW_STYLE} >
              <div style={EVENT_FEE_BOLD_TEXT_STYLE} >Total Payment</div>
              <div style={EVENT_PRICE_STYLE} >
                CAD ${(getTaxAmount(this.props.eventFee,
                  this.props.taxRate) + this.props.eventFee).toString()}
              </div>
            </div>
          </div>
        </div>
      </div>);
    if (this.props.displayMode === DisplayMode.MOBILE) {
      return (
        <div style={containerStyle} >
          <CloseButton
            style={CLOSE_BUTTON_STYLE}
            displayMode={DisplayMode.MOBILE}
            onClick={this.props.onClose}
          />
          <img
            style={{...IMAGE_STYLE,
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
}

const CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  position: 'relative',
  overflow: 'hidden',
  borderRadius: '4px',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)'
};

const DESKTOP_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTAINER_STYLE,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '675px',
  height: '410px'
};

const TABLET_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTAINER_STYLE,
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '675px',
  height: '410px'
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
  width: '375px',
  height: '100%',
  padding: '40px 20px'
};

const MOBILE_COST_DETAILS_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  backgroundColor: '#FFFFFF',
  width: '100%',
  padding: '20px'
};

const COST_BREAKDOWN_TOTAL_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  width: '100%',
  height: 'calc(100% - 40px)'
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
  overflow: 'hidden'
};

const EVENT_NAME_BUTTON_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  width: '100%',
  height: 'calc(100% - 150px)',
  padding: '20px 20px 40px 20px',
  backgroundColor: '#F6F6F6'
};

const MOBILE_EVENT_NAME_BUTTON_CONTAINER_STYLE: React.CSSProperties = {
  ...EVENT_NAME_BUTTON_CONTAINER_STYLE,
  height: 'fit-content'
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
  marginTop: '30px'
};

const JOIN_BUTTON_TEXT_STYLE: React.CSSProperties = {
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px',
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
  height: '20px',
  padding: '0px',
  margin: '30px 0px 0px 0px',
  color: '#000000'
};

const ADD_CARD_BUTTON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '38px',
  marginTop: '20px'
};

const ADD_CARD_BUTTON_LABEL_STYLE: React.CSSProperties = {
  fontSize: '12px',
  lineHeight: '18px',
  height: '18px'
};
