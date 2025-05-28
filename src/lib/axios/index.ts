import axios from 'axios'

const urlApi = 'http://192.168.200.101:3333'

const api = axios.create({
  baseURL: urlApi,
})

export { api, urlApi }
