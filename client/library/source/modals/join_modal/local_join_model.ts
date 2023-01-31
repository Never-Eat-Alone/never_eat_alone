import { JoinModel } from './join_model';

export class LocalJoinModel extends JoinModel {
  public load(): void {
    return;
  }

  public async join(name: string, email: string, password: string):
      Promise<void> {
    return;
  }
}
