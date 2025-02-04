import axios from 'axios'

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL || ''

export const configAxios = (userInfo: any) => {
  const { id_token } = userInfo || {};

  axios.defaults.baseURL = VITE_BACKEND_URL;
  // axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
  axios.defaults.headers.common['X-ID'] = id_token;
};
