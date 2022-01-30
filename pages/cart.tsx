import { useCart } from '../hooks/useCart';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Cart() {
  const router = useRouter();
  const { success, canceled } = router.query;
  const {
    cart,
    addItemToCart,
    minusItemOnCart,
    removeItemFromCart,
    clearCart
  } = useCart();

  const handleStripeCheckout = async () => {
    const res = await fetch('/api/stripe-checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: cart
      })
    });

    const { url } = await res.json();

    window.location = url;
  };

  useEffect(() => {
    if (success === 'true') {
      clearCart();
    }
  }, [success, clearCart]);

  return (
    <div className="w-full max-w-3xl">
      {cart.length > 0 ? (
        <>
          {cart.map((item) => (
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
          ))}
          <button
            type="button"
            onClick={handleStripeCheckout}
            className="border w-full p-2 mt-4"
          >
            Stripe Checkout
          </button>
        </>
      ) : (
        <p className="mt-40">Cart is empty.</p>
      )}
    </div>
  );
}
