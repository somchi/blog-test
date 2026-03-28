'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  const resetTheme = () => {
    document.documentElement.classList.add('dark');
    queueMicrotask(() => {
      setDarkMode(true);
    });
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      resetTheme();
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;

    if (darkMode) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }

    setDarkMode(!darkMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-2 border rounded-lg
  hover:bg-gray-100 dark:hover:bg-gray-800 transition"
    >
      {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
    </button>
  );
}
