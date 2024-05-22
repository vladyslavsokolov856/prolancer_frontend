import { AxiosResponse } from 'axios'
import User from '@/types/users'
import axiosInstance from './axios'

export const fetchUsers = async (): Promise<User[]> => {
  const response: AxiosResponse<User[]> = await axiosInstance.get(`/api/users`)
  return response.data
}

export const deleteUser = async (
  userId: number | string | undefined
): Promise<User> => {
  const response: AxiosResponse<User> = await axiosInstance.delete(
    `/api/users/${userId}`
  )
  return response.data
}
