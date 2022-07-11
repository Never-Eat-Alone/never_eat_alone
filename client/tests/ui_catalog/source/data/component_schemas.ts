import * as NeverEatAlone from 'never_eat_alone';
import { ArrayInput, BooleanInput, CSSInput, CuisineInput, DateInput,
  DisplayModeInput, EventCardSummaryInput, EventTagInput,
  ForgotPasswordPageErrorCodeInput, HomePageErrorCodeInput, NumberInput,
  SignUpPageErrorCodeInput, SocialMediaImageInput, TextInput, UserInput
} from '../viewer/propertyInput';
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
      new NeverEatAlone.Cuisine(1, 'Steakhouse', 'grey'),
      new NeverEatAlone.Cuisine(2, 'Japanese', 'green'),
      new NeverEatAlone.Cuisine(3, 'Modern', 'yellow')],
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
    new PropertySchema('googleErrorMessage', '', TextInput),
    new PropertySchema('facebookErrorMessage', '', TextInput),
    ], [new SignalSchema('onLogIn', '', []),
    new SignalSchema('onClose', '', []),
    new SignalSchema('onForgotPassword', '', []),
    new SignalSchema('onGoogleLogInClick', '', []),
    new SignalSchema('onFacebookLogInClick', '', [])],
    NeverEatAlone.LogInModal);
  const forgotPasswordPageSchema = new ComponentSchema('forgotPasswordPage',
    [new PropertySchema('displayMode', NeverEatAlone.DisplayMode.MOBILE,
    DisplayModeInput),
    new PropertySchema('errorCode',
    NeverEatAlone.ForgotPasswordPage.ErrorCode.NONE,
    ForgotPasswordPageErrorCodeInput)],
    [new SignalSchema('onSendLinkClick', '', [])],
    NeverEatAlone.ForgotPasswordPage);
  const forgotPasswordLinkSentPageSchema = new ComponentSchema(
    'forgotPasswordLinkSentPage',
    [new PropertySchema('displayMode', NeverEatAlone.DisplayMode.MOBILE,
    DisplayModeInput)],
    [new SignalSchema('onResendLinkClick', '', [])],
    NeverEatAlone.ForgotPasswordLinkSentPage);
  const secondaryTextLinkButton = new ComponentSchema('secondaryTextLinkButton',
    [new PropertySchema('label', 'Resend Link', TextInput),
    new PropertySchema('labelStyle', { fontSize: '14px' } , CSSInput)], [],
    NeverEatAlone.SecondaryTextLinkButton);
  return [logoSchema, primaryTextButtonSchema,
    invertedSecondaryTextButtonSchema, accentTextButtonSchema,
    whiteNavLinkSchema, emailInputFieldSchema, nameInputFieldSchema,
    inputFieldSchema, headerNotLoggedInSchema, headerLoggedInSchema,
    footerSchema, heroNotLoggedInSchema, heroLoggedInNoEventSchema,
    heroLoggedInWithEventSchema, diningEventCardSchema, albumCardSchema,
    userUpcomingEventsSummarySchema, exploreEventsSummaryEmptySchema,
    exploreEventsSummarySchema, albumSummarySchema, partnerWithUsSummarySchema,
    homePageNotLoggedSchema, homePageLoggedInSchema, joinModalSchema,
    closeButtonSchema, JoinRequestSentModalSchema, signUpPageSchema,
    profileSetUpPageSchema, avatarWithCheckMarkSchema, checkBoxSchema,
    googleLogInButtonSchema, facebookLogInButtonSchema, logInModalSchema,
    forgotPasswordPageSchema, forgotPasswordLinkSentPageSchema,
    secondaryTextLinkButton];
}
