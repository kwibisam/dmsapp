import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session) {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.log("Failed to verify session");
  }
}

export async function createSession(token) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  // const minutes = 10; // Set the cookie expiration time in minutes
  // const expiresAt = new Date(Date.now() + minutes * 60 * 1000);
  const session = await encrypt({ token, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.set("session", "", {
    httpOnly: true,
    secure: true,
    expires: new Date(0), // Expire immediately
    sameSite: "lax",
    path: "/", // Match the path used when setting the cookie
  });
}


export async function getSession() {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);
  return session;
}
