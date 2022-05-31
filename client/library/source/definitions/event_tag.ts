/** Implements the EventTag. */
export class EventTag {
  /** Creates an EventTag from a json object. */
  public static fromJson(value: any): EventTag {
    return new EventTag(
      value.eventId,
      value.eventTitle,
      value.eventColor
    );
  }

  constructor(eventId: number, eventTitle: string, eventColor: string) {
    this._eventId = eventId;
    this._eventTitle = eventTitle;
    this._eventColor = eventColor;
  }

  /** Returns the event id. */
  public get eventId(): number {
    return this._eventId;
  }

  /** Returns the event title. */
  public get eventTitle(): string {
    return this._eventTitle;
  }

  /** Indicates the event color assined to the card. */
  public get eventColor(): string {
    return this._eventColor;
  }

  /** Converts the EventTag to json. */
  public toJson(): any {
    return {
      eventId: this._eventId,
      eventTitle: this._eventTitle,
      eventColor: this._eventColor
    };
  }

  private _eventId: number;
  private _eventTitle: string;
  private _eventColor: string;
}
