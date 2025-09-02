import type { User, RandomUserApiResponse } from '@/types/User'

export function useUsers() {
  const fetchUsers = async (count: number): Promise<User[]> => {
    try {
      const response = await fetch(
        `https://randomuser.me/api/?results=${count}&inc=gender,name,location,email,dob,picture,login`,
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Json parse
      const data: RandomUserApiResponse = await response.json()

      return data.results.map((apiUser) => ({
        id: apiUser.login.uuid,
        name: `${apiUser.name.first} ${apiUser.name.last}`,
        age: apiUser.dob.age,
        gender: apiUser.gender,
        email: apiUser.email,
        city: apiUser.location.city,
        country: apiUser.location.country,
        picture: apiUser.picture.large,
      }))
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  }

  return {
    fetchUsers,
  }
}
