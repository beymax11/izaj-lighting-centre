import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase-server';
import { supabaseAdmin } from '@/lib/supabase-admin';

type SignupBody = {
	email: string;
	password: string;
	name?: string;
	phone?: string;
};

export async function POST(request: Request) {
	try {
		const body = (await request.json()) as Partial<SignupBody>;
		if (!body?.email || !body?.password) {
			return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
		}

		const supabase = await getSupabaseServerClient();
		const metadata: Record<string, string> = {};
		if (body.name) metadata.name = body.name;
		let normalizedPhone: string | undefined;
		if (body.phone) {
			const raw = body.phone.toString();
			const digits = raw.replace(/\D/g, '');
			if (digits && /^\d{10,15}$/.test(digits)) {
				let canonical = digits;
				// Canonicalize PH mobiles to 63xxxxxxxxxx
				if (digits.length === 11 && digits.startsWith('0')) {
					canonical = `63${digits.slice(1)}`;
				} else if (digits.length === 10 && digits.startsWith('9')) {
					canonical = `63${digits}`;
				} else if (digits.length === 12 && digits.startsWith('63')) {
					canonical = digits;
				}
				normalizedPhone = canonical;
				metadata.phone = canonical;
			}
		}
		const { data, error } = await supabase.auth.signUp({
			email: body.email,
			password: body.password,
			options: {
				data: Object.keys(metadata).length ? metadata : undefined,
				emailRedirectTo: process.env.NEXT_PUBLIC_APP_URL
					? `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`
					: undefined,
			},
		});

		if (error || !data?.user) {
			return NextResponse.json({ error: error?.message || 'Signup failed' }, { status: 400 });
		}

		// Create a profile row so data is visible immediately (uses service role)
		const { error: profileError } = await supabaseAdmin
			.from('profiles')
			.insert({ id: data.user.id, name: body.name ?? null, phone: normalizedPhone ?? null });
		// Ignore profileError (table may not exist yet)

		return NextResponse.json({ user: data.user, message: 'Signup successful' }, { status: 200 });
	} catch (err) {
		return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
	}
}


