import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import { PaymentCardInputField, SecurityCodeInputField } from '../../components';
import { DisplayMode, PaymentCard } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** User's list of existing cards on file other than the default card. */
  otherPaymentCards: PaymentCard[];

  /** User's default payment card. */
  defaultCard: PaymentCard;

  /** Indicates the Add card button is clicked. */
  onAddCardClick: () => void;
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
        <div>Card Details</div>);
    } else if (this.state.page === PaymentMethodsTab.Page.ADD_CARD) {
      return (
        <div style={ADD_CARD_CONTAINER_STYLE} >
          <h2 style={ADD_CARD_TITLE_STYLE} >Add a card</h2>
          <h3 style={FIELD_TEXT_STYLE} >Card number</h3>
          <PaymentCardInputField style={INPUT_FIELD_STYLE} />
          <h3 style={FIELD_TEXT_STYLE} >Name on card</h3>
          <h3 style={FIELD_TEXT_STYLE} >Expiration date</h3>
          <h3 style={FIELD_TEXT_STYLE} >Security code</h3>
          <SecurityCodeInputField style={SMALL_INPUT_FIELD_STYLE} />
          <h3 style={FIELD_TEXT_STYLE} >Postal code/ZIP</h3>
        </div>);
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
        <h1 style={PAGE_HEADING_STYLE} >Payment Methods</h1>
        {cardsOnFile}
      </React.Fragment>);
  }

  private handleCardClick = (card: PaymentCard) => {
    this.setState({
      selectedCard: card,
      page: PaymentMethodsTab.Page.CARD_DETAILS
    });
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
        style={ADD_CARD_BUTTON_STYLE}
        onClick={props.onAddCard}
        className={css(styles.addCardButton)}
    >
      <div style={PLUS_CONTAINER_STYLE} >
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
  return (
    <button style={CARD_ROW_STYLE} onClick={props.onClick} >
      
      <div>
        <p>{props.card.creditType}</p>
        <p>Cards ending in {props.card.last4Digits.toString()}</p>
      </div>
     
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
  margin: '0px 0px 30px 0px',
  padding: '0px'
};

const COLUMN_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-stat',
  gap: '30px'
};

const ADD_CARD_BUTTON_STYLE: React.CSSProperties = {

};

const PLUS_CONTAINER_STYLE: React.CSSProperties = {

};

const PLUS_ICON_STYLE: React.CSSProperties = {

};

const ADD_CARD_TEXT_STYLE: React.CSSProperties = {

};

const ARROW_ICON_STYLE: React.CSSProperties = {

};

const CARD_ROW_STYLE: React.CSSProperties = {

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

const ADD_CARD_TITLE_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '23px',
  lineHeight: '34px',
  textTransform: 'uppercase',
  color: '#969696',
  margin: '0px 0px 30px 0px',
  width: '100%',
  padding: '0px'
};

const FIELD_TEXT_STYLE: React.CSSProperties = {
  height: '18px',
  width: '100%',
  padding: '0px',
  margin: '0px 0px 10px 0px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000'
};

const INPUT_FIELD_STYLE: React.CSSProperties = {
  height: '38px',
  width: '100%',
  marginBottom: '30px'
};

const SMALL_INPUT_FIELD_STYLE: React.CSSProperties = {
  height: '38px',
  width: '150px',
  marginBottom: '30px'
};

const styles = StyleSheet.create({
  addCardButton: {

  }
});
