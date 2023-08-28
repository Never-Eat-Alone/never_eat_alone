import { User } from '../../definitions';
import { ResetPasswordPageModel } from './reset_password_page_model';

/**
 * Implements a ResetPasswordPageModel that always fails. Can be used as the
 * initial state of a model prior to being loaded.
 */
export class EmptyResetPasswordPageModel extends ResetPasswordPageModel {
  public async load(): Promise<void> {
    throw new Error('Unable to load empty model.');
  }

  public get displayName(): string {
    throw new Error('ResetPasswordPageModel not loaded.');
  }

  public get profileImageSrc(): string {
    throw new Error('ResetPasswordPageModel not loaded.');
  }

  public async savePassword(newPassword: string): Promise<User> {
    throw new Error('ResetPasswordPageModel not loaded.');
  }
}
