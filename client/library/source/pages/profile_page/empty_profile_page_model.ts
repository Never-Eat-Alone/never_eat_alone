import { EventCardSummary, ProfilePageData } from '../../definitions';
import { ProfilePageModel } from './profile_page_model';

/**
 * Implements a ProfilePageModel that always fails. Can be used as the
 * initial state of a model prior to being loaded.
 */
export class EmptyProfilePageModel extends ProfilePageModel {
  public async load(): Promise<void> {
    throw new Error('Unable to load empty model.');
  }

  public get profilePageData(): ProfilePageData {
    throw new Error('ProfilePageModel not loaded.');
  }

  public get name(): string {
    throw new Error('ProfilePageModel not loaded.');
  }

  public get createdAt(): Date {
    throw new Error('ProfilePageModel not loaded.');
  }

  public get upcomingEventList(): EventCardSummary[] {
    throw new Error('ProfilePageModel not loaded.');
  }

  public async update(): Promise<void> {
    throw new Error('Unable to update empty model.');
  }

  public get pastEventList(): EventCardSummary[] {
    throw new Error('ProfilePageModel not loaded.');
  }
}
