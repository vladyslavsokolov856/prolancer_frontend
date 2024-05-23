import axiosInstance from './axios'

import type { JobType } from '@/types'

export const fetchJobTypes = async (): Promise<JobType[]> => {
  const response = await axiosInstance.get<JobType[]>(`/api/job-types`)

  return response.data.sort(({ id: id1 }, { id: id2 }) => id1 - id2)
}
