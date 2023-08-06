import axios from 'axios'
const baseUrl = 'https://restcountries.com/v3.1/all'

const get = (params) => {
    const request = axios.get(`${baseUrl}?fields=${params}`)
    return request.then(response => response.data)
  }
    
  export default { get }