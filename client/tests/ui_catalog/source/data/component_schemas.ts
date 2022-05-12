import * as NeverEatAlone from 'never_eat_alone';
import { CSSInput } from '../viewer/propertyInput';
import { ComponentSchema, PropertySchema } from './schemas';

/** Loads the complete list of schemas available to test. */
export function loadComponentSchemas(): ComponentSchema[] {
  const logoSchema = new ComponentSchema('WhiteTextHeaderLogo',
    [new PropertySchema('style', {}, CSSInput)], [],
    NeverEatAlone.WhiteTextHeaderLogo);
  const InvertedSecondaryTextButton = new ComponentSchema(
    'InvertedSecondaryTextButton', [new PropertySchema('style', {}, CSSInput),
    new PropertySchema('label', 'LOGIN', String),
    new PropertySchema('isDisabled', false, Boolean),
    new PropertySchema('onClick', null, () => void)],
    [], NeverEatAlone.InvertedSecondaryTextButton);
  return [logoSchema];
}
