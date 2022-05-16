import * as NeverEatAlone from 'never_eat_alone';
import { BooleanInput, CSSInput, DisplayModeInput, TextInput, UserInput
} from '../viewer/propertyInput';
import { ComponentSchema, PropertySchema, SignalSchema } from './schemas';

/** Loads the complete list of schemas available to test. */
export function loadComponentSchemas(): ComponentSchema[] {
  const logoSchema = new ComponentSchema('WhiteTextHeaderLogo',
    [new PropertySchema('style', {}, CSSInput)], [],
    NeverEatAlone.WhiteTextHeaderLogo);
  const invertedSecondaryTextButtonSchema = new ComponentSchema(
    'InvertedSecondaryTextButton', [new PropertySchema('style', {}, CSSInput),
    new PropertySchema('label', 'login', TextInput),
    new PropertySchema('disabled', false, BooleanInput)],
    [new SignalSchema('onClick', '', [])],
    NeverEatAlone.InvertedSecondaryTextButton);
  const accentTextButtonSchema = new ComponentSchema(
    'AccentTextButton', [new PropertySchema('style', {}, CSSInput),
    new PropertySchema('label', 'join', TextInput),
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
  return [logoSchema, invertedSecondaryTextButtonSchema,
    accentTextButtonSchema, whiteNavLinkSchema, headerNotLoggedInSchema,
    headerLoggedInSchema, footerSchema];
}
