import * as React from 'react';
import { DressCode } from 'never_eat_alone';

interface Properties {

  /** The value of the field. */
  value?: DressCode;

  /** The callback to update the value. */
  update?: (newValue: DressCode) => void;
}

/** A dressCode input type. */
export class DressCodeInput extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <div style={DressCodeInput.STYLE.container}>
        <div style={DressCodeInput.STYLE.label}>
          <input type='radio' name='dress_code' id='casual' value='casual'
            checked={this.props.value === DressCode.CASUAL}
            onChange={this.onChange}
            style={DressCodeInput.STYLE.radio}/>
          <label htmlFor='casual'>Casual</label>
        </div>
        <div style={DressCodeInput.STYLE.label}>
          <input type='radio' name='dress_code' id='business_casual'
            value='business_casual'
            checked={this.props.value === DressCode.BUSINESS_CASUAL}
            onChange={this.onChange}
            style={DressCodeInput.STYLE.radio}/>
          <label htmlFor='business_casual'>Business Casual</label>
        </div>
        <div style={DressCodeInput.STYLE.label}>
          <input type='radio' name='dress_code' id='formal' value='formal'
            checked={this.props.value === DressCode.FORMAL}
            onChange={this.onChange}
            style={DressCodeInput.STYLE.radio}/>
          <label htmlFor='formal'>Formal</label>
        </div>
        <div style={DressCodeInput.STYLE.label}>
          <input type='radio' name='dress_code' id='black_tie' value='black_tie'
            checked={this.props.value === DressCode.BLACK_TIE}
            onChange={this.onChange}
            style={DressCodeInput.STYLE.radio}/>
          <label htmlFor='black_tie'>Black Tie</label>
        </div>
      </div>);
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const code = event.target.value;
    if (code === 'casual') {
      this.props.update(DressCode.CASUAL);
    } else if (code === 'black_tie') {
      this.props.update(DressCode.BLACK_TIE);
    } else if (code === 'formal') {
      this.props.update(DressCode.FORMAL);
    } else {
      this.props.update(DressCode.BUSINESS_CASUAL);
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
