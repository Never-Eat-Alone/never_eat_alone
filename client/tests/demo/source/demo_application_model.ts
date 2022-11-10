import * as NeverEatAlone from 'never_eat_alone';

/** Implements the ApplicationModel for demo purposes. */
export class DemoApplicationModel extends NeverEatAlone.ApplicationModel {
  public load(): Promise<void> {
    this._headerModel = new NeverEatAlone.LocalHeaderModel();
    this._account = NeverEatAlone.User.makeGuest();
    const imageListEmpty: NeverEatAlone.SocialMediaImage[] = [];
    const imageListSample: NeverEatAlone.SocialMediaImage[] = [
      new NeverEatAlone.SocialMediaImage(1, 'resources/images/2.jpg'),
      new NeverEatAlone.SocialMediaImage(2, 'resources/images/3.jpg'),
      new NeverEatAlone.SocialMediaImage(3, 'resources/images/4.jpg'),
      new NeverEatAlone.SocialMediaImage(4, 'resources/images/5.jpg'),
      new NeverEatAlone.SocialMediaImage(5, 'resources/images/6.jpg'),
      new NeverEatAlone.SocialMediaImage(6, 'resources/images/7.jpg'),
      new NeverEatAlone.SocialMediaImage(7, 'resources/images/8.jpg'),
      new NeverEatAlone.SocialMediaImage(8, 'resources/images/9.jpg'),
      new NeverEatAlone.SocialMediaImage(9, 'resources/images/10.jpg'),
      new NeverEatAlone.SocialMediaImage(10, 'resources/images/11.jpg'),
      new NeverEatAlone.SocialMediaImage(11, 'resources/images/12.jpg'),
      new NeverEatAlone.SocialMediaImage(12, 'resources/images/13.jpg')
    ];
    const eventListEmpty: NeverEatAlone.EventCardSummary[] = [];
    const eventListSample: NeverEatAlone.EventCardSummary[] = [
      new NeverEatAlone.EventCardSummary(1, 'A night to remmeber at the best \
        sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0), new Date(
        2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
        NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
        'Japanese', '#F9C638'), new NeverEatAlone.Cuisine(2, 'Omakase',
        '#E1630D')], 'resources/images/3.jpg', 6, 6, false, '#E1630D'),
      new NeverEatAlone.EventCardSummary(2, 'The best italian restaurant in \
        town!', new Date(2022, 5, 22, 19, 30, 0), new Date(2022, 6, 13, 0, 30,
        0), 'Piano Piano Restaurant', NeverEatAlone.PriceRange.EXPENSIVE, [
        new NeverEatAlone.Cuisine(3, 'Italian', '#B2DFED')],
        'resources/images/4.jpg', 4, 6, false, '#B2DFED'),
      new NeverEatAlone.EventCardSummary(3, "Let's go to Yukashi", new Date(
        2022, 6, 12, 19, 0, 0), new Date(2022, 6, 13, 1, 0, 0), 'Yukashi \
        Japanese Restaurant', NeverEatAlone.PriceRange.VERY_EXPENSIVE, [
        new NeverEatAlone.Cuisine(1, 'Japanese', '#F9C638'),
        new NeverEatAlone.Cuisine(2, 'Omakase', '#E1630D')],
        'resources/images/3.jpg', 6, 6, false, '#F9C638'),
      new NeverEatAlone.EventCardSummary(4, 'Who said Duck?!', new Date(2022,
        6, 12, 19, 0, 0), new Date(2022, 6, 13, 1, 0, 0), 'Ration Restaurant',
        NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(4,
        'Canadian', '#8EA142'), new NeverEatAlone.Cuisine(5, 'Modern',
        '#DA78A5')], 'resources/images/4.jpg', 6, 6, false, '#DA78A5'),
      new NeverEatAlone.EventCardSummary(5, 'Steak night', new Date(2022, 6,
        12, 19, 0, 0), new Date(2022, 6, 13, 1, 0, 0), "Hy's Steakhouse and \
        bar", NeverEatAlone.PriceRange.VERY_EXPENSIVE, [
        new NeverEatAlone.Cuisine(6, 'Steakhouse', '#AC4519'),
        new NeverEatAlone.Cuisine(7, 'Seafood', '#507286')],
        'resources/images/5.jpg', 6, 6, false, '#AC4519'),
      new NeverEatAlone.EventCardSummary(6, "Let's try the tasting menu at \
        Azhar.", new Date(2022, 6, 12, 19, 0, 0), new Date(2022, 6, 13, 1, 0,
        0), 'Azhar Restaurant', NeverEatAlone.PriceRange.EXPENSIVE, [
        new NeverEatAlone.Cuisine(8, 'Middle eastern', '#B3A870'),
        new NeverEatAlone.Cuisine(5, 'Modern', '#DA78A5')],
        'resources/images/6.jpg', 6, 6, false, '#B3A870'),
      new NeverEatAlone.EventCardSummary(7, 'Calling all the french food \
        lovers', new Date(2022, 6, 12, 19, 0, 0), new Date(2022, 6, 13, 1, 0,
        0), 'Le Select Bistro', NeverEatAlone.PriceRange.MODERATELY_PRICED, [
        new NeverEatAlone.Cuisine(9, 'French', '#98160C'),
        new NeverEatAlone.Cuisine(10, 'Traditional', '#6A8716')],
        'resources/images/7.jpg', 6, 6, false, '#6A8716'),
      new NeverEatAlone.EventCardSummary(8, 'Shakshouka for life!', new Date(
        2022, 6, 12, 11, 30, 0), new Date(2022, 6, 13, 1, 0, 0),
        'Amal Restaurant', NeverEatAlone.PriceRange.VERY_EXPENSIVE, [
        new NeverEatAlone.Cuisine(8, 'Middle eastern', '#B3A870'),
        new NeverEatAlone.Cuisine(5, 'Modern', '#DA78A5')],
        'resources/images/8.jpg', 6, 6, false, '#DA78A5'),
      new NeverEatAlone.EventCardSummary(9, 'Exceptional view and drinks',
        new Date(2022, 6, 12, 19, 0, 0), new Date(2022, 6, 13, 1, 0, 0),
        'Canoe', NeverEatAlone.PriceRange.EXPENSIVE, [
        new NeverEatAlone.Cuisine(5, 'Modern', '#DA78A5'),
        new NeverEatAlone.Cuisine(4, 'Canadian', '#8EA142')],
        'resources/images/9.jpg', 6, 6, false, '#8EA142'),
      new NeverEatAlone.EventCardSummary(10, 'Celebrating Oktoberfest',
        new Date(2022, 6, 12, 19, 0, 0), new Date(2022, 6, 13, 1, 0, 0),
        'Liberty Commons Smokehouse', NeverEatAlone.PriceRange.INEXPENSIVE, [
        new NeverEatAlone.Cuisine(11, 'BBQ', '#B27A49'),
        new NeverEatAlone.Cuisine(12, 'Brewery', '#C4AA90')],
        'resources/images/10.jpg', 6, 6, false, '#B27A49'),
      new NeverEatAlone.EventCardSummary(11, 'Persian grill at its best',
        new Date(2022, 6, 12, 19, 0, 0), new Date(2022, 6, 13, 1, 0, 0),
        'Darbar Persian Grill', NeverEatAlone.PriceRange.VERY_EXPENSIVE, [
        new NeverEatAlone.Cuisine(13, 'Persian', '#FCE1D8'),
        new NeverEatAlone.Cuisine(14, 'Grill', '#A8A160')],
        'resources/images/11.jpg', 6, 6, false, '#FCE1D8'),
      new NeverEatAlone.EventCardSummary(12, 'Must try fusion food', new Date(
        2022, 6, 12, 19, 0, 0), new Date(2022, 6, 13, 1, 0, 0),
        'R&D Restaurant', NeverEatAlone.PriceRange.EXPENSIVE, [
        new NeverEatAlone.Cuisine(15, 'Chinese', '#957DAD'),
        new NeverEatAlone.Cuisine(5, 'Modern', '#DA78A5'),
        new NeverEatAlone.Cuisine(16, 'Fusion', '#FFFED4')],
        'resources/images/12.jpg', 6, 6, false, '#957DAD')
    ];
    const eventTagListEmpty: NeverEatAlone.EventTag[] = [];
    const eventTagListSample: NeverEatAlone.EventTag[] = [
      new NeverEatAlone.EventTag(1, 'A night to remmeber at the best sushi \
        restaurant in town!', '#E1630D'),
      new NeverEatAlone.EventTag(2, 'The best italian restaurant in town!',
        '#B2DFED'),
      new NeverEatAlone.EventTag(3, "Let's go to Yukashi", '#F9C638'),
      new NeverEatAlone.EventTag(4, 'Who said Duck?!', '#DA78A5'),
      new NeverEatAlone.EventTag(7, 'Calling all the french food lovers',
        '#6A8716'),
      new NeverEatAlone.EventTag(9, 'Exceptional view and drinks', '#8EA142'),
      new NeverEatAlone.EventTag(10, 'Celebrating Oktoberfest', '#B27A49'),
      new NeverEatAlone.EventTag(12 , 'Must try fusion food', '#957DAD')
    ];
    const userFutureEventListEmpty: NeverEatAlone.EventCardSummary[] = [];
    const userFutureEventListSample: NeverEatAlone.EventCardSummary[] = [
      new NeverEatAlone.EventCardSummary(5, 'Steak night', new Date(2022, 6,
        12, 19, 0, 0), new Date(2022, 6, 13, 1, 0, 0), "Hy's Steakhouse and \
        bar", NeverEatAlone.PriceRange.VERY_EXPENSIVE, [
        new NeverEatAlone.Cuisine(6, 'Steakhouse', '#AC4519'),
        new NeverEatAlone.Cuisine(7, 'Seafood', '#507286')],
        'resources/images/5.jpg', 6, 6, false, '#AC4519'),
      new NeverEatAlone.EventCardSummary(6, "Let's try the tasting menu at \
        Azhar.", new Date(2022, 6, 12, 19, 0, 0), new Date(2022, 6, 13, 1, 0,
        0), 'Azhar Restaurant', NeverEatAlone.PriceRange.EXPENSIVE, [
        new NeverEatAlone.Cuisine(8, 'Middle eastern', '#B3A870'),
        new NeverEatAlone.Cuisine(5, 'Modern', '#DA78A5')],
        'resources/images/6.jpg', 6, 6, false, '#B3A870'),
      new NeverEatAlone.EventCardSummary(7, 'Calling all the french food \
        lovers', new Date(2022, 6, 12, 19, 0, 0), new Date(2022, 6, 13, 1, 0,
        0), 'Le Select Bistro', NeverEatAlone.PriceRange.MODERATELY_PRICED, [
        new NeverEatAlone.Cuisine(9, 'French', '#98160C'),
        new NeverEatAlone.Cuisine(10, 'Traditional', '#6A8716')],
        'resources/images/7.jpg', 6, 6, false, '#6A8716')
    ];
    const totalEventsThisMonth: number = 10;
    const homePageModelGuestUser = new NeverEatAlone.LocalHomePageModel(
      imageListSample, eventListSample, eventTagListEmpty,
      userFutureEventListEmpty, totalEventsThisMonth);
    this._homePageModel = homePageModelGuestUser;
    return;
  }

  public getAccount(): NeverEatAlone.User {
    return this._account;
  }

  public getHeaderModel(): NeverEatAlone.HeaderModel {
    return this._headerModel;
  }

  public getHomePageModel(): NeverEatAlone.HomePageModel {
    return this._homePageModel;
  }

  _headerModel: NeverEatAlone.HeaderModel;
  _account: NeverEatAlone.User;
  _homePageModel: NeverEatAlone.HomePageModel;
}
