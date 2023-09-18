import * as React from 'react';
import * as Router from 'react-router-dom';
import { Modal } from '../components';
import { DisplayMode, getDisplayMode, User, UserProfileImage } from
  '../definitions';
import { InviteAFoodieModalController, JoinModalController,
  LogInModalController, PartnerWithUsModalController } from '../modals';
import { ApplicationModel } from './application_model';
import { DeactivateAccountSurveyPageController } from
  './deactivate_account_survey_page';
import { CookiesPolicyPage } from './cookie_policy_page';
import { DeletedAccountSurveyPageController } from
  './deleted_account_survey_page';
import { DiningEventPageController } from './dining_event_page';
import { EditProfilePageController } from './edit_profile_page';
import { EmailConfirmationPageController } from './email_confirmation_page';
import { ErrorPage403, ErrorPage404, ErrorPage500 } from './error_page';
import { ForgotPasswordPageController } from './forgot_password_page';
import { HelpPage } from './help_page';
import { HomePageController } from './home_page';
import { InviteAFoodiePageController } from './invite_a_foodie_page';
import { JoinPageController } from './join_page';
import { LogInPageController } from './log_in_page';
import { PartnerWithUsController } from './partner_with_us_page';
import { PrivacyPolicyPage } from './privacy_policy_page';
import { ProfilePageController } from './profile_page';
import { ResetPasswordPageController } from './reset_password_page';
import { SettingsPageController } from './settings_page';
import { Shell } from './shell';
import { SignUpPageController } from './sign_up_page';
import { SitemapPage } from './sitemap_page';
import { TermsOfUsePage } from './terms_of_use_page';
import { WhatIsNeaPage } from './what_is_nea_page';

type TParams = { id?: string, userId?: string };

interface Properties extends Router.RouteComponentProps<TParams> {
  model: ApplicationModel;
}

interface State {
  displayMode: DisplayMode;
  account: User;
  isLoaded: boolean;
  hasError: boolean;
  isJoinButtonClicked: boolean;
  isLogInButtonClicked: boolean;
  isInviteAFoodieButtonClicked: boolean;
  isPartnerWithUsButtonClicked: boolean;
  accountProfileImage: UserProfileImage;
  hasJoinedEvent: boolean;
  hasRemovedSeat: boolean;
  hasProfileChanged: boolean;
}

