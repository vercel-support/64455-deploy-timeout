import groq from 'groq';

import config from '@app/config/shop';

export const basePropertyTypeProjection = groq`
  _id, alias, variantOption, distinct, order, schemaType,
  ...options
`;

export const propertyTypeProjection = groq`
  ${basePropertyTypeProjection},
  ...i18n[$defaultLocale], ...i18n[$locale]
`;

export const propertyValueProjection = groq`
  _id, alias, numeric, order, schemaType,
  ...i18n[$defaultLocale], ...i18n[$locale],
  ...options,
  'property': property._ref,
  'color': display.color.hex,
  'value': value
`;

export const variantOptionsProjection = config.variantOptions
  .map(option => `'${option}': ${option}->{ ${propertyValueProjection} }`)
  .join(',\n');
