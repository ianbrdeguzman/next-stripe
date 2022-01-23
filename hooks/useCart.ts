import { useEffect, useState } from 'react';

interface Item {
  id: string;
  qty: number;
}

export default function useCart() {
  const getInitialCart = () => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  };
  const [cart, setCart] = useState<Item[]>([]);

  useEffect(() => {
    const cart = getInitialCart();
    setCart(cart);
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  function addItemToCart(id: string, qty: number = 1) {
    const itemInCart = cart.find((item) => item.id === id);

    if (itemInCart) {
      itemInCart.qty += qty;
      setCart([...cart]);
    } else {
      setCart([...cart, { id, qty }]);
    }
  }

  function removeItemFromCart(id: string) {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  }

  return {
    cart,
    addItemToCart,
    removeItemFromCart
  };
}
