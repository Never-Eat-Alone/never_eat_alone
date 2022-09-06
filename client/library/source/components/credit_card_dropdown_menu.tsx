import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import { CreditCardType, PaymentCard } from '../definitions';

/** Describes the credit card drop down menu properties. */
interface Properties {
  /** List of the cards on file. */
  cardList: PaymentCard[];

  /** Displayed card on the dropdown menu as the selected card. */
  displayedCard: PaymentCard;

  /** Style that is applied to the container. */
  style?: React.CSSProperties;

  /** Indicates a card from the menu is clicked. */
  onCardClick: (card: PaymentCard) => void;
}

interface State {
  isDisplayed: boolean;
}

/** Implements the credit card dropdown menu component. */
export class CreditCardDropdownMenu extends React.Component<Properties,
    State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isDisplayed: false
    }
    this._dropDownRef = React.createRef<HTMLDivElement>();
  }

  public render(): JSX.Element {
    const dropDownMenu = (() => {
      if (this.state.isDisplayed) {
        const cards = [];
        for (let i = 0; i < this.props.cardList.length; i++) {
          cards.push(
            <CardInfo
              style={MENU_ITEM_STYLE}
              key={this.props.cardList[i].id}
              className={css(styles.menuItem)}
              paymentCard={this.props.cardList[i]}
              onClick={() => this.props.onCardClick(this.props.cardList[i])}
            />);
        }
        return (
          <div style={MENU_CONTAINER_STYLE} >
            {cards}
          </div>);
      }
      return null;
    })();
    return (
      <div
          style={{...CONTAINER_STYLE, ...this.props.style}}
          ref={this._dropDownRef}
          className={css(styles.container)}
      >
        <div
            style={DISPLAYED_CARD_STYLE}
            onClick={this.handleDropDownClick}
        >
          <CardInfo paymentCard={this.props.displayedCard} />
          <div style={VECTOR_CONTAINER_STYLE} >
            <img
              style={VECTOR_ICON_STYLE}
              src={'resources/icons/vector_orange.svg'}
              alt='Vector Icon'
            />
          </div>
        </div>
        {dropDownMenu}
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
    if (this.state.isDisplayed &&
        !this._dropDownRef.current.contains(event.target as Node)) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({
        isDisplayed: false
      });
    }
  }

  private handleDropDownClick = () => {
    this.setState((state) => {
      return { isDisplayed: !state.isDisplayed };
    });
  }

  private _dropDownRef: React.RefObject<HTMLDivElement>;
}

interface CardInfoProperties extends React.HTMLAttributes<HTMLDivElement> {
  paymentCard: PaymentCard;
}

export function CardInfo(props: CardInfoProperties) {
  const cardIcon = (() => {
    switch (props.paymentCard.creditType) {
      case CreditCardType.VISA:
        return (
          <img
            style={CARD_TYPE_ICON_STYLE}
            src={'resources/icons/visa.svg'}
            alt='Visa Icon'
          />);
      case CreditCardType.AMEX:
        return (
          <img
            style={CARD_TYPE_ICON_STYLE}
            src={'resources/icons/amex.svg'}
            alt='Amex Icon'
          />);
      case CreditCardType.MASTERCARD:
        return (
          <img
            style={CARD_TYPE_ICON_STYLE}
            src={'resources/icons/mastercard.svg'}
            alt='Mastercard Icon'
          />);
    }
  })();
  return (
    <div {...props} style={{...ICON_TEXT_CONTAINER_STYLE, ...props.style}} >
      <div style={ICON_CONTAINER_STYLE} >{cardIcon}</div>
      <div style={TEXT_STYLE} >
        ending in&nbsp;
        {props.paymentCard.last4Digits.toString()}
      </div>
    </div>);
}

const CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  outline: 'none',
  cursor: 'pointer',
  border: '1px solid #CCCCCC',
  backgroundColor: '#FFFFFF',
  borderRadius: '4px',
  overflow: 'hidden'
};

const MENU_CONTAINER_STYLE: React.CSSProperties = {
  zIndex: 13,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  borderTop: '1px solid #969696',
  top: '38px',
  left: '0px',
  overflowY: 'auto'
};

const MENU_ITEM_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '37px',
  minHeight: '37px',
  width: '100%',
  cursor: 'pointer',
  padding: '0px 12px 0px 9px',
  backgroundColor: '#FFFFFF'
};

const DISPLAYED_CARD_STYLE: React.CSSProperties = {
  ...MENU_ITEM_STYLE,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const ICON_TEXT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '100%'
};

const ICON_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '27px',
  height: '18px',
  marginRight: '10px',
  backgroundColor: 'transparent',
  borderRadius: '4px',
  overflow: 'hidden'
};

const CARD_TYPE_ICON_STYLE: React.CSSProperties = {
  minWidth: '27px',
  minHeight: '18px',
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};

const TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000'
};

const VECTOR_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '14px',
  height: '7px',
  marginLeft: '13px'
};

const VECTOR_ICON_STYLE: React.CSSProperties = {
  minWidth: '14px',
  minHeight: '7px',
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent'
};

const styles = StyleSheet.create({
  container: {
    ':hover': {
      border: '1px solid #969696'
    },
    ':focus': {
      border: '1px solid #969696'
    },
    ':focus-within': {
      border: '1px solid #969696'
    },
    ':active': {
      border: '1px solid #969696'
    }
  },
  menuItem: {
    ':hover': {
      backgroundColor: '#F6F6F6'
    },
    ':focus': {
      backgroundColor: '#F6F6F6'
    },
    ':focus-within': {
      backgroundColor: '#F6F6F6'
    },
    ':active': {
      backgroundColor: '#F6F6F6'
    }
  }
});
