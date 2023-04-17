export class AccountDeletedSurvey {
  public static fromJson(value: any): AccountDeletedSurvey {
    return new AccountDeletedSurvey(value.userId, value.a1, value.a2, value.a3,
      value.a4, value.a5, value.a6, value.message);
  }

  constructor(userId: number, a1: boolean, a2: boolean, a3: boolean,
      a4: boolean, a5: boolean, a6: boolean, message: string) {
    this._userId = userId;
    this._a1 = a1;
    this._a2 = a2;
    this._a3 = a3;
    this._a4 = a4;
    this._a5 = a5;
    this._a6 = a6;
    this._message = message;
    this._questions = ["I don’t find it useful.",
      "I don’t understand how it works.",
      'There are no events that interest me.',
      'There are no events in my area.',
      'This is a temporary break / I want to make a new account.',
      'I have a privacy or safety concern.'
    ];
  }

  public get userId(): number {
    return this._userId;
  }

  public get a1(): boolean {
    return this._a1;
  }

  public get a2(): boolean {
    return this._a2;
  }

  public get a3(): boolean {
    return this._a3;
  }

  public get a4(): boolean {
    return this._a4;
  }

  public get a5(): boolean {
    return this._a5;
  }

  public get a6(): boolean {
    return this._a6;
  }

  public get message(): string {
    return this._message;
  }

  public get questions(): string[] {
    return this._questions;
  }

  public toJson(): any {
    return {
      userId: this._userId,
      a1: this._a1,
      a2: this._a2,
      a3: this._a3,
      a4: this._a4,
      a5: this._a5,
      a6: this._a6,
      message: this._message,
      questions: this._questions
    };
  }

  private _userId: number;
  private _a1: boolean;
  private _a2: boolean;
  private _a3: boolean;
  private _a4: boolean;
  private _a5: boolean;
  private _a6: boolean;
  private _message: string;
  private _questions: string[];
}
