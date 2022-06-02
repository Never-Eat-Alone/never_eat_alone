import * as NeverEatAlone from 'never_eat_alone';
import * as React from 'react';

interface Properties {

  /** The value of the eventTag. */
  value?: NeverEatAlone.EventTag;

  /** The callback to update the value. */
  update?: (newEventTag: NeverEatAlone.EventTag) => void;
}

/** A eventTag input. */
export class EventTagInput extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <input value={this.props.value.eventTitle} onChange={this.onChange} />);
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (() => {
      if (!event.target.value.trim()) {
        return new NeverEatAlone.EventTag(1,
          'Join us at top restaurants in TO!', 'yellow');
      }
      return new NeverEatAlone.EventTag(1, event.target.value.trim(), 'yellow');
    })();
    this.props.update(newValue);
  }
}
