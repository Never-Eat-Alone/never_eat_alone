import { JoinModel } from './join_model';

export class LocalJoinModel extends JoinModel {
  public load(): void {
    return;
  }

  public requestSignUp(name: string, email: string, password: string): Promise<
      void> {
    return;
  }
}
