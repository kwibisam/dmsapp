import { axios, setBearerToken } from "./axios";
import { getSession } from "./session";
import { formatCurrency } from "./utils";

const ITEMS_PER_PAGE = 6;

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function fetchAllDocuments(currentPage) {
  const session = await getSession();
  const token = session?.token;
  setBearerToken(token);
  const documents = axios
    .get("documents")
    .then(async (response) => {
      const result = await response.data;
      return result.data;
    })
    .catch((error) => {
      console.log("failed to fetch documents: ", error);
    });
  return documents;
}

export async function fetchDocumentsPages(query) {
  // Generate a random integer between 1 and 10
  // Generate a random integer between 1 and 10
  //  const randomValue = Math.floor(Math.random() * 10) + 1;
  return 1;
}

export async function fetchDocumentById(id) {
  const session = await getSession();
  const token = session?.token;
  setBearerToken(token);
  const document = await axios
    .get(`documents/${id}`)
    .then((response) => {
      const data = response.data.data;
      return data;
    })
    .catch((error) => {
      console.log(`fetch document with id ${id} failed`, error);
    });

  return document;
}

//fetch roles
export async function fetchRoles() {
  const session = await getSession();
  const token = session?.token;
  setBearerToken(token);
  const roles = await axios
    .get("roles")
    .then((resposne) => {
      // console.log("data.js::fetchRoles() ", resposne.data.data)
      return resposne.data.data;
    })
    .catch((error) => {
      console.log("data.js::fetchRoles() error: ", error);
    });

  return roles;
}

//fetch workspaces
export async function fetchWorkspaces() {
  const session = await getSession();
  const token = session?.token;
  setBearerToken(token);
  const workspaces = await axios
    .get("workspaces")
    .then((resposne) => {
      return resposne.data.data;
    })
    .catch((error) => {
      console.log("data.js::fetchWorkspaces() error: ", error);
    });

  return workspaces;
}

//fetch document types
export async function fetchDocumentTypes() {
  const session = await getSession();
  const token = session?.token;
  setBearerToken(token);
  const types = await axios
    .get("types")
    .then((resposne) => {
      return resposne.data.data;
    })
    .catch((error) => {
      console.log("data.js::fetchDocumentTypes() error: ", error);
    });

  return types;
}

//fetch tags
export async function fetchDocumentTags() {
  const session = await getSession();
  const token = session?.token;
  setBearerToken(token);
  const tags = await axios
    .get("tags")
    .then((resposne) => {
      return resposne.data.data;
    })
    .catch((error) => {
      console.log("data.js::fetchTags() error: ", error);
    });

  return tags;
}

//USER
export async function fetchUser() {
  const session = await getSession();
  const token = session?.token;
  setBearerToken(token);

  try {
    const user = await axios
      .get(`user`)
      .then((response) => {
        const res = response.data;
        return res.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return user;
  } catch (error) {
    console.log("data.js::fetchUser() ", error);
  }
}

export async function fetchUserWithId(id) {
  const session = await getSession();
  const token = session?.token;
  setBearerToken(token);
  const user = await axios
    .get(`users/${id}`)
    .then((response) => {
      const res = response.data;
      // console.log("fetchUser:: ", res.data)
      return res.data;
    })
    .catch((error) => {
      console.log("error getting user: ", error);
    });
  return user;
}

export async function fetchUsers() {
  const session = await getSession();
  const token = session?.token;
  setBearerToken(token);
  const users = await axios
    .get(`users`)
    .then((response) => {
      const res = response.data;
      return res.data;
    })
    .catch((error) => {
      console.log("error getting user: ", error);
    });
  return users;
}
