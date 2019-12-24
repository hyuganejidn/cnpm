const axios = require('axios')

export const listBlogs = ({ page, amount }) => {
  return axios.get(`/blogs/all?page=${page}&amount=${amount}`)
}

