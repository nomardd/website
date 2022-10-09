import * as React from 'react';
import Header from './Header';

export default function Layout({
  children,
  className,
}: {
  children: React.ReactNode;
}) {
  // Put Header or Footer Here
  return (
    <div className={className}>
      <Header />
      {children}
    </div>
  );
}
