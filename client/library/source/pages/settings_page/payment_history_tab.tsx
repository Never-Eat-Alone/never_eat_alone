import { css, StyleSheet } from 'aphrodite';
import { format } from 'date-fns';
import * as React from 'react';
import * as Router from 'react-router-dom';
import { RedNavLink, SecondaryTextButton } from '../../components';
import { DisplayMode, getCreditCardTypeName, PaymentRecord, PaymentStatus
} from '../../definitions';

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
          <div style={NOT_FOUND_CONTAINER_STYLE} >
            <img
              style={NO_RECORDS_IMAGE_STYLE}
              src='resources/illustrations/not_found.svg'
              alt='Nothing found icon'
            />
            <h1 style={NOTHING_FOUND_HEADING_STYLE} >Nothing here yet!</h1>
            <div style={NOTHING_FOUND_TEXT_STYLE} >
              This is where your payment history and receipts will appear.
              For now, go&nbsp;
              <RedNavLink
                  style={EXPLORE_EVENT_LINK_STYLE}
                  to='/explore_events'
                  label='join some events!'
              />
            </div>
          </div>);
      }
      const rows = [];
      for (let i = 0; i < this.props.paymentRecords.length; ++i) {
        const record = this.props.paymentRecords[i];
        rows.push(
          <PaymentRecordCard key={'PaymentRecordCard' + record.id}
            displayMode={this.props.displayMode} paymentRecord={record}
            onViewReceiptClick={() => this.handleViewReceipt(record)}
          />);
        if (i !== this.props.paymentRecords.length - 1) {
          rows.push(<div key={'divider' + i} style={DIVIDER_STYLE} />);
        }
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
  const charges = [];
  for (const transaction of props.paymentRecord.paymentTransactions) {
    switch (transaction.status) {
      case PaymentStatus.CHARGED:
        charges.push(
          <div key={'transaction' + transaction.id} style={COST_TEXT_STYLE} >
            ${transaction.amount.toFixed(2).toString()} paid via&nbsp;
            {getCreditCardTypeName(transaction.cardType)}
            &nbsp;on <span style={DATE_TEXT_STYLE} >
            {format(transaction.processedAt, 'MMM d, yyyy')}
            </span>
          </div>);
          break;
      case PaymentStatus.WILL_BE_CHARGED:
        charges.push(<div key={transaction.id} style={HOLD_AMOUNT_TEXT_STYLE} >
          ${transaction.amount.toFixed(2).toString()} will be charged on&nbsp;
          {format(transaction.scheduledAt, 'MMM d, yyyy')}
        </div>);
        break;
      case PaymentStatus.ON_HOLD:
        charges.push(<div key={transaction.id} style={HOLD_AMOUNT_TEXT_STYLE} >
          ${transaction.amount.toFixed(2).toString()} hold on your card
        </div>);
        break;
      case PaymentStatus.REFUNDED:
        charges.push(<div key={transaction.id} style={HOLD_AMOUNT_TEXT_STYLE} >
          ${transaction.amount.toFixed(2).toString()} refunded
        </div>);
        break;
      case PaymentStatus.PARTIALLY_REFUNDED:
        charges.push(<div key={transaction.id} style={HOLD_AMOUNT_TEXT_STYLE} >
          ${transaction.amount.toFixed(2).toString()} partially refunded
        </div>);
    }
  }
  const viewReceiptButton = (() => {
    switch (props.displayMode) {
      case DisplayMode.DESKTOP:
        return (
          <SecondaryTextButton
            style={VIEW_RECEIPT_BUTTON_STYLE}
            label='View Receipt'
            onClick={props.onViewReceiptClick}
          />);
      case DisplayMode.TABLET:
        return (
          
        );
    }
  })();
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
          <p style={EVENT_TITLE_STYLE} >
            {props.paymentRecord.eventCardSummary.eventTitle}
          </p>
          {charges}
        </div>
      </div>
      {viewReceiptButton}
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
  alignItems: 'flex-start',
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
  width: '100%'
};

const IMAGE_DETAILS_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '20px'
};

const EVENT_IMAGE_CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  width: '150px',
  height: '100px'
};

const EVENT_IMAGE_STYLE: React.CSSProperties = {
  width: '100%',
  minWidth: '150px',
  height: '100%',
  minHeight: '100px',
  backgroundColor: 'transparent',
  borderRadius: '4px',
  objectFit: 'cover'
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
  height: '100%',
  width: 'calc(100% - 170px)'
};

const VIEW_RECEIPT_BUTTON_STYLE: React.CSSProperties = {
  width: '144px',
  minWidth: '144px',
  height: '35px',
  minHeight: '35px',
  marginRight: '20px'
};

const NOT_FOUND_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%'
};

const EVENT_TITLE_STYLE: React.CSSProperties = {
  padding: '0px',
  margin: '0px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  width: '100%'
};

const COST_TEXT_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000',
  padding: '0px',
  margin: '0px',
  width: '100%',
  whiteSpace: 'pre'
};

const DATE_TEXT_STYLE: React.CSSProperties = {
  color: '#969696'
};

const EXPLORE_EVENT_LINK_STYLE: React.CSSProperties = {
  fontSize: '14px',
  lineHeight: '18px',
  height: 'auto',
  width: 'auto'
};

const HOLD_AMOUNT_TEXT_STYLE: React.CSSProperties = {
  ...COST_TEXT_STYLE,
  color: '#969696'
};

const DIVIDER_STYLE: React.CSSProperties = {
  height: '1px',
  backgroundColor: '#CCCCCC',
  width: '100%'
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
