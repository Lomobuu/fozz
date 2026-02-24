import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Inter } from "next/font/google";

export const metadata = {
  title: "Fozz",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans bg-white dark:bg-black text-gray-900 dark:text-white min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 px-6 py-12">
          <div className="w-full max-w-4xl mx-auto">
            {children}
          </div>
        </main>

        <Footer />
      </body>
    </html>
  );
}
