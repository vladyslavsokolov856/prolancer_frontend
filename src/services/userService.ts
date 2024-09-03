import { AxiosResponse } from 'axios'
import User from '@/types/users'
import axios from 'axios'

export const fetchUsers = async (): Promise<User[]> => {
  const response: AxiosResponse<User[]> = await axios.get(`/api/users`)
  return response.data
}

export const fetchUser = async (userId: number | undefined): Promise<User> => {
  const response: AxiosResponse<User> = await axios.get(
    `/api/users/${userId}`
  )
  return response.data
}

export const createUser = async (userData: User): Promise<User> => {
  const response: AxiosResponse<User> = await axios.post(
    `/api/users`,
    userData
  )
  return response.data
}

export const editUser = async (id: number, userData: User): Promise<User> => {
  const response: AxiosResponse<User> = await axios.put(
    `/api/users/${id}`,
    userData
  )
  return response.data
}

export const deleteUser = async (
  userId: number | string | undefined
): Promise<User> => {
  const response: AxiosResponse<User> = await axios.delete(
    `/api/users/${userId}`
  )
  return response.data
}
