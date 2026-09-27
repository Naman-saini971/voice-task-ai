import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Camera, Eye, EyeOff, Lock, LogOut, Mic, Save, Search, Settings, User, X } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../../context/useAuth";
import { updateProfile } from "../../services/api";

const getInitials = (name) => {
  if (!name) return "AM";
  return name.split(" ").filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join("");
};

// ─── My Profile Modal ───────────────────────────────────────────────
function ProfileModal({ userName, userEmail, onClose }) {
  const { setUser } = useAuth();
  const [form, setForm] = useState({ name: userName, email: userEmail });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const e = {};
    if (form.name.trim().length < 2) e.name = "Name must be at least 2 characters";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email address";
    return e;
  };

  const handleSave = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    try {
      setSaving(true);
      const res = await updateProfile({ name: form.name.trim(), email: form.email.trim() });
      setUser(res.data.user);
      toast.success("Profile updated!");
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const initials = getInitials(form.name);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0F19]/80 px-4 backdrop-blur-sm"
    >
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ type: "spring", duration: 0.4 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#141A29] shadow-2xl overflow-hidden"
      >
        {/* Profile Modal Header */}
        <div className="relative bg-gradient-to-br from-violet-600/20 to-purple-600/10 px-6 pt-6 pb-8 border-b border-white/5">
          <button onClick={onClose} className="absolute right-4 top-4 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-[#0B0F19] p-1.5 text-gray-500 dark:text-gray-400 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-900 dark:text-white transition-colors">
            <X className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-xl font-bold text-gray-900 dark:text-white shadow-lg shadow-violet-500/40">
                {initials}
              </div>
              <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-violet-500 border-2 border-[#141A29]">
                <Camera className="h-2.5 w-2.5 text-white" />
              </div>
            </div>
            <div>
              <p className="text-base font-bold text-white">{form.name}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 dark:text-gray-400">{form.email}</p>
              <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-mono text-violet-400 border border-violet-500/20 bg-violet-500/10 px-2 py-0.5 rounded-full">
                Workspace Owner
              </span>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div className="p-6 space-y-4">
          <p className="text-[10px] uppercase tracking-wider text-gray-500 font-mono">Edit Profile</p>

          <div>
            <label className="block mb-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">Full Name</label>
            <input name="name" value={form.name} onChange={handleChange}
              className={`w-full rounded-2xl bg-gray-100 dark:bg-[#0B0F19] border px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 outline-none transition-all duration-300 ${errors.name ? "border-red-500/60" : "border-gray-200 dark:border-white/10 focus:border-violet-400"}`}
            />
            {errors.name && <p className="mt-1 text-xs text-red-400">⚠ {errors.name}</p>}
          </div>

          <div>
            <label className="block mb-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">Email Address</label>
            <input name="email" value={form.email} onChange={handleChange}
              className={`w-full rounded-2xl bg-gray-100 dark:bg-[#0B0F19] border px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 outline-none transition-all duration-300 ${errors.email ? "border-red-500/60" : "border-gray-200 dark:border-white/10 focus:border-violet-400"}`}
            />
            {errors.email && <p className="mt-1 text-xs text-red-400">⚠ {errors.email}</p>}
          </div>

          <div className="flex gap-3 pt-2">
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="flex-1 rounded-2xl
      border border-slate-300 dark:border-slate-700
      bg-white dark:bg-[#141A29]
      py-3
      text-sm font-semibold
      text-slate-700 dark:text-slate-300
      shadow-sm
      transition-all duration-300
      hover:bg-violet-50
      hover:border-violet-400
      hover:text-violet-700
      dark:hover:bg-violet-500/10
      dark:hover:border-violet-500/30
      dark:hover:text-violet-300"
            >
              Cancel
            </motion.button>

            <motion.button
              onClick={handleSave}
              disabled={saving}
              whileHover={{ scale: saving ? 1 : 1.02 }}
              whileTap={{ scale: saving ? 1 : 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl
      bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-600
      py-3
      text-sm font-bold
      text-white
      shadow-lg shadow-violet-500/30
      transition-all duration-300
      hover:shadow-xl hover:shadow-violet-500/40
      disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              ) : (
                <Save className="h-4 w-4" />
              )}

              {saving ? "Saving..." : "Save Changes"}
            </motion.button>
          </div>
        </div>   {/* closes: <div className="p-6 space-y-4"> */}
      </motion.div>
    </motion.div>
  );
}

