import axiosInstance from './axios'
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
