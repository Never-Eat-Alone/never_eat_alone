import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';

/** Describes the credit card drop down menu properties. */
interface Properties {
  /** Displayed value on the menu card. */
  displayedValue: number;

  /** List of values in the dropdown menu. */
  values: number[];

  /** Style that is applied to the container. */
  style?: React.CSSProperties;

  /** Indicates an item from the menu is clicked. */
  onMenuItemClick: (value: number) => void;
}

interface State {
  isDisplayed: boolean;
}

function formatNumber(value: number) {
  if (value < 10) {
    return `0${value}`;
  }
  return value.toString();
}

/** Implements the numbered dropdown menu component. */
export class NumberedDropdownMenu extends React.Component<Properties,
    State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isDisplayed: false
    }
    this._dropDownRef = React.createRef<HTMLDivElement>();
  }

  public render(): JSX.Element {
    const dropDownMenu = (() => {
      if (this.state.isDisplayed) {
        const items = [];
        for (const value of this.props.values) {
          const stringValue = formatNumber(value);
          items.push(
            <div
                style={{...MENU_ITEM_STYLE, ...TEXT_STYLE}}
                key={`dropdown-item-${value}`}
                className={css(styles.menuItem)}
                onClick={() => this.props.onMenuItemClick(value)}
            >
              {stringValue}
            </div>);
        }
        return (
          <div style={MENU_CONTAINER_STYLE} >
            {items}
          </div>);
      }
      return null;
    })();
    const displayedCardBorderStyle = (() => {
      if (this.state.isDisplayed) {
        return {
          border: '1px solid #969696', borderBottom: 'none',
          borderRadius: '4px 4px 0px 0px'
        };
      }
      return {};
    })();
    return (
      <div
          style={{...CONTAINER_STYLE, ...this.props.style}}
          ref={this._dropDownRef}
      >
        <div
            style={{...DISPLAYED_CARD_STYLE, ...displayedCardBorderStyle}}
            className={css(styles.displayedCard)}
            onClick={this.handleDropDownClick}
        >
          <div style={TEXT_STYLE} >
            {formatNumber(this.props.displayedValue)}
          </div>
          <div style={VECTOR_CONTAINER_STYLE} >
            <img
              style={VECTOR_ICON_STYLE}
              src={'resources/icons/vector_orange.svg'}
              alt='Vector Icon'
            />
          </div>
        </div>
        {dropDownMenu}
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
    if (this.state.isDisplayed &&
        !this._dropDownRef.current.contains(event.target as Node)) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({
        isDisplayed: false
      });
    }
  }

  private handleDropDownClick = () => {
    this.setState((state) => {
      return { isDisplayed: !state.isDisplayed };
    });
  }

  private _dropDownRef: React.RefObject<HTMLDivElement>;
}

const CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  outline: 'none',
  cursor: 'pointer',
  backgroundColor: '#FFFFFF',
  borderRadius: '4px',
  width: '100%'
};

const MENU_CONTAINER_STYLE: React.CSSProperties = {
  position: 'absolute',
  zIndex: 14,
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '100%',
  border: '1px solid #969696',
  top: '37px',
  left: '0px',
  borderRadius: '0px 0px 4px 4px',
  overflowY: 'auto'
};

const MENU_ITEM_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '37px',
  minHeight: '37px',
  width: '100%',
  cursor: 'pointer',
  padding: '0px 12px 0px 9px',
  backgroundColor: '#FFFFFF'
};

const DISPLAYED_CARD_STYLE: React.CSSProperties = {
  ...MENU_ITEM_STYLE,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  borderRadius: '4px',
  border: '1px solid #CCCCCC',
  padding: '9px 12px 0px 9px'
};

const TEXT_STYLE: React.CSSProperties = {
  fontFamily: 'Source Sans Pro',
  fontStyle: 'normal',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  color: '#000000'
};

const VECTOR_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '14px',
  height: '7px',
  marginTop: '6px',
  marginLeft: '13px'
};

const VECTOR_ICON_STYLE: React.CSSProperties = {
  minWidth: '14px',
  minHeight: '7px',
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent'
};

const styles = StyleSheet.create({
  displayedCard: {
    ':hover': {
      borderColor: '#969696'
    },
    ':focus': {
      borderColor: '#969696'
    },
    ':focus-within': {
      borderColor: '#969696'
    },
    ':active': {
      borderColor: '#969696'
    }
  },
  menuItem: {
    ':hover': {
      backgroundColor: '#F6F6F6'
    },
    ':focus': {
      backgroundColor: '#F6F6F6'
    },
    ':focus-within': {
      backgroundColor: '#F6F6F6'
    },
    ':active': {
      backgroundColor: '#F6F6F6'
    }
  }
});
