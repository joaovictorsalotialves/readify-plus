import axios from 'axios'

const urlApi = 'http://192.168.0.104:3333'

const api = axios.create({
  baseURL: urlApi,
})

export { api, urlApi }
