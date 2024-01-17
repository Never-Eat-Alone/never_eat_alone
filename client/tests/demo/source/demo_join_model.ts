import * as NeverEatAlone from 'never_eat_alone';

export class DemoJoinModel extends NeverEatAlone.JoinModel {
  public async join(name: string, email: string, referrenceCode: string
      ): Promise<NeverEatAlone.JoinModal.ErrorCode> {
    return (Boolean(email && name) && NeverEatAlone.JoinModal.ErrorCode.NONE ||
      NeverEatAlone.JoinModal.ErrorCode.NO_CONNECTION);
  }
}
