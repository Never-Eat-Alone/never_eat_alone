import * as NeverEatAlone from 'never_eat_alone';
import { BooleanInput, CSSInput, TextInput } from '../viewer/propertyInput';
import { ComponentSchema, PropertySchema, SignalSchema } from './schemas';

/** Loads the complete list of schemas available to test. */
export function loadComponentSchemas(): ComponentSchema[] {
  const logoSchema = new ComponentSchema('WhiteTextHeaderLogo',
    [new PropertySchema('style', {}, CSSInput)], [],
    NeverEatAlone.WhiteTextHeaderLogo);
  const invertedSecondaryTextButton = new ComponentSchema(
    'InvertedSecondaryTextButton', [new PropertySchema('style', {}, CSSInput),
    new PropertySchema('label', 'login', TextInput),
    new PropertySchema('disabled', false, BooleanInput)],
    [new SignalSchema('onClick', '', [])],
    NeverEatAlone.InvertedSecondaryTextButton);
  const accentTextButton = new ComponentSchema(
    'AccentTextButton', [new PropertySchema('style', {}, CSSInput),
    new PropertySchema('label', 'join', TextInput),
    new PropertySchema('disabled', false, BooleanInput)],
    [new SignalSchema('onClick', '', [])],
    NeverEatAlone.AccentTextButton);
  return [logoSchema, invertedSecondaryTextButton, accentTextButton];
}
