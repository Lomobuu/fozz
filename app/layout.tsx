import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'My Blog',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white dark:bg-black text-gray-900 dark:text-white min-h-screen">
        <Navbar />
        <main className="p-8">
          {children}
        </main>
      </body>
    </html>
  );
}
