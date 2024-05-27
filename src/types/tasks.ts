export default interface Task {
  id?: number
  status: string
  title: string
  reference: string
  customer_id: number
  customer_message: string
  job_type_id: number
  user_id?: number
  start_date: Date | null
  end_date: Date | null
  terms_accepted: boolean
  is_retainer: boolean
  expected_minutes: number
  minutes_spent?: number
  description: string
  payment_type: string
  payment_amount: number
  currency: string
  archived?: boolean
  purchase_order_number: string
  payment_term: string
  payment_term_days: number
  payment_term_other?: string
  offer_id?: number
  request_allow_mileages: boolean
  allow_mileages: boolean
  show_customer_price: boolean
  requested_changes?: string
  deleted?: boolean
}
