const axios = require('axios')
const formData = new FormData()

export const listImages = () => {
  return axios.get('/images/services/1')
}
// export const listImages = () => {
//   return axios.get('/images/src/1')
// }

export const createImages = (photos) => {
  // console.log('photos-service', photos)
  photos.forEach(photo => {
    formData.append('photos', photo)
  });
  // console.log('formData-', formData.getAll('photos'))
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  }
  return axios.post('/images/services/1', formData, config)
}

// export const deleteImage = (id) => {
//   return axios.delete(`/images/services/${id}`)
// }
// export const fetchImages = (id) => {
//   return axios.get(`/images/services/${id}`)
// }