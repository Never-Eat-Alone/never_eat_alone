import * as React from 'react';
import { DisplayMode, User } from '../definitions';
import { HeaderLogo } from './header_logo';
import { WhiteNavLink } from './nav_link';
import { ProfileMenu } from './profile_menu';
import { AccentTextButton, InvertedSecondaryTextButton } from './text_button';

interface Properties {
  /** The display mode based on the user's display dimensions. */
  displayMode: DisplayMode;

  /** Indicates the current user account. */
  account: User;

  /** Represents the user profile image source. */
  profileImageSrc?: string;

  /** Indicates the menu item inside the dropdown is clicked. */
  onMenuClick: (path: string) => void;

  /** Indicates the log in button is clicked. */
  onLogInButton: () => void;

  /** Indicates the join button is clicked. */
  onJoinButton: () => void;

  /** Indicates the log out button is clicked. */
  onLogOut: () => void;
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
    const rightSideButtons = [];
    if (this.props.account && this.props.account.id !== -1) {
      rightSideButtons.push(
        <ProfileMenu
          key='ProfileMenu'
          displayMode={this.props.displayMode}
          userId={this.props.account.id}
          imageSrc={this.props.profileImageSrc ||
            'resources/header/icons/avatar_default.svg'}
          onMenuClick={this.props.onMenuClick}
          onLogOut={this.props.onLogOut}
          style={PROFILE_MENU_STYLE}
        />);
      rightSideButtons.push(
        <WhiteNavLink
          key='DisplayName'
          label={this.props.account.name}
          to={`/users/profile/${this.props.account.id}`}
          style={USER_DISPLAYNAME_STYLE}
        />);
    } else {
      if (this.props.displayMode === DisplayMode.DESKTOP) {
        rightSideButtons.push(
          <AccentTextButton
            key='JOIN US'
            label='join us'
            disabled={false}
            onClick={this.props.onJoinButton}
            style={ACCENT_BUTTON_STYLE}
          />);
        rightSideButtons.push(
          <InvertedSecondaryTextButton
            key='LOGIN'
            label='login'
            onClick={this.props.onLogInButton}
            disabled={false}
            style={DESKTOP_INVERTED_SECONDARY_BUTTON_STYLE}
          />);
        rightSideButtons.push(
          <WhiteNavLink
            key='What is NEA?'
            label='What is NEA?'
            to='/what_is_nea'
          />);
      }
      if (this.props.displayMode === DisplayMode.TABLET) {
        rightSideButtons.push(
          <AccentTextButton
            key='JOIN US'
            label='join us'
            disabled={false}
            onClick={this.props.onJoinButton}
            style={ACCENT_BUTTON_STYLE}
          />);
        rightSideButtons.push(
          <InvertedSecondaryTextButton
            key='LOGIN'
            label='login'
            onClick={this.props.onLogInButton}
            disabled={false}
            style={INVERTED_SECONDARY_BUTTON_STYLE}
          />);
        rightSideButtons.push(
          <WhiteNavLink
            key='What is NEA?'
            label='What is NEA?'
            to='/what_is_nea'
          />);
      }
      if (this.props.displayMode === DisplayMode.MOBILE) {
        rightSideButtons.push(
          <AccentTextButton
            key='JOIN US'
            label='join us'
            disabled={false}
            onClick={this.props.onJoinButton}
            style={ACCENT_BUTTON_STYLE}
          />);
        rightSideButtons.push(
          <InvertedSecondaryTextButton
            key='LOGIN'
            label='login'
            onClick={this.props.onLogInButton}
            disabled={false}
            style={INVERTED_SECONDARY_BUTTON_STYLE}
          />);
      }
    }
    return (
      <div style={{...HEADER_CONTAINER_STYLE, ...headerMode}} >
        <HeaderLogo displayMode={this.props.displayMode} />
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
  height: '54px'
};

const HEADER_DESKTOP_STYLE: React.CSSProperties = {
  width: '1200px',
  paddingLeft: '20px',
  paddingRight: '20px'
};

const HEADER_TABLET_STYLE: React.CSSProperties = {
  width: '100%',
  paddingLeft: '30px',
  paddingRight: '30px'
};

const HEADER_MOBILE_STYLE: React.CSSProperties = {
  width: '100%',
  paddingLeft: '15px',
  paddingRight: '15px'
};

const RIGHT_CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'flex-end',
  alignItems: 'center',
  backgroundColor: 'transparent'
};

const ACCENT_BUTTON_STYLE: React.CSSProperties = {
  marginLeft: '20px'
};

const DESKTOP_INVERTED_SECONDARY_BUTTON_STYLE: React.CSSProperties = {
  marginLeft: '30px'
};

const INVERTED_SECONDARY_BUTTON_STYLE: React.CSSProperties = {
  marginLeft: '20px'
};

const PROFILE_MENU_STYLE: React.CSSProperties = {
  marginLeft: '15px'
};

const USER_DISPLAYNAME_STYLE: React.CSSProperties = {
  margin: '0px 0px 0px 20px',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
};
