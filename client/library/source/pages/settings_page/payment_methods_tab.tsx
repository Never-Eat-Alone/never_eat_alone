import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import { AddCreditCardForm } from '../../components';
import { CreditCardType, DisplayMode, getCreditCardTypeName, PaymentCard
} from '../../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** User's list of existing cards on file other than the default card. */
  otherPaymentCards: PaymentCard[];

  /** User's default payment card. */
  defaultCard: PaymentCard;

  cardNumber: number;
  nameOnCard: string;
  selectedMonth: number;
  selectedYear: number;
  securityCode: number;
  zipcode: string;
  addCardErrorMessage: string;
  addCardErrorCode: AddCreditCardForm.ErrorCode;

  /** Indicates the Add card button is clicked. */
  onAdd: () => void;

  /** Indicates the delete card button is clicked. */
  onDeleteCard: (card: PaymentCard) => void;
}

interface State {
  selectedCard: PaymentCard;
  page: PaymentMethodsTab.Page;
}

/** Displays the payment methods tab. */
export class PaymentMethodsTab extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      selectedCard: PaymentCard.noCard(),
      page: PaymentMethodsTab.Page.INITIAL
    };
  }

  public render(): JSX.Element {
    if (this.state.page === PaymentMethodsTab.Page.CARD_DETAILS) {
      const cardSrc = (() => {
        if (this.state.selectedCard.creditType === CreditCardType.VISA) {
          return 'resources/icons/super_big_visa.svg';
        }
        if (this.state.selectedCard.creditType === CreditCardType.AMEX) {
          return 'resources/icons/super_big_amex.svg';
        }
        if (this.state.selectedCard.creditType === CreditCardType.MASTERCARD) {
          return 'resources/icons/super_big_mastercard.svg';
        }
        return '';
      })();
      const isDefault = (this.state.selectedCard.id ===
        this.props.defaultCard.id &&
        <div style={IS_DEFAULT_CONTAINER_STYLE} >
          <img
            style={GREY_MARK_ICON_STYLE}
            src='resources/icons/grey_mark.svg'
            alt='Check Mark'
          />
          <p style={IS_DEFAULT_TEXT_STYLE} >Your default card</p>
        </div> || null);
      return (
        <React.Fragment>
          <h1 style={PAGE_HEADING_STYLE} >Payment Methods</h1>
          <div style={CARD_DETAILS_CONTAINER_STYLE} >
            <div style={ROW_CONTAINER_STYLE} >
              <img
                style={BACK_ICON_STYLE}
                src='resources/icons/back.svg'
                alt='Back Icon'
                onClick={this.handleBackClick}
              />
              <h2 style={CARD_DETAILS_HEADING_STYLE} >Card Details</h2>
            </div>
            <div style={DELETE_CARD_ROW_CONTAINER_STYLE} >
              <img
                style={SUPER_BIG_CARD_IMAGE_STYLE}
                src={cardSrc}
                alt='Card Image'
              />
              <div style={COLUMN_CONTAINER_STYLE} >
                <p style={CARD_ENDING_TEXT_STYLE} >
                  {getCreditCardTypeName(this.state.selectedCard.creditType)}
                  &nbsp;card ending in {this.state.selectedCard.cardNumber
                    .toString().slice(-4)}
                </p>
                <div style={DEFAULT_DELETE_ROW_STYLE} >
                  {isDefault}
                  <div
                      style={DELETE_BUTTON_STYLE}
                      onClick={() => this.props.onDeleteCard(
                        this.state.selectedCard)}
                  >
                    <img
                      style={CROSS_ICON_STYLE}
                      src='resources/icons/red_cross.svg'
                      alt='Cross Icon'
                    />
                    <p style={DELETE_TEXT_STYLE} >Delete</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>);
    } else if (this.state.page === PaymentMethodsTab.Page.ADD_CARD) {
      return (
        <React.Fragment>
          <h1 style={PAGE_HEADING_STYLE} >Payment Methods</h1>
          <AddCreditCardForm
            {...this.props}
            style={ADD_CARD_CONTAINER_STYLE}
            titleSectionStyle={ADD_FORM_TITLE_STYLE}
            onAddLabel='Save'
            errorCode={this.props.addCardErrorCode}
            onCancel={this.handleBackClick}
          />
        </React.Fragment>);
    }
    const cardsOnFile = (() => {
      const cards = [];
      if (this.props.defaultCard && this.props.defaultCard.id !== -1) {
        cards.push(<PaymentCardRow key={this.props.defaultCard.id} isDefault
          card={this.props.defaultCard}
          onClick={() => this.handleCardClick(this.props.defaultCard)} />);
      }
      if (this.props.otherPaymentCards &&
          this.props.otherPaymentCards.length !== 0) {
        for (const card of this.props.otherPaymentCards) {
          cards.push(<PaymentCardRow key={card.id} card={card}
            onClick={() => this.handleCardClick(card)} />);
        }
      }
      cards.push(<AddCardButton key='add_card' onAddCard={this.handleAddCard}
        />);
      return (
        <div style={COLUMN_STYLE} >
          {cards}
        </div>);
    })();
    return (
      <React.Fragment>
        <h1 style={INITIAL_PAGE_HEADING_STYLE} >Payment Methods</h1>
        {cardsOnFile}
      </React.Fragment>);
  }

  private handleCardClick = (card: PaymentCard) => {
    this.setState({
      selectedCard: card,
      page: PaymentMethodsTab.Page.CARD_DETAILS
    });
  }

  private handleBackClick = () => {
    this.setState({ page: PaymentMethodsTab.Page.INITIAL });
  }

  private handleAddCard = () => {
    this.setState({ page: PaymentMethodsTab.Page.ADD_CARD });
  }
}

