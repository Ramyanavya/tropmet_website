import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' }
})

export default api

// Registration
export const getFees = () => api.get('/registration/fees')
export const createRegistration = (data: any) => api.post('/registration/create', data)
export const verifyPayment = (data: any) => api.post('/registration/verify-payment', data)
export const getRegistrationStatus = (email: string) => api.get(`/registration/status/${email}`)

// Abstracts
export const getThemes = () => api.get('/abstracts/themes')
export const submitAbstract = (formData: FormData) =>
  api.post('/abstracts/submit', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
export const getAbstractStatus = (id: number) => api.get(`/abstracts/${id}`)

// Content
export const getAnnouncements = () => api.get('/announcements')
export const getDates = () => api.get('/dates')
export const getSpeakers = () => api.get('/speakers')
export const getGallery = () => api.get('/gallery')
export const getSponsors = () => api.get('/sponsors')
