import axios, { AxiosResponse } from 'axios'
import User from '@/types/users'

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const fetchUsers = async (): Promise<User[]> => {
  const response: AxiosResponse<User[]> = await axios.get(
    `${VITE_BACKEND_URL}/api/users`
  )
  return response.data
}

export const deleteUser = async (
  userId: number | string | undefined
): Promise<User> => {
  const response: AxiosResponse<User> = await axios.delete(
    `${VITE_BACKEND_URL}/api/users/${userId}`
  )
  return response.data
}
