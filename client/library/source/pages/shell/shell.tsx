import * as React from 'react';
import { Footer, Header } from '../../components';
import { DisplayMode, User } from '../../definitions';

interface Properties {
  /** The display mode. */
  displayMode: DisplayMode;

  /** The current session user. */
  account: User;

  accountProfileImageSrc: string;

  /** The background color for the header. */
  headerStyle?: React.CSSProperties;

  /** Whether the footer has a background image or not. */
  isFooterBackgroundImage?: boolean;

  /** The color code for the footer background. */
  footerBackgroundColor?: string;

  /** Indicates the log out button was clicked. */
  onLogOut: () => void;

  /** Indicates the Log In button is clicked. */
  onLogInButton: () => void;

  /** Indicates the join button is clicked. */
  onJoinButton: () => void;

  /** Indicates the invite a foodie button is clicked. */
  onInviteAFoodieButton: () => void;
}

export class Shell extends React.Component<Properties> {
  private static defaultProps: Partial<Properties> = {
    headerStyle: { backgroundColor: '#F26B55' },
    isFooterBackgroundImage: true,
    footerBackgroundColor: '#EFEFEF'
  };

  public render(): JSX.Element {
    return (
      <div style={CONTAINER_STYLE} >
        <Header
          account={this.props.account}
          displayMode={this.props.displayMode}
          accountProfileImageSrc={this.props.accountProfileImageSrc}
          headerStyle={this.props.headerStyle}
          onLogOut={this.props.onLogOut}
          onLogInButton={this.props.onLogInButton}
          onJoinButton={this.props.onJoinButton}
        />
          {this.props.children}
        <Footer
          displayMode={this.props.displayMode}
          isBackgroundImage={this.props.isFooterBackgroundImage}
          backgroundColor={this.props.footerBackgroundColor}
          onInviteAFoodie={this.props.onInviteAFoodieButton}
        />
      </div>);
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  position: 'relative',
  display:'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  margin: 0
};
