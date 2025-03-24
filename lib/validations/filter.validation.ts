import * as Yup from 'yup';

import { ICreateFilterFormField } from '@/types';

import {
  INCORRECT_SLUG,
  MANDATORY_FIELD,
  MIN_LENGTH,
  SLUG_REGEXP,
} from '../constants';

export const createFilterSchema: Yup.ObjectSchema<ICreateFilterFormField> =
  Yup.object({
    slug: Yup.string()
      .matches(SLUG_REGEXP, INCORRECT_SLUG)
      .required(MANDATORY_FIELD),
    translatedData: Yup.object().shape({
      uk: Yup.object().shape({
        filterTitle: Yup.string().min(2, MIN_LENGTH).required(MANDATORY_FIELD),
      }),
      ru: Yup.object().shape({
        filterTitle: Yup.string().min(2, MIN_LENGTH).required(MANDATORY_FIELD),
      }),
    }),
    variants: Yup.array()
      .of(
        Yup.object().shape({
          variantSlug: Yup.string()
            .matches(SLUG_REGEXP, INCORRECT_SLUG)
            .required(MANDATORY_FIELD),
          translatedData: Yup.object().shape({
            uk: Yup.object().shape({
              variantTitle: Yup.string()
                .min(2, MIN_LENGTH)
                .required(MANDATORY_FIELD),
            }),
            ru: Yup.object().shape({
              variantTitle: Yup.string()
                .min(2, MIN_LENGTH)
                .required(MANDATORY_FIELD),
            }),
          }),
        })
      )
      .default([]),
  });
