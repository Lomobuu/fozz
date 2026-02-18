import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'My Blog',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-black text-gray-900 dark:text-white min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 p-8">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
