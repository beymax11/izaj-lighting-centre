import { Product } from '../types/product';

export const getAllProducts = (): Product[] => [
  { id: 1, name: 'Abednego | Chandelier/Large', price: '₱32,995', image: '/public/abed.webp', colors: ['black', 'gold', 'silver'] },
  { id: 2, name: 'Aberdeen | Modern LED Chandelier', price: '₱25,464', image: '/public/aber.webp', colors: ['black', 'gold'] },
  { id: 3, name: 'Acadia | Table Lamp', price: '₱12,234', image: '/public/acad.webp', colors: ['black'] },
  { id: 4, name: 'Ademar | Modern Chandelier', price: '₱11,237', image: '/public/mar.webp', colors: ['black'] },
  { id: 5, name: 'Aeris | Modern Pendant Light', price: '₱9,435', image: '/public/aeris.webp', colors: ['black'] },
  { id: 6, name: 'Aina | Modern LED Chandelier', price: '₱29,995', image: '/public/aina.webp', colors: ['black'] },
  { id: 7, name: 'Alabama | Table Lamp', price: '₱27,995', image: '/public/alab.webp', colors: ['black'] },
  { id: 8, name: 'Alphius | Surface Mounted Downlight', price: '₱25,995', image: '/public/alph.webp', colors: ['black'] },
  { id: 9, name: 'Altair | Modern LED Chandelier', price: '₱23,995', image: '/public/alta.jpg', colors: ['black'] },
  { id: 10, name: 'Amalfi | Boho Rattan Soliya Pendant Lamp', price: '₱21,995', image: '/public/ama.webp', colors: ['black'] },
];

export const getProductById = (id: number): Product | undefined => {
  return getAllProducts().find(p => p.id === id);
};


