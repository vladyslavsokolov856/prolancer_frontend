import Invoice from '@/types/invoices'
import axios from 'axios'
import { InvoiceInputs } from '@/components/Form/InvoiceForm'

export const fetchInvoices = async () => {
  const response = await axios.get<Invoice[]>(`/api/invoices`)

  return response.data
}

export const deleteInvoice = async (invoiceId: number | string | undefined) => {
  const response = await axios.delete(`/api/invoices/${invoiceId}`)

  return response.data
}

export const createInvoice = async (data: InvoiceInputs) => {
  const response = await axios.post<Invoice>('/api/invoices', data)

  return response.data
}

export const fetchInvoice = async (invoiceId: number | string) => {
  const response = await axios.get<Invoice>(
    `/api/invoices/${invoiceId}`
  )

  return response.data
}

export const updateInvoice = async (
  data: Partial<InvoiceInputs> & { id: number | string }
) => {
  const response = await axios.put<Invoice>(
    `/api/invoices/${data.id}`,
    data
  )

  return response.data
}
