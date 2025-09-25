-- Drop existing table if it exists (to avoid conflicts)
DROP TABLE IF EXISTS audit_logs CASCADE;

-- Create audit_logs table for tracking authentication events
CREATE TABLE audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT, -- Can be user ID, email, or phone number
    action TEXT NOT NULL, -- e.g., 'forgot_password_request', 'password_reset', 'login_attempt'
    details JSONB, -- Additional details about the action
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_ip_address ON audit_logs(ip_address);

-- Create index for composite queries
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_action ON audit_logs(user_id, action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_ip_action ON audit_logs(ip_address, action);

-- Row Level Security (RLS) policies
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Only allow service role to insert/select audit logs
CREATE POLICY "Service role can manage audit logs" ON audit_logs
    FOR ALL USING (auth.role() = 'service_role');

-- Grant permissions to service role
GRANT ALL ON audit_logs TO service_role;

-- Create a function to clean up old audit logs (optional)
-- Run this after the table is created:
-- CREATE OR REPLACE FUNCTION cleanup_old_audit_logs()
-- RETURNS void AS $$
-- BEGIN
--     -- Delete audit logs older than 1 year
--     DELETE FROM audit_logs 
--     WHERE created_at < NOW() - INTERVAL '1 year';
-- END;
-- $$ LANGUAGE plpgsql;

-- To create a scheduled cleanup job (requires pg_cron extension):
-- SELECT cron.schedule('cleanup-audit-logs', '0 2 * * *', 'SELECT cleanup_old_audit_logs();');
