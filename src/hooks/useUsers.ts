import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { fetchUsers } from '@/services/userService'
import User from '@/types/users'

const useUsers = () => {
  const {
    data: users,
    isLoading,
    isError,
    error,
  }: UseQueryResult<User[], Error> = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  return {
    users: users || [],
    isLoading,
    isError,
    error,
  }
}

export default useUsers