// ─── Account Settings Modal (Change Password) ───────────────────────
function AccountSettingsModal({ userName, userEmail, onClose, onLogout }) {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const e = {};
    if (!form.currentPassword) e.currentPassword = "Current password is required";
    if (form.newPassword.length < 6) e.newPassword = "Must be at least 6 characters";
    if (form.newPassword !== form.confirmPassword) e.confirmPassword = "Passwords do not match";
    return e;
  };

  const handleSave = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    try {
      setSaving(true);
      await updateProfile({ currentPassword: form.currentPassword, newPassword: form.newPassword });
      toast.success("Password changed successfully!");
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    } finally {
      setSaving(false);
    }
  };

  const initials = getInitials(userName);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B0F19]/80 px-4 backdrop-blur-sm"
    >
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }} transition={{ type: "spring", duration: 0.4 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#141A29] shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="relative overflow-hidden border-b border-gray-200 dark:border-white/10 bg-gradient-to-br from-violet-600/20 via-fuchsia-500/10 to-transparent px-6 py-6">          <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-lg font-bold text-white shadow-xl shadow-violet-500/40">
            {initials}
          </div>
          <div>
            <p className="text-base font-bold text-slate-900 dark:text-white">
              {userName}
            </p>

            <p className="text-sm text-slate-600 dark:text-slate-400">
              {userEmail}
            </p>
            <span className="mt-2 inline-flex items-center rounded-full bg-violet-500/10 px-2.5 py-1 text-[10px] font-semibold text-violet-500 border border-violet-500/20">
              Workspace Owner
            </span>
          </div>

        </div>
          <button onClick={onClose} className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-[#0B0F19] p-1.5 text-gray-500 dark:text-gray-400 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-900 dark:text-white transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Account Info Row */}
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                label: "Account Type",
                value: "Workspace Owner",
                color: "text-violet-500",
                bg: "bg-gradient-to-br from-violet-500/10 to-transparent border border-violet-500/20",
              },
              {
                label: "Status",
                value: "Active",
                color: "text-emerald-500",
                bg: "bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20",
              },
            ].map((item) => (
              <div
                key={item.label}
                className={`rounded-2xl px-4 py-3 ${item.bg}`}
              >
                <p className="text-[10px] uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {item.label}
                </p>

                <p className={`mt-1 text-xs font-semibold ${item.color}`}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          {/* Change Password Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 pt-1">
              <Lock className="h-4 w-4 text-violet-400" />
              <p className="text-[10px] uppercase tracking-wider text-gray-500 font-mono">Change Password</p>
            </div>

            {/* Current Password */}
            <div>
              <label className="block mb-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">Current Password</label>
              <div className="relative">
                <input name="currentPassword" type={showCurrent ? "text" : "password"} value={form.currentPassword} onChange={handleChange} placeholder="Enter current password"
                  className={`w-full rounded-2xl border bg-white dark:bg-[#0B0F19]
border-slate-200 dark:border-white/10
px-4 py-3 pr-11
text-sm text-slate-900 dark:text-white
placeholder:text-slate-400
shadow-sm
outline-none
transition-all duration-300
hover:border-violet-300
focus:border-violet-500
focus:ring-4
focus:ring-violet-500/10
${errors.currentPassword ? "border-red-500/60" : ""}`} />
                <button type="button" onClick={() => setShowCurrent(!showCurrent)} className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400 dark:text-gray-400 hover:text-violet-400 transition-colors">
                  {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.currentPassword && <p className="mt-1 text-xs text-red-400">⚠ {errors.currentPassword}</p>}
            </div>

            {/* New Password */}
            <div>
              <label className="block mb-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">New Password</label>
              <div className="relative">
                <input name="newPassword" type={showNew ? "text" : "password"} value={form.newPassword} onChange={handleChange} placeholder="Min 6 characters"
                  className={`w-full rounded-2xl border bg-white dark:bg-[#0B0F19]
border-slate-200 dark:border-white/10
px-4 py-3 pr-11
text-sm text-slate-900 dark:text-white
placeholder:text-slate-400
shadow-sm
outline-none
transition-all duration-300
hover:border-violet-300
focus:border-violet-500
focus:ring-4
focus:ring-violet-500/10
${errors.newPassword ? "border-red-500/60" : ""}`} />
                <button type="button" onClick={() => setShowNew(!showNew)} className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-400 dark:text-gray-400 hover:text-violet-400 transition-colors">
                  {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.newPassword && <p className="mt-1 text-xs text-red-400">⚠ {errors.newPassword}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block mb-1.5 text-xs font-medium text-slate-600 dark:text-slate-300">Confirm New Password</label>
              <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} placeholder="Repeat new password"
                className={`w-full rounded-2xl border bg-white dark:bg-[#0B0F19]
border-slate-200 dark:border-white/10
px-4 py-3
text-sm text-slate-900 dark:text-white
placeholder:text-slate-400
shadow-sm
outline-none
transition-all duration-300
hover:border-violet-300
focus:border-violet-500
focus:ring-4
focus:ring-violet-500/10
${errors.confirmPassword ? "border-red-500/60" : ""}`}
              />
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-400">⚠ {errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-1">
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="flex-1 rounded-2xl
      border border-slate-300 dark:border-slate-700
      bg-white dark:bg-[#141A29]
      py-3
      text-sm font-semibold
      text-slate-700 dark:text-slate-300
      shadow-sm
      transition-all duration-300
      hover:bg-violet-50
      hover:border-violet-400
      hover:text-violet-700
      dark:hover:bg-violet-500/10
      dark:hover:border-violet-500/30
      dark:hover:text-violet-300"
            >
              Cancel
            </motion.button>

            <motion.button
              onClick={handleSave}
              disabled={saving}
              whileHover={{ scale: saving ? 1 : 1.02 }}
              whileTap={{ scale: saving ? 1 : 0.98 }}
              className="flex-1 flex items-center justify-center gap-2 rounded-2xl
      bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-600
      py-3
      text-sm font-bold
      text-white
      shadow-lg shadow-violet-500/30
      transition-all duration-300
      hover:shadow-xl hover:shadow-violet-500/40
      disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              ) : (
                <Save className="h-4 w-4" />
              )}

              {saving ? "Saving..." : "Update Password"}
            </motion.button>
          </div>

          {/* Danger Zone */}
          <div className="pt-2 border-t border-white/5">
            <button onClick={() => { onClose(); onLogout?.(); }}
              className="w-full flex items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/10 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="h-4 w-4" /> Logout Session
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Navbar ─────────────────────────────────────────────────────
export default function Navbar({ onMicClick, onLogout, userName = "Alex Mercer", userEmail = "alex.mercer@vox.ai", tasks = [], onSearch, onNavigate }) {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isDark, setIsDark] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const profileRef = useRef(null);
  const bellRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileDropdownOpen(false);
      }

      if (
        bellRef.current &&
        !bellRef.current.contains(event.target)
      ) {
        setBellOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const initials = getInitials(userName);

  const upcomingTasks = tasks.filter((t) => {
    if (!t.dueDate || t.completed) return false;
    const diff = (new Date(t.dueDate) - new Date()) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 3;
  });

  const handleSearchChange = (e) => { const v = e.target.value; setSearchQuery(v); onSearch?.(v); };


  return (
    <>
      <header className="sticky top-0 right-0 z-40 flex h-16 w-full items-center justify-between border-b border-gray-200 dark:border-white/5 bg-white dark:bg-[#141A29]/90 px-3 sm:px-6 backdrop-blur-md transition-colors duration-200">
        {/* Search */}
        <div className="relative flex-1 max-w-xs sm:max-w-md">
          <div className={`relative flex items-center rounded-xl border transition-all duration-200 bg-gray-100 dark:bg-[#0B0F19] ${searchFocused ? "border-violet-400 shadow-sm" : "border-gray-200 dark:border-white/10"
            }`}>
            <Search className="absolute left-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              className="h-9 w-full bg-transparent pl-9 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
            />
            {searchQuery && (
              <button onClick={() => { setSearchQuery(""); onSearch?.(""); }} className="absolute right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white text-xs">✕</button>
            )}
          </div>
        </div>

        {/* Right side icons with proper gap */}
        <div className="flex items-center gap-2 ml-3 sm:gap-3 sm:ml-4">
          {/* Mic */}
          <motion.button onClick={onMicClick} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center rounded-xl border border-violet-400/30 bg-violet-500/10 p-2 sm:p-2.5 text-violet-600 dark:text-violet-400 transition-all hover:bg-violet-500/20">
            <Mic className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse" />
          </motion.button>

          {/* Bell */}
          <div ref={bellRef} className="relative">
            <button onClick={() => { setBellOpen(!bellOpen); setProfileDropdownOpen(false); }}
              className="flex items-center justify-center rounded-xl border border-gray-200 dark:border-white/10 bg-gray-100 dark:bg-[#0B0F19] p-2 sm:p-2.5 text-gray-600 dark:text-gray-400 transition-all hover:bg-gray-200 dark:hover:bg-white/10">
              <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
              {upcomingTasks.length > 0 && <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-violet-500" />}
            </button>
            <AnimatePresence>
              {bellOpen && (
                <>

                  <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} transition={{ duration: 0.15 }}
                   className="fixed top-20 right-3 z-40 w-[320px] max-w-[calc(100vw-24px)] rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#141A29] p-3 shadow-xl dark:shadow-2xl">
                    <div className="border-b border-gray-100 dark:border-white/5 pb-2 mb-2">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">Notifications</p>
                    </div>
                    {upcomingTasks.length > 0 ? (
                      <div className="space-y-2">
                        {upcomingTasks.map((task) => {
                          const d = Math.ceil((new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24));
                          return (
                            <div key={task._id} className="rounded-xl bg-violet-500/10 border border-violet-500/20 px-3 py-2">
                              <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{task.title}</p>
                              <p className="text-[10px] text-violet-500 mt-0.5">Due {d === 0 ? "today" : `in ${d} day${d > 1 ? "s" : ""}`}</p>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="py-4 text-center">
                        <p className="text-2xl mb-1">🎉</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">All caught up!</p>
                        <p className="text-xs text-gray-400 mt-0.5">No tasks due in next 3 days</p>
                      </div>
                    )}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="h-6 w-px bg-gray-200 dark:bg-white/10" />

          {/* Profile */}
          <div
            ref={profileRef}
            className="relative"
          >
            <button onClick={() => { setProfileDropdownOpen(!profileDropdownOpen); setBellOpen(false); }} className="group flex items-center gap-2 focus:outline-none">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white shadow-md flex-shrink-0">
                {initials}
              </div>
              <div className="hidden flex-col text-left sm:flex">
                <span className="text-xs font-bold text-gray-900 dark:text-white">{userName}</span>
                <span className="text-[10px] text-gray-500 dark:text-gray-400">Workspace Owner</span>
              </div>
            </button>

            <AnimatePresence>
              {profileDropdownOpen && (
                <>
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 z-40 mt-3 w-56 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#141A29] p-2 shadow-xl dark:shadow-2xl"
                  >
                    <div className="border-b border-gray-100 dark:border-white/5 p-3">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{userName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{userEmail}</p>
                    </div>
                    <div className="space-y-1 py-2">
                      <button onClick={() => { setProfileDropdownOpen(false); setProfileModalOpen(true); }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <User className="h-4 w-4 text-violet-500" /> My Profile
                      </button>
                      <button onClick={() => { setProfileDropdownOpen(false); setAccountModalOpen(true); }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-colors">
                        <Settings className="h-4 w-4 text-purple-500" /> Account Settings
                      </button>
                    </div>
                    <div className="my-1 h-px bg-gray-100 dark:bg-white/5" />
                    <div className="p-1">
                      <button onClick={() => { setProfileDropdownOpen(false); onLogout?.(); }}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                        <LogOut className="h-4 w-4" /> Logout Session
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Modals */}
      <AnimatePresence>
        {profileModalOpen && <ProfileModal userName={userName} userEmail={userEmail} onClose={() => setProfileModalOpen(false)} />}
      </AnimatePresence>
      <AnimatePresence>
        {accountModalOpen && <AccountSettingsModal userName={userName} userEmail={userEmail} onClose={() => setAccountModalOpen(false)} onLogout={onLogout} onNavigate={onNavigate} />}
      </AnimatePresence>
    </>
  );
}


