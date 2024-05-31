import { createDeduction } from '@/services/deductionService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateDeduction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createDeduction,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['deductions'] })
    },
  })
}
