"use server";

import { axios, setBearerToken } from "../axios";
import { getSession } from "../session";

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
