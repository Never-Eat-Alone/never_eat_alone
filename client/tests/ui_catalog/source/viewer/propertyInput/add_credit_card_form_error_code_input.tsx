import * as NeverEatAlone from 'never_eat_alone';
import * as React from 'react';

interface Properties {

  /** The value of the error code. */
  value?: number;

  /** The callback to update the value. */
  update?: (newError: number) => void;
}

/** A AddCreditCardForm ErrorCode input. */
export class AddCreditCardFormErrorCodeInput extends React.Component<
    Properties> {
  public render(): JSX.Element {
    return <input value={this.props.value} onChange={this.onChange} />;
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (() => {
      if (!event.target.value.trim()) {
        return NeverEatAlone.AddCreditCardForm.ErrorCode[0];
      }
      return NeverEatAlone.AddCreditCardForm.ErrorCode[parseInt(
        event.target.value)];
    })();
    this.props.update(NeverEatAlone.AddCreditCardForm.ErrorCode[
      newValue as keyof typeof NeverEatAlone.AddCreditCardForm.ErrorCode]);
  }
}
