import * as React from 'react';
import * as Router from 'react-router-dom';
import { Avatar, DisplayMode, User, UserProfileImage } from '../../definitions';
import { ProfileSetUpPage } from './profile_set_up_page';
import { SignUpPage } from './sign_up_page';
import { SignUpPageModel } from './sign_up_page_model';

interface Properties {
  displayMode: DisplayMode;
  account: User;
  model: SignUpPageModel;
}

interface State {
  isLoaded: boolean;
  email: string;
  signUpPageErrorCode: SignUpPage.ErrorCode;
  profileSetUpPageErrorCode: ProfileSetUpPage.ErrorCode;
  password: string;
  displayName: string;
  userProfileImage: UserProfileImage;
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
      email: '',
      isSetUpPage: false,
      displayName: '',
      userProfileImage: UserProfileImage.NoImage(),
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
        selectedImage={this.state.userProfileImage}
        avatars={this.props.model.avatars}
        onUploadImageClick={this.handleUploadImageClick}
        onLetsGoClick={this.handleLetsGoClick}
        onAvatarClick={this.handleAvatarClick}
        onDisplayNameChange={this.handleDisplayNameChange}
      />;
    }
    return <SignUpPage
      displayMode={this.props.displayMode}
      email={this.props.account.email}
      errorCode={this.state.signUpPageErrorCode}
      onSignUp={this.handleSignUp}
    />;
  }

  public async componentDidMount(): Promise<void> {
    try {
      await this.props.model.load(this.props.account);
      this.setState({
        isLoaded: true,
        userProfileImage: this.props.model.defaultImage,
        signUpPageErrorCode: SignUpPage.ErrorCode.NONE
      });
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
      this.setState({ isSetUpPage: isSignedUp, password: password });
    } catch {
      this.setState({
        signUpPageErrorCode: SignUpPage.ErrorCode.NO_CONNECTION,
        password: password,
        isSetUpPage: false
      });
    }
  }

  private handleUploadImageClick = async (uploadedImage: File) => {
    try {
      const formData = new FormData();
      formData.append('userProfileImage', uploadedImage);
      const response = await fetch(`/api/upload_profile_image/${
          this.props.model.defaultImage.userId}`, {
        method: 'POST',
        body: formData,
      });
      if (response.status === 201) {
        const responseObject = await response.json();
        const image = UserProfileImage.fromJson(
          responseObject.userProfileImage);
        this.setState({
          userProfileImage: image,
          profileSetUpPageErrorCode: ProfileSetUpPage.ErrorCode.NONE,
        });
      } else {
        this.setState({
          userProfileImage: this.props.model.defaultImage,
          profileSetUpPageErrorCode:
            ProfileSetUpPage.ErrorCode.UPLOAD_IMAGE_FAILED,
        });
      }
    } catch {
      this.setState({
        userProfileImage: this.props.model.defaultImage,
        profileSetUpPageErrorCode:
          ProfileSetUpPage.ErrorCode.UPLOAD_IMAGE_FAILED,
      });
    }
  }

  private handleAvatarClick = (avatar: Avatar) => {
    this.setState({
      userProfileImage: new UserProfileImage(avatar.id,
        this.state.userProfileImage.userId, avatar.src)
    });
  }

  private handleDisplayNameChange = (newName: string) => {
    this.setState({ displayName: newName });
  }

  private handleLetsGoClick = async (displayName: string,
      image: UserProfileImage) => {
    try {
      const isSetUp = await this.props.model.setUpProfile(displayName, image);
      if (isSetUp) {
        this.setState({
          profileSetUpPageErrorCode: ProfileSetUpPage.ErrorCode.NONE,
          displayName: displayName,
          userProfileImage: image,
          redirect: '/'
        });
      } else {
        this.setState({
          profileSetUpPageErrorCode: ProfileSetUpPage.ErrorCode.NO_CONNECTION,
          displayName: displayName,
          userProfileImage: image
        });
      }
    } catch {
      this.setState({
        profileSetUpPageErrorCode: ProfileSetUpPage.ErrorCode.NO_CONNECTION,
        displayName: displayName,
        userProfileImage: image
      });
    }
  }
}
