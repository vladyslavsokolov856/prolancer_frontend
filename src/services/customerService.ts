import { AxiosResponse } from 'axios'
import Customer from '@/types/customers'
import axios from 'axios'

export const fetchCustomers = async (): Promise<Customer[]> => {
  const response: AxiosResponse<Customer[]> = await axios.get(
    `/api/customers`
  )
  return response.data
}

export const fetchCustomer = async (
  customerId: number | undefined
): Promise<Customer> => {
  const response: AxiosResponse<Customer> = await axios.get(
    `/api/customers/${customerId}`
  )
  return response.data
}

export const createCustomer = async (
  customerData: Customer
): Promise<Customer> => {
  const response: AxiosResponse<Customer> = await axios.post(
    `/api/customers`,
    customerData
  )
  return response.data
}

export const editCustomer = async (
  id: number,
  customerData: Customer
): Promise<Customer> => {
  const response: AxiosResponse<Customer> = await axios.put(
    `/api/customers/${id}`,
    customerData
  )
  return response.data
}

export const deleteCustomer = async (
  customerId: number | string | undefined
) => {
  const response = await axios.delete(`/api/customers/${customerId}`)

  return response.data
}
