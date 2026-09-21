import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Noto_Sans_JP } from "next/font/google";
import { site } from "../data/site";
import "./globals.css";

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto",
  preload: false,
});
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: site.title,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "ja_JP",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Naoki Yoshida — 仕事の悩みを、もっとシンプルに。",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/opengraph-image"],
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f9fc",
  colorScheme: "light",
};
export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ja" className={notoSans.variable}>
      <body>{children}</body>
    </html>
  );
}
