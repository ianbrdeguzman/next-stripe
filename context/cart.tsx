import { createContext, useEffect, useState } from 'react';

interface Item {
  id: string;
  qty: number;
}

interface Cart {
  cart: Item[];
  addItemToCart: ({ id, qty }: Item) => void;
  minusItemOnCart: ({ id, qty }: Item) => void;
  removeItemFromCart: (id: string) => void;
}

export const CartContext = createContext<Cart>({
  cart: [],
  addItemToCart: () => {},
  minusItemOnCart: () => {},
  removeItemFromCart: () => {}
});

interface CartProviderProps {
  children: React.ReactNode;
}

export function CartProvider({ children }: CartProviderProps) {
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

  function addItemToCart({ id, qty = 1 }: Item) {
    const itemInCart = cart.find((item) => item.id === id);

    if (itemInCart) {
      itemInCart.qty += qty;
      setCart([...cart]);
    } else {
      setCart([...cart, { id, qty }]);
    }
  }

  function minusItemOnCart({ id, qty = 1 }: Item) {
    const itemInCart = cart.find((item) => item.id === id);

    if (itemInCart && itemInCart.qty > 1) {
      itemInCart.qty -= qty;
      setCart([...cart]);
    } else {
      removeItemFromCart(id);
    }
  }

  function removeItemFromCart(id: string) {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  }

  return (
    <CartContext.Provider
      value={{ cart, addItemToCart, minusItemOnCart, removeItemFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
