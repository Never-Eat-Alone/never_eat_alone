import { HeaderModel } from './header_model';

export class LocalHeaderModel extends HeaderModel {
  constructor(profileImageSrc: string) {
    super();
    this._profileImageSrc = profileImageSrc;
  }

  public async load(): Promise<void> {
    return;
  }

  public get profileImageSrc(): string {
    return this._profileImageSrc;
  }

  private _profileImageSrc: string;
}
