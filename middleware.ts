import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

//! First method:
//? withAuth:
// Middleware that checks if the user is authenticated/authorized. If if they aren't, they will be redirected to the login page. Otherwise, continue.

export default withAuth(
  async function middleware(request: NextRequest) {
    //? Bring the route that user enter in URL.
    const pathname = request.nextUrl.pathname;

    //? To know that a user is already login or NOT. (By geting next-auth.session-token).
    //* isAuth is the token in callbacks jwt.
    const isAuth = await getToken({ req: request });
    const protectedRoutes = ["/dashboard", `/profile/${isAuth?.sub}`];
    const authRoutes = ["/auth/sign-in", "/auth/login"];
    const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

    //? Check if pathname (user route) is in protectedRoutes.
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(route)
    );
    if (!isAuth && isProtectedRoute) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }

    if (isAuth && isAuthRoute) {
      const currentRoute: string = "/dashboard";
      return NextResponse.redirect(new URL(currentRoute, request.url));
    }
  },

  //? In case the middleware unchecked.
  {
    callbacks: {
      async authorized() {
        return true;
      },
    },
  }
);

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*", "/profile/:path*"],
};
