import { User } from '../../definitions';

export abstract class LogInModel {
  public abstract logIn(email: string, password: string, rememberMe: boolean
    ): Promise<User>;
  public abstract forgotPassword(email: string): Promise<void>;
  public abstract googleLogIn(email: string, token: any): Promise<User>;
  public abstract facebookLogIn(email: string, token: any): Promise<User>;
}
