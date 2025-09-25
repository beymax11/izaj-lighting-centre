import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase-server';

export async function GET(request: Request) {
	const url = new URL(request.url);
	const code = url.searchParams.get('code');
	const redirectPath = url.searchParams.get('redirect') || '/';

	const supabase = await getSupabaseServerClient();
	if (code) {
		// Exchange the OAuth code for a session and set cookies
		await supabase.auth.exchangeCodeForSession(code);
	}

	const base = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
	return NextResponse.redirect(new URL(redirectPath, base));
}


