import axiosInstance from './axios'
import Deduction from '@/types/deductions'
import { DeductionInputs } from '@/components/Form/DeductionForm'

export const createDeduction = async (deduction: DeductionInputs) => {
  try {
    const formData = new FormData()
    for (let [key, value] of Object.entries(deduction)) {
      if (typeof value === 'string' || value instanceof File) {
        formData.append(key, value)
      } else {
        formData.append(key, String(value))
      }
    }

    const { data } = await axiosInstance.post('/api/deductions', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return data
  } catch (e) {
    throw e
  }
}

export const fetchDeductions = async () => {
  const response = await axiosInstance.get<Deduction[]>(`/api/deductions`)
  return response.data
}

export const fetchDeduction = async (deductionId: number | string) => {
  const response = await axiosInstance.get<Deduction>(
    `/api/deductions/${deductionId}`
  )

  return response.data
}

export const deleteDeduction = async (
  deductionId: number | string | undefined
) => {
  const response = await axiosInstance.delete(`/api/deductions/${deductionId}`)
  return response.data
}