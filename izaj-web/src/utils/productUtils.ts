import { Product } from '../types/product';

export const formatCurrency = (value: number | string): string => {
  const num = typeof value === 'string' ? Number(value) : value;
  if (Number.isNaN(num)) return String(value);
  return `₱${num.toLocaleString()}`;
};

export const sortProducts = (products: Product[], option: string): Product[] => {
  const sorted = [...products];
  switch (option) {
    case 'Alphabetical, A-Z':
      sorted.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'Alphabetical, Z-A':
      sorted.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case 'Price, Low to High':
      sorted.sort((a, b) => Number(a.price) - Number(b.price));
      break;
    case 'Price, High to Low':
      sorted.sort((a, b) => Number(b.price) - Number(a.price));
      break;
    default:
      break;
  }
  return sorted;
};

export const paginate = (items: Product[], page: number, perPage: number): Product[] => {
  const start = page * perPage;
  return items.slice(start, start + perPage);
};


