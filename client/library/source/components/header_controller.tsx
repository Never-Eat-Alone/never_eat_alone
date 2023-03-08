import * as React from 'react';
import { DisplayMode, User } from '../definitions';
import { Header } from './header';
import { HeaderModel } from './header_model';

interface Properties {
  /** Current session user. */
  account: User;

  /** The display mode based on the user's display dimensions. */
  displayMode: DisplayMode;

  /** The header model. */
  model: HeaderModel;

  /** The background color for the header. */
  headerStyle?: React.CSSProperties;

  /** Indicates the log out option is clicked. */
  onLogOut: () => void;

  /** Indicates the log in button is clicked. */
  onLogInButton: () => void;

  /** Indicates the join button is clicked. */
  onJoinButton: () => void;

  /** Indicates the notification button is clicked. */
  onButtonClick: (label: string) => void;
}

interface State {
  /** Indicates whether the page is loaded or not. */
  isLoaded: boolean;

  /** Indicates whether an error occured while loading or not. */
  hasError: boolean;
}

/** Implements the HeaderController on the customer side. */
export class HeaderController extends React.Component<Properties, State> {
  private static defaultProps: Partial<Properties> = {
    headerStyle: { backgroundColor: '#F26B55' }
  };
  constructor(props: Properties) {
    super(props);
    this.state = {
      isLoaded: false,
      hasError: false
    }
  }

  public render(): JSX.Element {
    if (this.state.isLoaded && !this.state.hasError) {
      return (
        <div id='shell-header' style={CONTAINER_STYLE} >
          <Header {...this.props}
            profileImageSrc={this.props.model.profileImageSrc}
          />
        </div>);
    }
    return <div />;
  }

  public async componentDidMount(): Promise<void> {
    try {
      await this.props.model.load();
      this.setState({ hasError: false, isLoaded: true });
    } catch (error) {
      this.setState({ hasError: true, isLoaded: true });
    }
    return;
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%'
};
