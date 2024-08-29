import {
  fetchDeductions,
  deleteDeduction,
  createDeduction,
  fetchDeduction,
  updateDeduction
} from '@/services/deductionService'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useCreateDeduction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createDeduction,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ['deductions'] })
    },
  })
}

export const useDeductions = () => {
  const {
    data: deductions,
    isLoading,
    isError,
    error,
  } = useQuery({
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
  const {
    mutate: deleteDeductionMutation,
    isPending: isDeleting,
    isSuccess: isDeleted,
  } = useMutation({
    mutationFn: deleteDeduction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deductions'] })
    },
  })

  return {
    deleteDeductionMutation,
    isDeleting,
    isDeleted,
  }
}

export const useDeduction = (id: number | string) => {
  return useQuery({
    queryFn: () => fetchDeduction(id),
    queryKey: ['deductions', id],
  })
}

export const useUpdateDeduction = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateDeduction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['deductions'] })
    },
  })
}