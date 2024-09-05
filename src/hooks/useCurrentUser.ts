import { fetchCurrentUser } from '@/services/userService'
import User from '@/types/users'
import { useQuery } from '@tanstack/react-query'

export const userCurrentUser = () => {
  const {
    data: User,
    isLoading,
    isError,
    error,
  } = useQuery<User, Error>({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
  })

  return {
    user: User || {},
    isLoading,
    isError,
    error,
  }
}
