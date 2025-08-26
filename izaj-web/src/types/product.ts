export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number | string;
  originalPrice?: number | string;
  rating?: number;
  reviewCount?: number;
  image: string;
  isNew?: boolean;
  isOnSale?: boolean;
  size?: string;
  colors?: string[];
}


