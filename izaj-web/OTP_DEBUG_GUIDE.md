# OTP Phone Number Debug Guide

This guide will help you debug issues with the phone number OTP functionality.

## Quick Debug Steps

### 1. Check Environment Variables
Make sure your `.env.local` file contains:
```env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=your_auth_token_here
TWILIO_PHONE_NUMBER=+15551234567
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 2. Run Database Migration
Execute the SQL in `src/lib/database-migrations.sql` to create the `otp_verifications` table.

### 3. Test the Debug Endpoint
Visit `/debug-otp` in your browser to run comprehensive tests.

### 4. Check API Endpoints
Test each endpoint individually:

#### Send OTP Test
```bash
curl -X POST http://localhost:3000/api/auth/send-otp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "9123456789"}'
```

#### Verify OTP Test
```bash
curl -X POST http://localhost:3000/api/auth/verify-otp \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber": "9123456789", "otp": "123456"}'
```

## Common Issues & Solutions

### Issue 1: "SMS service not configured"
**Cause**: Missing Twilio environment variables
**Solution**: Add all required Twilio credentials to `.env.local`

### Issue 2: "Invalid phone number format"
**Cause**: Phone number doesn't match Philippine format
**Supported formats**:
- `9XXXXXXXXX` (10 digits)
- `09XXXXXXXXX` (11 digits)
- `639XXXXXXXXX` (12 digits)
- `+639XXXXXXXXX` (13 digits)

### Issue 3: "User not found"
**Cause**: Phone number not associated with any user account
**Solution**: 
1. Check if user exists in database
2. Verify phone number format in user profile
3. Check both `profiles.phone` and `auth.users.user_metadata.phone`

### Issue 4: "OTP expired or already used"
**Cause**: OTP has expired (10 minutes) or already been used
**Solution**: Request a new OTP

### Issue 5: SMS not received
**Possible causes**:
- Twilio account issues (insufficient credits, account suspended)
- Phone number not valid
- Carrier blocking (some Philippine carriers block international SMS)
- Incorrect phone number format

**Debug steps**:
1. Check Twilio Console for message status
2. Verify phone number is correct
3. Try with a different phone number
4. Check Twilio logs for delivery errors

### Issue 6: Database errors
**Cause**: Missing `otp_verifications` table or permissions
**Solution**: Run the database migration SQL

## Debug Tools Available

### 1. Debug OTP Page (`/debug-otp`)
- System configuration check
- Test OTP sending
- Detailed debugging information
- SMS status tracking

### 2. API Debug Endpoints
- `/api/debug/otp-setup` - Check system configuration
- `/api/debug/otp-detailed` - Detailed OTP testing
- `/api/debug/sms-status` - Check SMS delivery status
- `/api/debug/twilio-account` - Verify Twilio account

## Testing Workflow

1. **Start with system check**: Visit `/debug-otp` and run "Run Debug Check"
2. **Test phone formatting**: Use "Detailed Debug" with a test phone number
3. **Test OTP sending**: Use "Test Send OTP" with a real phone number
4. **Check SMS delivery**: Use Twilio Console or "Check SMS Status"
5. **Test full flow**: Go through the complete forgot password → OTP → reset flow

## Phone Number Testing

### Valid Philippine Numbers for Testing
- `9123456789` (10 digits)
- `09123456789` (11 digits)
- `639123456789` (12 digits)
- `+639123456789` (13 digits)

### Invalid Formats (will fail)
- `1234567890` (doesn't start with 9)
- `8123456789` (doesn't start with 9)
- `912345678` (too short)
- `91234567890` (too long)

## Twilio Console Debugging

1. Go to [Twilio Console](https://console.twilio.com/)
2. Navigate to "Monitor" → "Logs" → "Messages"
3. Check for:
   - Message status (sent, delivered, failed)
   - Error codes and messages
   - Delivery attempts and failures

## Rate Limiting

The system has built-in rate limiting:
- **OTP Send**: 3 requests per 15 minutes per IP
- **OTP Verify**: 5 attempts per 10 minutes per IP
- **OTP Reset**: 3 password resets per hour per IP

If you hit rate limits, wait for the cooldown period or use a different IP.

## Production Considerations

1. **Monitor SMS costs**: Track Twilio usage and costs
2. **Set up alerts**: Monitor failed SMS deliveries
3. **Backup provider**: Consider having a backup SMS provider
4. **Performance**: Consider Redis for rate limiting in high-traffic scenarios
5. **Compliance**: Ensure compliance with SMS regulations in your region

## Getting Help

If you're still having issues:

1. Check the browser console for JavaScript errors
2. Check the server logs for API errors
3. Verify all environment variables are set correctly
4. Test with the debug endpoints
5. Check Twilio Console for SMS delivery issues
6. Verify database table exists and has proper permissions
