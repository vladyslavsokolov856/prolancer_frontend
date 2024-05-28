import Customer from './customers'

export default interface Invoice {
  id: number
  status: string
  created_date: Date
  updated_date: Date
  invoice_date: Date
  customer_payment_date: Date
  note: string
  currency: string
  hours_worked: number
  send_invoice_copy_to: string
  user_id: number
  customer_id: number
  vat_percentage: number
  task_id: number
  payment_days: number
  customer: Customer
  amount: number
}
