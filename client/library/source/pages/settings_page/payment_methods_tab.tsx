import * as React from 'react';
import { DisplayMode } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;
}

/** Displays the payment methods tab. */
export class PaymentMethodsTab extends React.Component<Properties> {
  public render(): JSX.Element {
    return (
      <React.Fragment>
        <h1 style={PAGE_HEADING_STYLE} >Payment Methods</h1>
        
      </React.Fragment>);
  }
}

const PAGE_HEADING_STYLE: React.CSSProperties = {
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '23px',
  lineHeight: '34px',
  height: '34px',
  textTransform: 'capitalize',
  color: '#000000',
  margin: '0px 0px 30px 0px',
  padding: '0px'
};
