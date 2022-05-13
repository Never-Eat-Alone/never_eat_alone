import * as NeverEatAlone from 'never_eat_alone';
import { BooleanInput, CSSInput, TextInput } from '../viewer/propertyInput';
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
  return [logoSchema, invertedSecondaryTextButtonSchema,
    accentTextButtonSchema, whiteNavLinkSchema];
}
