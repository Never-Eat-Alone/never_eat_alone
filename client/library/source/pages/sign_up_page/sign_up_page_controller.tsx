import * as React from 'react';
import * as Router from 'react-router-dom';
import { DisplayMode, User, UserProfileImage } from '../../definitions';
import { ProfileSetUpPage } from './profile_set_up_page';
import { SignUpPage } from './sign_up_page';
import { SignUpPageModel } from './sign_up_page_model';

interface Properties extends Router.RouteComponentProps {
  displayMode: DisplayMode;
  account: User;
  accountProfileImage: UserProfileImage;
  model: SignUpPageModel;
  onSignUpSuccess: (account: User, accountProfileImage: UserProfileImage
    ) => void;
}

interface State {
  isLoaded: boolean;
  signUpPageErrorCode: SignUpPage.ErrorCode;
  profileSetUpPageErrorCode: ProfileSetUpPage.ErrorCode;
  isSetUpPage: boolean;
  password: string;
  accountProfileImage: UserProfileImage;
}

export class SignUpPageController extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isLoaded: false,
      signUpPageErrorCode: SignUpPage.ErrorCode.NONE,
      profileSetUpPageErrorCode: ProfileSetUpPage.ErrorCode.NONE,
      isSetUpPage: false,
      password: '',
      accountProfileImage: this.props.accountProfileImage
    };
  }

  public render(): JSX.Element {
    if (!this.state.isLoaded || this.state.signUpPageErrorCode !==
        SignUpPage.ErrorCode.NONE || this.state.profileSetUpPageErrorCode !==
        ProfileSetUpPage.ErrorCode.NONE) {
      return <div />;
    }
    if (this.state.isSetUpPage) {
      return <ProfileSetUpPage
        displayMode={this.props.displayMode}
        displayName={this.props.account.name}
        userId={this.props.account.id}
        selectedImage={this.state.accountProfileImage}
        errorCode={this.state.profileSetUpPageErrorCode}
        onUploadImageClick={this.handleUploadImageClick}
        onLetsGoClick={this.handleLetsGoClick}
      />;
    }
    return <SignUpPage
      displayMode={this.props.displayMode}
      email={this.props.account.email}
      password={this.state.password}
      errorCode={this.state.signUpPageErrorCode}
      onSignUp={this.handleSignUp}
    />;
  }

  public async componentDidMount(): Promise<void> {
    try {
      const response = await fetch(`/api/sign_up/${this.props.account.id}`);
      if (response.status === 200) {
        this.setState({ isLoaded: true });
      }
    } catch {
      this.setState({
        isLoaded: true,
        signUpPageErrorCode: SignUpPage.ErrorCode.NO_CONNECTION
      });
    }
  }

  private handleSignUp = async (password: string) => {
    try {
      const isSignedUp = await this.props.model.signUp(password);
      this.setState({ isSetUpPage: isSignedUp });
    } catch {
      this.setState({
        signUpPageErrorCode: SignUpPage.ErrorCode.NO_CONNECTION,
        password: password,
        isSetUpPage: false
      });
    }
  }

  private handleUploadImageClick = async (uploadedImageFile: File) => {
    try {
      const image = await this.props.model.uploadImageFile(uploadedImageFile);
      this.setState({
        accountProfileImage: image
      });
    } catch {
      this.setState({
        accountProfileImage: this.props.accountProfileImage,
        profileSetUpPageErrorCode: ProfileSetUpPage.ErrorCode.NO_CONNECTION
      });
    }
  }

  private handleLetsGoClick = async (displayName: string,
      selectedProfileImage: UserProfileImage) => {
    try {
      console.log('handleLetsGoClick displayname', displayName, 'imagesrc', selectedProfileImage.src);
      const result = await this.props.model.setUpProfile(displayName,
        selectedProfileImage);
        console.log('running onSignUpSuccess for account', result.account, 'accountProfileImage', result.accountProfileImage);
      this.props.onSignUpSuccess(result.account, result.accountProfileImage);
      this.props.history.push('/');
    } catch {
      this.setState({
        profileSetUpPageErrorCode: ProfileSetUpPage.ErrorCode.NO_CONNECTION
      });
    }
  }
}
