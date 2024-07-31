import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import ProductsProvider from "@/providers/ProductsProvider";
import Navbar from "@/components/navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Cache",
  description: "Shopify project app using GraphQl, TypeScript and Redux",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ProductsProvider>
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </ProductsProvider>
    </html>
  );
}
