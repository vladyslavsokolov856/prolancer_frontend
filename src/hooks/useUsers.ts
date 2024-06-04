import {
  useQuery,
  UseQueryResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { fetchUsers, deleteUser, fetchUser } from '@/services/userService'
import User from '@/types/users'

export const useUsers = () => {
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

export const useUser = (id: number | undefined) => {
  const {
    data: user,
    isLoading,
    isError,
    error,
  }: UseQueryResult<User, Error> = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUser(id),
  })

  return {
    user,
    isLoading,
    isError,
    error,
  }
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()
  const { mutate: deleteUserMutation, isPending: isDeleting } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return {
    deleteUserMutation,
    isDeleting,
  }
}
