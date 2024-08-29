import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from '@tanstack/react-query'
import Customer from '@/types/customers'
import {
  createCustomer,
  deleteCustomer,
  editCustomer,
  fetchCustomer,
  fetchCustomers,
} from '@/services/customerService'

export const useCustomers = () => {
  const {
    data: customers,
    isLoading,
    isError,
    error,
  }: UseQueryResult<Customer[], Error> = useQuery({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  })

  return {
    customers: customers || [],
    isLoading,
    isError,
    error,
  }
}

export const useCustomer = (id: number | undefined) => {
  const {
    data: customer,
    isLoading,
    isError,
    error,
  }: UseQueryResult<Customer, Error> = useQuery({
    queryKey: ['customers', id],
    queryFn: () => fetchCustomer(id),
  })

  return {
    customer,
    isLoading,
    isError,
    error,
  }
}

export const useEditCustomer = (id: number) => {
  const queryClient = useQueryClient()
  const {
    mutate: updateCustomerMutation,
    isSuccess: isEdited,
    isPending: isEditing,
  } = useMutation({
    mutationFn: (userData: Customer) => editCustomer(id, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers', id] })
    },
  })

  return {
    updateCustomerMutation,
    isEdited,
    isEditing,
  }
}

export const useCreateCustomer = () => {
  const queryClient = useQueryClient()
  const {
    mutate: createCustomerMutation,
    isSuccess: isCreated,
    isPending: isCreating,
  } = useMutation({
    mutationFn: createCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
    },
  })

  return {
    createCustomerMutation,
    isCreated,
    isCreating,
  }
}

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient()
  const { mutate: delteCustomerMutation, isPending: isDeleting } = useMutation({
    mutationFn: deleteCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] })
    },
  })

  return {
    delteCustomerMutation,
    isDeleting,
  }
}
