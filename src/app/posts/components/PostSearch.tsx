'use client';

import { Input } from '@/app/_components/input';

export function PostsSearch({ defaultSearch }: { defaultSearch?: string }) {
  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const input = form.search as HTMLInputElement;

    if (!input.value.trim()) {
      input.removeAttribute('name');
    }
  };

  return (
    <form
      method="get"
      onSubmit={handleSubmit}
      className="flex gap-1 mb-4 items-end"
    >
      <Input
        placeholder="Search by title"
        name="search"
        defaultValue={defaultSearch}
      />

      <input type="hidden" name="page" value="1" />

      <button
        type="submit"
        className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-purple-600 hover:bg-purple-500 text-white font-medium"
      >
        Apply
      </button>
    </form>
  );
}
