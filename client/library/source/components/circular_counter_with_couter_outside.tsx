import * as React from 'react';

interface Properties {
  value: number;
  maxValue: number;
}

export class CircularCounterWithCounterOutside extends React.Component<
    Properties> {
  constructor(props: Properties) {
    super(props);
    this._canvasRef = React.createRef();
  }

  public render(): JSX.Element {
    const text = (() => {
      const tempValue = Math.min(0, this.props.maxValue - this.props.value);
      const text = tempValue && tempValue.toString() ||
        this.props.value.toString();
      if (text.length == 0) {
        return '00';
      } else if (text.length == 1) {
        return '0' + text;
      }
      return text;
    })();
    return (
      <div style={CONTAINER_STYLE} >
        <div style={TEXT_STYLE} >{text}</div>
        <canvas width='40px' height='40px' ref={this._canvasRef} />
      </div>);
  }

  public componentDidMount() {
    const canvas = (this._canvasRef as any).current;
    canvas.style.width = '20px';
    canvas.style.height = '20px';
    canvas.getContext('2d').scale(2, 2);
    this.componentDidUpdate();
  }

  public componentDidUpdate() {
    const percentage = this.props.value / this.props.maxValue;
    const startAngle = - Math.PI / 2;
    const canvas = (this._canvasRef as any).current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, 40, 40);
    if (this.props.value !== 0) {
      ctx.strokeStyle = (() => {
        for(const color of CircularCounterWithCounterOutside.COLOR_TABLE) {
          if(100 * percentage < color[0]) {
            return color[1];
          }
        }
        return CircularCounterWithCounterOutside.COLOR_TABLE[
          CircularCounterWithCounterOutside.COLOR_TABLE.length - 1][1];
      })();
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (this.props.value >= this.props.maxValue) {
        ctx.arc(11, 11, 7, 0, 2 * Math.PI, true);
      } else {
        ctx.arc(11, 11, 7, startAngle, -2 * Math.PI * percentage + startAngle,
          true);
      }
      ctx.stroke();
    }
    if (this.props.value < this.props.maxValue) {
      ctx.beginPath();
      ctx.strokeStyle = '#969696';
      ctx.lineWidth = 1;
      if (this.props.value === 0) {
        ctx.arc(11, 11, 7, 0, 2 * Math.PI, true);
      } else {
        ctx.arc(11, 11, 7, -2 * Math.PI * percentage + startAngle, startAngle,
          true);
      }
      ctx.stroke();
    }
  }

  private static COLOR_TABLE = [
    [74, '#39B54A'],
    [83, '#8EA142'],
    [90, '#C7943D'],
    [99, '#DE6956'],
    [101, '#FF2C79']];

  private _canvasRef: React.Ref<HTMLCanvasElement>;
}

const CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  height: '100%'
};

const TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '15px',
  height: '15px',
  color: '#969696',
  marginLeft: '5px',
  marginRight: '5px',
  paddingTop: '3px'
};
