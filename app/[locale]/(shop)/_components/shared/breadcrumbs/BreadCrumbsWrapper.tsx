import { ReactNode } from 'react';

import BreadCrumbs from './BreadCrumbs';

interface IBreadCrumbsWrapperProps {
  breadcrumbLinks: string[];
  breadcrumbTitles: string[];
  children: ReactNode;
}

export default function BreadCrumbsWrapper({
  breadcrumbLinks,
  breadcrumbTitles,
  children,
}: IBreadCrumbsWrapperProps) {
  return (
    <>
      <section className='my-4'>
        <BreadCrumbs
          breadcrumbLinks={breadcrumbLinks}
          breadcrumbTitles={breadcrumbTitles}
        />
      </section>

      {children}
    </>
  );
}
