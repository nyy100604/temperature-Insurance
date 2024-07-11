import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const user = req.auth?.user as {
    id: string;
    role: string;
    address: string;
  };
  const isLoggedIn = !!req.auth?.user;
  const { pathname } = req.nextUrl;
  // console.log(user);

  const homeurl = new URL("/", req.url);
  const policyCreateturl = new URL("/admin/policy-create", req.url);
  const policyManageurl = new URL("/farmer/policy-manage", req.url);
  const unauthorizedUrl = new URL("/unauthorized", req.url);
  const notFoundUrl = new URL("/404", req.url);

  if (
    !isLoggedIn &&
    (pathname.startsWith("/admin/policy-create") ||
      pathname.startsWith("/farmer/policy-manage"))
  ) {
    return NextResponse.redirect(homeurl);
  }
  if (isLoggedIn && pathname === "/") {
    // If the user is logged in and tries to access the login page, redirect to policyManagement or policies page
    if (user.role === "farmer") {
      return NextResponse.redirect(policyManageurl);
    }

    if (user.role === "admin") {
      return NextResponse.redirect(policyCreateturl);
    }
  }

  // Check role-specific access for restricted pages
  if (
    isLoggedIn &&
    pathname.startsWith("/admin/policy-create") &&
    user.role !== "admin"
  ) {
    return NextResponse.redirect(unauthorizedUrl);
  }

  if (
    isLoggedIn &&
    pathname.startsWith("/farmer/policy-manage") &&
    user.role !== "farmer"
  ) {
    return NextResponse.redirect(unauthorizedUrl);
  }

  return NextResponse.next();
});

export const config = {
  runtime: "experimental-edge", // 使用 experimental-edge runtime
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
  unstable_allowDynamic: [
    "/mongoDb/schema/userSchema.ts",
    "/mongoDb/schema/policySchema.ts",
    "/mongoDb/connect/index.ts",
    "/node_modules/mongoose/**",
    "/lib/action/dataAction.ts",
    "/auth.ts",
  ],
};
