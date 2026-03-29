import { Suspense } from 'react';
import { AuthForm } from './_components/AuthForm';
import { Header } from './_components/header';

export default async function Login(props: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const params = props.searchParams.then((sp) => sp);

  return (
    <div className="min-h-screen bg-white dark:bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md pt-10">
        {/* Header */}
        <Suspense fallback={<p>...Loading</p>}>
          <Header searchParams={params} />
        </Suspense>
        <AuthForm />
      </div>
    </div>
  );
}
