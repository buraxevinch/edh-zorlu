import { NextResponse } from "next/server";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "@/lib/config/locales";

const PUBLIC_PATHS = ["/_next", "/api", "/images", "/favicon.ico", "/robots.txt", "/sitemap.xml"];
const STATIC_FILE_REGEX = /\.(png|jpg|jpeg|gif|svg|ico|css|js|woff2?)$/i;

export const middleware = (req) => {
  const { pathname } = req.nextUrl;

  // Public & static dosyaları bypass et
  if (PUBLIC_PATHS.some((p) => pathname.startsWith(p)) || STATIC_FILE_REGEX.test(pathname)) return NextResponse.next();

  // Pathname'den mevcut locale’i bul
  const currentLocale = pathname.split("/")[1];
  const hasLocale = SUPPORTED_LOCALES.includes(currentLocale);

  // Cookie & accept-language fallback
  const localeFromCookie = req.cookies.get("locale")?.value;
  const acceptLang = req.headers.get("accept-language") || "";
  const detectedLang = acceptLang.split(",")[0].split("-")[0];
  const fallbackLocale = SUPPORTED_LOCALES.includes(detectedLang) ? detectedLang : DEFAULT_LOCALE;

  // Eğer path’te locale yoksa → redirect et
  if (!hasLocale) {
    const locale = localeFromCookie || fallbackLocale;
    const url = new URL(`/${locale}${pathname}`, req.url);
    const res = NextResponse.redirect(url);
    res.cookies.set("locale", locale);
    return res;
  }

  // Path’te locale varsa → cookie’yi güncelle
  const res = NextResponse.next();
  res.cookies.set("locale", currentLocale);

  return res;
};
