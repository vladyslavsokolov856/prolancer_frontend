export default interface Customer {
  customer_type: 'private' | 'organization' | null | undefined
  name_contact_person: string
  company_name: string
}
