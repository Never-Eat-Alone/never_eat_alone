import * as NeverEatAlone from 'never_eat_alone';
import { ArrayInput, AttendeeInput, BooleanInput, CityProvinceInput, CSSInput,
  CuisineInput, DateInput, DateTimeInput, DisplayModeInput, DressCodeInput,
  EventCardSummaryInput, EventTagInput, ForgotPasswordPageErrorCodeInput,
  HomePageErrorCodeInput, LanguageInput, LocationInput, NumberInput,
  PaymentCardInput, RestaurantInput, SeatingInput, SignUpPageErrorCodeInput,
  SocialMediaImageInput, TextInput, UserInput } from '../viewer/propertyInput';
import { ComponentSchema, PropertySchema, SignalSchema } from './schemas';

/** Loads the complete list of schemas available to test. */
export function loadComponentSchemas(): ComponentSchema[] {
  const logoSchema = new ComponentSchema('HeaderLogo',
    [new PropertySchema('style', {}, CSSInput),
    new PropertySchema('displayMode', NeverEatAlone.DisplayMode.DESKTOP,
    DisplayModeInput)], [], NeverEatAlone.HeaderLogo);
  const primaryTextButtonSchema = new ComponentSchema('Primary Text Button', [
    new PropertySchema('label', 'Get in touch', TextInput),
    new PropertySchema('labelStyle', {}, CSSInput),
    new PropertySchema('style', { width: '161px', height: '35px' }, CSSInput),
    new PropertySchema('disabled', false, BooleanInput)],
    [new SignalSchema('onClick', '', [])], NeverEatAlone.PrimaryTextButton);
  const invertedSecondaryTextButtonSchema = new ComponentSchema(
    'InvertedSecondaryTextButton',
    [
      new PropertySchema('style', {}, CSSInput),
      new PropertySchema('label', 'login', TextInput),
      new PropertySchema('labelStyle', {}, CSSInput),
      new PropertySchema('disabled', false, BooleanInput)],
    [new SignalSchema('onClick', '', [])],
    NeverEatAlone.InvertedSecondaryTextButton);
  const accentTextButtonSchema = new ComponentSchema(
    'AccentTextButton', [new PropertySchema('style', {}, CSSInput),
    new PropertySchema('label', 'join', TextInput),
    new PropertySchema('labelStyle', {}, CSSInput),
    new PropertySchema('disabled', false, BooleanInput)],
    [new SignalSchema('onClick', '', [])],
    NeverEatAlone.AccentTextButton);
  const whiteNavLinkSchema = new ComponentSchema(
    'WhiteNavLink', [
      new PropertySchema('label', 'What is NEA?', TextInput),
      new PropertySchema('to', '/What_is_NEA', TextInput),
      new PropertySchema('style', {}, CSSInput),
      new PropertySchema('className', '', TextInput)], [],
    NeverEatAlone.WhiteNavLink);
  const emailInputFieldSchema = new ComponentSchema('Email Inputfield', [
    new PropertySchema('hasError', false, BooleanInput),
    new PropertySchema('disabled', false, BooleanInput)
  ], [], NeverEatAlone.EmailInputField);
  const nameInputFieldSchema = new ComponentSchema('Name Inputfield', [
    new PropertySchema('iconSrc', '', TextInput),
    new PropertySchema('iconAlt', '', TextInput),
    new PropertySchema('hasError', false, BooleanInput),
    new PropertySchema('disabled', false, BooleanInput),
    new PropertySchema('iconStyle', {}, CSSInput),
    new PropertySchema('iconContainerStyle', {}, CSSInput)
  ], [], NeverEatAlone.NameInputField);
  const inputFieldSchema = new ComponentSchema('Inputfield', [
    new PropertySchema('hasError', false, BooleanInput),
    new PropertySchema('disabled', false, BooleanInput)
  ], [], NeverEatAlone.InputField);
  const headerNotLoggedInSchema = new ComponentSchema(
    'Header Not Logged in', [
      new PropertySchema('displayMode', NeverEatAlone.DisplayMode.DESKTOP,
      DisplayModeInput),
      new PropertySchema('account', NeverEatAlone.User.makeGuest(),
      UserInput),
      new PropertySchema('profileImageSrc', '', TextInput)],
    [
      new SignalSchema('onMenuClick', '', []),
      new SignalSchema('onLogInButton', '', []),
      new SignalSchema('onJoinButton', '', []),
      new SignalSchema('onLogOut', '', [])],
    NeverEatAlone.Header);
  const headerLoggedInSchema = new ComponentSchema('Header Logged in', [
      new PropertySchema('displayMode', NeverEatAlone.DisplayMode.DESKTOP,
      DisplayModeInput),
      new PropertySchema('account', new NeverEatAlone.User(2, 'Arthur2345',
      'info+arthur@nevereatalone.net', 'arthur2345',
      NeverEatAlone.UserStatus.ACTIVE, new Date()), UserInput),
      new PropertySchema('profileImageSrc', '', TextInput)],
    [
      new SignalSchema('onMenuClick', '', []),
      new SignalSchema('onLogInButton', '', []),
      new SignalSchema('onJoinButton', '', []),
      new SignalSchema('onLogOut', '', [])],
    NeverEatAlone.Header);
  const footerSchema = new ComponentSchema('Footer',
    [
      new PropertySchema('displayMode', NeverEatAlone.DisplayMode.DESKTOP,
      DisplayModeInput),
      new PropertySchema('backgroundColor', 'transparent', TextInput),
      new PropertySchema('isBackgroundImage', true, BooleanInput)],
    [new SignalSchema('onInviteAFoodie', '', [])], NeverEatAlone.Footer);
  const heroNotLoggedInSchema = new ComponentSchema('Hero Not Loggedin',
    [
      new PropertySchema('displayMode', NeverEatAlone.DisplayMode.DESKTOP,
      DisplayModeInput),
      new PropertySchema('account', NeverEatAlone.User.makeGuest(), UserInput),
      new PropertySchema('numberOfTotalEventsInMonth', 10, NumberInput),
      new PropertySchema('eventTagList', [], ArrayInput(new PropertySchema(
      'eventTag', new NeverEatAlone.EventTag(1, 'Join us for dinner', 'yellow'),
      EventTagInput)))],
    [new SignalSchema('onJoinButton', '', [])], NeverEatAlone.Hero);
  const heroLoggedInNoEventSchema = new ComponentSchema('Hero Loggedin No Event'
    ,[
      new PropertySchema('displayMode', NeverEatAlone.DisplayMode.DESKTOP,
      DisplayModeInput),
      new PropertySchema('account', new NeverEatAlone.User(2, 'Arthur2345',
      'info+arthur@nevereatalone.net', 'arthur2345',
      NeverEatAlone.UserStatus.ACTIVE, new Date()), UserInput),
      new PropertySchema('numberOfTotalEventsInMonth', 10, NumberInput),
      new PropertySchema('eventTagList', [], ArrayInput(new PropertySchema(
      'eventTag', new NeverEatAlone.EventTag(1, 'Join us for dinner', 'yellow'),
      EventTagInput)))],
    [new SignalSchema('onJoinButton', '', [])], NeverEatAlone.Hero);
  const heroLoggedInWithEventSchema = new ComponentSchema('Hero Loggedin With \
    Event', [
      new PropertySchema('displayMode', NeverEatAlone.DisplayMode.DESKTOP,
      DisplayModeInput),
      new PropertySchema('account', new NeverEatAlone.User(2, 'Arthur2345',
      'info+arthur@nevereatalone.net', 'arthur2345',
      NeverEatAlone.UserStatus.ACTIVE, new Date()), UserInput),
      new PropertySchema('numberOfTotalEventsInMonth', 10, NumberInput),
      new PropertySchema('eventTagList', [new NeverEatAlone.EventTag(1,
      'Join us for dinner', 'yellow'), new NeverEatAlone.EventTag(2,
      'Brunch with a show!', 'orange'), new NeverEatAlone.EventTag(3,
      'dinner and live music', 'blue'), new NeverEatAlone.EventTag(4,
      'Best new restaurants serries', 'red')], ArrayInput(new PropertySchema(
      'eventTag', new NeverEatAlone.EventTag(1, 'Join us for dinner', 'yellow'),
      EventTagInput)))],
    [new SignalSchema('onJoinButton', '', [])], NeverEatAlone.Hero);
  const diningEventCardSchema = new ComponentSchema('Dining Event Card',
    [
      new PropertySchema('displayMode', NeverEatAlone.DisplayMode.DESKTOP,
      DisplayModeInput),
      new PropertySchema('id', -1, NumberInput),
      new PropertySchema('imageSrc', '', TextInput),
      new PropertySchema('title',
      'Must try! Best french restaurant in the city.', TextInput),
      new PropertySchema('restaurantName', 'Le Banane', TextInput),
      new PropertySchema('priceRange', NeverEatAlone.PriceRange.EXPENSIVE,
      TextInput),
      new PropertySchema('startTime', new Date(2022, 6, 17, 18, 30), DateInput),
      new PropertySchema('endTime', new Date(2022, 6, 18, 0, 30), DateInput),
      new PropertySchema('cuisines', [
      new NeverEatAlone.Cuisine(1, 'Steakhouse', '#FFE1D8'),
      new NeverEatAlone.Cuisine(2, 'Japanese', '#DBFFFB'),
      new NeverEatAlone.Cuisine(3, 'Modern', '#FFF2FE')],
      ArrayInput(new PropertySchema(
      'cuisine', new NeverEatAlone.Cuisine(1, 'French', 'yellow'),
      CuisineInput))),
      new PropertySchema('numberOfAttendees', 12, NumberInput),
      new PropertySchema('numberOfSeats', 15, NumberInput),
      new PropertySchema('isAttending', false, BooleanInput),
      new PropertySchema('isLoggedIn', false, BooleanInput),
      new PropertySchema('color', 'blue', TextInput),
      new PropertySchema('style', {}, CSSInput),
      new PropertySchema('className', '', TextInput)],
      [], NeverEatAlone.DiningEventCard);
  const albumCardSchema = new ComponentSchema('AlbumCard', [
      new PropertySchema('displayMode', NeverEatAlone.DisplayMode.DESKTOP,
      DisplayModeInput),
      new PropertySchema('id', 1, NumberInput),
      new PropertySchema('src', 'resources/images/1.jpg', TextInput)],
    [new SignalSchema('onClick', '', [])], NeverEatAlone.AlbumCard);
  const userUpcomingEventsSummarySchema = new ComponentSchema(
    'UserUpcomingEventsSummary', [
      new PropertySchema('displayMode', NeverEatAlone.DisplayMode.MOBILE,
      DisplayModeInput),
      new PropertySchema('upcomingEventList', [
      new NeverEatAlone.EventCardSummary(1, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0), new Date(
      2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')],
      'resources/images/3.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(2, 'A night to remmeber at the best \
      italian restaurant in town!', new Date(2022, 5, 22, 19, 30, 0),
      new Date(2022, 6, 13, 0, 30, 0), 'Piano Piano Restaurant',
      NeverEatAlone.PriceRange.EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Italian', 'blue')], 'resources/images/4.jpg', 4, 6, false, 'red'),
      new NeverEatAlone.EventCardSummary(3, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/3.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(4, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/4.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(5, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/5.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(6, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/6.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(7, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/7.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(8, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/8.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(9, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/9.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(10, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/10.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(11, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/11.jpg', 6, 6, false, 'green'),
      new NeverEatAlone.EventCardSummary(12, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/12.jpg', 6, 6, false, 'black')],
      ArrayInput(
        new PropertySchema('EventCardSummary',
        new NeverEatAlone.EventCardSummary(1, 'best french restaurant',
        new Date(2022, 6, 12, 19, 0, 0), new Date(2022, 6, 12, 23, 0, 0),
        'Le Select', NeverEatAlone.PriceRange.EXPENSIVE, [], '', 12, 12, true,
        'yellow'), EventCardSummaryInput)))
    ], [], NeverEatAlone.UserUpcomingEventsSummary);
  const exploreEventsSummarySchema = new ComponentSchema('ExploreEventsSummary',
    [
      new PropertySchema('displayMode', NeverEatAlone.DisplayMode.MOBILE,
      DisplayModeInput),
      new PropertySchema('eventList', [
      new NeverEatAlone.EventCardSummary(1, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/3.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(2, 'A night to remmeber at the best \
      italian restaurant in town!', new Date(2022, 5, 22, 19, 30, 0),
      new Date(2022, 6, 13, 0, 30, 0), 'Piano Piano Restaurant',
      NeverEatAlone.PriceRange.EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Italian', 'blue')], 'resources/images/4.jpg', 4, 6, false, 'red'),
      new NeverEatAlone.EventCardSummary(3, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/3.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(4, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/4.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(5, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/5.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(6, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/6.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(7, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/7.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(8, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/8.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(9, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/9.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(10, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/10.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(11, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/11.jpg', 6, 6, false, 'green'),
      new NeverEatAlone.EventCardSummary(12, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/12.jpg', 6, 6, false, 'black')],
      ArrayInput(
        new PropertySchema('EventCardSummary',
        new NeverEatAlone.EventCardSummary(1, 'best french restaurant',
        new Date(2022, 6, 12, 19, 0, 0), new Date(2022, 6, 12, 23, 0, 0),
        'Le Select', NeverEatAlone.PriceRange.EXPENSIVE, [], '', 12, 12, true,
        'yellow'), EventCardSummaryInput))),
      new PropertySchema('isLoggedIn', false, BooleanInput)
    ], [], NeverEatAlone.ExploreEventsSummary);
    const exploreEventsSummaryEmptySchema = new ComponentSchema(
      'ExploreEventsSummary Empty', [
      new PropertySchema('displayMode', NeverEatAlone.DisplayMode.MOBILE,
      DisplayModeInput),
      new PropertySchema('eventList', [],
      ArrayInput(
        new PropertySchema('EventCardSummary',
        new NeverEatAlone.EventCardSummary(1, 'best french restaurant',
        new Date(2022, 6, 12, 19, 0, 0), new Date(2022, 6, 12, 23, 0, 0),
        'Le Select', NeverEatAlone.PriceRange.EXPENSIVE, [], '', 12, 12, true,
        'yellow'), EventCardSummaryInput))),
      new PropertySchema('isLoggedIn', false, BooleanInput)
    ], [], NeverEatAlone.ExploreEventsSummary);
  const albumSummarySchema = new ComponentSchema('Live Album', [
    new PropertySchema('displayMode', NeverEatAlone.DisplayMode.DESKTOP,
    DisplayModeInput),
    new PropertySchema('imageList', [
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
      new NeverEatAlone.SocialMediaImage(12, 'resources/images/13.jpg'),
    ],
      ArrayInput(new PropertySchema(
      'socialMediaImage', new NeverEatAlone.SocialMediaImage(1,
      'resources/images/2.jpg'), SocialMediaImageInput)))
    ], [], NeverEatAlone.AlbumSummary);
  const partnerWithUsSummarySchema = new ComponentSchema('Partner With Us \
    Summary', [
      new PropertySchema('displayMode', NeverEatAlone.DisplayMode.DESKTOP,
      DisplayModeInput)], [], NeverEatAlone.PartnerWithUsSummary);
  const homePageNotLoggedSchema = new ComponentSchema('HomePage Not Loggedin',
    [
      new PropertySchema('displayMode', NeverEatAlone.DisplayMode.DESKTOP,
      DisplayModeInput),
      new PropertySchema('account', NeverEatAlone.User.makeGuest(), UserInput),
      new PropertySchema('errorCode', NeverEatAlone.HomePage.ErrorCode.NONE,
      HomePageErrorCodeInput),
      new PropertySchema('numberOfTotalEventsInMonth', 6, NumberInput),
      new PropertySchema('imageList', [
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
      new NeverEatAlone.SocialMediaImage(12, 'resources/images/13.jpg'),
      ],
      ArrayInput(new PropertySchema('socialMediaImage',
      new NeverEatAlone.SocialMediaImage(1, 'resources/images/2.jpg'),
      SocialMediaImageInput))),
      new PropertySchema('eventList', [
      new NeverEatAlone.EventCardSummary(1, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/3.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(2, 'A night to remmeber at the best \
      italian restaurant in town!', new Date(2022, 5, 22, 19, 30, 0),
      new Date(2022, 6, 13, 0, 30, 0), 'Piano Piano Restaurant',
      NeverEatAlone.PriceRange.EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Italian', 'blue')], 'resources/images/4.jpg', 4, 6, false, 'red'),
      new NeverEatAlone.EventCardSummary(3, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/3.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(4, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/4.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(5, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/5.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(6, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/6.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(7, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/7.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(8, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/8.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(9, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/9.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(10, 'A night to remmeber at the \
      best sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/10.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(11, 'A night to remmeber at the \
      best sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/11.jpg', 6, 6, false, 'green'),
      new NeverEatAlone.EventCardSummary(12, 'A night to remmeber at the \
      best sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/12.jpg', 6, 6, false, 'black')],
      ArrayInput(
        new PropertySchema('EventCardSummary',
        new NeverEatAlone.EventCardSummary(1, 'best french restaurant',
        new Date(2022, 6, 12, 19, 0, 0), new Date(2022, 6, 12, 23, 0, 0),
        'Le Select', NeverEatAlone.PriceRange.EXPENSIVE, [], '', 12, 12, true,
        'yellow'), EventCardSummaryInput))),
      new PropertySchema('eventTagList', [], ArrayInput(new PropertySchema(
        'eventTag', new NeverEatAlone.EventTag(1, 'Join us for dinner',
        'yellow'), EventTagInput))),
      new PropertySchema('userFutureEventList', [], ArrayInput(
        new PropertySchema('UpcomingEvent',
        new NeverEatAlone.EventCardSummary(1, 'best french restaurant',
        new Date(2022, 6, 12, 19, 0, 0), new Date(2022, 6, 12, 23, 0, 0),
        'Le Select', NeverEatAlone.PriceRange.EXPENSIVE, [], '', 12, 12, true,
        'yellow'), EventCardSummaryInput))),
    ],
    [new SignalSchema('onJoinButton', '', [])], NeverEatAlone.HomePage);
  const homePageLoggedInSchema = new ComponentSchema('HomePage Loggedin',
    [
      new PropertySchema('displayMode', NeverEatAlone.DisplayMode.DESKTOP,
      DisplayModeInput),
      new PropertySchema('account', new NeverEatAlone.User(2, 'Arthur2345',
        'info+arthur@nevereatalone.net', 'arthur2345',
        NeverEatAlone.UserStatus.ACTIVE, new Date()), UserInput),
      new PropertySchema('errorCode', NeverEatAlone.HomePage.ErrorCode.NONE,
      HomePageErrorCodeInput),
      new PropertySchema('numberOfTotalEventsInMonth', 6, NumberInput),
      new PropertySchema('imageList', [
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
        new NeverEatAlone.SocialMediaImage(12, 'resources/images/13.jpg'),
      ],
      ArrayInput(new PropertySchema('socialMediaImage',
      new NeverEatAlone.SocialMediaImage(1, 'resources/images/2.jpg'),
      SocialMediaImageInput))),
      new PropertySchema('eventList', [
      new NeverEatAlone.EventCardSummary(1, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/3.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(2, 'A night to remmeber at the best \
      italian restaurant in town!', new Date(2022, 5, 22, 19, 30, 0),
      new Date(2022, 6, 13, 0, 30, 0), 'Piano Piano Restaurant',
      NeverEatAlone.PriceRange.EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Italian', 'blue')], 'resources/images/4.jpg', 4, 6, false, 'red'),
      new NeverEatAlone.EventCardSummary(3, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/3.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(4, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/4.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(5, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/5.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(6, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/6.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(7, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/7.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(8, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/8.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(9, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/9.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(10, 'A night to remmeber at the \
      best sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/10.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(11, 'A night to remmeber at the \
      best sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/11.jpg', 6, 6, false, 'green'),
      new NeverEatAlone.EventCardSummary(12, 'A night to remmeber at the \
      best sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/12.jpg', 6, 6, false, 'black')],
      ArrayInput(
        new PropertySchema('EventCardSummary',
        new NeverEatAlone.EventCardSummary(1, 'best french restaurant',
        new Date(2022, 6, 12, 19, 0, 0), new Date(2022, 6, 12, 23, 0, 0),
        'Le Select', NeverEatAlone.PriceRange.EXPENSIVE, [], '', 12, 12, true,
        'yellow'), EventCardSummaryInput))),
      new PropertySchema('eventTagList', [new NeverEatAlone.EventTag(1,
        'Join us for dinner', 'yellow'), new NeverEatAlone.EventTag(2,
        'Brunch with a show!', 'orange'), new NeverEatAlone.EventTag(3,
        'dinner and live music', 'blue'), new NeverEatAlone.EventTag(4,
        'Best new restaurants serries', 'red')], ArrayInput(new PropertySchema(
        'eventTag', new NeverEatAlone.EventTag(1, 'Join us for dinner',
        'yellow'), EventTagInput))),
      new PropertySchema('userFutureEventList', [
      new NeverEatAlone.EventCardSummary(1, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0), new Date(
      2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')],
      'resources/images/3.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(2, 'A night to remmeber at the best \
      italian restaurant in town!', new Date(2022, 5, 22, 19, 30, 0),
      new Date(2022, 6, 13, 0, 30, 0), 'Piano Piano Restaurant',
      NeverEatAlone.PriceRange.EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Italian', 'blue')], 'resources/images/4.jpg', 4, 6, false, 'red'),
      new NeverEatAlone.EventCardSummary(3, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/3.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(4, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/4.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(5, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/5.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(6, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/6.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(7, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/7.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(8, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/8.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(9, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/9.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(10, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/10.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(11, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/11.jpg', 6, 6, false, 'green'),
      new NeverEatAlone.EventCardSummary(12, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/12.jpg', 6, 6, false, 'black')
      ], ArrayInput(
        new PropertySchema('UpcomingEvent',
        new NeverEatAlone.EventCardSummary(1, 'best french restaurant',
        new Date(2022, 6, 12, 19, 0, 0), new Date(2022, 6, 12, 23, 0, 0),
        'Le Select', NeverEatAlone.PriceRange.EXPENSIVE, [], '', 12, 12, true,
        'yellow'), EventCardSummaryInput)))
    ],
    [new SignalSchema('onJoinButton', '', [])], NeverEatAlone.HomePage);
  const joinModalSchema = new ComponentSchema('JoinModal' , [
    new PropertySchema('displayMode', NeverEatAlone.DisplayMode.DESKTOP,
      DisplayModeInput),
    new PropertySchema('name', '', TextInput),
    new PropertySchema('email', '', TextInput),
    new PropertySchema('referralCode', '', TextInput),
    new PropertySchema('nameHasError', false, BooleanInput),
    new PropertySchema('emailHasError', false, BooleanInput),
    new PropertySchema('nameErrorMessage', '', TextInput),
    new PropertySchema('emailErrorMessage', '', TextInput),
    ], [new SignalSchema('onClose', '', []), new SignalSchema('onRequestJoin',
    '', [])], NeverEatAlone.JoinModal);
  const closeButtonSchema = new ComponentSchema('Close Button', [
    new PropertySchema('displayMode', NeverEatAlone.DisplayMode.DESKTOP,
      DisplayModeInput)], [] , NeverEatAlone.CloseButton);
  const JoinRequestSentModalSchema = new ComponentSchema('JoinRequestSentModal',
    [new PropertySchema('displayMode', NeverEatAlone.DisplayMode.DESKTOP,
    DisplayModeInput), new PropertySchema('email', 'foo@gmail.com', TextInput)],
    [new SignalSchema('onClose', '', [])], NeverEatAlone.JoinRequestSentModal);
  const signUpPageSchema = new ComponentSchema('SignUpPage', [
    new PropertySchema('displayMode', NeverEatAlone.DisplayMode.DESKTOP,
    DisplayModeInput),
    new PropertySchema('email', 'sh@gmail.com', TextInput),
    new PropertySchema('errorCode', NeverEatAlone.SignUpPage.ErrorCode.NONE,
    SignUpPageErrorCodeInput),
    new PropertySchema('style', {}, CSSInput)], [
    new SignalSchema('onSignUp', '', [])],
    NeverEatAlone.SignUpPage);
  const profileSetUpPageSchema = new ComponentSchema('ProfileSetUpPage', [
    new PropertySchema('displayMode', NeverEatAlone.DisplayMode.DESKTOP,
    DisplayModeInput),
    new PropertySchema('imageSrc',
      'resources/profile_set_up_page/icons/profile-image-0.svg', TextInput),
    new PropertySchema('displayName', 'Riley Spire', TextInput)
    ], [new SignalSchema('onLetsGoClick', '', []),
    new SignalSchema('onUploadImageClick', '', [])],
    NeverEatAlone.ProfileSetUpPage);
  const avatarWithCheckMarkSchema = new ComponentSchema('AvatarWithCheckMark',
    [new PropertySchema('imageSrc',
    'resources/profile_set_up_page/icons/profile-image-0.svg', TextInput),
    new PropertySchema('isMarked', true, BooleanInput)], [new SignalSchema(
    'onClick', '', [])], NeverEatAlone.AvatarWithCheckMark);
  const checkBoxSchema = new ComponentSchema('CheckBox', [
    new PropertySchema('label', 'Remember me', TextInput),
    new PropertySchema('disabled', true, BooleanInput),
    new PropertySchema('hasError', false, BooleanInput)
    ], [], NeverEatAlone.CheckBox);
  const googleLogInButtonSchema = new ComponentSchema('GoogleLogInButton', [
    new PropertySchema('label', 'Log in with Google', TextInput),
    new PropertySchema('style', {} , CSSInput),
    new PropertySchema('disabled', false, BooleanInput)], [
    new SignalSchema('onClick', '' , [])], NeverEatAlone.GoogleLogInButton);
  const facebookLogInButtonSchema = new ComponentSchema('FacebookLogInButton', [
    new PropertySchema('label', 'Log in with Facebook', TextInput),
    new PropertySchema('style', {}, CSSInput),
    new PropertySchema('disabled', false, BooleanInput)], [
    new SignalSchema('onClick', '' , [])], NeverEatAlone.FacebookLogInButton);
  const logInModalSchema = new ComponentSchema('LogInModal', [
    new PropertySchema('displayMode', NeverEatAlone.DisplayMode.MOBILE,
    DisplayModeInput),
    new PropertySchema('formErrorMessage', '', TextInput),
    new PropertySchema('modalErrorMessage', '', TextInput),
    new PropertySchema('googleErrorMessage', '', TextInput),
    new PropertySchema('facebookErrorMessage', '', TextInput),
    ], [new SignalSchema('onLogIn', '', []),
    new SignalSchema('onClose', '', []),
    new SignalSchema('onForgotPassword', '', []),
    new SignalSchema('onGoogleLogInClick', '', []),
    new SignalSchema('onFacebookLogInClick', '', [])],
    NeverEatAlone.LogInModal);
  const forgotPasswordPageSchema = new ComponentSchema('ForgotPasswordPage',
    [new PropertySchema('displayMode', NeverEatAlone.DisplayMode.MOBILE,
    DisplayModeInput),
    new PropertySchema('errorCode',
    NeverEatAlone.ForgotPasswordPage.ErrorCode.NONE,
    ForgotPasswordPageErrorCodeInput)],
    [new SignalSchema('onSendLinkClick', '', [])],
    NeverEatAlone.ForgotPasswordPage);
  const forgotPasswordLinkSentPageSchema = new ComponentSchema(
    'ForgotPasswordLinkSentPage',
    [new PropertySchema('displayMode', NeverEatAlone.DisplayMode.MOBILE,
    DisplayModeInput)],
    [new SignalSchema('onResendLinkClick', '', [])],
    NeverEatAlone.ForgotPasswordLinkSentPage);
  const secondaryTextLinkButton = new ComponentSchema('SecondaryTextLinkButton',
    [new PropertySchema('label', 'Resend Link', TextInput),
    new PropertySchema('labelStyle', { fontSize: '14px' } , CSSInput)], [],
    NeverEatAlone.SecondaryTextLinkButton);
  const secondaryButtonNavLink = new ComponentSchema('SecondaryButtonNavLink',
    [new PropertySchema('label', 'Back to HomePage', TextInput),
    new PropertySchema('style', { width: '178px' } , CSSInput),
    new PropertySchema('className', JSON.stringify({ fontSize: '14px' }) ,
    TextInput)], [], NeverEatAlone.SecondaryButtonNavLink);
  const resetPasswordPage = new ComponentSchema('ResetPasswordPage',
    [new PropertySchema('displayMode', NeverEatAlone.DisplayMode.MOBILE,
    DisplayModeInput), new PropertySchema('displayName', 'Ella', TextInput),
    new PropertySchema('profileImageSrc', 'resources/images/profile3.jpeg',
    TextInput)], [new SignalSchema('onSaveClick', '', [])],
    NeverEatAlone.ResetPasswordPage);
  const profileBoxSchema = new ComponentSchema('ProfileBox',
    [new PropertySchema('profileImageSrc', 'resources/images/profile2.jpeg',
      TextInput),
    new PropertySchema('displayName', 'Julia', TextInput),
    new PropertySchema('userName', '@julia453', TextInput),
    new PropertySchema('biography', 'Hello everyone! My name is julia and I \
      would love to meet you all and try new foods.', TextInput),
    new PropertySchema('facebookLink', 'https://facebook.com', TextInput),
    new PropertySchema('twitterLink', 'https://twitter.com', TextInput),
    new PropertySchema('instagramLink', 'https://instagram.com', TextInput),
    new PropertySchema('displayMode', NeverEatAlone.DisplayMode.MOBILE,
      DisplayModeInput),
    new PropertySchema('memberSince', new Date(2022, 0, 1), DateInput),
    new PropertySchema('location', NeverEatAlone.CityProvince.defaultLocation(),
      CityProvinceInput),
    new PropertySchema('favoriteCuisineList', [
      new NeverEatAlone.Cuisine(1, 'Steakhouse', '#E5FFD8'),
      new NeverEatAlone.Cuisine(2, 'Japanese', '#FFFDD8'),
      new NeverEatAlone.Cuisine(3, 'Modern', '#FFE1D8')],
      ArrayInput(new PropertySchema(
      'cuisine', new NeverEatAlone.Cuisine(1, 'French', 'yellow'),
      CuisineInput))),
    new PropertySchema('languageList', ['English', 'French', 'Chinese'],
      ArrayInput(new PropertySchema('language', 'English', TextInput)))
    ], [new SignalSchema('onEditClick', '', []),
    new SignalSchema('onReportClick', '', [])], NeverEatAlone.ProfileBox);
  const showAllButtonSchema = new ComponentSchema('ShowAllButton',
    [new PropertySchema('label', 'Show All Events (21)', TextInput)],
    [new SignalSchema('onClick', '', [])], NeverEatAlone.ShowAllButton);
  const showLessButtonSchema = new ComponentSchema('ShowLessButton',
    [], [new SignalSchema('onClick', '', [])], NeverEatAlone.ShowLessButton);
  const profileUpcomingEventsSchema = new ComponentSchema(
    'ProfileUpcomingEvents', [
    new PropertySchema('displayMode', NeverEatAlone.DisplayMode.MOBILE,
      DisplayModeInput),
    new PropertySchema('isLoggedIn', true, BooleanInput),
    new PropertySchema('eventList', [
      new NeverEatAlone.EventCardSummary(1, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0), new Date(
      2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')],
      'resources/images/3.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(2, 'A night to remmeber at the best \
      italian restaurant in town!', new Date(2022, 5, 22, 19, 30, 0),
      new Date(2022, 6, 13, 0, 30, 0), 'Piano Piano Restaurant',
      NeverEatAlone.PriceRange.EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Italian', 'blue')], 'resources/images/4.jpg', 4, 6, false, 'red'),
      new NeverEatAlone.EventCardSummary(3, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/3.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(4, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/4.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(5, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/5.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(6, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/6.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(7, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/7.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(8, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/8.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(9, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/9.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(10, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/10.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(11, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/11.jpg', 6, 6, false, 'green'),
      new NeverEatAlone.EventCardSummary(12, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/12.jpg', 6, 6, false, 'black')
    ], ArrayInput(
      new PropertySchema('EventCardSummary',
      new NeverEatAlone.EventCardSummary(1, 'best french restaurant',
      new Date(2022, 6, 12, 19, 0, 0), new Date(2022, 6, 12, 23, 0, 0),
      'Le Select', NeverEatAlone.PriceRange.EXPENSIVE, [], '', 12, 12, true,
      'yellow'), EventCardSummaryInput)))
    ], [], NeverEatAlone.ProfileUpcomingEvents);
  const profilePastEventsSchema = new ComponentSchema('ProfilePastEvents',
    [new PropertySchema('displayMode', NeverEatAlone.DisplayMode.MOBILE,
    DisplayModeInput),
    new PropertySchema('isLoggedIn', true, BooleanInput),
    new PropertySchema('eventList', [
      new NeverEatAlone.EventCardSummary(1, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0), new Date(
      2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')],
      'resources/images/3.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(2, 'A night to remmeber at the best \
      italian restaurant in town!', new Date(2022, 5, 22, 19, 30, 0),
      new Date(2022, 6, 13, 0, 30, 0), 'Piano Piano Restaurant',
      NeverEatAlone.PriceRange.EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Italian', 'blue')], 'resources/images/4.jpg', 4, 6, false, 'red'),
      new NeverEatAlone.EventCardSummary(3, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/3.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(4, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/4.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(5, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/5.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(6, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/6.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(7, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/7.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(8, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/8.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(9, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/9.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(10, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/10.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(11, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/11.jpg', 6, 6, false, 'green'),
      new NeverEatAlone.EventCardSummary(12, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/12.jpg', 6, 6, false, 'black'),
      new NeverEatAlone.EventCardSummary(4, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/4.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(5, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/5.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(6, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/6.jpg', 6, 6, false, 'yellow')
    ], ArrayInput(
      new PropertySchema('EventCardSummary',
      new NeverEatAlone.EventCardSummary(1, 'best french restaurant',
      new Date(2022, 6, 12, 19, 0, 0), new Date(2022, 6, 12, 23, 0, 0),
      'Le Select', NeverEatAlone.PriceRange.EXPENSIVE, [], '', 12, 12, true,
      'yellow'), EventCardSummaryInput)))
    ], [], NeverEatAlone.ProfilePastEvents);
  const profilePageSchema = new ComponentSchema('ProfilePage', [
    new PropertySchema('displayMode', NeverEatAlone.DisplayMode.MOBILE,
      DisplayModeInput),
    new PropertySchema('coverImageSrc',
      'resources/profile_page/images/default_banner_1.png', TextInput),
    new PropertySchema('profileImageSrc', 'resources/images/profile2.jpeg',
      TextInput),
    new PropertySchema('displayName', 'Julia', TextInput),
    new PropertySchema('userName', '@julia453', TextInput),
    new PropertySchema('isLoggedIn', true, BooleanInput),
    new PropertySchema('biography', 'Hello everyone! My name is julia and I \
      would love to meet you all and try new foods.', TextInput),
    new PropertySchema('facebookLink', 'https://facebook.com', TextInput),
    new PropertySchema('twitterLink', 'https://twitter.com', TextInput),
    new PropertySchema('instagramLink', 'https://instagram.com', TextInput),
    new PropertySchema('memberSince', new Date(2022, 0, 1), DateInput),
    new PropertySchema('location', NeverEatAlone.CityProvince.defaultLocation(),
      CityProvinceInput),
    new PropertySchema('favoriteCuisineList', [
      new NeverEatAlone.Cuisine(1, 'Steakhouse', '#E5FFD8'),
      new NeverEatAlone.Cuisine(2, 'Japanese', '#FFFDD8'),
      new NeverEatAlone.Cuisine(3, 'Modern', '#FFE1D8')],
      ArrayInput(new PropertySchema(
      'cuisine', new NeverEatAlone.Cuisine(1, 'French', 'yellow'),
      CuisineInput))),
    new PropertySchema('languageList', ['English', 'French', 'Chinese'],
      ArrayInput(new PropertySchema('language', 'English', TextInput))),
    new PropertySchema('upcomingEventList', [
      new NeverEatAlone.EventCardSummary(1, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0), new Date(
      2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')],
      'resources/images/3.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(2, 'A night to remmeber at the best \
      italian restaurant in town!', new Date(2022, 5, 22, 19, 30, 0),
      new Date(2022, 6, 13, 0, 30, 0), 'Piano Piano Restaurant',
      NeverEatAlone.PriceRange.EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Italian', 'blue')], 'resources/images/4.jpg', 4, 6, false, 'red'),
      new NeverEatAlone.EventCardSummary(3, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/3.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(4, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/4.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(5, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/5.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(6, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/6.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(7, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/7.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(8, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/8.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(9, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/9.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(10, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/10.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(11, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/11.jpg', 6, 6, false, 'green'),
      new NeverEatAlone.EventCardSummary(12, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2022, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/12.jpg', 6, 6, false, 'black')],
      ArrayInput(
        new PropertySchema('EventCardSummary',
        new NeverEatAlone.EventCardSummary(1, 'best french restaurant',
        new Date(2022, 6, 12, 19, 0, 0), new Date(2022, 6, 12, 23, 0, 0),
        'Le Select', NeverEatAlone.PriceRange.EXPENSIVE, [], '', 12, 12, true,
        'yellow'), EventCardSummaryInput))),
    new PropertySchema('pastEventList', [
      new NeverEatAlone.EventCardSummary(1, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2021, 6, 12, 19, 0, 0), new Date(
      2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')],
      'resources/images/3.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(2, 'A night to remmeber at the best \
      italian restaurant in town!', new Date(2021, 5, 22, 19, 30, 0),
      new Date(2022, 6, 13, 0, 30, 0), 'Piano Piano Restaurant',
      NeverEatAlone.PriceRange.EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Italian', 'blue')], 'resources/images/4.jpg', 4, 6, false, 'red'),
      new NeverEatAlone.EventCardSummary(3, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2021, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/3.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(4, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2021, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/4.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(5, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2021, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/5.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(6, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2021, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/6.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(7, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2021, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/7.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(8, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2021, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/8.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(9, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2021, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/9.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(10, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2021, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/10.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(11, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2021, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/11.jpg', 6, 6, false, 'green'),
      new NeverEatAlone.EventCardSummary(12, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2021, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/12.jpg', 6, 6, false, 'black'),
      new NeverEatAlone.EventCardSummary(4, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2021, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/4.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(5, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2021, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/5.jpg', 6, 6, false, 'yellow'),
      new NeverEatAlone.EventCardSummary(6, 'A night to remmeber at the best \
      sushi restaurant in town!', new Date(2021, 6, 12, 19, 0, 0),
      new Date(2022, 6, 13, 1, 0, 0), 'Yukashi Japanese Restaurant',
      NeverEatAlone.PriceRange.VERY_EXPENSIVE, [new NeverEatAlone.Cuisine(1,
      'Japanese', 'yellow'), new NeverEatAlone.Cuisine(2, 'Omakase', 'orange')
      ], 'resources/images/6.jpg', 6, 6, false, 'yellow')
    ], ArrayInput(
      new PropertySchema('EventCardSummary',
      new NeverEatAlone.EventCardSummary(1, 'best french restaurant',
      new Date(2022, 6, 12, 19, 0, 0), new Date(2021, 6, 12, 23, 0, 0),
      'Le Select', NeverEatAlone.PriceRange.EXPENSIVE, [], '', 12, 12, true,
      'yellow'), EventCardSummaryInput)))
    ], [new SignalSchema('onEditClick', '', []),
    new SignalSchema('onReportClick', '', [])], NeverEatAlone.ProfilePage);
  const editProfilePageSchema = new ComponentSchema('EditProfilePage', [
    new PropertySchema('displayMode', NeverEatAlone.DisplayMode.MOBILE,
      DisplayModeInput),
    new PropertySchema('coverImageSrc',
      'resources/profile_page/images/default_banner_2.jpg', TextInput),
    new PropertySchema('profileImageSrc', 'resources/images/profileguy5.jpeg',
      TextInput),
    new PropertySchema('displayName', 'Casper Host', TextInput),
    new PropertySchema('userName', '@120498509', TextInput),
    new PropertySchema('isUpcomingEventsPrivate', false, BooleanInput),
    new PropertySchema('isPastEventsPrivate', true, BooleanInput),
    new PropertySchema('isLocationPrivate', false, BooleanInput),
    new PropertySchema('locationValue', 'Toronto, ON, CA', TextInput),
    new PropertySchema('facebookInputIsValid', true, BooleanInput),
    new PropertySchema('twitterInputIsValid', true, BooleanInput),
    new PropertySchema('instagramInputIsValid', true, BooleanInput),
    new PropertySchema('suggestedLocationList', [
      NeverEatAlone.CityProvince.defaultLocation(),
      new NeverEatAlone.CityProvince(2, 'Ottawa', 'ON', 'CA')], ArrayInput(
      new PropertySchema('CityProvince',
      NeverEatAlone.CityProvince.defaultLocation(), CityProvinceInput))),
    new PropertySchema('isLanguagePrivate', false, BooleanInput),
    new PropertySchema('languageValue', '', TextInput),
    new PropertySchema('suggestedLanguageList', [new NeverEatAlone.Language(1,
      'English'), new NeverEatAlone.Language(2, 'Spanish'),
      new NeverEatAlone.Language(3, 'Mandarin'), new NeverEatAlone.Language(4,
      'Farsi'), new NeverEatAlone.Language(5, 'German'),
      new NeverEatAlone.Language(6, 'Polish')], ArrayInput(
      new PropertySchema('language', new NeverEatAlone.Language(1, 'English'),
      LanguageInput))),
    new PropertySchema('selectedLanguageList', [new NeverEatAlone.Language(1,
      'English')], ArrayInput(
      new PropertySchema('language', new NeverEatAlone.Language(1, 'English'),
      LanguageInput))),
    new PropertySchema('biographyValue', '', TextInput),
    new PropertySchema('isBiographyPrivate', false, BooleanInput),
    new PropertySchema('cuisineValue', '', TextInput),
    new PropertySchema('suggestedCuisineList', [new NeverEatAlone.Cuisine(1,
      'French', 'blue'), new NeverEatAlone.Cuisine(4, 'Steak', 'yellow'),
      new NeverEatAlone.Cuisine(5, 'Japanese', 'pink'),
      new NeverEatAlone.Cuisine(6, 'Persian', 'Salmon'),
      new NeverEatAlone.Cuisine(7, 'Middle Eastern', 'HotPink'),
      new NeverEatAlone.Cuisine(8, 'Jamaican', 'LemonChiffon')], ArrayInput(
      new PropertySchema('cuisine', new NeverEatAlone.Cuisine(1, 'French',
      'blue'), CuisineInput))),
    new PropertySchema('selectedCuisineList', [new NeverEatAlone.Cuisine(4,
      'Steak', 'PaleGreen'), new NeverEatAlone.Cuisine(3, 'Seafood',
      'Plum')], ArrayInput(new PropertySchema('cuisine',
      new NeverEatAlone.Cuisine(1, 'French', 'Lavender'), CuisineInput))),
    new PropertySchema('isCuisinePrivate', false, BooleanInput),
    new PropertySchema('isFacebookPrivate', false, BooleanInput),
    new PropertySchema('isTwitterPrivate', false, BooleanInput),
    new PropertySchema('isInstagramPrivate', false, BooleanInput),
    new PropertySchema('facebookLink', '', TextInput),
    new PropertySchema('twitterLink', '', TextInput),
    new PropertySchema('instagramLink', '', TextInput)
    ], [
    new SignalSchema('onLocationInputChange', '', []),
    new SignalSchema('onLocationPrivacyClick', '', []),
    new SignalSchema('onChangeProfileImageClick', '', []),
    new SignalSchema('onChangeBanner', '', []),
    new SignalSchema('onUpcomingEventPrivacyClick', '', []),
    new SignalSchema('onPastEventPrivacyClick', '', []),
    new SignalSchema('onLanguagePrivacyClick', '', []),
    new SignalSchema('onLanguageInputChange', '', []),
    new SignalSchema('onBiographyPrivacyClick', '', []),
    new SignalSchema('onBiographyInputChange', '', []),
    new SignalSchema('onCuisinePrivacyClick', '', []),
    new SignalSchema('onCuisineInputChange', '', []),
    new SignalSchema('onFacebookPrivacyClick', '', []),
    new SignalSchema('onFacebookInputChange', '', []),
    new SignalSchema('onTwitterPrivacyClick', '', []),
    new SignalSchema('onTwitterInputChange', '', []),
    new SignalSchema('onInstagramPrivacyClick', '', []),
    new SignalSchema('onInstagramInputChange', '', []),
    new SignalSchema('onLocationDropdownClick', '', []),
    new SignalSchema('onSaveClick', '', []),
    new SignalSchema('onCancelClick', '', [])
  ], NeverEatAlone.EditProfilePage);
  const publicButtonSchema = new ComponentSchema('PublicButton', [], [
    new SignalSchema('onClick', '', [])], NeverEatAlone.PublicButton);
  const privateButtonSchema = new ComponentSchema('PrivateButton', [], [
    new SignalSchema('onClick', '', [])], NeverEatAlone.PrivateButton);
  const locationInputFieldSchema = new ComponentSchema('LocationInputField',
    [new PropertySchema('value', '', TextInput),
    new PropertySchema('placeholder', '', TextInput),
    new PropertySchema('hasError', false, BooleanInput),
    new PropertySchema('disabled', false, BooleanInput)],
    [new SignalSchema('onClick', '', [])], NeverEatAlone.LocationInputField);
  const textareaWithCounterSchema = new ComponentSchema('TextareaWithCounter',
    [new PropertySchema('maxCount', 280, NumberInput),
    new PropertySchema('disabled', false, BooleanInput),
    new PropertySchema('hasError', false, BooleanInput),
    new PropertySchema('placeholder', 'Hello everyone! My name is Casper and I \
      would love to meet you all AND TRY NEW FOOD.', TextInput),
    new PropertySchema('value', '', TextInput)],
    [new SignalSchema('onValueChange', '', [])],
    NeverEatAlone.TextareaWithCounter);
  const saveCancelStickyMenuSchema = new ComponentSchema(
    'SaveCancelStickyMenu', [
      new PropertySchema('displayMode', NeverEatAlone.DisplayMode.MOBILE,
      DisplayModeInput)
    ],[
    new SignalSchema('onSaveClick', '', []),
    new SignalSchema('onCancelClick', '', [])],
    NeverEatAlone.SaveCancelStickyMenu);
  const diningEventPageSchema = new ComponentSchema('DiningEventPage', [
    new PropertySchema('displayMode', NeverEatAlone.DisplayMode.DESKTOP,
      DisplayModeInput),
    new PropertySchema('eventColor', '#BF408D', TextInput),
    new PropertySchema('eventFee', 3.00 , NumberInput),
    new PropertySchema('coverImageSrc', 'resources/images/15.jpg', TextInput),
    new PropertySchema('title', 'Let’s go to Mapo Korean BBQ', TextInput),
    new PropertySchema('restaurant', new NeverEatAlone.Restaurant(1,
      'Mapo Korean BBQ', new Date(), 1, 'Cozy BBQ place in the west end.',
      'Go upstairs.', '6476412589', NeverEatAlone.PriceRange.MODERATELY_PRICED,
      [new NeverEatAlone.Cuisine(1, 'Korean', '#E5FFD8'),
      new NeverEatAlone.Cuisine(2, 'BBQ', '#FFFDD8')], 'www.mapobbq.com'),
      RestaurantInput),
    new PropertySchema('dressCode', NeverEatAlone.DressCode.BUSINESS_CASUAL,
      DressCodeInput),
    new PropertySchema('seating', NeverEatAlone.Seating.STANDARD, SeatingInput),
    new PropertySchema('location', new NeverEatAlone.Location(2, '25 Bay St',
      '', 'Toronto', 'ON', 'CA', 'M4W 4W4', 'Financial District'),
      LocationInput),
    new PropertySchema('reservationName', 'NEA Group', TextInput),
    new PropertySchema('startTime', new Date(2022, 11, 20, 18, 30),
      DateTimeInput),
    new PropertySchema('endTime', new Date(2022, 11, 20, 23, 30),
      DateTimeInput),
    new PropertySchema('attendeeList', [
      new NeverEatAlone.Attendee(1, 1,
      'Mark', 0, NeverEatAlone.AttendeeStatus.GOING,
      'resources/images/profileguy5.jpeg', new Date()),
      new NeverEatAlone.Attendee(2, 1,
      'Mark', 0, NeverEatAlone.AttendeeStatus.GOING,
      'resources/images/profileguy5.jpeg', new Date()),
      new NeverEatAlone.Attendee(3, 1,
      'Mark', 0, NeverEatAlone.AttendeeStatus.GOING,
      'resources/images/profileguy5.jpeg', new Date()),
      new NeverEatAlone.Attendee(4, 1,
      'Mark', 0, NeverEatAlone.AttendeeStatus.GOING,
      'resources/images/profileguy5.jpeg', new Date()),
      new NeverEatAlone.Attendee(5, 1,
      'Mark', 0, NeverEatAlone.AttendeeStatus.GOING,
      'resources/images/profileguy5.jpeg', new Date()),
      new NeverEatAlone.Attendee(6, 1,
      'Mark', 0, NeverEatAlone.AttendeeStatus.GOING,
      'resources/images/profileguy5.jpeg', new Date()),
      new NeverEatAlone.Attendee(7, 1,
      'Mark', 0, NeverEatAlone.AttendeeStatus.GOING,
      'resources/images/profileguy5.jpeg', new Date()),
      new NeverEatAlone.Attendee(8, 1,
      'Mark', 0, NeverEatAlone.AttendeeStatus.GOING,
      'resources/images/profileguy5.jpeg', new Date()),
      new NeverEatAlone.Attendee(9, 1,
      'Mark', 0, NeverEatAlone.AttendeeStatus.GOING,
      'resources/images/profileguy5.jpeg', new Date()),
      new NeverEatAlone.Attendee(10, 1,
      'Mark', 0, NeverEatAlone.AttendeeStatus.GOING,
      'resources/images/profileguy5.jpeg', new Date())
    ], ArrayInput(new PropertySchema(
      'attendee', new NeverEatAlone.Attendee(Date.now(), 1,
      'Mark', 0, NeverEatAlone.AttendeeStatus.GOING,
      'resources/images/profileguy5.jpeg', new Date()), AttendeeInput))),
    new PropertySchema('totalCapacity', 10, NumberInput),
    new PropertySchema('description', 'In keeping with Japanese tradition, \
      Yukashi considers the various flavours and aromas of seasonal vegetables \
      when deciding what will make it onto our customers ‘plates, and tickle \
      their palates. Whether with our delicious main dishes, or our exciting \
      sake/ appetizer pairings, customers will find that locally grown \
      ingredients complement carefully chosen ingredients from Japan to make \
      an authentic Japanese experience with a subtle Canadian twist. This is \
      one of my favourite sushi places in Toronto and I hope you find this \
      experience memorable too! Please note, counter seating is only available \
      on weekends.', TextInput)
    ],
    [new SignalSchema('onJoinEvent', '', [])], NeverEatAlone.DiningEventPage);
  const seeAllButtonSchema = new ComponentSchema('SeeAllButton', [], [
    new SignalSchema('onClick', '', [])], NeverEatAlone.SeeAllButton);
  const seeLessButtonSchema = new ComponentSchema('SeeLessButton', [], [
    new SignalSchema('onClick', '', [])], NeverEatAlone.SeeLessButton);
  const joinEventModalSchema = new ComponentSchema('JoinEventModal', [
    new PropertySchema('displayMode', NeverEatAlone.DisplayMode.MOBILE,
      DisplayModeInput),
    new PropertySchema('eventFee', 3.00 , NumberInput),
    new PropertySchema('eventFeeDescription', 'Because this restaurant is in \
      high demand, we charge a fee to hold your spot.', TextInput),
    new PropertySchema('taxRate', 0.13 , NumberInput),
    new PropertySchema('eventTitle', 'Let’s go to Mapo Korean BBQ' , TextInput),
    new PropertySchema('imageSrc', 'resources/images/13.jpg' , TextInput),
    new PropertySchema('eventStartDate', new Date(2022, 11, 20, 18, 30),
      DateTimeInput),
    new PropertySchema('paymentCardsOnFile', [
      new NeverEatAlone.PaymentCard(11, NeverEatAlone.CreditCardType.VISA,
        4054),
      new NeverEatAlone.PaymentCard(151, NeverEatAlone.CreditCardType.AMEX,
        1052),
      new NeverEatAlone.PaymentCard(12, NeverEatAlone.CreditCardType.VISA,
        5052),
      new NeverEatAlone.PaymentCard(21, NeverEatAlone.CreditCardType.MASTERCARD,
        7754),
    ], ArrayInput(new PropertySchema('paymentCard',
      new NeverEatAlone.PaymentCard(1, NeverEatAlone.CreditCardType.VISA, 4044),
      PaymentCardInput))),
    new PropertySchema('displayedCard', new NeverEatAlone.PaymentCard(1,
      NeverEatAlone.CreditCardType.VISA, 4044), PaymentCardInput)
  ], [
    new SignalSchema('onJoinEvent', '', []),
    new SignalSchema('onClose', '', []),
    new SignalSchema('onCreditCardClick', '', []),
    new SignalSchema('onCheckout', '', []),
    new SignalSchema('onAddCard', '', []),
    new SignalSchema('onPaypalClick', '', []),
    new SignalSchema('onGooglePayClick', '', []),
    new SignalSchema('onApplePay', '', [])
  ], NeverEatAlone.JoinEventModal);
  const creditCardDropdownMenu = new ComponentSchema('CreditCardDropdownMenu',
    [new PropertySchema('cardList', [
    new NeverEatAlone.PaymentCard(11, NeverEatAlone.CreditCardType.VISA, 4054),
    new NeverEatAlone.PaymentCard(151, NeverEatAlone.CreditCardType.AMEX, 1052),
    new NeverEatAlone.PaymentCard(12, NeverEatAlone.CreditCardType.VISA, 5052),
    new NeverEatAlone.PaymentCard(21, NeverEatAlone.CreditCardType.MASTERCARD,
      7754),
    ], ArrayInput(new PropertySchema(
      'paymentCard', new NeverEatAlone.PaymentCard(1,
      NeverEatAlone.CreditCardType.VISA, 4044), PaymentCardInput))),
    new PropertySchema('displayedCard', new NeverEatAlone.PaymentCard(1,
      NeverEatAlone.CreditCardType.VISA, 4044), PaymentCardInput),
    ], [new SignalSchema('onCardClick', '', [])],
    NeverEatAlone.CreditCardDropdownMenu);
  const primaryButtonWithArrowSchema = new ComponentSchema(
    'PrimaryButtonWithArrow', [new PropertySchema('iconStyle', {}, CSSInput),
    new PropertySchema('style', {}, CSSInput),
    new PropertySchema('labelStyle', {}, CSSInput),
    new PropertySchema('label', 'Primary Button', TextInput),
    new PropertySchema('disabled', false, BooleanInput)],
    [new SignalSchema('onClick', '', [])],
    NeverEatAlone.PrimaryTextButtonWithArrow);
  const secondaryButtonWithArrowSchema = new ComponentSchema(
    'SecondaryButtonWithArrow', [new PropertySchema('iconStyle', {}, CSSInput),
    new PropertySchema('style', {}, CSSInput),
    new PropertySchema('labelStyle', {}, CSSInput),
    new PropertySchema('label', 'Secondary Button', TextInput),
    new PropertySchema('disabled', false, BooleanInput)],
    [new SignalSchema('onClick', '', [])],
    NeverEatAlone.SecondaryTextButtonWithArrow);
  const payPalButtonSchema = new ComponentSchema('PayPalButton', [
    new PropertySchema('style', {}, CSSInput)
  ],
    [new SignalSchema('onClick', '', [])], NeverEatAlone.PayPalButton);
  const applePayButtonSchema = new ComponentSchema('ApplePayButton', [
    new PropertySchema('style', {}, CSSInput)
  ],
    [new SignalSchema('onClick', '', [])], NeverEatAlone.ApplePayButton);
  const googlePayButtonSchema = new ComponentSchema('GooglePayButton', [
    new PropertySchema('style', {}, CSSInput)
  ],
    [new SignalSchema('onClick', '', [])], NeverEatAlone.GooglePayButton);
  const paymentCardInputFieldSchema = new ComponentSchema(
    'PaymentCardInputField', [
      new PropertySchema('style', {}, CSSInput),
      new PropertySchema('placeholder', '', TextInput),
      new PropertySchema('disabled', false, BooleanInput),
      new PropertySchema('hasError', false, BooleanInput)], [],
      NeverEatAlone.PaymentCardInputField);
  return [
    accentTextButtonSchema,
    albumCardSchema,
    albumSummarySchema,
    applePayButtonSchema,
    avatarWithCheckMarkSchema,
    checkBoxSchema,
    closeButtonSchema,
    creditCardDropdownMenu,
    diningEventCardSchema,
    diningEventPageSchema,
    editProfilePageSchema,
    emailInputFieldSchema,
    exploreEventsSummaryEmptySchema,
    exploreEventsSummarySchema,
    facebookLogInButtonSchema,
    footerSchema,
    forgotPasswordLinkSentPageSchema,
    forgotPasswordPageSchema,
    googleLogInButtonSchema,
    googlePayButtonSchema,
    headerLoggedInSchema,
    headerNotLoggedInSchema,
    heroLoggedInNoEventSchema,
    heroLoggedInWithEventSchema,
    heroNotLoggedInSchema,
    homePageLoggedInSchema,
    homePageNotLoggedSchema,
    inputFieldSchema,
    invertedSecondaryTextButtonSchema,
    joinEventModalSchema,
    joinModalSchema,
    JoinRequestSentModalSchema,
    locationInputFieldSchema,
    logInModalSchema,
    logoSchema,
    nameInputFieldSchema,
    partnerWithUsSummarySchema,
    paymentCardInputFieldSchema,
    payPalButtonSchema,
    primaryButtonWithArrowSchema,
    primaryTextButtonSchema,
    privateButtonSchema,
    profileBoxSchema,
    profilePageSchema,
    profilePastEventsSchema,
    profileSetUpPageSchema,
    profileUpcomingEventsSchema,
    publicButtonSchema,
    resetPasswordPage,
    saveCancelStickyMenuSchema,
    secondaryButtonNavLink,
    secondaryButtonWithArrowSchema,
    secondaryTextLinkButton,
    seeAllButtonSchema,
    seeLessButtonSchema,
    showAllButtonSchema,
    showLessButtonSchema,
    signUpPageSchema,
    textareaWithCounterSchema,
    userUpcomingEventsSummarySchema,
    whiteNavLinkSchema];
}
