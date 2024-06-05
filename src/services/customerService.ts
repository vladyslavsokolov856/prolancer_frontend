import { AxiosResponse } from 'axios'
import Customer from '@/types/customers'
import axiosInstance from './axios'

export const fetchCustomers = async (): Promise<Customer[]> => {
  const response: AxiosResponse<Customer[]> = await axiosInstance.get(
    `/api/customers`
  )
  return response.data
}

export const fetchCustomer = async (
  customerId: number | undefined
): Promise<Customer> => {
  const response: AxiosResponse<Customer> = await axiosInstance.get(
    `/api/customers/${customerId}`
  )
  return response.data
}