interface AddCardProps {
  onAddCard: () => void;
}

function AddCardButton(props: AddCardProps) {
  return (
    <button
        style={CARD_BUTTON_STYLE}
        className={css(styles.cardButton)}
        onClick={props.onAddCard}
    >
      <div style={RECTANGLE_CONTAINER_STYLE} >
        <img
          style={PLUS_ICON_STYLE}
          src='resources/icons/plus_grey.svg'
          alt='Add Icon'
        />
      </div>
      <p style={ADD_CARD_TEXT_STYLE} >Add a payment method</p>
      <img
        style={ARROW_ICON_STYLE}
        src='resources/icons/arrow_grey.svg' 
        alt='Arrow Icon'
      />
    </button>);
}

interface PaymentCardRowProps {
  card: PaymentCard;
  isDefault?: boolean;
  onClick: () => void;
}

function PaymentCardRow(props: PaymentCardRowProps) {
  const cardSrc = (() => {
    switch (props.card.creditType) {
      case CreditCardType.VISA:
        return 'resources/icons/visa_big.svg';
      case CreditCardType.MASTERCARD:
        return 'resources/icons/mastercard_big.svg';
      case CreditCardType.AMEX:
        return 'resources/icons/amex_big.svg';
      default:
        return '';
    }
  })();
  const defaultSign = (props.isDefault &&
    <div style={DEFAULT_SIGN_CONTAINER_STYLE} >
      <p style={DEFAULT_TEXT_STYLE} >Default</p>
    </div> || null);
  return (
    <button
        style={CARD_BUTTON_STYLE}
        className={css(styles.cardButton)}
        onClick={props.onClick}
    >
      {defaultSign}
      <div style={RECTANGLE_CONTAINER_STYLE} >
        <img
          style={CREDIT_ICON_STYLE}
          src={cardSrc}
          alt='Add Icon'
        />
      </div>
      <div style={CARD_INFO_COLUMN_STYLE} >
        <p style={CARD_TYPE_TEXT_STYLE} >
          {getCreditCardTypeName(props.card.creditType)}
        </p>
        <p style={CARD_TEXT_STYLE} >
          Cards ending in {props.card.cardNumber.toString().slice(-4)}
        </p>
      </div>
      <img
        style={ARROW_ICON_STYLE}
        src='resources/icons/arrow_grey.svg' 
        alt='Arrow Icon'
      />
    </button>);
}

export namespace PaymentMethodsTab {
  export enum Page {
    INITIAL,
    ADD_CARD,
    CARD_DETAILS
  }
}

const PAGE_HEADING_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '23px',
  lineHeight: '34px',
  height: '34px',
  textTransform: 'capitalize',
  color: '#000000',
  margin: '0px',
  padding: '0px'
};

const INITIAL_PAGE_HEADING_STYLE: React.CSSProperties = {
  ...PAGE_HEADING_STYLE,
  margin: '0px 0px 30px 0px'
};

