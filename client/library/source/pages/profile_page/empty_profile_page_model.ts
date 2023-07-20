import { CoverImage, Cuisine, EventCardSummary, Language } from
  '../../definitions';
import { ProfilePageModel } from './profile_page_model';

/**
 * Implements a ProfilePageModel that always fails. Can be used as the
 * initial state of a model prior to being loaded.
 */
export class EmptyProfilePageModel extends ProfilePageModel {
  public async load(): Promise<void> {
    throw new Error('Unable to load empty model.');
  }

  public get profileId(): number {
    throw new Error('ProfilePageModel not loaded.');
  }

  public get coverImage(): CoverImage {
    throw new Error('ProfilePageModel not loaded.');
  }

  public get profileImageSrc(): string {
    throw new Error('ProfilePageModel not loaded.');
  }

  public get name(): string {
    throw new Error('ProfilePageModel not loaded.');
  }

  public get userName(): string {
    throw new Error('ProfilePageModel not loaded.');
  }

  public get createdAt(): Date {
    throw new Error('ProfilePageModel not loaded.');
  }

  public get biography(): string {
    throw new Error('ProfilePageModel not loaded.');
  }

  public get address(): string {
    throw new Error('ProfilePageModel not loaded.');
  }

  public get languageList(): Language[] {
    throw new Error('ProfilePageModel not loaded.');
  }

  public get facebookLink(): string {
    throw new Error('ProfilePageModel not loaded.');
  }

  public get twitterLink(): string {
    throw new Error('ProfilePageModel not loaded.');
  }

  public get instagramLink(): string {
    throw new Error('ProfilePageModel not loaded.');
  }

  public get favoriteCuisineList(): Cuisine[] {
    throw new Error('ProfilePageModel not loaded.');
  }

  public get upcomingEventList(): EventCardSummary[] {
    throw new Error('ProfilePageModel not loaded.');
  }

  public async updateUpcomingEventList(): Promise<void> {
    throw new Error('Unable to update empty model.');
  }

  public get pastEventList(): EventCardSummary[] {
    throw new Error('ProfilePageModel not loaded.');
  }
}
