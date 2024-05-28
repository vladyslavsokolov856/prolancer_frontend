import Invoice from '@/types/invoices'
import axiosInstance from './axios'
import { InvoiceInputs } from '@/components/Form/InvoiceForm'

export const fetchInvoices = async () => {
  const response = await axiosInstance.get<Invoice[]>(`/api/invoices`)

  return response.data
}

export const deleteInvoice = async (invoiceId: number | string | undefined) => {
  const response = await axiosInstance.delete(`/api/invoices/${invoiceId}`)

  return response.data
}

export const createInvoice = async (data: InvoiceInputs) => {
  const response = await axiosInstance.post<Invoice>('/api/invoices', data)

  return response.data
}
