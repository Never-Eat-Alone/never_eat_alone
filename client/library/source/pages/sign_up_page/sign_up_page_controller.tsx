import * as React from 'react';
import * as Router from 'react-router-dom';
import { Avatar, DisplayMode, UserProfileImage } from '../../definitions';
import { ProfileSetUpPage } from './profile_set_up_page';
import { SignUpPage } from './sign_up_page';
import { SignUpPageModel } from './sign_up_page_model';

interface Properties {
  displayMode: DisplayMode;
  model: SignUpPageModel;
}

interface State {
  isLoaded: boolean;
  email: string;
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
      email: '',
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
      email={this.state.email}
      errorCode={this.state.signUpPageErrorCode}
      onSignUp={this.handleSignUp}
    />;
  }

  public async componentDidMount(): Promise<void> {
    console.log('componentDidMount');
    try {
      await this.props.model.load();
      console.log('loaded');
      this.setState({
        isLoaded: true,
        email: this.props.model.email,
        image: this.props.model.defaultImage,
        signUpPageErrorCode: SignUpPage.ErrorCode.NONE
      });
    } catch (error) {
      this.setState({
        isLoaded: true,
        signUpPageErrorCode: SignUpPage.ErrorCode.NO_CONNECTION
      });
      console.log(error);
    }
  }

  private handleSignUp = async (password: string) => {
    console.log('handleSignUp', 'pass', password);
    try {
      const isSignedUp = await this.props.model.signUp(password);
      console.log('isSignedup', isSignedUp);
      this.setState({ isSetUpPage: isSignedUp, password: password });
    } catch {
      console.log('error in isSignedup response');
      this.setState({
        signUpPageErrorCode: SignUpPage.ErrorCode.NO_CONNECTION,
        password: password,
        isSetUpPage: false
      });
    }
  }

  private handleUploadImageClick = async (uploadedImage: UserProfileImage) => {
    console.log('handle upload image');
    try {
      const image = await this.props.model.uploadImage(uploadedImage);
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

  private handleAvatarClick = (avatar: Avatar) => {
    console.log('avatar click', avatar.src, 'userId', this.state.image.userId);
    this.setState({
      image: new UserProfileImage(avatar.id, this.state.image.userId,
        avatar.src)
    });
  }

  private handleDisplayNameChange = (newName: string) => {
    this.setState({ displayName: newName });
  }

  private handleLetsGoClick = async (displayName: string,
      image: UserProfileImage) => {
    console.log('handleLetsGoClick', 'dislayname', displayName, 'image', image.src);
    try {
      const isSetUp = await this.props.model.setUpProfile(displayName, image);
      if (isSetUp) {
        console.log('isSetUp', isSetUp);
        this.setState({
          profileSetUpPageErrorCode: ProfileSetUpPage.ErrorCode.NONE,
          displayName: displayName,
          image: image,
          redirect: '/'
        });
      } else {
        console.log('error in isSetup');
        this.setState({
          profileSetUpPageErrorCode: ProfileSetUpPage.ErrorCode.NO_CONNECTION,
          displayName: displayName,
          image: image
        });
      }
    } catch {
      console.log('error in upload');
      this.setState({
        profileSetUpPageErrorCode: ProfileSetUpPage.ErrorCode.NO_CONNECTION,
        displayName: displayName,
        image: image
      });
    }
  }
}
