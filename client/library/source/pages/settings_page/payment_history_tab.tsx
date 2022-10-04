import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import * as Router from 'react-router-dom';
import { DisplayMode, getCreditCardTypeName, PaymentRecord
} from '../../definitions';
import { SecondaryTextButton } from '../../components';

interface Properties {
  displayMode: DisplayMode;

  /** List of the user's payment records. */
  paymentRecords: PaymentRecord[];
}

interface State {
  page: PaymentHistoryTab.Page;
  selectedRecord: PaymentRecord;
}

/** Dislays the payment history tab inside the setting page. */
export class PaymentHistoryTab extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      page: PaymentHistoryTab.Page.INITIAL,
      selectedRecord: PaymentRecord.noRecord()
    };
  }

  public render(): JSX.Element {
    if (this.state.page === PaymentHistoryTab.Page.PAYMENT_DETAILS) {
      return <div>Payment details</div>;
    }
    const recordRows = (() => {
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
              For now, go join some events!
            </div>
          </React.Fragment>);
      }
      const rows = [];
      for (const record of this.props.paymentRecords) {
        rows.push(<PaymentRecordCard key={record.id}
          displayMode={this.props.displayMode} paymentRecord={record}
          onViewReceiptClick={() => this.handleViewReceipt(record)}
          />);
      }
      return rows;
    })();
    return (
      <div style={CONTAINER_STYLE} >
        <h1 style={PAGE_HEADING_STYLE} >Payment Methods</h1>
        {recordRows}
      </div>);
  }

  private handleViewReceipt = (record: PaymentRecord) => {
    this.setState({
      page: PaymentHistoryTab.Page.PAYMENT_DETAILS,
      selectedRecord: record
    });
  }
}

interface PaymentRecordCardProp {
  displayMode: DisplayMode;
  paymentRecord: PaymentRecord;
  onViewReceiptClick: () => void;
}

function PaymentRecordCard(props: PaymentRecordCardProp) {
  return (
    <div style={CARD_CONTAINER_STYLE} >
      <div style={IMAGE_DETAILS_CONTAINER_STYLE} >
        <div style={EVENT_IMAGE_CONTAINER_STYLE} >
          <img
            style={EVENT_IMAGE_STYLE}
            src={props.paymentRecord.eventCardSummary.imageSrc}
            alt='Event Image'
          />
          <Router.Link
            style={EVENT_BUTTON_STYLE}
            to={`events/${props.paymentRecord.eventCardSummary.eventId}`}
            className={css(styles.eventLink)}
          >
            Event Page
          </Router.Link>
        </div>
        <div style={DETAILS_CONTAINER_STYLE} >
          <p>{props.paymentRecord.eventCardSummary.eventTitle}</p>
          <div>${props.paymentRecord.amountCharged.toString()} paid via
            {getCreditCardTypeName(props.paymentRecord.paymentCard.creditType)}
            on {props.paymentRecord.transactionDate.toString()}
          </div>
        </div>
      </div>
      <SecondaryTextButton
        style={VIEW_RECEIPT_BUTTON_STYLE}
        label='View Receipt'
        onClick={props.onViewReceiptClick}
      />
    </div>);
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
  backgroundColor: '#FFFFFF',
  gap: '10px'
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
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '23px',
  lineHeight: '34px',
  height: '34px',
  color: '#000000',
  padding: '0px',
  margin: '0px 0px 10px 0px'
};

const NOTHING_FOUND_TEXT_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  textAlign: 'center',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  padding: '0px',
  margin: '0px',
  whiteSpace: 'pre'
};

const CARD_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  height: '100px'
};

const IMAGE_DETAILS_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '20px',
  height: '100%'
};

const EVENT_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  width: '150px',
  height: '100%'
};

const EVENT_IMAGE_STYLE: React.CSSProperties = {
  width: '100%',
  minWidth: '150px',
  height: '100%',
  minHeight: '100px',
  backgroundColor: 'transparent'
};

const EVENT_BUTTON_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  position: 'absolute',
  bottom: '12px',
  right: '10px',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '85px',
  height: '28px',
  borderRadius: '4px',
  border: '1px solid #FFFFFF',
  backgroundColor: 'rgba(0, 0, 0, 0.4)',
  boxShadow: 'none',
  outline: 'none',
  textDecoration: 'none',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#FFFFFF'
};

const DETAILS_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  padding: '15px',
  gap: '5px',
  height: '100%'
};

const VIEW_RECEIPT_BUTTON_STYLE: React.CSSProperties = {
  width: '144px',
  minWidth: '144px',
  height: '35px',
  minHeight: '35px',
  marginRight: '20px'
};

const styles = StyleSheet.create({
  eventLink: {
    ':hover': {
      boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)'
    },
    ':focus': {
      boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)'
    },
    ':focus-within': {
      boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)'
    }
  }
});
