import { z } from 'zod'

export const GENDERS = ['female', 'male'] as const
export type Gender = (typeof GENDERS)[number]
export const GenderSchema = z.enum(GENDERS)

/** ---- Domain Types ---- */
export interface User {
  id: string
  name: string
  age: number
  gender: Gender
  email: string
  city: string
  country: string
  picture: string
}

/**Represents the filtering criteria applied to the user list.*/
export interface UserFilters {
  countries: string[]
  gender: Gender | ''
}

/**Defines the state of filters for a single page or context.*/
export interface FilterState {
  countryFilter: string[]
  genderFilter: Gender | ''
}

/** Stores filter states for multiple pages/contexts in the app.*/
export interface PageFilters {
  home: FilterState
  favorites: FilterState
}

export type RandomUserItem = z.infer<ReturnType<typeof createUserSchemas>['RandomUserItemSchema']>
export type RandomUserApiResponse = z.infer<
  ReturnType<typeof createUserSchemas>['RandomUserResponseSchema']
>

export function createUserSchemas(t: (key: string) => string) {
  const RandomUserItemSchema = z.object({
    gender: GenderSchema,
    name: z.object({
      title: z.string(),
      first: z.string(),
      last: z.string(),
    }),
    location: z.object({
      city: z.string(),
      country: z.string(),
    }),
    email: z.email({ message: t('validation.invalidEmail') }),
    dob: z.object({
      age: z.number(),
    }),
    picture: z.object({
      large: z.url({ message: t('validation.invalidUrl') }),
      medium: z.url({ message: t('validation.invalidUrl') }),
      thumbnail: z.url({ message: t('validation.invalidUrl') }),
    }),
    login: z.object({
      uuid: z.uuid({ message: t('validation.invalidUuid') }),
    }),
  })

  const RandomUserResponseSchema = z.object({
    results: z.array(RandomUserItemSchema),
    info: z.object({
      seed: z.string(),
      results: z.number(),
      page: z.number(),
      version: z.string(),
    }),
  })

  return { RandomUserItemSchema, RandomUserResponseSchema }
}
