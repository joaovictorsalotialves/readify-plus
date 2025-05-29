import axios from 'axios'

const urlApi = 'http://177.31.21.204:3333'

const api = axios.create({
  baseURL: urlApi,
})

export { api, urlApi }
