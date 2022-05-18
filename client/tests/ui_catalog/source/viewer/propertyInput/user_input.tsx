import * as NeverEatAlone from 'never_eat_alone';
import * as React from 'react';

interface Properties {

  /** The value of the user. */
  value?: NeverEatAlone.User;

  /** The callback to update the value. */
  update?: (newUser: NeverEatAlone.User) => void;
}

/** A user input. */
export class UserInput extends React.Component<Properties> {
  public render(): JSX.Element {
    return <input value={this.props.value.name} onChange={this.onChange} />;
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (() => {
      if (!event.target.value.trim()) {
        return  NeverEatAlone.User.makeGuest();
      }
      return new NeverEatAlone.User(1, event.target.value,
        'user@nevereatalone.net', 'jojo', NeverEatAlone.UserStatus.ACTIVE,
        new Date());
    })();
    this.props.update(newValue);
  }
}
