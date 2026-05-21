import { NextResponse } from "next/server";

import { auth } from "./lib/auth";

export async function proxy(request) {

  // GET SESSION
  const session = await auth.api.getSession({

    headers: request.headers,
  });

  // CURRENT PATH
  const pathname = request.nextUrl.pathname;

  // PRIVATE ROUTES
  const privateRoutes = [

    "/add-tutors",

    "/my-tutor",

    "/my-booked-sessions",
  ];

  // CHECK ROUTES
  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // TUTOR DETAILS PRIVATE
  const isTutorDetails =
    pathname.startsWith("/tutors/");

  // NOT LOGGED IN
  if (!session && (isPrivateRoute || isTutorDetails)) {

    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // CONTINUE
  return NextResponse.next();
}

export const config = {

  matcher: [

    "/add-tutors",

    "/my-tutor",

    "/my-booked-sessions",

    "/tutors/:path*",
  ],
};