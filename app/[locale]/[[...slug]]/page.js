import { headers } from "next/headers";
import { fetchPageDetails } from "@/lib/api/details";
import ResponsiveRenderer from "./ResponsiveRenderer";
import { fetchLocaleSettings } from "@/lib/api/settings";
import { DEFAULT_NAME, MOBILE_BREAKPOINT } from "@/lib/config/locales";

export const generateMetadata = async ({ params }) => {
  const { locale, slug = [] } = await params;
  const { html } = await fetchPageDetails(locale, slug);

  return {
    title: html?.title || DEFAULT_NAME,
    description: html?.desc || DEFAULT_NAME,
    alternates: {
      canonical: html?.meta[locale] || `/${locale}/${slug?.join("/") || ""}`,
      languages: html?.meta ? html.meta : {},
    },
    openGraph: {
      title: html?.title || DEFAULT_NAME,
      description: html?.desc || DEFAULT_NAME,
      images: [html?.ogImage || "/images/og-default.png"],
    },
  };
};

const Page = async ({ params }) => {
  const awaitedParams = await params;
  const apiUrl = process.env.API_BASE;
  const { locale, slug = [] } = awaitedParams;

  const headerList = await headers();
  const viewportWidthHeader = headerList.get("Sec-CH-Viewport-Width");
  const userAgent = headerList.get("user-agent");
  let isMobile = false;

  if (viewportWidthHeader) {
    const viewportWidth = parseInt(viewportWidthHeader, 10);
    isMobile = viewportWidth <= MOBILE_BREAKPOINT;
  } else {
    isMobile = Boolean(userAgent?.match(/Android|iPhone|iPod|Opera Mini|IEMobile/i));
  }

  const settings = await fetchLocaleSettings(locale, isMobile);
  const pageData = await fetchPageDetails(locale, slug, isMobile);

  return <ResponsiveRenderer apiUrl={apiUrl} initialData={pageData} chkMbl={isMobile} locale={locale} settings={settings} slug={slug} />;
};

export default Page;
