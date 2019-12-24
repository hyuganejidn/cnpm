const axios = require('axios')

export const createCategories = (name, prop_table_name) => {
  return axios.post('/categories/', { name, prop_table_name })
}
export const listCategories = () => {
  return axios.get('/categories/')
}
export const categoryHotel = (id = 1) => {
  return axios.get(`/categories/${id}`)
}
export const categoryRestaurant = (id = 2) => {
  return axios.get(`/categories/${id}`)
}
export const categoryAttraction = (id = 3) => {
  return axios.get(`/categories/${id}`)
}
export const categoryTransportation = (id = 4) => {
  return axios.get(`/categories/${id}`)
}
export const deleteCategory = (id) => {
  return axios.delete(`/categories/${id}`)
}
export const updateCategories = (id, { name, prop_table_name }) => {
  return axios.put(`/categories/${id}`, { name, prop_table_name })
}