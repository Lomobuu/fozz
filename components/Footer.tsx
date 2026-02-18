"use client";

import { FaGithub, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-black text-gray-900 dark:text-white py-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} Fozz
        </div>

        {/* Right: Social links */}
        <div className="flex space-x-4">
          <a
            href="https://github.com/Lomobuu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            <FaGithub className="h-5 w-5" />
          </a>
          <a
            href="https://linkedin.com/in/sfossen"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
          >
            <FaLinkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
