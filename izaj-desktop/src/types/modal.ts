import { Session } from '@supabase/supabase-js';
import { FetchedProduct } from './product';

export interface AddProductModalProps {
  session: Session | null;
  onClose: () => void;
  onSuccess: () => void;
  mode: 'product' | 'sale';
  fetchedProducts: FetchedProduct[];
  onProductsPublished?: () => void; 
}

export interface ProductFormData {
  name: string;
  description: string;
  category: string;
  price: string;
  image: string;
}

export interface SaleFormData {
  selectedProductId: string;
  discountType: string;
  discountValue: string;
  startDate: string;
  endDate: string;
}

export interface ModalState {
  showFullForm: boolean;
  selectedProduct: FetchedProduct | null;
  currentIndex: number;
  selectedFile: File[];
  isPublishing: boolean;
  uploading: boolean;
  previewUrls: string[];
  previewIndex: number;
  formData: ProductFormData;
  saleData: SaleFormData;
}