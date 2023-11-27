import * as React from 'react';
import { CreditCardType } from '../definitions';
import { PrimaryTextButton } from './text_button';

export interface AddCreditCardFormProperties {
  /** Title section of the form. */
  titleSection?: JSX.Element;

  /** Style associated with the title section. */
  titleSectionStyle?: React.CSSProperties;

  /** Label used for the Add card button. */
  onAddLabel: string;

  /** Error message regarding adding a new card. */
  addCardErrorMessage: string;

  /** The form css style. */
  style?: React.CSSProperties;

  /** Indicates the cancel button is clicked. */
  onCancel: () => void;

  /** Indicates the add button is clicked. */
  onAddCard: (cardNumber: number, cardName: string, month: number, year: number,
    securityCode: number, zipcode: string, creditCardType: CreditCardType
    ) => void;
}

/** Displays the Add Creditcard Form. */
export const AddCreditCardForm: React.FC<AddCreditCardFormProperties> = (props: AddCreditCardFormProperties) => {
  const titleSection = (props.titleSection ||
    <div
        style={{...ADD_CARD_TITLE_ROW_STYLE, ...props.titleSectionStyle}}
    >
      <img
        style={BACK_ICON_STYLE}
        src='resources/icons/back.svg'
        alt='Back Icon'
        onClick={props.onCancel}
      />
      <h1 style={ADD_CARD_HEADLINE_STYLE} >Add a card</h1>
    </div>);

  return (
    <form style={props.style} >
      {titleSection}
      <PrimaryTextButton
        type='submit'
        style={CONTINUE_BUTTON_STYLE}
        label={props.onAddLabel}
      />
    </form>);
};

const ADD_CARD_TITLE_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  height: '30px',
  backgroundColor: 'transparent',
  gap: '10px',
  marginBottom: '10px'
};

const BACK_ICON_STYLE: React.CSSProperties = {
  width: '15px',
  height: '15px',
  minWidth: '15px',
  minHeight: '15px',
  backgroundColor: 'transparent'
};

const ADD_CARD_HEADLINE_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '20px',
  lineHeight: '30px',
  color: '#000000',
  margin: '0px',
  padding: '0px'
};

const CONTINUE_BUTTON_STYLE: React.CSSProperties = {
  width: '100%',
  minWidth: '100%',
  marginTop: '7px',
  height: '38px'
};

const ERROR_MESSAGE_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  minHeight: '18px',
  color: '#FF2C79',
  padding: '0px',
  margin: '5px 0px 0px 0px',
  width: '100%'
};
