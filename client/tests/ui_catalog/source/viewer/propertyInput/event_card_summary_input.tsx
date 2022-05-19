import * as NeverEatAlone from 'never_eat_alone';
import * as React from 'react';

interface Properties {

  /** The value of the EventCardSummary. */
  value?: NeverEatAlone.EventCardSummary;

  /** The callback to update the value. */
  update?: (
    newEventCardSummary: NeverEatAlone.EventCardSummary) => void;
}

/** A EventCardSummary input. */
export class EventCardSummaryInput extends React.Component<Properties> {
  public render(): JSX.Element {
    return (<input value={this.props.value.eventTitle} onChange={this.onChange}
      />);
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (() => {
      if (!event.target.value.trim()) {
        return new NeverEatAlone.EventCardSummary(1, 'Event Title',
          new Date(2022, 6, 23, 18, 30), new Date(2022, 6, 23, 23, 30), 'Miku',
          NeverEatAlone.PriceRange.EXPENSIVE, [new NeverEatAlone.Cuisine(1,
          'Japanese', 'yellow')], 'resources/images/3.jpg',
          14, 20, true, 'blue');
      }
      return new NeverEatAlone.EventCardSummary(1, this.props.value,
        new Date(2022, 6, 23, 18, 30), new Date(2022, 6, 23, 23, 30), 'Miku',
        NeverEatAlone.PriceRange.EXPENSIVE, [new NeverEatAlone.Cuisine(1,
        'Japanese', 'yellow')], 'resources/images/3.jpg',
        14, 20, true, 'blue');
    })();
    this.props.update(newValue);
  }
}
