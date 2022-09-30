import * as React from 'react';
import { InputField, PaymentCardInputField, SecurityCodeInputField
} from './input_field';
import { NumberedDropdownMenu } from './numbered_dropdown_menu';
import { PrimaryTextButton } from './text_button';


interface Properties {
  /** The title section of the form. */
  titleSection?: JSX.Element;

  titleSectionStyle?: React.CSSProperties;

  /** Card number. */
  cardNumber: number;

  /** Name on card. */
  nameOnCard: string;

  /** Expiration month. */
  selectedMonth: number;

  /** Expiration year. */
  selectedYear: number;

  /** Securitycode associated with the card. */
  securityCode: number;

  /** Zipcode/postal code associated with the card. */
  zipcode: string;

  /** The label used for the Add card button. */
  onAddLabel: string;

  addCardErrorMessage: string;

  errorCode: AddCreditCardForm.ErrorCode;

  /** The form css style. */
  style?: React.CSSProperties;

  /** Indicates the cancel button is clicked. */
  onCancel: () => void;

  /** Indicates the add button is clicked. */
  onAdd: (cardNumber: number, cardName: string, month: number, year: number,
    securityCode: number, zipcode: string) => void;
}

interface State {
  cardNumber: number;
  nameOnCard: string;
  selectedMonth: number;
  selectedYear: number;
  securityCode: number;
  zipcode: string;
  isCardNumberInvalid: boolean;
  isNameOnCardInvalid: boolean;
  isSecurityCodeInvalid: boolean;
  isZipcodeInvalid: boolean;
  addCardInputHasChanged: boolean;
  errorCode: AddCreditCardForm.ErrorCode;
}

