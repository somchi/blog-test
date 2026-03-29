import Link from 'next/link';

type Props = {
  searchParams: Promise<{ [key: string]: string }>;
};

export const Header = async ({ searchParams }: Props) => {
  const { mode } = await searchParams;
  return (
    <div className="text-center mb-8">
      <Link
        href="#"
        className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity"
      >
        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">BT</span>
        </div>
        <span className="font-bold text-xl text-black dark:text-white">
          Blog Test
        </span>
      </Link>
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">
        {mode === 'login' ? 'Welcome Back' : 'Join Us'}
      </h1>
      <p className="text-slate-800 dark:text-slate-400">
        {mode === 'login'
          ? 'Sign in to your blog account learning'
          : 'Create your account to start learning'}
      </p>
    </div>
  );
};
