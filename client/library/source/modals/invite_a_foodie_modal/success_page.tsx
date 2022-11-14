import * as React from 'react';
import { CloseButton } from '../../components';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;
  onClose: () => void;
}

export class SuccessPage extends React.Component<Properties> {
  constructor(props: Properties) {
    super(props);
    this._containerRef = React.createRef();
  }

  public render(): JSX.Element {
    return (
      <div style={FORM_STYLE} >
        <div ref={this._containerRef} style={CONTAINER_STYLE} >
          <CloseButton
            displayMode={this.props.displayMode}
            onClick={this.props.onClose}
          />
          <h1 style={HEADER_STYLE} >
            hooray!
          </h1>
          <div style={IMAGE_CONTAINER_STYLE} >
            <img
              style={CELEBRATION_IMAGE_STYLE}
              src='resources/celebration.jpg'
              alt='Celebration image'
              draggable={false}
            />
          </div>
          <p style={TEXT_STYLE} >
            You shared NeverEatAlone! Thanks for bringing more people together.
          </p>
        </div>
      </div>);
  }

  public componentDidMount(): void {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  public componentWillUnmount(): void {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  private handleClickOutside: { (event: any): void } = (
      event: React.MouseEvent) => {
    if (!this._containerRef.current.contains(event.target as Node)) {
      event.preventDefault();
      event.stopPropagation();
      this.props.onClose();
    }
  }

  private _containerRef: React.RefObject<HTMLDivElement>;
}

const FORM_STYLE: React.CSSProperties = {
  position: 'fixed',
  top: '0px',
  left: '0px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgb(150, 150, 150, 0.5)'
};

const CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '702px',
  height: '287px',
  backgroundColor: '#FFFFFF',
  padding: '30px'
};

const HEADER_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontSize: '26px',
  lineHeight: '39px',
  textTransform: 'uppercase',
  color: '#000000',
  marginBottom: '30px',
  padding: '0px'
};

const IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: '30px',
  width: '80px',
  height: '80px'
};

const CELEBRATION_IMAGE_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};

const TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '18px',
  textAlign: 'center',
  color: '#000000',
  padding: '0px',
  margin: '0px opx 30px 0px',
  height: '18px',
  minWidth: '419px'
};
