import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import { User } from '../definitions';
import { CloseBurgerButton } from './close_burger_button';
import { HamburgerButton } from './hamburger_button';
import { OrangeTextHeaderLogo } from './header_logo';

/** Describes the drop down menu properties. */
interface Properties {
  account: User;
  style?: React.CSSProperties;

  /** Indicates the dropdown menu item is clicked. */
  onMenuClick: (path: string) => void;
}

interface State {
  isClicked: boolean;
}

/** Implements the Burger menu component for the header. */
export class BurgerMenuLeft extends React.Component<Properties,
    State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isClicked: false
    }
    this._dropDownRef = React.createRef<HTMLDivElement>();
  }

  public render(): JSX.Element {
    if (this.state.isClicked) {
      const item = (() => {
        if (!this.props.account || this.props.account.id === -1) {
          return (
            <div
                key='whatisnea'
                style={MENU_ITEM_STYLE}
                className={css(styles.menuItem)}
                onClick={(event: any) => this.handleMenuClick(
                  '/what_is_nea', event)}
            >
              What is NEA?
            </div>);
        }
        return(
          <div
              key='yourevents'
              style={MENU_ITEM_STYLE}
              className={css(styles.menuItem)}
              onClick={(event: any) => this.handleMenuClick(
                `/your_events/${this.props.account.id}`, event)}
          >
            Your Events
          </div>);
      })();
      const marginRight = 15;
      return (
        <div
            style={{...CONTAINER_STYLE, ...this.props.style}}
            ref={this._dropDownRef}
        >
          <CloseBurgerButton onClick={this.handleDropDown} />
          <div style={MENU_CONTAINER_STYLE} >
            <div
              style={{...ARROW_UP_BACKGROUND_STYLE,
                marginRight: `-${marginRight}px`}}
            />
            <div
              style={{...ARROW_UP_STYLE, marginRight: `-${marginRight}px`}}
            />
            <OrangeTextHeaderLogo style={LOGO_STYLE} />
            {item}
            <div
                key='help'
                style={MENU_ITEM_STYLE}
                className={css(styles.menuItem)}
                onClick={(event: any) => this.handleMenuClick('/help', event)}
            >
              Help
            </div>
          </div>
        </div>);
    }
    return (
      <div
          style={{...CONTAINER_STYLE, ...this.props.style}}
          ref={this._dropDownRef}
      >
        <HamburgerButton onClick={this.handleDropDown} />
      </div>);
  }

  public componentDidMount(): void {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  public componentWillUnmount(): void {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  private handleMenuClick = (path: string, event: any) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onMenuClick(path);
  }

  private handleClickOutside: { (event: any): void } = (
      event: React.MouseEvent) => {
    if (this.state.isClicked &&
        !this._dropDownRef.current.contains(event.target as Node)) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({
        isClicked: false
      });
    }
  }

  private handleDropDown = () => {
    this.setState((state) => {
      return { isClicked: !state.isClicked };
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
  backgroundColor: 'transparent',
  border: 'none',
  outline: 'none',
  cursor: 'pointer'
};

const MENU_CONTAINER_STYLE: React.CSSProperties = {
  zIndex: 13,
  position: 'absolute',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  border: '1px solid #969696',
  borderRadius: '4px',
  backgroundColor: '#F6F6F6',
  top: '37px',
  left: '2px',
  width: '350px'
};

const ARROW_UP_BACKGROUND_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  position: 'absolute',
  top: '-7px',
  left: '6px',
  width: '0',
  height: '0',
  borderLeft: '7px solid transparent',
  borderRight: '7px solid transparent',
  borderBottom: '7px solid #969696',
  zIndex: 2
};

const ARROW_UP_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  position: 'absolute',
  top: '-5px',
  left: '8px',
  width: '0',
  height: '0',
  borderLeft: '5px solid transparent',
  borderRight: '5px solid transparent',
  borderBottom: '5px solid #F6F6F6',
  zIndex: 14
};

const MENU_ITEM_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  height: '20px',
  width: '100%',
  cursor: 'pointer',
  textDecoration: 'none',
  fontFamily: 'Source Sans Pro',
  color: '#969696',
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '18px',
  fontStyle: 'normal',
  padding: '0px 15px 0px 15px',
  margin: '0px 0px 20px 0px',
  textTransform: 'capitalize'
};

const LOGO_STYLE: React.CSSProperties = {
  padding: '0px 15px 0px 15px',
  margin: '20px 0px 20px 0px'
};

const styles = StyleSheet.create({
  menuItem: {
    ':hover': {
      color: '#F26B55'
    },
    ':focus': {
      color: '#F26B55'
    },
    ':focus-within': {
      color: '#F26B55'
    },
    ':active': {
      color: '#AA2F19'
    }
  }
});
