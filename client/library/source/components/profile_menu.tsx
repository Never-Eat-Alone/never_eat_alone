import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import { DisplayMode } from '../definitions';
import { ProfileRoundButton } from './profile_round_button';

/** Describes the drop down menu properties. */
interface Properties {
  displayMode: DisplayMode

  /** Source address of the user profile image. */
  imageSrc?: string;

  /** User id number. */
  userId: number;

  /** Style that is applied to the container. */
  style?: React.CSSProperties;

  /** Indicates the dropdown menu item is clicked. */
  onMenuClick: (path: string) => void;

  /** Indicates the logout option is clicked. */
  onLogOut?: () => void;
}

interface State {
  isClicked: boolean;
}

/** Implements the Profile menu component for the header. */
export class ProfileMenu extends React.Component<Properties,
    State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isClicked: false
    }
    this._dropDownRef = React.createRef<HTMLDivElement>();
  }

  public render(): JSX.Element {
    const dropDownMenu = (() => {
      if (this.state.isClicked) {
        const marginLeft = (this.props.displayMode ===
          DisplayMode.MOBILE) && 30 || 15;
        return (
          <div
              style={{...MENU_CONTAINER_STYLE,
                width: (this.props.displayMode === DisplayMode.MOBILE) &&
                '375px' || '212px'}}
          >
            <div
              style={{...ARROW_UP_BACKGROUND_STYLE,
                marginLeft: `-${marginLeft}px`}}
            />
            <div
              style={{...ARROW_UP_STYLE, marginLeft: `-${marginLeft}px`}}
            />
            <div
                style={MENU_ITEM_STYLE}
                className={css(styles.menuItem)}
                onClick={(event: any) => this.handleMenuClick(
                  `/users/profile/${this.props.userId}`, event)}
            >
              Profile
            </div>
            <div style={BOTTOM_BORDER_STYLE} />
            <div
                style={MENU_ITEM_STYLE}
                className={css(styles.menuItem)}
                onClick={(event: any) => this.handleMenuClick(
                  '/invite_a_foodie', event)}
            >
              Invite A Foodie
            </div>
            <div style={BOTTOM_BORDER_STYLE} />
            <div
                style={MENU_ITEM_STYLE}
                className={css(styles.menuItem)}
                onClick={(event: any) => this.handleMenuClick(
                  `/settings/${this.props.userId}`, event)}
            >
              Settings
            </div>
            <div
                style={{...MENU_ITEM_STYLE, marginTop: '0px'}}
                className={css(styles.menuItem)}
                onClick={this.props.onLogOut}
            >
              Logout
            </div>
          </div>);
      }
      return null;
    })();

    return (
      <div
          style={{...CONTAINER_STYLE, ...this.props.style}}
          ref={this._dropDownRef}
      >
        <ProfileRoundButton
          imageSrc={this.props.imageSrc}
          onClick={this.handleDropDown}
        />
        {dropDownMenu}
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
  alignItems: 'flex-end',
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
  right: '2px'
};

const ARROW_UP_BACKGROUND_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  position: 'absolute',
  top: '-7px',
  right: '6px',
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
  right: '8px',
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
  margin: '20px 0px 20px 0px',
  textTransform: 'capitalize'
};

const BOTTOM_BORDER_STYLE: React.CSSProperties = {
  width: 'calc(100% - 30px)',
  margin: '0px 15px 0px 15px',
  borderBottom: '1px solid #969696'
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
