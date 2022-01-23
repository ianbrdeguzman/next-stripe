import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="p-4 w-100 h-100% flex justify-center items-center text-center flex flex-col">
      <Link href="/">
        <a className="hover:text-blue-900 focus:text-blue-900 hover:underline text-3xl">
          Home
        </a>
      </Link>
      {children}
    </div>
  );
}
