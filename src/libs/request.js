import axios from 'axios'
const MOVIEDB_BASE_URL = process.env.REACT_APP_MOVIEDB_BASE_URL

const instance = axios.create({
  baseURL: MOVIEDB_BASE_URL
})

const request = (options) => {
  return new Promise((resolve, reject) => {
    instance(options)
      .then(res => {
        return resolve(res.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export default request
