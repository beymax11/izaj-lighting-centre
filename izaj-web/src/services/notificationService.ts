import { 
  Notification, 
  CreateNotificationRequest, 
  NotificationResponse, 
  NotificationsResponse, 
  NotificationStats 
} from '@/types/notification';

// For Next.js API routes, we use relative paths
const API_BASE_URL = '';

/**
 * Get user notifications
 */
export async function getNotifications(params?: {
  limit?: number;
  offset?: number;
  type?: string;
  unread_only?: boolean;
}): Promise<NotificationsResponse> {
  try {
    // Check if we're in the browser
    if (typeof window === 'undefined') {
      return {
        success: false,
        error: 'Not available on server side'
      };
    }

    const searchParams = new URLSearchParams();
    
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.offset) searchParams.append('offset', params.offset.toString());
    if (params?.type) searchParams.append('type', params.type);
    if (params?.unread_only) searchParams.append('unread_only', 'true');

    const url = `${API_BASE_URL}/api/notifications${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      return {
        success: false,
        error: errorData.error || `HTTP ${response.status}: Failed to fetch notifications`
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch notifications'
    };
  }
}

/**
 * Create a new notification
 */
export async function createNotification(notificationData: CreateNotificationRequest): Promise<NotificationResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/notifications`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(notificationData)
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Error creating notification:', data);
      return {
        success: false,
        error: data.error || 'Failed to create notification'
      };
    }

    return data;
  } catch (error) {
    console.error('❌ Error in createNotification:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create notification'
    };
  }
}

/**
 * Update notification (mark as read/unread)
 */
export async function updateNotification(id: string, isRead: boolean): Promise<NotificationResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/notifications/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ is_read: isRead })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Error updating notification:', data);
      return {
        success: false,
        error: data.error || 'Failed to update notification'
      };
    }

    return data;
  } catch (error) {
    console.error('❌ Error in updateNotification:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update notification'
    };
  }
}

/**
 * Delete notification
 */
export async function deleteNotification(id: string): Promise<{ success: boolean; error?: string; message?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/notifications/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Error deleting notification:', data);
      return {
        success: false,
        error: data.error || 'Failed to delete notification'
      };
    }

    return data;
  } catch (error) {
    console.error('❌ Error in deleteNotification:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete notification'
    };
  }
}

/**
 * Mark all notifications as read
 */
export async function markAllNotificationsAsRead(): Promise<{ success: boolean; error?: string; message?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/notifications/mark-all-read`, {
      method: 'PUT',
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Error marking all notifications as read:', data);
      return {
        success: false,
        error: data.error || 'Failed to mark all notifications as read'
      };
    }

    return data;
  } catch (error) {
    console.error('❌ Error in markAllNotificationsAsRead:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to mark all notifications as read'
    };
  }
}

/**
 * Get notification statistics
 */
export async function getNotificationStats(): Promise<{ success: boolean; data?: NotificationStats; error?: string }> {
  try {
    // Check if we're in the browser
    if (typeof window === 'undefined') {
      return {
        success: false,
        error: 'Not available on server side'
      };
    }

    const response = await fetch(`${API_BASE_URL}/api/notifications/stats`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
      return {
        success: false,
        error: errorData.error || `HTTP ${response.status}: Failed to fetch notification stats`
      };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch notification stats'
    };
  }
}
