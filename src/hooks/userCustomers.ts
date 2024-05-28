import { useQuery, UseQueryResult } from '@tanstack/react-query'
import Customer from '@/types/customers'
import { fetchCustomers } from '@/services/customerService'

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
