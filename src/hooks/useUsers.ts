import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import { fetchUsers, deleteUser } from '@/services/userService'
import User from '@/types/users'

const useUsers = () => {
  const queryClient = useQueryClient()

  const {
    data: users,
    isLoading,
    isError,
    error,
  }: UseQueryResult<User[], Error> = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  })

  const { mutate: deleteUserMutation, isPending: isDeleting } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return {
    users: users || [],
    isLoading,
    isError,
    error,
    deleteUserMutation,
    isDeleting,
  }
}

export default useUsers
