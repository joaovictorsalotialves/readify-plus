import axios from 'axios'

const api = axios.create({
  baseURL: 'http://177.31.18.77:3333',
})

export { api }
