import React from 'react';
import Navbar from './Navbar';

interface Props {
    children: React.ReactNode
}

function MainLayout({children}: Props) {
  return (
        <main>
            <Navbar />
            <div className="site-body">{children}</div>
        </main>
  );
}

export default MainLayout;