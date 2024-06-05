import { useQuery, UseQueryResult } from '@tanstack/react-query'
import Customer from '@/types/customers'
import { fetchCustomer, fetchCustomers } from '@/services/customerService'

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
    queryKey: ['customer'],
    queryFn: () => fetchCustomer(id),
  })

  return {
    customer,
    isLoading,
    isError,
    error,
  }
}
