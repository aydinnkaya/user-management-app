import { useI18n } from 'vue-i18n'
import { createUserSchemas, type User, type RandomUserItem } from '@/models/User'

function mapApiUserToUser(apiUser: RandomUserItem): User {
  return {
    id: apiUser.login.uuid,
    name: `${apiUser.name.first} ${apiUser.name.last}`,
    age: apiUser.dob.age,
    gender: apiUser.gender,
    email: apiUser.email,
    city: apiUser.location.city,
    country: apiUser.location.country,
    picture: apiUser.picture.large,
  }
}

export function useUsers() {
  const { t } = useI18n()
  const { RandomUserResponseSchema } = createUserSchemas(t)

  const fetchUsers = async (count: number): Promise<User[]> => {
    try {
      const response = await fetch(
        `https://randomuser.me/api/?results=${count}&inc=gender,name,location,email,dob,picture,login`,
      )

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const rawData = await response.json()

      const validatedData = RandomUserResponseSchema.parse(rawData)

      return validatedData.results.map(mapApiUserToUser)
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching users:', error.message)
        throw new Error(t('common.error'))
      } else {
        console.error('Unknown error fetching users:', error)
        throw new Error(t('common.error'))
      }
    }
  }

  return { fetchUsers }
}
