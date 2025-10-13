import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// PUT /api/notifications/mark-all-read - Mark all notifications as read
export async function PUT(request: NextRequest) {
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

    console.log('🔔 [API] Marking all notifications as read for user:', user.id);

    // Update all unread notifications to read
    const { data, error } = await supabase
      .from('notifications')
      .update({ 
        is_read: true,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', user.id)
      .eq('is_read', false)
      .select();

    if (error) {
      console.error('❌ [API] Error marking notifications as read:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to mark notifications as read' },
        { status: 500 }
      );
    }

    console.log('✅ [API] Marked notifications as read:', data?.length || 0);

    return NextResponse.json({
      success: true,
      message: `Marked ${data?.length || 0} notifications as read`,
      data: data
    });

  } catch (error) {
    console.error('❌ [API] Error in PUT /api/notifications/mark-all-read:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
