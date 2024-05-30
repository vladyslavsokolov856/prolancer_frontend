export default interface User {
  id?: number
  email: string
  phone_number: string
  first_name: string
  last_name: string
  display_name?: string
  role?: string
  job_type_id: string
  user_language: string
  address: string
  city: string
  postal_code: string
  country: string
  email_preferences?: string
  bank_information: {
    name: string
    registration_number: string
    account_number: string
  }
  tax_person_id: string
  tax_card: string
  salary_payment_type_requested: string
  holiday_payment: boolean
}
