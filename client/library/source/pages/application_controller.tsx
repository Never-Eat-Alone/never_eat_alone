import * as React from 'react';
import * as Router from 'react-router-dom';
import { Modal } from '../components';
import { DisplayMode, getDisplayMode, User, UserProfileImage, UserStatus
} from '../definitions';
import { InviteAFoodieModalController, JoinController, LogInModalController,
  PartnerWithUsModalController } from '../modals';
import { ApplicationModel } from './application_model';
import { DeactivateAccountSurveyPageController }
from './deactivate_account_survey_page';
import { CookiesPolicyPage } from './cookie_policy_page';
import { DeletedAccountSurveyPageController
} from './deleted_account_survey_page';
import { DiningEventPageController } from './dining_event_page';
import { EditProfilePageController } from './edit_profile_page';
import { ForgotPasswordPageController } from './forgot_password_page';
import { HelpPage } from './help_page';
import { HomePageController } from './home_page';
import { InviteAFoodiePageController } from './invite_a_foodie_page';
import { JoinPageController } from './join_page';
import { LogInPageController } from './log_in_page';
import { PartnerWithUsController } from './partner_with_us_page';
import { PrivacyPolicyPage } from './privacy_policy_page';
import { ProfilePageController } from './profile_page';
import { SettingsPageController } from './settings_page';
import { Shell } from './shell';
import { SignUpPageController } from './sign_up_page';
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
  redirect: string;
  lastPage: string;
  isJoinButtonClicked: boolean;
  isLogInButtonClicked: boolean;
  isInviteAFoodieButtonClicked: boolean;
  isPartnerWithUsButtonClicked: boolean;
  accountProfileImage: UserProfileImage;
}

export class ApplicationController extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      displayMode: DisplayMode.DESKTOP,
      account: User.makeGuest(),
      isLoaded: false,
      hasError: false,
      redirect: null,
      lastPage: '/',
      isJoinButtonClicked: false,
      isLogInButtonClicked: false,
      isInviteAFoodieButtonClicked: false,
      isPartnerWithUsButtonClicked: false,
      accountProfileImage: UserProfileImage.NoImage()
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
          profileImageSrc={this.state.accountProfileImage.src}
          headerModel={this.props.model.headerModel}
          headerStyle={this.handleHeaderAndFooter(pathname).headerStyle}
          onLogOut={this.handleLogOut}
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
              path='/users/settings/:id'
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
    return;
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

  private handlePartnerWithUsButton = () => {
    this.setState({ isPartnerWithUsButtonClicked: true });
  }

  private handlePartnerWithUsModalClose = () => {
    this.setState({ isPartnerWithUsButtonClicked: false });
  }

  private handleLogInSuccess = (user: User, profileImage: UserProfileImage) => {
    if (this.state.isLogInButtonClicked) {
      this.handleLogInModalClose();
    }
    this.setState({ account: user, accountProfileImage: profileImage });
  }

  private handleLogOut = async () => {
    const isLoggedOut = await this.props.model.logInModel.logOut();
    if (isLoggedOut) {
      this.setState({ account: User.makeGuest() });
    }
  }

  private handleButtonWithDropDownClick = (label: string) => {}

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
      displayMode={this.state.displayMode}
      model={this.props.model.deactivateAccountSurveyModel}
    />;
  }

  private renderDiningEvents = ({match}: Router.RouteComponentProps<TParams>
      ) => {
    const id = Number(match.params.id);
    return <DiningEventPageController
      displayMode={this.state.displayMode}
      model={this.props.model.getDiningEventPageModel(id)}
      account={this.state.account}
      onRemoveSeat={() => this.handleRemoveSeat(id)}
      onJoinEvent={() => this.handleJoinEvent(id)}
    />;
  }

  private renderEditProfilePage = ({match}: Router.RouteComponentProps<TParams>
      ) => {
    const id = Number(match.params.id);
    return <EditProfilePageController
        displayMode={this.state.displayMode}
        account={this.state.account}
        model={this.props.model.getEditProfilePageModel(id)}
    />;
  }

  private renderDeletedAccountSurvey = () => {
    return <DeletedAccountSurveyPageController
      displayMode={this.state.displayMode}
      model={this.props.model.deletedAccountSurveyModel}
    />;
  }

  private handleJoinEvent = (diningEventId: number) => {
    if (this.state.account.userStatus === UserStatus.GUEST) {
      this.handleLogInButton();
      this.handleJoinEvent(diningEventId);
    } else {
      this.props.model.getDiningEventPageModel(diningEventId).joinEvent(
        this.state.account, this.state.accountProfileImage.src).then(() => {
          this.forceUpdate();
        });
    }
  }

  private handleRemoveSeat = (diningEventId: number) => {
    this.props.model.getDiningEventPageModel(diningEventId).removeSeat(
      this.state.account).then(() => {
        this.forceUpdate();
      });
  }

  private renderProfilePage = ({match}: Router.RouteComponentProps<TParams>
      ) => {
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
      displayMode={this.state.displayMode}
      model={this.props.model.getSignUpPageModel(id)}
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
    return <div>Site Map</div>;
  }

  private renderLogIn = () => {
    return <LogInPageController
      displayMode={this.state.displayMode}
      model={this.props.model.logInModel}
      onLogInSuccess={this.handleLogInSuccess}
    />;
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
