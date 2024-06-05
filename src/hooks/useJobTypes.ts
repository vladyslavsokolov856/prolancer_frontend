import { fetchJobType, fetchJobTypes } from '@/services/jobTypeService'
import { useQuery } from '@tanstack/react-query'

export const useJobTypes = () => {
  return useQuery({ queryKey: ['job-types'], queryFn: fetchJobTypes })
}

export const useJobType = (id: number | undefined) => {
  return useQuery({ queryKey: ['job-type'], queryFn: () => fetchJobType(id) })
}
