import * as Yup from 'yup';

import { IProducerForm } from '@/types';

import {
  AFTER_DOT_3,
  CURRENCY_EXCHANGE_MANDATORY,
  CURRENCY_EXCHANGERATE_DEPENDENCY,
  MANDATORY_FIELD,
  MAX_LENGTH_24,
  MAX_LENGTH_3,
  MIN_LENGTH,
  NUMBERS_AFTER_DOT_REGEXP,
  ONLY_LETTERS,
  ONLY_NUMBERS,
  ONLY_POSITIVE_NUMBERS,
} from '../constants';

export const producerValidationSchema: Yup.ObjectSchema<IProducerForm> =
  Yup.object({
    translatedData: Yup.object().shape({
      uk: Yup.object().shape({
        title: Yup.string()
          .min(2, MIN_LENGTH)
          .max(24, MAX_LENGTH_24)
          .required(MANDATORY_FIELD),
      }),
      ru: Yup.object().shape({
        title: Yup.string()
          .min(2, MIN_LENGTH)
          .max(24, MAX_LENGTH_24)
          .required(MANDATORY_FIELD),
      }),
    }),
    slug: Yup.string()
      .typeError(ONLY_LETTERS)
      .min(2, MIN_LENGTH)
      .required(MANDATORY_FIELD),
    currency: Yup.string()
      .typeError(ONLY_LETTERS)
      .min(2, MIN_LENGTH)
      .max(3, MAX_LENGTH_3)
      .nullable()
      .default(null),
    exchangeRate: Yup.number()
      .typeError(ONLY_NUMBERS)
      .positive(ONLY_POSITIVE_NUMBERS)
      .test('max-decimals', AFTER_DOT_3, value => {
        if (value === undefined || value === null) return true;
        return NUMBERS_AFTER_DOT_REGEXP.test(value.toString());
      })
      .nullable()
      .default(null),
  }).test(
    'currency-exchangeRate-dependency',
    CURRENCY_EXCHANGERATE_DEPENDENCY,
    function (value) {
      const { currency, exchangeRate } = value;

      const hasCurrency = currency !== null && currency !== '';
      const hasExchangeRate =
        exchangeRate !== null && exchangeRate !== undefined;

      if (
        (hasCurrency && !hasExchangeRate) ||
        (!hasCurrency && hasExchangeRate)
      ) {
        return this.createError({
          path: hasCurrency ? 'exchangeRate' : 'currency',
          message: CURRENCY_EXCHANGE_MANDATORY,
        });
      }

      return true;
    }
  );
