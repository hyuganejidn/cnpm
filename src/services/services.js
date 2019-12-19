const axios = require('axios')


export const listServices = ({ opts }) => {
  let url = `/services/`
  if (opts.page) url += `&page=${opts.page}`
  if (opts.amount) url += `&amount=${opts.amount}`
  return axios.get(url)
}

export const service = (id) => axios.get(`/services/${id}`)

export const serviceCategory = (category, service_id) => axios.get(`/services/${category}/${service_id}`)

export const serviceRequest = ({ name, prop_table_name }) => axios.get(`/services/requests/`, { name, prop_table_name })

export const createServiceHotel = ({ name, content, street_address, extended_address, mobile, property_amenities, price, category_id = 1 }) => {
  return axios.post(`/api/services/request`, { name, content, street_address, extended_address, mobile, property_amenities, price, category_id })
}
export const createServiceRes = ({ name, content, street_address, extended_address, mobile, food_category, special_diet, meal, category_id = 2 }) => {
  return axios.post(`/api/services/request`, { name, content, street_address, extended_address, mobile, food_category, special_diet, meal, category_id })
}
export const createServiceAtt = ({ name, content, street_address, extended_address, mobile, note, category_id = 3 }) => {
  return axios.post(`/api/services/request`, { name, content, street_address, extended_address, mobile, note, category_id })
}
export const createServiceTrans = ({ name, content, street_address, extended_address, mobile, website, app, category_id = 4 }) => {
  return axios.post(`/api/services/request`, { name, content, street_address, extended_address, mobile, website, app, category_id })
}
//hotel:1, res: 2, attract: 3, trans:4