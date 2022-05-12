import * as NeverEatAlone from 'never_eat_alone';
import { CSSInput } from '../viewer/propertyInput';
import { ComponentSchema, PropertySchema } from './schemas';

/** Loads the complete list of schemas available to test. */
export function loadComponentSchemas(): ComponentSchema[] {
  const logoSchema = new ComponentSchema('HeaderLogoWithWhiteText',
    [new PropertySchema('style', {}, CSSInput)], [],
    NeverEatAlone.HeaderLogoWithWhiteText);
  return [logoSchema];
}
