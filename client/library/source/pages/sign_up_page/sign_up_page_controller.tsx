import * as React from 'react';
import * as Router from 'react-router-dom';
import { DisplayMode, UserProfileImage } from '../../definitions';
import { ProfileSetUpPage } from './profile_set_up_page';
import { SignUpPage } from './sign_up_page';
import { SignUpPageModel } from './sign_up_page_model';

interface Properties extends Router.LinkProps {
  displayMode: DisplayMode;
  model: SignUpPageModel;
}

interface State {
  isLoaded: boolean;
  signUpPageErrorCode: SignUpPage.ErrorCode;
  password: string;
  displayName: string;
  image: UserProfileImage;
  isSetUpPage: boolean;
  setUpFailed: boolean;
}

export class SignUpPageController extends React.Component<Properties, State> {
  constructor(props: Properties) {
    super(props);
    this.state = {
      isLoaded: false,
      signUpPageErrorCode: SignUpPage.ErrorCode.NONE,
      isSetUpPage: false,
      displayName: '',
      image: UserProfileImage.NoImage(),
      password: '',
      setUpFailed: false
    };
  }

  public render(): JSX.Element {
    if (!this.state.isLoaded || this.state.signUpPageErrorCode ===
        SignUpPage.ErrorCode.NO_CONNECTION) {
      return <div />;
    }
    if (this.state.isSetUpPage) {
      return <ProfileSetUpPage
        displayMode={this.props.displayMode}
        displayName={this.state.displayName}
        onUploadImageClick={this.handleUploadImageClick}
        onLetsGoClick={this.handleLetsGoClick}
      />;
    }
    return <SignUpPage
      displayMode={this.props.displayMode}
      email={this.props.model.email}
      errorCode={this.state.signUpPageErrorCode}
      onSignUp={this.handleSignUp}
    />;
  }

  private handleSignUp = async (password: string) => {
    try {
      await this.props.model.signUp(password);
    } catch {
      this.setState({
        signUpPageErrorCode: SignUpPage.ErrorCode.NO_CONNECTION
      });
    }
  }

  private handleUploadImageClick = async (password: string) => {
    try {
      const response = await this.props.model.uploadImage(src);
      const jsonResponse = await response.json();
    } catch {

    }
  }

  private handleLetsGoClick = async (displayName: string,
      image: UserProfileImage) => {
    try {
      await this.props.model.setUpProfile(displayName, image);
      this.setState({
        setUpFailed: false,
        displayName: displayName,
        image: image
      });
    } catch {
      this.setState({
        setUpFailed: true,
        displayName: displayName,
        image: image
      });
    }
  }
}
