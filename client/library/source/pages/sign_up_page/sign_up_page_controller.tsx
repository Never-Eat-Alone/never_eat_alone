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
  avatars: Avatar[];
  selectedAvatar: Avatar | null;
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
      userProfileImage: null,
      password: '',
      redirect: null,
      avatars: [],
      selectedAvatar: null
    };
  }

  public render(): JSX.Element {
    if (this.state.redirect) {
      return <Router.Redirect to={this.state.redirect} />;
    }
    if (!this.state.isLoaded || this.state.signUpPageErrorCode ===
        SignUpPage.ErrorCode.NO_CONNECTION ||
        this.state.profileSetUpPageErrorCode ===
        ProfileSetUpPage.ErrorCode.NO_CONNECTION) {
      return <div />;
    }
    if (this.state.isSetUpPage) {
      return <ProfileSetUpPage
        displayMode={this.props.displayMode}
        displayName={this.state.displayName}
        selectedImage={this.state.userProfileImage}
        avatars={this.state.avatars}
        selectedAvatar={this.state.selectedAvatar}
        errorCode={this.state.profileSetUpPageErrorCode}
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
    console.log('Running componentDidMount');
    try {
      await this.props.model.load();
      console.log('model is loaded. userProfileImage', this.props.model.defaultImage, 'avatars', this.props.model.avatars);
      this.setState({
        isLoaded: true,
        userProfileImage: this.props.model.defaultImage,
        avatars: this.props.model.avatars
      });
    } catch {
      console.log('error happened in loading the Singup model');
      this.setState({
        isLoaded: true,
        signUpPageErrorCode: SignUpPage.ErrorCode.NO_CONNECTION,
        profileSetUpPageErrorCode: ProfileSetUpPage.ErrorCode.NO_CONNECTION
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

  private handleAvatarSelection = (avatar: Avatar) => {
    this.setState({ selectedAvatar: avatar });
  }

  private handleUploadImageClick = async (uploadedImageFile: File) => {
    console.log('Running handleUploadImageClick');
    try {
      const image = await this.props.model.uploadImage(uploadedImageFile);
      console.log('uploadImage was successfull', image);
      this.setState({
        userProfileImage: image
      });
    } catch {
      console.log('uploadImage failed');
      this.setState({
        userProfileImage: UserProfileImage.default(this.props.account.id),
        profileSetUpPageErrorCode: ProfileSetUpPage.ErrorCode.NO_CONNECTION
      });
    }
  }

  private handleAvatarClick = async (avatar: Avatar) => {
    console.log('handleAvatarClick', new UserProfileImage(this.props.account.id,
      avatar.src));
    try {
      const newImage = await this.props.model.updateProfileImageByAvatar(
        avatar);
      this.setState({ userProfileImage: newImage });
    } catch {
      this.setState({
        profileSetUpPageErrorCode: ProfileSetUpPage.ErrorCode.NO_CONNECTION
      });
    }
  }

  private handleDisplayNameChange = (newName: string) => {
    console.log('handleDisplayNameChange displayName', newName);
    this.setState({ displayName: newName });
  }

  private handleLetsGoClick = async () => {
    console.log('Running handleLetsGoClick');
    try {
      await this.props.model.setUpProfile(this.state.displayName,
        this.state.userProfileImage);
      console.log('setUpProfile succesfully for displayname', this.state.displayName, 'userProfileImage', this.state.userProfileImage);
      this.setState({ redirect: '/' });
    } catch {
      this.setState({
        profileSetUpPageErrorCode: ProfileSetUpPage.ErrorCode.NO_CONNECTION
      });
    }
  }
}
