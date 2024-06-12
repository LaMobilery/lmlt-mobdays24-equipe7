import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import { ContextsProvider } from "@/contexts/contexts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CV Wizard",
  description: "Please your Directeur des opérations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr-FR">
      <Head>
        <title>CV Wizard</title>
      </Head>
      <body className={inter.className}>
        <ContextsProvider>{children}</ContextsProvider>
      </body>
    </html>
  );
}
