import React, { Suspense } from 'react';
import { NavHeader } from '../_components/navHeader';

const PostLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Suspense fallback={<p>...loading</p>}>
        <NavHeader />
      </Suspense>
      {children}
    </>
  );
};

export default PostLayout;
