import {
  useQuery,
  UseQueryResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import {
  fetchInvoices,
  deleteInvoice,
  fetchInvoice,
  editInvoice,
} from '@/services/invoiceService'
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

export const useInvoice = (id: number | string | undefined) => {
  const {
    data: invoice,
    isLoading,
    isError,
    error,
  }: UseQueryResult<Invoice, Error> = useQuery({
    queryKey: ['invoice', id],
    queryFn: () => fetchInvoice(id),
  })

  return {
    invoice,
    isLoading,
    isError,
    error,
  }
}

export const useEditInvoice = (id: number | undefined) => {
  const queryClient = useQueryClient()
  const { mutate: editInvoiceMutation, isPending: isEditing } = useMutation({
    mutationFn: (invoiceData: Invoice) => editInvoice(id, invoiceData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices'] })
    },
  })

  return {
    editInvoiceMutation,
    isEditing,
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
