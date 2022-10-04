import * as React from 'react';
import { CheckBox, InputField, NumberedDropdownMenu, PaymentCardInputField,
  PrimaryTextButton, SecurityCodeInputField } from '../../components';
import { CreditCardType, getCreditCardTypeName, PaymentCard
} from '../../definitions';

interface Properties {

  /** Payment Card Id. */
  cardId: number;

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

  /** Credit type of the card. */
  creditType: CreditCardType;

  /** Error message related to updating the card info. */
  errorMessage: string;

  /** Error code related to updating the card info. */
  errorCode: CardDetailsForm.ErrorCode;

  /** Whether this card is selected as the default payment card or not. */
  isDefault?: boolean;

  /** Indicates the delete card button is clicked. */
  onDeleteCard: () => void;

  /** Indicates the make default card button is clicked. */
  onMakeDefault?: () => void;

  /** Indicates the cancel button is clicked. */
  onCancel: () => void;

  /** Indicates the update(save) button is clicked. */
  onUpdateCard: (card: PaymentCard, isMarkedDefault: boolean) => void;
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
  cardInputHasChanged: boolean;
  errorCode: CardDetailsForm.ErrorCode;
  isMakeDefaultMarked: boolean;
}

/** Displays the Card Details Form. */
export class CardDetailsForm extends React.Component<Properties, State> {
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
      cardInputHasChanged: false,
      errorCode: this.props.errorCode,
      isMakeDefaultMarked: false
    };
  }

  public render(): JSX.Element {
    const cardSrc = (() => {
      if (this.props.creditType === CreditCardType.VISA) {
        return 'resources/icons/super_big_visa.svg';
      }
      if (this.props.creditType === CreditCardType.AMEX) {
        return 'resources/icons/super_big_amex.svg';
      }
      if (this.props.creditType === CreditCardType.MASTERCARD) {
        return 'resources/icons/super_big_mastercard.svg';
      }
      return '';
    })();
    const isDefault = (this.props.isDefault &&
      <div style={IS_DEFAULT_CONTAINER_STYLE} >
        <img
          style={GREY_MARK_ICON_STYLE}
          src='resources/icons/grey_mark.svg'
          alt='Check Mark'
        />
        <p style={IS_DEFAULT_TEXT_STYLE} >Your default card</p>
      </div> || null);
    const currentYear = new Date().getFullYear();
    const updateCardErrorMessage = (() => {
      if (this.props.errorMessage) {
        return this.props.errorMessage;
      }
      if (this.state.isZipcodeInvalid) {
        return 'Please enter a valid postal code.';
      }
      return '';
    })();
    const nameOnCardErrorMessage = (() => {
      if (!this.state.cardInputHasChanged) {
        return '';
      }
      if (this.state.isNameOnCardInvalid) {
        return 'Please enter a valid fullname.';
      }
      return '';
    })();
    const cardNumberErrorMessage = (() => {
      if (!this.state.cardInputHasChanged) {
        return '';
      }
      if (this.state.isCardNumberInvalid) {
        return 'Please enter a valid card number.';
      }
      return '';
    })();
    const securityCodeErrorMessage = (() => {
      if (!this.state.cardInputHasChanged) {
        return '';
      }
      if (this.state.isSecurityCodeInvalid) {
        return 'Please enter a valid security code.';
      }
      return '';
    })();
    const dateErrorMessage = (() => {
      if (this.props.errorCode === CardDetailsForm.ErrorCode.EXPIRED_CARD) {
        return 'The card is expired.';
      }
      return '';
    })();
    const isUpdateCardDisabled = (() => {
      if (!this.state.cardNumber || !this.state.nameOnCard ||
          this.state.nameOnCard.length === 0 || !this.state.securityCode ||
          !this.state.zipcode || this.state.zipcode.length === 0 ||
          !this.state.cardInputHasChanged) {
        return true;
      }
      if (this.state.cardInputHasChanged) {
        return false;
      }
      if (this.state.errorCode !== CardDetailsForm.ErrorCode.NONE) {
        return true;
      }
      return false;
    })();
    const makeDefaultRow = (this.props.isDefault ? null :
      <div style={MAKE_DEFAULT_ROW_STYLE} >
        <CheckBox
          label='Make this my default card'
          onClick={this.handleCheckBox}
        />
      </div>);
    return (
      <form style={CARD_DETAILS_CONTAINER_STYLE} onSubmit={this.handleOnSave} >
        <div style={ROW_CONTAINER_STYLE} >
          <img
            style={BACK_ICON_STYLE}
            src='resources/icons/back.svg'
            alt='Back Icon'
            onClick={this.props.onCancel}
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
              {getCreditCardTypeName(this.props.creditType)}
              &nbsp;card ending in {this.props.cardNumber.toString().slice(-4)}
            </p>
            <div style={DEFAULT_DELETE_ROW_STYLE} >
              {isDefault}
              <div
                  style={DELETE_BUTTON_STYLE}
                  onClick={this.props.onDeleteCard}
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
        {makeDefaultRow}
        <p style={CARD_DETAILS_FIELD_TEXT_STYLE} >Card number</p>
        <PaymentCardInputField
          style={PAYMENT_CARD_INPUT_STYLE}
          name='card number'
          inputMode='numeric'
          value={this.state.cardNumber ? this.state.cardNumber : ''}
          pattern='\d*'
          required
          onChange={this.handleOnCardNumberChange}
          onInvalid={() => this.handleInvalidInput('card number')}
          hasError={this.state.isCardNumberInvalid &&
            this.state.cardInputHasChanged}
        />
        <div style={ERROR_MESSAGE_STYLE}>{cardNumberErrorMessage}</div>
        <p style={CARD_DETAILS_FIELD_TEXT_STYLE} >Name on card</p>
        <InputField
          style={PAYMENT_CARD_INPUT_STYLE}
          name='name on card'
          pattern='^[A-Za-z]([A-Za-z]*([ ]{1})+[A-Za-z]*)+[A-Za-z]$'
          value={this.state.nameOnCard}
          required
          onChange={this.handleOnNameChange}
          onInvalid={() => this.handleInvalidInput('name on card')}
          hasError={this.state.isNameOnCardInvalid &&
            this.state.cardInputHasChanged}
        />
        <div style={ERROR_MESSAGE_STYLE}>{nameOnCardErrorMessage}</div>
        <p style={CARD_DETAILS_FIELD_TEXT_STYLE} >Expiration date</p>
        <div style={MONTH_YEAR_CONTAINER_STYLE} >
          <NumberedDropdownMenu
            style={NUMBER_DROPDOWN_STYLE}
            values={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
            displayedValue={this.state.selectedMonth}
            onMenuItemClick={this.handleOnMonthClick}
            hasError={this.props.errorCode ===
              CardDetailsForm.ErrorCode.EXPIRED_CARD}
          />
          <NumberedDropdownMenu
            values={[currentYear, currentYear + 1, currentYear + 2,
              currentYear + 3, currentYear + 4, currentYear + 5,
              currentYear + 6, currentYear + 7, currentYear + 8,
              currentYear + 9, currentYear + 10]}
            style={NUMBER_DROPDOWN_STYLE}
            displayedValue={this.state.selectedYear}
            onMenuItemClick={this.handleOnYearClick}
            hasError={this.props.errorCode ===
              CardDetailsForm.ErrorCode.EXPIRED_CARD}
          />
        </div>
        <div style={ERROR_MESSAGE_STYLE}>{dateErrorMessage}</div>
        <p style={CARD_DETAILS_FIELD_TEXT_STYLE} >Security code</p>
        <SecurityCodeInputField
          style={CODE_INPUT_STYLE}
          name='security code'
          inputMode='numeric'
          pattern='\d{3}\d?'
          value={this.state.securityCode? this.state.securityCode : ''}
          onChange={this.handleOnSecurityCodeChange}
          required
          onInvalid={() => this.handleInvalidInput('security code')}
          hasError={this.state.isSecurityCodeInvalid &&
            this.state.cardInputHasChanged}
        />
        <div style={ERROR_MESSAGE_STYLE}>{securityCodeErrorMessage}</div>
        <p style={CARD_DETAILS_FIELD_TEXT_STYLE} >Zip/Postal code</p>
        <InputField
          style={CODE_INPUT_STYLE}
          name='zipcode'
          pattern='^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$'
          value={this.state.zipcode}
          onChange={this.handleOnZipCodeChange}
          required
          onInvalid={() => this.handleInvalidInput('zipcode')}
          hasError={this.state.isZipcodeInvalid &&
            this.state.cardInputHasChanged}
        />
        <p style={ERROR_MESSAGE_STYLE} >{updateCardErrorMessage}</p>
        <PrimaryTextButton
          type='submit'
          style={CONTINUE_BUTTON_STYLE}
          label='Save'
          onClick={this.handleOnSave}
          disabled={isUpdateCardDisabled}
        />
      </form>);
  }

  private handleOnCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>
      ) => {
    this.setState({
      cardNumber: Number(event.target.value.trim()),
      cardInputHasChanged: true
    });
  }

  private handleOnNameChange = (event: React.ChangeEvent<HTMLInputElement>
      ) => {
    this.setState({
      nameOnCard: event.target.value,
      cardInputHasChanged: true
    });
  }

  private handleOnSecurityCodeChange = (event: React.ChangeEvent<
      HTMLInputElement>) => {
    this.setState({
      securityCode: Number(event.target.value.trim()),
      cardInputHasChanged: true
    });
  }

  private handleCheckBox = () => {
    this.setState((prevState) => ({
      isMakeDefaultMarked: !prevState.isMakeDefaultMarked
    }));
  }

  private handleOnZipCodeChange = (event: React.ChangeEvent<
      HTMLInputElement>) => {
    this.setState({
      zipcode: event.target.value,
      cardInputHasChanged: true
    });
  }

  private handleOnMonthClick = (newValue: number) => {
    this.setState({ selectedMonth: newValue, cardInputHasChanged: true });
  }

  private handleOnYearClick = (newValue: number) => {
    this.setState({ selectedYear: newValue, cardInputHasChanged: true });
  }

  private handleOnSave = (event: React.SyntheticEvent) => {
    event.preventDefault();
    this.setState({
      isNameOnCardInvalid: false,
      isSecurityCodeInvalid: false,
      isCardNumberInvalid: false,
      isZipcodeInvalid: false
    });
    const newCard = new PaymentCard(this.props.cardId, this.state.cardNumber,
      this.state.nameOnCard, this.state.selectedMonth, this.state.selectedYear,
      this.state.securityCode, this.state.zipcode, this.props.creditType);
    this.props.onUpdateCard(newCard, this.state.isMakeDefaultMarked);
  }

  private handleInvalidInput = (fieldName: string) => {
    switch (fieldName) {
      case 'name on card':
        this.setState({
          errorCode: CardDetailsForm.ErrorCode.INVALID_UPDATE_CARD_INPUT,
          isNameOnCardInvalid: true
        });
        break;
      case 'zipcode':
        this.setState({
          errorCode: CardDetailsForm.ErrorCode.INVALID_UPDATE_CARD_INPUT,
          isZipcodeInvalid: true
        });
        break;
      case 'security code':
        this.setState({
          errorCode: CardDetailsForm.ErrorCode.INVALID_UPDATE_CARD_INPUT,
          isSecurityCodeInvalid: true
        });
        break;
      case 'card number':
        this.setState({
          errorCode: CardDetailsForm.ErrorCode.INVALID_UPDATE_CARD_INPUT,
          isCardNumberInvalid: true
        });
    }
  }
}

export namespace CardDetailsForm {
  export enum ErrorCode {
    NONE,
    INVALID_CARD_INFO,
    EXPIRED_CARD,
    INVALID_UPDATE_CARD_INPUT
  }
}

const CARD_DETAILS_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  padding: '20px',
  marginTop: '20px',
  backgroundColor: '#FFFFFF',
  width: '395px'
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
  marginTop: '30px',
  marginBottom: '30px'
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
  padding: '0px',
  margin: '0px',
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
  color: '#969696',
  padding: '0px',
  margin: '0px'
};

const PAYMENT_CARD_INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  minWidth: '100%',
  marginTop: '10px'
};

const CARD_DETAILS_FIELD_TEXT_STYLE: React.CSSProperties = {
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

const MAKE_DEFAULT_ROW_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-stat',
  alignItems: 'center',
  width: '100%',
  height: '18px',
  gap: '10px',
  marginBottom: '30px'
};
