// backend/middleware/supabaseAuth.js
const { createClient } = require("@supabase/supabase-js");
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const supabaseAuth = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  const { data: user, error } = await supabase.auth.getUser(token);
  if (error || !user) return res.status(401).json({ message: "Invalid token" });

  req.user = user; // use `user.id` as userId for tasks
  next();
};

module.exports = supabaseAuth;
