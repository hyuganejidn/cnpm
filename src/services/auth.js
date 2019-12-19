const axios = require('axios')

export const auth = (username, password) => {
  return axios.post('/users/login', { username, password })
}

export const grantUser = ({ username, role }) => {
  return axios.put('/users/assign', { username, role })
}

export const listUsers = (amount, page) => {
  return axios.get(`/users/all?amount=${amount}&page=${page}`)
}
export const listUsersRole = (amount, page, role) => {
  return axios.get(`/users/role?amount=${amount}&page=${page}`, { role })
}
// export const grantUser = ({ username, role }) => {
//   return axios.put('/users/assign', { username, role })
// }


// getRequest 