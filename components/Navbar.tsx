import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">My Blog</Link>
        <div className="space-x-4">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
        </div>
      </div>
    </nav>
  );
}