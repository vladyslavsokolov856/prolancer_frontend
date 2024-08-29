import axios from 'axios'
import Deduction from '@/types/deductions'
import { DeductionInputs } from '@/components/Form/DeductionForm'

export const createDeduction = async (deduction: DeductionInputs) => {
  const formData = new FormData()
  for (const [key, value] of Object.entries(deduction)) {
    if (typeof value === 'string' || value instanceof File) {
      formData.append(key, value)
    } else {
      formData.append(key, String(value))
    }
  }

  const { data } = await axios.post('/api/deductions', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return data
}

export const fetchDeductions = async () => {
  const response = await axios.get<Deduction[]>(`/api/deductions`)
  return response.data
}

export const fetchDeduction = async (deductionId: number | string) => {
  const response = await axios.get<Deduction>(
    `/api/deductions/${deductionId}`
  )

  return response.data
}

export const deleteDeduction = async (
  deductionId: number | string | undefined
) => {
  const response = await axios.delete(`/api/deductions/${deductionId}`)
  return response.data
}

export const updateDeduction = async (
  data: Partial<DeductionInputs> & { id: number | string }
) => {
  const response = await axios.put<Deduction>(
    `/api/deductions/${data.id}`,
    data
  )

  return response.data
}
