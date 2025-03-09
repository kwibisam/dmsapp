"use server";

import { axios, setBearerToken } from "../axios";
import { getSession } from "../session";

export async function fetchDepartments() {
  const session = await getSession();
  const token = session?.token;
  setBearerToken(token);
  try {
    return axios
      .get("departments")
      .then((response) => {
        return response.data.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  } catch (error) {
    throw new Error(error);
  }
}
