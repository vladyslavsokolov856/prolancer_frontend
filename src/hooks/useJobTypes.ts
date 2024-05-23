import { fetchJobTypes } from '@/services/jobTypeService'
import { useQuery } from '@tanstack/react-query'

export const useJobTypes = () => {
  return useQuery({ queryKey: ['job-types'], queryFn: fetchJobTypes })
}
