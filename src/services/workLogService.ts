import { AxiosResponse } from 'axios'
import WorkLog from '@/types/workLogs'
import axiosInstance from './axios'

export const fetchWorkLogs = async (): Promise<WorkLog[]> => {
  const response: AxiosResponse<WorkLog[]> = await axiosInstance.get(
    `/api/work-logs`
  )
  return response.data.sort(
    ({ id: id1 }, { id: id2 }) => (id1 as number) - (id2 as number)
  )
}

export const fetchWorkLog = async (id: number): Promise<WorkLog> => {
  const response: AxiosResponse<WorkLog> = await axiosInstance.get(
    `/api/work-logs/${id}`
  )
  return response.data
}

export const createWorkLog = async (
  workLogData: Omit<WorkLog, 'id'>
): Promise<WorkLog> => {
  const response: AxiosResponse<WorkLog> = await axiosInstance.post(
    `/api/work-logs`,
    workLogData
  )
  return response.data
}

export const editWorkLog = async (
  id: number,
  workLogData: WorkLog
): Promise<WorkLog> => {
  const response: AxiosResponse<WorkLog> = await axiosInstance.put(
    `/api/work-logs/${id}`,
    workLogData
  )
  return response.data
}

export const deleteWorkLog = async (
  workLogId: number | string | undefined
): Promise<WorkLog> => {
  const response: AxiosResponse<WorkLog> = await axiosInstance.delete(
    `/api/work-logs/${workLogId}`
  )
  return response.data
}
