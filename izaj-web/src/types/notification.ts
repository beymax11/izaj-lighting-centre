export interface Notification {
  id: string;
  user_id: string;
  type: 'order' | 'promo' | 'review' | 'system' | 'favorite' | 'payment';
  title: string;
  message: string;
  is_read: boolean;
  link?: string;
  metadata?: {
    order_id?: string;
    product_id?: string;
    review_id?: string;
    [key: string]: any;
  };
  created_at: string;
  updated_at: string;
}

export interface CreateNotificationRequest {
  user_id: string;
  type: 'order' | 'promo' | 'review' | 'system' | 'favorite' | 'payment';
  title: string;
  message: string;
  link?: string;
  metadata?: {
    order_id?: string;
    product_id?: string;
    review_id?: string;
    [key: string]: any;
  };
}

export interface NotificationResponse {
  success: boolean;
  data?: Notification;
  error?: string;
}

export interface NotificationsResponse {
  success: boolean;
  data?: Notification[];
  error?: string;
}

export interface NotificationStats {
  total: number;
  unread: number;
  by_type: {
    order: number;
    promo: number;
    review: number;
    system: number;
    favorite: number;
    payment: number;
  };
}
