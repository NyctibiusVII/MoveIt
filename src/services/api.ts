import axios from 'axios'
import getConfig from 'next/config'

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

export const api = axios.create({
    //baseURL: 'http://localhost:5000/api',
    baseURL: publicRuntimeConfig.SITE_URL_BASE_API,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': publicRuntimeConfig.SITE_URL_BASE_API,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    }
})
export const github_api = axios.create({
    baseURL: publicRuntimeConfig.SITE_URL_BASE_API_GITHUB
})