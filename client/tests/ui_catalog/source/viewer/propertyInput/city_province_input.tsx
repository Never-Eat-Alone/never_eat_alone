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
    return <input value={this.props.value.city} onChange={this.onChange} />;
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (() => {
      if (!event.target.value.trim()) {
        return NeverEatAlone.CityProvince.defaultLocation();
      }
      return new NeverEatAlone.CityProvince(Date.now(),
        event.target.value, 'ON', 'Canada');
    })();
    this.props.update(newValue);
  }
}
