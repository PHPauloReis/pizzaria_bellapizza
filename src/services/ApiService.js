import axios from 'axios'

const api = axios.create({
    baseURL: 'https://pizzaria.roxo.dev.br/',
})

export default api