import Link from 'next/link';
import { useCart } from '../hooks/useCart';

interface ItemCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
}

export function ItemCard({ id, name, description, price }: ItemCardProps) {
  const { addItemToCart } = useCart();

  return (
    <article className="m-2 border p-4 rounded max-w-xs cursor-pointer">
      <Link href={`/products/${id}`}>
        <a>
          <h2 className="text-2xl">{name}</h2>
          <p>{description}</p>
          <p>${price / 100}</p>
        </a>
      </Link>
      <button
        type="button"
        className="border p-1 rounded mt-4"
        onClick={() => addItemToCart({ id: id, qty: 1 })}
      >
        Add to Cart
      </button>
    </article>
  );
}
