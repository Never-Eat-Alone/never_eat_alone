import * as NeverEatAlone from 'never_eat_alone';
import * as React from 'react';

interface Properties {

  /** The value of the cuisine. */
  value?: NeverEatAlone.Cuisine;

  /** The callback to update the value. */
  update?: (newCuisine: NeverEatAlone.Cuisine) => void;
}

/** A Cuisine input. */
export class CuisineInput extends React.Component<Properties> {
  public render(): JSX.Element {
    return <input value={this.props.value.label} onChange={this.onChange} />;
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (() => {
      if (!event.target.value.trim()) {
        return  new NeverEatAlone.Cuisine(-1, '', '');
      }
      return new NeverEatAlone.Cuisine(1, event.target.value, 'yellow');
    })();
    this.props.update(newValue);
  }
}
