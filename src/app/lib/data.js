import { axios, setBearerToken } from "./axios";
import { getSession } from "./session";
import { formatCurrency } from "./utils";

const ITEMS_PER_PAGE = 6;

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL

export async function fetchAllDocuments(currentPage) {
  const session = await getSession()
  const token = session?.token
  setBearerToken(token)
  const documents = axios.get('documents')
    .then(async (response) => {
      const result = await response.data
      return result.data
    })
    .catch((error) => {
      console.log("failed to fetch documents: ", error)
    })
  return documents
}

export async function fetchDocumentsPages(query) {
  // Generate a random integer between 1 and 10
  // Generate a random integer between 1 and 10
  //  const randomValue = Math.floor(Math.random() * 10) + 1;
  return 1;
}

export async function fetchDocumentById(id) {
  console.log("fetch by id(): id: ", id)
  const session = await getSession()
  const token = session?.token
  setBearerToken(token)
  const document = await axios.get(`documents/${id}`)
    .then((response) => {
      const data = response.data.data
      return data
    })
    .catch((error) => {
      console.log(`fetch document with id ${id} failed`, error)
    })

  return document
}


