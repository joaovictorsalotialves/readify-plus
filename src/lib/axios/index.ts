import axios from 'axios'

const urlApi = 'http://177.31.19.177:3333'

const api = axios.create({
  baseURL: urlApi,
})

export { api, urlApi }
