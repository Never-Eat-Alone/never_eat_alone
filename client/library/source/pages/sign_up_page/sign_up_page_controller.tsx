import * as React from 'react';
import * as Router from 'react-router-dom';
import { DisplayMode, UserProfileImage } from '../../definitions';
import { ProfileSetUpPage } from './profile_set_up_page';
import { SignUpPage } from './sign_up_page';
import { SignUpPageModel } from './sign_up_page_model';

interface Properties {
  displayMode: DisplayMode;
  model: SignUpPageModel;
}

interface State {
  isLoaded: boolean;
  signUpPageErrorCode: SignUpPage.ErrorCode;
  profileSetUpPageErrorCode: ProfileSetUpPage.ErrorCode;
  password: string;
  displayName: string;
  image: UserProfileImage;
  isSetUpPage: boolean;
  redirect: string;
}

export class SignUpPageController extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isLoaded: false,
      signUpPageErrorCode: SignUpPage.ErrorCode.NONE,
      profileSetUpPageErrorCode: ProfileSetUpPage.ErrorCode.NONE,
      isSetUpPage: false,
      displayName: '',
      image: UserProfileImage.NoImage(),
      password: '',
      redirect: null
    };
  }

  public render(): JSX.Element {
    if (this.state.redirect) {
      return <Router.Redirect to={this.state.redirect} />;
    }
    if (!this.state.isLoaded || this.state.signUpPageErrorCode ===
        SignUpPage.ErrorCode.NO_CONNECTION) {
      return <div />;
    }
    if (this.state.isSetUpPage) {
      return <ProfileSetUpPage
        displayMode={this.props.displayMode}
        displayName={this.state.displayName}
        selectedImage={this.state.image}
        avatars={this.props.model.avatars}
        onUploadImageClick={this.handleUploadImageClick}
        onLetsGoClick={this.handleLetsGoClick}
        onAvatarClick={this.handleAvatarClick}
        onDisplayNameChange={this.handleDisplayNameChange}
      />;
    }
    return <SignUpPage
      displayMode={this.props.displayMode}
      email={this.props.model.email}
      errorCode={this.state.signUpPageErrorCode}
      onSignUp={this.handleSignUp}
    />;
  }

  public async componentDidMount(): Promise<void> {
    try {
      await this.props.model.load();
      this.setState({ isLoaded: true, image: this.props.model.defaultImage });
    } catch {
      this.setState({
        isLoaded: true,
        signUpPageErrorCode: SignUpPage.ErrorCode.NO_CONNECTION
      });
    }
  }

  private handleSignUp = async (password: string) => {
    try {
      await this.props.model.signUp(password);
      this.setState({ isSetUpPage: true, password: password });
    } catch {
      this.setState({
        signUpPageErrorCode: SignUpPage.ErrorCode.NO_CONNECTION,
        password: password,
        isSetUpPage: false
      });
    }
  }

  private handleUploadImageClick = async () => {
    try {
      const image = await this.props.model.uploadImage();
      this.setState({
        image: image,
        profileSetUpPageErrorCode: ProfileSetUpPage.ErrorCode.NONE
      });
    } catch {
      this.setState({
        image: this.props.model.defaultImage,
        profileSetUpPageErrorCode:
          ProfileSetUpPage.ErrorCode.UPLOAD_IMAGE_FAILED
      });
    }
  }

  private handleAvatarClick = (avatar: UserProfileImage) => {
    this.setState({ image: avatar });
  }

  private handleDisplayNameChange = (newName: string) => {
    this.setState({ displayName: newName });
  }

  private handleLetsGoClick = async (displayName: string,
      image: UserProfileImage) => {
    try {
      await this.props.model.setUpProfile(displayName, image);
      this.setState({
        profileSetUpPageErrorCode: ProfileSetUpPage.ErrorCode.NONE,
        displayName: displayName,
        image: image,
        redirect: '/'
      });
    } catch {
      this.setState({
        profileSetUpPageErrorCode: ProfileSetUpPage.ErrorCode.NO_CONNECTION,
        displayName: displayName,
        image: image
      });
    }
  }
}
