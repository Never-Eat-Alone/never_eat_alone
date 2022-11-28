import * as NeverEatAlone from 'never_eat_alone';
import { DemoDiningEventPageModel } from './demo_dining_event_page_model';
import { DemoLogInModel } from './demo_login_model';
import { DemoEditProfilePageModel } from './demo_edit_profile_page_model';

/** Implements the ApplicationModel for demo purposes. */
export class DemoApplicationModel extends NeverEatAlone.ApplicationModel {
  public async load(): Promise<void> {
    this._headerModel = new NeverEatAlone.LocalHeaderModel();
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
    const japaneseCuisine = new NeverEatAlone.Cuisine(1, 'Japanese', '#F9C638');
    const omakaseCuisine = new NeverEatAlone.Cuisine(2, 'Omakase', '#E1630D');
    const italianCuisine = new NeverEatAlone.Cuisine(3, 'Italian', '#B2DFED');
    const canadianCuisine = new NeverEatAlone.Cuisine(4, 'Canadian', '#8EA142');
    const modernCuisine = new NeverEatAlone.Cuisine(5, 'Modern', '#DA78A5');
    const steakhouseCuisine = new NeverEatAlone.Cuisine(6, 'Steakhouse',
      '#FFF2FE');
    const seafoodCuisine = new NeverEatAlone.Cuisine(7, 'Seafood', '#507286');
    const middleEasternCuisine = new NeverEatAlone.Cuisine(8, 'Middle eastern',
      '#B3A870');
    const frenchCuisine = new NeverEatAlone.Cuisine(9, 'French', '#FFBCBC');
    const traditionalCuisine = new NeverEatAlone.Cuisine(10, 'Traditional',
      '#E5FFD8');
    const bbqCuisine = new NeverEatAlone.Cuisine(11, 'BBQ', '#B27A49');
    const breweryCuisine = new NeverEatAlone.Cuisine(12, 'Brewery', '#C4AA90');
    const persianCuisine = new NeverEatAlone.Cuisine(13, 'Persian', '#FCE1D8');
    const grillCuisine = new NeverEatAlone.Cuisine(14, 'Grill', '#A8A160');
    const chineseCuisine = new NeverEatAlone.Cuisine(15, 'Chinese', '#957DAD');
    const fusionCuisine = new NeverEatAlone.Cuisine(16, 'Fusion', '#FFFED4');
    const eventListSample: NeverEatAlone.EventCardSummary[] = [
      new NeverEatAlone.EventCardSummary(1, 'A night to remmeber at the best \
        sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0), new Date(
        2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
        NeverEatAlone.PriceRange.VERY_EXPENSIVE, [japaneseCuisine,
        omakaseCuisine], 'resources/images/3.jpg', 6, 6, false, '#E1630D'),
      new NeverEatAlone.EventCardSummary(2, 'The best italian restaurant in \
        town!', new Date(2022, 5, 22, 19, 30, 0), new Date(2022, 6, 13, 0, 30,
        0), 'Piano Piano Restaurant', NeverEatAlone.PriceRange.EXPENSIVE, [
        italianCuisine], 'resources/images/4.jpg', 4, 6, false, '#B2DFED'),
      new NeverEatAlone.EventCardSummary(3, "Let's go to Yukashi", new Date(
        2022, 6, 12, 19, 0, 0), new Date(2022, 6, 13, 1, 0, 0), 'Yukashi \
        Japanese Restaurant', NeverEatAlone.PriceRange.VERY_EXPENSIVE, [
        japaneseCuisine, omakaseCuisine], 'resources/images/3.jpg', 6, 6, false,
        '#F9C638'),
      new NeverEatAlone.EventCardSummary(4, 'Who said Duck?!', new Date(2022,
        6, 12, 19, 0, 0), new Date(2022, 6, 13, 1, 0, 0), 'Ration Restaurant',
        NeverEatAlone.PriceRange.VERY_EXPENSIVE, [canadianCuisine,
        modernCuisine], 'resources/images/4.jpg', 6, 6, false, '#DA78A5'),
      new NeverEatAlone.EventCardSummary(5, 'Steak night', new Date(2022, 6,
        12, 19, 0, 0), new Date(2022, 6, 13, 1, 0, 0), "Hy's Steakhouse and \
        bar", NeverEatAlone.PriceRange.VERY_EXPENSIVE, [steakhouseCuisine,
        seafoodCuisine], 'resources/images/5.jpg', 6, 6, false, '#AC4519'),
      new NeverEatAlone.EventCardSummary(6, "Let's try the tasting menu at \
        Azhar.", new Date(2022, 6, 12, 19, 0, 0), new Date(2022, 6, 13, 1, 0,
        0), 'Azhar Restaurant', NeverEatAlone.PriceRange.EXPENSIVE, [
        middleEasternCuisine, modernCuisine], 'resources/images/6.jpg', 6, 6,
        false, '#B3A870'),
      new NeverEatAlone.EventCardSummary(7, 'Calling all the french food \
        lovers', new Date(2022, 6, 12, 19, 0, 0), new Date(2022, 6, 13, 1, 0,
        0), 'Le Select Bistro', NeverEatAlone.PriceRange.MODERATELY_PRICED, [
        frenchCuisine, traditionalCuisine], 'resources/images/7.jpg', 6, 6,
        false, '#6A8716'),
      new NeverEatAlone.EventCardSummary(8, 'Shakshouka for life!', new Date(
        2022, 6, 12, 11, 30, 0), new Date(2022, 6, 13, 1, 0, 0),
        'Amal Restaurant', NeverEatAlone.PriceRange.VERY_EXPENSIVE, [
        middleEasternCuisine, modernCuisine], 'resources/images/8.jpg', 6, 6,
        false, '#DA78A5'),
      new NeverEatAlone.EventCardSummary(9, 'Exceptional view and drinks',
        new Date(2022, 6, 12, 19, 0, 0), new Date(2022, 6, 13, 1, 0, 0),
        'Canoe', NeverEatAlone.PriceRange.EXPENSIVE, [modernCuisine,
        canadianCuisine], 'resources/images/9.jpg', 6, 6, false, '#8EA142'),
      new NeverEatAlone.EventCardSummary(10, 'Celebrating Oktoberfest',
        new Date(2022, 6, 12, 19, 0, 0), new Date(2022, 6, 13, 1, 0, 0),
        'Liberty Commons Smokehouse', NeverEatAlone.PriceRange.INEXPENSIVE, [
        bbqCuisine, breweryCuisine], 'resources/images/10.jpg', 6, 6, false,
        '#B27A49'),
      new NeverEatAlone.EventCardSummary(11, 'Persian grill at its best',
        new Date(2022, 6, 12, 19, 0, 0), new Date(2022, 6, 13, 1, 0, 0),
        'Darbar Persian Grill', NeverEatAlone.PriceRange.VERY_EXPENSIVE, [
        persianCuisine, grillCuisine], 'resources/images/11.jpg', 6, 6, false,
        '#FCE1D8'),
      new NeverEatAlone.EventCardSummary(12, 'Must try fusion food', new Date(
        2022, 6, 12, 19, 0, 0), new Date(2022, 6, 13, 1, 0, 0),
        'R&D Restaurant', NeverEatAlone.PriceRange.EXPENSIVE, [chineseCuisine,
        modernCuisine, fusionCuisine], 'resources/images/12.jpg', 6, 6, false,
        '#957DAD')
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
        bar", NeverEatAlone.PriceRange.VERY_EXPENSIVE, [steakhouseCuisine,
        seafoodCuisine], 'resources/images/5.jpg', 6, 6, false, '#AC4519'),
      new NeverEatAlone.EventCardSummary(6, "Let's try the tasting menu at \
        Azhar.", new Date(2023, 6, 12, 19, 0, 0), new Date(2022, 6, 13, 1, 0,
        0), 'Azhar Restaurant', NeverEatAlone.PriceRange.EXPENSIVE, [
        middleEasternCuisine, modernCuisine], 'resources/images/6.jpg', 6, 6,
        false, '#B3A870'),
      new NeverEatAlone.EventCardSummary(7, 'Calling all the french food \
        lovers', new Date(2023, 1, 10, 19, 30, 0), new Date(2022, 6, 13, 1, 0,
        0), 'Le Select Bistro', NeverEatAlone.PriceRange.MODERATELY_PRICED, [
        frenchCuisine, traditionalCuisine], 'resources/images/7.jpg', 6, 6,
        false, '#6A8716')
    ];
    const totalEventsThisMonth: number = 10;
    const homePageModelGuestUser = new NeverEatAlone.LocalHomePageModel(
      imageListSample, eventListSample, eventTagListEmpty,
      userFutureEventListEmpty, totalEventsThisMonth);
    this._homePageModel = homePageModelGuestUser;
    const userEmma = new NeverEatAlone.User(1, 'Emma', 'emma@gmail.com', 'emma',
      NeverEatAlone.UserStatus.ACTIVE, new Date(2022, 11, 1, 10, 20, 30));
    const emmaProfileImage = new NeverEatAlone.UserProfileImage(1, 1,
      'resources/images/profile5.jpeg');
    const userArthur = new NeverEatAlone.User(2, 'Arthur', 'arthur@gmail.com',
      'arthur123', NeverEatAlone.UserStatus.ACTIVE, new Date(2022, 10, 11, 1, 5,
      35));
    const arthurProfileImage = new NeverEatAlone.UserProfileImage(2, 2,
      'resources/images/profileguy3.jpeg');
    const attendeeList1: NeverEatAlone.Attendee[] = [
      new NeverEatAlone.Attendee(userEmma.id, 1, userEmma.name, 0,
        NeverEatAlone.AttendeeStatus.GOING, emmaProfileImage.src, new Date()),
      new NeverEatAlone.Attendee(userArthur.id, 1, userArthur.name, 0,
        NeverEatAlone.AttendeeStatus.GOING, arthurProfileImage.src, new Date()),
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
      new NeverEatAlone.Attendee(userEmma.id, 1, userEmma.name, 0,
        NeverEatAlone.AttendeeStatus.NOT_GOING, emmaProfileImage.src,
        new Date()),
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
    const attendeeList7: NeverEatAlone.Attendee[] = [];
    this._diningEventModelMap = new Map();
    // Dining event model 1
    const diningEventModel1Description = "Elevate your favourite Kibo Sushi \
    experience with OMAKASE by Kibo (18 courses). \
    \
    Indulge yourself in the delicacy of modern style Omakase performed by our \
    team. In addition to maintaining a Japanese traditional Omakase with \
    carefully chosen seafood by our Executive Chef, we add some spirits of \
    Kibo based on the freshest seasonal ingredients. You will be entertained \
    by beautiful presentations, exquisite service, and heavenly taste. \
    \
    Dinner Menu: \
    \
    https://www.kiboomakase.com/";
    const demoDiningEventModel1 = new DemoDiningEventPageModel(1, '#E1630D', 15,
      'resources/images/3.jpg', 'A night to remmeber at the best sushi \
      restaurant in town!', new NeverEatAlone.Restaurant(1,
      'Yukashi Japanese Restaurant', new Date(), 1, 'One Michelin Star 2022',
      '', '4167869809', NeverEatAlone.PriceRange.VERY_EXPENSIVE, [
      japaneseCuisine, omakaseCuisine], 'yukashi.com'),
      NeverEatAlone.DressCode.BLACK_TIE, NeverEatAlone.Seating.PRIVATE_ROOM,
      new NeverEatAlone.Location(1, '643a Mt Pleasant Rd', '', 'Toronto', 'ON',
      'Canada', 'M4S 2M9', 'Midtown'), 'Alexa Perry', new Date(2022, 6, 12, 19,
      0, 0), new Date(2022, 6, 13, 1, 0, 0), attendeeList1, 10,
      diningEventModel1Description , false, false);
    this._diningEventModelMap.set(1, demoDiningEventModel1);
    // Dining event model 2
    const diningEventModel2Description = "About the restaurant: \
      A collaboration between the Mohyeddin siblings, this family-run Iranian \
      eatery, bar and commissary, is a destination in Toronto’s Queen Street \
      West neighbourhood. For more than a decade, Banu has been serving up the \
      very best of Persian-inspired cocktails, cuisine and culture. \
      \
      Dinner Menu: \
      \
      https://banu.ca/menu";
    const demoDiningEventModel2 = new DemoDiningEventPageModel(2, '#B2DFED',
      20.00, 'resources/images/4.jpg', 'The best italian restaurant in town!',
      new NeverEatAlone.Restaurant(2, 'Piano Piano', new Date(), 2,
      'Piano Piano is managed by a michelin chef from Italy.', '', '6756784354',
      NeverEatAlone.PriceRange.EXPENSIVE, [italianCuisine], 'pianopiano.com'),
      NeverEatAlone.DressCode.CASUAL, NeverEatAlone.Seating.HIGH_TABLE,
      new NeverEatAlone.Location(2, '', '', 'Toronto', 'ON', 'Canada', '',
      'Midtown'), 'Alexa Perry', new Date(2023, 5, 22, 19, 30, 0), new Date(
      2023, 6, 13, 0, 30, 0), attendeeList2, 12, diningEventModel2Description,
      false, true);
    this._diningEventModelMap.set(2, demoDiningEventModel2);
    // Dining event model 7
    const demoDiningEventModel7 = new DemoDiningEventPageModel(7, '#6A8716',
      5.00, 'resources/images/7.jpg', 'Calling all the french food lovers',
      new NeverEatAlone.Restaurant(7, 'Le Select Bistro', new Date(), 7,
      'Classic French food & a wine list of over 1,000 bottles, with \
      vintage posters lining the walls.', 'Go upstairs.', '(416) 626-6262',
      NeverEatAlone.PriceRange.MODERATELY_PRICED, [frenchCuisine,
      traditionalCuisine], 'https://www.leselectbistro.com/'),
      NeverEatAlone.DressCode.BUSINESS_CASUAL,
      NeverEatAlone.Seating.STANDARD, new NeverEatAlone.Location(7,
      '432 Wellington St W', '', 'Toronto', 'ON', 'CA', 'M5V 1E3',
      'Financial District'), 'Sheryl Miller', new Date(2023, 6, 12, 19, 0, 0),
      new Date(2023, 6, 13, 1, 0, 0), attendeeList7, 8, 'Why not.', false,
      true);
    this._diningEventModelMap.set(7, demoDiningEventModel7);
    this._inviteAFoodieModel = new NeverEatAlone.LocalInviteAFoodieModel(
      new NeverEatAlone.UserInvitationCode(1, 1, 'AcFTHD$5Dg'));
    this._joinModel = new NeverEatAlone.LocalJoinModel();
    this._joinModel.load();
    this._partnerWithUsModel = new NeverEatAlone.LocalPartnerWithUsModel();
    this._partnerWithUsModel.load();
    this._logInModel = new DemoLogInModel([userEmma, userArthur], [
      emmaProfileImage, arthurProfileImage]);
    const toronto = new NeverEatAlone.CityProvince(1, 'Toronto', 'ON',
      'Canada');
    const vancouver = new NeverEatAlone.CityProvince(2, 'Vancouver', 'BC',
      'Canada');
    const barrie = new NeverEatAlone.CityProvince(3, 'Barrie', 'ON', 'Canada');
    const englishLanguage = new NeverEatAlone.Language(1, 'English');
    const spanishLanguage = new NeverEatAlone.Language(2, 'Spanish');
    const mandarinLanguage = new NeverEatAlone.Language(3, 'Mandarin');
    const germanLanguage = new NeverEatAlone.Language(4, 'German');
    const frenchLanguage = new NeverEatAlone.Language(5, 'French');
    const farsiLanguage = new NeverEatAlone.Language(6, 'Farsi');
    const emmaLanguageList = [englishLanguage];
    const emmaLanguageNameList = [englishLanguage.name];
    const arthurLanguageList = [englishLanguage.name, frenchLanguage.name];
    const lucyLanguageList = [mandarinLanguage.name, englishLanguage.name,
      spanishLanguage.name, germanLanguage.name];
    const emmaFavoriteCuisines = [frenchCuisine, canadianCuisine, modernCuisine
    ];
    const arthurFavoriteCuisines = [traditionalCuisine, steakhouseCuisine];
    const lucyFavoriteCuisines = [seafoodCuisine, chineseCuisine];
    const eventCardSummaryList = [];
    this._profilePageModelMap = new Map();
    // User Profile Page Model for userEmma
    const emmaCoverImageSrc = 'resources/profile_page/images/default_banner_2.png';
    const emmaBio = 'Hello everyone! My name is Emma and I would love to meet you all and try new foods.';
    const emmaInstagramLink = 'www.instagram.com/@emma12';
    const emmaLocation = barrie;
    const demoProfilePageModel1 = new NeverEatAlone.LocalProfilePageModel(1,
      emmaCoverImageSrc, emmaProfileImage.src, userEmma.name, userEmma.userName,
      userEmma.createdAt, emmaBio, emmaLocation, emmaLanguageNameList, '', '',
      emmaInstagramLink, emmaFavoriteCuisines, [], [
      new NeverEatAlone.EventCardSummary(1, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0), new Date(
      2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [japaneseCuisine,
      omakaseCuisine], 'resources/images/3.jpg', 6, 6, false, '#E1630D')]);
    this._profilePageModelMap.set(1, demoProfilePageModel1);
    // User Profile Page Model for userArthur
    const demoProfilePageModel2 = new NeverEatAlone.LocalProfilePageModel(2,
      'resources/profile_page/images/default_banner_1.png',
      arthurProfileImage.src, userArthur.name, userArthur.userName,
      userArthur.createdAt, 'Ready to explore Toronto.', vancouver,
      arthurLanguageList, 'www.facebook.com/arthur_van',
      'www.twitter.com/@vanfan', '', arthurFavoriteCuisines, [
      new NeverEatAlone.EventCardSummary(7, 'Calling all the french food \
      lovers', new Date(2023, 1, 10, 19, 30, 0), new Date(2022, 6, 13, 1, 0,
      0), 'Le Select Bistro', NeverEatAlone.PriceRange.MODERATELY_PRICED, [
      frenchCuisine, traditionalCuisine], 'resources/images/7.jpg', 6, 6,
      false, '#6A8716')], [
      new NeverEatAlone.EventCardSummary(1, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0), new Date(
      2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [japaneseCuisine,
      omakaseCuisine], 'resources/images/3.jpg', 6, 6, false, '#E1630D'),
      new NeverEatAlone.EventCardSummary(60, "Let's try the tasting menu at \
      Azhar.", new Date(2022, 6, 12, 19, 0, 0), new Date(2022, 6, 13, 1, 0, 0),
      'Azhar Restaurant', NeverEatAlone.PriceRange.EXPENSIVE, [
      middleEasternCuisine, modernCuisine], 'resources/images/6.jpg', 6, 6,
      false, '#B3A870')]);
    this._profilePageModelMap.set(2, demoProfilePageModel2);
    // User Profile Page Model for userLucy
    const demoProfilePageModel3 = new NeverEatAlone.LocalProfilePageModel(3,
      'resources/profile_page/images/default_banner_5.jpg',
      'resources/images/profile2.jpeg', 'Lucy', 'lu2d3', new Date(2022, 4, 2, 2,
      30, 40), 'Matcha everything!', toronto, lucyLanguageList, '', '', '',
      lucyFavoriteCuisines, [new NeverEatAlone.EventCardSummary(5,
      'Steak night', new Date(2022, 6, 12, 19, 0, 0), new Date(2022, 6, 13, 1,
      0, 0), "Hy's Steakhouse and bar", NeverEatAlone.PriceRange.VERY_EXPENSIVE,
      [steakhouseCuisine, seafoodCuisine], 'resources/images/5.jpg', 6, 6,
      false, '#AC4519')], []);
    this._profilePageModelMap.set(3, demoProfilePageModel3);
    // Setting up the _editProfilePageModel map.
    this._editProfilePageModel = new Map();
    // EditProfilePageModel for user1
    const demoEditProfilePageModel1 = new DemoEditProfilePageModel(
      emmaCoverImageSrc, emmaProfileImage.src, 'Emma', 'emma', 1, false, false,
      false, false, emmaBio, false, emmaLanguageList, emmaFavoriteCuisines,
      false, false, false, false, '', '', emmaInstagramLink);
    this._editProfilePageModel.set(1, demoEditProfilePageModel1);
    await Promise.all([this._headerModel.load(), this._homePageModel.load(),
      this._inviteAFoodieModel.load()]);
    return;
  }

  public get headerModel(): NeverEatAlone.HeaderModel {
    return this._headerModel;
  }

  public get homePageModel(): NeverEatAlone.HomePageModel {
    return this._homePageModel;
  }

  public getDiningEventPageModel(id: number):
      NeverEatAlone.DiningEventPageModel {
    return this._diningEventModelMap.get(id);
  }

  public get inviteAFoodieModel(): NeverEatAlone.InviteAFoodieModel {
    return this._inviteAFoodieModel;
  }

  public get joinModel(): NeverEatAlone.JoinModel {
    return this._joinModel;
  }

  public get partnerWithUsModel(): NeverEatAlone.PartnerWithUsModel {
    return this._partnerWithUsModel;
  }

  public get logInModel(): NeverEatAlone.LogInModel {
    return this._logInModel;
  }

  public getProfilePageModel(id: number): NeverEatAlone.ProfilePageModel {
    return this._profilePageModelMap.get(id);
  }

  public getEditProfilePageModel(id: number):
      NeverEatAlone.EditProfilePageModel {
    return this._editProfilePageModel.get(id);
  }

  private _headerModel: NeverEatAlone.HeaderModel;
  private _homePageModel: NeverEatAlone.HomePageModel;
  private _diningEventModelMap: Map<number, NeverEatAlone.DiningEventPageModel>;
  private _inviteAFoodieModel: NeverEatAlone.InviteAFoodieModel;
  private _joinModel: NeverEatAlone.JoinModel;
  private _partnerWithUsModel: NeverEatAlone.PartnerWithUsModel;
  private _logInModel: NeverEatAlone.LogInModel;
  private _profilePageModelMap: Map<number, NeverEatAlone.ProfilePageModel>;
  private _editProfilePageModel: Map<number,
    NeverEatAlone.EditProfilePageModel>;
}
