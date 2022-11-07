import * as React from 'react';
import { Footer, HeaderController, HeaderModel } from '../../components';
import { DisplayMode, User } from '../../definitions';

interface Properties {
  /** The display mode. */
  displayMode: DisplayMode;

  /** The current session user. */
  account: User;

  /** The model used for the Header. */
  headerModel: HeaderModel;

  /** The background color for the header. */
  headerStyle?: React.CSSProperties;

  /** Whether the footer has a background image or not. */
  isFooterBackgroundImage?: boolean;

  /** The color code for the footer background. */
  footerBackgroundColor?: string;

  /** Indicates the menu button was clicked. */
  onMenuClick: (path: string) => void;

  /** Indicates the log out button was clicked. */
  onLogOut: () => void;

  /** Indicates the Log In button is clicked. */
  onLogInButton: () => void;

  /** Indicates the join button is clicked. */
  onJoinButton: () => void;

  /** Indicates a button is clicked on header. */
  onButtonWithDropDownClick: (label: string) => void;

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
        <HeaderController
          account={this.props.account}
          displayMode={this.props.displayMode}
          model={this.props.headerModel}
          onLogOut={this.props.onLogOut}
          onMenuClick={this.props.onMenuClick}
          onLogInButton={this.props.onLogInButton}
          onJoinButton={this.props.onJoinButton}
          onButtonClick={this.props.onButtonWithDropDownClick}
          headerStyle={this.props.headerStyle}
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
