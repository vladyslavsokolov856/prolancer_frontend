import {
  useQuery,
  UseQueryResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import {
  fetchUsers,
  deleteUser,
  fetchUser,
  createUser,
  editUser,
} from '@/services/userService'
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

export const useUser = (id: number) => {
  const {
    data: user,
    isLoading,
    isError,
    error,
  }: UseQueryResult<User, Error> = useQuery({
    queryKey: ['users', id],
    queryFn: () => fetchUser(id),
  })

  return {
    user: user || null,
    isLoading,
    isError,
    error,
  }
}

export const useCreateUser = () => {
  const queryClient = useQueryClient()
  const {
    mutate: createUserMutation,
    isSuccess: isCreated,
    isPending: isCreating,
  } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return {
    createUserMutation,
    isCreated,
    isCreating,
  }
}

export const useEditUser = (id: number) => {
  const queryClient = useQueryClient()
  const {
    mutate: updateUserMutation,
    isSuccess: isEdited,
    isPending: isEditing,
  } = useMutation({
    mutationFn: (userData: User) => editUser(id, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })

  return {
    updateUserMutation,
    isEdited,
    isEditing,
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
