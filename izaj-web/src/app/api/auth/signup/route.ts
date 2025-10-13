import { NextResponse } from 'next/server';
import { getSupabaseServerClient } from '@/lib/supabase-server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { emailService } from '@/lib/email-service';
import { randomBytes } from 'crypto';

type SignupBody = {
	email: string;
	password: string;
	name?: string;
	phone?: string;
	address?: {
		province: string;
		city: string;
		barangay: string;
		address: string;
	};
};

export async function POST(request: Request) {
	console.log('🚀 Signup API called');
	let body: Partial<SignupBody> = {};
	try {
		body = (await request.json()) as Partial<SignupBody>;
		console.log('📝 Request body received:', { ...body, password: '***hidden***' });
		
		if (!body?.email || !body?.password) {
			console.log('❌ Missing email or password');
			return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
		}

		console.log('🔧 Getting Supabase client...');
		const supabase = await getSupabaseServerClient();
		console.log('✅ Supabase client obtained');
		
		const metadata: Record<string, string> = {};
		if (body.name) {
			metadata.name = body.name;
		}
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
		console.log('🔍 Checking if user already exists...');
		// Check if user already exists
		const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers({
			page: 1,
			perPage: 1000
		});
		
		const existingUser = existingUsers?.users?.find(user => user.email === body.email);
		
		if (existingUser) {
			console.log('❌ User already exists');
			return NextResponse.json({ 
				error: 'User with this email already exists',
				code: 'user_exists'
			}, { status: 400 });
		}
		console.log('✅ User does not exist, proceeding with creation...');

		console.log('👤 Creating user with Supabase auth...');
		// Create user using regular auth flow (not admin API)
		const { data, error } = await supabase.auth.signUp({
			email: body.email,
			password: body.password,
			options: {
				data: {
					name: body.name,
					phone: body.phone
				}
			}
		});

		if (error || !data?.user) {
			console.log('❌ User creation failed:', error);
			throw new Error(`Database error saving new user: ${error?.message || 'Unknown error'}`);
		}
		console.log('✅ User created successfully:', data.user.id);

		// Note: Metadata is already set in the signUp call above
		// No need to update separately with regular auth flow

		// Generate confirmation token
		const confirmationToken = randomBytes(32).toString('hex');
		const tokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours from now

		// Store confirmation token in database
		await supabaseAdmin.auth.admin.updateUserById(
			data.user.id,
			{
				user_metadata: {
					...metadata,
					confirmationToken,
					tokenExpiry: tokenExpiry.toISOString(),
					emailConfirmed: false,
				}
			}
		);

	// Wait for profile to be created by trigger
	await new Promise(resolve => setTimeout(resolve, 1000));
	
	// Update profile with user details
	const profileName = body.name && body.name.trim() ? body.name.trim() : null;
	
	// Check if phone number conflicts with another user
	let finalPhone: string | null = normalizedPhone ?? null;
	if (normalizedPhone) {
		const { data: phoneConflict } = await supabaseAdmin
			.from('profiles')
			.select('id')
			.eq('phone', normalizedPhone)
			.maybeSingle();
		
		if (phoneConflict) {
			finalPhone = null; // Don't set phone to avoid conflict
		}
	}
	
	// Update the profile with user details
	const { error: profileError } = await supabase
		.from('profiles')
		.update({ 
			name: profileName, 
			phone: finalPhone,
			updated_at: new Date().toISOString()
		})
		.eq('id', data.user.id);
	
	if (profileError) {
		console.error('Profile update error:', profileError);
		// Don't fail signup if profile update fails, just log it
	}

		// If address was provided during signup, create it in the database
		if (body.address && body.address.province && body.address.city && body.address.barangay && body.address.address) {
			const composedAddress = `${body.address.address.trim()}, ${body.address.barangay.trim()}, ${body.address.city.trim()}, ${body.address.province.trim()}`.replace(/,\s*,/g, ', ').trim();
			
			await supabase
				.from('user_addresses')
				.insert([{
					user_id: data.user.id,
					name: profileName || 'User',
					phone: finalPhone || '',
					address: composedAddress,
					is_default: true // Set as default since it's the first address
				}]);
		}

		// Send confirmation email
		try {
			await emailService.sendConfirmationEmail(
				body.email,
				confirmationToken,
				profileName || 'User'
			);
		} catch (emailError) {
			// Don't fail the signup if email fails
			console.error('Email send error:', emailError);
		}

		// Create welcome notification
		try {
			const { createWelcomeNotification } = await import('@/lib/notificationUtils');
			await createWelcomeNotification(data.user.id, profileName || 'User');
		} catch (notificationError) {
			// Don't fail the signup if notification fails
			console.error('Welcome notification error:', notificationError);
		}
		
		return NextResponse.json({ 
			user: data.user, 
			message: 'Signup successful. Please check your email to confirm your account.',
			address: body.address,
			emailSent: true
		}, { status: 200 });
	} catch (err) {
		console.error('Signup error:', err);
		console.error('Error stack:', err instanceof Error ? err.stack : 'No stack trace');
		console.error('Error details:', {
			name: err instanceof Error ? err.name : 'Unknown',
			message: err instanceof Error ? err.message : String(err),
			code: (err as any)?.code,
			details: (err as any)?.details,
			hint: (err as any)?.hint
		});
		
		// Provide more detailed error information
		let errorMessage = 'Database error saving new user';
		let statusCode = 500;
		
		if (err instanceof Error) {
			errorMessage = err.message;
			
			// Check for specific database errors
			if (err.message.includes('relation') || err.message.includes('does not exist')) {
				errorMessage = 'Database tables not found. Please run the database schema.';
				statusCode = 500;
			} else if (err.message.includes('duplicate key') || err.message.includes('already exists')) {
				errorMessage = 'User already exists with this email or phone number.';
				statusCode = 400;
			} else if (err.message.includes('permission denied') || err.message.includes('RLS')) {
				errorMessage = 'Database permission error. Please check RLS policies.';
				statusCode = 500;
			} else if (err.message.includes('connection') || err.message.includes('timeout')) {
				errorMessage = 'Database connection error. Please try again.';
				statusCode = 500;
			}
		}
		
		return NextResponse.json({ 
			error: errorMessage,
			details: err instanceof Error ? err.stack : undefined,
			errorCode: (err as any)?.code,
			timestamp: new Date().toISOString()
		}, { status: statusCode });
	}
}