const COLUMN_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '30px'
};

const CARD_BUTTON_STYLE: React.CSSProperties = {
  position: 'relative',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '83px',
  minHeight: '83px',
  width: '335px',
  minWidth: '335px',
  backgroundColor: '#FFFFFF',
  padding: '20px',
  border: '1px solid #CCCCCC',
  boxShadow: 'none',
  borderRadius: '4px',
  outline: 'none'
};

const RECTANGLE_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  border: '2px solid #969696',
  borderRadius: '4px',
  width: '64px',
  height: '43px'
};

const PLUS_ICON_STYLE: React.CSSProperties = {
  width: '20px',
  height: '20px',
  backgroundColor: 'transparent'
};

const ADD_CARD_TEXT_STYLE: React.CSSProperties = {
  height: '18px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000'
};

const ARROW_ICON_STYLE: React.CSSProperties = {
  width: '9px',
  minWidth: '9px',
  height: '15px',
  minHeight: '15px',
  backgroundColor: 'transparent'
};

const ADD_FORM_TITLE_STYLE: React.CSSProperties = {
  height: '34px',
  marginBottom: '23px'
};

const ADD_CARD_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  padding: '20px',
  marginTop: '20px',
  width: '375px',
  backgroundColor: '#FFFFFF'
};

const CARD_DETAILS_CONTAINER_STYLE: React.CSSProperties = {
  ...ADD_CARD_CONTAINER_STYLE,
  width: '395px'
};

const CARD_INFO_COLUMN_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  height: '100%',
  width: '154px',
  gap: '2px'
};

const CREDIT_ICON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minWidth: '64px',
  minHeight: '43px',
  borderRadius: '4px'
};

const CARD_TYPE_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '18px',
  height: '18px',
  color: '#000000',
  margin: '0px',
  padding: '0px'
};

const CARD_TEXT_STYLE: React.CSSProperties = {
  ...CARD_TYPE_TEXT_STYLE,
  fontWeight: 400
};

const DEFAULT_SIGN_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '5px 10px',
  position: 'absolute',
  width: '58px',
  height: '28px',
  left: '-1px',
  top: '-1px',
  background: '#F26B55',
  borderRadius: '4px 0px'
};

const DEFAULT_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '18px',
  color: '#FFFFFF',
  margin: '0px',
  padding: '0px'
};

const ROW_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  gap: '10px'
};

const BACK_ICON_STYLE: React.CSSProperties = {
  width: '15px',
  height: '15px',
  minWidth: '15px',
  minHeight: '15px',
  backgroundColor: 'transparent'
};

const CARD_DETAILS_HEADING_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '23px',
  lineHeight: '34px',
  textTransform: 'uppercase',
  color: '#969696',
  padding: '0px',
  margin: '0px'
};

const DELETE_CARD_ROW_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '90px',
  width: '100%',
  marginTop: '30px'
};

const DEFAULT_DELETE_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '18px',
  width: '100%',
  gap: '10px'
};

const DELETE_BUTTON_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '10px',
  height: '100%'
};

const CROSS_ICON_STYLE: React.CSSProperties = {
  backgroundColor: 'transparent',
  width: '12px',
  height: '12px',
  minWidth: '12px',
  minHeight: '12px'
};

const DELETE_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#F26B55'
};

const SUPER_BIG_CARD_IMAGE_STYLE: React.CSSProperties = {
  minHeight: '90px',
  height: '100%',
  width: '133px',
  borderRadius: '4px'
};

const COLUMN_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: '20px 0px 20px 20px',
  height: '100%',
  width: 'calc(100% - 133px)',
  gap: '10px'
};

const CARD_ENDING_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  width: '100%',
  whiteSpace: 'pre'
};

const IS_DEFAULT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '100%',
  gap: '10px'
};

const GREY_MARK_ICON_STYLE: React.CSSProperties = {
  width: '12px',
  minWidth: '12px',
  height: '10px',
  minHeight: '10px',
  backgroundColor: 'transparent'
};

const IS_DEFAULT_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  height: '100%',
  color: '#969696'
};

const styles = StyleSheet.create({
  cardButton: {
    ':hover': {
      boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)'
    },
    ':focus': {
      boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)'
    },
    ':focus-within': {
      boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)'
    }
  }
});
