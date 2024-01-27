import axios, { AxiosRequestConfig } from 'axios'

// simple function of network call - Axios Instance

const AxiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 120000,
  headers: { 'Content-Type': 'application/json' }
})

async function makeNetworkCall (config: AxiosRequestConfig): Promise<any> {
  return await AxiosInstance.request(config)
}

export { makeNetworkCall }
