import express from "express";
import  { supabase } from '../supabaseClient.js';
import authenticate from "../util/middlerware.js";

const router = express.Router();

// AUDIT LOGS ROUTES

// GET /api/admin/audit-logs
router.get("/audit-logs", authenticate, async (req, res) => {
  try {
    const { data: adminUser, error: adminError } = await supabase
      .from("adminUser")
      .select("role")
      .eq("user_id", req.user.id)
      .single();

    if (adminError || !adminUser || adminUser.role !== "Admin") {
      return res.status(403).json({
        error: "Access denied. Only Admins can view audit logs.",
      });
    }

    const { page = 1, limit = 50, fromDate, toDate, action, userId } = req.query;

    let query = supabase
      .from("audit_logs")
      .select("*")
      .order("created_at", { ascending: false });

    if (fromDate) query = query.gte("created_at", fromDate);
    if (toDate) query = query.lte("created_at", toDate);
    if (action) query = query.eq("action", action);
    if (userId) query = query.eq("user_id", userId);

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data: logs, error } = await query;

    if (error) {
      console.error("Error fetching audit logs:", error);
      return res.status(500).json({ error: "Failed to fetch audit logs" });
    }

    res.json({
      success: true,
      logs,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total: logs.length,
      },
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
});

export default router;
