import { GetStaticPropsContext } from 'next';
import { ProductData } from '..';
import getAllProducts from '../../lib/getAllProducts';

interface ProductPageProps extends ProductData {
  content: string;
}

export default function ProductPage({
  product: { name, description, price, content }
}: {
  product: ProductPageProps;
}) {
  return (
    <div className="text-left p-4 max-w-3xl">
      <h1 className="text-2xl font-bold flex justify-between mb-4">
        <span>{name}</span>
        <span>${price / 100}</span>
      </h1>
      <p>{description}</p>
      <p>{content}</p>
    </div>
  );
}

export async function getStaticPaths() {
  const products = await getAllProducts();

  const paths = products.map((p) => {
    return {
      params: {
        id: p.id
      }
    };
  });

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const id = context.params?.id;
  console.log(id);

  const products = await getAllProducts();

  const product = products.find((p) => p.id === id);

  return {
    props: { product }
  };
}
