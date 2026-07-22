import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./context/AuthContext";
import { UrlProvider } from "./context/UrlContext";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";

// o Font Awesome injeta o próprio CSS por JS; desligamos porque já importamos
// a folha acima — sem isso os ícones aparecem gigantes antes de encolher
config.autoAddCss = false;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bonini Encurtador de URL",
  description:
    "Encurte links, acompanhe cliques e defina expiração. Projeto de portfólio de Otávio Bonini.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >

      <body className="min-h-screen flex flex-col"><AuthProvider><UrlProvider>{children}</UrlProvider></AuthProvider></body>
    </html>
  );
}
