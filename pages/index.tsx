import Head from 'next/head';
import Link from 'next/link';
import { ItemCard } from '../components/ItemCard';
import getAllProducts from '../lib/getAllProducts';

export interface ProductData {
  id: string;
  name: string;
  description: string;
  price: number;
}

export default function Home({ products }: { products: ProductData[] }) {
  return (
    <div>
      <Head>
        <title>Next | Stripe</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="grid md:grid-cols-2">
        {products.map((p) => (
          <ItemCard key={p.id} {...p} />
        ))}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const products = await getAllProducts();

  return {
    props: {
      products
    }
  };
}
