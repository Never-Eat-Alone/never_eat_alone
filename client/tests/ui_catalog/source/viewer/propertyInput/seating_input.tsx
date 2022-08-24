import * as React from 'react';
import { Seating } from 'never_eat_alone';

interface Properties {

  /** The value of the field. */
  value?: Seating;

  /** The callback to update the value. */
  update?: (newValue: Seating) => void;
}

/** A seating input type. */
export class SeatingInput extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <div style={SeatingInput.STYLE.container}>
        <div style={SeatingInput.STYLE.label}>
          <input type='radio' name='seating' id='bar' value='bar'
            checked={this.props.value === Seating.BAR}
            onChange={this.onChange}
            style={SeatingInput.STYLE.radio}/>
          <label htmlFor='bar'>Bar</label>
        </div>
        <div style={SeatingInput.STYLE.label}>
          <input type='radio' name='seating' id='patio' value='patio'
            checked={this.props.value === Seating.PATIO}
            onChange={this.onChange}
            style={SeatingInput.STYLE.radio}/>
          <label htmlFor='patio'>Patio</label>
        </div>
        <div style={SeatingInput.STYLE.label}>
          <input type='radio' name='seating' id='standard' value='standard'
            checked={this.props.value === Seating.STANDARD}
            onChange={this.onChange}
            style={SeatingInput.STYLE.radio}/>
          <label htmlFor='standard'>Standard</label>
        </div>
        <div style={SeatingInput.STYLE.label}>
          <input type='radio' name='seating' id='high_table' value='high_table'
            checked={this.props.value === Seating.HIGH_TABLE}
            onChange={this.onChange}
            style={SeatingInput.STYLE.radio}/>
          <label htmlFor='high_table'>High Table</label>
        </div>
        <div style={SeatingInput.STYLE.label}>
          <input type='radio' name='seating' id='private_room'
            value='private_room'
            checked={this.props.value === Seating.PRIVATE_ROOM}
            onChange={this.onChange}
            style={SeatingInput.STYLE.radio}/>
          <label htmlFor='private_room'>Private Room</label>
        </div>
      </div>);
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const code = event.target.value;
    if (code === 'bar') {
      this.props.update(Seating.BAR);
    } else if (code === 'patio') {
      this.props.update(Seating.PATIO);
    } else if (code === 'high_table') {
      this.props.update(Seating.HIGH_TABLE);
    } else if (code === 'private_room') {
      this.props.update(Seating.PRIVATE_ROOM);
    } else {
      this.props.update(Seating.STANDARD);
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
