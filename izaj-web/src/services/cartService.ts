import { CartItem } from '../types/cart';

export const calculateSubtotal = (items: CartItem[]): number =>
  items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const calculateDiscount = (items: CartItem[]): number =>
  items.reduce((sum, item) => {
    if (typeof item.originalPrice === 'number') {
      return sum + (item.originalPrice - item.price) * item.quantity;
    }
    return sum;
  }, 0);

export const calculateShipping = (city: string): number => {
  const shippingRates: Record<string, number> = {
    'San Pablo City': 200,
    'Quezon': 250,
    'Laguna': 200,
    'Cavite': 250,
    'Batangas': 250,
    'Camarines Sur': 300,
    'Sorsogon': 300,
    'La Union': 300,
    'default': 300,
  };
  return shippingRates[city] ?? shippingRates.default;
};

export const calculateTax = (subtotal: number): number => subtotal * 0.12;

export const calculateTotal = (items: CartItem[], city: string): number => {
  const subtotal = calculateSubtotal(items);
  const discount = calculateDiscount(items);
  const shipping = calculateShipping(city);
  const tax = calculateTax(subtotal);
  return subtotal - discount + shipping + tax;
};


