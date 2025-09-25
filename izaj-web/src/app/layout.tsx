import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider, UserProvider, CartIconProvider, FavoritesProvider } from "../context";
import { Header } from "../components/layout";
import Footer from "../components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IZAJ",
  description: "Your one-stop shop for quality products at great prices",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}
      >
        <UserProvider>
          <CartProvider>
            <CartIconProvider>
              <FavoritesProvider>
                <Header />
                {children}
                <Footer />
              </FavoritesProvider>
            </CartIconProvider>
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
