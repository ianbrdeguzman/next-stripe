import { GetStaticPropsContext } from 'next';
import { ProductData } from '..';
import { useCart } from '../../hooks/useCart';
import getAllProducts from '../../lib/getAllProducts';

interface ProductPageProps extends ProductData {
  content: string;
}

export default function ProductPage({
  product: { id, name, description, price, content }
}: {
  product: ProductPageProps;
}) {
  const { addItemToCart } = useCart();

  return (
    <div className="text-left p-4 max-w-3xl">
      <h1 className="text-2xl font-bold flex justify-between mb-4">
        <span>{name}</span>
        <span>${price / 100}</span>
      </h1>
      <p>{description}</p>
      <p>{content}</p>
      <div className="text-right">
        <button
          type="button"
          className="border p-1 rounded mt-4"
          onClick={() => addItemToCart({ id: id, qty: 1 })}
        >
          Add to Cart
        </button>
      </div>
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

  const products = await getAllProducts();

  const product = products.find((p) => p.id === id);

  return {
    props: { product }
  };
}
