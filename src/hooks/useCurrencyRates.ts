import { useQuery } from '@tanstack/react-query'
import { fetchCurrencyRates } from '@/services/currencyRateService'

export const useCurrencyRates = () => {
  const {
    data: currencyRates,
    isLoading,
    isError,
    error,
  } = useQuery<Record<string, number>, Error>({
    queryKey: ['currencyRates'],
    queryFn: fetchCurrencyRates,
  })

  return {
    currencyRates: currencyRates || {},
    isLoading,
    isError,
    error,
  }
}
