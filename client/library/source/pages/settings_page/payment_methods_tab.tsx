import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import { AddCreditCardForm } from '../../components';
import { DisplayMode, getCreditCardTypeName, PaymentCard, CreditCardType
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
      return (
        <React.Fragment>
          <h1 style={PAGE_HEADING_STYLE} >Payment Methods</h1>
          <div>Card Details</div>
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
            onCancel={this.handleBack}
          />
        </React.Fragment>);
    }
    const cardsOnFile = (() => {
      const cards = [];
      if (this.props.defaultCard && this.props.defaultCard.id !== -1) {
        cards.push(<PaymentCardRow key={this.props.defaultCard.id}
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

  private handleBack = () => {
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
  return (
    <button
        style={CARD_BUTTON_STYLE}
        className={css(styles.cardButton)}
        onClick={props.onClick}
    >
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
