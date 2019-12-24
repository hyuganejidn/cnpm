const axios = require('axios')
const url = process.env.REACT_APP_BASE_URL 
console.log(url, '@url')
axios.defaults.baseURL = `${url}/api`
axios.defaults.headers.post['Content-Type'] = 'application/json'

//Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.authorization = `Bearer ${token}`
  }

  if (config.method === 'post' && config.url === '/users') {
    delete config.headers['authorization']
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export const config = {
  // access_token: process.env.ACCESS_TOKEN || 'XoyNsr73YhuTXtxCvu7n2RSLDEzAi9fY',
  url: url
}
