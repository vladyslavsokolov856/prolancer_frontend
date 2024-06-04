import Invoice from '@/types/invoices'
import axiosInstance from './axios'
import { InvoiceInputs } from '@/components/Form/InvoiceForm'
import { AxiosResponse } from 'axios'

export const fetchInvoices = async () => {
  const response = await axiosInstance.get<Invoice[]>(`/api/invoices`)

  return response.data
}

export const fetchInvoice = async (
  invoiceId: number | string | undefined
): Promise<Invoice> => {
  const response: AxiosResponse<Invoice> = await axiosInstance.get(
    `/api/invoices/${invoiceId}`
  )
  return response.data
}

export const editInvoice = async (
  invoiceId: number | undefined,
  invoiceData: Invoice
): Promise<Invoice> => {
  const response: AxiosResponse<Invoice> = await axiosInstance.put(
    `/api/invoices/${invoiceId}`,
    invoiceData
  )
  return response.data
}

export const deleteInvoice = async (
  invoiceId: number | string | undefined
): Promise<Invoice> => {
  const response: AxiosResponse<Invoice> = await axiosInstance.delete(
    `/api/invoices/${invoiceId}`
  )

  return response.data
}

export const createInvoice = async (data: InvoiceInputs) => {
  const response = await axiosInstance.post<Invoice>('/api/invoices', data)

  return response.data
}
