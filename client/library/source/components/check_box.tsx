import * as React from 'react';

interface Properties extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hasError?: boolean;
  onBoxClick: () => void;
}

interface State {
  checked: boolean;
  focused: boolean;
  hovered: boolean;
  active: boolean;
}

export class CheckBox extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      checked: this.props.checked ? this.props.checked : false,
      focused: false,
      hovered: false,
      active: false
    };
  }

  public render(): JSX.Element {
    const checkmarkStyle = (() => {
      if (this.props.disabled) {
        return DISABLED_STYLE;
      }
      if (this.props.hasError) {
        return ERROR_STYLE;
      }
      if (!this.state.checked) {
        if (this.state.hovered || this.state.focused) {
          return UNCHECKED_HOVER_FOCUS_STYLE;
        }
        return CHECKMARK_STYLE;
      } else {
        if (this.state.active) {
          return ACTIVE_STYLE;
        }
        if (this.state.hovered || this.state.focused) {
          return CHECKED_HOVER_FOCUS_STYLE;
        }
        return CHECKED_STYLE;
      }
    })();
    const contentStyle = (this.state.checked && CONTENT_CHECKED_STYLE ||
      CONTENT_UNCHECKED_STYLE);
    const labelStyle = (() => {
      if (this.props.disabled) {
        return LABEL_DISABLED_STYLE;
      }
      if (this.props.hasError) {
        return LABEL_ERROR_STYLE;
      }
      return LABEL_DEFAULT_STYLE;
    })();
    const label = (this.props.label &&
      <p style={{...LABEL_STYLE, ...labelStyle}} >
        {this.props.label}
      </p> || null);
    return (
      <div
          style={CONTAINER_STYLE}
          onClick={this.handleClick}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
      >
        <input
          checked={this.state.checked}
          type='checkbox'
          style={CHECKBOX_STYLE}
          onChange={this.handleClick}
          disabled={this.props.disabled}
        />
        <span style={{...CHECKMARK_STYLE, ...checkmarkStyle}} />
        <span style={contentStyle} />
        {label}
      </div>);
  }

  private handleClick = () => {
    if (!this.props.disabled && !this.props.hasError) {
      this.setState({ checked: !this.state.checked });
    }
    this.props.onBoxClick();
  }

  private handleFocus = () => {
    this.setState({ focused: true });
  }

  private handleBlur = () => {
    this.setState({ focused: false });
  }

  private handleMouseEnter = () => {
    this.setState({ hovered: true });
  }

  private handleMouseLeave = () => {
    this.setState({ hovered: false });
  }

  private handleMouseDown = () => {
    this.setState({ active: true });
  }

  private handleMouseUp = () => {
    this.setState({ active: false });
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
  KhtmlUserSelect: 'none',
  width: 'fit-content'
};

const CHECKBOX_STYLE: React.CSSProperties = {
  position: 'absolute',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  appearance: 'none',
  opacity: 0,
  width: '0px',
  height: '0px',
  outline: 'none',
  padding: '0px',
  cursor: 'pointer'
};

const CHECKMARK_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  backgroundColor: '#FFFFFF',
  border: '1px solid #969696',
  borderRadius: '2px',
  cursor: 'pointer',
  width: '16px',
  height: '16px',
  boxShadow: 'none'
};

const UNCHECKED_HOVER_FOCUS_STYLE: React.CSSProperties = {
  border: '1px solid #F26B55',
  backgroundColor: '#FFFFFF',
  boxShadow: 'none'
};

const CONTENT_UNCHECKED_STYLE: React.CSSProperties = {
  content: '""',
  position: 'absolute',
  display: 'none',
  backgroundColor: 'transparent'
};

const CHECKED_STYLE: React.CSSProperties = {
  backgroundColor: '#F26B55',
  border: 'none',
  boxShadow: 'none'
};

const CONTENT_CHECKED_STYLE: React.CSSProperties = {
  position: 'absolute',
  display: 'block',
  left: '5px',
  top: '2px',
  width: '3px',
  height: '7px',
  borderStyle: 'solid',
  borderColor: '#FFFFFF',
  borderWidth: '0 3px 3px 0',
  WebkitTransform: 'rotate(45deg)',
  transform: 'rotate(45deg)',
  backgroundColor: 'transparent',
  borderRadius: '1px'
};

const CHECKED_HOVER_FOCUS_STYLE: React.CSSProperties = {
  backgroundColor: '#F26B55',
  boxShadow: '0px 1px 5px rgba(86, 70, 40, 0.4)',
  border: 'none'
};

const ACTIVE_STYLE: React.CSSProperties = {
  backgroundColor: '#AA2F19',
  border: 'none',
  boxShadow: 'none'
};

const DISABLED_STYLE: React.CSSProperties = {
  border: 'none',
  backgroundColor: '#CCCCCC',
  cursor: 'default',
  boxShadow: 'none',
  content: '""'
};

const ERROR_STYLE: React.CSSProperties = {
  backgroundColor: '#FF2C79',
  boxShadow: 'none',
  border: 'none'
};

const LABEL_STYLE: React.CSSProperties = {
  height: '18px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  margin: '0px 0px 0px 10px',
  padding: '0px',
  textAlign: 'center'
};

const LABEL_DISABLED_STYLE: React.CSSProperties = {
  color: '#CCCCCC',
  cursor: 'default'
};

const LABEL_ERROR_STYLE: React.CSSProperties = {
  color: '#FF2C79'
};

const LABEL_DEFAULT_STYLE: React.CSSProperties = {
  color: '#000000'
};
