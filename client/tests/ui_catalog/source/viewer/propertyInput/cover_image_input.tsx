import * as NeverEatAlone from 'never_eat_alone';
import * as React from 'react';

interface Properties {

  /** The value of the coverimage. */
  value?: NeverEatAlone.CoverImage;

  /** The callback to update the value. */
  update?: (newCoverImage: NeverEatAlone.CoverImage) => void;
}

/** A CoverImage input. */
export class CoverImageInput extends React.Component<Properties> {
  public render(): JSX.Element {
    return <input value={this.props.value.src} onChange={this.onChange} />;
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (() => {
      if (!event.target.value.trim()) {
        return NeverEatAlone.CoverImage.default();
      }
      return new NeverEatAlone.CoverImage(Date.now(), event.target.value,
        'Cover Image');
    })();
    this.props.update(newValue);
  }
}
