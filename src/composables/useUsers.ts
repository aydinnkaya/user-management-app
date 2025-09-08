import { createUserSchemas, type User, type RandomUserItem } from '@/models/User'

const mapApiUserToUser = (apiUser: RandomUserItem): User => ({
  id: apiUser.login.uuid,
  name: `${apiUser.name.first} ${apiUser.name.last}`,
  age: apiUser.dob.age,
  gender: apiUser.gender,
  email: apiUser.email,
  city: apiUser.location.city,
  country: apiUser.location.country,
  picture: apiUser.picture.large,
})

const buildApiUrl = (count: number, page?: number, seed?: string): string => {
  const params = new URLSearchParams({
    results: count.toString(),
    inc: 'gender,name,location,email,dob,picture,login',
  })

  if (seed) params.append('seed', seed)
  if (page && page > 1) params.append('page', page.toString())

  return `https://randomuser.me/api/?${params}`
}

export function useUsers() {
  const { RandomUserResponseSchema } = createUserSchemas()

  const fetchUsers = async (count: number, page?: number, seed?: string): Promise<User[]> => {
    try {
      const response = await fetch(buildApiUrl(count, page, seed))

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const rawData = await response.json()
      const parsed = RandomUserResponseSchema.safeParse(rawData)

      if (!parsed.success) {
        console.error('Validation error:', parsed.error)
        throw new Error('Data validation failed')
      }

      return parsed.data.results.map(mapApiUserToUser)
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error instanceof Error ? error : new Error('Unknown error occurred')
    }
  }

  return { fetchUsers }
}
