import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import { AddCreditCardForm } from '../../components';
import { CreditCardType, DisplayMode, getCreditCardTypeName, PaymentCard
} from '../../definitions';
import { CardDetailsForm } from './card_details_form';

interface Properties {
  displayMode: DisplayMode;

  /** User's list of existing cards on file other than the default card. */
  otherPaymentCards: PaymentCard[];

  /** User's default payment card. */
  defaultCard: PaymentCard;

  /** Error message regarding adding a new card. */
  addCardErrorMessage: string;

  /** Error code regarding adding a new card. */
  addCardErrorCode: AddCreditCardForm.ErrorCode;

  /** Error message regarding updating an existing card. */
  updateCardErrorMessage: string;

  /** Error code regarding updating an existing card. */
  updateCardErrorCode: CardDetailsForm.ErrorCode;

  /** Indicates the Add card button is clicked. */
  onAddCard: (cardNumber: number, cardName: string, month: number, year: number,
    securityCode: number, zipcode: string) => void;

  onMakeDefaultCard: (cardId: number) => void;

  /** Indicates the delete card button is clicked. */
  onDeleteCard: (cardId: number) => void;

  /** Indicates the card details is changed and save button is clicked. */
  onUpdateCard: (newCard: PaymentCard, isMarkedDefault: boolean) => void;
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
            <CardDetailsForm
              {...this.props}
              cardId={this.state.selectedCard.id}
              nameOnCard={this.state.selectedCard.nameOnCard}
              cardNumber={this.state.selectedCard.cardNumber}
              selectedMonth={this.state.selectedCard.month}
              selectedYear={this.state.selectedCard.year}
              securityCode={this.state.selectedCard.securityCode}
              zipcode={this.state.selectedCard.zipcode}
              creditType={this.state.selectedCard.creditType}
              errorMessage={this.props.updateCardErrorMessage}
              errorCode={this.props.updateCardErrorCode}
              onCancel={this.handleBackClick}
              isDefault={this.state.selectedCard.id ===
                this.props.defaultCard.id}
              onMakeDefault={() => this.props.onMakeDefaultCard(
                this.state.selectedCard.id)}
              onDeleteCard={() => this.props.onDeleteCard(
                this.state.selectedCard.id)}
            />
        </React.Fragment>);
    } else if (this.state.page === PaymentMethodsTab.Page.ADD_CARD) {
      const addCardContainerStyle = (this.props.displayMode ===
        DisplayMode.MOBILE && MOBILE_ADD_CARD_CONTAINER_STYLE ||
        ADD_CARD_CONTAINER_STYLE);
      return (
        <React.Fragment>
          <h1 style={PAGE_HEADING_STYLE} >Payment Methods</h1>
          <AddCreditCardForm
            {...this.props}
            style={addCardContainerStyle}
            titleSectionStyle={ADD_FORM_TITLE_STYLE}
            onAddLabel='Save'
            errorCode={this.props.addCardErrorCode}
            onAddCard={this.props.onAddCard}
            onCancel={this.handleBackClick}
          />
        </React.Fragment>);
    }
    const cardsOnFile = (() => {
      const cards = [];
      if (this.props.defaultCard && this.props.defaultCard.id !== -1) {
        cards.push(<PaymentCardRow key={this.props.defaultCard.id}
          isDefault displayMode={this.props.displayMode}
          card={this.props.defaultCard}
          onClick={() => this.handleCardClick(this.props.defaultCard)} />);
      }
      if (this.props.otherPaymentCards &&
          this.props.otherPaymentCards.length !== 0) {
        for (const card of this.props.otherPaymentCards) {
          cards.push(<PaymentCardRow key={card.id} card={card}
            displayMode={this.props.displayMode}
            onClick={() => this.handleCardClick(card)} />);
        }
      }
      cards.push(<AddCardButton key='add_card'
        displayMode={this.props.displayMode} onAddCard={this.handleAddCard} />);
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
  displayMode: DisplayMode;
  onAddCard: () => void;
}

function AddCardButton(props: AddCardProps) {
  const cardButtonStyle = (props.displayMode === DisplayMode.MOBILE &&
    MOBILE_CARD_BUTTON_STYLE || CARD_BUTTON_STYLE);
  return (
    <button
        style={cardButtonStyle}
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
  displayMode: DisplayMode;
  isDefault?: boolean;
  onClick: () => void;
}

function PaymentCardRow(props: PaymentCardRowProps) {
  const expiringSoon = (() => {
    const currentDate = new Date();
    const expDate = new Date(props.card.year, props.card.month, 1);
    const diffTime = expDate.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 1) {
      return (
        <div style={EXPIRE_ROW_CONTAINER} >
          <img
            style={WARNING_ICON_STYLE}
            src='resources/icons/red_warning.svg'
            alt='Expired icon'
          />
          <p style={EXPIRED_TEXT_STYLE} >Information may be outdated</p>
        </div>);
    }
    if (diffDays < 30) {
      return (
        <div style={EXPIRE_ROW_CONTAINER} >
         <img
            style={WARNING_ICON_STYLE}
            src='resources/icons/yellow_warning.svg'
            alt='Expired icon'
          />
          <p style={EXPIRING_SOON_TEXT_STYLE} >Expiring soon</p>
        </div>);
    }
    return null;
  })();
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
  const cardButtonStyle = (props.displayMode === DisplayMode.MOBILE &&
    MOBILE_CARD_BUTTON_STYLE || CARD_BUTTON_STYLE);
  return (
    <button
        style={cardButtonStyle}
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
          Card ending in {props.card.cardNumber.toString().slice(-4)}
        </p>
        {expiringSoon}
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
  gap: '30px',
  width: '100%'
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

const MOBILE_CARD_BUTTON_STYLE: React.CSSProperties = {
  ...CARD_BUTTON_STYLE,
  width: '100%'
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

const MOBILE_ADD_CARD_CONTAINER_STYLE: React.CSSProperties = {
  ...ADD_CARD_CONTAINER_STYLE,
  width: '100%'
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

const EXPIRE_ROW_CONTAINER: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '13px',
  width: '100%',
  gap: '5px'
};

const WARNING_ICON_STYLE: React.CSSProperties = {
  width: '10px',
  minWidth: '10px',
  height: '9px',
  minHeight: '9px',
  backgroundColor: 'transparent'
};

const EXPIRED_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '10px',
  lineHeight: '13px',
  color: '#DE6956',
  padding: '0px',
  margin: '0px'
};

const EXPIRING_SOON_TEXT_STYLE: React.CSSProperties = {
  ...EXPIRED_TEXT_STYLE,
  color: '#C7943D'
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
