import * as NeverEatAlone from 'never_eat_alone';
import * as React from 'react';

interface Properties {

  /** The value of the error code. */
  value?: number;

  /** The callback to update the value. */
  update?: (newError: number) => void;
}

/** A HomePage ErrorCode input. */
export class HomePageErrorCodeInput extends React.Component<Properties> {
  public render(): JSX.Element {
    return <input value={this.props.value} onChange={this.onChange} />;
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (() => {
      if (!event.target.value.trim()) {
        return NeverEatAlone.HomePage.ErrorCode[0];
      }
      return NeverEatAlone.HomePage.ErrorCode[parseInt(event.target.value)];
    })();
    this.props.update(NeverEatAlone.HomePage.ErrorCode[
      newValue as keyof typeof NeverEatAlone.HomePage.ErrorCode]);
  }
}
