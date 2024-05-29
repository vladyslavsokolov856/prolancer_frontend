import { useQuery, UseQueryResult } from '@tanstack/react-query'
import OrderLine from '@/types/orderLines'
import { fetchOrderLines } from '@/services/orderLineService'

export const useOrderLines = () => {
  const {
    data: orderLines,
    isLoading,
    isError,
    error,
  }: UseQueryResult<OrderLine[], Error> = useQuery({
    queryKey: ['orderLines'],
    queryFn: fetchOrderLines,
  })

  return {
    orderLines: orderLines || [],
    isLoading,
    isError,
    error,
  }
}
