/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Eye, EyeOff, Sparkles, User } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/useAuth";

export default function Login() {
  const navigate = useNavigate();
  const { login, guestLogin } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

const handleGuestLogin = async () => {
  setLoading(true);
  setError("");

  try {
    await guestLogin();
    navigate("/dashboard");
  } catch (err) {
    setError("Unable to create guest account.");
  } finally {
    setLoading(false);
  }
};

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-[#0B0F19] flex items-center justify-center px-4 overflow-hidden transition-colors duration-200">
      {/* Animated Background Orbs — only in dark mode */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden dark:block">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 -left-20 w-96 h-96 bg-violet-500/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[150px]"
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(139,92,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(139,92,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md"
      >
        {/* Glowing Border Effect — dark only */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-purple-600 rounded-[32px] blur opacity-0 dark:opacity-30"></div>

        <form
          onSubmit={handleSubmit}
          className="relative bg-white dark:bg-[#141A29]/90 backdrop-blur-xl rounded-[32px] border border-gray-200 dark:border-white/10 p-8 shadow-lg dark:shadow-2xl transition-colors duration-200"
        >
          {/* Header with Icon */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 mb-4 shadow-lg shadow-violet-500/50"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">Sign in to your voice-powered workspace</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 rounded-2xl bg-red-500/10 border border-red-500/30 p-4 text-red-300 text-sm backdrop-blur-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Email Field */}
          <div className="mb-5">
            <label className="block text-gray-500 dark:text-gray-400 mb-2 text-sm font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full rounded-2xl bg-gray-50 dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white px-4 py-3.5 text-sm placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-violet-500 transition-all duration-300"
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-gray-500 dark:text-gray-400 mb-2 text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="w-full rounded-2xl bg-gray-50 dark:bg-[#0B0F19] border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white px-4 py-3.5 pr-12 text-sm placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:border-violet-500 transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-violet-400 transition-colors duration-300"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 transition-all duration-300 rounded-2xl py-3.5 text-white font-bold shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </motion.button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
            <span className="text-xs text-gray-500 uppercase tracking-widest">
              or
            </span>
            <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
          </div>

          {/* Guest Button */}
          <motion.button
            type="button"
            onClick={handleGuestLogin}
            disabled={loading}
            whileHover={{
              scale: loading ? 1 : 1.02,
              y: loading ? 0 : -2,
            }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="group w-full flex items-center justify-center gap-3 rounded-2xl border border-violet-500/15 bg-violet-500/5 hover:bg-violet-500/10 hover:border-violet-500/30 py-3.5 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-300 transition-all duration-300 disabled:opacity-50"
          >
            <User
              size={18}
              className="transition-all duration-300 group-hover:scale-110"
            />

            <span>Continue as Guest</span>
          </motion.button>

          <p className="text-center text-gray-500 dark:text-gray-400 mt-5 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-violet-500 hover:text-violet-400 font-semibold transition-colors duration-300">
              Create one
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
}


