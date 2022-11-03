import { HeaderModel } from './header_model';

export class LocalHeaderModel extends HeaderModel {
  public async load(): Promise<void> {
    return;
  }
}
