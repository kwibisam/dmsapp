"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSession, deleteSession, getSession } from "./session";
import { setBearerToken } from "./axios";


export async function addDocument(prevState, formData) {

  try {
    console.log("posting data");
  } catch (error) {
    // If a database error occurs, return a more specific error.
    return {
      message: "Error: Failed to add document.",
    };
  }

  // Revalidate the cache for the documents page and redirect the user.
  revalidatePath("/dashboard/documents");
  redirect("/dashboard/documents");
}

export async function createDocument(prevState, formData) {
  let document = null
  try {
    const data = {
      title: formData.get('title'),
      tags: formData.getAll('tag').join(),
      content: ""
    }

    const session = await getSession()
    const response = await fetch(`http://api.dms.zamnet.zm/api/documents`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const result = await response.json()
    document = result.data

  } catch (error) {
    return `Error: Failed to add document. ${error}`
  }

  redirect(`/dashboard/documents/${document.id}?new=true`)
}

export async function updateDocContent(id, outputData) {
  console.log("here is the data: ", outputData)
  const session = await getSession()
  const token = session?.token
  try {
    const data = {
      content: outputData
    }
    console.log("stringfied data: ", JSON.stringify(data))
    const response = await fetch(`http://api.dms.zamnet.zm/api/documents/${id}`, {
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

export async function UpdateDocument(id, prevState, formData) {
  try {
    console.log("update document");
  } catch (error) {
    return { message: "Database Error: Failed to Update document." };
  }

  revalidatePath("/dashboard/documents");
  redirect("/dashboard/documents");
}

export async function deleteDocument(id) {
  console.log("the id is: ", id)
  const session = await getSession()
  const token = session?.token
  const response = await fetch(`http://api.dms.zamnet.zm/api/documents/${id}`, {
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
  // redirect('/dashboard/documents')
}

export async function deleteDocumentById(prevState, formData) {
  const id = formData.get('id')
  try {
    const session = await getSession()
    const response = await fetch(`http://api.dms.zamnet.zm/api/documents/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${session.token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(response.statusText)
    }
  } catch (error) {
    console.log("error: ", error)
    return "fatal error"
  }

  redirect('/dashboard/documents')
}

export async function authenticate(prevState, formData) {
  'use server'
  try {
    //send login credentials to api
    const { email, password } = Object.fromEntries(formData.entries());
    const response = await fetch("http://api.dms.zamnet.zm/api/login", {
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
        console.log(err)
        return `${err.message}`
      }

      throw new Error(`Error: ${response.statusText}`);
    }


    const data = await response.json();
    const { token } = data
    setBearerToken(token)
    console.log("response data ", data)
    await createSession(token)
  } catch (error) {
    console.log(error);
    return `Bad request: ${error}`;
  }
  console.log("login was successful redirecting user to dashboard...")
  redirect('/dashboard')
}


export async function demo(formData) {
  console.log("hello server")
  console.log("form data", formData)
}

export async function logout(prevState, formData) {
  try {

    const session = await getSession()
    await fetch('http://api.dms.zamnet.zm/api/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${session.token}`,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.log("error: ", error)
    return "fatal error"
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
  'use server'
  try {
    //send login credentials to api
    const { email, password, name } = Object.fromEntries(formData.entries());
    const response = await fetch("http://api.dms.zamnet.zm/api/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, name }),
    });


    if (!response.ok) {
      console.log("response ", response.statusText)
      if (response.status >= 400) {
        const err = await response.json()
        console.log(err)
        return `${err.message}`
      }

      throw new Error(`Error: ${response.statusText}`);
    }


    const data = await response.json();
    const { token } = data
    setBearerToken(token)
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