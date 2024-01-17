import { JoinModal } from './join_modal';
import { JoinModel } from './join_model';

export class HttpJoinModel extends JoinModel {
  public async join(name: string, email: string,
      referralCode: string): Promise<JoinModal.ErrorCode> {
    try {
      const response = await fetch('/api/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, referralCode })
      });

      if (response.ok) {
        if (response.status === 200) {
          return JoinModal.ErrorCode.ACCOUNT_PENDING;
        }
        return JoinModal.ErrorCode.NONE;
      } else {
        switch(response.status) {
          case 400:
            return JoinModal.ErrorCode.VALIDATION_ERROR;
          case 409:
            return JoinModal.ErrorCode.ACCOUNT_EXISTS;
          case 423:
            return JoinModal.ErrorCode.ACCOUNT_LOCKED;
          default:
            return JoinModal.ErrorCode.GENERAL_ERROR;
        }
      }
    } catch (error) {
      console.error('Error in HttpJoinModel.join:', error);
      return JoinModal.ErrorCode.NO_CONNECTION;
    }
  }
}
