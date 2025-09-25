# 🔐 Backend Setup Guide - Forgot Password Feature

## 📋 **Overview**
This guide covers the complete setup for the enhanced forgot password backend functionality in your IZAJ web application.

## 🛠️ **Features Implemented**

### ✅ **Completed Features**
- [x] Reset password route handler with token validation
- [x] Email template customization with professional design
- [x] Rate limiting for forgot password requests (3 requests per 15 minutes)
- [x] Password strength validation with real-time feedback
- [x] Audit logging for security tracking
- [x] Frontend reset password page with validation
- [x] Token verification system

## 🚀 **Setup Instructions**

### **Step 1: Environment Variables**
Update your `.env.local` file with the following variables:

```bash
# Required - Already in your env.example
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Optional - For enhanced features
NEXT_PUBLIC_SUPPORT_EMAIL=support@izaj.com
NEXT_PUBLIC_SUPPORT_PHONE=+63 XXX XXX XXXX
```

### **Step 2: Database Setup**
Run the following SQL in your Supabase SQL editor:

```sql
-- Copy and paste the contents of database/audit_logs.sql
-- This creates the audit_logs table and necessary indexes
```

### **Step 3: Email Configuration**
Configure your Supabase email templates:

1. Go to Supabase Dashboard → Authentication → Email Templates
2. Customize the "Reset Password" template with your branding
3. Update the redirect URL to match your domain

### **Step 4: Rate Limiting Configuration**
The rate limiting is configured as follows:
- **Forgot Password**: 3 requests per 15 minutes per IP
- **Reset Password**: 5 attempts per hour per IP
- **General Auth**: 10 requests per 15 minutes per IP

## 📁 **Files Created/Modified**

### **New Files:**
```
src/app/api/auth/reset-password/route.ts    # Reset password handler
src/lib/email-templates.ts                  # Email templates
src/lib/rate-limiter.ts                     # Rate limiting system
src/app/reset-password/page.tsx             # Frontend reset page
database/audit_logs.sql                     # Database schema
BACKEND_SETUP.md                            # This documentation
```

### **Modified Files:**
```
src/app/api/auth/forgot-password/route.ts   # Enhanced with rate limiting & logging
```

## 🔧 **API Endpoints**

### **POST /api/auth/forgot-password**
Request password reset email.

**Request:**
```json
{
  "identifier": "user@example.com" // or phone number
}
```

**Response:**
```json
{
  "message": "If an account with that email or phone exists, we've sent a password reset link.",
  "remaining": 2
}
```

**Rate Limit Headers:**
```
X-RateLimit-Limit: 3
X-RateLimit-Remaining: 2
X-RateLimit-Reset: 2024-01-01T12:00:00Z
```

### **GET /api/auth/reset-password?token=xxx**
Verify reset token validity.

**Response:**
```json
{
  "success": true,
  "message": "Token is valid",
  "user_id": "user-uuid"
}
```

### **POST /api/auth/reset-password**
Reset password with token.

**Request:**
```json
{
  "token": "reset-token-hash",
  "password": "newPassword123!",
  "confirmPassword": "newPassword123!"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password has been reset successfully"
}
```

## 🛡️ **Security Features**

### **Rate Limiting**
- Prevents brute force attacks
- IP-based limiting with configurable windows
- Returns appropriate HTTP status codes (429)

### **Password Validation**
- Minimum 8 characters
- Uppercase and lowercase letters
- Numbers and special characters
- Real-time validation feedback

### **Audit Logging**
- Tracks all password reset attempts
- Records IP addresses and user agents
- Stores masked identifiers for privacy
- Automatic cleanup of old logs

### **Token Security**
- Time-limited reset tokens
- Single-use tokens
- Secure token validation
- No sensitive data exposure

## 🎨 **Frontend Features**

### **Reset Password Page**
- Token validation on load
- Real-time password strength indicator
- Password confirmation matching
- Professional UI with loading states
- Error handling and user feedback

### **Password Requirements Display**
- Visual indicators for each requirement
- Color-coded validation (green/red)
- Real-time updates as user types

## 📊 **Monitoring & Analytics**

### **Audit Log Queries**
```sql
-- Recent password reset attempts
SELECT * FROM audit_logs 
WHERE action = 'forgot_password_request' 
ORDER BY created_at DESC 
LIMIT 10;

-- Failed reset attempts by IP
SELECT ip_address, COUNT(*) as attempts
FROM audit_logs 
WHERE action = 'password_reset' 
AND created_at > NOW() - INTERVAL '1 hour'
GROUP BY ip_address
HAVING COUNT(*) > 5;
```

## 🔄 **Testing**

### **Test Cases**
1. **Valid Email Reset**: Send reset email to existing user
2. **Invalid Email**: Send reset to non-existent email
3. **Rate Limiting**: Exceed rate limits and verify blocking
4. **Token Validation**: Test valid and invalid tokens
5. **Password Strength**: Test various password combinations
6. **Security**: Verify audit logging works

### **Test Commands**
```bash
# Test forgot password endpoint
curl -X POST http://localhost:3000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"identifier": "test@example.com"}'

# Test token validation
curl "http://localhost:3000/api/auth/reset-password?token=your-token-here"

# Test password reset
curl -X POST http://localhost:3000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"token": "token", "password": "NewPass123!", "confirmPassword": "NewPass123!"}'
```

## 🚨 **Troubleshooting**

### **Common Issues**

1. **Rate Limit Errors (429)**
   - Wait for the rate limit window to reset
   - Check IP address in rate limit headers

2. **Invalid Token Errors**
   - Token may have expired (24 hours default)
   - Token may have already been used
   - Check token format and encoding

3. **Email Not Sending**
   - Verify Supabase email configuration
   - Check SMTP settings in Supabase dashboard
   - Verify email templates are configured

4. **Database Errors**
   - Ensure audit_logs table exists
   - Check service role permissions
   - Verify RLS policies are correct

## 📈 **Performance Considerations**

### **Rate Limiting Storage**
- Currently uses in-memory storage
- For production, consider Redis or database storage
- Implement distributed rate limiting for multiple servers

### **Audit Log Cleanup**
- Automatic cleanup function provided
- Consider implementing scheduled cleanup
- Monitor storage usage for audit logs

## 🔮 **Future Enhancements**

### **Potential Additions**
- [ ] SMS-based password reset
- [ ] Two-factor authentication integration
- [ ] Password reset via security questions
- [ ] Account lockout after failed attempts
- [ ] Email verification before reset
- [ ] Advanced analytics dashboard
- [ ] Integration with security monitoring tools

## 📞 **Support**

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the audit logs for error patterns
3. Verify all environment variables are set correctly
4. Test with the provided curl commands

---

**Happy Coding! 🚀**
