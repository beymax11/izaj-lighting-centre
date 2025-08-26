export interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  isSale: boolean;
  isNew?: boolean;
}


