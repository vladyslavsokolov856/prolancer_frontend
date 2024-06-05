export default interface Deduction {
  id: number
  description: string
  status: string
  amount_original_currency: number
  amount: number
  include_vat: boolean
  currency: string
  image_url: string
  user_id: number
  task_id: number
  deleted: boolean
  created_at: Date
}