/** Displays the Add Creditcard Form. */
export class AddCreditCardForm extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      cardNumber: this.props.cardNumber,
      nameOnCard: this.props.nameOnCard,
      selectedMonth: this.props.selectedMonth,
      selectedYear: this.props.selectedYear,
      securityCode: this.props.securityCode,
      zipcode: this.props.zipcode,
      isNameOnCardInvalid: false,
      isCardNumberInvalid: false,
      isSecurityCodeInvalid: false,
      isZipcodeInvalid: false,
      addCardInputHasChanged: false,
      errorCode: this.props.errorCode
    };
  }

  public render(): JSX.Element {
    const titleSection = (this.props.titleSection ||
      <div
          style={{...ADD_CARD_TITLE_ROW_STYLE, ...this.props.titleSectionStyle}}
      >
        <img
          style={ADD_ICON_STYLE}
          src='resources/icons/add_card.svg'
          alt='Add Icon'
          onClick={this.props.onCancel}
        />
        <h1 style={ADD_CARD_HEADLINE_STYLE} >Add a card</h1>
      </div>);
    const currentYear = new Date().getFullYear();
    const addCardErrorMessage = (() => {
      if (this.props.addCardErrorMessage) {
        return this.props.addCardErrorMessage;
      }
      if (this.state.isZipcodeInvalid) {
        return 'Please enter a valid postal code.';
      }
      return '';
    })();
    const nameOnCardErrorMessage = (() => {
      if (!this.state.addCardInputHasChanged) {
        return '';
      }
      if (this.state.isNameOnCardInvalid) {
        return 'Please enter a valid fullname.';
      }
      return '';
    })();
    const cardNumberErrorMessage = (() => {
      if (!this.state.addCardInputHasChanged) {
        return '';
      }
      if (this.state.isCardNumberInvalid) {
        return 'Please enter a valid card number.';
      }
      return '';
    })();
    const securityCodeErrorMessage = (() => {
      if (!this.state.addCardInputHasChanged) {
        return '';
      }
      if (this.state.isSecurityCodeInvalid) {
        return 'Please enter a valid security code.';
      }
      return '';
    })();
    const isContinueAddCardDisabled = (() => {
      if (!this.state.cardNumber || this.state.nameOnCard.length === 0 ||
          !this.state.securityCode || this.state.zipcode.length === 0) {
        return true;
      }
      if (this.state.addCardInputHasChanged) {
        return false;
      }
      if (this.state.errorCode !== AddCreditCardForm.ErrorCode.NONE) {
        return true;
      }
      return false;
    })();
    return (
      <form style={this.props.style} >
        {titleSection}
        <p style={ADD_FIELD_TEXT_STYLE} >Card number</p>
        <PaymentCardInputField
          style={PAYMENT_CARD_INPUT_STYLE}
          name='card number'
          inputMode='numeric'
          value={this.state.cardNumber}
          pattern='\d*'
          required
          onChange={this.handleOnCardNumberChange}
          onInvalid={() => this.handleInvalidInput('card number')}
          hasError={this.state.isCardNumberInvalid &&
            this.state.addCardInputHasChanged}
        />
        <div style={ERROR_MESSAGE_STYLE}>{cardNumberErrorMessage}</div>
        <p style={ADD_FIELD_TEXT_STYLE} >Name on card</p>
        <InputField
          style={PAYMENT_CARD_INPUT_STYLE}
          name='name on card'
          pattern='^[A-Za-z]([A-Za-z]*([ ]{1})+[A-Za-z]*)+[A-Za-z]$'
          value={this.state.nameOnCard}
          required
          onChange={this.handleOnNameChange}
          onInvalid={() => this.handleInvalidInput('name on card')}
          hasError={this.state.isNameOnCardInvalid &&
            this.state.addCardInputHasChanged}
        />
        <div style={ERROR_MESSAGE_STYLE}>{nameOnCardErrorMessage}</div>
        <p style={ADD_FIELD_TEXT_STYLE} >Expiration date</p>
        <div style={MONTH_YEAR_CONTAINER_STYLE} >
          <NumberedDropdownMenu
            style={NUMBER_DROPDOWN_STYLE}
            values={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
            displayedValue={this.state.selectedMonth}
            onMenuItemClick={this.handleOnMonthClick}
          />
          <NumberedDropdownMenu
            values={[currentYear, currentYear + 1, currentYear + 2,
              currentYear + 3, currentYear + 4, currentYear + 5,
              currentYear + 6, currentYear + 7, currentYear + 8,
              currentYear + 9, currentYear + 10]}
            style={NUMBER_DROPDOWN_STYLE}
            displayedValue={this.state.selectedYear}
            onMenuItemClick={this.handleOnYearClick}
          />
        </div>
        <p style={ADD_FIELD_TEXT_STYLE} >Security code</p>
        <SecurityCodeInputField
          style={CODE_INPUT_STYLE}
          name='security code'
          inputMode='numeric'
          pattern='\d{3}\d?'
          value={this.state.securityCode}
          onChange={this.handleOnSecurityCodeChange}
          required
          onInvalid={() => this.handleInvalidInput('security code')}
          hasError={this.state.isSecurityCodeInvalid &&
            this.state.addCardInputHasChanged}
        />
        <div style={ERROR_MESSAGE_STYLE}>{securityCodeErrorMessage}</div>
        <p style={ADD_FIELD_TEXT_STYLE} >Zip/Postal code</p>
        <InputField
          style={CODE_INPUT_STYLE}
          name='zipcode'
          pattern='^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$'
          value={this.state.zipcode}
          onChange={this.handleOnZipCodeChange}
          required
          onInvalid={() => this.handleInvalidInput('zipcode')}
          hasError={this.state.isZipcodeInvalid &&
            this.state.addCardInputHasChanged}
        />
        <p style={ERROR_MESSAGE_STYLE} >{addCardErrorMessage}</p>
        <PrimaryTextButton
          type='submit'
          style={CONTINUE_BUTTON_STYLE}
          label={this.props.onAddLabel}
          onClick={this.handleOnAdd}
          disabled={isContinueAddCardDisabled}
        />
      </form>);
  }

  private handleOnCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>
      ) => {
    this.setState({
      cardNumber: Number(event.target.value.trim()),
      addCardInputHasChanged: true
    });
  }

  private handleOnNameChange = (event: React.ChangeEvent<HTMLInputElement>
      ) => {
    this.setState({
      nameOnCard: event.target.value,
      addCardInputHasChanged: true
    });
  }

  private handleOnSecurityCodeChange = (event: React.ChangeEvent<
      HTMLInputElement>) => {
    this.setState({
      securityCode: Number(event.target.value.trim()),
      addCardInputHasChanged: true
    });
  }

  private handleOnZipCodeChange = (event: React.ChangeEvent<
      HTMLInputElement>) => {
    this.setState({
      zipcode: event.target.value,
      addCardInputHasChanged: true
    });
  }

  private handleOnMonthClick = (newValue: number) => {
    this.setState({ selectedMonth: newValue });
  }

  private handleOnYearClick = (newValue: number) => {
    this.setState({ selectedYear: newValue });
  }

  private handleOnAdd = () => {
    this.setState({
      isNameOnCardInvalid: false,
      isSecurityCodeInvalid: false,
      isCardNumberInvalid: false,
      isZipcodeInvalid: false
    });
    this.props.onAdd(this.state.cardNumber, this.state.nameOnCard,
      this.state.selectedMonth, this.state.selectedYear,
      this.state.securityCode, this.state.zipcode);
  }

  private handleInvalidInput = (fieldName: string) => {
    switch (fieldName) {
      case 'name on card':
        this.setState({
          errorCode: AddCreditCardForm.ErrorCode.INVALID_ADD_CARD_INPUT,
          isNameOnCardInvalid: true
        });
        break;
      case 'zipcode':
        this.setState({
          errorCode: AddCreditCardForm.ErrorCode.INVALID_ADD_CARD_INPUT,
          isZipcodeInvalid: true
        });
        break;
      case 'security code':
        this.setState({
          errorCode: AddCreditCardForm.ErrorCode.INVALID_ADD_CARD_INPUT,
          isSecurityCodeInvalid: true
        });
        break;
      case 'card number':
        this.setState({
          errorCode: AddCreditCardForm.ErrorCode.INVALID_ADD_CARD_INPUT,
          isCardNumberInvalid: true
        });
    }
  }
}

export namespace AddCreditCardForm {
  export enum ErrorCode {
    NONE,
    INVALID_CARD_INFO,
    EXPIRED_CARD,
    INVALID_ADD_CARD_INPUT
  }
}

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

const ADD_ICON_STYLE: React.CSSProperties = {
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

const PAYMENT_CARD_INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  minWidth: '100%',
  marginTop: '10px'
};

const ADD_FIELD_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  width: '100%',
  padding: '0px',
  margin: '7px 0px 0px 0px'
};

const CODE_INPUT_STYLE: React.CSSProperties = {
  width: '150px',
  minWidth: '150px',
  marginTop: '10px'
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

const MONTH_YEAR_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  width: '100%',
  gap: '10px',
  marginTop: '10px',
  marginBottom: '13px'
};

const NUMBER_DROPDOWN_STYLE: React.CSSProperties = {
  width: 'calc(50% - 5px)'
};
