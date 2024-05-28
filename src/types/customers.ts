export default interface Customer {
  id: number
  user_id: number
  type: string
  language: string
  company_name: string
  name_contact_person: string
  email_contact_person: string
  phone_contact_person: string
  address: string
  city: string
  postal_code: string
  country: string
  payment_due_days: number
  company_id: string
  ean: number
  deleted: boolean
}
