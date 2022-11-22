import * as NeverEatAlone from 'never_eat_alone';

/** Implements the ApplicationModel for demo purposes. */
export class DemoApplicationModel extends NeverEatAlone.ApplicationModel {
  public async load(): Promise<void> {
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
    const attendeeList1: NeverEatAlone.Attendee[] = [
      new NeverEatAlone.Attendee(1, 1, 'Greg', 0,
        NeverEatAlone.AttendeeStatus.GOING, 'resources/images/profileguy2.jpeg',
        new Date()),
      new NeverEatAlone.Attendee(2, 1, 'Princess', 0,
        NeverEatAlone.AttendeeStatus.GOING, 'resources/images/profile1.jpeg',
        new Date()),
      new NeverEatAlone.Attendee(3, 1, 'tofu55', 0,
        NeverEatAlone.AttendeeStatus.GOING, 'resources/images/10.jpg',
        new Date()),
      new NeverEatAlone.Attendee(4, 1, 'MarkTheFoodie', 0,
        NeverEatAlone.AttendeeStatus.GOING, 'resources/images/profileguy3.jpeg',
        new Date()),
      new NeverEatAlone.Attendee(5, 1, 'Riley', 0,
        NeverEatAlone.AttendeeStatus.GOING, 'resources/images/profile2.jpeg',
        new Date()),
      new NeverEatAlone.Attendee(6, 1, 'Lili', 0,
        NeverEatAlone.AttendeeStatus.GOING, 'resources/images/profile3.jpeg',
        new Date()),
      new NeverEatAlone.Attendee(7, 1, 'Elena', 0,
        NeverEatAlone.AttendeeStatus.NOT_GOING,
        'resources/images/profile4.jpeg', new Date()),
      new NeverEatAlone.Attendee(8, 1, 'John', 0,
        NeverEatAlone.AttendeeStatus.GOING, 'resources/images/profileguy4.jpeg',
        new Date()),
      new NeverEatAlone.Attendee(9, 1, 'Jess', 2,
        NeverEatAlone.AttendeeStatus.NOT_GOING,
        'resources/images/profile5.jpeg', new Date()),
      new NeverEatAlone.Attendee(10, 1, 'Arthur', 1,
        NeverEatAlone.AttendeeStatus.GOING, 'resources/images/profileguy5.jpeg',
        new Date())
    ];
    const attendeeList2: NeverEatAlone.Attendee[] = [
      new NeverEatAlone.Attendee(3, 1, 'tofu55', 0,
        NeverEatAlone.AttendeeStatus.GOING, 'resources/images/10.jpg',
        new Date()),
      new NeverEatAlone.Attendee(4, 1, 'MarkTheFoodie', 0,
        NeverEatAlone.AttendeeStatus.GOING, 'resources/images/profileguy3.jpeg',
        new Date()),
      new NeverEatAlone.Attendee(7, 1, 'Elena', 0,
        NeverEatAlone.AttendeeStatus.NOT_GOING,
        'resources/images/profile4.jpeg', new Date()),
      new NeverEatAlone.Attendee(8, 1, 'John', 0,
        NeverEatAlone.AttendeeStatus.GOING, 'resources/images/profileguy4.jpeg',
        new Date()),
      new NeverEatAlone.Attendee(9, 1, 'Jess', 2,
        NeverEatAlone.AttendeeStatus.NOT_GOING,
        'resources/images/profile5.jpeg', new Date()),
      new NeverEatAlone.Attendee(10, 1, 'Arthur', 1,
        NeverEatAlone.AttendeeStatus.GOING, 'resources/images/profileguy5.jpeg',
        new Date())
    ];
    this._diningEventModelMap = new Map();
    // Dining event model 1
    const localDiningEventModel1 = new NeverEatAlone.LocalDiningEventPageModel(
      '#E1630D', 15, 'resources/images/3.jpg', 'A night to remmeber at the \
      best sushi restaurant in town!', new NeverEatAlone.Restaurant(1,
      'Yukashi Japanese Restaurant', new Date(), 1, 'One Michelin Star 2022',
      '', '4167869809', NeverEatAlone.PriceRange.VERY_EXPENSIVE, [
      new NeverEatAlone.Cuisine(1, 'Japanese', '#F9C638'),
      new NeverEatAlone.Cuisine(2, 'Omakase', '#E1630D')], 'yukashi.com'),
      NeverEatAlone.DressCode.BLACK_TIE, NeverEatAlone.Seating.PRIVATE_ROOM,
      new NeverEatAlone.Location(1, '643a Mt Pleasant Rd', '', 'Toronto', 'ON',
      'Canada', 'M4S 2M9', 'Midtown'), 'Alexa Perry', new Date(2022, 6, 12, 19,
      0, 0), new Date(2022, 6, 13, 1, 0, 0), attendeeList2, 10, '', false,
      false, false);
    this._diningEventModelMap.set(1, localDiningEventModel1);
    // Dining event model 2
    const localDiningEventModel2 = new NeverEatAlone.LocalDiningEventPageModel(
      '#B2DFED', 20.00, 'resources/images/4.jpg', 'The best italian restaurant \
      in town!', new NeverEatAlone.Restaurant(2, 'Piano Piano', new Date(), 2,
      'Piano Piano is managed by a michelin chef from Italy.', '', '6756784354',
      NeverEatAlone.PriceRange.EXPENSIVE, [new NeverEatAlone.Cuisine(3,
      'Italian', '#B2DFED')], 'pianopiano.com'), NeverEatAlone.DressCode.CASUAL,
      NeverEatAlone.Seating.HIGH_TABLE, new NeverEatAlone.Location(2,
      '', '', 'Toronto', 'ON', 'Canada', '', 'Midtown'),
      'Alexa Perry', new Date(2023, 5, 22, 19, 30, 0), new Date(2023, 6, 13,
      0, 30, 0), attendeeList1, 12, '', false, false, true);
    this._diningEventModelMap.set(2, localDiningEventModel2);
    // Dining event model 7
    const localDiningEventModel7 = new NeverEatAlone.LocalDiningEventPageModel(
      '#6A8716', 5.00, 'resources/images/7.jpg', 'Calling all the french food \
      lovers', new NeverEatAlone.Restaurant(7, 'Le Select Bistro', new Date(),
      7, 'Classic French food & a wine list of over 1,000 bottles, with \
      vintage posters lining the walls.', 'Go upstairs.', '(416) 626-6262',
      NeverEatAlone.PriceRange.MODERATELY_PRICED, [new NeverEatAlone.Cuisine(9,
      'French', '#98160C'), new NeverEatAlone.Cuisine(10, 'Traditional',
      '#6A8716')], 'https://www.leselectbistro.com/'),
      NeverEatAlone.DressCode.BUSINESS_CASUAL,
      NeverEatAlone.Seating.STANDARD, new NeverEatAlone.Location(7,
      '432 Wellington St W', '', 'Toronto', 'ON', 'CA', 'M5V 1E3',
      'Financial District'), 'Sheryl Miller', new Date(2023, 6, 12, 19, 0, 0),
      new Date(2023, 6, 13, 1, 0, 0), [], 8, '', false, false, true);
    this._diningEventModelMap.set(7, localDiningEventModel7);
    this._inviteAFoodieModel = new NeverEatAlone.LocalInviteAFoodieModel(
      new NeverEatAlone.UserInvitationCode(1, 1, 'AcFTHD$5Dg'));
    this._joinModel = new NeverEatAlone.LocalJoinModel();
    this._joinModel.load();
    this._partnerWithUsModel = new NeverEatAlone.LocalPartnerWithUsModel();
    this._partnerWithUsModel.load();
    const userEmma = new NeverEatAlone.User(1, 'Emma',
      'info+emma@nevereatalone.net', 'emma', NeverEatAlone.UserStatus.ACTIVE,
      new Date(2022, 11, 1, 10, 20, 30));
    this._logInModel = new NeverEatAlone.LocalLogInModel(userEmma);
    await Promise.all([this._headerModel.load(), this._homePageModel.load(),
      this._inviteAFoodieModel.load()]);
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

  public getDiningEventPageModel(id: number):
      NeverEatAlone.DiningEventPageModel {
    return this._diningEventModelMap.get(id);
  }

  public getInviteAFoodieModel(): NeverEatAlone.InviteAFoodieModel {
    return this._inviteAFoodieModel;
  }

  public getJoinModel(): NeverEatAlone.JoinModel {
    return this._joinModel;
  }

  public getPartnerWithUsModel(): NeverEatAlone.PartnerWithUsModel {
    return this._partnerWithUsModel;
  }

  public getLogInModel(): NeverEatAlone.LogInModel {
    return this._logInModel;
  }

  private _headerModel: NeverEatAlone.HeaderModel;
  private _account: NeverEatAlone.User;
  private _homePageModel: NeverEatAlone.HomePageModel;
  private _diningEventModelMap: Map<number, NeverEatAlone.DiningEventPageModel>;
  private _inviteAFoodieModel: NeverEatAlone.InviteAFoodieModel;
  private _joinModel: NeverEatAlone.JoinModel;
  private _partnerWithUsModel: NeverEatAlone.PartnerWithUsModel;
  private _logInModel: NeverEatAlone.LogInModel;
}
