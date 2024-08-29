import axios from 'axios'

import type { JobType } from '@/types'

export const fetchJobTypes = async (): Promise<JobType[]> => {
  const response = await axios.get<JobType[]>(`/api/job-types`)

  return response.data.sort(({ id: id1 }, { id: id2 }) => id1 - id2)
}

export const fetchJobType = async (
  jobTypeId: number | undefined
): Promise<JobType> => {
  const response = await axios.get<JobType>(
    `/api/job-types/${jobTypeId}`
  )

  return response.data
}
