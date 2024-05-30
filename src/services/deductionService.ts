import { AxiosResponse } from 'axios'
import Deduction from '@/types/deductions'
import axiosInstance from './axios'

export const fetchDeductions = async (): Promise<Deduction[]> => {
  const response: AxiosResponse<Deduction[]> = await axiosInstance.get(
    `/api/deductions`
  )
  return response.data
}

export const deleteDeduction = async (
  deductionId: number | string | undefined
): Promise<Deduction> => {
  const response: AxiosResponse<Deduction> = await axiosInstance.delete(
    `/api/deductions/${deductionId}`
  )
  return response.data
}
