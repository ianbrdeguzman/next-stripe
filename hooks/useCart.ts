import { useContext } from 'react';
import { CartContext } from '../context/cart';

export function useCart() {
  const { cart, addItemToCart, removeItemFromCart } = useContext(CartContext);
  if (cart === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return { cart, addItemToCart, removeItemFromCart };
}
