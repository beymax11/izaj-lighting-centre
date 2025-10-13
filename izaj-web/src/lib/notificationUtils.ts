import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { CreateNotificationRequest } from '@/types/notification';

/**
 * Create a notification for a user
 * This utility function can be used in API routes to create notifications
 */
export async function createNotification(notificationData: CreateNotificationRequest): Promise<void> {
  try {
    const cookieStore = await cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          },
        },
      }
    );

    const notification = {
      ...notificationData,
      is_read: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    const { error } = await supabase
      .from('notifications')
      .insert([notification]);

    if (error) {
      console.error('❌ Error creating notification:', error);
      throw error;
    }

    console.log('✅ Notification created successfully:', notificationData.title);
  } catch (error) {
    console.error('❌ Error in createNotification utility:', error);
    throw error;
  }
}

/**
 * Create welcome notification for new users
 */
export async function createWelcomeNotification(userId: string, userName: string): Promise<void> {
  await createNotification({
    user_id: userId,
    type: 'system',
    title: 'Welcome to IZAJ!',
    message: `Welcome ${userName}! Thank you for joining IZAJ. Explore our collection of premium lighting fixtures and create your perfect space.`,
    link: '/collection',
    metadata: {
      welcome: true
    }
  });
}

/**
 * Create order status notification
 */
export async function createOrderStatusNotification(
  userId: string, 
  orderId: string, 
  orderNumber: string, 
  status: string
): Promise<void> {
  const statusMessages = {
    'confirmed': `Your order #${orderNumber} has been confirmed and is being prepared.`,
    'processing': `Your order #${orderNumber} is being processed and will be shipped soon.`,
    'shipped': `Great news! Your order #${orderNumber} has been shipped and is on its way.`,
    'delivered': `Your order #${orderNumber} has been delivered successfully. We hope you love your new lighting fixtures!`,
    'cancelled': `Your order #${orderNumber} has been cancelled. If you have any questions, please contact our support team.`
  };

  const statusTitles = {
    'confirmed': 'Order Confirmed',
    'processing': 'Order Processing',
    'shipped': 'Order Shipped',
    'delivered': 'Order Delivered',
    'cancelled': 'Order Cancelled'
  };

  await createNotification({
    user_id: userId,
    type: 'order',
    title: statusTitles[status as keyof typeof statusTitles] || 'Order Update',
    message: statusMessages[status as keyof typeof statusMessages] || `Your order #${orderNumber} status has been updated.`,
    link: `/orders/${orderId}`,
    metadata: {
      order_id: orderId,
      order_number: orderNumber,
      status: status
    }
  });
}

/**
 * Create promotion notification
 */
export async function createPromotionNotification(
  userId: string,
  title: string,
  message: string,
  link?: string,
  metadata?: any
): Promise<void> {
  await createNotification({
    user_id: userId,
    type: 'promo',
    title,
    message,
    link,
    metadata
  });
}

/**
 * Create system notification
 */
export async function createSystemNotification(
  userId: string,
  title: string,
  message: string,
  link?: string,
  metadata?: any
): Promise<void> {
  await createNotification({
    user_id: userId,
    type: 'system',
    title,
    message,
    link,
    metadata
  });
}
