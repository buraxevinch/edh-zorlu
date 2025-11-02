import Script from "next/script";
import { fetchLocaleSettings } from "@/lib/api/settings";
import { SUPPORTED_LOCALES } from "@/lib/config/locales";

export const generateMetadata = async ({ params }) => {
  const { locale } = await params;
  const { tags } = await fetchLocaleSettings(locale);

  return {
    verification: tags ?? {},
    alternates: {
      canonical: `/${locale}`,
      languages: SUPPORTED_LOCALES.reduce((acc, lang) => {
        acc[lang] = `/${lang}`;
        return acc;
      }, {}),
    },
  };
};

const LocaleLayout = async ({ children, params }) => {
  const { locale, slug = [] } = await params;
  const { scrpt } = await fetchLocaleSettings(locale);

  return (
    <>
      <div id="root">{children}</div>
      {scrpt &&
        scrpt.length > 0 &&
        scrpt.map((script, key) =>
          script.pos === "noscript" ? (
            <noscript key={key} dangerouslySetInnerHTML={{ __html: script.scr }} />
          ) : script.scr.slice(0, 4) === "http" ? (
            <Script key={key} id={`gtm-script${key}`} strategy={script.pos} src={script.scr} />
          ) : (
            <Script key={key} id={`gtm-script${key}`} strategy={script.pos} dangerouslySetInnerHTML={{ __html: script.scr.replace(/’/g, "'") }} />
          )
        )}
    </>
  );
};

export default LocaleLayout;
