import * as NeverEatAlone from 'never_eat_alone';
import * as React from 'react';

interface Properties {

  /** The value of the error code. */
  value?: number;

  /** The callback to update the value. */
  update?: (newError: number) => void;
}

/** A LogInModal ErrorCode input. */
export class LogInModalErrorCodeInput extends React.Component<
    Properties> {
  public render(): JSX.Element {
    return <input value={this.props.value} onChange={this.onChange} />;
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (() => {
      if (!event.target.value.trim()) {
        return NeverEatAlone.LogInModal.ErrorCode[0];
      }
      return NeverEatAlone.LogInModal.ErrorCode[parseInt(
        event.target.value)];
    })();
    this.props.update(NeverEatAlone.LogInModal.ErrorCode[
      newValue as keyof typeof NeverEatAlone.LogInModal.ErrorCode]);
  }
}
