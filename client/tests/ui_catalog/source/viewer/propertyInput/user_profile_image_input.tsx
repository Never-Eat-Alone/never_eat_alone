import * as NeverEatAlone from 'never_eat_alone';
import * as React from 'react';

interface Properties {

  /** The value of the UserProfileImage. */
  value?: NeverEatAlone.UserProfileImage;

  /** The callback to update the value. */
  update?: (newUserProfileImage: NeverEatAlone.UserProfileImage) => void;
}

/** A UserProfileImage input. */
export class UserProfileImageInput extends React.Component<Properties> {
  public render(): JSX.Element {
    return <input value={this.props.value.src} onChange={this.onChange} />;
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (() => {
      if (!event.target.value.trim()) {
        return NeverEatAlone.UserProfileImage.NoImage();
      }
      return new NeverEatAlone.UserProfileImage(this.props.value.userId,
        this.props.value.id, event.target.value);
    })();
    this.props.update(newValue);
  }
}
