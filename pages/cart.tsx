import { useCart } from '../hooks/useCart';

export default function Cart() {
  const { cart, addItemToCart, minusItemOnCart, removeItemFromCart } =
    useCart();
  return (
    <div className="w-full max-w-3xl">
      {cart.length > 0 ? (
        cart.map((item) => (
          <article
            className="flex justify-between items-center mt-4 border p-4"
            key={item.id}
          >
            <p className="flex-1 text-left">{item.id}</p>
            <p>{item.qty}</p>
            <div className="flex flex-col">
              <button
                onClick={() => addItemToCart({ id: item.id, qty: 1 })}
                className="border mb-1 ml-4 p-2"
              >
                +1
              </button>
              <button
                onClick={() => minusItemOnCart({ id: item.id, qty: 1 })}
                className="border mt-1 ml-4 p-2"
              >
                -1
              </button>
            </div>
            <button
              onClick={() => removeItemFromCart(item.id)}
              className="border ml-4 p-2"
            >
              remove
            </button>
          </article>
        ))
      ) : (
        <p className="mt-40">Cart is empty.</p>
      )}
    </div>
  );
}
