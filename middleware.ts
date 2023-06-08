import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { BASE_URL } from "./constants";

export default async function middleware(request: NextRequest) {
  //const hostname = request?.headers?.get("host") as string;

  // This is for multitenancy
  // if (hostname?.split(".")?.length > 1) {
  //   const subdomain = hostname?.split(".") as string[];
  //   //TODO: Check if user exist, if not, redirect to homepage
  //   // TODO: As prisma does not work on server, it should be an api request and get user from there

  //   const userExists = await fetch(`${request.url}/api/users/${subdomain[0]}`)
  //     .then((res) => {
  //       return res.status === 200
  //         ? res.json()
  //         : new Error(
  //             JSON.stringify({
  //               status: res.status,
  //               body: res.text(),
  //             })
  //           );
  //     })
  //     .then((data) => data)
  //     .catch(() => NextResponse.redirect(BASE_URL));

  //   if (userExists && Object.keys(userExists).length > 0) {
  //     const finalUrl = `${request.url}p/${subdomain[0]}`;
  //     return NextResponse.rewrite(finalUrl);
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api/ routes
     * 2. /_next/ (Next.js internals)
     * 3. /_proxy/, /_auth/ (special pages for OG tags proxying and password protection)
     * 4. /_static (inside /public)
     * 5. /_vercel (Vercel internals)
     * 6. /favicon.ico, /sitemap.xml (static files)
     */
    "/((?!api/|_next/|_proxy/|_auth/|_static|_vercel|favicon.ico|sitemap.xml).*)",
  ],
};
