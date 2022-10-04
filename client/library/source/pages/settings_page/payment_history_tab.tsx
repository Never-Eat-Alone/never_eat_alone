import * as React from 'react';
import { DisplayMode, PaymentRecord } from '../../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** List of the user's payment records. */
  paymentRecords: PaymentRecord[];
}

interface State {
  page: PaymentHistoryTab.Page;
}

/** Dislays the payment history tab inside the setting page. */
export class PaymentHistoryTab extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      page: PaymentHistoryTab.Page.INITIAL
    };
  }

  public render(): JSX.Element {
    if (this.state.page === PaymentHistoryTab.Page.PAYMENT_DETAILS) {
      return <div>Payment details</div>;
    }
    const records = (() => {
      if (!this.props.paymentRecords || this.props.paymentRecords.length === 0
          ) {
        return (
          <React.Fragment>
            <img
              style={NO_RECORDS_IMAGE_STYLE}
              src='resources/illustrations/'
              alt='Nothing found icon'
            />
            <h1 style={NOTHING_FOUND_HEADING_STYLE} >Nothing here yet!</h1>
            <div style={NOTHING_FOUND_TEXT_STYLE} >
              This is where your payment history and receipts will appear.
              For now, go 
            </div>
          </React.Fragment>);
      }
    })();
    return (
      <div style={CONTAINER_STYLE} >
        <h1 style={PAGE_HEADING_STYLE} >Payment Methods</h1>
        {records}
      </div>);
  }
}

export namespace PaymentHistoryTab {
  export enum Page {
    INITIAL,
    PAYMENT_DETAILS
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  backgroundColor: '#FFFFFF'
};

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

const NO_RECORDS_IMAGE_STYLE: React.CSSProperties = {
  width: '200px',
  height: '150px',
  backgroundColor: 'transparent',
  marginTop: '30px',
  marginBottom: '10px'
};

const NOTHING_FOUND_HEADING_STYLE: React.CSSProperties = {

};

const NOTHING_FOUND_TEXT_STYLE: React.CSSProperties = {

};