export class ApplicationController extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      displayMode: DisplayMode.DESKTOP,
      account: User.makeGuest(),
      isLoaded: false,
      hasError: false,
      isJoinButtonClicked: false,
      isLogInButtonClicked: false,
      isInviteAFoodieButtonClicked: false,
      isPartnerWithUsButtonClicked: false,
      accountProfileImage: UserProfileImage.default(),
      hasJoinedEvent: false,
      hasRemovedSeat: false,
      hasProfileChanged: false
    };
  }

  public render(): JSX.Element {
    if (this.state.hasError) {
      return <ErrorPage500 displayMode={this.state.displayMode} />;
    }
    if (!this.state.isLoaded) {
      return <div />;
    }
    const pathname = this.props.location.pathname;
    const JoinModal = (this.state.isJoinButtonClicked &&
      <Modal>
        <JoinModalController
          displayMode={this.state.displayMode}
          model={this.props.model.joinModel}
          onClose={this.handleJoinModalClose}
        />
      </Modal> || null);
    const logInModal = (this.state.isLogInButtonClicked &&
      <Modal>
        <LogInModalController
          displayMode={this.state.displayMode}
          model={this.props.model.logInModel}
          onClose={this.handleLogInModalClose}
          onLogInSuccess={this.handleLogInSuccess}
        />
      </Modal> || null);
    const inviteAFoodieModal = (this.state.isInviteAFoodieButtonClicked &&
      <Modal>
        <InviteAFoodieModalController
          displayMode={this.state.displayMode}
          model={this.props.model.inviteAFoodieModel}
          maxContentLength={280}
          onClose={this.handleInviteAFoodieModalClose}
        />
      </Modal> || null);
    const partnerWithUsModal = (this.state.isPartnerWithUsButtonClicked &&
      <Modal>
        <PartnerWithUsModalController
          displayMode={this.state.displayMode}
          model={this.props.model.partnerWithUsModel}
          onClose={this.handlePartnerWithUsModalClose}
        />
      </Modal> || null);
    return (
      <div id='app_top' style={CONTAINER_STYLE} >
        <Shell
          displayMode={this.state.displayMode}
          account={this.state.account}
          accountProfileImageSrc={this.state.accountProfileImage.src}
          headerStyle={this.handleHeaderAndFooter(pathname).headerStyle}
          onLogOut={this.handleLogOut}
          onLogInButton={this.handleLogInButton}
          onJoinButton={this.handleJoinButton}
          onInviteAFoodieButton={this.handleInviteAFoodieButton}
        >
          {JoinModal}
          {logInModal}
          {inviteAFoodieModal}
          {partnerWithUsModal}
          <Router.Switch>
            <Router.Route
              path='/confirmation_tokens/:id'
              render={this.renderEmailConfirmationPage}
            />
            <Router.Route
              path='/cookies_policy'
              render={this.renderCookiesPolicy}
            />
            <Router.Route
              path='/deactivate_account_survey'
              render={this.renderDeactivateAccountSurvey}
            />
            <Router.Route
              path='/deleted_account_survey'
              render={this.renderDeletedAccountSurvey}
            />
            <Router.Route
              path='/dining_events/:id'
              render={this.renderDiningEvents}
            />
            <Router.Route
              path='/error_page_403'
              render={this.renderErrorPage403}
            />
            <Router.Route
              path='/error_page_404'
              render={this.renderErrorPage404}
            />
            <Router.Route
              path='/error_page_500'
              render={this.renderErrorPage500}
            />
            <Router.Route
              path='/users/edit_profile/:id'
              render={this.renderEditProfilePage}
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
              path='/join'
              render={this.renderJoin}
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
              path='/reset-password'
              render={this.renderResetPassword}
            />
            <Router.Route
              path='/settings/:id'
              render={this.renderSettings}
            />
            <Router.Route
              path='/sign_up/:id'
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
              render={this.renderProfilePage}
            />
            <Router.Route
              path='/what_is_nea'
              render={this.renderWhatIsNea}
            />
            <Router.Route
              exact
              path='/'
              render={this.renderHomePage}
            />
            <Router.Route render={this.renderErrorPage404} />
          </Router.Switch>
        </Shell>
      </div>);
  }

  public async componentDidMount(): Promise<void> {
    this.handleSize();
    window.addEventListener('resize', this.handleSize);
    try {
      await this.props.model.load();
      this.setState(
        {
          isLoaded: true,
          hasError: false,
          account: this.props.model.account,
          accountProfileImage: this.props.model.accountProfileImage
        });
    } catch (error) {
      this.setState({ isLoaded: true, hasError: true });
    }
  }

  public componentWillUnmount(): void {
    window.removeEventListener('resize', this.handleSize);
  }

  private updateAccount = async (newUser: User): Promise<void> => {
    try {
      await this.props.model.setAccount(newUser);
      this.setState({
        account: newUser,
        accountProfileImage: this.props.model.accountProfileImage
      });
    } catch {
      this.setState({ hasError: true });
    }
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

  private handlePartnerWithUsButton = () => {
    this.setState({ isPartnerWithUsButtonClicked: true });
  }

  private handlePartnerWithUsModalClose = () => {
    this.setState({ isPartnerWithUsButtonClicked: false });
  }

  private handleLogInSuccess = async (account: User) => {
    if (this.state.isLogInButtonClicked) {
      this.handleLogInModalClose();
    }
    await this.updateAccount(account);
  }

  private handleResetPasswordSuccess = async (account: User) => {
    await this.updateAccount(account);
    this.props.history.push('/');
  }

  private handleSignUpSuccess = (account: User, accountProfileImage:
      UserProfileImage) => {
    this.setState({
      account: account,
      accountProfileImage: accountProfileImage
    });
  }

  private handleLogOut = async () => {
    const isLoggedOut = await this.props.model.logInModel.logOut();
    if (isLoggedOut) {
      await this.updateAccount(User.makeGuest());
    }
  }

  private renderEmailConfirmationPage = (
      {match}: Router.RouteComponentProps<TParams>) => {
    return <EmailConfirmationPageController
      displayMode={this.state.displayMode}
      model={this.props.model.getEmailConfirmationPageModel(match.params.id)}
    />;
  }

  private renderSettings = ({match}: Router.RouteComponentProps<TParams>) => {
    const id = Number(match.params.id);
    return <SettingsPageController
      displayMode={this.state.displayMode}
      model={this.props.model.getSettingsPageModel(id)}
      account={this.state.account}
      onLogOut={this.handleLogOut}
    />;
  }

  private renderDeactivateAccountSurvey = () => {
    return <DeactivateAccountSurveyPageController
      account={this.state.account}
      displayMode={this.state.displayMode}
      model={this.props.model.deactivateAccountSurveyModel}
    />;
  }

  private renderDiningEvents = (
      {match}: Router.RouteComponentProps<TParams>) => {
    const id = Number(match.params.id);
    return <DiningEventPageController
      displayMode={this.state.displayMode}
      model={this.props.model.getDiningEventPageModel(id)}
      account={this.state.account}
      eventId={id}
      profileImageSrc={this.state.accountProfileImage.src}
      onJoinEvent={() => this.handleJoinEvent(id)}
      onRemoveSeat={() => this.handleRemoveSeat(id)}
    />;
  }

  private renderEditProfilePage = (
      {match}: Router.RouteComponentProps<TParams>) => {
    const id = Number(match.params.id);
    return <EditProfilePageController
        displayMode={this.state.displayMode}
        account={this.state.account}
        model={this.props.model.getEditProfilePageModel(id)}
        onSaveSuccess={() => this.handleSaveEditProfile(id)}
        onCancel={this.handleEditProfilePageCancel}
    />;
  }

  private handleEditProfilePageCancel = () => {
    console.log('handleEditProfilePageCancel');
    const userId = this.state.account.id;
    this.props.history.push(`/users/profile/${userId}`);
  }

  private handleSaveEditProfile = async (id: number) => {
    if (this.state.account.id === -1) {
      this.handleLogInButton();
      return;
    }
    const editProfilePageModel = this.props.model.getEditProfilePageModel(id);
    try {
      await this.props.model.updateEditProfilePageModel(id,
        editProfilePageModel);
      this.setState({ hasProfileChanged: true });
    } catch {
      this.setState({ hasError: true });
    }
  }

  private renderJoin = () => {
    return <JoinPageController
      displayMode={this.state.displayMode}
      model={this.props.model.joinModel}
    />;
  }

  private renderDeletedAccountSurvey = () => {
    return <DeletedAccountSurveyPageController
      account={this.state.account}
      displayMode={this.state.displayMode}
      model={this.props.model.deletedAccountSurveyModel}
    />;
  }

  private handleJoinEvent = async (eventId: number) => {
    if (this.state.account.id === -1) {
      this.handleLogInButton();
      return;
    }
    const diningEventModel = this.props.model.getDiningEventPageModel(eventId);
    try {
      await diningEventModel.joinEvent(this.state.account.id,
        this.state.account.name, this.state.accountProfileImage.src);
      await this.props.model.updateDiningEventPageModel(eventId,
        diningEventModel);
      this.setState({ hasJoinedEvent: true });
    } catch {
      this.setState({ hasError: true });
    }
  }

  private handleRemoveSeat = async (eventId: number) => {
    if (this.state.account.id === -1) {
      this.handleLogInButton();
      return;
    }
    const diningEventModel = this.props.model.getDiningEventPageModel(eventId);
    try {
      await diningEventModel.removeSeat(this.state.account.id,
        this.state.account.name, this.state.accountProfileImage.src);
      await this.props.model.updateDiningEventPageModel(eventId,
        diningEventModel);
      this.setState({ hasRemovedSeat: true });
    } catch {
      this.setState({ hasError: true });
    }
  }

  private renderProfilePage = (
      {match}: Router.RouteComponentProps<TParams>) => {
    const id = Number(match.params.id);
    return <ProfilePageController
      account={this.state.account}
      profileId={id}
      displayMode={this.state.displayMode}
      model={this.props.model.getProfilePageModel(id)}
      onReportClick={() => {}}
    />;
  }

  private renderHomePage = () => {
    return <HomePageController
      displayMode={this.state.displayMode}
      account={this.state.account}
      model={this.props.model.homePageModel}
      onJoinButton={this.handleJoinButton}
      onPartnerWithUsButton={this.handlePartnerWithUsButton}
    />;
  }

  private renderSignUp = ({match}: Router.RouteComponentProps<TParams>) => {
    const id = Number(match.params.id);
    return <SignUpPageController
      {...this.props}
      displayMode={this.state.displayMode}
      account={this.state.account}
      model={this.props.model.getSignUpPageModel(id)}
      onSignUpSuccess={this.handleSignUpSuccess}
    />;
  }

  private renderWhatIsNea = () => {
    return <WhatIsNeaPage
      displayMode={this.state.displayMode}
      onCreateAccountClick={this.handleJoinButton}
      onGetInTouchClick={this.handlePartnerWithUsButton}
    />;
  }

  private renderPartnerWithUs = () => {
    return <PartnerWithUsController
      displayMode={this.state.displayMode}
      model={this.props.model.partnerWithUsModel}
    />;
  }

  private renderForgotPassword = () => {
    return <ForgotPasswordPageController
      displayMode={this.state.displayMode}
      model={this.props.model.forgotPasswordPageModel}
    />;
  }

  private renderInviteAFoodie = () => {
    return <InviteAFoodiePageController
      displayMode={this.state.displayMode}
      model={this.props.model.inviteAFoodieModel}
      maxContentLength={280}
    />;
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
    return <HelpPage
      displayMode={this.state.displayMode} 
      onInviteAFoodieClick={this.handleInviteAFoodieButton}
    />;
  }

  private renderSiteMap = () => {
    return <SitemapPage />;
  }

  private renderLogIn = () => {
    return <LogInPageController
      displayMode={this.state.displayMode}
      model={this.props.model.logInModel}
      onLogInSuccess={this.handleLogInSuccess}
    />;
  }

  private renderResetPassword = () => {
    const params = new URLSearchParams(this.props.location.search);
    const token = params.get('token') || '';
    return <ResetPasswordPageController
      displayMode={this.state.displayMode}
      model={this.props.model.resetPasswordPageModel}
      token={token}
      onSaveAndLogInSuccess={this.handleResetPasswordSuccess}
    />;
  }

  private renderErrorPage403 = () => {
    return <ErrorPage403 displayMode={this.state.displayMode} />;
  }

  private renderErrorPage404 = () => {
    return <ErrorPage404 displayMode={this.state.displayMode} />;
  }

  private renderErrorPage500 = () => {
    return <ErrorPage500 displayMode={this.state.displayMode} />;
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
