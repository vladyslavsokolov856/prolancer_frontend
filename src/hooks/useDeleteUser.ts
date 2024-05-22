import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteUser } from '@/services/userService'

const useDeleteUser = () => {
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

export default useDeleteUser
