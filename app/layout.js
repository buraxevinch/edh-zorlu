import { cookies } from "next/headers";
import { Poppins } from "next/font/google";
import { ModalProvider } from "./providers/ModalContext";
import { DEFAULT_LOCALE, DEFAULT_NAME } from "@/lib/config/locales";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", weight: ["400", "500", "700"], fallback: ["system-ui", "Arial"] });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: { default: DEFAULT_NAME, template: "%s | " + DEFAULT_NAME },
  description: DEFAULT_NAME + " Dr. Cagdas Kislaoglu web site.",
  icons: {
    icon: [
      { url: "/images/favicon/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/images/favicon/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    other: [{ rel: "manifest", url: "/images/favicon/site.webmanifest" }],
  },
  openGraph: {
    type: "website",
    siteName: DEFAULT_NAME,
    images: ["/images/og-default.png"],
  },
};

const RootLayout = async ({ children }) => {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value ?? DEFAULT_LOCALE;

  return (
    <html lang={locale} className={`${poppins.variable} antialiased`} suppressHydrationWarning>
      <body>
        <ModalProvider>{children}</ModalProvider>
      </body>
    </html>
  );
};

export default RootLayout;
