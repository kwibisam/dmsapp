import { NextResponse } from "next/server";
import { getSession } from "@/app/lib/session";

export default async function middleware(req) {
  const path = req.nextUrl.pathname;
  const session = await getSession();
  const isProtectedRoute = path.startsWith("/dashboard");

  const publicRoutes = ["/sign-up", "/login", "/"];
  const isPublicRoute = publicRoutes.includes(path);

  const verifyUrl = (await req.nextUrl.searchParams).url;

  if (path === "/") {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  // Redirect to /login if accessing a protected route without a valid session
  if (isProtectedRoute && !session?.token) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (path === "/verify-email" && !session?.token) {
    const search = req.nextUrl.search;
    console.log("search: ", search);
    const callBackUrl = `/verify-email${search}`;
    console.log("call back url: ", callBackUrl);

    return NextResponse.redirect(
      new URL(`/login?callback=${callBackUrl}`, req.nextUrl)
    );
  }

  // Redirect to /dashboard if accessing a public route while logged in
  if (isPublicRoute && session?.token && !path.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  // Proceed to the requested route
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
