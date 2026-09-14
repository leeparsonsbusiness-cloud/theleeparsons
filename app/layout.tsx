import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://theleeparsons.com"),
  title: "Shop",
  description: "Official Storefront for The Lee Parsons.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
  },
  openGraph: {
    title: "Shop",
    description: "Official Storefront for The Lee Parsons.",
    url: "https://theleeparsons.com",
    siteName: "The Lee Parsons",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "The Lee Parsons",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shop",
    description: "Official Storefront for The Lee Parsons.",
    images: ["/og-image.png"],
  },
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased bg-[#090a0d]`}
    >
      <body className="min-h-full flex flex-col bg-[#090a0d] text-white">
        <CartDrawer />
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
