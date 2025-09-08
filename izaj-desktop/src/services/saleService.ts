import { Session } from '@supabase/supabase-js';
import API_URL from '../../config/api';
import { SaleFormData } from '../types/modal';

export class SaleService {
  private static getHeaders(session: Session | null) {
    return {
      'Content-Type': 'application/json',
      ...(session?.access_token && {
        'Authorization': `Bearer ${session.access_token}`
      })
    };
  }

  static async createSale(
    session: Session | null, 
    saleData: SaleFormData
  ): Promise<{ success: boolean; message?: string }> {
    if (!session?.access_token) {
      return { success: false, message: 'Authentication required' };
    }

    if (!saleData.selectedProductId || !saleData.discountValue || 
        !saleData.startDate || !saleData.endDate) {
      return { success: false, message: 'Please fill in all required fields' };
    }

    try {
      const response = await fetch(`${API_URL}/api/sales`, {
        method: 'POST',
        headers: this.getHeaders(session),
        body: JSON.stringify(saleData),
      });

      if (response.ok) {
        return { success: true };
      } else {
        const errorData = await response.json();
        return { success: false, message: errorData.error || 'Failed to create sale' };
      }
    } catch (error) {
      console.error('Error creating sale:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to create sale' 
      };
    }
  }
}