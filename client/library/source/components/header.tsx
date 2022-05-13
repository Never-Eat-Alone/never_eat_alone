import * as React from 'react';
import { DisplayMode } from '../definitions/display_mode';
import { WhiteTextHeaderLogo } from './header_logo';

interface Properties {
  /** The display mode based on the user's display dimensions. */
  displayMode: DisplayMode;

  /** Indicates the menu item inside the dropdown is clicked. */
  onMenuClick: (path: string) => void;

  /** Indicates the log in button is clicked. */
  onLogInButton: () => void;

  /** Indicates the join button is clicked. */
  onJoinButton: () => void;
}

export class Header extends React.Component<Properties> {
  public render(): JSX.Element {
    const headerMode = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        return HEADER_DESKTOP_STYLE;
      }
      if (this.props.displayMode === DisplayMode.TABLET) {
        return HEADER_TABLET_STYLE;
      }
      return HEADER_MOBILE_STYLE;
    })();
    const leftSide = (() => {
      if (this.props.displayMode === DisplayMode.DESKTOP ||
          this.props.displayMode === DisplayMode.TABLET) {
        return <WhiteTextHeaderLogo />;
      }
      return (
        <BurgerMenuLeft
          onLogIn={this.props.onLogInButton}
          onSignUp={this.props.onJoinButton}
          onMenuClick={this.props.onMenuClick}
        />);
    })();
    const rightSideButtons = [];
    if (this.props.displayMode === DisplayMode.DESKTOP) {
      rightSideButtons.push(
        <AccentButton
          key='JOIN US'
          label='JOIN US'
          isDisabled={false}
          onClick={this.props.onJoinButton}
          style={{ marginLeft: '20px' }}
        />);
      rightSideButtons.push(
        <InvertedSecondaryButton
          key='LOGIN'
          label='LOGIN'
          onClick={this.props.onLogInButton}
          isDisabled={false}
          style={{ marginLeft: '30px' }}
        />);
      rightSideButtons.push(
        <SmallWhiteTextLink
          key='What is NEA?'
          style={{marginLeft: '30px'}}
          label='What is NEA?'
          to='/what_is_nea'
        />);
      rightSideButtons.push(
        <SmallWhiteTextLink
          style={{marginLeft: '30px'}}
          key='Explore Restaurants'
          label='Explore Restaurants'
          to='/explore_restaurants'
        />);
      rightSideButtons.push(
        <SmallWhiteTextLink
          style={{marginLeft: '30px'}}
          key='Explore Events'
          label='Explore Events'
          to='/explore_events'
        />);
    }
    if (this.props.displayMode === DisplayMode.TABLET) {
      rightSideButtons.push(
        <BurgerMenuRight
          key='TABLET'
          onLogIn={this.props.onLogInButton}
          onSignUp={this.props.onJoinButton}
          onMenuClick={this.props.onMenuClick}
        />);
    }
    if (this.props.displayMode === DisplayMode.MOBILE) {
      rightSideButtons.push(
        <AccentButton
          key='JOIN US'
          label='JOIN US'
          isDisabled={false}
          onClick={this.props.onJoinButton}
          style={{ marginLeft: '20px' }}
        />);
      rightSideButtons.push(
        <InvertedSecondaryButton
          key='LOGIN'
          label='LOGIN'
          onClick={this.props.onLogInButton}
          isDisabled={false}
          style={{ marginLeft: '30px' }}
        />);
    }
    return (
      <div style={{...HEADER_CONTAINER_STYLE, ...headerMode}} >
        {leftSide}
        <div style={RIGHT_CONTAINER_STYLE} >{rightSideButtons}</div>
      </div>);
  }
}

const HEADER_CONTAINER_STYLE: React.CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'transparent',
  minHeight: '29px'
};

const HEADER_DESKTOP_STYLE: React.CSSProperties = {
  width: '1201px',
  padding: '0px 20px 0px 20px'
};

const HEADER_TABLET_STYLE: React.CSSProperties = {
  width: '100%',
  padding: '0px 30px 0px 30px'
};

const HEADER_MOBILE_STYLE: React.CSSProperties = {
  width: '100%',
  padding: '0px 15px 0px 15px'
};

const RIGHT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'flex-end',
  alignItems: 'center',
  backgroundColor: 'transparent'
};
