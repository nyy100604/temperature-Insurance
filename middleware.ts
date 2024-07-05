import { auth } from "./auth";
import { NextResponse } from "next/server";

const routes = [
  "/",
  "/admin/policy-create",
  "/farmer/policy-manage",
  "/404",
  "/unauthorized",
];

const isRouteExists = (pathname: string) => {
  return routes.includes(pathname);
};

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

  // 如果路徑不存在，記錄錯誤並重定向到404頁面
  if (!isRouteExists(pathname)) {
    console.log(pathname);

    console.error(`Route not found: ${pathname}`);
    return NextResponse.redirect(notFoundUrl);
  }

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
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
