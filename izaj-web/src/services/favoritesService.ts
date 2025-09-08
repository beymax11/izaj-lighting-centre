export interface FavoriteItem {
  id: number;
  name: string;
  price: string; // keeping as formatted string for now to match UI
  image: string;
  category: string;
}

export const getFavorites = (): FavoriteItem[] => [
  { id: 1, name: 'Abednego | Chandelier/Large', price: '₱12,500.00', image: '/abed.webp', category: 'Chandelier' },
  { id: 2, name: 'Aberdeen | Modern LED Chandelier', price: '₱15,000.00', image: '/aber.webp', category: 'LED Lighting' },
  { id: 3, name: 'Aina | Modern Chandelier', price: '₱18,000.00', image: '/aina.webp', category: 'Modern Lighting' },
];


