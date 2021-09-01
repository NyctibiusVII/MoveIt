import axios from 'axios'
import getConfig from 'next/config'

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

export const api = axios.create({
    //baseURL: 'http://localhost:5000/api',
    baseURL: publicRuntimeConfig.SITE_URL_BASE_API
})