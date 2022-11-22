import * as React from 'react';
import * as Router from 'react-router-dom';
import { Modal } from '../components';
import { DisplayMode, getDisplayMode, User } from '../definitions';
import { InviteAFoodieModalController, JoinController, LogInModalController,
  PartnerWithUsModalController } from '../modals';
import { ApplicationModel } from './application_model';
import { CookiesPolicyPage } from './cookie_policy_page';
import { DiningEventPageController } from './dining_event_page';
import { HelpPage } from './help_page';
import { HomePageController } from './home_page';
import { PartnerWithUsController } from './partner_with_us_page';
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
  user: User;
  isLoaded: boolean;
  hasError: boolean;
  redirect: string;
  lastPage: string;
  isJoinButtonClicked: boolean;
  isLogInButtonClicked: boolean;
  isInviteAFoodieButtonClicked: boolean;
  isPartnerWithUsButtonClicked: boolean;
}

export class ApplicationController extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      displayMode: DisplayMode.DESKTOP,
      user: User.makeGuest(),
      isLoaded: false,
      hasError: false,
      redirect: null,
      lastPage: '/',
      isJoinButtonClicked: false,
      isLogInButtonClicked: false,
      isInviteAFoodieButtonClicked: false,
      isPartnerWithUsButtonClicked: false
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
    const JoinModal = (this.state.isJoinButtonClicked &&
      <Modal>
        <JoinController
          displayMode={this.state.displayMode}
          model={this.props.model.getJoinModel()}
          onClose={this.handleJoinModalClose}
        />
      </Modal> || null);
    const logInModal = (this.state.isLogInButtonClicked &&
      <Modal>
        <LogInModalController
          displayMode={this.state.displayMode}
          model={this.props.model.getLogInModel()}
          onClose={this.handleLogInModalClose}
          onLogInSuccess={this.handleLogInSuccess}
        />
      </Modal> || null);
    const inviteAFoodieModal = (this.state.isInviteAFoodieButtonClicked &&
      <Modal>
        <InviteAFoodieModalController
          displayMode={this.state.displayMode}
          model={this.props.model.getInviteAFoodieModel()}
          maxContentLength={280}
          onClose={this.handleInviteAFoodieModalClose}
        />
      </Modal> || null);
    const partnerWithUsModal = (this.state.isPartnerWithUsButtonClicked &&
      <Modal>
        <PartnerWithUsModalController
          displayMode={this.state.displayMode}
          model={this.props.model.getPartnerWithUsModel()}
          onClose={this.handlePartnerWithUsModalClose}
        />
      </Modal> || null);
    return (
      <div id='app_top' style={CONTAINER_STYLE} >
        <Shell
          displayMode={this.state.displayMode}
          account={this.props.model.getAccount()}
          headerModel={this.props.model.getHeaderModel()}
          headerStyle={this.handleHeaderAndFooter(pathname).headerStyle}
          onLogOut={this.handleLogOut}
          onMenuClick={this.handleMenuClick}
          onLogInButton={this.handleLogInButton}
          onJoinButton={this.handleJoinButton}
          onButtonWithDropDownClick={this.handleButtonWithDropDownClick}
          onInviteAFoodieButton={this.handleInviteAFoodieButton}
        >
          {JoinModal}
          {logInModal}
          {inviteAFoodieModal}
          {partnerWithUsModal}
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
              render={this.renderInviteAFoodie}
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

  private handleJoinButton = () => {
    this.setState({ isJoinButtonClicked: true });
  }

  private handleJoinModalClose = () => {
    this.setState({ isJoinButtonClicked: false });
  }

  private handleLogInButton = () => {
    this.setState({ isLogInButtonClicked: true });
  }

  private handleLogInModalClose = () => {
    this.setState({ isLogInButtonClicked: false });
  }

  private handleInviteAFoodieButton = () => {
    this.setState({ isInviteAFoodieButtonClicked: true });
  }

  private handleInviteAFoodieModalClose = () => {
    this.setState({ isInviteAFoodieButtonClicked: false });
  }

  private onPartnerWithUsButton = () => {
    this.setState({ isPartnerWithUsButtonClicked: true });
  }

  private handlePartnerWithUsModalClose = () => {
    this.setState({ isPartnerWithUsButtonClicked: false });
  }

  private handleLogInSuccess = (user: User) => {
    this.setState({ user });
  }

  private handleLogOut = () => {
    this.setState({ user: User.makeGuest() });
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
    const id = Number(match.params.id);
    const model = this.props.model.getDiningEventPageModel(id);
    return <DiningEventPageController
      displayMode={this.state.displayMode}
      model={model}
      onRemoveSeat={() => {}}
      onJoinEvent={() => {}}
    />;
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
    return <HomePageController
      displayMode={this.state.displayMode}
      account={this.props.model.getAccount()}
      model={this.props.model.getHomePageModel()}
      onJoinButton={this.handleJoinButton}
      onPartnerWithUsButton={this.onPartnerWithUsButton}
    />;
  }

  private renderSignUp = () => {
    return <div>Sign Up Page</div>;
  }

  private renderWhatIsNea = () => {
    return <WhatIsNeaPage displayMode={this.state.displayMode}
      onCreateAccountClick={() => {}} onGetInTouchClick={() => {}} />;
  }

  private renderPartnerWithUs = () => {
    return <PartnerWithUsController displayMode={this.state.displayMode}
      model={this.props.model.getPartnerWithUsModel()} />;
  }

  private renderForgotPassword = () => {
    return <div>Forgot Password Page</div>;
  }

  private renderInviteAFoodie = () => {
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
      onInviteAFoodieClick={this.handleInviteAFoodieButton} />;
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
          position: 'absolute',
          top: '0px',
          backgroundColor: 'transparent',
          zIndex: 2
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
