import { User } from '../../definitions';

export abstract class LogInModel {
  public abstract logIn(email: string, password: string, rememberMe: boolean
    ): Promise<User>;
  public abstract logOut(): Promise<boolean>;
}
