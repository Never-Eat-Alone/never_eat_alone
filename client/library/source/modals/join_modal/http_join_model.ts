import { JoinModel } from './join_model';

export class HttpJoinModel extends JoinModel {
  public async join(name: string, email: string,
      referralCode: string): Promise<boolean> {
    const response = await fetch('/api/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'name': name,
        'email': email,
        'referralCode': referralCode
      })
    });
    if (response.status === 200) {
      return true;
    }
    return false;
  }
}
