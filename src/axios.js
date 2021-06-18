import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3000'
})

instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    config.headers["token"] = token
    return config
})

export default instance