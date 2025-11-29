import axios from 'axios'
import { getToken } from './auth'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Auto-attach Authorization header
api.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth APIs
export const signup = async (name, email, password) => {
  const response = await api.post('/auth/signup', { name, email, password })
  return response.data
}

export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password })
  return response.data
}

export const getCurrentUser = async () => {
  const response = await api.get('/auth/me')
  return response.data
}

// Image Transform API
export const transformImage = async (file, style) => {
  const formData = new FormData()
  formData.append('image', file)
  formData.append('style', style)
  
  const response = await api.post('/image/transform', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}

// History API
export const getHistory = async () => {
  const response = await api.get('/history')
  return response.data
}

export const deleteHistory = async (id) => {
  const response = await api.delete(`/history/${id}`)
  return response.data
}

export default api
