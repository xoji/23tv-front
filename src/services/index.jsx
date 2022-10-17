import axios from "axios"
const api = 'https://aapi.23tv.uz'
// const api = 'http://localhost:4000'
const Axios = axios.create({
    baseURL: api,
})
axios.defaults.headers.common['Language'] = localStorage.getItem("lang")
axios.defaults.headers.common['Authorization'] = localStorage.getItem('Authorization')

export { Axios, api }
