import * as NeverEatAlone from 'never_eat_alone';
import * as React from 'react';

interface Properties {

  /** The value of the SocialAccount. */
  value?: NeverEatAlone.SocialAccount;

  /** The callback to update the value. */
  update?: (newValue: NeverEatAlone.SocialAccount) => void;
}

/** A SocialAccount input. */
export class SocialAccountInput extends React.Component<Properties> {
  public render(): JSX.Element {
    return <input value={this.props.value.email}
      onChange={this.onChange} />;
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (() => {
      if (!event.target.value.trim()) {
        return new NeverEatAlone.SocialAccount(-1, '',
          NeverEatAlone.SocialAccountType.FACEBOOK);
      }
      return new NeverEatAlone.SocialAccount(Date.now(), event.target.value,
        NeverEatAlone.SocialAccountType.GOOGLE);
    })();
    this.props.update(newValue);
  }
}
