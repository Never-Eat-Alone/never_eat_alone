import * as NeverEatAlone from 'never_eat_alone';
import * as React from 'react';

interface Properties {

  /** The value of the social media image. */
  value?: NeverEatAlone.SocialMediaImage;

  /** The callback to update the value. */
  update?: (newUser: NeverEatAlone.SocialMediaImage) => void;
}

/** A SocialMediaImage input. */
export class SocialMediaImageInput extends React.Component<Properties> {
  public render(): JSX.Element {
    return <input value={this.props.value.src} onChange={this.onChange} />;
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (() => {
      if (!event.target.value.trim()) {
        return new NeverEatAlone.SocialMediaImage(1, '');
      }
      return new NeverEatAlone.SocialMediaImage(1, event.target.value);
    })();
    this.props.update(newValue);
  }
}
