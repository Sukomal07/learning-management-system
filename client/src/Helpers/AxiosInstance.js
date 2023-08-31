import axios from 'axios'

const BASE_URL = "";

const axiosInstance = axios.create()

axiosInstance.defaults.withCredentials = true
axiosInstance.defaults.baseURL = BASE_URL

export default axiosInstance