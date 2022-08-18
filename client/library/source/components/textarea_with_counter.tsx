import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import { CircularCounterWithCounterInside
} from './circular_counter_with_counter_inside';

interface Properties extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  maxCount: number;
  value: string;
  hasError?: boolean;
  onValueChange: (newValue: string) => void;
}

export class TextareaWithCounter extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <div
          style={{...CONTAINER_STYLE, ...this.props.style}}
          className={this.props.disabled && css(styles.disabled) ||
            this.props.hasError && css(styles.hasError) ||
            css(styles.container, styles.input)}
      >
        <textarea
          {...this.props}
          style={TEXTAREA_STYLE}
          onChange={this.handleOnChange}
        >
          {this.props.value}
        </textarea>
        <div style={COUNTER_STYLE} >
          <CircularCounterWithCounterInside
            value={this.props.value.length}
            maxValue={this.props.maxCount}
          />
        </div>
      </div>);
  }
 
  private handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    this.props.onValueChange(event.target.value);
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  backgroundColor: '#FFFFFF',
  borderRadius: '4px',
  border: '1px solid #CCCCCC',
  width: '100%'
};

const TEXTAREA_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  color: '#969696',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  width: '100%',
  minHeight: '56px',
  outline: 'none',
  border: 'none',
  margin: '0px',
  padding: '10px 30px 10px 10px',
  cursor: 'auto',
  whiteSpace: 'pre-line',
  resize: 'none',
  scrollbarColor: '#C4C4C4',
  scrollbarWidth: 'thin',
  backgroundColor: 'transparent'
};

const COUNTER_STYLE: React.CSSProperties = {
  position: 'absolute',
  bottom: '10px',
  right: '10px',
  height: '20px',
  width: '20px',
  backgroundColor: 'transparent'
};

const styles = StyleSheet.create({
  container: {
    ':hover': {
      border: '1px solid #969696',
      color: '#000000',
      boxShadow: '0px 1px 5px rgba(86, 70, 40, 0.4)'
    },
    ':focus': {
      border: '1px solid #969696',
      color: '#000000',
      boxShadow: '0px 1px 5px rgba(86, 70, 40, 0.4)'
    },
    ':focus-within': {
      border: '1px solid #969696',
      color: '#000000',
      boxShadow: '0px 1px 5px rgba(86, 70, 40, 0.4)'
    },
    ':active': {
      border: '1px solid #969696',
      boxShadow: 'none'
    }
  },
  disabled: {
    border: '1px solid #CCCCCC',
    boxShadow: 'none',
    backgroundColor: '#EFEFEF'
  },
  hasError: {
    borderColor: '#FF2C79'
  },
  input: {
    ':placeholder': {
      color: '#969696',
      fontWeight: 400
    }
  }
});
