import * as React from 'react';
import { DisplayMode } from 'never_eat_alone';

interface Properties {

  /** The value of the field. */
  value?: DisplayMode;

  /** The callback to update the value. */
  update?: (newValue: DisplayMode) => void;
}

/** A display mode input field. */
export class DisplayModeInput extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <div style={DisplayModeInput.STYLE.container}>
        <div style={DisplayModeInput.STYLE.label}>
          <input type='radio' name='display_mode' id='mobile' value='mobile'
            checked={this.props.value === DisplayMode.MOBILE}
            onChange={this.onChange}
            style={DisplayModeInput.STYLE.radio}/>
          <label htmlFor='mobile'>mobile</label>
        </div>
        <div style={DisplayModeInput.STYLE.label}>
          <input type='radio' name='display_mode' id='tablet' value='tablet'
            checked={this.props.value === DisplayMode.TABLET}
            onChange={this.onChange}
            style={DisplayModeInput.STYLE.radio}/>
          <label htmlFor='tablet'>tablet</label>
        </div>
        <div style={DisplayModeInput.STYLE.label}>
          <input type='radio' name='display_mode' id='desktop' value='desktop'
            checked={this.props.value === DisplayMode.DESKTOP}
            onChange={this.onChange}
            style={DisplayModeInput.STYLE.radio}/>
          <label htmlFor='desktop'>desktop</label>
        </div>
      </div>);
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const mode = event.target.value;
    if(mode === 'mobile') {
      this.props.update(DisplayMode.MOBILE);
    } else if(mode === 'tablet') {
      this.props.update(DisplayMode.TABLET);
    } else {
      this.props.update(DisplayMode.DESKTOP);
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
