/** Contains essential information for profile display and filtering.*/
export interface User {
  id: string
  name: string
  age: number
  gender: string
  email: string
  city: string
  country: string
  picture: string
}

/**
 * * Structure of the response returned by the Random User API.
 * * Used to map API data into the internal `User` interface.
 */
export interface RandomUserApiResponse {
  results: Array<{
    gender: string
    name: {
      title: string
      first: string
      last: string
    }
    location: {
      city: string
      country: string
    }
    email: string
    dob: {
      age: number
    }
    picture: {
      large: string
      medium: string
      thumbnail: string
    }
    login: {
      uuid: string
    }
  }>
  info: {
    seed: string
    results: number
    page: number
    version: string
  }
}

/**Represents the filtering criteria applied to the user list.*/
export interface UserFilters {
  countries: string[]
  gender: string
}

/**Defines the state of filters for a single page or context.*/
export interface FilterState {
  countryFilter: string[]
  genderFilter: string
}

/** * Stores filter states for multiple pages/contexts in the app.*/
export interface PageFilters {
  home: FilterState
  favorites: FilterState
}
