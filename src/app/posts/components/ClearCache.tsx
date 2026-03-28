import { clearCache } from '@/app/_libs/actions';

export const ClearCache = () => {
  return (
    <form action={clearCache}>
      <button className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 text-white font-medium">
        Clear Cache
      </button>
    </form>
  );
};
