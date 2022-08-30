import * as NeverEatAlone from 'never_eat_alone';
import * as React from 'react';

interface Properties {

  /** The value of the Attendee. */
  value?: NeverEatAlone.Attendee;

  /** The callback to update the value. */
  update?: (newAttendee: NeverEatAlone.Attendee) => void;
}

/** An Attendeeinput. */
export class AttendeeInput extends React.Component<Properties> {
  constructor(props: Properties) {
    super(props);
    this.nextId = 1;
  }

  public render(): JSX.Element {
    return <input value={this.props.value.name} onChange={this.onChange} />;
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (() => {
      if (!event.target.value.trim()) {
        return null;
      }
      const id = this.nextId;
      ++this.nextId;
      return new NeverEatAlone.Attendee(id, 2, event.target.value, 0,
        NeverEatAlone.AttendeeStatus.GOING, 'resources/images/profile5.jpeg',
        new Date());
    })();
    this.props.update(newValue);
  }

  private nextId: number;
}
