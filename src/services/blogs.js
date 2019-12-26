const axios = require('axios')

export const listBlogs = ({ page, amount = 100 }) => {
  return axios.get(`/blogs/all?page=${page}&amount=${amount}`)
}

