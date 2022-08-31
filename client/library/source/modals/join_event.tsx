import { format } from 'date-fns';
import * as React from 'react';
import { CloseButton, PrimaryTextButton } from '../components';
import { DisplayMode } from '../definitions';

interface Properties {
  displayMode: DisplayMode;

  /** The fee associated with the event. */
  eventFee: number;

  /** The tax rate of the event such as 0.13 for ontario. */
  taxRate: number;

  /** The title of the event. */
  eventTitle: string;

  /** The source address of the event image. */
  imageSrc: string;

  /** The start date of the event. */
  eventStartDate: Date;

  /** Indicates the join button is clicked. */
  onJoinEvent: () => void;

  /** Indicates the close button is clicked. */
  onClose: () => void;
}

/** Displays the Join Event Modal. */
export class JoinEventModal extends React.Component<Properties> {
  public render(): JSX.Element {
    const { containerStyle } = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return {
          containerStyle: DESKTOP_CONTAINER_STYLE
        };
      }
      if (this.props.displayMode === DisplayMode.TABLET) {
        return {
          containerStyle: TABLET_CONTAINER_STYLE
        };
      }
      return {
        containerStyle: MOBILE_CONTAINER_STYLE
      };
    })();
    const joinButton = (() => {
      if (this.props.eventFee == 0) {
        return (
          <PrimaryTextButton
            style={JOIN_BUTTON_STYLE}
            label='Join Event'
            labelStyle={JOIN_BUTTON_TEXT_STYLE}
            onClick={this.props.onJoinEvent}
          />);
      }
      return null;
    })();
    return (
      <div style={containerStyle} >
        <CloseButton
          style={CLOSE_BUTTON_STYLE}
          displayMode={DisplayMode.MOBILE}
          onClick={this.props.onClose}
        />
        <div style={COST_DETAILS_CONTAINER_STYLE} >
          <h2 style={CHECKOUT_TITLE_STYLE} >Event Checkout</h2>
          <div style={DIVIDER_STYLE} />
          <div style={COST_BREAKDOWN_TOTAL_CONTAINER_STYLE} >
            <div style={COLUMN_CONTAINER_STYLE} >
              <div style={EVENT_FEE_ROW_STYLE} >
                <div style={EVENT_FEE_BOLD_TEXT_STYLE} >Event Fee</div>
                <div style={EVENT_PRICE_STYLE} >
                  CAD ${this.props.eventFee.toString()}
                </div>
              </div>
            </div>
            <div style={COLUMN_CONTAINER_STYLE} >
              <div style={PRICE_DIVIDER_STYLE} />
              <div style={EVENT_FEE_ROW_STYLE} >
                <div style={GREY_TEXT_STYLE} >Subtotal</div>
                <div style={EVENT_PRICE_STYLE} >
                  CAD ${this.props.eventFee.toString()}
                </div>
              </div>
              <div style={EVENT_FEE_ROW_STYLE} >
                <div style={GREY_TEXT_STYLE} >Tax</div>
                <div style={EVENT_PRICE_STYLE} >
                  CAD ${this.getTaxAmount(this.props.eventFee,
                  this.props.taxRate).toString()}
                </div>
              </div>
              <div style={EVENT_FEE_ROW_STYLE} >
                <div style={EVENT_FEE_BOLD_TEXT_STYLE} >Total Payment</div>
                <div style={EVENT_PRICE_STYLE} >
                  CAD ${(this.getTaxAmount(this.props.eventFee,
                    this.props.taxRate) + this.props.eventFee).toString()}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={PAYMENT_METHOD_CONTAINER_STYLE} >
          <img
            style={IMAGE_STYLE}
            src={this.props.imageSrc}
            alt='Event Image'
          />
          <div style={EVENT_PAYMENT_TEXT_CONTAINER_STYLE} >
            <div style={EVENT_NAME_DATE_CONTAINER_STYLE} >
              <h1 style={EVENT_NAME_STYLE} >{this.props.eventTitle}</h1>
              <div style={EVENT_DATE_STYLE} >
                {format(this.props.eventStartDate,
                'eeee, MMMM do, yyyy')}{' at '}{format(
                this.props.eventStartDate, 'h:mm aa')}
              </div>
            </div>
            {joinButton}
          </div>
        </div>
      </div>);
  }

  private getTaxAmount = (fee: number, taxRate: number) => {
    return fee * taxRate;
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  position: 'relative',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  borderRadius: '4px',
  overflow: 'hidden'
};

const DESKTOP_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTAINER_STYLE,
  width: '675px',
  height: '410px'
};

const TABLET_CONTAINER_STYLE: React.CSSProperties = {
  ...CONTAINER_STYLE,
  width: '675px',
  height: '410px'
};

const MOBILE_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  position: 'relative',
  width: '100%',
  boxShadow: '0px 1px 4px rgba(86, 70, 40, 0.25)',
  borderRadius: '4px',
  overflow: 'hidden'
};

const CLOSE_BUTTON_STYLE: React.CSSProperties = {
  position: 'absolute',
  top: '8px',
  right: '8px'
};

const COST_DETAILS_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  backgroundColor: '#FFFFFF',
  width: '375px',
  height: '100%',
  padding: '40px 20px'
};

const COST_BREAKDOWN_TOTAL_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  width: '100%',
  height: 'calc(100% - 40px)'
};

const COLUMN_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%'
};

const PAYMENT_METHOD_CONTAINER_STYLE: React.CSSProperties = {
  backgroundColor: '#F6F6F6',
  width: '300px',
  height: '100%'
};

const CHECKOUT_TITLE_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '20px',
  lineHeight: '30px',
  color: '#969696',
  padding: '0px',
  margin: '0px',
  width: '100%'
};

const DIVIDER_STYLE: React.CSSProperties = {
  height: '1px',
  width: '100%',
  backgroundColor: '#969696',
  marginTop: '20px'
};

const EVENT_FEE_ROW_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  padding: '0px 10px',
  height: '38px'
};

const EVENT_FEE_BOLD_TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000'
};

const EVENT_PRICE_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000'
};

const PRICE_DIVIDER_STYLE: React.CSSProperties = {
  height: '1px',
  width: '100%',
  backgroundColor: '#EFEFEF'
};

const GREY_TEXT_STYLE: React.CSSProperties = {
  marginTop: '10px',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#969696'
};

const IMAGE_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '150px',
  minHeight: '150px',
  minWidth: '300px',
  objectFit: 'cover'
};

const EVENT_PAYMENT_TEXT_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  width: '100%',
  height: 'calc(100% - 150px)',
  padding: '20px 20px 40px 20px',
  backgroundColor: 'transparent'
};

const EVENT_NAME_DATE_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%'
};

const EVENT_NAME_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  width: '100%',
  fontFamily: 'Oswald',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '20px',
  lineHeight: '30px',
  color: '#000000',
  padding: '0px',
  margin: '0px'
};

const EVENT_DATE_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 600,
  fontSize: '14px',
  lineHeight: '25px',
  color: '#BF408D',
  marginTop: '5px',
  width: '100%'
};

const JOIN_BUTTON_STYLE: React.CSSProperties = {
  width: '100%',
  height: '40px'
};

const JOIN_BUTTON_TEXT_STYLE: React.CSSProperties = {
  fontWeight: 600,
  fontSize: '12px',
  lineHeight: '15px',
};
