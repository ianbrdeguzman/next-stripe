import { useCart } from '../hooks/useCart';

export default function Cart() {
  const { cart } = useCart();
  return (
    <div className="w-full">
      {cart.map((item) => (
        <article
          className="flex justify-between items-center mt-4 border p-4"
          key={item.id}
        >
          <p className="flex-1 text-left">{item.id}</p>
          <p>{item.qty}</p>
          <button className="border ml-4 p-2">+1</button>
          <button className="border ml-4 p-2">-1</button>
          <button className="border ml-4 p-2">remove</button>
        </article>
      ))}
    </div>
  );
}
