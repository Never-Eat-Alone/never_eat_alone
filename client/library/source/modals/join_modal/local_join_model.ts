import { JoinModel } from './join_model';

export class LocalJoinModel extends JoinModel {
  constructor() {
    super();
  }

  public load(): Promise<void> {
    return;
  }

  public requestSignUp(name: string, email: string, password: string): Promise<
      any> {
    return;
  }

  public googleSignUp(email: string, token: any): Promise<any> {
    return;
  }

  public facebookSignUp(email: string, token: any): Promise<any> {
    return;
  }

  public sendConfirmationEmail(email: string): Promise<boolean> {
    return;
  }
}
