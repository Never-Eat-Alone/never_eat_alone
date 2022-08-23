import * as NeverEatAlone from 'never_eat_alone';
import * as React from 'react';

interface Properties {

  /** The value of the Location. */
  value?: NeverEatAlone.Location;

  /** The callback to update the value. */
  update?: (newLocation: NeverEatAlone.Location) => void;
}

/** A Location input. */
export class LocationInput extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <input value={this.props.value.addressLineOne} onChange={this.onChange}
      />);
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (() => {
      if (!event.target.value.trim()) {
        return NeverEatAlone.Location.empty();
      }
      return new NeverEatAlone.Location(2, event.target.value, '', 'Toronto',
        'ON', 'CA', 'M4W 2P3', 'Midtown');
    })();
    this.props.update(newValue);
  }
}
