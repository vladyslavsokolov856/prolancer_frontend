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

export const createCustomer = async (
  customerData: Customer
): Promise<Customer> => {
  const response: AxiosResponse<Customer> = await axiosInstance.post(
    `/api/customers`,
    customerData
  )
  return response.data
}

export const editCustomer = async (
  id: number,
  customerData: Customer
): Promise<Customer> => {
  const response: AxiosResponse<Customer> = await axiosInstance.put(
    `/api/customers/${id}`,
    customerData
  )
  return response.data
}
