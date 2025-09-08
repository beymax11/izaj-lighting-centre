export interface CheckoutLineItem {
  id: number;
  name: string;
  quantity: number;
  unitPrice: number;
  discount?: number; // flat per unit
}

export interface CheckoutTotals {
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
}

export const computeCheckoutTotals = (
  items: CheckoutLineItem[],
  shipping: number,
  taxRate = 0.12
): CheckoutTotals => {
  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const discount = items.reduce((sum, i) => sum + (i.discount ? i.discount * i.quantity : 0), 0);
  const tax = subtotal * taxRate;
  const total = subtotal - discount + tax + shipping;
  return { subtotal, discount, shipping, tax, total };
};


