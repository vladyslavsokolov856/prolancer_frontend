import { AxiosResponse } from 'axios'
import Task from '@/types/tasks'
import axiosInstance from './axios'

export const fetchTasks = async (): Promise<Task[]> => {
  const response: AxiosResponse<Task[]> = await axiosInstance.get(`/api/tasks`)
  return response.data.sort(
    ({ id: id1 }, { id: id2 }) => (id1 as number) - (id2 as number)
  )
}

export const fetchTask = async (id: number): Promise<Task> => {
  const response: AxiosResponse<Task> = await axiosInstance.get(
    `/api/tasks/${id}`
  )
  return response.data
}

export const createTask = async (taskData: Task): Promise<Task> => {
  const response: AxiosResponse<Task> = await axiosInstance.post(
    `/api/tasks`,
    taskData
  )
  return response.data
}

export const editTask = async (id: number, taskData: Task): Promise<Task> => {
  const response: AxiosResponse<Task> = await axiosInstance.put(
    `/api/tasks/${id}`,
    taskData
  )
  return response.data
}

export const deleteTask = async (
  taskId: number | string | undefined
): Promise<Task> => {
  const response: AxiosResponse<Task> = await axiosInstance.delete(
    `/api/tasks/${taskId}`
  )
  return response.data
}
