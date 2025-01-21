"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSession, deleteSession, getSession } from "./session";
import { axios, setBearerToken } from "./axios";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL

export async function createDocument(prevState, formData) {
  const session = await getSession()
  const token = session?.token
  const data = {
    title: formData.get('title'),
    tags: formData.getAll('tag').join(),
    content: "",
  }
  setBearerToken(token)
  const document = await axios.post('documents', JSON.stringify(data))
    .then(async (response) => {
      const data = await response.data
      return data.data
    })
    .catch((error) => {
      console.log("axios error document: ", error)
      return `Error: Failed to add document. ${error}`
    })
  console.log("created document: ", document)

  if (document.title) {
    redirect(`/dashboard/documents/${document.id}?new=true`)
  }

}

export async function uploadDocument(prevState, formData) {
  const session = await getSession()
  const token = session?.token

  const tags = formData.getAll('tag').join()
  formData.set('tag', tags)
  setBearerToken(token)
  const document = await axios.post('documents', formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
    .then(async (response) => {
      const data = await response.data
      return data.data
    })
    .catch((error) => {
      return `Error: Failed to add document. ${error}`
    })
  console.log("created document: ", document)
  redirect(`/dashboard/documents/${document.id}`)
}


export async function updateDocContent(id, outputData) {
  const session = await getSession()
  const token = session?.token
  try {
    const data = {
      content: outputData
    }
    const response = await fetch(`${BASE_URL}documents/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(response.statusText)
    }
    return true
  } catch (error) {
    return false
  }
}

export async function deleteDocument(id) {
  const session = await getSession()
  const token = session?.token
  const response = await fetch(`${BASE_URL}documents/${id}`, {
    method: 'DELETE',
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    }
  });

  if (!response.ok) {
    return "delete failed"
  }
  revalidatePath("/dashboard/documents");
}

export async function deleteDocumentById(prevState, formData) {
  const session = await getSession()
  const token = session?.token
  const id = formData.get('id')
  try {
    const response = await fetch(`${BASE_URL}documents/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(response.statusText)
    }
  } catch (error) {
    return "fatal error"
  }

  redirect('/dashboard/documents')
}

export async function authenticate(prevState, formData) {
  'use server'
  try {
    const { email, password } = Object.fromEntries(formData.entries());
    const response = await fetch(`${BASE_URL}login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      console.log("response ", response.statusText)
      if (response.status === 400) {
        const err = await response.json()
        return `${err.message}`
      }

      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    const { token } = data
    await createSession(token)
  } catch (error) {
    console.log(error);
    return `Bad request: ${error}`;
  }
  redirect('/dashboard')
}

export async function logout(prevState, formData) {
  const session = await getSession()
  const token = session?.token
  try {
    await fetch(`${BASE_URL}logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.log("error: ", error)
    return "failed. try again"
  }
  await deleteSession()
  redirect('/login')
}
export async function createCustomer(prevState, formData) {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const address = formData.get("address");
    const tags = formData.get("tags");
  } catch (error) {
    return {
      message: "some error occured creating the customer",
      error: error,
    };
  }

  // revalidatePath("/dashboard/customers")
  // redirect("/dashboard/customers")
}


export async function register(prevState, formData) {
  const session = await getSession()
  const token = session?.token

  try {
    //send login credentials to api
    const { email, password, name } = Object.fromEntries(formData.entries());
    const response = await fetch(`${BASE_URL}register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });


    if (!response.ok) {
      if (response.status >= 400) {
        const err = await response.json()
        console.log(err)
        return `${err.message}`
      }

      throw new Error(`Error: ${response.statusText}`);
    }
    const data = await response.json();
    const { token } = data
    await createSession(token)
  } catch (error) {
    console.log(error);
    return `Bad request: ${error}`;
  }
  redirect('/dashboard')
}
export async function init() {

  return true
}