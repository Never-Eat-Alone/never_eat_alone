import * as React from 'react';
import { Viewport } from 'never_eat_alone';

interface Properties {

  /** The value of the field. */
  value?: Viewport;

  /** The callback to update the value. */
  update?: (newValue: Viewport) => void;
}

/** A viewport input field. */
export class ViewportInput extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <div style={ViewportInput.STYLE.container}>
        <div style={ViewportInput.STYLE.label}>
          <input type='radio' name='viewport' id='small' value='small'
            checked={this.props.value === Viewport.SMALL}
            onChange={this.onChange}
            style={ViewportInput.STYLE.radio}/>
          <label htmlFor='small'>small</label>
        </div>
        <div style={ViewportInput.STYLE.label}>
          <input type='radio' name='viewport' id='medium' value='medium'
            checked={this.props.value === Viewport.MEDIUM}
            onChange={this.onChange}
            style={ViewportInput.STYLE.radio}/>
          <label htmlFor='medium'>medium</label>
        </div>
        <div style={ViewportInput.STYLE.label}>
          <input type='radio' name='viewport' id='large' value='large'
            checked={this.props.value === Viewport.LARGE}
            onChange={this.onChange}
            style={ViewportInput.STYLE.radio}/>
          <label htmlFor='large'>large</label>
        </div>
      </div>);
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const viewport = event.target.value;
    if(viewport === 'small') {
      this.props.update(Viewport.SMALL);
    } else if(viewport === 'medium') {
      this.props.update(Viewport.MEDIUM);
    } else {
      this.props.update(Viewport.LARGE);
    }
  }

  private static readonly STYLE = {
    container: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column'
    } as React.CSSProperties,
    radio: {
      margin: '0 5px 0 0'
    } as React.CSSProperties,
    label: {
      display: 'flex',
      alignItems: 'center'
    } as React.CSSProperties
  };
}
