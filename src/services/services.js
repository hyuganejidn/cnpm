const axios = require('axios')


export const listServices = ({ opts }) => {
  let url = '/services/'
  if (opts.page) url += `&page=${opts.page}`
  if (opts.amount) url += `&amount=${opts.amount}`
  return axios.get(url)
}

export const getService = (id) => axios.get(`/services/${id}`)

export const serviceCategory = (category, service_id) => axios.get(`/services/${category}/${service_id}`)

export const serviceRequest = ({ name, prop_table_name }) => axios.get('/services/requests/', { name, prop_table_name })

export const getRequestUser = (page = 1, amount = 8) => {
  return axios.get(`/services/requests/?amount=${amount}&page=${page}`)
}
// export const approveService = (id, service_new_id, service_old_id) => {
//   return axios.get(`/services/request/approve/?service_old_id=${service_old_id}&service_new_id=${service_new_id}&id=${id}`)
// }
export const approveService = (id, service_new_id, service_old_id) => {
  return axios.post('/services/approve', {
    id, service_new_id, service_old_id
  })
}
export const createServiceHotel = ({ name, content, street_address, extended_address, mobile, property_amenities, price, category_id = 1 }) => {
  return axios.post('/services/request', { name, content, street_address, extended_address, mobile, property_amenities, price, category_id })
}

export const createServiceRes = ({ name, content, street_address, extended_address, mobile, food_category, special_diet, meal, category_id = 2 }) => {
  return axios.post('/services/request', { name, content, street_address, extended_address, mobile, food_category, special_diet, meal, category_id })
}

export const createServiceAtt = ({ name, content, street_address, extended_address, mobile, note, category_id = 3 }) => {
  return axios.post('/services/request', { name, content, street_address, extended_address, mobile, note, category_id })
}

export const createServiceTrans = ({ name, content, street_address, extended_address, mobile, website, app, category_id = 4 }) => {
  return axios.post('/services/request', { name, content, street_address, extended_address, mobile, website, app, category_id })
}
// https/backend-66hv4qgtdq-an.a.run.app/api/services/requests/?amount=8&page=1
//hotel:1, res: 2, attract: 3, trans:4
export const getServiceHotel = (amount = 8, page = 1) => {
  return axios.get(`/services/categories/1?amount=${amount}&page=${page}`)
}
export const getServiceRes = (amount, page, keyword) => {
  return axios.get(`/services/categories/2?amount=${amount}&page=${page}&keyword=${keyword}`)
}
export const getServiceAtt = (amount = 8, page = 1, keyword) => {
  return axios.get(`/services/categories/3?amount=${amount}&page=${page}&keyword=${keyword}`)
}
export const getServiceTrans = (amount = 8, page = 1) => {
  return axios.get(`/services/categories/4?amount=${amount}&page=${page}`)
}

export const searchService = (amount = 8, page = 1, keyword) => {
  return axios.get(`/services/search?amount=${amount}&page=${page}&keyword=${keyword}`)
}
