import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase-server';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const token = url.searchParams.get('token');
    const code = url.searchParams.get('code');
    
    if (!token && !code) {
      return NextResponse.json({ 
        error: 'No token or code provided',
        instructions: 'Add ?token=your_token or ?code=your_code to the URL'
      });
    }

    const supabase = await getSupabaseServerClient();
    
    // Check current session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    const result = {
      providedToken: token || code,
      hasSession: !!session,
      userEmail: session?.user?.email || null,
      sessionError: sessionError?.message || null,
      timestamp: new Date().toISOString()
    };

    // Try to verify the token if provided
    if (token || code) {
      const tokenToTest = token || code;
      
      // Method 1: verifyOtp
      try {
        const { data: otpData, error: otpError } = await supabase.auth.verifyOtp({
          token_hash: tokenToTest,
          type: 'recovery'
        });
        
        result.verifyOtpResult = {
          success: !otpError,
          error: otpError?.message || null,
          user: otpData?.user?.email || null
        };
      } catch (e) {
        result.verifyOtpResult = {
          success: false,
          error: e instanceof Error ? e.message : 'Unknown error'
        };
      }

      // Method 2: exchangeCodeForSession
      try {
        const { data: exchangeData, error: exchangeError } = await supabase.auth.exchangeCodeForSession(tokenToTest);
        
        result.exchangeCodeResult = {
          success: !exchangeError,
          error: exchangeError?.message || null,
          user: exchangeData?.user?.email || null
        };
      } catch (e) {
        result.exchangeCodeResult = {
          success: false,
          error: e instanceof Error ? e.message : 'Unknown error'
        };
      }
    }

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ 
      error: 'Debug failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
