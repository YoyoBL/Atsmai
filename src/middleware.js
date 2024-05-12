import { NextResponse } from "next/server";

import { i18n } from "@/i18n.config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { getToken } from "next-auth/jwt";

function getLocale(request) {
   const negotiatorHeaders = {};
   request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

   const locales = i18n.locales;
   const languages = new Negotiator({ headers: negotiatorHeaders }).languages();

   const locale = matchLocale(languages, locales, i18n.defaultLocale);
   return locale;
}

export async function middleware(request) {
   const session = await getToken({ req: request });
   const pathname = request.nextUrl.pathname;

   const pathnameIsMissingLocale = i18n.locales.every(
      (locale) =>
         !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
   );

   // Redirect if there is no locale
   if (pathnameIsMissingLocale) {
      if (session?.lang) {
         const lang = session.lang;
         return NextResponse.redirect(
            new URL(
               `/${lang}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
               request.url
            )
         );
      }
      const locale = getLocale(request);
      return NextResponse.redirect(
         new URL(
            `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
            request.url
         )
      );
   }
}

export const config = {
   // Matcher ignoring `/_next/` and `/api/`
   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
