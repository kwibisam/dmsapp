import { getSession } from "./session";
import { formatCurrency } from "./utils";


const ITEMS_PER_PAGE = 6;

export async function fetchAllDocuments(currentPage) {
  //lljkjl
  try {
    const session = await getSession()
    const token = session?.token
    const response = await fetch("http://127.0.0.1:8000/api/documents", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
    if (!response.ok) {
      throw new Error(response.statusText)
    }

    const result = await response.json()
    return result.data
  } catch (error) {
    console.error('Fetch error:', error);
    // throw new Error('Failed to fetch documents.');
  }
}

export async function fetchDocumentsPages(query) {
  // Generate a random integer between 1 and 10
  // Generate a random integer between 1 and 10
  //  const randomValue = Math.floor(Math.random() * 10) + 1;
  return 1;
  return 1;
}

export async function fetchDocumentById(id) {
  try {
    const session = await getSession()
    const response = await fetch(`http://127.0.0.1:8000/api/documents/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${session.token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const data = await response.json();
    console.log("fetchById: ", data)
    return data.data
  } catch (error) {
    console.log("error: ", error)
    return false
  }

}


