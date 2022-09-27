import * as React from 'react';
import { SocialAccountType } from 'never_eat_alone';

interface Properties {

  /** The value of the field. */
  value?: SocialAccountType;

  /** The callback to update the value. */
  update?: (newValue: SocialAccountType) => void;
}

/** A SocialAccountType input field. */
export class SocialAccountTypeInput extends React.Component<
    Properties> {
  public render(): JSX.Element {
    return (
      <div style={SocialAccountTypeInput.STYLE.container} >
        <div style={SocialAccountTypeInput.STYLE.label} >
          <input type='radio' name='button_type' id='FACEBOOK' value='FACEBOOK'
            checked={this.props.value === SocialAccountType.FACEBOOK}
            onChange={this.onChange}
            style={SocialAccountTypeInput.STYLE.radio} />
          <label htmlFor='FACEBOOK'>FACEBOOK</label>
        </div>
        <div style={SocialAccountTypeInput.STYLE.label} >
          <input type='radio' name='button_type' id='GOOGLE' value='GOOGLE'
            checked={this.props.value === SocialAccountType.GOOGLE}
            onChange={this.onChange}
            style={SocialAccountTypeInput.STYLE.radio} />
          <label htmlFor='GOOGLE'>GOOGLE</label>
        </div>
      </div>);
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const mode = event.target.value;
    if (mode === 'FACEBOOK') {
      this.props.update(SocialAccountType.FACEBOOK);
    } else {
      this.props.update(SocialAccountType.GOOGLE);
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
