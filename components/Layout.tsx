import Link from 'next/link';
import { useCart } from '../hooks/useCart';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { cart } = useCart();

  return (
    <div className="md:mt-40 p-4 w-100 h-100% flex justify-center items-center text-center flex flex-col">
      <div className="flex justify-between w-full max-w-xl">
        <Link href="/">
          <a className="hover:text-blue-900 focus:text-blue-900 hover:underline text-3xl">
            Home
          </a>
        </Link>
        <Link href="/cart">
          <a className="hover:text-blue-900 focus:text-blue-900 hover:underline text-3xl">
            Cart ({cart.reduce((prev, curr): number => prev + curr.qty, 0)})
          </a>
        </Link>
      </div>
      {children}
    </div>
  );
}
