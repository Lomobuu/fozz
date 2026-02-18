import mitt from 'mitt';

export type Theme = 'light' | 'dark' | 'system';

export const themeEmitter = mitt<{ theme: Theme }>();

export function applyTheme(theme: Theme) {
  themeEmitter.emit('theme', theme);

  if (theme === 'system') {
    localStorage.removeItem('theme');
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } else {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}

// Optional: init theme on page load
export function initTheme() {
  const saved = localStorage.getItem('theme') as Theme | null;
  applyTheme(saved || 'system');
}
