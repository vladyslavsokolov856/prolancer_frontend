import {
  useQuery,
  UseQueryResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { fetchDeductions, deleteDeduction } from '@/services/deductionService'
import Deduction from '@/types/deductions'

export const useDeductions = () => {
  const {
    data: deductions,
    isLoading,
    isError,
    error,
  }: UseQueryResult<Deduction[], Error> = useQuery({
    queryKey: ['deductions'],
    queryFn: fetchDeductions,
  })

  return {
    deductions: deductions || [],
    isLoading,
    isError,
    error,
  }
}

export const useDeleteDeduction = () => {
  const queryClient = useQueryClient()
  const { mutate: deleteDeductionMutation, isPending: isDeleting } =
    useMutation({
      mutationFn: deleteDeduction,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['deductions'] })
      },
    })

  return {
    deleteDeductionMutation,
    isDeleting,
  }
}
