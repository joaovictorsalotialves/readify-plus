import axios from 'axios'

const api = axios.create({
  baseURL: 'http://177.31.21.118:3333',
})

export { api }
