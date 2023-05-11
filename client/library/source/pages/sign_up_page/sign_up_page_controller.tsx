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
  password: string;
  displayName: string;
  userProfileImage: UserProfileImage;
  isSetUpPage: boolean;
  redirect: string;
  avatars: Avatar[];
}

export class SignUpPageController extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isLoaded: false,
      signUpPageErrorCode: SignUpPage.ErrorCode.NONE,
      email: '',
      isSetUpPage: false,
      displayName: '',
      userProfileImage: UserProfileImage.NoImage(),
      password: '',
      redirect: null,
      avatars: []
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
        avatars={this.state.avatars}
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
      await this.props.model.load();
      this.setState({
        isLoaded: true,
        userProfileImage: this.props.model.defaultImage,
        signUpPageErrorCode: SignUpPage.ErrorCode.NONE,
        avatars: this.props.model.avatars
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
          userProfileImage: image
        });
      } else {
        this.setState({
          userProfileImage: this.props.model.defaultImage
        });
      }
    } catch {
      this.setState({
        userProfileImage: this.props.model.defaultImage
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
      await this.props.model.setUpProfile(displayName, image);
      this.setState({
        displayName: displayName,
        userProfileImage: image,
        redirect: '/'
      });
    } catch {
      this.setState({
        displayName: displayName,
        userProfileImage: image
      });
    }
  }
}
