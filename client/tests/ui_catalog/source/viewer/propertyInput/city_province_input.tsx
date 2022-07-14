import * as NeverEatAlone from 'never_eat_alone';
import * as React from 'react';

interface Properties {

  /** The value of the CityProvince. */
  value?: NeverEatAlone.CityProvince;

  /** The callback to update the value. */
  update?: (newCityProvince: NeverEatAlone.CityProvince) => void;
}

/** A CityProvince input. */
export class CityProvinceInput extends React.Component<Properties> {
  public render(): JSX.Element {
    return <input value={this.props.value.label} onChange={this.onChange} />;
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (() => {
      if (!event.target.value.trim()) {
        return  new NeverEatAlone.CityProvince('Toronto', 'ON');
      }
      return new NeverEatAlone.CityProvince(event.target.value, 'ON');
    })();
    this.props.update(newValue);
  }
}