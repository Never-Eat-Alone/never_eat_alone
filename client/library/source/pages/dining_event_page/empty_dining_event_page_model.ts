import { Attendee, DressCode, Location, Restaurant, Seating, User } from
  '../../definitions';
import { DiningEventPageModel } from './dining_event_page_model';

/**
 * Implements a DiningEventPageModel that always fails. Can be used as the
 * initial state of a model prior to being loaded.
 */
export class EmptyDiningEventPageModel extends DiningEventPageModel {
  public async load(): Promise<void> {
    throw new Error('Unable to load empty model.');
  }

  public get eventId(): number {
    throw new Error('DiningEventPageModel not loaded.');
  }

  public get eventColor(): string {
    throw new Error('DiningEventPageModel not loaded.');
  }

  public get eventFee(): number {
    throw new Error('DiningEventPageModel not loaded.');
  }

  public get coverImageSrc(): string {
    throw new Error('DiningEventPageModel not loaded.');
  }

  public get title(): string {
    throw new Error('DiningEventPageModel not loaded.');
  }

  public get restaurant(): Restaurant {
    throw new Error('DiningEventPageModel not loaded.');
  }

  public get dressCode(): DressCode {
    throw new Error('DiningEventPageModel not loaded.');
  }

  public get seating(): Seating {
    throw new Error('DiningEventPageModel not loaded.');
  }

  public get location(): Location {
    throw new Error('DiningEventPageModel not loaded.');
  }

  public get reservationName(): string {
    throw new Error('DiningEventPageModel not loaded.');
  }

  public get startTime(): Date {
    throw new Error('DiningEventPageModel not loaded.');
  }

  public get endTime(): Date {
    throw new Error('DiningEventPageModel not loaded.');
  }

  public get attendeeList(): Attendee[] {
    throw new Error('DiningEventPageModel not loaded.');
  }

  public get totalCapacity(): number {
    throw new Error('DiningEventPageModel not loaded.');
  }

  public get description(): string {
    throw new Error('DiningEventPageModel not loaded.');
  }

  public get isGoing(): boolean {
    throw new Error('DiningEventPageModel not loaded.');
  }

  public get isRSVPOpen(): boolean {
    throw new Error('DiningEventPageModel not loaded.');
  }

  public async joinEvent(account: User, profileImageSrc: string): Promise<
      boolean> {
    throw new Error('Unable to join event from empty model.');
  }

  public async removeSeat(account: User): Promise<boolean> {
    throw new Error('Unable to remove seat from empty model.');
  }
}
