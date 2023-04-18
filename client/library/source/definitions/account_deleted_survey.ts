export class AccountDeletedSurvey {
  public static fromJson(value: any): AccountDeletedSurvey {
    return new AccountDeletedSurvey(value.id, value.userId, value.a1, value.a2,
      value.a3, value.a4, value.a5, value.a6, value.message, value.createdAt);
  }

  constructor(id: number, userId: number, a1: boolean, a2: boolean, a3: boolean,
      a4: boolean, a5: boolean, a6: boolean, message: string, createdAt: Date) {
    this._id = id;
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
    this._createdAt = createdAt;
  }

  public get id(): number {
    return this._id;
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

  public get createdAt(): Date {
    return this._createdAt;
  }

  public toJson(): any {
    return {
      id: this._id,
      userId: this._userId,
      a1: this._a1,
      a2: this._a2,
      a3: this._a3,
      a4: this._a4,
      a5: this._a5,
      a6: this._a6,
      message: this._message,
      questions: this._questions,
      createdAt: this._createdAt
    };
  }

  private _id: number;
  private _userId: number;
  private _a1: boolean;
  private _a2: boolean;
  private _a3: boolean;
  private _a4: boolean;
  private _a5: boolean;
  private _a6: boolean;
  private _message: string;
  private _questions: string[];
  private _createdAt: Date;
}
