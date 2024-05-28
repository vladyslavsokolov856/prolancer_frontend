import {
  useQuery,
  UseQueryResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { fetchInvoices, deleteInvoice } from '@/services/invoiceService'
import Invoice from '@/types/invoices'

export const useInvoices = () => {
  const {
    data: invoices,
    isLoading,
    isError,
    error,
  }: UseQueryResult<Invoice[], Error> = useQuery({
    queryKey: ['invoices'],
    queryFn: fetchInvoices,
  })

  return {
    invoices: invoices || [],
    isLoading,
    isError,
    error,
  }
}

export const useDeleteInvoice = () => {
  const queryClient = useQueryClient()
  const { mutate: deleteInvoiceMutation, isPending: isDeleting } = useMutation({
    mutationFn: deleteInvoice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] })
    },
  })

  return {
    deleteInvoiceMutation,
    isDeleting,
  }
}
