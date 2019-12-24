const axios = require('axios')

export const listReports = (page, amount) => {
  return axios.get(`/reports?page=${page}&amount=${amount}`)
}

export const approveReport = (id, moderator_id) => {
  return axios.post(`/reports/service/${id}/approve`, {
    moderator_id
  })
}