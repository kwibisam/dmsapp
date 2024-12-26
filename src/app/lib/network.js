import { getSession } from "./session"
const baseURL = "http://localhost:8000/api"
const session =  await getSession()
export async function client(method, path) {
    return fetch(`${baseURL}/${path}`, {
       method: method,
       headers: {
        'Authorization': `Bearer ${session.token}`,
        'Content-Type': 'application/json'
      } 
    })
}