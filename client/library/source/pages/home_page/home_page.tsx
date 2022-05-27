import * as React from 'react';
import { AlbumSummary, ExploreEventsSummary, Hero, PartnerWithUsSummary
} from '../../components';
import { DisplayMode, EventCardSummary, SocialMediaImage, User
} from '../../definitions';

interface Properties {
  /** The current user. */
  account: User;

  /** The display mode. */
  displayMode: DisplayMode;

  /** The page error code. */
  errorCode: HomePage.ErrorCode;
  imageList: SocialMediaImage[];
  eventList: EventCardSummary[];

  /** Indicates the join button is clicked. */
  onJoinButton: () => void;
}

/** Displays the HomePage. */
export class HomePage extends React.Component<Properties> {
  public render(): JSX.Element {
    if (this.props.errorCode !== HomePage.ErrorCode.NONE) {
      return <div />;
    }
    return (
      <div style={CONTAINER_STYLE} >
        <Hero
          displayMode={this.props.displayMode}
          onJoinButton={this.props.onJoinButton}
        />
        <ExploreEventsSummary
          displayMode={this.props.displayMode}
          eventList={this.props.eventList}
          isLoggedIn={this.props.account && this.props.account.id !== -1}
        />
        <AlbumSummary
          displayMode={this.props.displayMode}
          imageList={this.props.imageList}
        />
        <PartnerWithUsSummary displayMode={this.props.displayMode} />
      </div>);
  }
}

/** HomePage Error Codes. */
export namespace HomePage {
  export enum ErrorCode {
    NONE,
    NO_CONNECTION
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%'
};
