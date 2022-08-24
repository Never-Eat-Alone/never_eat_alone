import { arrayFromJson, arrayToJson } from './array_json';
import { Cuisine } from './cuisine';
import { PriceRange } from './price_range';

/** Represents Restaurant. */
export class Restaurant {
  /** Creates a Restaurant object from json. */
  public static fromJson(value: any): Restaurant {
    return new Restaurant(
      value.id,
      value.name,
      new Date(Date.parse(value.createdAt)),
      value.locationId,
      value.description,
      value.howToFind,
      value.phoneNumber,
      value.priceRange as PriceRange,
      arrayFromJson(Cuisine, value.cuisineList),
      value.website);
  }

  public static empty(): Restaurant {
    return new Restaurant(-1, '', new Date(), -1, '', '', '',
      PriceRange.UNKNOWN, [], '');
  }

  /** Constructs a Restaurant.
   * @param id - The id number of the restaurant.
   * @param name - The name of the restaurant.
   * @param createdAt - The date and time the restaurant account was created at.
   * @param description - The description of the restaurant.
   * @param howToFind - The guide to how to find the restaurant.
   * @param phoneNumber - The restaurant contact number.
   * @param locationId - The locationId of the restaurant.
   * @param priceRange - The price range the restuarant items fall under.
   * @param cuisineList - The list of cuisines the restaurant identifies
   *   themselves with.
   * @param website - The address to the restaurant website.
   */
  constructor(id: number, name: string, createdAt: Date, locationId: number,
      description: string, howToFind: string, phoneNumber: string,
      priceRange: PriceRange, cuisineList: Cuisine[], website: string) {
    this._id = id;
    this._name = name;
    this._createdAt = createdAt;
    this._locationId = locationId;
    this._description = description;
    this._howToFind = howToFind;
    this._phoneNumber = phoneNumber;
    this._priceRange = priceRange;
    this._cuisineList = [...cuisineList];
    this._website = website;
  }

  public get id(): number {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get description(): string {
    return this._description;
  }

  public get howToFind(): string {
    return this._howToFind;
  }

  public get phoneNumber(): string {
    return this._phoneNumber;
  }

  public get locationId(): number {
    return this._locationId;
  }

  public get priceRange(): PriceRange {
    return this._priceRange;
  }

  public get cuisineList(): Cuisine[] {
    return this._cuisineList;
  }

  public get website(): string {
    return this._website;
  }

  public toJson(): any {
    return {
      id: this._id,
      name: this._name,
      createdAt: this._createdAt.toJSON(),
      locationId: this._locationId,
      description: this._description,
      howToFind: this._howToFind,
      phoneNumber: this._phoneNumber,
      priceRange: this._priceRange,
      cuisineList: arrayToJson(this._cuisineList),
      website: this._website
    };
  }

  private _id: number;
  private _name: string;
  private _createdAt: Date;
  private _locationId: number;
  private _description: string;
  private _howToFind: string;
  private _phoneNumber: string;
  private _priceRange: PriceRange;
  private _cuisineList: Cuisine[];
  private _website: string;
}
