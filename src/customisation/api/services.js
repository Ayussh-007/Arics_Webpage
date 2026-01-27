import api from './client'

export const fetchFlowers = () => api.get('/flowers').then((r) => r.data)
export const fetchAllFlowers = () => api.get('/flowers?all=1').then((r) => r.data)
export const createFlower = (payload) => api.post('/flowers', payload).then((r) => r.data)
export const updateFlower = (id, payload) => api.put(`/flowers/${id}`, payload).then((r) => r.data)
export const deleteFlower = (id) => api.delete(`/flowers/${id}`).then((r) => r.data)

export const fetchCustomizations = () => api.get('/customizations').then((r) => r.data)
export const fetchAllCustomizations = () => api.get('/customizations?all=1').then((r) => r.data)
export const createCustomization = (payload) =>
  api.post('/customizations', payload).then((r) => r.data)
export const updateCustomization = (id, payload) =>
  api.put(`/customizations/${id}`, payload).then((r) => r.data)
export const deleteCustomization = (id) =>
  api.delete(`/customizations/${id}`).then((r) => r.data)

export const fetchSettings = () => api.get('/admin/settings').then((r) => r.data)
export const updateSettings = (payload) => api.put('/admin/settings', payload).then((r) => r.data)

export const createOrder = (payload) => api.post('/orders', payload).then((r) => r.data)
export const fetchOrders = () => api.get('/orders').then((r) => r.data)

export const adminLogin = (payload) => api.post('/auth/login', payload).then((r) => r.data)
