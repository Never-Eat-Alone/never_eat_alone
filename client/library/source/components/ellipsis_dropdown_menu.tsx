import { css, StyleSheet } from 'aphrodite';
import * as React from 'react';
import { EllipsisButton } from './ellipsis_button';

/** Describes the drop down menu properties. */
interface Properties {
  style?: React.CSSProperties;

  /** Indicates the report menu item is clicked. */
  onReportClick: () => void;
}

interface State {
  isClicked: boolean;
}

/** Implements the Ellipsis dropdown menu. */
export class EllipsisDropdownMenu extends React.Component<Properties, State> {
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
        return (
          <div style={MENU_CONTAINER_STYLE} >
            <div
              style={{...ARROW_UP_BACKGROUND_STYLE, marginLeft: '-15px'}}
            />
            <div
              style={{...ARROW_UP_STYLE, marginLeft: '-15px'}}
            />
            <div
                style={MENU_ITEM_STYLE}
                className={css(styles.menuItem)}
                onClick={this.handleReportClick}
            >
              Report
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
        <EllipsisButton onClick={this.handleDropDown} />
        {dropDownMenu}
      </div>);
  }

  public componentDidMount(): void {
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  public componentWillUnmount(): void {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  private handleReportClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.onReportClick();
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
  width: '80px',
  border: '1px solid #969696',
  borderRadius: '4px',
  backgroundColor: '#F6F6F6',
  top: '37px',
  right: '-4px'
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
