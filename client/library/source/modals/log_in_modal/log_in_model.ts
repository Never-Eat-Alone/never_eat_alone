import { User, UserProfileImage } from '../../definitions';

export abstract class LogInModel {
  public abstract logIn(email: string, password: string, rememberMe: boolean
    ): Promise<{user: User, profileImage: UserProfileImage}>;
  public abstract logOut(): Promise<boolean>;
}
