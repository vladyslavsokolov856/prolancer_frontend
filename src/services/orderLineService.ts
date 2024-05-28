import { AxiosResponse } from 'axios'
import OrderLine from '@/types/orderLines'
import axiosInstance from './axios'

export const fetchOrderLines = async (): Promise<OrderLine[]> => {
  const response: AxiosResponse<OrderLine[]> = await axiosInstance.get(
    `/api/order-lines`
  )
  return response.data
}
