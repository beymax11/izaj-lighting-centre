import { supabase } from '../../backend/supabase/supabaseClient.js';

export const AuditActions = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  CREATE_USER: 'CREATE_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  UPDATE_STATUS: 'UPDATE_STATUS',
  UPDATE_PROFILE: 'UPDATE_PROFILE',
  VIEW_PROFILE: 'VIEW_PROFILE',
  VIEW_USERS: 'VIEW_USERS',
  VIEW_AUDIT_LOGS: 'VIEW_AUDIT_LOGS',
  VIEW_STOCK_SUMMARY: 'VIEW_STOCK_SUMMARY'
};

export async function logAuditEvent(userId, action, details, req) {
  try {
    const { data: user } = await supabase
      .from('adminUser')
      .select('name')
      .eq('user_id', userId)
      .single();

    const { error } = await supabase
      .from('audit_logs')
      .insert([{
        user_id: userId,
        user_name: user?.name || 'Unknown',
        action,
        timestamp: new Date().toISOString()
      }]);

    if (error) {
      console.error('Audit log insertion error:', error);
      throw error;
    }

    console.log(`Audit event logged: ${action} by ${user?.name || 'Unknown'} (${userId})`);
    return true;
  } catch (error) {
    console.error('Audit log creation failed:', error);
    return false;
  }
}