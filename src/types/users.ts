export default interface User {
  id: number
  email: string
  phone_number: string
  first_name: string
  last_name: string
  display_name: string
  role: string
  user_language: string
  locale: string
  email_verified: boolean
  account_setup_complete: boolean
  address: string
  city: string
  postal_code: string
  country: string
  bank_information: string
  tax_person_id: string
  tax_card: string
  salary_payment_type: string
  salary_payment_type_requested: string
  deleted: boolean
}
