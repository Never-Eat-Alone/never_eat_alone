import * as React from 'react';
import { DisplayMode } from '../definitions/display_mode';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
type Subtract<T, K> = Omit<T, keyof K>;

/** The properties that the BaseComponent needs to have. */
interface Properties {
  displayMode: DisplayMode;
}

interface State {
  displayMode: DisplayMode;
}

/**
 * Returns a component that monitors the display mode.
 * @param BaseComponent - A component that has a displayMode prop that needs
 *        to be updated on a display mode change.
 */
export function displayModeRenderer<T extends Properties>(
    BaseComponent: React.ComponentType<T>) {
  const MEDIA_QUERY_LIST = {
    [DisplayMode.MOBILE]: matchMedia('(max-width: 767px)'),
    [DisplayMode.TABLET]: matchMedia(
      '(min-width: 768px) and (max-width: 1200px)'),
    [DisplayMode.DESKTOP]: matchMedia('(min-width: 1201px)')
  };
  return class extends React.Component<Subtract<T, Properties>,
      State> {
    constructor(props: T) {
      super(props);
      this.state = {
        displayMode: this.getDisplayMode()
      };
    }

    public componentDidMount(): void {
      const onMatchesMobile = this.getMediaQueryListener(DisplayMode.MOBILE);
      const onMatchesTablet = this.getMediaQueryListener(DisplayMode.TABLET);
      const onMatchesDesktop = this.getMediaQueryListener(DisplayMode.DESKTOP);
      this.mediaQueries = [
        [MEDIA_QUERY_LIST[DisplayMode.MOBILE], onMatchesMobile],
        [MEDIA_QUERY_LIST[DisplayMode.TABLET], onMatchesTablet],
        [MEDIA_QUERY_LIST[DisplayMode.DESKTOP], onMatchesDesktop]
      ];
      for(const [mediaQueryList, listener] of this.mediaQueries) {
        mediaQueryList.addListener(listener);
      }
    }

    public componentWillUnmount(): void {
      for(const [mediaQueryList, listener] of this.mediaQueries) {
        mediaQueryList.removeListener(listener);
      }
    }

    public render(): JSX.Element {
      const C = BaseComponent as any;
      return <C {...this.props} displayMode={this.state.displayMode}/>;
    }

    public getMediaQueryListener = (displayMode: DisplayMode) => {
      return (mql: MediaQueryListEvent) => {
        if(mql.matches) {
          this.setState({displayMode});
        }
      };
    }

    public getDisplayMode(): DisplayMode {
      return [
        DisplayMode.MOBILE, DisplayMode.TABLET, DisplayMode.DESKTOP].find(
          (displayMode) => MEDIA_QUERY_LIST[displayMode].matches);
    }

    public mediaQueries: [MediaQueryList, (ev: MediaQueryListEvent) => void][];
  };
}
