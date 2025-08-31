import type { User, RandomUserApiResponse } from '@/types/User'

export function useUsers() {
  /**
   * Enhanced fetchUsers with pagination support
   *
   * @param count - Number of users to fetch
   * @param page - Page number (1-based, optional for backward compatibility)
   * @param seed - Optional seed for consistent pagination results
   * @returns Promise<User[]> - Transformed user data
   */
  const fetchUsers = async (count: number, page: number = 1, seed?: string): Promise<User[]> => {
    try {
      const baseUrl = 'https://randomuser.me/api/'
      const params = new URLSearchParams({
        results: count.toString(),
        page: page.toString(),
        inc: 'gender,name,location,email,dob,picture,login',
      })

      if (seed) {
        params.append('seed', seed)
      }

      const url = `${baseUrl}?${params.toString()}`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data: RandomUserApiResponse = await response.json()

      if (!data.results || !Array.isArray(data.results)) {
        throw new Error('Invalid API response format')
      }

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

      if (error instanceof TypeError && error.message.includes('fetch')) {
        throw new Error('Network error: Please check your internet connection')
      }

      if (error instanceof Error) {
        throw error
      }

      throw new Error('An unexpected error occurred while fetching users')
    }
  }

  return {
    fetchUsers,
  }
}
