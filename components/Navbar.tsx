"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Theme, applyTheme, themeEmitter } from '../app/lib/theme';
import { SunIcon, MoonIcon, ComputerDesktopIcon, ArrowTopRightOnSquareIcon, ChevronDownIcon } from '@heroicons/react/24/solid';

export default function Navbar() {
  const [theme, setTheme] = useState<Theme>('system');
  const [open, setOpen] = useState(false); // dropdown open state

  useEffect(() => {
    themeEmitter.on('theme', setTheme);
    const saved = localStorage.getItem('theme') as Theme | null;
    setTheme(saved || 'system');

    return () => themeEmitter.off('theme', setTheme);
  }, []);

  function selectTheme(t: Theme) {
    applyTheme(t);
    setOpen(false); // close dropdown after selecting
  }

  return (
    <nav className="bg-white dark:bg-black text-gray-900 dark:text-white p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex-shrink-0 font-bold text-xl">Fozz</div>

        {/* Center: Navigation */}
        <div className="flex flex-1 justify-center space-x-6">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>

          <a
            href="https://lomobuu.github.io/Resume/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            About
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          </a>

          <a
            href="https://www.fozzen.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            Fozzen
            <ArrowTopRightOnSquareIcon className="h-4 w-4" />
          </a>
        </div>

        {/* Right: Theme dropdown */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center p-2 rounded text-gray-800 dark:text-gray-200 bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors gap-1"
          >
            {theme === 'light' && <MoonIcon className="h-5 w-5" />}
            {theme === 'dark' && <ComputerDesktopIcon className="h-5 w-5" />}
            {theme === 'system' && <SunIcon className="h-5 w-5" />}
            <ChevronDownIcon className="h-4 w-4" />
          </button>

          {/* Dropdown menu */}
          {open && (
            <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded shadow-lg z-50">
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
                onClick={() => selectTheme('light')}
              >
                <SunIcon className="h-4 w-4" /> Light
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
                onClick={() => selectTheme('dark')}
              >
                <MoonIcon className="h-4 w-4" /> Dark
              </button>
              <button
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2"
                onClick={() => selectTheme('system')}
              >
                <ComputerDesktopIcon className="h-4 w-4" /> System
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
