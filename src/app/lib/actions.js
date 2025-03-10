"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSession, deleteSession, getSession } from "./session";
import { axios, setBearerToken } from "./axios";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_URL;

export async function createDocument(prevState, formData) {
  const session = await getSession();
  const token = session?.token;
  if (!formData.get("title") || !formData.get("type")) {
    return { success: false, message: "Title and type are required fields." };
  }

  const formObject = Object.fromEntries(formData.entries());
  const content = JSON.stringify(formObject);

  // Prepare the data object
  const data = {
    title: formData.get("title"),
    tags: formData.getAll("tag").join(","),
    type_id: formData.get("type"),
    workspace_id: formData.get("workspace_id"),
    content: "",
    isEditable: true,
  };

  console.log("action.js::createDocument() ", data);
  setBearerToken(token);
  let document = null;
  try {
    await axios
      .post("documents", data)
      .then((response) => {
        document = response.data.data;
        // console.log("then: ", document);
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    console.error("action.js::createDocument error: ", error);
    return `Failed to add document: ${error.message || "Unknown error"}`;
  }
  redirect(`/dashboard/documents/${document.id}?new=true`);
}

export async function uploadDocument(prevState, formData) {
  const session = await getSession();
  const token = session?.token;

  const tags = formData.getAll("tag").join();
  formData.set("tag", tags);
  formData.set("isFile", true);
  // const { email, password } = Object.fromEntries(formData.entries());
  console.log(
    "actions.js::uploadDocument: ",
    Object.fromEntries(formData.entries())
  );

  setBearerToken(token);
  let document = null;
  try {
    document = await axios
      .post("documents", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (response) => {
        const data = await response.data;
        return data.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    console.log("action.js::uploadDocument() ", error);
    return `Error: Failed to add document. ${error}`;
  }
  console.log("created document: ", document);
  redirect(`/dashboard/documents/${document.id}`);
}

export async function updateDocContent(id, outputData) {
  const session = await getSession();
  const token = session?.token;
  try {
    const data = {
      content: outputData,
    };
    const response = await fetch(`${BASE_URL}documents/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return true;
  } catch (error) {
    console.log("action.js::updateDocContent ", error);
    return false;
  }
}

export async function deleteDocument(id) {
  const session = await getSession();
  const token = session?.token;
  const response = await fetch(`${BASE_URL}documents/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return "delete failed";
  }
  revalidatePath("/dashboard/documents");
}

export async function deleteRole(id) {
  const session = await getSession();
  const token = session?.token;
  const response = await fetch(`${BASE_URL}roles/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return "failed to delete role";
  }
  revalidatePath("/dashboard/roles");
}

export async function deleteTag(id) {
  const session = await getSession();
  const token = session?.token;
  const response = await fetch(`${BASE_URL}tags/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return "failed to delete tag";
  }
  revalidatePath("/dashboard/tags");
}

export async function deleteWorkspace(id) {
  const session = await getSession();
  const token = session?.token;
  const response = await fetch(`${BASE_URL}workspaces/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return "failed to delete workspace";
  }
  revalidatePath("/dashboard/workspaces");
}

export async function deleteDepartment(id) {
  const session = await getSession();
  const token = session?.token;
  const response = await fetch(`${BASE_URL}departments/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return "failed to delete department";
  }
  revalidatePath("/dashboard/departments");
}

export async function deleteDocumentType(id) {
  const session = await getSession();
  const token = session?.token;
  const response = await fetch(`${BASE_URL}types/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return "failed to delete document type";
  }
  revalidatePath("/dashboard/document-types");
}

export async function deleteDocumentById(prevState, formData) {
  const session = await getSession();
  const token = session?.token;
  const id = formData.get("id");
  try {
    const response = await fetch(`${BASE_URL}documents/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }
  } catch (error) {
    return "fatal error";
  }

  redirect("/dashboard/documents");
}

export async function authenticate(prevState, formData) {
  "use server";
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
      if (response.status === 400) {
        const err = await response.json();
        console.log("login error: ", err);
        return `${err.message}`;
      }

      throw new Error("username or password wrong");
    }

    const res = await response.json();
    const { token } = res.data;
    console.log("actions.js::authenticate() ", token);
    await createSession(token);
  } catch (error) {
    console.log(error);
    return `Bad request: ${error}`;
  }
  redirect("/dashboard");
}

export async function logout(prevState, formData) {
  const session = await getSession();
  const token = session?.token;
  try {
    await fetch(`${BASE_URL}logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log("error: ", error);
    return "failed. try again";
  }
  await deleteSession();
  redirect("/login");
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

export async function init() {
  return true;
}

//Create User Role
export async function createRole(prevState, formData) {
  const session = await getSession();
  const token = session?.token;
  setBearerToken(token);
  const roleName = formData.get("roleName");
  const data = {
    name: roleName,
  };

  const res = axios
    .post("roles", JSON.stringify(data))
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.log("error creating role: ", error);
      return "error creating role";
    });
  console.log("role created: ", res);
  redirect("/dashboard/roles");
}

//Create User Role
export async function createWorkspace(prevState, formData) {
  const session = await getSession();
  const token = session?.token;
  setBearerToken(token);
  const workspaceName = formData.get("workspaceName");
  const data = {
    name: workspaceName,
  };

  const res = axios
    .post("workspaces", JSON.stringify(data))
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      console.log("error creating workspace: ", error);
      return "error creating workspace";
    });
  redirect("/dashboard/workspaces");
}

//USERS

//create user
export async function createUser(prevState, formData) {
  const session = await getSession();
  const token = session?.token;

  try {
    const { email, password, name, department_id } = Object.fromEntries(
      formData.entries()
    );
    const response = await fetch(`${BASE_URL}register`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ email, password, name, department_id }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    console.log("response: ", await response.json());
  } catch (error) {
    console.log(error);
    return `Bad request: ${error}`;
  }
  redirect("/dashboard/users?create=success");
}

export async function removeRoleFromUser(prevState, formData) {
  const { userId, roleId } = Object.fromEntries(formData.entries());
  console.log("user and role id: ", roleId);
}
export async function addRoleToUser(prevState, formData) {
  "use server";
  const session = await getSession();
  const token = session?.token;
  const { userId, roleId } = Object.fromEntries(formData.entries());
  try {
    console.log("data values: ", userId, roleId);

    const response = await fetch(`${BASE_URL}users/${userId}/roles/${roleId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const res = await response.json();
    // console.log(res);
  } catch (error) {
    console.log(error);
    return `Bad request: ${error}`;
  }
  redirect(`/dashboard/users/${userId}?success=1`);
}
