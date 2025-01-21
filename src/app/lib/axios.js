import Axios from 'axios'
const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL
const axios = Axios.create({
    baseURL: BASE_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'

    },
    withCredentials: true,
    withXSRFToken: true,
})

// Set the Bearer auth token.
const setBearerToken = token => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export { axios, setBearerToken }