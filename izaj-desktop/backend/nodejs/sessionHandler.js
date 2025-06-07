import { supabase } from "../supabase/supabaseClient.js";

let savedSession = null;

async function getAdminSession() {
  return savedSession;
}

async function createAdminSession(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Login Error:", error);
    return { error: "Login failed" };
  }

  console.log("Admin logged in:", data);
  savedSession = data.session;
  return data;
}

async function logoutAdmin() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Logout Error: ", error);
    return { error: "Logout failed" };
  }

  savedSession = null;
  console.log("Admin logged out successfully");
  return { message: "Logged out successfully" };
}

async function saveAdminSession(session) {
  savedSession = session;
  console.log('Session Saved:', session);
}

export default {
  getAdminSession,
  createAdminSession,
  logoutAdmin,
  saveAdminSession,
};
