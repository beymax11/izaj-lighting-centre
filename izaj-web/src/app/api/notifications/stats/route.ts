import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// GET /api/notifications/stats - Get notification statistics
export async function GET(request: NextRequest) {
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

    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('🔔 [API] Fetching notification stats for user:', user.id);

    // Get total notifications count
    const { count: totalCount, error: totalError } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    if (totalError) {
      console.error('❌ [API] Error fetching total count:', totalError);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch notification stats' },
        { status: 500 }
      );
    }

    // Get unread notifications count
    const { count: unreadCount, error: unreadError } = await supabase
      .from('notifications')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('is_read', false);

    if (unreadError) {
      console.error('❌ [API] Error fetching unread count:', unreadError);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch notification stats' },
        { status: 500 }
      );
    }

    // Get notifications by type
    const { data: typeData, error: typeError } = await supabase
      .from('notifications')
      .select('type')
      .eq('user_id', user.id);

    if (typeError) {
      console.error('❌ [API] Error fetching type data:', typeError);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch notification stats' },
        { status: 500 }
      );
    }

    // Count by type
    const by_type = {
      order: 0,
      promo: 0,
      review: 0,
      system: 0,
      favorite: 0,
      payment: 0
    };

    typeData?.forEach(notification => {
      if (notification.type in by_type) {
        by_type[notification.type as keyof typeof by_type]++;
      }
    });

    const stats = {
      total: totalCount || 0,
      unread: unreadCount || 0,
      by_type
    };

    console.log('✅ [API] Notification stats:', stats);

    return NextResponse.json({
      success: true,
      data: stats
    });

  } catch (error) {
    console.error('❌ [API] Error in GET /api/notifications/stats:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
