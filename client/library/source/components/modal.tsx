import * as React from 'react';
import * as ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal');

export class Modal extends React.Component<{}> {
  constructor(props: {}) {
    super(props);
    this.element = document.createElement('div');
  }

  public componentDidMount(): void {
    modalRoot.appendChild(this.element);
  }

  public componentWillUnmount(): void {
    modalRoot.removeChild(this.element);
  }
  
  public render(): JSX.Element {
    return ReactDOM.createPortal(
      this.props.children,
      this.element
    );
  }

  private element: HTMLDivElement;
}
