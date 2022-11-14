export class InviteEmail {
  public static fromJson(value: any): InviteEmail {
    return new InviteEmail(value.emailList, value.content);
  }

  constructor(emailList: string[], content: string) {
    this._emailList = [...emailList];
    this._content = content;
  }

  public get emailList(): string[] {
    return this._emailList;
  }

  public get contest(): string {
    return this._content;
  }

  public toJson(): any {
    return {
      emailList: this._emailList,
      content: this._content
    };
  }

  private _emailList: string[];
  private _content: string;
}
