import { AxiosResponse } from 'axios'
import OrderLine from '@/types/orderLines'
import axios from 'axios'

export const fetchOrderLines = async (): Promise<OrderLine[]> => {
  const response: AxiosResponse<OrderLine[]> = await axios.get(
    `/api/order-lines`
  )
  return response.data
}
