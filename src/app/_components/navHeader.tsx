'use client';

import Link from 'next/link';
import ThemeToggle from './themeToggle';
import { logUserOut } from '../_libs/utils';
import { useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { LOGIN } from '@/site-settings/navigations';
import { Mode } from '../_libs/enums';

export const NavHeader = () => {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isUserLoggedin = localStorage.getItem('isLoggedin');
      if (pathname !== LOGIN.href && !isUserLoggedin) {
        router.replace(`${LOGIN.href}?mode=${Mode.Login}`);
      }
    }
  }, [pathname, router]);

  const handleLogout = () => {
    logUserOut();
    router.push(`${LOGIN.href}?mode=${Mode.Login}`);
    window.location.reload();
  };

  const isLoggedin = useMemo(() => {
    if (typeof window !== 'undefined') {
      const isUserLoggedin = localStorage.getItem('isLoggedin');
      if (isUserLoggedin) {
        return true;
      }
      return false;
    }
    return false;
  }, []);

  return (
    <header className="dark:bg-gradient-to-bl from-slate-950 via-slate-900 to-slate-950 border-b border-slate-200/80 dark:border-slate-800/80 p-4 flex items-center justify-end gap-4">
      {isLoggedin && (
        <Link
          href="/posts"
          className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-purple-700 dark:hover:text-purple-300 transition-colors mr-auto"
        >
          Posts
        </Link>
      )}
      <div className="grid md:flex gap-2">
        {isLoggedin && <button onClick={handleLogout}>Logout</button>}
      </div>
    </header>
  );
};
