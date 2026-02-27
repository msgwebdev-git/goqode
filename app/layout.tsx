import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://goqode.agency"),
  title: {
    default: "GoQode — Web Development & Digital Solutions",
    template: "%s | GoQode",
  },
  description:
    "GoQode — web development, mobile apps, e-commerce, digital marketing and automation solutions for businesses in Moldova, Romania and Europe.",
  keywords: [
    "web development",
    "digital solutions",
    "mobile app development",
    "e-commerce",
    "digital marketing",
    "GoQode",
    "Moldova",
    "Romania",
  ],
  authors: [{ name: "GoQode", url: "https://goqode.agency" }],
  creator: "GoQode",
  publisher: "GoQode",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    alternateLocale: ["en_US", "ru_RU"],
    siteName: "GoQode",
    url: "https://goqode.agency",
  },
  twitter: {
    card: "summary_large_image",
    site: "@goqode",
    creator: "@goqode",
  },
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  manifest: "/manifest.webmanifest",
  verification: {
    // TODO: Add real tokens after registering in each console
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const locale = headerList.get("x-next-intl-locale") || "ro";

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${manrope.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
