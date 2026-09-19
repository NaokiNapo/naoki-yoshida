import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Naoki Yoshida | Official Website",
  description: "Naoki Yoshida's official website. Coming soon.",
  applicationName: "Naoki Yoshida",
  openGraph: {
    title: "Naoki Yoshida | Official Website",
    description: "Coming soon.",
    siteName: "Naoki Yoshida",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: "Naoki Yoshida | Official Website",
    description: "Coming soon.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080808",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
