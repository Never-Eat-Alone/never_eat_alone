import * as NeverEatAlone from 'never_eat_alone';
import * as React from 'react';

interface Properties {

  /** The value of the Restaurant. */
  value?: NeverEatAlone.Restaurant;

  /** The callback to update the value. */
  update?: (newRestaurant: NeverEatAlone.Restaurant) => void;
}

/** A Restaurantinput. */
export class RestaurantInput extends React.Component<Properties> {
  public render(): JSX.Element {
    return <input value={this.props.value.city} onChange={this.onChange} />;
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (() => {
      if (!event.target.value.trim()) {
        return NeverEatAlone.Restaurant.empty();
      }
      return new NeverEatAlone.Restaurant(2, event.target.value, Date.now(), 2,
        'Grilled food, family style', 'Find us on Avenue St.', '4165874545',
        NeverEatAlone.PriceRange.EXPENSIVE, [new NeverEatAlone.Cuisine(1,
        'Grill', '#BF408D')], 'www.darbar.com');
    })();
    this.props.update(newValue);
  }
}
