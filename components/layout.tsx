import React from 'react';

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="mx-auto flex flex-col space-y-4 bg-custom-pink">
      <header className="container sticky top-0 z-40 bg-custom-blue">
        <div className="h-16 border-b border-b-slate-200 py-4 flex items-center justify-between">
          <div className="ml-4 pl-6 flex items-center">
            <a href="#" className="hover:text-slate-600 cursor-pointer">
              <img src="/logo.svg" alt="Logo" className="h-8 w-auto" />
            </a>
            <span className="ml-2 text-white text-lg">e-albania</span> {/* Added e-albania next to logo */}
          </div>
        </div>
      </header>
      <div>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
