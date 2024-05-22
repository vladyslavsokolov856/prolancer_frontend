import axios, { AxiosInstance } from 'axios'

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''

const axiosInstance: AxiosInstance = axios.create({
  baseURL: VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosInstance
