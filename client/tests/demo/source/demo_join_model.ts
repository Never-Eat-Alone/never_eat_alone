import * as NeverEatAlone from 'never_eat_alone';

export class DemoJoinModel extends NeverEatAlone.JoinModel {
  public async join(name: string, email: string, referrenceCode: string
      ): Promise<boolean> {
    return Boolean(email);
  }
}
