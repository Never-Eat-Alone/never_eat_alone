import * as React from 'react';
import { Avatar, DisplayMode, User, UserProfileImage } from '../../definitions';
import { ProfileSetUpPage } from './profile_set_up_page';
import { SignUpPage } from './sign_up_page';
import { SignUpPageModel } from './sign_up_page_model';

interface Properties {
  displayMode: DisplayMode;
  account: User;
  model: SignUpPageModel;
  onSignUpSuccess: (account: User, accountProfileImage: UserProfileImage
    ) => void;
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
  avatars: Avatar[];
  selectedAvatar: Avatar;
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
      displayName: this.props.account.name,
      userProfileImage: null,
      password: '',
      avatars: [],
      selectedAvatar: null
    };
  }

  public render(): JSX.Element {
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
        onAvatarClick={this.handleAvatarSelection}
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
        userProfileImage: null,
        avatars: this.props.model.avatars,
        selectedAvatar: this.props.model.avatars[0]
      });
    } catch {
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
    this.setState({
      selectedAvatar: avatar,
      userProfileImage: null
    });
  }

  private handleUploadImageClick = async (uploadedImageFile: File) => {
    try {
      const image = await this.props.model.uploadImageFile(uploadedImageFile);
      this.setState({
        userProfileImage: image,
        selectedAvatar: null
      });
    } catch {
      this.setState({
        selectedAvatar: this.props.model.avatars[0],
        userProfileImage: null,
        profileSetUpPageErrorCode: ProfileSetUpPage.ErrorCode.NO_CONNECTION
      });
    }
  }

  private handleDisplayNameChange = (newName: string) => {
    this.setState({ displayName: newName });
  }

  private handleLetsGoClick = async () => {
    try {
      let result;
      if (this.state.userProfileImage) {
        result = await this.props.model.setUpProfile(this.state.displayName,
          this.state.userProfileImage);
      } else {
        result = await this.props.model.setUpProfile(this.state.displayName,
          this.state.selectedAvatar);
      }
      this.props.onSignUpSuccess(result.account, result.accountProfileImage);
    } catch {
      this.setState({
        profileSetUpPageErrorCode: ProfileSetUpPage.ErrorCode.NO_CONNECTION
      });
    }
  }
}
