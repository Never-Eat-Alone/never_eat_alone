import * as NeverEatAlone from 'never_eat_alone';
import * as React from 'react';

interface Properties {

  /** The value of the language. */
  value?: NeverEatAlone.Language;

  /** The callback to update the value. */
  update?: (newLanguage: NeverEatAlone.Language) => void;
}

/** A Language input. */
export class LanguageInput extends React.Component<Properties> {
  public render(): JSX.Element {
    return <input value={this.props.value.name} onChange={this.onChange} />;
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = (() => {
      if (!event.target.value.trim()) {
        return NeverEatAlone.Language.empty();
      }
      return new NeverEatAlone.Language(Date.now(),
        event.target.value.slice(0,2), event.target.value);
    })();
    this.props.update(newValue);
  }
}
