import * as React from 'react';
import * as Router from 'react-router-dom';
import { DisplayMode, getDisplayMode } from '../definitions';
import { ApplicationModel } from './application_model';
import { CookiesPolicyPage } from './cookie_policy_page';
import { HelpPage } from './help_page';
import { PrivacyPolicyPage } from './privacy_policy_page';
import { Shell } from './shell';
import { TermsOfUsePage } from './terms_of_use_page';
import { WhatIsNeaPage } from './what_is_nea_page';

type TParams = { id?: string, userId?: string };
interface Properties extends Router.RouteComponentProps<TParams> {
  model: ApplicationModel;
}

interface State {
  displayMode: DisplayMode;
  isLoaded: boolean;
  hasError: boolean;
  redirect: string;
  lastPage: string;
}

export class ApplicationController extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      displayMode: DisplayMode.DESKTOP,
      isLoaded: false,
      hasError: false,
      redirect: null,
      lastPage: '/'
    };
  }

  public render(): JSX.Element {
    if (this.state.hasError) {
      return <div>Error Page</div>;
    }
    if (!this.state.isLoaded) {
      return <div />;
    }
    const pathname = this.props.location.pathname;
    return (
      <div id='app_top' style={CONTAINER_STYLE} >
        <Shell
          displayMode={this.state.displayMode}
          account={this.props.model.getAccount()}
          headerModel={this.props.model.getHeaderModel()}
          headerStyle={this.handleHeaderAndFooter(pathname).headerStyle}
          onLogOut={() => {}}
          onMenuClick={this.handleMenuClick}
          onLogInButton={() => {}}
          onJoinButton={() => {}}
          onButtonWithDropDownClick={this.handleButtonWithDropDownClick}
          onInviteAFoodieButton={() => {}}
        >
          <Router.Switch>
            <Router.Route
              path='/cookies_policy'
              render={this.renderCookiesPolicy}
            />
            <Router.Route
              path='/dining_events/:id'
              render={this.renderDiningEvents}
            />
            <Router.Route
              path='/forgot_password'
              render={this.renderForgotPassword}
            />
            <Router.Route
              path='/help'
              render={this.renderHelp}
            />
            <Router.Route
              path='/invite_a_foodie'
              render={this.renderInviteFoodie}
            />
            <Router.Route
              path='/log_in'
              render={this.renderLogIn}
            />
            <Router.Route
              path='/partner_with_us'
              render={this.renderPartnerWithUs}
            />
            <Router.Route
              path='/privacy_policy'
              render={this.renderPrivacyPolicy}
            />
            <Router.Route
              path='/restaurants/:id'
              render={this.renderRestaurants}
            />
            <Router.Route
              path='/settings/:userId'
              render={this.renderSettings}
            />
            <Router.Route
              path='/sign_up'
              render={this.renderSignUp}
            />
            <Router.Route
              path='/sitemap'
              render={this.renderSiteMap}
            />
            <Router.Route
              path='/terms_of_use'
              render={this.renderTermsOfUse}
            />
            <Router.Route
              path='/users/profile/:id'
              render={this.renderUserProfile}
            />
            <Router.Route
              path='/what_is_nea'
              render={this.renderWhatIsNea}
            />
            <Router.Route
              path='/'
              render={this.renderHomePage}
            />
            <Router.Route render={this.renderPageNotFound} />
          </Router.Switch>
        </Shell>
      </div>);
  }

  public async componentDidMount(): Promise<void> {
    this.handleSize();
    window.addEventListener('resize', this.handleSize);
    try {
      await this.props.model.load();
      this.setState({ isLoaded: true, hasError: false });
    } catch (error) {
      this.setState({ hasError: true, isLoaded: true });
    }
  }

  public componentDidUpdate(): void {
    if (this.state.redirect) {
      if (
        this.state.redirect === '/sign_up' ||
        this.state.redirect === '/log_in'
      ) {
        this.setState({
          redirect: null,
          lastPage: '/'
        });
      } else {
        this.setState({
          redirect: null,
          lastPage: this.state.redirect
        });
      }
    }
  }

  public componentWillUnmount(): void {
    window.removeEventListener('resize', this.handleSize);
  }

  private handleSize = () => {
    this.setState({
      displayMode: getDisplayMode(window.innerWidth)
    });
  }

  private handleMenuClick = (path: string) => {
    this.setState({ redirect: path });
  }

  private handleButtonWithDropDownClick = (label: string) => {}

  private renderSettings = (
      {match}: Router.RouteComponentProps<TParams>) => {
    const userId = match.params.userId;
    return <div>Settings Page for id: {userId}</div>;
  }

  private renderDiningEvents = (
      {match}: Router.RouteComponentProps<TParams>) => {
    const id = match.params.id;
    return <div>Dining Event Page for id: {id}</div>;
  }

  private renderRestaurants = (
      {match}: Router.RouteComponentProps<TParams>) => {
    const id = parseInt(match.params.id);
    return (<div>Restaurant page {id.toString()}</div>);
  }

  private renderUserProfile = (
      {match}: Router.RouteComponentProps<TParams>) => {
    const id = match.params.id;
    return <div>User Profile Page for id: {id}</div>;
  }

  private renderHomePage = () => {
    return <div>Home Page Controller</div>;
  }

  private renderSignUp = () => {
    return <div>Sign Up Page</div>;
  }

  private renderWhatIsNea = () => {
    return <WhatIsNeaPage displayMode={this.state.displayMode}
      onCreateAccount={() => {}} />;
  }

  private renderPartnerWithUs = () => {
    return <div>Partner With Us</div>;
  }

  private renderForgotPassword = () => {
    return <div>Forgot Password Page</div>;
  }

  private renderInviteFoodie = () => {
    return <div>Invite a Foodie</div>;
  }

  private renderCookiesPolicy = () => {
    return <CookiesPolicyPage displayMode={this.state.displayMode} />;
  }

  private renderPrivacyPolicy = () => {
    return <PrivacyPolicyPage displayMode={this.state.displayMode} />;
  }

  private renderTermsOfUse = () => {
    return <TermsOfUsePage displayMode={this.state.displayMode} />;
  }

  private renderHelp = () => {
    return <HelpPage displayMode={this.state.displayMode} 
      onInviteAFoodieClick={()=> {}} />;
  }

  private renderSiteMap = () => {
    return <div>Site Map</div>;
  }

  private renderLogIn = () => {
    return <div>Log in Controller</div>;
  }

  private renderPageNotFound = () => {
    return <div>Page Not Found</div>;
  }

  private handleHeaderAndFooter = (pathname: string) => {
    if (pathname === '/what_is_nea') {
      return ({
        headerStyle: {
          position: 'absolute',
          top: '0px',
          backgroundColor: 'transparent',
          zIndex: 2
        } as React.CSSProperties
      });
    }
    if (pathname === '/') {
      return ({
        headerStyle: {
          backgroundColor: 'transparent',
          position: 'relative',
          zIndex: 'auto'
        } as React.CSSProperties
      });
    }
    return ({
      headerStyle: {
        backgroundColor: '#F26B55',
        position: 'relative',
        zIndex: 'auto'
      } as React.CSSProperties
    });
  }
}

const CONTAINER_STYLE: React.CSSProperties = {
  width: '100%',
  height: '100%',
  overflow: 'auto'
};
