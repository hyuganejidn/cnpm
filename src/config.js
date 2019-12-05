const axios = require('axios')
const url = process.env.REACT_APP_BASE_URL

axios.defaults.baseURL = `${url}/api`
axios.defaults.headers.post['Content-Type'] = 'application/json'

//Add a request interceptor
axios.interceptors.requset.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }
  if (config.method === 'post' && config.url === `/users`) {
    delete config.headers['authorization']
  }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use((response) => {
  return response;
}, error => {
  return Promise.reject(error)
})

export const config = {
  access_token: process.env.REACT_APP_ACCESS_TOKEN,
  url: url
}
