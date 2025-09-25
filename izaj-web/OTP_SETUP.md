# OTP Phone Number Password Reset Setup

This document explains how to set up and use the OTP (One-Time Password) phone number password reset functionality.

## Features

- **Dual Reset Methods**: Users can choose between email link reset or SMS OTP reset
- **Phone Number Verification**: 6-digit OTP codes sent via SMS using Twilio
- **Rate Limiting**: Prevents abuse with configurable rate limits
- **Security**: OTP codes expire in 10 minutes and can only be used once
- **Audit Logging**: All OTP requests and verifications are logged

## Setup Instructions

### 1. Install Dependencies

The Twilio package has already been installed:
```bash
npm install twilio
```

### 2. Environment Variables

Add the following environment variables to your `.env.local` file:

```env
# Twilio Configuration
TWILIO_ACCOUNT_SID=your_twilio_account_sid_here
TWILIO_AUTH_TOKEN=your_twilio_auth_token_here
TWILIO_PHONE_NUMBER=+1234567890  # Your Twilio phone number
```

**Example values:**
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+15551234567
```

### 3. Database Setup

Run the SQL migration to create the OTP verification table:

```sql
-- Execute the SQL in izaj-web/src/lib/database-migrations.sql
-- This creates the otp_verifications table with proper indexes and RLS policies
```

### 4. Twilio Account Setup

1. Sign up for a Twilio account at https://www.twilio.com/
2. Get your Account SID and Auth Token from the Twilio Console
3. Purchase a phone number for sending SMS messages
4. Add the credentials to your environment variables

## How It Works

### User Flow

1. **Forgot Password**: User goes to `/forgot-password`
2. **Choose Method**: User selects "Phone OTP" option
3. **Enter Phone**: User enters their phone number
4. **Send OTP**: System sends 6-digit code via SMS
5. **Verify OTP**: User enters code on `/verify-otp` page
6. **Reset Password**: User sets new password on `/reset-password` page

### Technical Flow

1. **Send OTP** (`/api/auth/send-otp`):
   - Validates phone number format
   - Finds user by phone number in database
   - Generates 6-digit OTP
   - Stores OTP in database with 10-minute expiration
   - Sends SMS via Twilio
   - Logs the request

2. **Verify OTP** (`/api/auth/verify-otp`):
   - Validates OTP format (6 digits)
   - Checks OTP against database
   - Verifies expiration and usage status
   - Marks OTP as used
   - Returns success with user info

3. **Reset Password** (`/api/auth/reset-password-otp`):
   - Validates password requirements
   - Verifies recent OTP verification (within 30 minutes)
   - Updates user password via Supabase Admin
   - Cleans up used OTP records
   - Logs the reset

## Rate Limiting

The system includes multiple layers of rate limiting:

- **OTP Send**: 3 requests per 15 minutes per IP
- **OTP Verify**: 5 attempts per 10 minutes per IP  
- **OTP Reset**: 3 password resets per hour per IP
- **General Auth**: 10 requests per 15 minutes per IP

## Security Features

- **OTP Expiration**: Codes expire after 10 minutes
- **Single Use**: Each OTP can only be used once
- **Phone Verification**: Must verify recent OTP before password reset
- **Rate Limiting**: Prevents brute force attacks
- **Audit Logging**: All actions are logged for security monitoring
- **Input Validation**: Phone numbers and OTPs are validated
- **Secure Storage**: OTPs are stored securely in database

## API Endpoints

### POST `/api/auth/send-otp`
Sends OTP code to phone number.

**Request:**
```json
{
  "phoneNumber": "9123456789"
}
```

**Response:**
```json
{
  "message": "If an account with that phone number exists, we've sent an OTP code."
}
```

### POST `/api/auth/verify-otp`
Verifies OTP code.

**Request:**
```json
{
  "phoneNumber": "9123456789",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP verified successfully",
  "userId": "user-uuid",
  "email": "user@example.com"
}
```

### POST `/api/auth/reset-password-otp`
Resets password using verified OTP.

**Request:**
```json
{
  "userId": "user-uuid",
  "phoneNumber": "9123456789", 
  "password": "NewPassword123!",
  "confirmPassword": "NewPassword123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password has been reset successfully"
}
```

## Database Schema

### otp_verifications Table

```sql
CREATE TABLE otp_verifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone_number TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Error Handling

The system handles various error scenarios:

- **Invalid phone number format**
- **User not found**
- **OTP expired or already used**
- **Rate limit exceeded**
- **SMS sending failures**
- **Database errors**

All errors return appropriate HTTP status codes and user-friendly messages.

## Testing

To test the OTP functionality:

1. Ensure Twilio credentials are configured
2. Use a real phone number for testing
3. Check SMS delivery in Twilio Console
4. Verify OTP codes work correctly
5. Test rate limiting by making multiple requests
6. Test error scenarios (invalid codes, expired codes)

## Production Considerations

- **Monitoring**: Set up alerts for failed SMS deliveries
- **Costs**: Monitor Twilio usage and costs
- **Backup**: Consider backup SMS providers
- **Compliance**: Ensure compliance with SMS regulations
- **Performance**: Consider Redis for rate limiting in high-traffic scenarios

## Troubleshooting

### Common Issues

1. **SMS not received**: Check Twilio logs and phone number format
2. **OTP verification fails**: Verify database connection and OTP storage
3. **Rate limiting**: Check rate limit configuration and IP detection
4. **Phone number not found**: Verify user phone number format in database

### Debug Steps

1. Check Twilio Console for SMS delivery status
2. Verify environment variables are set correctly
3. Check database for OTP records
4. Review audit logs for failed attempts
5. Test with different phone numbers

## Support

For issues with the OTP functionality:

1. Check the audit logs in the database
2. Review Twilio Console for SMS issues
3. Verify all environment variables are set
4. Check rate limiting configuration
5. Test with a known working phone number
