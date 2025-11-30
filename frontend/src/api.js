import axios from 'axios'

const api = axios.create({
  baseURL: variables.API_URL + '/api',
  /*baseURL: 'http://192.168.1.100:8000/api',*/
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('access')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api