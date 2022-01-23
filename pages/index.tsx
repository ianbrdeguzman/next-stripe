import Head from 'next/head';
import matter from 'gray-matter';
import fs from 'fs';
const fsPromises = fs.promises;

interface HomeProps {
  id: string;
  name: string;
  description: string;
  price: number;
}

export default function Home({ products }: { products: HomeProps[] }) {
  return (
    <div>
      <Head>
        <title>Next | Stripe</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1 className="text-3xl">Home Page</h1>
        {products.map((p) => (
          <article
            key={p.id}
            className="my-2 border p-4 rounded max-w-xs cursor-pointer"
          >
            <h2 className="text-2xl">{p.name}</h2>
            <p>{p.description}</p>
            <p>${p.price / 100}</p>
          </article>
        ))}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const directory = `${process.cwd()}/content/`;
  const filenames = await fsPromises.readdir(directory);

  const products = filenames.map((filename) => {
    const fileContent = fs.readFileSync(`${directory}/${filename}`, 'utf-8');

    const { data } = matter(fileContent);

    const id = filename.replace('.md', '');

    return {
      ...data,
      id
    };
  });

  return {
    props: {
      products
    }
  };
}
