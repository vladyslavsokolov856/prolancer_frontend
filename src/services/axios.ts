import axios, { AxiosInstance } from 'axios'

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''
const ZITADEL_AUTHORITY = 'http://prolancer-authentication-ebcf8a4aae1e.herokuapp.com/'
const ZITADEL_CLIENT_ID = '275389987892098434@prolancer'

const userInfo = localStorage.getItem(`oidc.user:${ZITADEL_AUTHORITY}:${ZITADEL_CLIENT_ID}`) as string
const token = userInfo && JSON.parse(userInfo).access_token;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${token}`
  },
})

export default axiosInstance
