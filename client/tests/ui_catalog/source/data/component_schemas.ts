import * as NeverEatAlone from 'never_eat_alone';
import { BooleanInput, CSSInput, CuisineInput, DateInput, DisplayModeInput,
  NumberInput, TextInput, UserInput } from '../viewer/propertyInput';
import { ComponentSchema, PropertySchema, SignalSchema } from './schemas';

/** Loads the complete list of schemas available to test. */
export function loadComponentSchemas(): ComponentSchema[] {
  const logoSchema = new ComponentSchema('WhiteTextHeaderLogo',
    [new PropertySchema('style', {}, CSSInput)], [],
    NeverEatAlone.WhiteTextHeaderLogo);
  const invertedSecondaryTextButtonSchema = new ComponentSchema(
    'InvertedSecondaryTextButton', [new PropertySchema('style', {}, CSSInput),
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
    'WhiteNavLink', [new PropertySchema('label', 'What is NEA?', TextInput),
    new PropertySchema('to', '/What_is_NEA', TextInput),
    new PropertySchema('style', {}, CSSInput),
    new PropertySchema('className', '', TextInput)], [],
    NeverEatAlone.WhiteNavLink);
  const headerNotLoggedInSchema = new ComponentSchema(
    'Header Not Logged in', [new PropertySchema('displayMode',
    NeverEatAlone.DisplayMode.DESKTOP, DisplayModeInput),
    new PropertySchema('account', NeverEatAlone.User.makeGuest(),
    UserInput), new PropertySchema('profileImageSrc', '', TextInput)],
    [new SignalSchema('onMenuClick', '', []),
    new SignalSchema('onLogInButton', '', []),
    new SignalSchema('onJoinButton', '', []),
    new SignalSchema('onLogOut', '', [])],
    NeverEatAlone.Header);
  const headerLoggedInSchema = new ComponentSchema(
    'Header Logged in', [new PropertySchema('displayMode',
    NeverEatAlone.DisplayMode.DESKTOP, DisplayModeInput),
    new PropertySchema('account', new NeverEatAlone.User(2, 'Arthur2345',
    'info+arthur@nevereatalone.net', 'arthur2345',
    NeverEatAlone.UserStatus.ACTIVE, new Date()),
    UserInput), new PropertySchema('profileImageSrc', '', TextInput)],
    [new SignalSchema('onMenuClick', '', []),
    new SignalSchema('onLogInButton', '', []),
    new SignalSchema('onJoinButton', '', []),
    new SignalSchema('onLogOut', '', [])],
    NeverEatAlone.Header);
  const footerSchema = new ComponentSchema('Footer', [new PropertySchema(
    'displayMode', NeverEatAlone.DisplayMode.DESKTOP, DisplayModeInput),
    new PropertySchema('backgroundColor', 'transparent', TextInput),
    new PropertySchema('isBackgroundImage', true, BooleanInput)],
    [new SignalSchema('onInviteAFoodie', '', [])], NeverEatAlone.Footer);
  const heroSchema = new ComponentSchema('Hero', [
    new PropertySchema('displayMode', NeverEatAlone.DisplayMode.DESKTOP,
    DisplayModeInput)], [new SignalSchema('onJoinButton', '', [])],
    NeverEatAlone.Hero);
  const diningEventCardSchema = new ComponentSchema('Dining Event Card',
    [new PropertySchema('displayMode', NeverEatAlone.DisplayMode.DESKTOP,
    DisplayModeInput), new PropertySchema('id', -1, NumberInput),
    new PropertySchema('imageSrc', '', TextInput),
    new PropertySchema('title',
    'Must try! Best french restaurant in the city.', TextInput),
    new PropertySchema('restaurantName', 'Le Banane', TextInput),
    new PropertySchema('priceRange', NeverEatAlone.PriceRange.EXPENSIVE,
    TextInput), new PropertySchema('startTime', new Date(2022, 6, 17, 18, 30),
    DateInput), new PropertySchema('endTime', new Date(2022, 6, 18, 0, 30),
    DateInput), new PropertySchema('cuisines', [new NeverEatAlone.Cuisine(
    1, 'French', 'yellow'), new NeverEatAlone.Cuisine(2, 'Modern',
    '#33FFFC')], CuisineInput), new PropertySchema(
    'numberOfAttendees', 12, NumberInput), new PropertySchema('numberOfSeats',
    15, NumberInput), new PropertySchema('isAttending', false, BooleanInput),
    new PropertySchema('isLoggedIn', false, BooleanInput),
    new PropertySchema('color', 'blue', TextInput), new PropertySchema(
    'style', {}, CSSInput), new PropertySchema('className', '', TextInput)],
    [], NeverEatAlone.DiningEventCard);
  const albumCardSchema = new ComponentSchema('AlbumCard', [new PropertySchema(
    'displayMode', NeverEatAlone.DisplayMode.DESKTOP, DisplayModeInput),
    new PropertySchema('id', 1, NumberInput), new PropertySchema('src',
    'resources/images/1.jpg', TextInput)], [new SignalSchema('onClick', '', [])
    ], NeverEatAlone.AlbumCard);
  const exploreEventsSummarySchema = new ComponentSchema('ExploreEventsSummary',
    [], [], NeverEatAlone.ExploreEventsSummary);
  return [logoSchema, invertedSecondaryTextButtonSchema,
    accentTextButtonSchema, whiteNavLinkSchema, headerNotLoggedInSchema,
    headerLoggedInSchema, footerSchema, heroSchema, diningEventCardSchema,
    albumCardSchema, exploreEventsSummarySchema];
}
