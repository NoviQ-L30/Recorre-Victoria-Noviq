import "./globals.css";
import type { Metadata } from "next";
import {
  Roboto,
  Katibeh,
  Inknut_Antiqua,
  Playfair_Display,
  Gentium_Book_Plus,
  Taviraj,
} from "next/font/google";

import { FixedPlugin, Layout } from "@/components";
import WhatsAppButton from "@/components/WhatsAppButton";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

const katibeh = Katibeh({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const inknut = Inknut_Antiqua({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-inknut",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-playfair",
});

const gentium = Gentium_Book_Plus({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-gentium",
});

const taviraj = Taviraj({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-taviraj",
});

export const metadata: Metadata = {
  title: "NextJS Tailwind Blog Post Details Page",
  description:
    "Download Tailwind Blog Page, a Free Template developed by Creative Tim.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inknut.variable} ${playfair.variable} ${gentium.variable} ${taviraj.variable}`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css"
          integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        <link rel="shortcut icon" href="/favicon.png" type="image/png" />
      </head>

      <body
        className={`${roboto.className} ${katibeh.className} ${inknut.className}`}
      >
        <Layout>
          {children}
          <FixedPlugin />
        </Layout>

        <WhatsAppButton />
      </body>
    </html>
  );
}