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

export interface UserFilters {
  countries: string[]
  gender: string
}

export interface FilterState {
  countryFilter: string[]
  genderFilter: string
}

export interface PageFilters {
  home: FilterState
  favorites: FilterState
}
