"use server";
import { getSession } from "../session";
import { axios, setBearerToken } from "../axios";
import { redirect } from "next/navigation";
export async function updateFileDocument(docId, prevState, formData) {
  console.log("docId: ", docId);
  const session = await getSession();
  const token = session?.token;
  setBearerToken(token);

  //   const { file } = Object.fromEntries(formData.entries());
  //   console.log("file object: ", formData.get("file"));
  //   const tags = formData.getAll("tag").join();
  //   formData.set("tag", tags);
  //   formData.set("isFile", true);
  // const { email, password } = Object.fromEntries(formData.entries());
  let document = null;
  try {
    document = await axios
      .post(`documents/${docId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(async (response) => {
        const data = await response.data;
        return data.data;
      })
      .catch((error) => {
        throw new Error(error.response.data.message);
      });
  } catch (error) {
    console.log("action.js::updateFileDocument() ", error);
    return `Failed to update ${error}`;
  }

  console.log("updated document: ", document);
  redirect(`/dashboard/documents/${document.id}`);
}

//recent documents
export async function fetchRecentDocuments(currentPage) {
  const session = await getSession();
  const token = session?.token;
  setBearerToken(token);
  const documents = axios
    .get("documents/recent")
    .then(async (response) => {
      const result = await response.data;
      return result.data;
    })
    .catch((error) => {
      console.log("failed to fetch documents: ", error);
      throw new Error(error);
    });
  return documents;
}
