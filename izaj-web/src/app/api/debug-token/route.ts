import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token') || searchParams.get('code');
    
    return NextResponse.json({
      success: true,
      token: token,
      tokenLength: token?.length || 0,
      tokenType: typeof token,
      timestamp: new Date().toISOString(),
      message: 'Token received successfully'
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Failed to process token',
      details: error
    }, { status: 500 });
  }
}
