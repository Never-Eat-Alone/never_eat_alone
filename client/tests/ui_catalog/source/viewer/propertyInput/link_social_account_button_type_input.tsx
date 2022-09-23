import * as React from 'react';
import { LinkSocialAccountButton } from 'never_eat_alone';

interface Properties {

  /** The value of the field. */
  value?: LinkSocialAccountButton.Type;

  /** The callback to update the value. */
  update?: (newValue: LinkSocialAccountButton.Type) => void;
}

/** A LinkSocialAccountButton type input field. */
export class LinkSocialAccountButtonTypeInput extends React.Component<
    Properties> {
  public render(): JSX.Element {
    return (
      <div style={LinkSocialAccountButtonTypeInput.STYLE.container} >
        <div style={LinkSocialAccountButtonTypeInput.STYLE.label} >
          <input type='radio' name='button_type' id='FACEBOOK' value='FACEBOOK'
            checked={this.props.value === LinkSocialAccountButton.Type.FACEBOOK}
            onChange={this.onChange}
            style={LinkSocialAccountButtonTypeInput.STYLE.radio} />
          <label htmlFor='FACEBOOK'>FACEBOOK</label>
        </div>
        <div style={LinkSocialAccountButtonTypeInput.STYLE.label} >
          <input type='radio' name='button_type' id='GOOGLE' value='GOOGLE'
            checked={this.props.value === LinkSocialAccountButton.Type.GOOGLE}
            onChange={this.onChange}
            style={LinkSocialAccountButtonTypeInput.STYLE.radio} />
          <label htmlFor='GOOGLE'>GOOGLE</label>
        </div>
      </div>);
  }

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const mode = event.target.value;
    if (mode === 'FACEBOOK') {
      this.props.update(LinkSocialAccountButton.Type.FACEBOOK);
    } else {
      this.props.update(LinkSocialAccountButton.Type.GOOGLE);
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
